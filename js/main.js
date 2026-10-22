(function () {
  "use strict";

  var root = document.documentElement;
  var contactEmail = (root.getAttribute("data-contact-email") || "").trim();
  var header = document.querySelector(".site-header");
  var nav = document.getElementById("site-nav");
  var toggle = document.querySelector(".nav-toggle");

  function closeNav() {
    if (!nav || !toggle) return;
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      if (open) {
        closeNav();
      } else {
        nav.classList.add("is-open");
        toggle.setAttribute("aria-expanded", "true");
      }
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeNav();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape") return;
      if (toggle.getAttribute("aria-expanded") !== "true") return;
      closeNav();
      toggle.focus();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth >= 900) closeNav();
    });
  }

  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }

  var sections = [];
  if (nav) {
    nav.querySelectorAll('a[href^="#"]').forEach(function (link) {
      var id = link.getAttribute("href").slice(1);
      var section = document.getElementById(id);
      if (section) sections.push({ link: link, section: section });
    });
  }

  var spyQueued = false;
  function updateCurrent() {
    spyQueued = false;
    if (!sections.length) return;
    var line = window.scrollY + (header ? header.offsetHeight : 0) + 32;
    var current = sections[0];
    sections.forEach(function (item) {
      var top = item.section.getBoundingClientRect().top + window.scrollY;
      if (top <= line) current = item;
    });
    sections.forEach(function (item) {
      if (item === current) item.link.setAttribute("aria-current", "true");
      else item.link.removeAttribute("aria-current");
    });
  }

  function queueSpy() {
    if (spyQueued) return;
    spyQueued = true;
    window.requestAnimationFrame(updateCurrent);
  }

  onScroll();
  updateCurrent();
  window.addEventListener("scroll", function () {
    onScroll();
    queueSpy();
  }, { passive: true });

  function emailReady() {
    return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(contactEmail);
  }

  function clearError(input) {
    var error = document.getElementById(input.id + "-error");
    if (!error) return;
    error.hidden = true;
    error.textContent = "";
    input.removeAttribute("aria-invalid");
  }

  function setError(input, message) {
    var error = document.getElementById(input.id + "-error");
    if (!error) return;
    error.hidden = false;
    error.textContent = message;
    input.setAttribute("aria-invalid", "true");
  }

  function validEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function wireClear(form) {
    form.addEventListener("input", function (event) {
      if (event.target && event.target.id) clearError(event.target);
    });
    form.addEventListener("change", function (event) {
      if (event.target && event.target.id) clearError(event.target);
    });
  }

  function mailHref(subject, body) {
    var limit = 1500;
    var text = body;
    if (text.length > limit) {
      text = text.slice(0, limit).trim() + "\r\n\r\n[The note was shortened so the email link would open.]";
    }
    return "mailto:" + contactEmail +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(text);
  }

  function valueOf(form, name) {
    var field = form.elements[name];
    if (!field) return "";
    return String(field.value || "").trim();
  }

  var interestForm = document.getElementById("interest-form");
  if (interestForm) {
    wireClear(interestForm);
    interestForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var name = interestForm.elements.name;
      var email = interestForm.elements.email;
      var role = interestForm.elements.role;
      var firstInvalid = null;
      var ok = true;

      if (!valueOf(interestForm, "name")) {
        setError(name, "Please add your name.");
        ok = false;
        firstInvalid = firstInvalid || name;
      } else {
        clearError(name);
      }

      if (!valueOf(interestForm, "email")) {
        setError(email, "Please add your email so we know how to reply.");
        ok = false;
        firstInvalid = firstInvalid || email;
      } else if (!validEmail(valueOf(interestForm, "email"))) {
        setError(email, "That email does not look complete.");
        ok = false;
        firstInvalid = firstInvalid || email;
      } else {
        clearError(email);
      }

      if (!valueOf(interestForm, "role")) {
        setError(role, "Please choose how you hope to take part.");
        ok = false;
        firstInvalid = firstInvalid || role;
      } else {
        clearError(role);
      }

      var status = document.getElementById("interest-status");
      if (!ok) {
        if (status) status.textContent = "";
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      if (!emailReady()) {
        if (status) status.textContent = "The contact address on this page is missing or not usable yet.";
        return;
      }

      var body = [
        "Name: " + valueOf(interestForm, "name"),
        "Email: " + valueOf(interestForm, "email"),
        "Church or team: " + (valueOf(interestForm, "organization") || "(not given)"),
        "Hoping to: " + valueOf(interestForm, "role"),
        "",
        "Note:",
        valueOf(interestForm, "message") || "(none)",
        "",
        "Sent from the 24-7 Worship website."
      ].join("\r\n");

      window.location.href = mailHref("24-7 Worship — interest in getting involved", body);
      if (status) {
        status.textContent = "Your email app should open with this note addressed to " + contactEmail + ". Email is available. If no app opens, copy the address and write from your own mail.";
      }
    });
  }

  var prayerForm = document.getElementById("prayer-form");
  if (prayerForm) {
    wireClear(prayerForm);
    prayerForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var email = prayerForm.elements.email;
      var request = prayerForm.elements.request;
      var consent = prayerForm.elements.consent;
      var firstInvalid = null;
      var ok = true;
      var emailValue = valueOf(prayerForm, "email");

      if (emailValue && !validEmail(emailValue)) {
        setError(email, "That email does not look complete. You can leave it blank.");
        ok = false;
        firstInvalid = firstInvalid || email;
      } else if (email) {
        clearError(email);
      }

      if (!valueOf(prayerForm, "request")) {
        setError(request, "Please write a short prayer request.");
        ok = false;
        firstInvalid = firstInvalid || request;
      } else {
        clearError(request);
      }

      if (!consent.checked) {
        setError(consent, "Please confirm that you understand this request is emailed and is not published here.");
        ok = false;
        firstInvalid = firstInvalid || consent;
      } else {
        clearError(consent);
      }

      var status = document.getElementById("prayer-status");
      if (!ok) {
        if (status) status.textContent = "";
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      if (!emailReady()) {
        if (status) status.textContent = "The contact address on this page is missing or not usable yet.";
        return;
      }

      var body = [
        "Name: " + (valueOf(prayerForm, "name") || "(not given)"),
        "Email: " + (emailValue || "(not given)"),
        "",
        "Prayer request:",
        valueOf(prayerForm, "request"),
        "",
        "The sender confirmed this request may be emailed and should not be published on the website.",
        "Sent from the 24-7 Worship website."
      ].join("\r\n");

      window.location.href = mailHref("24-7 Worship — prayer request", body);
      if (status) {
        status.textContent = "Your email app should open with this request addressed to " + contactEmail + ". Email is available. The request is not published on this page. If no app opens, copy the address and write from your own mail.";
      }
    });
  }
})();
