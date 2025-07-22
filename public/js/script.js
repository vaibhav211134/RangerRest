(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();
// this code taken from bootstrap documentation to validate forms.

document.addEventListener("DOMContentLoaded", () => {
  const navbarCollapse = document.getElementById("navbarNavAltMarkup");
  const pageContent = document.querySelector(".page-content");

  if (navbarCollapse && pageContent) {
    navbarCollapse.addEventListener("shown.bs.collapse", () => {
      pageContent.classList.add("shifted-down");
    });

    navbarCollapse.addEventListener("hidden.bs.collapse", () => {
      pageContent.classList.remove("shifted-down");
    });
  }
});
