import axios from "axios";
const url = import.meta.env.VITE_URL;
const token = localStorage.getItem("token");

export const getReports = async (id) => {
  try {
    const res = await axios.get(`${url}/reports/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
}