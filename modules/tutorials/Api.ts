import axios from "axios";

export const getAllTutorials = (body) => {
  return axios.post(`/tutorial/search`, body);
};

export const getAllUserTutorials = ({ id, formData }) => {
  return axios.post(`/tutorial/search/${id}`, formData);
};

export const createTutorial = (formData) => {
  return axios.post(`/tutorial/create-tutorial`, formData);
};

export const updateTutorial = (formData) => {
  return axios.patch(`/tutorial/update-tutorial/${formData?._id}`, formData);
};

export const getTutorial = (formData) => {
  return axios.get(`/tutorial/get-tutorial/${formData?.id}`);
};

export const deleteTutorial = (formData) => {
  return axios.delete(`/tutorial/delete-tutorial/${formData?.id}`);
};
