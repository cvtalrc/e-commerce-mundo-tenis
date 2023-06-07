import Swal from 'sweetalert2'

export const Toast = (position, icon, title) => {
    Swal.mixin({
    toast: true,
    position: position,
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    confirmButtonColor: 'secondary.main',
    cancelButtonColor: '#d33',
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  }).fire({
        icon: icon,
        title: title
  })
}