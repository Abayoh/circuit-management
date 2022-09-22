import axios from 'axios';

const baseURL = 'https://capacity-manager-api-e64vw3qkva-uc.a.run.app/api/v0';

// let _isRefreshing = false;
// axiosInstance.interceptors.request.use(

//   async function (req) {
//     if (!accessToken) {
//       accessToken = TokenService.getLocalAccessToken();
//       req.headers.Authorization = `Bearer ${accessToken}`;
//     }

//     if (!accessToken || req.url === '/auth/logout' || req.url === '/auth')
//       return req;
//     if (_isRefreshing) {
//       return new Promise((resolve, reject) => {
//         requests.push({ resolve, reject, req });
//       }).then(() => {
//         return req;
//       });
//     }

//     const user = jwt_decode(accessToken);
//     const hasExpired = user.exp < Date.now() * 5000;

//     if (!hasExpired) return req;
//     _isRefreshing = true;
//     const result = await axios.post(`${baseURL}/auth/refresh-token`, {
//       refreshToken: TokenService.getLocalRefreshToken(),
//     });

//     if (result.data.accessToken) {
//       TokenService.setUser({
//         refreshToken: result.data.refreshToken,
//         accessToken: result.data.accessToken,
//       });
//       req.headers.Authorization = `Bearer ${result.data.accessToken}`;
//       requests.forEach((re) => {
//         re.resolve(re.req);
//       });
//       requests = [];
//       _isRefreshing = false;
//     }

//     return req;
//   },
//   function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   }
// );

const axiosPublic = axios.create({
  baseURL,
  withCredentials: true,
});

axiosPublic.interceptors.response.use(
  (res) => res,
  (err) => {
    const apiErr = err?.response?.data
      ? {
          name: 'API Error',
          code: `${err?.response?.data?.error?.status}`,
          message: err?.response?.data?.error?.message,
        }
      : err;
    return Promise.reject(apiErr);
  }
);

export const axiosPrivate = axios.create({
  baseURL,
});

export const configRequest = (token, saveAccessToken) => {
  const reqInterceptor = axiosPrivate.interceptors.request.use(
    (req) => {
      if (!req.headers['Authorization']) {
        req.headers['Authorization'] = `Bearer ${token}`;
      }
      return req;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  const resInterceptor = axiosPrivate.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      try {
        const preRequest = err?.config;
        if (
          err.response?.data?.error?.message === 'jwt expired' &&
          !preRequest.sent
        ) {
          preRequest.sent = true;
          const res = await axiosPublic.get('/auth/refresh-token'); //request for new accessToken
          saveAccessToken(res.data);
          preRequest.headers['Authorization'] = `Bearer ${res.data}`;
          return axiosPrivate(preRequest); //resend the original request
        } else {
          //if the error is not related to a jwt expire
          const apiErr = err?.response?.data
            ? {
                name: 'API Error',
                code: `${err?.response?.data?.error?.status}`,
                message: err?.response?.data?.error?.message,
              }
            : err;
          return Promise.reject(apiErr);
        }
      } catch (err) {
        //if error occurs on the new access token request
        const apiErr = err?.response?.data
          ? {
              name: 'API Error',
              code: `${err.response.data.error.status}`,
              message: err.response.data.error.message,
            }
          : err;
        return Promise.reject(apiErr);
      }
    }
  );
  return { reqInterceptor, resInterceptor };
};

export default axiosPublic;
