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

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-pedidos");

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault(); // Evita que la página se recargue

            // Captura los datos del formulario
            const nombre = document.getElementById("nombre").value;
            const postre = document.getElementById("postre").value;
            const mensaje = document.getElementById("mensaje").value;

            // Reemplaza con tu número real de WhatsApp (código de país + número sin espacios)
            // Ejemplo: 5215555555555 para México o 1XXXXXXXXXX para USA
            const telefonoWhatsApp = "+1(201) 889-8079"; 

            // Formatea el mensaje estético para WhatsApp
            const textoMensaje = `¡Hola *Eternal Sweets*! 🍰%0A` +
                                 `Me gustaría realizar una cotización:%0A%0A` +
                                 `👤 *Nombre:* ${encodeURIComponent(nombre)}%0A` +
                                 `🎂 *Producto:* ${encodeURIComponent(postre)}%0A` +
                                 `💬 *Detalles:* ${encodeURIComponent(mensaje)}`;

            // Crea el enlace de la API de WhatsApp
            const urlWhatsApp = `https://api.whatsapp.com/send?phone=${telefonoWhatsApp}&text=${textoMensaje}`;

            // Abre WhatsApp en una pestaña nueva
            window.open(urlWhatsApp, "_blank");
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const navMobile = document.getElementById("nav-mobile");
    const menuOverlay = document.getElementById("menu-overlay");
    const mobileLinks = document.querySelectorAll(".mobile-link");

    // Función para abrir/cerrar el menú lateral
    const toggleMenu = () => {
        hamburgerBtn.classList.toggle("active");
        navMobile.classList.toggle("active");
        menuOverlay.classList.toggle("active");
        
        // Evita el scroll molesto en el fondo de la página mientras está abierto
        document.body.style.overflow = navMobile.classList.contains("active") ? "hidden" : "";
    };

    // Escuchadores de eventos
    hamburgerBtn.addEventListener("click", toggleMenu);
    menuOverlay.addEventListener("click", toggleMenu);

    // Cierra el menú al presionar cualquier enlace de navegación móvil
    mobileLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (navMobile.classList.contains("active")) {
                toggleMenu();
            }
        });
    });
});