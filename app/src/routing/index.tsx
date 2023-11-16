import { Route, Routes } from 'react-router-dom';

import Songs from '../screens/songs';
import Upload from '../screens/upload';

export default () => {
  return (
    <Routes>
      <Route path='/app/song/upload' element={<Upload />} />
      <Route path='/app/songs' element={<Songs />} />
      <Route path='/' element={<Songs />} />
    </Routes>
  );
};
