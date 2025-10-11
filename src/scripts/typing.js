// Typing effect for animated paragraph
const greetings = [
    "Hi, I'm Gabe!",
    "Hallo, ich bin Gabe!",
    "嗨, 我是 Gabe!"
];
const typingSpeed = 50; // ms per character

// Types out each greeting, waits, then clears it before moving to the next.
function typeGreeting(element) {
  let i = 0;
  let idx = 0;
  let forwards = true;
  function type() {
    element.textContent = greetings[idx].slice(0, i);
    // Reached the end of the current greeting
    // Wait a bit before starting to delete
    if (forwards && i === greetings[idx].length) {
        forwards = false;
        setTimeout(type, 10000);
    // Fully deleted the current greeting
    // Switch to a new one after a short pause
    } else if (!forwards && i === 0) {
        forwards = true;
        idx = (idx + 1) % greetings.length;
        setTimeout(type, 500);
    }
    // Continue typing or deleting
    else {
        i = forwards ? i + 1 : i - 1;
        setTimeout(type, typingSpeed);
    }
  }
  type();
}

document.addEventListener("DOMContentLoaded", () => {
  const el = document.getElementById("greeting");
  if (el) {
    typeGreeting(el);
  }
});
