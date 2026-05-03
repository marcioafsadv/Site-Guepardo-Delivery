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
