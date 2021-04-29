var damageFromClicks = document.getElementById("clickDamage");
var money = 10;
var generators = [];
var lastUpdate = Date.now();
var numberOfButtons = 5;
var userAmount = 1;
var usersDamageFromClicks = 0.2;

for (let i = 0; i < numberOfButtons; i++) {
  let generator = {
    cost: Math.pow(Math.pow(10, i), i) * 10 * userAmount,
    bought: 0,
    amount: 0,
    mult: 1 * i + 1 / 0.9,
  };
  generators.push(generator);
}

function format(amount) {
  let power = Math.floor(Math.log10(amount));
  let mantissa = amount / Math.pow(10, power);
  if (power < 3) return amount.toFixed(2);
  return mantissa.toFixed(2) + "e" + power;
}

function buyGenerator(i) {
  let g = generators[i - 1];
  if (g.cost * userAmount > money) return;
  money -= g.cost * userAmount;
  g.amount += 1 * userAmount;
  g.bought += 1 * userAmount;
  g.mult *= 1.05 * userAmount;
  g.cost *= 1.5 * userAmount;
  updateClickDamage();
}

function upgradeAmount(u) {
  if (u == 1) {
    userAmount = 1;

    document.getElementById("uAmount1").classList.add("active");
  } else {
    document.getElementById("uAmount1").classList.remove("active");
  }
  if (u == 2) {
    userAmount = 2;

    document.getElementById("uAmount2").classList.add("active");
  } else {
    document.getElementById("uAmount2").classList.remove("active");
  }
  if (u == 3) {
    userAmount = 5;
    document.getElementById("uAmount3").classList.add("active");
  } else {
    document.getElementById("uAmount3").classList.remove("active");
  }
  if (u == 4) {
    userAmount = 10;
    document.getElementById("uAmount4").classList.add("active");
  } else {
    document.getElementById("uAmount4").classList.remove("active");
  }
}

function pickName(num) {
  let names = ["Udenblogen", "Hydra", "Balrog", "Vorkath", "Elisande"];
  return names[num];
}

function updateGUI() {
  document.getElementById("counter").innerHTML = "You have $" + format(money);
  for (let i = 0; i < numberOfButtons; i++) {
    let g = generators[i];
    document.getElementById("gen" + (i + 1)).innerHTML =
      pickName(i) +
      "(Current Level: " +
      g.bought +
      ")" +
      "<br>Cost: " +
      "$" +
      format(g.cost * userAmount) +
      "<br>" +
      format(g.bought * g.mult) +
      " DPS";

    if (g.cost * userAmount > money)
      document.getElementById("gen" + (i + 1)).classList.add("locked");
    else document.getElementById("gen" + (i + 1)).classList.remove("locked");
  }
}

function addUp() {
  let total = 0;
  for (let i = 0; i < numberOfButtons; i++) {
    total += generators[i].bought * generators[i].mult;
    return total;
  }
}

function userClick() {
  money += 0.2 + addUp() / 150;
}

function updateClickDamage() {
  usersDamageFromClicks += 0.2 + addUp() / 150;
  money += usersDamageFromClicks;
  damageFromClicks.innerHTML = "Click Damage:" + format(usersDamageFromClicks);
}
function productionLoop(diff) {
  for (let i = 1; i < numberOfButtons; i++) {
    money += generators[i - 1].amount * generators[i - 1].mult * diff;
  }
}

function mainLoop() {
  var diff = (Date.now() - lastUpdate) / 1000;
  productionLoop(diff);
  updateGUI();
  lastUpdate = Date.now();
}
setInterval(mainLoop, 50);
updateGUI();
