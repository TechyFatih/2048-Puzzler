// Wait till the browser is ready to render the game (avoids glitches)
window.requestAnimationFrame(function () {
  gameManager = new GameManager(levels[0], KeyboardInputManager, HTMLActuator, LocalStorageManager);
});