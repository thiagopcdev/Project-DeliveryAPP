const verifyRegister = (obj) => {
  const regexEmail = /^[a-z0-9._]+@[a-z]+\.[a-z]{2,3}(?:\.[a-z]{2})?$/;
  const six = 6;
  const twelve = 12;
  if (regexEmail.test(obj.email)
      && obj.pass.length >= six
      && obj.name.length >= twelve) {
    return false;
  }
  return true;
};

export default verifyRegister;
