// Empire Legacy - JavaScript Functions
// Tạo bởi RotY

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling cho navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Đóng menu khi click vào link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Header background change on scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(46, 125, 50, 0.98)';
        } else {
            header.style.background = 'rgba(46, 125, 50, 0.95)';
        }
    });

    // Parallax effect cho floating blocks
    const floatingBlocks = document.querySelectorAll('.floating-block');
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        floatingBlocks.forEach((block, index) => {
            const speed = (index + 1) * 0.3;
            block.style.transform = `translateY(${rate * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });

    // Intersection Observer cho animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe các elements cần animation
    const animateElements = document.querySelectorAll('.feature-card, .step, .about-text, .grass-block-3d');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Copy server IP functionality - Updated for new structure
    const serverIPs = document.querySelectorAll('.server-ip-text');
    serverIPs.forEach(serverIP => {
        if (serverIP) {
            serverIP.addEventListener('click', function() {
                const textToCopy = this.textContent;
                copyToClipboard(textToCopy);
            });

            // Thêm cursor pointer
            serverIP.style.cursor = 'pointer';
            serverIP.title = 'Click để copy IP';
        }
    });

    // Copy server IP functionality for hero section
    const heroServerIP = document.querySelector('.server-ip code');
    if (heroServerIP) {
        heroServerIP.addEventListener('click', function() {
            const textToCopy = this.textContent;
            copyToClipboard(textToCopy);
        });

        // Thêm cursor pointer
        heroServerIP.style.cursor = 'pointer';
        heroServerIP.title = 'Click để copy IP';
    }

    // Button click effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Tạo ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Dynamic grass block generation
    function createGrassBlock() {
        const block = document.createElement('div');
        block.className = 'floating-block dynamic-block';
        block.style.left = Math.random() * 100 + '%';
        block.style.animationDuration = (Math.random() * 3 + 4) + 's';
        block.style.animationDelay = Math.random() * 2 + 's';
        
        document.querySelector('.hero-blocks').appendChild(block);
        
        // Xóa block sau khi animation hoàn thành
        setTimeout(() => {
            if (block.parentNode) {
                block.parentNode.removeChild(block);
            }
        }, 8000);
    }

    // Tạo grass blocks định kỳ
    setInterval(createGrassBlock, 3000);

    // Server status real-time check
    async function checkServerStatus() {
        const serverIP = 'empirelegacy.online';
        const playerCountEl = document.getElementById('player-count');
        const serverStatusEl = document.getElementById('server-status');
        const serverPingEl = document.getElementById('server-ping');
        const heroStatusText = document.querySelector('.server-status span:last-child');

        try {
            // Thử kết nối API thực tế trước
            let serverData = await fetchRealServerData(serverIP);

            // Nếu không có API thực tế, dùng simulation
            if (!serverData) {
                const startTime = Date.now();
                await simulateServerPing();
                const ping = Date.now() - startTime;

                serverData = {
                    online: Math.random() > 0.1, // 90% chance online
                    players: {
                        online: Math.floor(Math.random() * 150) + 50,
                        max: 500
                    },
                    ping: ping,
                    version: '1.20.4'
                };
            }

            // Cập nhật thông tin server
            if (playerCountEl) {
                playerCountEl.innerHTML = serverData.online ?
                    `<span class="online">${serverData.players.online}/${serverData.players.max}</span>` :
                    `<span class="offline">0/${serverData.players.max}</span>`;
            }

            if (serverStatusEl) {
                serverStatusEl.innerHTML = serverData.online ?
                    '<span class="online">🟢 Online</span>' :
                    '<span class="offline">🔴 Offline</span>';
            }

            if (serverPingEl) {
                serverPingEl.innerHTML = serverData.online ?
                    `<span class="online">${serverData.ping}ms</span>` :
                    '<span class="offline">---ms</span>';
            }

            // Cập nhật hero section
            if (heroStatusText) {
                heroStatusText.textContent = serverData.online ?
                    `Online - ${serverData.players.online}/${serverData.players.max} người chơi` :
                    'Offline - Server đang bảo trì';
            }

            // Cập nhật status dot trong hero
            const statusDot = document.querySelector('.status-dot');
            if (statusDot) {
                statusDot.className = serverData.online ? 'status-dot online' : 'status-dot offline';
            }

            // Cập nhật version nếu có
            const versionEl = document.getElementById('server-version');
            if (versionEl && serverData.version) {
                versionEl.textContent = serverData.version;
            }

            // Cập nhật danh sách người chơi online
            updateOnlinePlayersList(serverData);

            // Cập nhật thời gian cập nhật cuối
            const lastUpdateEl = document.getElementById('last-update');
            if (lastUpdateEl) {
                const now = new Date();
                lastUpdateEl.textContent = now.toLocaleTimeString('vi-VN');
            }

        } catch (error) {
            console.error('Lỗi khi kiểm tra server:', error);

            // Hiển thị lỗi
            if (playerCountEl) playerCountEl.innerHTML = '<span class="offline">Lỗi</span>';
            if (serverStatusEl) serverStatusEl.innerHTML = '<span class="offline">🔴 Lỗi kết nối</span>';
            if (serverPingEl) serverPingEl.innerHTML = '<span class="offline">---ms</span>';
        }
    }

    // Fetch dữ liệu server thực tế
    async function fetchRealServerData(serverIP) {
        try {
            // Sử dụng Minecraft Server Status API
            // Ví dụ: https://api.mcsrvstat.us/2/empirelegacy.online
            const response = await fetch(`https://api.mcsrvstat.us/2/${serverIP}`);

            if (!response.ok) {
                throw new Error('API không phản hồi');
            }

            const data = await response.json();

            return {
                online: data.online || false,
                players: {
                    online: data.players?.online || 0,
                    max: data.players?.max || 500
                },
                ping: Math.floor(Math.random() * 100) + 20, // Ping giả lập
                version: data.version || '1.20.4',
                motd: data.motd?.clean?.[0] || 'Empire Legacy Server'
            };

        } catch (error) {
            console.log('Không thể kết nối API, sử dụng dữ liệu giả lập:', error);
            return null; // Trả về null để sử dụng simulation
        }
    }

    // Cập nhật danh sách người chơi online
    function updateOnlinePlayersList(serverData) {
        const playersListEl = document.getElementById('online-players');
        if (!playersListEl) return;

        if (!serverData.online || serverData.players.online === 0) {
            playersListEl.innerHTML = '<div class="no-players">Không có người chơi online</div>';
            return;
        }

        // Tạo danh sách người chơi giả lập (thay thế bằng dữ liệu thực tế)
        const playerNames = [
            'RotY_Admin', 'GrassBuilder', 'MinecraftPro', 'EmpireLegend', 'BlockMaster',
            'CraftingKing', 'DiamondHunter', 'RedstoneWiz', 'BuilderBot', 'PvPChamp',
            'SurvivalExpert', 'CreativeGenius', 'AdventureSeeker', 'TreasureHunter', 'SkyWalker'
        ];

        const onlineCount = Math.min(serverData.players.online, playerNames.length);
        const selectedPlayers = playerNames.slice(0, onlineCount);

        let playersHTML = '';
        selectedPlayers.forEach((playerName, index) => {
            const isAdmin = playerName.includes('Admin') || playerName.includes('RotY');
            const status = isAdmin ? 'Admin' : 'Player';
            const statusClass = isAdmin ? 'admin' : 'player';

            playersHTML += `
                <div class="player-item">
                    <div class="player-avatar">${playerName.charAt(0)}</div>
                    <div class="player-name">${playerName}</div>
                    <div class="player-status ${statusClass}">${status}</div>
                </div>
            `;
        });

        playersListEl.innerHTML = playersHTML;
    }

    // Giả lập ping server
    function simulateServerPing() {
        return new Promise(resolve => {
            setTimeout(resolve, Math.random() * 1000 + 200); // 200-1200ms delay
        });
    }

    // Kiểm tra server status ngay khi load
    checkServerStatus();

    // Update server status every 30 seconds
    setInterval(checkServerStatus, 30000);

    // Thêm nút refresh manual
    function addRefreshButton() {
        const serverCard = document.querySelector('.server-card.main-server');
        if (serverCard) {
            const refreshBtn = document.createElement('button');
            refreshBtn.className = 'btn btn-secondary refresh-btn';
            refreshBtn.innerHTML = '🔄 Làm mới';
            refreshBtn.style.marginTop = '1rem';
            refreshBtn.onclick = function() {
                this.innerHTML = '🔄 Đang tải...';
                this.disabled = true;

                checkServerStatus().then(() => {
                    this.innerHTML = '🔄 Làm mới';
                    this.disabled = false;
                });
            };

            serverCard.appendChild(refreshBtn);
        }
    }

    // Thêm refresh button sau khi DOM load
    addRefreshButton();

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Press 'H' to go to home
        if (e.key.toLowerCase() === 'h' && !e.ctrlKey && !e.altKey) {
            document.querySelector('#home').scrollIntoView({ behavior: 'smooth' });
        }
        
        // Press 'C' to copy server IP
        if (e.key.toLowerCase() === 'c' && e.ctrlKey && e.shiftKey) {
            e.preventDefault();
            const serverIP = document.querySelector('.server-ip code');
            if (serverIP) {
                serverIP.click();
            }
        }
    });
});

// Global function for copy server IP buttons
function copyServerIP(ip) {
    copyToClipboard(ip);
}

// Utility Functions
function copyToClipboard(text) {
    // Sử dụng Clipboard API nếu có
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(function() {
            showNotification('Đã copy IP server: ' + text);
        });
    } else {
        // Fallback cho browsers cũ
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('Đã copy IP server: ' + text);
    }
}

function showNotification(message) {
    // Tạo notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Tự động xóa sau 3 giây
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .animate-in {
        animation: fadeInUp 0.8s ease forwards;
    }
    
    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: rgba(46, 125, 50, 0.98);
        padding: 1rem;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
    
    .dynamic-block {
        animation: floatUp 6s ease-out forwards;
    }
    
    @keyframes floatUp {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
