import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const MY_KEY = '38917747-333f6727ff3cb16366235d86a';

axios.defaults.params = {
  key: MY_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 12,
};

export const fetchImages = async page => {
  axios.params = {
    page,
  };
  const { data } = await axios.get(BASE_URL);
  return data.hits;
};
export const fetchImagesByCategories = async (name, page) => {
  axios.params = {
    page,
  };
  const { data } = await axios.get(`${BASE_URL}?q=${name}`);
  return data.hits;
};
