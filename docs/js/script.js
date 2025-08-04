document.addEventListener("DOMContentLoaded", function() {
    const toggleThemeButton = document.getElementById('toggleTheme');
    
    if (toggleThemeButton) {  
        toggleThemeButton.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-bs-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';

            localStorage.setItem('theme', newTheme);
            console.log('Nuevo tema guardado:', newTheme);

            document.documentElement.setAttribute('data-bs-theme', newTheme);
        });
    } else {
        console.error('El botón con id "toggleTheme" no se ha encontrado.');
    }

    const savedTheme = localStorage.getItem('theme') || 'light';
    console.log('Tema guardado en localStorage:', savedTheme);
    document.documentElement.setAttribute('data-bs-theme', savedTheme);

});
