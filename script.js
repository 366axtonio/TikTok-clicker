
let counter = 0;
let power = 1;
let autoPower = 0;
let user = "";
let upgrades = [
  { name: "Autoklicker", cost: 100, type: "auto", value: 1 },
  { name: "Superklick", cost: 250, type: "click", value: 2 },
  { name: "Follower-Magnet", cost: 750, type: "click", value: 5 },
  { name: "TikBoost", cost: 1000, type: "auto", value: 5 },
  { name: "Creator Power", cost: 2000, type: "click", value: 10 },
  { name: "Viral Modus", cost: 5000, type: "combo", value: 10 },
];

function login() {
  const name = document.getElementById("username").value;
  const pw = document.getElementById("password").value;
  if (name.length > 2 && pw.length > 2) {
    user = name;
    document.getElementById("login-screen").style.display = "none";
    document.getElementById("game-screen").style.display = "block";
    document.getElementById("user-name").textContent = user;
    loadLeaderboard();
    setInterval(() => {
      counter += autoPower;
      updateCounter();
    }, 2000);
    renderUpgrades();
  }
}

function logout() {
  location.reload();
}

function updateCounter() {
  document.getElementById("counter").textContent = counter;
  if (counter > highscore) {
    highscore = counter;
    document.getElementById("highscore").textContent = highscore;
    // sendToFirebase(user, highscore); // Wird in Firebase-Version aktiviert
  }
}

function clicker() {
  counter += power;
  updateCounter();
}

function buyUpgrade(index) {
  const upg = upgrades[index];
  if (counter >= upg.cost) {
    counter -= upg.cost;
    if (upg.type === "click") power += upg.value;
    if (upg.type === "auto") autoPower += upg.value;
    if (upg.type === "combo") {
      power += upg.value;
      autoPower += upg.value;
    }
    updateCounter();
  }
}

function renderUpgrades() {
  const area = document.getElementById("upgrades");
  area.innerHTML = "";
  upgrades.forEach((u, i) => {
    const btn = document.createElement("button");
    btn.innerText = `${u.name} (${u.cost} Follower)`;
    btn.onclick = () => buyUpgrade(i);
    area.appendChild(btn);
  });
}

let highscore = 0;

function loadLeaderboard() {
  // Platzhalter für Firebase-Daten
  const leaderboard = document.getElementById("leaderboard");
  leaderboard.innerHTML = "<li>Lädt...</li>";
}


// Firebase Auth & Leaderboard Sync
function login() {
  const email = document.getElementById("username").value + "@clicker.com";
  const password = document.getElementById("password").value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      user = document.getElementById("username").value;
      document.getElementById("login-screen").style.display = "none";
      document.getElementById("game-screen").style.display = "block";
      document.getElementById("user-name").textContent = user;
      loadLeaderboard();
      setInterval(() => {
        counter += autoPower;
        updateCounter();
      }, 2000);
      renderUpgrades();
    })
    .catch((error) => {
      // Erstellt Account automatisch bei Fehler
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => login())
        .catch((err) => alert("Fehler beim Login: " + err.message));
    });
}

function sendToFirebase(username, score) {
  firebase.database().ref("leaderboard/" + username).set({
    username: username,
    score: score
  });
}

function updateCounter() {
  document.getElementById("counter").textContent = counter;
  if (counter > highscore) {
    highscore = counter;
    document.getElementById("highscore").textContent = highscore;
    sendToFirebase(user, highscore);
  }
}

function loadLeaderboard() {
  const leaderboard = document.getElementById("leaderboard");
  leaderboard.innerHTML = "";
  firebase.database().ref("leaderboard").orderByChild("score").limitToLast(10).once("value", snapshot => {
    const entries = [];
    snapshot.forEach(child => entries.push(child.val()));
    entries.reverse().forEach(entry => {
      const li = document.createElement("li");
      li.textContent = entry.username + ": " + entry.score;
      leaderboard.appendChild(li);
    });
  });
}
