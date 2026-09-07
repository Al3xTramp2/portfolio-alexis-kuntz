document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     ANNÉE AUTOMATIQUE DU FOOTER
     ===================================================== */

  const yearElement = document.querySelector("#year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }


  /* =====================================================
     NAVIGATION
     ===================================================== */

  const navLinks = document.querySelectorAll(".nav-links a");


  /* Récupération de la page actuelle */

  const currentPage =
    window.location.pathname.split("/").pop() || "index.html";


  navLinks.forEach((link) => {

    const href = link.getAttribute("href");

    if (!href) {
      return;
    }


    /*
     * On récupère le nom de la page sans l'ancre.
     *
     * Exemple :
     *
     * index.html#projects
     *
     * devient :
     *
     * index.html
     */

    const linkPage = href.split("#")[0];


    /*
     * Sur la page compétences,
     * on active automatiquement "Compétences".
     */

    if (
      (currentPage === "competences.html" ||
        currentPage === "certifications.html" ||
        currentPage === "holocibo.html" ||
        currentPage === "prixy.html" ||
        currentPage === "tickets.html") &&
      linkPage === "competences.html"
    ) {
      link.classList.add("active");
    }


    /*
     * Sur la page d'accueil,
     * on active "Accueil" par défaut.
     */

    if (
      currentPage === "index.html" &&
      href === "index.html"
    ) {
      link.classList.add("active");
    }


    /*
     * Gestion du clic sur les liens.
     */

    link.addEventListener("click", () => {

      navLinks.forEach((item) => {
        item.classList.remove("active");
      });

      link.classList.add("active");

    });

  });

});
