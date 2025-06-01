import axios from 'axios';
const BASE_URL = 'http://localhost:8080/api/customers';

export const createCustomer = (data) => axios.post(BASE_URL, data);
export const getCustomers = (filters) => axios.get(BASE_URL, { params: filters });
export const deleteCustomerByMobile = (mobile) => axios.delete(`${BASE_URL}/by-mobile/${mobile}`);
export const deleteMobileNumber = (mobileNumber) => axios.delete(`${BASE_URL}/mobile/${mobileNumber}`);
export const addMobileNumber = (id, data) => axios.post(`${BASE_URL}/${id}/add-mobile`, data);