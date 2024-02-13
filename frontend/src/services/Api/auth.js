import axios from "axios";
const url = import.meta.env.VITE_URL;
const token = localStorage.getItem("token");

export const login = async (data) => {
  let response = {
    isSuccess: false,
    message: "",
    token: "",
  };
  try {
    const res = await axios.post(`${url}/auth/login`, data);
    if (res.status === 200) {
      response.isSuccess = true;
      response.message = res.data.message;
      localStorage.setItem("token", res.data.data.token);
      return response;
    }
  } catch (error) {
    console.log(error.response.data.errors);
    response.message = error.response.data.message;
    return response;
  }
};

export const getUser = async () => {
  try {
    const res = await axios.get(`${url}/auth`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.data;
  } catch (error) {
    localStorage.removeItem("token");
    window.location.href = "/login";
    console.log(error);
  }
};

export const logOut = async () => {
  try {
    const res = await axios.post(
      `${url}/auth/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.status === 200) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  } catch (error) {
    console.log(error);
  }
};
