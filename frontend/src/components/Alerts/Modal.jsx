import Swal from 'sweetalert2';

export const Modal = async (title, text, icon, content) => {
    const result = await Swal.fire({
      title: title,
      text: text,
      icon: icon,
      showCancelButton: icon === 'error' || 'success' ? false : true,
      showConfirmButton: icon === 'error' || 'success' ? false : true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
      confirmButtonColor: '#008f39',
      cancelButtonColor: '#bebebe',
      timer: icon === 'error' || 'success' ? 2000 : false
    });

    if (result.isConfirmed) {
        await Swal.fire({
            title: 'Cierre de sesión exitoso',
            text: content,
            icon: 'success',
            timer: 3000,
            showConfirmButton: false,
        });
        return {confirmed: true}
    }
  };

//   Swal.fire({
//         title: title,
//         text: content,
//         icon: type,
//         type: type,
//         showConfirmButton: (type === 'error' || type === 'warning') ? true : false,
//         confirmButtonText: type === 'error' ? 'Ok' : 'Sí',
//         showCancelButton: type === 'warning' ? true : false,
//         cancelButtonText: 'No',
//         confirmButtonColor: '#5E67FF',
//         timer: type === 'success' ? 5000 : false
    
//     });