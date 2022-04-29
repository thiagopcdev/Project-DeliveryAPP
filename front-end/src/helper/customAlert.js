import Swal from 'sweetalert2';

const customAlert = {
  success: () => Swal.fire({
    title: 'Register new user',
    text: 'Novo usuario registrado com sucesso',
    icon: 'success',
    confirmButtonText: 'OK',
  }),
  fail: () => Swal.fire({
    title: 'Request error',
    text: 'O usuário já existe!',
    icon: 'error',
    confirmButtonText: 'OK',
  }),
};
export default customAlert;
