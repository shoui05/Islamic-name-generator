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
    console.error("Error loading names:", error);
    document.getElementById("nameDisplay").textContent = "Failed to load names.";
  }
}

function generateName(type) {
  const names = type === "boy" ? boyNames : girlNames;
  const used = type === "boy" ? usedBoyNames : usedGirlNames;

  if (names.length === 0) {
    document.getElementById("nameDisplay").textContent = "Names not loaded.";
    return;
  }

  if (used.length === names.length) used.length = 0;

  const available = names.filter((name) => !used.includes(name));
  const randomName = available[Math.floor(Math.random() * available.length)];
  used.push(randomName);

  document.getElementById("nameDisplay").textContent = randomName;
}

loadNames();

