  document.addEventListener("DOMContentLoaded", () => {
    const btnCliente = document.getElementById("showCliente");
    const btnTendero = document.getElementById("showTendero");

    const carousels = {
      cliente: document.getElementById("carouselCliente"),
      tendero: document.getElementById("carouselTendero")
    };

    let current = {
      cliente: 0,
      tendero: 0
    };

    function showCarousel(type) {
      Object.keys(carousels).forEach(key => {
        carousels[key].classList.remove("active");
        document.getElementById("show" + capitalize(key)).classList.remove("active");
      });

      carousels[type].classList.add("active");
      document.getElementById("show" + capitalize(type)).classList.add("active");
      updateSlide(type);
    }

    function updateSlide(type) {
      const images = carousels[type].querySelectorAll("img");
      images.forEach((img, index) => {
        img.classList.toggle("active", index === current[type]);
      });
    }

    function nextSlide() {
      const type = getActiveType();
      const images = carousels[type].querySelectorAll("img");
      current[type] = (current[type] + 1) % images.length;
      updateSlide(type);
    }

    function prevSlide() {
      const type = getActiveType();
      const images = carousels[type].querySelectorAll("img");
      current[type] = (current[type] - 1 + images.length) % images.length;
      updateSlide(type);
    }

    function getActiveType() {
      return carousels.cliente.classList.contains("active") ? "cliente" : "tendero";
    }

    function capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    btnCliente.addEventListener("click", () => showCarousel("cliente"));
    btnTendero.addEventListener("click", () => showCarousel("tendero"));
    document.getElementById("nextBtn").addEventListener("click", nextSlide);
    document.getElementById("prevBtn").addEventListener("click", prevSlide);

    // Mostrar primero el carrusel del cliente
    showCarousel("cliente");

    // Lightbox
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const close = document.querySelector(".close");
    const prev = document.getElementById("prev");
    const next = document.getElementById("next");
    let currentIndex = 0;

    function updateLightboxImage(images) {
      lightboxImg.src = images[currentIndex].src;
    }

    function setupImageClickHandlers() {
      Object.keys(carousels).forEach(type => {
        const images = carousels[type].querySelectorAll("img");
        images.forEach((img, index) => {
          img.addEventListener("click", () => {
            const activeType = getActiveType();
            currentIndex = Array.from(carousels[activeType].querySelectorAll("img")).indexOf(img);
            updateLightboxImage(carousels[activeType].querySelectorAll("img"));
            lightbox.style.display = "flex";
          });
        });
      });
    }

    setupImageClickHandlers();

    close.addEventListener("click", () => {
      lightbox.style.display = "none";
    });

    prev.addEventListener("click", () => {
      const type = getActiveType();
      const images = carousels[type].querySelectorAll("img");
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateLightboxImage(images);
    });

    next.addEventListener("click", () => {
      const type = getActiveType();
      const images = carousels[type].querySelectorAll("img");
      currentIndex = (currentIndex + 1) % images.length;
      updateLightboxImage(images);
    });
  });