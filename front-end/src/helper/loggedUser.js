export async function saveUserData(data) {
  const userData = {
    name: data.name,
    email: data.email,
    role: data.role,
    token: data.token,
  };

  await localStorage.setItem('user', JSON.stringify(userData));
}

export async function deleteUserData() {
  localStorage.removeItem('user');
}

export function checkIfLogged() {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    return true;
  }
  return false;
}

export function getUserRole() {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user.role) {
    return user.role;
  }
  return 'notfound';
}
