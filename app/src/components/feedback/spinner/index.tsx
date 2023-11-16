// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { colors } from '../../../shared/colors';
import './styles.css';

interface Props {
  variant?: string;
}

const Spinner: React.FC<Props> = ({ variant }) => {
  if (variant === 'dark') {
    return (
      <div className='customer-spinner'>
        Loading
      </div>
    )
  }

  return (
    <div className='customer-spinner' style={{ backgroundColor: 'transparent' }}>
      Loading
    </div>
  );
};

export default Spinner;
