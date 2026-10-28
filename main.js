const $ = (s, c = document) => c.querySelector(s);
// Menu hambúrguer
const toggle = $('.nav__toggle'), menu = $('#menu');
toggle.addEventListener('click', () => {
  const open = menu.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', open);
});
// Dropdown (mobile: clique)
document.querySelectorAll('.dropdown > button').forEach(b => b.addEventListener('click', () => {
  const d = b.parentElement, open = d.classList.toggle('is-open');
  b.setAttribute('aria-expanded', open);
}));
// Modal
const modal = $('#modal');
document.querySelectorAll('[data-open-modal]').forEach(b => b.addEventListener('click', () => { modal.classList.add('is-open'); $('.btn', modal).focus(); }));
document.querySelectorAll('[data-close-modal]').forEach(b => b.addEventListener('click', () => modal.classList.remove('is-open')));
document.addEventListener('keydown', e => e.key === 'Escape' && modal.classList.remove('is-open'));
// Toast
function toast(msg) {
  const t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); t.textContent = msg;
  $('#toasts').appendChild(t); setTimeout(() => t.remove(), 3500);
}
document.querySelectorAll('[data-toast]').forEach(b => b.addEventListener('click', () => toast(b.dataset.toast)));
// Validação visual
const form = $('#form-voluntario');
form.addEventListener('submit', e => {
  e.preventDefault();
  let ok = true;
  form.querySelectorAll('.form__control[required]').forEach(c => {
    const valid = c.checkValidity();
    c.classList.toggle('is-invalid', !valid); c.classList.toggle('is-valid', valid);
    if (!valid) ok = false;
  });
  if (ok) { toast('Cadastro enviado com sucesso!'); form.reset(); form.querySelectorAll('.is-valid').forEach(c => c.classList.remove('is-valid')); }
});