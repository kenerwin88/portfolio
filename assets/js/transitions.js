document.addEventListener("DOMContentLoaded", () => {
  const body = document.querySelector("body");

  // Add a fade-out class to the body when navigating to a new page
  document.addEventListener("click", (event) => {
    const target = event.target;
    if (target.tagName === "A" && target.getAttribute("href") !== "#") {
      event.preventDefault();
      body.classList.add("fade-out");
      setTimeout(() => {
        window.location.href = target.getAttribute("href");
      }, 300); // Adjust the delay time as needed to match the CSS transition duration
    }
  });
});
