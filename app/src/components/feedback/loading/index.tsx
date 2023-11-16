import { useSelector } from 'react-redux';
import { appSelector } from '../../../redux';
import { styled } from '@mui/system';
import Modal from '@mui/joy/Modal'
import Spinner from '../spinner';

const styles = {
  backdrop: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    zIndex: 1000000,
    color: '#fff',
    height: '100%',
  },
  spinner: {
    marginBottom: 10,
  },
  message: {

  }
};

const LoadingBackdrop = () => {
  const app = useSelector(appSelector);

  return (
    <Modal open={app.loading.status}>
      <Spinner/>
    </Modal>
  );
};

export default LoadingBackdrop;
