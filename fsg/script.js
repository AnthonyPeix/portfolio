const canvas = document.getElementById("snakeCanvas");
const ctx = canvas.getContext("2d");
const box = 20; // Taille du "carré" pour le serpent et "cercle" pour la pomme
let snake = [{ x: 5 * box, y: 5 * box }];
let food = generateFood(); // Générer une première pomme
let direction = "RIGHT";
let score = 0; // Variable pour le score
let gameStarted = false; // Nouvelle variable pour suivre si le jeu a commencé

// Fonction pour dessiner l'état initial
function drawInitialState() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Fond noir initial (avant démarrage)

    drawFood(); // Dessiner la pomme
    drawSnake(); // Dessiner le serpent

    // Affichage du score
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Un petit Snake ? :)          ZQSD", 10, 30); // Afficher le score dans le coin supérieur gauche
}

// Fonction pour dessiner le serpent avec des carrés
function drawSnake() {
    ctx.fillStyle = "lime";
    snake.forEach((segment) => ctx.fillRect(segment.x, segment.y, box, box)); // Dessiner un carré pour chaque segment
}

// Fonction pour dessiner la pomme avec un cercle
function drawFood() {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(food.x + box / 2, food.y + box / 2, box / 2, 0, Math.PI * 2); // Dessiner un cercle pour la pomme
    ctx.fill();
}

// Fonction pour générer une nouvelle pomme, s'assurant qu'elle ne soit pas sur le serpent
function generateFood() {
    let newFood = { x: Math.floor(Math.random() * 15) * box, y: Math.floor(Math.random() * 15) * box };

    // Vérifie si la pomme est sur le serpent
    while (snake.some(s => s.x === newFood.x && s.y === newFood.y)) {
        newFood = { x: Math.floor(Math.random() * 15) * box, y: Math.floor(Math.random() * 15) * box };
    }

    return newFood;
}

drawInitialState();

document.addEventListener("keydown", (event) => {
    if (!gameStarted) {
        gameStarted = true; // Le jeu commence après la première touche
        game = setInterval(draw, 100); // Démarre le jeu
    }

    // Empêche le défilement uniquement après le démarrage du jeu
    if (gameStarted) {
        event.preventDefault(); // Empêche le défilement
    }

    // Contrôles directionnels avec flèches et ZQSD
    if (event.key === "ArrowUp" || event.key === "z" || event.key === "Z" && direction !== "DOWN") direction = "UP";
    if (event.key === "ArrowDown" || event.key === "s" || event.key === "S" && direction !== "UP") direction = "DOWN";
    if (event.key === "ArrowLeft" || event.key === "q" || event.key === "Q" && direction !== "RIGHT") direction = "LEFT";
    if (event.key === "ArrowRight" || event.key === "d" || event.key === "D" && direction !== "LEFT") direction = "RIGHT";
});

function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Fond noir qui s'affiche à chaque rafraîchissement

    drawFood(); // Dessiner la pomme
    drawSnake(); // Dessiner le serpent

    let head = { ...snake[0] };
    if (direction === "UP") head.y -= box;
    if (direction === "DOWN") head.y += box;
    if (direction === "LEFT") head.x -= box;
    if (direction === "RIGHT") head.x += box;

    // Logic for wall wrapping (snake crosses the walls)
    if (head.x >= canvas.width) head.x = 0; // Right to left
    if (head.x < 0) head.x = canvas.width - box; // Left to right
    if (head.y >= canvas.height) head.y = 0; // Bottom to top
    if (head.y < 0) head.y = canvas.height - box; // Top to bottom
    
    if (head.x === food.x && head.y === food.y) {
        food = generateFood(); // Générer une nouvelle pomme
        score++; // Incrémenter le score quand le serpent mange une pomme
    } else {
        snake.pop();
    }

    if (snake.some(s => s.x === head.x && s.y === head.y)) {
        clearInterval(game);
        alert("Oupsi ! Aller encore un petit tour ? Ton score est quand même de " + score);
        location.reload();
    }

    snake.unshift(head);

    // Affichage du score mis à jour
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText(score, 10, 30); // Met à jour le score
}
