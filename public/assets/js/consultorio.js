        const galleryImages = document.querySelectorAll('.gallery img');
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const close = document.querySelector('.close');
        const prev = document.getElementById('prev');
        const next = document.getElementById('next');
        let currentIndex = 0;

        galleryImages.forEach((img, i) => {
            img.addEventListener('click', () => {
                lightbox.style.display = 'flex';
                lightboxImg.src = img.src;
                currentIndex = i;
            });
        });

        close.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });

        next.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % galleryImages.length;
            lightboxImg.src = galleryImages[currentIndex].src;
        });

        prev.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
            lightboxImg.src = galleryImages[currentIndex].src;
        });