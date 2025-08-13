document.addEventListener('DOMContentLoaded', function() {
    // Variáveis para controle dos corações
    let activeHearts = 0;
    const maxHearts = 50;
    let heartsInterval;
    
    // Simular tempo de carregamento
    setTimeout(function() {
        document.getElementById('loadingScreen').style.opacity = '0';
        setTimeout(function() {
            document.getElementById('loadingScreen').style.display = 'none';
            document.getElementById('mainContent').classList.add('show');
            
            // Iniciar corações flutuantes
            createFloatingHearts();
            heartsInterval = setInterval(createFloatingHearts, 3000);
        }, 1000);
    }, 2000);

    // Botão interativo
    const futureBtn = document.getElementById('futureBtn');
    const futureText = document.getElementById('futureText');
    
    futureBtn.addEventListener('click', function() {
        futureText.classList.toggle('hidden');
        
        if (!futureText.classList.contains('hidden')) {
            futureBtn.textContent = 'Obrigado por existir ❤';
            createHeartExplosion(futureBtn);
        } else {
            futureBtn.textContent = 'Clique para ver nossa jornada';
        }
    });

    // Função para criar corações flutuantes
    function createFloatingHearts() {
        const heartsContainer = document.getElementById('floatingHearts');
        
        // Se já atingiu o máximo de corações, não cria mais
        if (activeHearts >= maxHearts) {
            clearInterval(heartsInterval);
            return;
        }
        
        const heartCount = 15;
        
        for (let i = 0; i < heartCount && activeHearts < maxHearts; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.classList.add('heart');
                heart.innerHTML = '❤';
                heart.style.left = Math.random() * 100 + 'vw';
                heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
                heart.style.fontSize = (Math.random() * 10 + 10) + 'px';
                heart.style.opacity = Math.random() * 0.5 + 0.3;
                heartsContainer.appendChild(heart);
                activeHearts++;
                
                // Remove o coração quando a animação terminar
                heart.addEventListener('animationend', function() {
                    heart.remove();
                    activeHearts--;
                    
                    // Reinicia o intervalo se estava parado
                    if (activeHearts < maxHearts * 0.7 && !heartsInterval) {
                        heartsInterval = setInterval(createFloatingHearts, 3000);
                    }
                });
            }, i * 200);
        }
    }

    // Função para explosão de corações
    function createHeartExplosion(element) {
        const rect = element.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.classList.add('heart');
                heart.innerHTML = '❤';
                heart.style.left = x + 'px';
                heart.style.top = y + 'px';
                heart.style.position = 'fixed';
                heart.style.animation = `explode ${Math.random() * 1 + 1}s forwards`;
                document.body.appendChild(heart);
                
                const angle = Math.random() * Math.PI * 2;
                const distance = Math.random() * 100 + 50;
                const xEnd = x + Math.cos(angle) * distance;
                const yEnd = y + Math.sin(angle) * distance;
                
                heart.style.setProperty('--x-end', `${xEnd}px`);
                heart.style.setProperty('--y-end', `${yEnd}px`);
                
                setTimeout(() => {
                    heart.remove();
                }, 1000);
            }, i * 50);
        }
        
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes explode {
                0% {
                    transform: translate(0, 0) scale(1);
                    opacity: 1;
                }
                100% {
                    transform: translate(var(--x-end), var(--y-end)) scale(0);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Efeito de digitação no subtítulo
    const subtitle = document.querySelector('.subtitle');
    const originalText = subtitle.textContent;
    subtitle.textContent = '';
    
    let i = 0;
    const typingEffect = setInterval(() => {
        if (i < originalText.length) {
            subtitle.textContent += originalText.charAt(i);
            i++;
        } else {
            clearInterval(typingEffect);
        }
    }, 100);
});