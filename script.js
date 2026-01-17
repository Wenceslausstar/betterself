// Minimal JS for menu and accordion + booking demo
document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("primary-nav");
  navToggle &&
    navToggle.addEventListener("click", function () {
      const expanded = this.getAttribute("aria-expanded") === "true";
      this.setAttribute("aria-expanded", !expanded);
      nav.style.display = expanded ? "none" : "block";
    });

  // accordions
  const toggles = document.querySelectorAll(".accordion-toggle");
  toggles.forEach((btn) => {
    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!expanded));
      const panel = btn.nextElementSibling;
      if (panel) {
        panel.hidden = expanded;
      }
    });
    btn.addEventListener("keyup", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        btn.click();
      }
    });
  });

  // booking form demo (client-side only)
  const form = document.getElementById("booking-form");
  const conf = document.getElementById("booking-confirm");
  form &&
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      // simple client-side validation demo
      if (!form.checkValidity()) {
        conf.textContent = "Please complete required fields.";
        conf.classList.remove("sr-only");
        return;
      }
      conf.textContent =
        "Thanks — your request was received. We will contact you privately to confirm.";
      conf.classList.remove("sr-only");
      form.reset();
    });

  // Simple newsletter demo handler
  const newsletter = document.getElementById("newsletter-form");
  newsletter &&
    newsletter.addEventListener("submit", function (e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      if (!emailInput || !emailInput.checkValidity()) {
        alert("Please enter a valid email address.");
        return;
      }
      // demo confirmation; in production post to a service
      emailInput.value = "";
      alert("Thanks — you've been subscribed (demo).");
    });

  // Header: toggle transparent vs scrolled background depending on scroll position
  const header = document.querySelector(".site-header");
  const hero = document.querySelector(".hero");
  function updateHeaderState() {
    if (!header || !hero) return;
    const threshold = Math.max(0, hero.offsetHeight - header.offsetHeight - 16);
    if (window.scrollY > threshold) {
      header.classList.remove("over-hero");
      header.classList.add("scrolled");
    } else {
      header.classList.add("over-hero");
      header.classList.remove("scrolled");
    }
  }
  updateHeaderState();
  window.addEventListener("scroll", updateHeaderState);
  window.addEventListener("resize", updateHeaderState);

  // Stats counter animation
  const animateStatNumbers = () => {
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsCard = document.querySelector('.stats-card');
    const domeFill = statsCard ? statsCard.querySelector('.dome-fill') : null;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;

                // If this is the main stat, trigger the dome animation
                if (el.parentElement.dataset.mainStat === 'true' && domeFill) {
                    domeFill.style.height = '80%';
                }

                const goal = parseInt(el.dataset.goal, 10);
                const hasPlus = el.dataset.plus === 'true';
                const duration = 2000; // 2 seconds
                let start = null;

                const step = (timestamp) => {
                    if (!start) start = timestamp;
                    const progress = timestamp - start;
                    const current = Math.min(Math.floor(progress / duration * goal), goal);
                    
                    el.textContent = current;

                    if (current < goal) {
                        requestAnimationFrame(step);
                    } else {
                        el.textContent = goal + (hasPlus ? '+' : '');
                    }
                };

                requestAnimationFrame(step);
                observer.unobserve(el); // Animate only once
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(number => {
        observer.observe(number);
    });
  };

  animateStatNumbers();
});
