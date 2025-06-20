// 移动端菜单切换
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// 点击链接时关闭菜单
document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// 滚动动画
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
    }
  });
}, observerOptions);

// 添加动画类
document.querySelectorAll("section").forEach((section) => {
  section.classList.add("fade-in");
  observer.observe(section);
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// 页面加载动画
window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");
  loader.classList.add("hidden");
});

// 滚动进度条
window.addEventListener("scroll", () => {
  const progressBar = document.querySelector(".progress-bar");
  const scrolled =
    (window.scrollY /
      (document.documentElement.scrollHeight - window.innerHeight)) *
    100;
  progressBar.style.width = `${scrolled}%`;
});

// 增强的图片懒加载
const lazyLoad = {
  init() {
    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      {
        root: null,
        rootMargin: "50px",
        threshold: 0.1,
      }
    );

    this.observeImages();
    this.observeSources();
  },

  handleIntersection(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target.tagName.toLowerCase() === "img") {
          this.loadImage(entry.target);
        } else if (entry.target.tagName.toLowerCase() === "source") {
          this.loadSource(entry.target);
        }
        observer.unobserve(entry.target);
      }
    });
  },

  observeImages() {
    document.querySelectorAll("img.lazy").forEach((img) => {
      this.observer.observe(img);
    });
  },

  observeSources() {
    document.querySelectorAll("source[data-srcset]").forEach((source) => {
      this.observer.observe(source);
    });
  },

  loadImage(img) {
    if (img.dataset.src) {
      img.src = img.dataset.src;
      img.removeAttribute("data-src");
    }
    if (img.dataset.srcset) {
      img.srcset = img.dataset.srcset;
      img.removeAttribute("data-srcset");
    }
    img.classList.remove("lazy");
  },

  loadSource(source) {
    if (source.dataset.srcset) {
      source.srcset = source.dataset.srcset;
      source.removeAttribute("data-srcset");
    }
  },
};

// 初始化懒加载
lazyLoad.init();

// 图片加载错误处理
const handleImageError = {
  init() {
    this.setupErrorHandling();
  },

  setupErrorHandling() {
    document.querySelectorAll("img").forEach((img) => {
      img.addEventListener("error", () => {
        this.replaceWithFallback(img);
      });
    });
  },

  replaceWithFallback(img) {
    img.src =
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23ccc' d='M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z'/%3E%3C/svg%3E";
    img.alt = "图片加载失败";
    img.classList.add("img-error");
  },
};

// 初始化图片错误处理
handleImageError.init();

// 返回顶部按钮
const scrollToTop = document.createElement("button");
scrollToTop.classList.add("scroll-to-top");
scrollToTop.innerHTML = "↑";
scrollToTop.setAttribute("title", "返回顶部");
document.body.appendChild(scrollToTop);

// 监听滚动事件
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    // 降低显示阈值
    scrollToTop.classList.add("visible");
  } else {
    scrollToTop.classList.remove("visible");
  }
});

// 点击事件
scrollToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// 创建控制按钮容器
const controlButtons = document.createElement("div");
controlButtons.classList.add("control-buttons");

// 创建暗色模式切换按钮
const darkModeToggle = document.createElement("button");
darkModeToggle.classList.add("dark-mode-toggle");
darkModeToggle.setAttribute("title", "切换主题");

// 创建语言切换按钮
const langToggle = document.createElement("button");
langToggle.classList.add("lang-toggle");
langToggle.setAttribute("title", "Switch Language");
langToggle.textContent = "中/EN";

// 添加按钮到容器
controlButtons.appendChild(darkModeToggle);
controlButtons.appendChild(langToggle);

// 添加容器到页面
document.body.appendChild(controlButtons);

// 语言配置
const translations = {
  zh: {
    home: "首页",
    about: "关于我们",
    products: "产品服务",
    friends: "友情链接",
    heroTitle: "柚子空间",
    heroDesc: "打造优质技术服务平台，让技术分享更简单",
    heroSubtitle: "分享技术，连接未来",
    learnMore: "了解更多",
    aboutTitle: "关于我们",
    openShare: "开放共享",
    openShareDesc:
      "柚子空间是一个致力于技术分享的开放平台。我们相信知识应该是开放和共享的，通过技术的力量，让更多人受益。",
    experience: "极致体验",
    experienceDesc:
      "我们提供完全免费的技术服务，并始终保持极致的用户体验。快速的访问速度、简洁的界面设计、丰富的技术内容，让每位用户都能享受优质的服务。",
    innovation: "技术创新",
    innovationDesc:
      "持续关注技术发展，不断创新服务模式。我们整合优质技术资源，打造全方位的技术服务生态，助力用户技术成长。",
    productsTitle: "旗下网站",
    visitSite: "访问网站",
    friendsTitle: "友情链接",
    icp: '<a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer" class="beian-link">备案信息：桂ICP备2024039162号</a>',
    copyright: "版权所有",
    allRights: "保留所有权利",
  },
  en: {
    home: "Home",
    about: "About",
    products: "Products",
    friends: "Links",
    heroTitle: "Youz Space",
    heroDesc: "Building a Quality Technical Service Platform",
    heroSubtitle: "Share Technology, Connect Future",
    learnMore: "Learn More",
    aboutTitle: "About Us",
    openShare: "Open Sharing",
    openShareDesc:
      "Youz Space is an open platform dedicated to technology sharing. We believe knowledge should be open and shared, benefiting more people through technology.",
    experience: "Ultimate Experience",
    experienceDesc:
      "We provide completely free technical services while maintaining the ultimate user experience. Fast access speed, simple interface design, and rich technical content allow every user to enjoy quality service.",
    innovation: "Technical Innovation",
    innovationDesc:
      "Continuously focus on technological development and innovate service models. We integrate quality technical resources to create a comprehensive technical service ecosystem.",
    productsTitle: "Our Products",
    visitSite: "Visit Site",
    friendsTitle: "Friend Links",
    icp: '<a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer" class="beian-link">ICP License: 桂ICP备2024039162号</a>',
    copyright: "Copyright",
    allRights: "All Rights Reserved",
  },
};

// 当前语言
let currentLang = "zh";

// 切换语言函数
function toggleLanguage() {
  currentLang = currentLang === "zh" ? "en" : "zh";
  updateContent();
  localStorage.setItem("language", currentLang);
}

// 更新页面内容
function updateContent() {
  const t = translations[currentLang];

  // 更新导航
  document.querySelector('a[href="#home"]').textContent = t.home;
  document.querySelector('a[href="#about"]').textContent = t.about;
  document.querySelector('a[href="#products"]').textContent = t.products;
  document.querySelector('a[href="#friends"]').textContent = t.friends;

  // 更新主横幅
  document.querySelector(".hero-content h1").textContent = t.heroTitle;
  document.querySelector(".hero-content p:not(.hero-subtitle)").textContent =
    t.heroDesc;
  document.querySelector(".hero-subtitle").textContent = t.heroSubtitle;
  document.querySelector(".hero-content .cta-button").textContent = t.learnMore;

  // 更新关于我们
  document.querySelector("#about .section-title").textContent = t.aboutTitle;
  const aboutTexts = document.querySelectorAll(".about-text");
  aboutTexts[0].querySelector("h3").textContent = t.openShare;
  aboutTexts[0].querySelector("p").textContent = t.openShareDesc;
  aboutTexts[1].querySelector("h3").textContent = t.experience;
  aboutTexts[1].querySelector("p").textContent = t.experienceDesc;
  aboutTexts[2].querySelector("h3").textContent = t.innovation;
  aboutTexts[2].querySelector("p").textContent = t.innovationDesc;

  // 更新产品和友情链接标题
  document.querySelector("#products .section-title").textContent =
    t.productsTitle;
  document.querySelector("#friends .section-title").textContent =
    t.friendsTitle;

  // 更新访问网站按钮
  document.querySelectorAll(".visit-button").forEach((button) => {
    button.textContent = t.visitSite;
  });

  // 更新页脚
  const footerInfo = document.querySelector(".footer-info");
  footerInfo.querySelector("p:first-child").innerHTML = t.icp;
  const copyrightText = footerInfo.querySelector("p:last-child");
  copyrightText.innerHTML = `${t.copyright} © <span id="currentYear"></span> ${t.heroTitle}. ${t.allRights}`;
  updateFooterYear();
}

// 初始化语言
function initLanguage() {
  const savedLang = localStorage.getItem("language");
  if (savedLang) {
    currentLang = savedLang;
    updateContent();
  }
}

// 添加语言切换事件
langToggle.addEventListener("click", toggleLanguage);

// 初始化语言
initLanguage();

// 检查系统主题
const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)");

// 初始化主题
function initTheme() {
  const savedTheme = localStorage.getItem("darkMode");
  if (savedTheme !== null) {
    document.body.classList.toggle("dark-mode", savedTheme === "true");
  } else {
    document.body.classList.toggle("dark-mode", prefersDarkMode.matches);
  }
}

// 切换主题
function toggleTheme() {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem(
    "darkMode",
    document.body.classList.contains("dark-mode")
  );

  // 添加切换动画
  darkModeToggle.style.animation = "none";
  darkModeToggle.offsetHeight; // 触发重绘
  darkModeToggle.style.animation = null;
}

// 监听系统主题变化
prefersDarkMode.addEventListener("change", (e) => {
  if (localStorage.getItem("darkMode") === null) {
    document.body.classList.toggle("dark-mode", e.matches);
  }
});

// 添加点击事件
darkModeToggle.addEventListener("click", toggleTheme);

// 初始化主题
initTheme();

// 更新页脚年份
function updateFooterYear() {
  const yearElement = document.getElementById("currentYear");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// 页面加载时更新年份
document.addEventListener("DOMContentLoaded", updateFooterYear);

// 如果需要实时更新（比如跨年时），可以添加定时器
setInterval(updateFooterYear, 1000 * 60 * 60); // 每小时更新一次
