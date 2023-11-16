import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/joy/Typography';
import { styled } from '@mui/joy';
import { usePlayer } from '../../soundtouch';
import { Track as TrackType } from '../../types';
import { styles } from './styles';
import { colors } from '../../shared/colors';
import { setTrackPlaying, trackSelector } from '../../redux';

interface Props {
  track: TrackType;
  i: number;
}

const TrackContainer = styled('div')(styles.track);

const Track: React.FC<Props> = ({ track, i }) => {
  const trackState = useSelector(trackSelector);
  const dispatch = useDispatch();
  const { pause, loadFile, changeSemitone } = usePlayer();

  const backgroundColor = i % 2 === 1
    ? '#efefef' 
    : colors.white;

  const textColor = trackState.playing?.id === track.id
    ? { color: colors.main }
    : {};

  const onClick = async () => {
    pause();

    dispatch(setTrackPlaying(track));

    changeSemitone({
      target: {
        value: 0,
      }
    });

    const { data } = await axios({
      url: `${process.env.REACT_APP_API_URL}/audio/${track.file?.name}`,
      method: 'get',
      responseType: 'arraybuffer',
    });

    const file = new File([data], 'your-file-name.mp3', { type: 'audio/mpeg' });

    loadFile(file);
  }

  return (
    <TrackContainer style={{ backgroundColor }}>
      <button onClick={onClick}>
        <Typography style={{ fontSize: 14, fontWeight: 500,  ...textColor }}>
          {track.artist} - {track.title}
        </Typography>
      </button>
      
    </TrackContainer>
  );
};

export default Track;
