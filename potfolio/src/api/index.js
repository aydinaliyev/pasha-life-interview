import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3002';

export const getInvoicesAPI = async () => axios.get('/invoices');

export const deleteInvoiceAPI = async (id) =>axios.delete(`/invoices/${id}`)

const filterInvoicesAPI = async () => axios.get('/invoices?id=1&id=2');



//https://github.com/itsmaheshkariya/react-redux-saga-crud-app

// export const getUserByIdAPI = async (id) => axios.get(`/users/${id}`);

// export const createUserAPI = async (user) => axios.post(`/users`, user);

// export const updateUserAPI = async (user) =>
//   axios.put(`/users/${user.id}`, user);

// export const deleteUserByIdAPI = async (id) => axios.delete(`/users/${id}`);
