document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const navLinks = document.querySelectorAll('.nav-link');
    const playBtns = document.querySelectorAll('.play-btn');
    const ctaButton = document.querySelector('.cta-button');

    const animeData = [
        {
            id: 1,
            title: "Erekshe",
            genre: "action",
            episodes: 1,
            year: 2026,
            type: "Озвучка",
            rating: 4.9,
            image: "https://via.placeholder.com/200x300/e74c3c/ffffff?text=Erekshe",
            videoFile: "EREKSHE(2026).mp4"
        },
        {
            id: 2,
            title: "Breaking Bad S5E13",
            genre: "action",
            episodes: 1,
            year: 2023,
            type: "Субтитры",
            rating: 4.8,
            image: "https://via.placeholder.com/200x300/9b59b6/ffffff?text=Breaking+Bad",
            videoFile: "BreakingbadS5E13.m3u8"
        },
        {
            id: 3,
            title: "Breaking Bad S5E14",
            genre: "action",
            episodes: 1,
            year: 2023,
            type: "Озвучка",
            rating: 4.9,
            image: "https://via.placeholder.com/200x300/e91e63/ffffff?text=Breaking+Bad",
            videoFile: "BreakingBadS5E14.m3u8"
        },
        {
            id: 4,
            title: "Breaking Bad S5E15",
            genre: "action",
            episodes: 1,
            year: 2023,
            type: "Субтитры",
            rating: 4.7,
            image: "https://via.placeholder.com/200x300/ffc107/ffffff?text=Breaking+Bad",
            videoFile: "BreakingBadS5E15.m3u8"
        },
        {
            id: 5,
            title: "Breaking Bad S5E16",
            genre: "action",
            episodes: 1,
            year: 2023,
            type: "Озвучка",
            rating: 4.8,
            image: "https://via.placeholder.com/200x300/ff9800/ffffff?text=Breaking+Bad",
            videoFile: "BreakingBadS5E16.m3u8"
        },
        {
            id: 6,
            title: "Универсальный IPTV",
            genre: "fantasy",
            episodes: 1000,
            year: 2024,
            type: "Субтитры",
            rating: 4.9,
            image: "https://via.placeholder.com/200x300/4caf50/ffffff?text=IPTV",
            videoFile: "universal-iptv.m3u"
        },
        {
            id: 7,
            title: "Kazakhstan Channels",
            genre: "comedy",
            episodes: 50,
            year: 2024,
            type: "Озвучка",
            rating: 4.8,
            image: "https://via.placeholder.com/200x300/f44336/ffffff?text=KZ+Channels",
            videoFile: "kz.m3u"
        },
        {
            id: 8,
            title: "Kids Content",
            genre: "comedy",
            episodes: 100,
            year: 2024,
            type: "Субтитры",
            rating: 4.6,
            image: "https://via.placeholder.com/200x300/2196f3/ffffff?text=Kids",
            videoFile: "kids.m3u"
        }
    ];

    function createAnimeCard(anime) {
        return `
            <div class="anime-card" data-genre="${anime.genre}">
                <div class="anime-poster">
                    <img src="${anime.image}" alt="${anime.title}">
                    <div class="anime-overlay">
                        <button class="play-btn" data-id="${anime.id}"><i class="fas fa-play"></i></button>
                    </div>
                </div>
                <div class="anime-info">
                    <h3>${anime.title}</h3>
                    <p class="anime-meta">${anime.episodes} серий • ${anime.year} • ${anime.type}</p>
                    <div class="rating">
                        <i class="fas fa-star"></i> ${anime.rating}
                    </div>
                </div>
            </div>
        `;
    }

    function populateCatalog() {
        const catalogGrid = document.getElementById('catalogAnime');
        catalogGrid.innerHTML = animeData.map(anime => createAnimeCard(anime)).join('');
        
        catalogGrid.querySelectorAll('.play-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const animeId = this.getAttribute('data-id');
                playAnime(animeId);
            });
        });
    }

    function playAnime(animeId) {
        const anime = animeData.find(a => a.id == animeId);
        if (anime) {
            window.open(`player.html?id=${animeId}`, '_blank');
            showNotification(`Открытие: ${anime.title}`, 'success');
        }
    }

    function searchAnime(query) {
        const allCards = document.querySelectorAll('.anime-card');
        const lowerQuery = query.toLowerCase();
        
        allCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const meta = card.querySelector('.anime-meta').textContent.toLowerCase();
            
            if (title.includes(lowerQuery) || meta.includes(lowerQuery)) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease';
            } else {
                card.style.display = 'none';
            }
        });
    }

    function filterByGenre(genre) {
        const allCards = document.querySelectorAll('.anime-card');
        
        allCards.forEach(card => {
            if (genre === 'all' || card.getAttribute('data-genre') === genre) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease';
            } else {
                card.style.display = 'none';
            }
        });
    }

    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }

    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4caf50' : '#2196f3'};
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.3);
            z-index: 10000;
            animation: slideInRight 0.5s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s ease';
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }

    searchBtn.addEventListener('click', function() {
        const query = searchInput.value.trim();
        if (query) {
            searchAnime(query);
            showNotification(`Поиск: "${query}"`, 'info');
        }
    });

    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });

    searchInput.addEventListener('input', function() {
        if (this.value.trim() === '') {
            const allCards = document.querySelectorAll('.anime-card');
            allCards.forEach(card => {
                card.style.display = 'block';
            });
        }
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const genre = this.getAttribute('data-genre');
            filterByGenre(genre);
            
            const genreText = this.textContent;
            showNotification(`Фильтр: ${genreText}`, 'info');
        });
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });

    playBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const animeId = this.getAttribute('data-id');
            playAnime(animeId);
        });
    });

    ctaButton.addEventListener('click', function() {
        scrollToSection('new');
    });

    document.querySelectorAll('.anime-card').forEach(card => {
        card.addEventListener('click', function() {
            const playBtn = this.querySelector('.play-btn');
            if (playBtn) {
                const animeId = playBtn.getAttribute('data-id');
                playAnime(animeId);
            }
        });
    });

    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideOutRight {
            from { opacity: 1; transform: translateX(0); }
            to { opacity: 0; transform: translateX(100px); }
        }
    `;
    document.head.appendChild(style);

    populateCatalog();

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.8s ease forwards';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.anime-card').forEach(card => {
        observer.observe(card);
    });

    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });

    showNotification('Добро пожаловать на Anime Translations!', 'success');
});

function addCustomAnime() {
    const title = prompt('Название аниме:');
    const episodes = prompt('Количество серий:');
    const year = prompt('Год выпуска:');
    const type = prompt('Тип перевода (Озвучка/Субтитры):');
    const genre = prompt('Жанр (action/romance/comedy/fantasy):');
    
    if (title && episodes && year && type && genre) {
        const newAnime = {
            id: Date.now(),
            title: title,
            genre: genre,
            episodes: parseInt(episodes),
            year: parseInt(year),
            type: type,
            rating: 4.5,
            image: `https://via.placeholder.com/200x300/${Math.floor(Math.random()*16777215).toString(16)}/ffffff?text=${encodeURIComponent(title)}`
        };
        
        animeData.push(newAnime);
        populateCatalog();
        showNotification(`Добавлено: ${title}`, 'success');
    }
}
