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
