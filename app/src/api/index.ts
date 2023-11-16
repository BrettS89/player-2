import axios from 'axios';

interface Request {
  path: string;
  method: string;
  data?: any;
}

const url = process.env.REACT_APP_API_URL;

export default {};

const executeRequest = async (req: Request) => {
  const { data } = await axios({
    url: `${url}${req.path}`,
    method: req.method,
    data: req.data ?? {},
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
