import httpRequest from "../ultils";

export const checkUserName = async (name) => {
    const nameUser = await httpRequest.post("/user/checkNameUser", { name });
    if (nameUser.data._id) {
      return true;
    } else {
      return false;
    }
};

export const checkUser = async (name, password) => {

  const data = {
    name: name,
    password: password.toLowerCase(),
  };

  try {
    const token = await httpRequest.post("/user/check", data);
    if (token.data === "user not exit") {
      return token.data
    } else {
      return token.data
    }
  } catch (error) {
    console.log(error, "false check user");
    return "error on server"
  }
};

export const checkPassword = (password) => {
  if (password.length > 0) {
    if (password.length < 6) {
      return false;
    } else {
      return true;
    }
  } 
  return false;
};

export const checkConfirmPassword = (password, confirmPassword) => {
  if (confirmPassword.length > 0) {
    if (password !== confirmPassword) {
      return false;
    } else {
      return true;
    }
  }
};
