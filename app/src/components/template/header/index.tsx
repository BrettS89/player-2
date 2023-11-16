import { styled } from '@mui/joy';
import { useLocation, useNavigate } from 'react-router-dom';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import { styles } from './styles';
import { colors } from '../../../shared/colors';

const Container = styled('header')(styles.container);

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const renderButton = () => {
    if (location.pathname === '/') {
      return (
        <Button onClick={() => navigate('/app/song/upload')}>
          Upload
        </Button>
      );
    }

    return (
      <Button onClick={() => navigate('/')}>
        Tracks
      </Button>
    );
  }

  return (
    <Container>
      <AudiotrackIcon
        style={{ fontSize: 35, color: colors.white }}
      />
      {renderButton()}
      
    </Container>
  );
};

export default Header;
