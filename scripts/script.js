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
    // Calculamos el desplazamiento dejando un margen para ver las fotos laterales
    const offset = currentSlideIndex * 72; // 70% de ancho + gap
    track.style.transform = `translateX(-${offset}%)`;
    
    // Quitamos y ponemos la clase active para el efecto de escala
    slides.forEach((slide, index) => {
        slide.classList.remove('active');
        if (index === currentSlideIndex) {
            slide.classList.add('active');
        }
    });

    // Actualizamos los dots
    dots.forEach(dot => dot.classList.remove('active'));
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