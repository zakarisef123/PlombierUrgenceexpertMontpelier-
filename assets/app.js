/* Teddy-ets — scripts du site */
(function () {
  "use strict";

  /* En-tête : ombre au défilement */
  var topbar = document.querySelector(".topbar");
  function onScroll() { if (topbar) topbar.classList.toggle("scrolled", window.scrollY > 10); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Menu mobile (tiroir) */
  var toggle = document.getElementById("nav-toggle");
  var drawer = document.getElementById("drawer");
  var drawerClose = document.getElementById("drawer-close");
  function openDrawer() {
    drawer.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
    document.body.classList.add("menu-open");
    toggle.setAttribute("aria-expanded", "true");
    if (drawerClose) drawerClose.focus();
  }
  function closeDrawer() {
    drawer.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
    document.body.classList.remove("menu-open");
    toggle.setAttribute("aria-expanded", "false");
  }
  if (toggle && drawer) {
    toggle.addEventListener("click", openDrawer);
    drawerClose && drawerClose.addEventListener("click", closeDrawer);
    drawer.addEventListener("click", function (e) { if (e.target === drawer) closeDrawer(); });
    drawer.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", closeDrawer); });
  }

  /* Fenêtre « Demander un devis » */
  var modal = document.getElementById("devis-modal");
  var modalClose = document.getElementById("devis-close");
  var label = document.getElementById("devis-service-label");
  var input = document.getElementById("devis-service-input");
  var lastFocus = null;
  function openModal(service) {
    if (!modal) return;
    lastFocus = document.activeElement;
    label.textContent = service;
    input.value = service;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    var first = document.getElementById("d-prenom");
    if (first) first.focus();
  }
  function closeModal() {
    if (!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  document.querySelectorAll(".js-quote").forEach(function (btn) {
    btn.addEventListener("click", function () { openModal(btn.getAttribute("data-service") || "Intervention"); });
  });
  modalClose && modalClose.addEventListener("click", closeModal);
  modal && modal.addEventListener("click", function (e) { if (e.target === modal) closeModal(); });

  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if (modal && modal.classList.contains("open")) closeModal();
    if (drawer && drawer.classList.contains("open")) closeDrawer();
  });

  /* Consentement (Consent Mode v2) */
  var KEY = "pue_consent_v1";
  var bar = document.getElementById("consent-bar");
  function push() { window.dataLayer = window.dataLayer || []; window.dataLayer.push(arguments); }
  function apply(c) {
    push("consent", "update", {
      ad_storage: c.ads ? "granted" : "denied",
      ad_user_data: c.ads ? "granted" : "denied",
      ad_personalization: c.ads ? "granted" : "denied",
      analytics_storage: c.analytics ? "granted" : "denied"
    });
  }
  function stored() { try { return JSON.parse(localStorage.getItem(KEY)); } catch (e) { return null; } }
  function save(c) { try { localStorage.setItem(KEY, JSON.stringify(c)); } catch (e) {} apply(c); bar.classList.remove("open"); }
  if (bar) {
    var s = stored();
    if (s) { apply(s); } else { bar.classList.add("open"); }
    document.getElementById("consent-yes").addEventListener("click", function () { save({ analytics: true, ads: true }); });
    document.getElementById("consent-no").addEventListener("click", function () { save({ analytics: false, ads: false }); });
    var reopen = document.getElementById("consent-open");
    reopen && reopen.addEventListener("click", function (e) { e.preventDefault(); bar.classList.add("open"); });
  }

  /* Formulaires FormSubmit : envoi classique, puis redirection vers /merci/ */
  document.querySelectorAll('form[action*="formsubmit.co"]').forEach(function (form) {
    form.addEventListener("submit", function () {
      var b = form.querySelector('button[type="submit"]');
      if (b) { b.disabled = true; b.textContent = "Envoi en cours..."; }
    });
  });

  /* Visionneuse photos des chantiers */
  var zooms = document.querySelectorAll("[data-lightbox]");
  if (zooms.length && typeof HTMLDialogElement === "function") {
    var d = document.createElement("dialog");
    d.className = "viewer";
    d.innerHTML = '<button type="button" class="viewer-close" aria-label="Fermer">&times;</button><img alt=""><p></p>';
    document.body.appendChild(d);
    var img = d.querySelector("img"), cap = d.querySelector("p");
    d.querySelector(".viewer-close").addEventListener("click", function () { d.close(); });
    d.addEventListener("click", function (e) { if (e.target === d) d.close(); });
    zooms.forEach(function (a) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        img.src = a.getAttribute("href");
        img.alt = a.getAttribute("data-caption") || "";
        cap.textContent = a.getAttribute("data-caption") || "";
        d.showModal();
      });
    });
  }
})();
