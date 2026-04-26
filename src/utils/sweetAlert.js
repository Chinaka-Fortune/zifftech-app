import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

// Common styling for Ziffcode theme
const customClass = {
    popup: 'rounded-4 shadow-lg border-0',
    title: 'fw-black text-dark',
    htmlContainer: 'text-muted fs-5',
    confirmButton: 'btn btn-primary rounded-pill px-4 py-2 fw-bold shadow-sm mx-2',
    cancelButton: 'btn btn-outline-dark rounded-pill px-4 py-2 fw-bold mx-2',
};

const buttonsStyling = false; // We use Bootstrap classes directly

export const showSuccess = (title = "Success!", text = "") => {
    return MySwal.fire({
        icon: 'success',
        title,
        text,
        customClass,
        buttonsStyling,
        confirmButtonText: 'Great!'
    });
};

export const showError = (title = "Error!", text = "Something went wrong.") => {
    return MySwal.fire({
        icon: 'error',
        title,
        text,
        customClass,
        buttonsStyling,
        confirmButtonText: 'Okay'
    });
};

export const showInfo = (title = "Info", text = "") => {
    return MySwal.fire({
        icon: 'info',
        title,
        text,
        customClass,
        buttonsStyling,
        confirmButtonText: 'Understood'
    });
};

export const showConfirm = (title = "Are you sure?", text = "You won't be able to revert this!", confirmButtonText = "Yes, proceed") => {
    return MySwal.fire({
        icon: 'warning',
        title,
        text,
        showCancelButton: true,
        customClass,
        buttonsStyling,
        confirmButtonText,
        cancelButtonText: 'Cancel',
        reverseButtons: true // Puts "Proceed" on the right, typical modern UX
    });
};
