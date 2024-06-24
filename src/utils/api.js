import axios from 'axios';
import { API_URL, STRAPI_API_TOKEN } from './urls';

export const fetchDataFromApi = async (url) => {
  const options = {
    headers: {
      Authorization: 'bearer ' + STRAPI_API_TOKEN,
    },
  };
  try {
    const { data } = await axios.get(API_URL + url, options);
    // console.log(data, 'DATA');
    return data;
  } catch (error) {
    // console.log(error);
    return error;
  }
};