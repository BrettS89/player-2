import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { uploadTrack } from '../../redux';
import MainTemplate from '../../components/template/main';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import { styles } from './styles';

const UploadTrack = () => {
  const [artist, setArtist] = useState('');
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>();

  const dispatch = useDispatch();

  const onUpload = () => {
    if (!artist || !title || !file) return;

    dispatch(uploadTrack({
      artist,
      title,
      file,
    }))
  };

  return (
    <MainTemplate>
      <div style={styles.container}>
        <div style={styles.uploadForm}>
          <Typography style={{ fontSize: 24, marginBottom: 30, fontWeight: 700 }}>
            Upload a Track
          </Typography>
          <Input
            placeholder='Artist'
            value={artist}
            onChange={e => setArtist(e.target.value)}
            style={{ marginBottom: 15, width: '100%' }}
          />
          <Input
            placeholder='Title'
            value={title}
            onChange={e => setTitle(e.target.value)}
            style={{ marginBottom: 15, width: '100%' }}
          />

          <input
            type='file'
            onChange={e => setFile(e.target.files?.[0] ?? null)}
            style={{ marginBottom: 30, width: '100%' }}
            accept='.mp3'
          />
          <Button onClick={onUpload}>
            Upload
          </Button>
        </div>
      </div>
    </MainTemplate> 
  );
};

export default UploadTrack;
