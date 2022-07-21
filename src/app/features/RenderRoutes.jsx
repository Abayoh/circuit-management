import { useRoutes } from 'react-router-dom';

const RenderRoutes = ({ routes }) => {
  const renderedRoutes = useRoutes(routes);
  return renderedRoutes;
};

export default RenderRoutes;

