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

let contactOpener;
function closeContactModal() {
  modal.classList.remove("active");
  contactOpener?.focus();
}

openModalButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    contactOpener = button;
    modal.classList.add("active");
    document.getElementById("contact-name").focus();
  });
});

closeModalButton.addEventListener("click", closeContactModal);

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeContactModal();
  }
});

modal.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    e.preventDefault();
    closeContactModal();
  }
  if (e.key === "Tab") {
    const controls = [...modal.querySelectorAll('button, input, textarea')];
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
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
      closeContactModal();
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
