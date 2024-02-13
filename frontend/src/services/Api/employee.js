import axios from "axios";
const url = import.meta.env.VITE_URL;
const token = localStorage.getItem("token");

export const getEmployees = async () => {
  try {
    const res = await axios.get(`${url}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
export const showEmployee = async (id) => {
  try {
    const res = await axios.get(`${url}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const createEmployee = async (data) => {
  try {
    const res = await axios.post(`${url}/users`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateEmployee = async (id, data) => {
  try {
    const res = await axios.put(`${url}/users/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteEmployee = async (id) => {
  try {
    const res = await axios.delete(`${url}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
