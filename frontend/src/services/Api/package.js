import axios from "axios";

const url = import.meta.env.VITE_URL;
const token = localStorage.getItem("token");

export const getPackages = async () => {
  try {
    const res = await axios.get(`${url}/packages`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
export const showPackage = async (id) => {
  try {
    const res = await axios.get(`${url}/packages/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
export const createPackage = async (data) => {
  try {
    const res = await axios.post(`${url}/packages`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const updatePackage = async (id, data) => {
  try {
    const res = await axios.put(`${url}/packages/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const deletePackage = async (id) => {
  try {
    const res = await axios.delete(`${url}/packages/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
