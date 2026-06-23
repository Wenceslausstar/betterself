// ============================================================================
// EmailJS configuration
// ----------------------------------------------------------------------------
// SETUP STEPS — do these in your EmailJS dashboard (https://dashboard.emailjs.com):
//   1. In Email Services, make sure "service_t0lpseu" is connected to the inbox
//      you want submissions delivered to (YOUR_EMAIL@example.com).
//   2. Create two Email Templates and copy their IDs into the constants below:
//        - BOOKING_TEMPLATE_ID  — should use these template variables:
//            {{name}}, {{email}}, {{service}}, {{session_type}},
//            {{date}}, {{consent}}
//          and set the template's "To Email" to YOUR_EMAIL@example.com.
//        - NEWSLETTER_TEMPLATE_ID — should use one template variable:
//            {{newsletter_email}}
//          and set the template's "To Email" to YOUR_EMAIL@example.com.
// ============================================================================

const PUBLIC_KEY = "x3YLoc8JQ_6E1cM9s";
const SERVICE_ID = "service_t0lpseu";
const BOOKING_TEMPLATE_ID = "template_ljpurpd";
const NEWSLETTER_TEMPLATE_ID = "YOUR_NEWSLETTER_TEMPLATE_ID";

emailjs.init(PUBLIC_KEY);

// ----------------------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------------------

function showStatus(el, message, state) {
  if (!el) return;
  el.textContent = message;
  el.classList.remove("sr-only");
  el.dataset.state = state; // "pending" | "success" | "error"
}

function setSubmitting(form, isSubmitting) {
  const button = form.querySelector('button[type="submit"]');
  if (button) button.disabled = isSubmitting;
}

// ----------------------------------------------------------------------------
// Booking form
// ----------------------------------------------------------------------------

const bookingForm = document.getElementById("booking-form");
if (bookingForm) {
  const bookingConfirm = document.getElementById("booking-confirm");

  bookingForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = this.name.value.trim();
    const email = this.email.value.trim();
    const consent = this.consent.checked;

    if (!name || !email) {
      showStatus(bookingConfirm, "Please enter your name and email.", "error");
      return;
    }

    if (!consent) {
      showStatus(
        bookingConfirm,
        "Please confirm consent to be contacted before submitting.",
        "error",
      );
      return;
    }

    const formData = {
      name: name,
      email: email,
      service: this.service.value,
      session_type: this["session-type"].value,
      date: this.date.value,
      consent: consent ? "Yes" : "No",
    };

    setSubmitting(bookingForm, true);
    showStatus(bookingConfirm, "Sending...", "pending");

    emailjs.send(SERVICE_ID, BOOKING_TEMPLATE_ID, formData).then(
      () => {
        showStatus(
          bookingConfirm,
          "Thank you! Your booking request has been sent.",
          "success",
        );
        bookingForm.reset();
        setSubmitting(bookingForm, false);
      },
      (error) => {
        showStatus(
          bookingConfirm,
          "Oops! Something went wrong. Please try again.",
          "error",
        );
        setSubmitting(bookingForm, false);
        console.error("EmailJS booking error:", error);
      },
    );
  });
}

// ----------------------------------------------------------------------------
// Newsletter form
// ----------------------------------------------------------------------------

const newsletterForm = document.getElementById("newsletter-form");
if (newsletterForm) {
  let newsletterStatus = document.getElementById("newsletter-confirm");
  if (!newsletterStatus) {
    newsletterStatus = document.createElement("p");
    newsletterStatus.id = "newsletter-confirm";
    newsletterStatus.className = "sr-only";
    newsletterStatus.setAttribute("aria-live", "polite");
    newsletterForm.appendChild(newsletterStatus);
  }

  newsletterForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const emailInput = this["newsletter-email"];
    const userEmail = emailInput.value.trim();

    if (!userEmail) {
      showStatus(newsletterStatus, "Please enter your email address.", "error");
      return;
    }

    const formData = { newsletter_email: userEmail };

    setSubmitting(newsletterForm, true);
    showStatus(newsletterStatus, "Subscribing...", "pending");

    emailjs.send(SERVICE_ID, NEWSLETTER_TEMPLATE_ID, formData).then(
      () => {
        showStatus(newsletterStatus, "Thank you for subscribing!", "success");
        newsletterForm.reset();
        setSubmitting(newsletterForm, false);
      },
      (error) => {
        showStatus(
          newsletterStatus,
          "Oops! Something went wrong. Please try again.",
          "error",
        );
        setSubmitting(newsletterForm, false);
        console.error("EmailJS newsletter error:", error);
      },
    );
  });
}
