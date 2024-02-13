import axios from "axios";
const url = import.meta.env.VITE_URL;
const token = localStorage.getItem("token");

export const getSubscriptions = async () => {
  try {
    const res = await axios.get(`${url}/subscriptions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.data;
  } catch (error) {
    return error;
  }
};

export const showSubscription = async (id) => {
  try {
    const res = await axios.get(`${url}/subscriptions/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const updateSubscription = async (id, data) => {
  try {
    const res = await axios.put(`${url}/subscriptions/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const deleteSubscription = async (id) => {
  try {
    const res = await axios.delete(`${url}/subscriptions/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
