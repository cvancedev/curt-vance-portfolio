// Theme controls work even when storage or the email provider is unavailable.
const root = document.documentElement;
const tBtn = document.getElementById('theme-toggle');
const themeColor = document.querySelector('meta[name="theme-color"]');
function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  themeColor.setAttribute('content', theme === 'light' ? '#fafafa' : '#0a0a0a');
}
try {
  const saved = localStorage.getItem('cv-theme');
  if (saved === 'dark' || saved === 'light') applyTheme(saved);
} catch {
  // Storage is optional; the current page can still switch themes.
}
tBtn.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  try { localStorage.setItem('cv-theme', next); } catch { /* Optional persistence. */ }
});

// Preserve section navigation while respecting the visitor's motion preference.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (id.length > 1) {
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        if (a.classList.contains('skip-link')) el.focus({ preventScroll: true });
        window.scrollTo({
          top: el.offsetTop - 60,
          behavior: reducedMotion.matches ? 'instant' : 'smooth',
        });
      }
    }
  });
});

// Shared keyboard behavior; each modal keeps its own opener and close action.
function setupModal(id, openerSelector, closeId, initialFocusSelector) {
  const modal = document.getElementById(id);
  let opener;
  function close() {
    modal.classList.remove('active');
    opener?.focus();
  }
  document.querySelectorAll(openerSelector).forEach(button => {
    button.addEventListener('click', () => {
      opener = button;
      modal.classList.add('active');
      modal.querySelector(initialFocusSelector).focus();
    });
  });
  document.getElementById(closeId).addEventListener('click', close);
  modal.addEventListener('click', e => {
    if (e.target === modal) close();
  });
  modal.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      e.preventDefault();
      close();
    }
    if (e.key === 'Tab') {
      const controls = [...modal.querySelectorAll('a[href], button, input, textarea')]
        .filter(el => !el.disabled && el.getClientRects().length > 0);
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
  return close;
}
const closeContactModal = setupModal('contact-modal', '.open-contact-modal', 'modal-close', '#contact-name');
setupModal('resume-modal', '.open-resume-modal', 'resume-modal-close', '.modal-actions a');

// EmailJS is optional and cannot interrupt initialization of the controls above.
let initializedEmailClient;
function getEmailClient() {
  const client = window.emailjs;
  if (!client || typeof client.init !== 'function' || typeof client.sendForm !== 'function') return null;
  try {
    if (client !== initializedEmailClient) {
      client.init({ publicKey: "Fx9JYRkcJIXjB_jkU" });
      initializedEmailClient = client;
    }
    return client;
  } catch {
    return null;
  }
}
const contactForm = document.getElementById('contact-form');
const contactFeedback = document.getElementById('contact-feedback');
function showContactFallback() {
  contactFeedback.hidden = false;
  contactFeedback.scrollIntoView({ block: 'nearest', behavior: 'instant' });
}
getEmailClient();
contactForm.addEventListener('submit', async function (e) {
  e.preventDefault();
  const client = getEmailClient();
  if (!client) {
    showContactFallback();
    return;
  }
  contactFeedback.hidden = true;
  try {
    await client.sendForm(
      "service_s1e8maq",
      "template_p5jqcpr",
      this,
      "Fx9JYRkcJIXjB_jkU"
    );
    alert("✅ Thanks for reaching out! I'll get back to you soon.");
    contactForm.reset();
    closeContactModal();
  } catch {
    showContactFallback();
  }
});
