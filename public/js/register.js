document.addEventListener("DOMContentLoaded", function() {
  async function registerPatient() {
    const patient = {
      id: document.getElementById("id").value,
      name: document.getElementById("name").value,
      age: document.getElementById("age").value,
      gender: document.getElementById("gender").value,
      contact_details: document.getElementById("contact_details").value,
      allergies: document.getElementById("allergies").value,
      treatment_history: document.getElementById("treatment_history").value,
    };

    try {
      const response = await fetch("/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patient),
      });

      const data = await response.json();
      document.getElementById("message").textContent = data.message;

      if (response.ok) {
        document.getElementById("registerForm").reset(); // Reset form fields after successful registration
      }
    } catch (error) {
      console.error("Error registering patient:", error);
      document.getElementById("message").textContent = "Failed to register patient.";
    }
  }

  // Expose the function to be called when the button is clicked
  window.registerPatient = registerPatient;
});
