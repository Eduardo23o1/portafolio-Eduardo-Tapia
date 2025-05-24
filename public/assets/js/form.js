const form = document.getElementById('contact-form');
  const successMessage = document.getElementById('success-message');

  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evita la recarga

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        successMessage.style.display = 'block'; // Mostrar mensaje
        form.reset(); // Limpiar formulario
      } else {
        alert('Hubo un error al enviar el formulario. Intenta nuevamente.');
      }
    } catch (error) {
      alert('Error al enviar el formulario. Intenta nuevamente.');
    }
  });