// Mobile nav toggle
const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");
if (toggle && links) {
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });
}

// Footer year
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// Apparel size pickers: pass the chosen size to the Gumroad checkout (?variant=)
document.querySelectorAll(".size-select[data-buy]").forEach((sel) => {
  const btn = document.getElementById(sel.dataset.buy);
  if (!btn) return;
  const sync = () => {
    const url = new URL(btn.href);
    url.searchParams.set("variant", sel.value);
    btn.href = url.toString();
  };
  sel.addEventListener("change", sync);
  sync();
});

// Apparel gallery: thumbnails swap the main model photo
document.querySelectorAll(".media.gallery").forEach((g) => {
  const main = g.querySelector(".model-img");
  g.querySelectorAll(".thumb").forEach((t) => {
    t.addEventListener("click", () => {
      main.src = t.dataset.src;
      g.querySelectorAll(".thumb").forEach((x) => x.classList.toggle("active", x === t));
    });
  });
});

// Contact form: show confirmation after FormSubmit redirects back with ?sent=1
var sent = document.getElementById('form-sent');
if (sent && new URLSearchParams(location.search).get('sent') === '1') sent.hidden = false;

// Contact form: send in the background; if the form service is down, offer a prefilled email instead.
var form = document.querySelector('.contact-form');
if (form && window.fetch) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var btn = form.querySelector('button[type=submit]');
    var ok = document.getElementById('form-sent'), err = document.getElementById('form-error');
    ok.hidden = true; err.hidden = true;
    btn.disabled = true; btn.textContent = 'Sending...';
    var data = new FormData(form);
    var ctrl = window.AbortController ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, 15000);
    fetch(form.action, {
      method: 'POST', body: data, headers: { Accept: 'application/json' }, signal: ctrl ? ctrl.signal : undefined
    }).then(function (r) {
      if (r.ok) { ok.hidden = false; form.reset(); }
      else throw new Error('failed');
    }).catch(function () {
      var body = data.get('message') + '\n\n' + data.get('name') + ' (' + data.get('email') + ')';
      document.getElementById('form-mailto').href = 'mailto:mlewis564@gmail.com?subject=' +
        encodeURIComponent(data.get('subject') || 'Message from thespiritualchosen.com') + '&body=' + encodeURIComponent(body);
      err.hidden = false;
    }).finally(function () { clearTimeout(timer); btn.disabled = false; btn.textContent = 'Send message'; });
  });
}
