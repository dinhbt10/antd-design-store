import instance from "../utils/axios-customize";

export const postRegister = (data) => {
  return instance.post("api/v1/user/register", data);
};

export const postLogin = (data) => {
  console.log(data);
  return instance.post("api/v1/auth/login", data);
};
