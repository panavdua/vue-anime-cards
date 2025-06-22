import axios from 'axios';


const token = 'eyJhbGciOiJIUzI1NiJ9.cGFuYXZkdWFAZ21haWwuY29t.LR9lmtJ7idvlExFM1zabNGPxMKkfv9RAnHim91t-pak';

// Replace with your actual API base URL
const api = axios.create({
  baseURL: 'https://tzab40im77.execute-api.ap-south-1.amazonaws.com/prod',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});


export const fetchAnime = async () => {
  try {
    const response = await api.get('/getContent'); // Adjust endpoint if different
    return response.data;
  } catch (error) {
    console.error('Error fetching anime:', error);
    throw error; // rethrow for store/component to handle
  }
};
