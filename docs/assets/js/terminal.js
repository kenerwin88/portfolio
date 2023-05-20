const terminal = document.getElementById("terminal");
const ctx = terminal.getContext("2d");

// Set the terminal dimensions
terminal.width = window.innerWidth;
terminal.height = window.innerHeight;

const prompt = ">> ";
const inputOffset = 15;
const lineOffset = 20;
let currentLine = 1;
let currentX = inputOffset;

// Handle user input
document.addEventListener("keydown", handleInput);

function handleInput(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    processCommand();
    currentLine++;
    currentX = inputOffset;
    drawPrompt();
    drawInputLine();
  } else if (event.key === "Backspace") {
    event.preventDefault();
    removeLastCharacter();
    drawPrompt();
    drawInputLine();
  } else if (event.key === " ") {
    event.preventDefault();
    appendCharacter(" ");
    drawPrompt();
    drawInputLine();
  } else if (event.key.length === 1) {
    event.preventDefault();
    appendCharacter(event.key);
    drawPrompt();
    drawInputLine();
  }
}

// Process user command
function processCommand() {
  const input = getInput();
  const output = executeCommand(input);
  printOutput(output);
  clearInput();
  currentLine++;
}

// Get user input
function getInput() {
  const inputText = terminal.value.substring(
    terminal.value.lastIndexOf(prompt) + prompt.length
  );
  return inputText.trim();
}

// Execute user command
function executeCommand(input) {
  // Perform command logic here
  return `Command executed: ${input}`;
}

// Print output to the terminal
function printOutput(output) {
  currentLine += Math.ceil(
    ctx.measureText(output).width / (terminal.width - inputOffset)
  );
  ctx.fillStyle = "#00ff00";
  wrapText(
    output,
    inputOffset,
    currentLine * lineOffset,
    terminal.width - inputOffset
  );
  currentLine++;
}

// Append character to the input
function appendCharacter(character) {
  ctx.fillStyle = "#00ff00";
  ctx.fillText(character, currentX, currentLine * lineOffset);
  terminal.value += character;
  currentX += ctx.measureText(character).width;
}

// Remove last character from the input
function removeLastCharacter() {
  const inputText = getInput();
  if (inputText.length > 0) {
    const lastCharacterWidth = ctx.measureText(
      inputText[inputText.length - 1]
    ).width;
    ctx.clearRect(
      currentX - lastCharacterWidth,
      (currentLine - 1) * lineOffset - 12,
      lastCharacterWidth,
      lineOffset
    );
    terminal.value = terminal.value.slice(0, -1);
    currentX -= lastCharacterWidth;
  }
}

// Clear the input
function clearInput() {
  const inputText = getInput();
  const inputWidth = ctx.measureText(inputText).width;
  ctx.clearRect(
    inputOffset,
    currentLine * lineOffset - 12,
    inputWidth,
    lineOffset
  );
  terminal.value = terminal.value.replace(prompt, "");
  currentX = inputOffset + inputWidth;
}

// Draw the prompt symbol
function drawPrompt() {
  ctx.fillStyle = "#00ff00";
  ctx.fillText(prompt, 0, currentLine * lineOffset);
}

// Draw the input line
function drawInputLine() {
  ctx.fillStyle = "#00ff00";
  ctx.fillText(">", inputOffset - 10, currentLine * lineOffset);
}

// Wrap text within a given width
function wrapText(text, x, y, maxWidth) {
  const words = text.split(" ");
  let line = "";
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const wordWidth = ctx.measureText(word).width;
    if (ctx.measureText(line + word).width < maxWidth) {
      line += word + " ";
    } else {
      ctx.fillText(line, x, y);
      y += lineOffset;
      line = word + " ";
    }
  }
  ctx.fillText(line, x, y);
}
