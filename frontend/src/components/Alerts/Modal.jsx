import Swal from 'sweetalert2';

export const Modal = (title, text, icon, content) => {
  return Swal.fire({
    title: title,
    text: text,
    icon: icon,
    showCancelButton: icon === 'error' || icon === 'success' || icon === 'info' || icon === 'warning'? false : true,
    showConfirmButton: icon === 'error' || icon === 'success' || icon === 'info' || icon === 'warning'? false : true,
    confirmButtonText: 'Sí',
    cancelButtonText: 'No',
    confirmButtonColor: '#008f39',
    cancelButtonColor: '#bebebe',
    timer: icon === 'error' || icon === 'success' || icon === 'info' || icon === 'warning'? 5000 : false
  });
};
 
  // if (result.isConfirmed) {
    //     await Swal.fire({
    //         title: 'Cierre de sesión exitoso',
    //         text: content,
    //         icon: 'success',
    //         timer: 3000,
    //         showConfirmButton: false,
    //     });
    //     return {confirmed: true}
    // }