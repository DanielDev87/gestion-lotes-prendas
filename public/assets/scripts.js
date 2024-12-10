// scripts.js
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');  // Obtener el token del localStorage

    if (!token) {
        // Si no hay token, redirigir al login
        window.location.href = '/public/pages/login.html';  // Usar la ruta correcta
    } else {
        // Si hay token, redirigir al Dashboard o página principal
        window.location.href = '/index.html';  // O cualquier página principal de la app
    }
});

// También puedes agregar otras interacciones con la API aquí.
// Ejemplo de cómo hacer una solicitud con Fetch
const token = localStorage.getItem('token');
fetch('http://localhost:3000/api/users', {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${token}`
    }
})
.then(response => response.json())
.then(data => {
    console.log(data);  // Mostrar los usuarios en la vista
})
.catch(error => {
    console.error('Error:', error);
});
