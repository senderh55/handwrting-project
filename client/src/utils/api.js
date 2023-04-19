import axios from "axios";

const serverURL = "http://localhost:8000";

// api.js is used to make the requests to the server and handle the responses, this is the ONLY file that makes interactions with the server
export const login = async (email, password) => {
  try {
    const data = { email, password };
    const response = await axios.post(`${serverURL}/users/login`, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const signup = async (name, email, password) => {
  const data = { name, email, password };
  try {
    const response = await axios.post(`${serverURL}/users`, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const userEmailVerification = async (email, verificationCode) => {
  try {
    const response = await axios.patch(
      `${serverURL}/users/emailVerification/`,
      {
        email,
        verificationCode,
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const logout = async (token) => {
  try {
    const response = await axios.post(
      `${serverURL}/users/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createProfile = async (token, name, age, description) => {
  const profile = { name, age, description };
  try {
    const response = await axios.post(`${serverURL}/profiles`, profile, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateProfile = async (id, token, name, age, description) => {
  const profile = { name, age, description };
  try {
    const response = await axios.patch(`${serverURL}/profiles/${id}`, profile, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteProfile = async (id, token) => {
  try {
    const response = await axios.delete(`${serverURL}/profiles/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getProfiles = async (token) => {
  try {
    const response = await axios.get(`${serverURL}/profiles`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteUser = async (token) => {
  try {
    const response = await axios.delete(`${serverURL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const changePassword = async (token, password, newPassword) => {
  const data = { password, newPassword };
  try {
    const response = await axios.patch(`${serverURL}/users/me`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const resetPassword = async (newPassword, verificationCode, email) => {
  const data = { email, verificationCode, newPassword };
  try {
    const response = await axios.patch(
      `${serverURL}/users/resetPassword`,
      data
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// create GET request for user verification code
export const resendVerificationCode = async (email, forgotPassword) => {
  // forgotPassword is a boolean value that indicates if the user is requesting a new verification code because they forgot their password
  try {
    const response = await axios.patch(
      `${serverURL}/users/resendVerificationCode`,
      {
        email,
        forgotPassword,
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
