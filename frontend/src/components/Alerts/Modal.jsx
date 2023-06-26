import Swal from 'sweetalert2';

export const Modal = async (title, text, icon, content) => {
    const result = await Swal.fire({
      title: title,
      text: text,
      icon: icon,
      showCancelButton: icon === 'error' || icon == 'success' ? false : true,
      showConfirmButton: icon === 'error' || icon === 'success' ? false : true,
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

 