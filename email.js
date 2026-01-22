// Initialize EmailJS with your public key
// Get your public key from https://dashboard.emailjs.com/admin/account
emailjs.init("x3YLoc8JQ_6E1cM9s");

// Handle booking form submission
const bookingForm = document.getElementById("booking-form");
bookingForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Show a processing message to the user
  const bookingConfirm = document.getElementById("booking-confirm");
  bookingConfirm.textContent = "Sending...";
  bookingConfirm.classList.remove("sr-only");

  // Collect form data
  const formData = {
    name: this.name.value,
    email: this.email.value,
    service: this.service.value,
    session_type: this["session-type"].value,
    date: this.date.value,
    consent: this.consent.checked,
  };

  // Send email using EmailJS
  // Create a template on EmailJS and replace 'YOUR_BOOKING_TEMPLATE_ID'
  // with the actual template ID.
  // The template should have variables for:
  // {{name}}, {{email}}, {{service}}, {{session_type}}, {{date}}, {{consent}}
  emailjs.send("service_t0lpseu", "YOUR_BOOKING_TEMPLATE_ID", formData).then(
    () => {
      bookingConfirm.textContent =
        "Thank you! Your booking request has been sent.";
      bookingForm.reset();
    },
    (error) => {
      bookingConfirm.textContent =
        "Oops! Something went wrong. Please try again.";
      console.error("EmailJS error:", error);
    }
  );
});

// Handle newsletter form submission
const newsletterForm = document.getElementById("newsletter-form");
newsletterForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const emailInput = this["newsletter-email"];
  const userEmail = emailInput.value;

  // Simple validation for email
  if (!userEmail) {
    alert("Please enter your email address.");
    return;
  }

  const formData = {
    newsletter_email: userEmail,
  };

  // Send email using EmailJS
  // Create another template for the newsletter and replace 'YOUR_NEWSLETTER_TEMPLATE_ID'
  // The template should have one variable: {{newsletter_email}}
  emailjs.send("service_t0lpseu", "YOUR_NEWSLETTER_TEMPLATE_ID", formData).then(
    () => {
      alert("Thank you for subscribing!");
      newsletterForm.reset();
    },
    (error) => {
      alert("Oops! Something went wrong. Please try again.");
      console.error("EmailJS error:", error);
    }
  );
});
