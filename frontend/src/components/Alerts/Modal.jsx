import Swal from 'sweetalert2';

export const Modal = async (title, text, icon, content) => {
    const result = await Swal.fire({
      title: title,
      text: text,
      icon: icon,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    });
  
    if (result.isConfirmed) {
        await Swal.fire({
            title: title,
            text: content,
            icon: 'success'
        });
        return {confirmed: true}
    } else {
        await Swal.fire({
            title: "Cierre de sesión",
            text: 'Se ha cancelado el cierre de sesión',
            icon: 'info',
            timer: 1500
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