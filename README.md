## project-1
# Asteroid Game for WDI5 - Project 1

## Play the Game
[Asteroids.. Invaders? 2](https://jpleva91.github.io/project-1/index.html)
### Game Rules
Players submit names on landing page to be displayed during the game. Two players take turns firing beams to destroy incoming asteroids and score points. When a player is hit by an asteroid, their turn is over. First player to 100 points wins the game.

### Trello
[View my Trello board for this project](https://trello.com/b/t8GXIQ8G/wdi-project-1)

## Game Wireframes
### Game Start
![asteroid game wireframe](https://github.com/jpleva91/project-1/blob/master/wireframes/Game%20Start%20Layover.png)
### In Game
![asteroid game wireframe](https://github.com/jpleva91/project-1/blob/master/wireframes/In%20Game.png)
### Game Over
![asteroid game wireframe](https://github.com/jpleva91/project-1/blob/master/wireframes/Game%20Over.png)

## Technology
### Canvas
I chose canvas as the method to create the game. Canvas can draw different shapes and then change them every frame, kind of like a flip book.
One challenge I encountered was the game speed. Instead of using one Canvas to draw all of the game play on, it sped the game up a lot when I broke it up into 3 different layers.
### VanillaJS > JQuery
I started out using JQuery for this project, but decided to switch to VanillaJS early on due to my gamespeed issues.

## Sources
I leaned heavily on different resources while building this game.
[HTML Canvas Tutorial](https://www.w3schools.com/graphics/canvas_intro.asp) - Really helped by explaining the fundamentals of how Canvas worked, and building basic shapes.
[HTML5 Canvas Game: Panning a Background](http://blog.sklambert.com/html5-canvas-game-panning-a-background/) - This source introduced to concept of layering multiple Canvas' to better control what is happening each frame.
