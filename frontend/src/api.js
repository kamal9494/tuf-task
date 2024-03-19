import axios from "axios";

const makeApiCall = async (url, method, data) => {
  try {
    const response = await axios({
      method,
      url,
      data,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export default makeApiCall;
