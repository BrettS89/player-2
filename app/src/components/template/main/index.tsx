import Header from '../header';
import Player from '../../player';

interface Props extends React.PropsWithChildren {}

const MainTemplate: React.FC<Props> = (props) => {
  return (
    <>
      <Header />
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'auto' }}>
        {props.children}
      </div>
      <Player />
    </>
  );
};

export default MainTemplate;

