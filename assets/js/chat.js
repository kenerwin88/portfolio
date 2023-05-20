const thoughtBubble = document.querySelector(".thought-bubble");
const questionInput = document.querySelector(".question-input");
const response = document.querySelector(".response");

questionInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    const question = questionInput.value;
    questionInput.value = "";
    thoughtBubble.classList.remove("show");
    setTimeout(() => {
      response.classList.remove("show");
      setTimeout(() => {
        response.textContent = question;
        response.classList.add("show");
        thoughtBubble.classList.add("show");
      }, 200);
    }, 200);
  }
});
