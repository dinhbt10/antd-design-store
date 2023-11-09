import instance from "../utils/axios-customize";

export const postRegister = (data) => {
  return instance.post("api/v1/user/register", data);
};

export const postLogin = (data) => {
  return instance.post("api/v1/auth/login", data);
};

export const callFetchAccount = () => {
  return instance.get("api/v1/auth/account");
};
