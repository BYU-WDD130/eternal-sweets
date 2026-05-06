document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('carouselTrack');
    const slides = Array.from(track.children);
    const dotsContainer = document.getElementById('carouselDots');
    
    let currentSlideIndex = 0;
    const slideWidth = slides[0].getBoundingClientRect().width;
    
    // 1. Generar los puntos de navegación (dots) dinámicamente
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        if (index === 0) dot.classList.add('active');
        dotsContainer.appendChild(dot);
        
        // Permite cambiar de foto al hacer clic en el punto
        dot.addEventListener('click', () => {
            currentSlideIndex = index;
            updateCarousel();
            resetInterval(); // Reinicia el temporizador al hacer clic
        });
    });
    
    const dots = Array.from(dotsContainer.children);
    
    // 2. Función principal para mover el carrusel y actualizar puntos
    function updateCarousel() {
        // Mueve la pista
        track.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
        
        // Actualiza el punto activo
        dots.forEach(dot => dot.classList.add('active'));
        dots[currentSlideIndex].classList.add('active');
    }
    
    // 3. Función para pasar a la siguiente diapositiva automáticamente
    function moveToNextSlide() {
        currentSlideIndex++;
        if (currentSlideIndex === slides.length) {
            currentSlideIndex = 0; // Vuelve al principio
        }
        updateCarousel();
    }
    
    // 4. Configurar el cambio automático cada 3 segundos
    let slideInterval = setInterval(moveToNextSlide, 3000);
    
    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(moveToNextSlide, 3000);
    }
    
    // (Opcional) Detener el carrusel cuando el mouse está encima
    track.addEventListener('mouseenter', () => clearInterval(slideInterval));
    track.addEventListener('mouseleave', () => resetInterval());
});