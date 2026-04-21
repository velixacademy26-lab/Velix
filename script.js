// =================== LOADING OVERLAY ===================

function initializeLoadingScreen() {
  const isDarkMode = localStorage.getItem('theme') === 'dark';
  const loadingOverlay = document.getElementById('loadingOverlay');
  
  if (loadingOverlay) {
    if (isDarkMode) {
      loadingOverlay.classList.add('dark-mode');
    }
    
    // Only hide if not already hidden (prevent double hiding)
    if (!loadingOverlay.classList.contains('hidden')) {
      setTimeout(() => {
        hideLoadingScreen();
      }, 1500);
    }
  }
}

function hideLoadingScreen() {
  const loadingOverlay = document.getElementById('loadingOverlay');
  if (loadingOverlay && !loadingOverlay.classList.contains('hidden')) {
    loadingOverlay.classList.add('hidden');
    setTimeout(() => {
      loadingOverlay.style.display = 'none';
    }, 600);
  }
}

function showLoadingScreen() {
  const loadingOverlay = document.getElementById('loadingOverlay');
  if (loadingOverlay && loadingOverlay.classList.contains('hidden')) {
    loadingOverlay.style.display = 'flex';
    loadingOverlay.classList.remove('hidden');
    setTimeout(() => {
      hideLoadingScreen();
    }, 1500);
  }
}

// =================== THEME TOGGLE ===================

function initializeTheme() {

  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'dark') {

    document.body.classList.add('dark-mode');

    updateThemeButton();

  }



  const themeToggle = document.getElementById('themeToggle');

  if (themeToggle) {

    themeToggle.addEventListener('click', toggleTheme);

  }

}



function toggleTheme() {

  document.body.classList.toggle('dark-mode');

  const isDarkMode = document.body.classList.contains('dark-mode');

  localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

  updateThemeButton();

  // Update loading overlay theme
  const loadingOverlay = document.getElementById('loadingOverlay');
  if (loadingOverlay) {
    if (isDarkMode) {
      loadingOverlay.classList.add('dark-mode');
    } else {
      loadingOverlay.classList.remove('dark-mode');
    }
  }

}



function updateThemeButton() {

  const themeToggle = document.getElementById('themeToggle');

  if (themeToggle) {

    if (document.body.classList.contains('dark-mode')) {

      themeToggle.textContent = '☀️';

      themeToggle.style.color = '#ffffff';

    } else {

      themeToggle.textContent = '🌙';

      themeToggle.style.color = '#3b82f6';

    }

  }

}



// =================== EVENT LISTENERS ===================

function setupEventListeners() {

  // Home link

  const homeLinks = document.querySelectorAll('[data-home]');

  homeLinks.forEach(link => {

    link.addEventListener('click', () => {

      showLoadingScreen();

      setTimeout(() => {

        window.location.href = 'index.html';

      }, 800);

    });

  });



  // Modal close button

  const modalClose = document.querySelector('.modal-close');

  if (modalClose) {

    modalClose.addEventListener('click', closeModal);

  }



  // Modal cancel button

  const cancelBtn = document.getElementById('cancelBtn');

  if (cancelBtn) {

    cancelBtn.addEventListener('click', closeModal);

  }



  // Click outside modal to close

  const modal = document.getElementById('certificateModal');

  if (modal) {

    window.addEventListener('click', (event) => {

      if (event.target === modal) {

        closeModal();

      }

    });

  }



  // Check user login on all pages

  checkUserLogin();

}



// =================== RENDER CONTENT ===================

function renderContent() {

  const currentPage = document.body.id;



  if (currentPage === 'home') {

    renderHome();

  }

}



function renderHome() {

  initializeHomeAnimations();

}



// =================== HOME PAGE ANIMATIONS ===================

function initializeHomeAnimations() {

  const heroContent = document.querySelector('.hero-content');

  if (heroContent) {

    heroContent.style.animation = 'fadeInLeft 0.8s ease';

  }



  const heroImage = document.querySelector('.hero-image');

  if (heroImage) {

    heroImage.style.animation = 'fadeInRight 0.8s ease';

  }

}



// Add CSS animations to script

const style = document.createElement('style');

style.textContent = `

  @keyframes fadeInLeft {

    from {

      opacity: 0;

      transform: translateX(50px);

    }

    to {

      opacity: 1;

      transform: translateX(0);

    }

  }



  @keyframes fadeInRight {

    from {

      opacity: 0;

      transform: translateX(-50px);

    }

    to {

      opacity: 1;

      transform: translateX(0);

    }

  }

`;

document.head.appendChild(style);



// =================== CLOSE MODAL (Shared Function) ===================

function closeModal() {

  const modal = document.getElementById('certificateModal');

  if (modal) {

    modal.style.display = 'none';

  }

}



// =================== USER AUTHENTICATION ===================

function checkUserLogin() {

  const user = localStorage.getItem('currentUser');

  updateAuthUI(user);

}



function updateAuthUI(user) {

  const loginBtn = document.getElementById('loginBtn');

  const signupBtn = document.getElementById('signupBtn');

  const userMenuContainer = document.getElementById('userMenuContainer');

  

  if (user) {

    const userData = JSON.parse(localStorage.getItem(`user_${user}`));

    if (loginBtn) loginBtn.style.display = 'none';

    if (signupBtn) signupBtn.style.display = 'none';

    if (userMenuContainer) {

      userMenuContainer.style.display = 'block';

      document.getElementById('userDisplayName').textContent = userData.fullName;

    }

  } else {

    if (loginBtn) loginBtn.style.display = 'block';

    if (signupBtn) signupBtn.style.display = 'block';

    if (userMenuContainer) userMenuContainer.style.display = 'none';

  }

}



function openSignupModal() {

  document.getElementById('signupModal').style.display = 'block';

}



function closeSignupModal() {

  document.getElementById('signupModal').style.display = 'none';

}



function openLoginModal() {

  document.getElementById('loginModal').style.display = 'block';

}



function closeLoginModal() {

  document.getElementById('loginModal').style.display = 'none';

}



function handleSignup(event) {

  event.preventDefault();

  

  const fullName = document.getElementById('fullName').value.trim();

  const email = document.getElementById('signupEmail').value.trim();

  const password = document.getElementById('signupPassword').value;

  const confirmPassword = document.getElementById('confirmPassword').value;

  

  if (password !== confirmPassword) {

    alert('كلمات السر غير متطابقة');

    return;

  }

  

  if (localStorage.getItem(`user_${email}`)) {

    alert('البريد الإلكتروني مستخدم بالفعل');

    return;

  }

  

  const userData = {

    fullName: fullName,

    email: email,

    password: password,

    subscribedCourses: [],

    subscribedTrainings: [],

    createdAt: new Date().toISOString()

  };

  

  localStorage.setItem(`user_${email}`, JSON.stringify(userData));

  localStorage.setItem('currentUser', email);

  

  alert('تم إنشاء الحساب بنجاح!');

  closeSignupModal();

  document.getElementById('signupForm').reset();

  checkUserLogin();

}



function handleLogin(event) {

  event.preventDefault();

  

  const email = document.getElementById('loginEmail').value.trim();

  const password = document.getElementById('loginPassword').value;

  

  const userData = JSON.parse(localStorage.getItem(`user_${email}`));

  

  if (!userData || userData.password !== password) {

    alert('البريد الإلكتروني أو كلمة السر غير صحيحة');

    return;

  }

  

  localStorage.setItem('currentUser', email);

  alert('تم تسجيل الدخول بنجاح!');

  closeLoginModal();

  document.getElementById('loginForm').reset();

  checkUserLogin();

}



function logout(event) {

  event.preventDefault();

  localStorage.removeItem('currentUser');

  checkUserLogin();

  hideDashboard();

  alert('تم تسجيل الخروج');

}



function toggleUserMenu() {

  const dropdown = document.getElementById('userMenuDropdown');

  dropdown.classList.toggle('show');

}



function showDashboard() {

  const dashboardSection = document.getElementById('dashboardSection');

  const heroSection = document.querySelector('.hero');

  const featuresSection = document.querySelector('.features');

  const goalsSection = document.querySelector('.goals');

  

  if (dashboardSection) dashboardSection.style.display = 'block';

  if (heroSection) heroSection.style.display = 'none';

  if (featuresSection) featuresSection.style.display = 'none';

  if (goalsSection) goalsSection.style.display = 'none';

  

  updateDashboard();

}



function hideDashboard() {

  const dashboardSection = document.getElementById('dashboardSection');

  const heroSection = document.querySelector('.hero');

  const featuresSection = document.querySelector('.features');

  const goalsSection = document.querySelector('.goals');

  

  if (dashboardSection) dashboardSection.style.display = 'none';

  if (heroSection) heroSection.style.display = 'block';

  if (featuresSection) featuresSection.style.display = 'block';

  if (goalsSection) goalsSection.style.display = 'block';

}



function updateDashboard() {

  const currentUser = localStorage.getItem('currentUser');

  if (!currentUser) return;

  

  const userData = JSON.parse(localStorage.getItem(`user_${currentUser}`));

  

  document.getElementById('coursesCount').textContent = userData.subscribedCourses.length;

  

  // Update subscribed courses

  const coursesList = document.getElementById('subscribedCourses');

  if (userData.subscribedCourses.length === 0) {

    coursesList.innerHTML = '<p class="empty-message">لم تشترك بأي كورسات بعد</p>';

  } else {

    coursesList.innerHTML = userData.subscribedCourses.map(course => `

      <div class="subscribed-item">

        <span class="subscribed-item-name">${course.name}</span>

        <button class="subscribed-item-action" onclick="continueCourse('course', '${course.id}')">استكمل</button>

      </div>

    `).join('');

  }

}



function subscribeToCourse(courseId, courseName) {

  const currentUser = localStorage.getItem('currentUser');

  

  if (!currentUser) {

    alert('يجب عليك تسجيل الدخول أولاً');

    openLoginModal();

    return;

  }

  

  const userData = JSON.parse(localStorage.getItem(`user_${currentUser}`));

  

  if (userData.subscribedCourses.some(c => c.id === courseId)) {

    alert('أنت مشترك بهذا الكورس بالفعل');

    return;

  }

  

  userData.subscribedCourses.push({

    id: courseId,

    name: courseName,

    subscribedAt: new Date().toISOString()

  });

  

  localStorage.setItem(`user_${currentUser}`, JSON.stringify(userData));

  alert('تم الاشتراك بنجاح!');

  

  if (document.body.id === 'home') {

    updateDashboard();

  }

}



function subscribeToTraining(trainingId, trainingName) {

  const currentUser = localStorage.getItem('currentUser');

  

  if (!currentUser) {

    alert('يجب عليك تسجيل الدخول أولاً');

    openLoginModal();

    return;

  }

  

  const userData = JSON.parse(localStorage.getItem(`user_${currentUser}`));

  

  if (userData.subscribedTrainings.some(t => t.id === trainingId)) {

    alert('أنت مشترك بهذه الدورة بالفعل');

    return;

  }

  

  userData.subscribedTrainings.push({

    id: trainingId,

    name: trainingName,

    subscribedAt: new Date().toISOString()

  });

  

  localStorage.setItem(`user_${currentUser}`, JSON.stringify(userData));

  alert('تم الاشتراك بنجاح!');

  

  if (document.body.id === 'home') {

    updateDashboard();

  }

}



function continueCourse(type, courseId) {

  // Navigate to course detail page

  window.location.href = `course-detail-${courseId}.html`;

}



function continueTraining(type, trainingId) {

  // Navigate to training detail page

  alert('سيتم تطوير هذه الميزة قريباً');

}



function goToDashboard(event) {

  event.preventDefault();

  const currentUser = localStorage.getItem('currentUser');

  if (!currentUser) {

    alert('يجب عليك تسجيل الدخول أولاً');

    openLoginModal();

    return;

  }

  window.location.href = 'dashboard.html';

}



// Setup event listeners for page navigation
function setupPageTransitions() {
  // Smooth page transitions on all links
  const links = document.querySelectorAll('a[href^="./"], a[href^="/"], a[href*=".html"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Don't apply transition to external links or anchors
      if (href && !href.startsWith('http') && !href.startsWith('//') && !href.startsWith('#')) {
        e.preventDefault();
        
        showLoadingScreen();
        
        setTimeout(() => {
          window.location.href = href;
        }, 800);
      }
    });
  });

  // Also handle onclick="window.location.href='...'" styles
  const buttons = document.querySelectorAll('[onclick*="window.location.href"]');
  buttons.forEach(button => {
    const originalOnclick = button.getAttribute('onclick');
    button.setAttribute('onclick', `showLoadingScreen(); setTimeout(() => { ${originalOnclick} }, 800);`);
  });
}

// Close dropdown when clicking outside

document.addEventListener('click', function(event) {

  const userMenu = document.getElementById('userMenuBtn');

  const dropdown = document.getElementById('userMenuDropdown');

  

  if (!event.target.closest('.user-menu-container')) {

    if (dropdown) dropdown.classList.remove('show');

  }

});



// Close modals when clicking outside

window.addEventListener('click', function(event) {

  const signupModal = document.getElementById('signupModal');

  const loginModal = document.getElementById('loginModal');

  

  if (event.target === signupModal) {

    closeSignupModal();

  }

  if (event.target === loginModal) {

    closeLoginModal();

  }

});



// =================== SCROLL ANIMATIONS ===================

function initScrollAnimations() {

  const observerOptions = {

    threshold: 0.1,

    rootMargin: '0px 0px -50px 0px'

  };



  const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry, index) => {

      if (entry.isIntersecting) {

        setTimeout(() => {

          entry.target.style.animation = `fadeInUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s forwards`;

          entry.target.style.opacity = '1';

        }, index * 50);

        observer.unobserve(entry.target);

      }

    });

  }, observerOptions);



  // Observe all cards

  const cards = document.querySelectorAll('.feature-card, .goal-card, .course-card, .dashboard-card');

  cards.forEach(card => {

    observer.observe(card);

  });

}



// Initialize scroll animations when DOM is loaded

document.addEventListener('DOMContentLoaded', () => {

  initScrollAnimations();

  initMouseTrackAnimation();

  initializeLoadingScreen();

  setupPageTransitions();

});

// Add page transition listener
window.addEventListener('beforeunload', () => {
  showLoadingScreen();
});



// =================== MOUSE TRACK ANIMATION ===================

function initMouseTrackAnimation() {

  const heroImage = document.querySelector('.hero-image');

  if (!heroImage) return;



  document.addEventListener('mousemove', (e) => {

    const mouseX = (e.clientX / window.innerWidth) * 20 - 10;

    const mouseY = (e.clientY / window.innerHeight) * 20 - 10;

    

    heroImage.style.transform = `perspective(1000px) rotateX(${-mouseY * 0.5}deg) rotateY(${mouseX * 0.5}deg) translateZ(0)`;

  });



  document.addEventListener('mouseleave', () => {

    heroImage.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';

  });

}

