let usedNames = {
  boy: new Set(),
  girl: new Set(),
};

async function fetchNames(gender) {
  const response = await fetch(`${gender}-names.json`);
  const names = await response.json();
  return names;
}

async function generateSelectedName() {
  const gender = document.querySelector('input[name="gender"]:checked').value;
  const names = await fetchNames(gender);
  let name;

  // Try up to 10 times to get a unique name
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * names.length);
    name = names[randomIndex];
    if (!usedNames[gender].has(name)) {
      usedNames[gender].add(name);
      break;
    }
  }

  // If all names used, reset
  if (usedNames[gender].size === names.length) {
    usedNames[gender].clear();
  }

  const display = document.getElementById("nameDisplay");
  display.textContent = name;
  animateName();
}

function copyToClipboard(element) {
  const text = element.textContent;
  navigator.clipboard.writeText(text).then(() => {
    const copyMsg = document.getElementById("copyMsg");
    copyMsg.classList.remove("hidden");
    setTimeout(() => {
      copyMsg.classList.add("hidden");
    }, 1500);
  });
}

function animateName() {
  const display = document.getElementById("nameDisplay");
  display.classList.remove("animate-pop");
  void display.offsetWidth; // Trigger reflow to restart animation
  display.classList.add("animate-pop");
      }
