import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
  addCustomer,
  getCustomerById,
  getCustomersError,
  resetError,
  setStatus,
  editCustomer,
} from './services/customers-slice';
import useRequestStatus from '../../hooks/use-request-status';
import useNotify from '../../hooks/use-notify';
import PageToolsbar from '../../components/PageToolsbar';
import Box from '@mui/material/Box';
import CustomerForm from './components/CustomerForm';

const newCustomer = {
  name: '',
  type: '',
  contacts: '',
  address: {
    address1: '',
    street: '',
    city: '',
    county: '',
  },
};

function AddEditCustomer() {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.customers);
  const { id } = useParams();
  const editing = Boolean(id);
  const customer = useSelector(getCustomerById(id));
  const notify = useNotify();
  const errorMessage = useSelector(getCustomersError)?.message || '';
  const navigate = useNavigate();
  let resetForm = () => {};

  const onSuccess = () => {
    notify(
      `${editing ? 'Edited' : 'Added'} successfully`,
      { x: 'right', y: 'bottom' },
      'success'
    );
    resetForm();
    navigate('/customers');
  };
  const onError = () => {
    notify(errorMessage, { x: 'right', y: 'bottom' }, 'error');
    dispatch(resetError());
  };

  const isLoading = useRequestStatus(status, setStatus, onSuccess, onError);

  const handleSubmit = (values, action) => {
    if (editing) {
      delete values._id;
      dispatch(editCustomer({ id, customer: values }));
    } else {
      dispatch(addCustomer(values));
    }

    resetForm = action.resetForm();
  };

  return (
    <>
      <PageToolsbar
        pageTitle={editing ? 'Edit Customer' : 'Add customers'}
        linkName='Customers'
        linkPath='/customers'
      />
      <Box sx={{ mt: 4 }}>
        <CustomerForm
          customer={editing ? customer : newCustomer}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </Box>
    </>
  );
}

export default AddEditCustomer;
