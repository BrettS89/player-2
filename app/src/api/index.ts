import axios from 'axios';

interface Request {
  path: string;
  method: string;
  data?: any;
  headers?: Record<string, any>;
}

const url = process.env.REACT_APP_API_URL;

const executeRequest = async (req: Request) => {
  const { data } = await axios({
    url: `${url}${req.path}`,
    method: req.method,
    data: req.data ?? {},
    headers: req.headers ?? {},
  });

  return data;
};

export const findTracks = () => {
  return executeRequest({
    path: '/v1/track',
    method: 'get',
  });
};

export const createTrack = (data: any) => {
  return executeRequest({
    path: '/v1/track',
    method: 'post',
    data,
  });
};

export const uploadFile = (file: File) => {
  return executeRequest({
    path: '/v1/file',
    method: 'post',
    data: file,
    headers: {
      'Content-Type': 'audio/mpeg'
    },
  });
};
