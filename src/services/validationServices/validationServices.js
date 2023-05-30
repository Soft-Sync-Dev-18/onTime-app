export const validateEmail = mail => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(mail).toLowerCase());
};
export const namePattren = /^[a-zA-Z ]+(\.|')?[a-zA-Z ]+(\.|')?$/;
export const personalDetailFormValidation = values => {
  const errorList = {};
  if (!values.name) {
    errorList.name = 'name is required';
  } else if (values.name.length < 2) {
    errorList.firstName = 'name should have atleast two alphabets';
  } else if (/\d/.test(values.name)) {
    errorList.firstName = 'name should not contain any numbers';
  }
  if (!values.surName) {
    errorList.surName = 'Surname is required';
  } else if (values.surName.length < 2) {
    errorList.surName = 'Surname should have atleast two alphabets';
  } else if (/\d/.test(values.surName)) {
    errorList.surName = 'Surname should not contain any numbers';
  }
  if (!values.email) {
    errorList.email = 'Email is required';
  } else if (!validateEmail(values.email)) {
    errorList.email = 'Email is not valid';
  }
  if (!values.password) {
    errorList.password = 'password is required';
  } else if (values.password.length < 8) {
    errorList.password = 'password  should have atleast eight alphabets';
  }
  if (!values.contactNumber) {
    errorList.contactNumber = 'Email is required';
  } else if (values.contactNumber.length < 10) {
    errorList.contactNumber = 'cellNo should have atleast ten digit';
  }
  if (!values.idCard) {
    errorList.idCard = 'ID Card is required';
  } else if (values.idCard.length < 15) {
    errorList.idCard = 'cellNo should have atleast fourteen digit';
  }

  return errorList;
};
export const loginDetailsFormValidation = values => {
  const errorList = {};
  if (!values.email) {
    errorList.email = 'Email is required';
  } else if (!validateEmail(values.email)) {
    errorList.email = 'Email is not valid';
  }
  if (!values.password) {
    errorList.password = 'password is required';
  } else if (values.password.length < 8) {
    errorList.password = 'password  should have atleast eight alphabets';
  }
  return errorList;
};
export const signupDetailsFormValidation = values => {
  const errorList = {};
  if (!values.name) {
    errorList.name = 'name is required';
  } else if (values.name.length < 2) {
    errorList.name = 'name should have atleast two alphabets';
  } else if (/\d/.test(values.name)) {
    errorList.name = 'name should not contain any numbers';
  }
  if (!values.email) {
    errorList.email = 'Email is required';
  } else if (!validateEmail(values.email)) {
    errorList.email = 'Email is not valid';
  }
  if (!values.password) {
    errorList.password = 'password is required';
  } else if (values.password.length < 8) {
    errorList.password = 'password  should have atleast eight alphabets';
  }
  if (!values.confirmPassword) {
    errorList.confirmPassword = 'confirm password is required';
  } else if (values.confirmPassword.length < 8) {
    errorList.confirmPassword = 'password  should have atleast eight alphabets';
  } else if (values.password !== values.confirmPassword) {
    errorList.confirmPassword = 'password & confirm password not match';
  }

  return errorList;
};
export const forgetPasswordFormValidation = values => {
  const errorList = {};
  if (!values.email) {
    errorList.email = 'Email is required';
  } else if (!validateEmail(values.email)) {
    errorList.email = 'Email is not valid';
  }
  return errorList;
};
export const resetPasswordValidation = values => {
  const errorList = {};
  if (!values.password) {
    errorList.password = 'password is required';
  } else if (values.password.length < 8) {
    errorList.password = 'password  should have atleast eight alphabets';
  }
  if (!values.confirmPassword) {
    errorList.confirmPassword = 'confirm password is required';
  } else if (values.confirmPassword.length < 8) {
    errorList.confirmPassword = 'password  should have atleast eight alphabets';
  } else if (values.password !== values.confirmPassword) {
    errorList.confirmPassword = 'password & confirm password not match';
  }

  return errorList;
};

export default validations = {
  forgetPasswordFormValidation,
  resetPasswordValidation,
  loginDetailsFormValidation,
};
