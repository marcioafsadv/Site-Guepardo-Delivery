// JavaScript para micro-animações interativas (opcional, mantém o layout responsivo de forma limpa)
document.addEventListener('DOMContentLoaded', () => {
    // Adiciona um efeito simples de rolagem ao cabeçalho
    const header = document.querySelector('.glass-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = '#2D1409'; // Cor Chocolate sólida ao rolar
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.4)';
        } else {
            header.style.background = '#2D1409'; // Mantém a paleta Chocolate
            header.style.boxShadow = 'none';
        }
    });

    // Inicializa o carrossel de parceiros
    initPartnersCarousel();
});

// Google Ads Conversion Tracking
function trackInscricao() {
    if (typeof gtag === 'function') {
        gtag('event', 'conversion', {'send_to': 'AW-18036476072/zjYOCOj886UEEKiRu5hD'});
        console.log('Google Ads Conversion Tracked: Inscrição');
    }
}

// Cheetah Roar Logic
const roarAudio = new Audio('assets/roar.mp3');
roarAudio.preload = 'auto';

function playRoar() {
    // Reset and play
    roarAudio.currentTime = 0;
    roarAudio.play().catch(e => {
        console.log("Audio playback blocked: ", e);
    });
}

document.addEventListener('click', (e) => {
    const target = e.target.closest('a, button');
    if (!target) return;

    const text = (target.textContent || "").trim().toLowerCase();
    const href = (target.getAttribute('href') || "").toLowerCase();
    
    // Check for "App Estabelecimento" or "App Entregador" patterns (Case Insensitive)
    const isAppEstabelecimento = text.includes('estabelecimento') || 
                                 text.includes('savana') ||
                                 text.includes('lojista') ||
                                 href.includes('estabelecimento');
                                 
    const isAppEntregador = text.includes('entregador') || 
                             text.includes('motorista') ||
                             text.includes('motoboy') ||
                             text.includes('guepardo') ||
                             href.includes('entregador');

    // Only play if it's likely an app-related link
    if (isAppEstabelecimento || isAppEntregador) {
        // Special case: ignore links to internal pages like about.html or suporte.html 
        // unless they explicitly mention the apps in the text
        if (href.endsWith('.html') && !text.includes('app') && !text.includes('savana')) {
            return;
        }
        
        playRoar();
    }
});

// Lógica do Carrossel de Parceiros 3D em Loop
function initPartnersCarousel() {
    const track = document.getElementById('partnersCarousel');
    if (!track) return;
    
    const items = Array.from(track.querySelectorAll('.carousel-item'));
    const dots = Array.from(document.querySelectorAll('.carousel-dots .dot'));
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    
    let currentIndex = 0;
    let autoPlayInterval;
    
    function updateCarousel(newIndex) {
        currentIndex = (newIndex + items.length) % items.length;
        
        items.forEach((item, i) => {
            // Remove as classes de estado anteriores
            item.classList.remove('active', 'prev-1', 'next-1', 'prev-2', 'next-2');
            
            // Calcula a diferença de posição relativa ao ativo
            let diff = i - currentIndex;
            
            // Ajusta a diferença para o carrossel circular
            if (diff < -2) diff += items.length;
            if (diff > 2) diff -= items.length;
            
            // Atribui a classe de acordo com a distância
            if (diff === 0) {
                item.classList.add('active');
            } else if (diff === 1) {
                item.classList.add('next-1');
            } else if (diff === 2) {
                item.classList.add('next-2');
            } else if (diff === -1) {
                item.classList.add('prev-1');
            } else if (diff === -2) {
                item.classList.add('prev-2');
            }
        });
        
        // Atualiza a classe ativa nos dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }
    
    function nextSlide() {
        updateCarousel(currentIndex + 1);
    }
    
    function prevSlide() {
        updateCarousel(currentIndex - 1);
    }
    
    function startAutoPlay() {
        stopAutoPlay();
        autoPlayInterval = setInterval(nextSlide, 3000);
    }
    
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
    }
    
    // Controles manuais (Setas)
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            startAutoPlay();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            startAutoPlay();
        });
    }
    
    // Clique nos dots
    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            updateCarousel(idx);
            startAutoPlay();
        });
    });
    
    // Clique direto no item lateral traz ele para o foco
    items.forEach((item, idx) => {
        item.addEventListener('click', () => {
            if (currentIndex !== idx) {
                updateCarousel(idx);
                startAutoPlay();
            }
        });
    });
    
    // Pausa autoplay quando o mouse estiver sobre o carrossel
    track.addEventListener('mouseenter', stopAutoPlay);
    track.addEventListener('mouseleave', startAutoPlay);
    
    // Inicia na posição 0 com autoplay
    updateCarousel(0);
    startAutoPlay();
}
