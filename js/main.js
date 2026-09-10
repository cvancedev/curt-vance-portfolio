// EmailJS init
emailjs.init({
  publicKey: "Fx9JYRkcJIXjB_jkU",
});

// theme toggle
const root = document.documentElement;
const tBtn = document.getElementById('theme-toggle');
const saved = localStorage.getItem('cv-theme');
if (saved) root.setAttribute('data-theme', saved);
tBtn.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('cv-theme', next);
});

// smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (id.length > 1) {
      const el = document.querySelector(id);
      if (el) { e.preventDefault(); window.scrollTo({ top: el.offsetTop - 60, behavior: 'smooth' }); }
    }
  });
});

// contact modal
const modal = document.getElementById("contact-modal");
const openModalButtons = document.querySelectorAll(".open-contact-modal");
const closeModalButton = document.getElementById("modal-close");

openModalButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    modal.classList.add("active");
  });
});

closeModalButton.addEventListener("click", () => {
  modal.classList.remove("active");
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
  }
});

// contact form submission
const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  emailjs.sendForm(
    "service_s1e8maq",
    "template_p5jqcpr",
    this,
    "Fx9JYRkcJIXjB_jkU"
  )
    .then(() => {
      alert("✅ Thanks for reaching out! I'll get back to you soon.");
      contactForm.reset();
      modal.classList.remove("active");
    })
    .catch((error) => {
      console.error("EmailJS Error:", error);
      alert("Something went wrong. Please try again.");
    });
});

// resume modal
const resumeModal = document.getElementById("resume-modal");
const openResumeButtons = document.querySelectorAll(".open-resume-modal");
const closeResumeButton = document.getElementById("resume-modal-close");

openResumeButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    resumeModal.classList.add("active");
  });
});

closeResumeButton.addEventListener("click", () => {
  resumeModal.classList.remove("active");
});

resumeModal.addEventListener("click", (e) => {
  if (e.target === resumeModal) {
    resumeModal.classList.remove("active");
  }
});
