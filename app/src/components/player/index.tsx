import { styled } from '@mui/joy';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { trackSelector, setTrackPlaying } from '../../redux';
import { usePlayer } from '../../soundtouch';
import PauseCircleFilledRoundedIcon from '@mui/icons-material/PauseCircleFilledRounded';
import PlayCircleFilledRoundedIcon from '@mui/icons-material/PlayCircleFilledRounded';
import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { styles } from './styles';
import { colors } from '../../shared/colors';
import { Track } from '../../types';

const Container = styled('div')(styles.container);
const Top = styled('div')(styles.topSection);
const Bottom = styled('div')(styles.bottomSection);

const Player = () => {
  const dispatch = useDispatch();
  const trackState = useSelector(trackSelector);
  const { semitone, changeSemitone, playing, pause, play, loadFile, loading } = usePlayer();

  const decreasePitch = () => {
    changeSemitone({ target: {
        value: semitone - 1,
      },
    });
  };

  const increasePitch = () => {
    changeSemitone({ target: {
        value: semitone + 1,
      },
    });
  };

  const onNextOrPrev = (action: 'next' | 'prev') => {
    if (loading) return; 

    let track: Track | undefined = undefined;

    if (!trackState.playing) {
      return;
    }

    for (let i = 0; i < trackState.tracks.length; i++) {
      if (trackState.tracks[i].id === trackState.playing.id) {
        if (action === 'next') {
          if (trackState.tracks[i + 1]) {
            track = trackState.tracks[i + 1];
          } else {
            track = trackState.tracks[0];
          }
        } else {
          if (trackState.tracks[i - 1]) {
            track = trackState.tracks[i - 1];
          } else {
            track = trackState.tracks[trackState.tracks.length - 1];
          }
        }
      }
    }

    if (!track) return;

    onSelectSong(track);
  };

  const onSelectSong = async (selectedTrack: Track) => {
    pause();

    dispatch(setTrackPlaying(selectedTrack));

    changeSemitone({
      target: {
        value: 0,
      }
    });

    const { data } = await axios({
      url: `${process.env.REACT_APP_API_URL}/audio/${selectedTrack.file?.name}`,
      method: 'get',
      responseType: 'arraybuffer',
    });

    const file = new File([data], 'your-file-name.mp3', { type: 'audio/mpeg' });

    loadFile(file);
  };

  const renderPlayOrPause = () => {
    if (playing) {
      return (
        <PauseCircleFilledRoundedIcon
          style={styles.playPause}
          onClick={() => pause()}
        />
      );
    }

    return (
      <PlayCircleFilledRoundedIcon
        style={styles.playPause}
        onClick={() => play()}
      />
    );
  };

  return (
    <Container>
      <Top>
        <div style={styles.pitchControls}>
          <RemoveCircleIcon style={styles.skipButton} onClick={decreasePitch} />
          <div style={{ width: 45, color: colors.white, fontWeight: 600, textAlign: 'center' }}>
            {semitone}
          </div>
          <AddCircleIcon style={styles.skipButton} onClick={increasePitch} />
        </div>
        <div style={styles.playerControls}>
          <SkipPreviousRoundedIcon
            style={styles.skipButton}
            onClick={() => onNextOrPrev('prev')}
          />
          {renderPlayOrPause()}
          <SkipNextRoundedIcon
            style={styles.skipButton}
            onClick={() => onNextOrPrev('next')}
          />
        </div>
      </Top>
      <Bottom>

      </Bottom>
    </Container>
  );
};

export default Player;
