import axios from "axios";
const url = import.meta.env.VITE_URL;
const token = localStorage.getItem("token");

export const getCustomers = async () => {
  try {
    const res = await axios.get(`${url}/customers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.data;
  } catch (error) {
    return error;
  }
};

export const showCustomer = async (id) => {
  try {
    const res = await axios.get(`${url}/customers/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const createCustomer = async (data) => {
  try {
    const res = await axios.post(`${url}/customers`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const updateCustomer = async (id, data) => {
  try {
    const res = await axios.post(`${url}/customers/${id}?_method=PUT`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const deleteCustomer = async (id) => {
  try {
    const res = await axios.delete(`${url}/customers/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
