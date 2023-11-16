import './App.css';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { appSelector, appLoad, trackSelector } from './redux';
import { PlayerProvider, usePlayer } from './soundtouch';
import Router from './routing';
import Loading from './components/feedback/loading';
import { setTrackPlaying } from './redux';
import { Track } from './types';
import { audioCtx } from '.';
// import SplashScreen from './components/splash';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const app = useSelector(appSelector);
  const trackState = useSelector(trackSelector);
  const { semitone, changeSemitone, playing, pause, play, loadFile, loading, progress, duration } = usePlayer();

  const onNext = () => {
    if (loading) return; 

    let track: Track | undefined = undefined;

    if (!trackState.playing) {
      return;
    }

    for (let i = 0; i < trackState.tracks.length; i++) {
      if (trackState.tracks[i].id === trackState.playing.id) {
        if (trackState.tracks[i + 1]) {
          track = trackState.tracks[i + 1];
        } else {
          track = trackState.tracks[0];
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

  const renderLoading = () => {
    return (
      <div>Loading</div>
    );
  };

  const renderApp = () => {
    return (
      <div className="App">
        <div className='App-main'>
          <Router />
        </div>
        {/* <Loading /> */}
      </div>
    )
  };

  useEffect(() => {
    dispatch(appLoad({
      navigate,
      path: location.pathname
    }));
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        onNext();
      }, 1500);
    }
  }, [progress]);

  return app.initialized
    ? renderApp()
    : renderLoading();
}

export default App;

export const styles = {
  initContainer: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 0,
  },
  logo: {
    fontWeight: 900,
    fontSize: 60,
    marginBottom: 25,
    marginLeft: 12,
    letterSpacing: 1,
    color: '#fff',
  },
  spinner: {
    marginTop: 95,
  }
};
