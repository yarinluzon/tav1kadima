// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if(target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// EmailJS
emailjs.init("FCZTivqZXK64lXOA5"); // Public Key שלך

const form = document.getElementById("contact-form");
const notification = document.getElementById("notification");
const icon = notification.querySelector(".icon");
const messageText = notification.querySelector(".message");
const hamburger = document.getElementById("hamburger");
const navbarMenu = document.querySelector(".navbar-menu");
// הסר scroll-behavior: smooth מה-CSS body!

function smoothScroll(targetSelector, duration = 800) {
  const target = document.querySelector(targetSelector);
  if (!target) return;

  const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;

    const t = timeElapsed / duration;
    const eased = t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;

    window.scrollTo(0, startPosition + distance * eased);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    } else {
      window.scrollTo(0, targetPosition); // תיקון קטן בסיום
    }
  }

  requestAnimationFrame(animation);
}

// בוחר את כל הלינקים הרלוונטיים
document.querySelectorAll('.navbar-menu a, .hero-buttons a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    smoothScroll(this.getAttribute('href'), 1000); // 1000ms = 1 שניה
  });
});


hamburger.addEventListener("click", () => {
  navbarMenu.classList.toggle("active");
  hamburger.classList.toggle("open");
});



form.addEventListener("submit", function(e){
  e.preventDefault();

  emailjs.sendForm("service_ewd6teq", "template_ilk6ndq", this)
    .then(() => {
      showNotification("ההודעה נשלחה בהצלחה!", "success");
      form.reset();
    })
    .catch((error) => {
      console.error(error);
      showNotification("אירעה שגיאה במהלך שליחת ההודעה", "error");
    });
});

function showNotification(msg, type) {
  messageText.textContent = msg;
  notification.className = `notification ${type}`;
  icon.textContent = type === "success" ? "✔" : "✖";

  // הצגת ההודעה
  notification.style.bottom = "20px";
  notification.style.opacity = "1";

  // הסתרה אחרי 10 שניות
  setTimeout(() => {
    notification.style.bottom = "-80px";
    notification.style.opacity = "0";
  }, 10000); // <-- 10000 מילישניות = 10 שניות
}
