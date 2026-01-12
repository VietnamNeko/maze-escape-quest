const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game configuration
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;

// Player configuration
const PLAYER_SPEED = 4;
const PLAYER_WIDTH = 40;
const PLAYER_HEIGHT = 40;

// Game state
const gameState = {
  score: 0,
  gameOver: false
};

// Player object
const player = {
  x: GAME_WIDTH / 2 - PLAYER_WIDTH / 2,
  y: GAME_HEIGHT / 2 - PLAYER_HEIGHT / 2,
  width: PLAYER_WIDTH,
  height: PLAYER_HEIGHT,
  color: '#4CAF50'
};

// Input handling
const keys = {};
window.addEventListener('keydown', (e) => keys[e.code] = true);
window.addEventListener('keyup', (e) => keys[e.code] = false);

// Wall borders configuration
const BORDER_WIDTH = 20;
const walls = [
  { x: 0, y: 0, width: GAME_WIDTH, height: BORDER_WIDTH }, // Top wall
  { x: 0, y: GAME_HEIGHT - BORDER_WIDTH, width: GAME_WIDTH, height: BORDER_WIDTH }, // Bottom wall
  { x: 0, y: 0, width: BORDER_WIDTH, height: GAME_HEIGHT }, // Left wall
  { x: GAME_WIDTH - BORDER_WIDTH, y: 0, width: BORDER_WIDTH, height: GAME_HEIGHT } // Right wall
];

function checkCollision(rect1, rect2) {
  return rect1.x < rect2.x + rect2.width &&
         rect1.x + rect1.width > rect2.x &&
         rect1.y < rect2.y + rect2.height &&
         rect1.y + rect1.height > rect2.y;
}

function movePlayer() {
  let newX = player.x;
  let newY = player.y;

  if (keys['ArrowLeft']) newX -= PLAYER_SPEED;
  if (keys['ArrowRight']) newX += PLAYER_SPEED;
  if (keys['ArrowUp']) newY -= PLAYER_SPEED;
  if (keys['ArrowDown']) newY += PLAYER_SPEED;

  // Temporary player with new position for collision checking
  const potentialPlayer = { ...player, x: newX, y: newY };

  // Check collision with walls
  const collidedWall = walls.find(wall => checkCollision(potentialPlayer, wall));

  // Update player position only if no collision
  if (!collidedWall) {
    player.x = newX;
    player.y = newY;
  }
}

// Game loop
let lastTime = 0;
function gameLoop(timestamp) {
  const deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  update(deltaTime);
  render();

  requestAnimationFrame(gameLoop);
}

function update(deltaTime) {
  if (gameState.gameOver) return;
  movePlayer();
}

function render() {
  // Clear canvas
  ctx.fillStyle = '#1a1a2e';
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  // Draw walls
  ctx.fillStyle = '#888';
  walls.forEach(wall => {
    ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
  });

  // Draw player
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);

  // Draw score
  ctx.fillStyle = '#fff';
  ctx.font = '20px Arial';
  ctx.fillText('Score: ' + gameState.score, 10, 30);
}

// Start the game
requestAnimationFrame(gameLoop);
}
</parameter>
</invoke>