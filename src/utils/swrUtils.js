import Apis from '../configs/Apis';

export const fetcherWithParams = async ([url, params]) => {
  const res = await Apis.get(url, { params });
  return res.data;
};
