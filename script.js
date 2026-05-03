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

    const text = (target.innerText || target.textContent || "").trim();
    const href = target.getAttribute('href') || "";
    
    // Check for "App Estabelecimento" or "App Entregador" patterns
    const isAppEstabelecimento = text.includes('App Estabelecimento') || 
                                 text.includes('Savana') ||
                                 text.includes('Sou um Lojista') ||
                                 href.includes('estabelecimento');
                                 
    const isAppEntregador = text.includes('App Entregador') || 
                             text.includes('Guepardo Entregador') || 
                             text.includes('Sou um Entregador') ||
                             text.includes('SEJA UM GUEPARDO') ||
                             href.includes('entregador');

    if (isAppEstabelecimento || isAppEntregador) {
        playRoar();
    }
});
