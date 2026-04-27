// 轮播图功能
document.addEventListener('DOMContentLoaded', function() {
    // === 轮播图功能 ===
    let carouselItems = document.querySelectorAll('.carousel-item');
    let indicators = document.querySelectorAll('.indicator');
    let prevBtn = document.querySelector('.carousel-control.prev');
    let nextBtn = document.querySelector('.carousel-control.next');
    let currentIndex = 0;
    let interval;

    // 更新轮播图显示
    function updateCarousel() {
        carouselItems.forEach(item => item.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        carouselItems[currentIndex].classList.add('active');
        indicators[currentIndex].classList.add('active');
    }

    // 下一张
    function nextSlide() {
        currentIndex = (currentIndex + 1) % carouselItems.length;
        updateCarousel();
    }

    // 上一张
    function prevSlide() {
        currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
        updateCarousel();
    }

    // 开始自动轮播
    function startAutoPlay() {
        interval = setInterval(nextSlide, 2500);
    }

    // 停止自动轮播
    function stopAutoPlay() {
        clearInterval(interval);
    }

    // 事件监听
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoPlay();
            // startAutoPlay();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoPlay();
            // startAutoPlay();
        });
    }

    // 指示器点击事件
    indicators.forEach(indicator => {
        indicator.addEventListener('click', function() {
            currentIndex = parseInt(this.getAttribute('data-index'));
            updateCarousel();
            stopAutoPlay();
            // startAutoPlay();
        });
    });

    // 鼠标悬停时暂停轮播
    let carousel = document.querySelector('.carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);
    }

    // 初始化
    updateCarousel();
    startAutoPlay();

    // === TOP-section 背景图左右切换控制和指示器联动 ===
    (function() {
        let slideBox = document.getElementById('slideBox');
        if (!slideBox) return;

        let slides = slideBox.querySelectorAll('.slide-img');
        let prevBtn = slideBox.querySelector('.top-prev-btn');
        let nextBtn = slideBox.querySelector('.top-next-btn');
        let indicators = document.querySelectorAll('.slide-indicator');
        
        let currentIndex = 0;
        let slideInterval;
        
        // 更新当前幻灯片和指示器
        function updateSlidesAndIndicators(index) {
            // 移除所有图片的 on 类
            slides.forEach(slide => slide.classList.remove('on'));
            // 为目标图片添加 on 类
            if (slides[index]) {
                slides[index].classList.add('on');
            }
            
            // 更新指示器状态
            indicators.forEach((indicator, i) => {
                if (i === index) {
                    indicator.classList.add('active');
                } else {
                    indicator.classList.remove('active');
                }
            });
            
            currentIndex = index;
        }

        // 上一张
        function goToPrev() {
            let newIndex = currentIndex - 1;
            if (newIndex < 0) newIndex = slides.length - 1;
            updateSlidesAndIndicators(newIndex);
        }

        // 下一张
        function goToNext() {
            let newIndex = currentIndex + 1;
            if (newIndex >= slides.length) newIndex = 0;
            updateSlidesAndIndicators(newIndex);
        }

        // 自动播放控制
        function startAutoPlay() {
            // 确保只有一个定时器在运行
            if (slideInterval) {
                clearInterval(slideInterval);
            }
            slideInterval = setInterval(() => {
                let newIndex = (currentIndex + 1) % slides.length;
                updateSlidesAndIndicators(newIndex);
                currentIndex = newIndex;
            }, 2500);
        }

        function stopAutoPlay() {
            clearInterval(slideInterval);
        }

        // 重置自动播放（停止并重新开始）
        function resetAutoPlay() {
            stopAutoPlay();
            startAutoPlay();
        }

        // 绑定按钮事件
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                goToPrev();
                stopAutoPlay(); // 只停止自动播放，不重新启动
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                goToNext();
                stopAutoPlay(); // 只停止自动播放，不重新启动
            });
        }

        // 指示器点击事件
        indicators.forEach(indicator => {
            indicator.addEventListener('click', function() {
                let index = parseInt(this.getAttribute('data-index'));
                updateSlidesAndIndicators(index);
                currentIndex = index;
                stopAutoPlay(); // 只停止自动播放，不重新启动
            });
            
            // 鼠标悬停事件
            indicator.addEventListener('mouseenter', function() {
                let index = parseInt(this.getAttribute('data-index'));
                updateSlidesAndIndicators(index);
                currentIndex = index;
            });
        });

        // 鼠标进入/离开控制自动播放
        slideBox.addEventListener('mouseenter', stopAutoPlay);
        slideBox.addEventListener('mouseleave', startAutoPlay);

        // 初始化
        updateSlidesAndIndicators(0);
        startAutoPlay();
    })();

    // === 联系表单验证 ===
    let contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let name = document.getElementById('name').value;
            let email = document.getElementById('email').value;
            let subject = document.getElementById('subject').value;
            let message = document.getElementById('message').value;
            
            if (name && email && subject && message) {
                alert('感谢您的消息！我们会尽快回复您。');
                contactForm.reset();
            } else {
                alert('请填写所有字段');
            }
        });
    }

    // === 滚动动画 ===
    let animateOnScroll = function() {
        let elements = document.querySelectorAll('.intro-text, .container,.product-grid');
        
        elements.forEach(element => {
            let elementPosition = element.getBoundingClientRect().top;
            let windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = 1;
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // 初始设置
    let elementsToAnimate = document.querySelectorAll('.intro-text, .container,.product-grid');
    elementsToAnimate.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // 初始检查
});

// === 关于我们 - 切换更多内容 ===
function toggleAbout() {
    let moreContent = document.getElementById('aboutMoreContent');
    let btn = document.querySelector('.toggle-btn');

    if (moreContent.style.display === 'none' || !moreContent.style.display) {
        // 显示更多内容
        moreContent.style.display = 'block';
        btn.innerHTML = 'MORE<br><i class="fas fa-chevron-up"></i>';
    } else {
        // 隐藏更多内容
        moreContent.style.display = 'none';
        btn.innerHTML = 'MORE<br><i class="fas fa-chevron-down"></i>';
    }
}

// === 回到顶部按钮 ===
window.addEventListener('scroll', function() {
    let backToTop = document.getElementById('back-to-top');
    if (window.pageYOffset > 500) {
        if (backToTop) {
            backToTop.style.display = 'block';
        }
    } else {
        if (backToTop) {
            backToTop.style.display = 'none';
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    let backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// === 夜间模式切换（进阶版）===
document.addEventListener('DOMContentLoaded', function () {
    let themeToggleBtn = document.getElementById('themeToggle');
    if (!themeToggleBtn) return;
    
    let body = document.body;

    // 获取系统主题偏好
    let prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // 获取用户存储的主题设置，若无则使用系统偏好
    let currentTheme = localStorage.getItem('theme');
    let isDarkMode = currentTheme ? currentTheme === 'dark' : prefersDarkScheme;

    // 应用主题
    function applyTheme(isDark) {
        if (isDark) {
            body.classList.add('dark-mode');
            themeToggleBtn.textContent = '☀️ 日间模式';
        } else {
            body.classList.remove('dark-mode');
            themeToggleBtn.textContent = '🌙 夜间模式';
        }
    }

    applyTheme(isDarkMode);

    // 切换主题函数
    function toggleTheme() {
        isDarkMode = !isDarkMode;
        applyTheme(isDarkMode);
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }

    // 绑定点击事件
    themeToggleBtn.addEventListener('click', toggleTheme);
});

// === 新闻页面分页功能 ===
document.addEventListener('DOMContentLoaded', function() {
    // 获取所有分页按钮和新闻页面
    const pageButtons = document.querySelectorAll('.page-btn[data-page]');
    const newsPages = document.querySelectorAll('.news-page');
    const nextPageButton = document.getElementById('nextPage');
    
    // 当前页面
    let currentPage = 1;
    const totalPages = 3; // 根据实际页面数调整
    
    // 切换页面函数
    function switchPage(pageNumber) {
        // 隐藏所有页面
        newsPages.forEach(page => {
            page.classList.remove('active');
        });
        
        // 显示指定页面
        const targetPage = document.getElementById(`page-${pageNumber}`);
        if (targetPage) {
            targetPage.classList.add('active');
        }
        
        // 更新按钮激活状态
        pageButtons.forEach(button => {
            button.classList.remove('active');
            if (parseInt(button.getAttribute('data-page')) === pageNumber) {
                button.classList.add('active');
            }
        });
        
        // 更新当前页面
        currentPage = pageNumber;
    }
    
    // 为每个分页按钮添加点击事件
    pageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const pageNumber = parseInt(this.getAttribute('data-page'));
            switchPage(pageNumber);
        });
    });
    
    // 下一页按钮事件
    if (nextPageButton) {
        nextPageButton.addEventListener('click', function() {
            let nextPage = currentPage + 1;
            if (nextPage > totalPages) {
                nextPage = 1; // 回到第一页
            }
            switchPage(nextPage);
        });
    }
});