import Swal from 'sweetalert2'

export const Toast = (position, icon, title) => {
    Swal.mixin({
    toast: true,
    position: position,
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  }).fire({
        icon: icon,
        title: title
  })
}