document.addEventListener("DOMContentLoaded", function() {   
    // Creación da aparición do Textarea
    const outroMotivo = document.getElementById('consulta');
    const outroMotivoContainer = document.getElementById('outroMotivoContainer');

    outroMotivo.addEventListener('change', function() {
        if (this.value == 'outroMotivo') {
            outroMotivoContainer.style.display = 'block';
            document.getElementById('outraConsulta').required = true;
        } else {
            outroMotivoContainer.style.display = 'none';
            document.getElementById('outraConsulta').required = false;
        }
    });

    // Validación para o número de teléfono e o email
    const formulario = document.getElementById('formulario');
    formulario.addEventListener('submit', function(event) {
        const email = document.getElementById('email').value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            alert('O email introducido non ten o formato correcto.');
            event.preventDefault();
        }

        const telefono = document.getElementById('telefono').value;
        const telefonoRegex = /^[0-9]{9}$/;

        if (!telefonoRegex.test(telefono)) {
            alert('O número de teléfono debe conter exactamente 9 díxitos numéricos.');
            event.preventDefault();
        }
    });


});
