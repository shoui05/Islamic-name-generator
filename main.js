let boyNames = [];
let girlNames = [];
let usedBoyNames = [];
let usedGirlNames = [];

async function loadNames() {
  try {
    const boyResponse = await fetch("boy-names.json");
    boyNames = await boyResponse.json();

    const girlResponse = await fetch("girl-names.json");
    girlNames = await girlResponse.json();
  } catch (error) {
    document.getElementById("nameDisplay").textContent = "Failed to load names.";
  }
}

function generateSelectedName() {
  const selectedGender = document.querySelector('input[name="gender"]:checked').value;
  generateName(selectedGender);
}

function generateName(type) {
  const names = type === "boy" ? boyNames : girlNames;
  const used = type === "boy" ? usedBoyNames : usedGirlNames;

  if (names.length === 0) return;

  if (used.length === names.length) used.length = 0;

  const available = names.filter((n) => !used.includes(n));
  const randomName = available[Math.floor(Math.random() * available.length)];
  used.push(randomName);

  const display = document.getElementById("nameDisplay");
  display.textContent = randomName;
  display.classList.remove("pop-in");
  void display.offsetWidth;
  display.classList.add("pop-in");

  document.getElementById("copyMsg").classList.add("hidden");
}

function copyToClipboard(el) {
  const text = el.textContent;
  if (!text || text.includes("Click")) return;

  navigator.clipboard.writeText(text).then(() => {
    const toast = document.getElementById("copyMsg");
    toast.classList.remove("hidden");
    setTimeout(() => toast.classList.add("hidden"), 2000);
  });
}

loadNames();
