import Swal from 'sweetalert2';

export const BASE_URL = 'http://10.11.1.67:8012/api/v1'; // Replace with your actual base URL

let TOKEN = '';
if (typeof window !== 'undefined') {
  TOKEN = localStorage.getItem('access_token') ;
}

const fetchData = async (
  endpoint,
  method = 'GET', // Default to GET method
  body,
  options = {}
) => {
  try {
    const url = `${BASE_URL}/${endpoint}`;
    console.log('Fetching URL:', url);
    var headers = {
      Authorization: `Bearer ${TOKEN}`,
      Accept: 'application/json',
    };
    // Adjust headers: do NOT set JSON Content-Type for FormData or upload endpoints
    const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;
    const isUploadEndpoint = endpoint === 'user/group/upload' || endpoint === 'support-requests/upload-file';
    if (!isFormData && !isUploadEndpoint) {
      headers = {
        ...headers,
        'Content-Type': 'application/json',
      };
    }
    const response = await fetch(url, {
      method,
      headers,
      body,
      ...options,
    });

    if (!response.ok) {
      const error = await response.json();
      console.log('API Error:', error);
      if (
        error.error === "Invalid token" ||
        error.error === "Token has expired" ||
        error.error === "Not enough segments"
      ) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '#/login';
      }

      console.error('API Error:', error);
      return showErrorToast(`Error: ${error.error || error.message || 'An error occurred'}`);
    }
    if (["POST", "PATCH", "DELETE"].includes(method)) {
      showSuccessToast('Success: Request was successful');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

const showErrorToast = (message) => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  Toast.fire({
    icon: 'error',
    title: message,
  });
};

const showSuccessToast = (message) => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  Toast.fire({
    icon: 'success',
    title: message,
  });
};

export default fetchData;