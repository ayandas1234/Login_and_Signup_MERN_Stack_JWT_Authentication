import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Fancy Success Toast
export const handleSuccess = (msg) => {
    toast.success(`✅ ${msg}`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
        style: {
            backgroundColor: '#e6ffed',
            color: '#2e7d32',
            fontWeight: '600',
            borderRadius: '10px',
            boxShadow: '0 0 10px rgba(46, 125, 50, 0.2)'
        },
        icon: '🚀',
    });
};

// Fancy Error Toast
export const handleError = (msg) => {
    toast.error(`⚠️ ${msg}`, {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
        style: {
            backgroundColor: '#ffebee',
            color: '#b71c1c',
            fontWeight: '600',
            borderRadius: '10px',
            boxShadow: '0 0 10px rgba(183, 28, 28, 0.2)'
        },
        icon: '🔥',
    });
};
