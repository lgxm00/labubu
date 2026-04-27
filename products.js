        document.addEventListener('DOMContentLoaded', function () {
            // 获取所有标签按钮
            const tabBtns = document.querySelectorAll('.tab-btn');
            // 获取所有商品卡片
            const productCards = document.querySelectorAll('.product-card');

            // 检查URL参数
            const urlParams = new URLSearchParams(window.location.search);
            const categoryParam = urlParams.get('category');

            // 根据URL参数或默认值设置初始显示
            let initialCategory = '全部产品';
            if (categoryParam) {
                // 映射URL参数到中文分类名
                const categoryMap = {
                    'doll': '玩偶',
                    'clothing': '服饰',
                    'blindbox': '盲盒',
                    'home': '家居用品',
                    'accessory': '配饰'
                };
                initialCategory = categoryMap[categoryParam] || '全部产品';
            }

            // 默认显示相应分类的产品
            showProducts(initialCategory);
            // 激活对应的标签按钮
            activateTabButton(initialCategory);

            // 为每个按钮绑定点击事件
            tabBtns.forEach(btn => {
                btn.addEventListener('click', function () {
                    // 移除所有按钮的 active 类
                    tabBtns.forEach(b => b.classList.remove('active'));
                    // 当前按钮添加 active 类
                    this.classList.add('active');

                    // 显示对应类别的商品
                    const category = this.getAttribute('data-value');
                    showProducts(category);
                    
                    // 更新URL参数（可选）
                    updateURL(category);
                });
            });

            // 显示指定类别的商品
            function showProducts(category) {
                productCards.forEach(card => {
                    if (category === '全部产品' || card.dataset.category === category) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            }

            // 激活对应的标签按钮
            function activateTabButton(category) {
                tabBtns.forEach(btn => {
                    btn.classList.remove('active');
                    if (btn.getAttribute('data-value') === category) {
                        btn.classList.add('active');
                    }
                });
            }

            // 更新URL参数（可选功能）
            function updateURL(category) {
                // 映射中文分类名到URL参数
                const reverseCategoryMap = {
                    '全部产品': '',
                    '玩偶': 'doll',
                    '服饰': 'clothing',
                    '盲盒': 'blindbox',
                    '家居用品': 'home',
                    '配饰': 'accessory'
                };
                
                const paramValue = reverseCategoryMap[category];
                if (paramValue) {
                    const url = new URL(window.location);
                    url.searchParams.set('category', paramValue);
                    window.history.replaceState({}, '', url);
                } else {
                    const url = new URL(window.location);
                    url.searchParams.delete('category');
                    window.history.replaceState({}, '', url);
                }
            }
        });

// 添加回到顶部的按钮
window.addEventListener('scroll', function() {
    const backToTop = document.getElementById('back-to-top');
    if (window.pageYOffset > 300) {
        backToTop.style.display = 'block';
    } else {
        backToTop.style.display = 'none';
    }
});

document.getElementById('back-to-top').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


// === 夜间模式切换（进阶版）===
document.addEventListener('DOMContentLoaded', function () {
    const themeToggleBtn = document.getElementById('themeToggle');
    const body = document.body;

    // 获取系统主题偏好
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // 获取用户存储的主题设置，若无则使用系统偏好
    const currentTheme = localStorage.getItem('theme');
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

// 加入购物车功能
document.addEventListener('DOMContentLoaded', function() {
    // 给所有加入购物车按钮绑定事件
    let addToCartBtns = document.querySelectorAll('.add-to-cart');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 获取商品信息（从按钮的 data-* 属性）
            let product = {
                id: this.getAttribute('data-id'),
                name: this.getAttribute('data-name'),
                spec: this.getAttribute('data-spec'),
                price: this.getAttribute('data-price'),
                img: this.getAttribute('data-img')
            };

            // 从本地存储获取现有购物车数据
            let cart = getCartData() || [];

            // 添加新商品到购物车
            cart.push(product);
            saveCartData(cart);

            // 提示并跳转购物车页面
            if (confirm('添加成功！是否前往购物车查看？')) {
                window.location.href = 'shopping.html';
            }
        });
    });

    // 辅助函数：获取购物车数据
    function getCartData() {
        let cart = localStorage.getItem('shoppingCart');
        return cart ? JSON.parse(cart) : null;
    }

    // 辅助函数：保存购物车数据
    function saveCartData(cart) {
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
    }
});

