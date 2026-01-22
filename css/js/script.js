// Theme toggle with persistence (improved)
const toggle = document.getElementById('theme-toggle');

function setTheme(t){
  document.documentElement.setAttribute('data-theme', t);
  localStorage.setItem('theme', t);
  toggle.setAttribute('aria-pressed', t === 'light' ? 'true' : 'false');
}

// initialize theme (use stored, otherwise system preference)
const stored = localStorage.getItem('theme');
if(stored){
  setTheme(stored);
} else {
  const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  setTheme(prefersLight ? 'light' : 'dark');
}

toggle.addEventListener('click', ()=>{
  const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  setTheme(current);
});

// Simple form handling (mailto fallback)
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

form.addEventListener('submit', (e)=>{
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  if(!name || !email || !message){
    status.textContent = 'Please fill all fields.';
    return;
  }
  // Mailto fallback
  const subject = encodeURIComponent('Portfolio contact from ' + name);
  const body = encodeURIComponent(message + '\n\n— ' + name + '\n' + email);
  const mailto = `mailto:aditya@example.com?subject=${subject}&body=${body}`;
  status.textContent = 'Opening your email client...';
  window.location.href = mailto;
});

// Smooth scroll for internal links (only if target exists)
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', (e)=>{
    const href = a.getAttribute('href');
    if(href.length > 1){
      const target = document.querySelector(href);
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth',block:'start'});
        // give focus for screen readers
        target.setAttribute('tabindex', '-1');
        target.focus({preventScroll:true});
      }
    }
  });
});

// Accessibility: focus outline only when keyboard is used
function handleFirstTab(e){
  if(e.key === 'Tab'){
    document.body.classList.add('show-focus');
    window.removeEventListener('keydown', handleFirstTab);
  }
}
window.addEventListener('keydown', handleFirstTab);
