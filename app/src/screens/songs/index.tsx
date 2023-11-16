import { useSelector } from 'react-redux';
import { trackSelector } from '../../redux';
import MainTemplate from '../../components/template/main';
import Track from './track';

const Songs = () => {
  const trackState = useSelector(trackSelector);

  const renderTracks = () => trackState.tracks.map((track, i) => (
    <Track
      track={track}
      i={i}
      key={track.id}
    />
  ));

  return (
    <MainTemplate>
      <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, height: 10, overflowY: 'scroll' }}>
        {renderTracks()}
      </div>
    </MainTemplate>
  );
};

export default Songs;
