import axios from "axios";
const url = import.meta.env.VITE_URL;
const token = localStorage.getItem("token");

export const getRoles = async () => {
  try {
    const res = await axios.get(`${url}/roles`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const showRole = async (id) => {
  try {
    const res = await axios.get(`${url}/roles/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
