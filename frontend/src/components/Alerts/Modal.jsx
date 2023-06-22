import Swal from 'sweetalert2';

export const Modal = async (title, text, icon, content) => {
    const result = await Swal.fire({
      title: title,
      text: text,
      icon: icon,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#1989F3',
      cancelButtonColor: '#6f6f6f',
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
    } else {
        await Swal.fire({
            title: "Cierre de sesión",
            text: 'Se ha cancelado el cierre de sesión',
            icon: 'info',
            timer: 3000,
            showCancelButton: false,
            showConfirmButton: false,
        })
        return {confirmed: false}
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