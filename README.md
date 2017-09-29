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
### HTML Canvas Tutorial
[HTML Canvas Tutorial](https://www.w3schools.com/graphics/canvas_intro.asp) - Really helped by explaining the fundamentals of how Canvas worked, and building basic shapes.
### No Tears Guide to HTML5 Games
[No Tears Guide to HTML5 Games](https://www.html5rocks.com/en/tutorials/canvas/notearsgame/) - Collision detection!! Also, this resource gave a great blueprint on creating player bullets with a constructor, and how to position them onto the player object. This helped a ton with asteroid creation later on, because I was able to use the Beam constructor as a blueprint for the Asteroid constructor.
### HTML5 Canvas Game: Panning a Background
[HTML5 Canvas Game: Panning a Background](http://blog.sklambert.com/html5-canvas-game-panning-a-background/) - This source introduced to concept of layering multiple Canvas' to better control what is happening each frame.
### CSS Tutorial
[CSS Tutorial](https://www.w3schools.com/css/default.asp) - W3 Schools really helped anytime I couldn't remember how to do an animation, or syntax for using CSS.
### Previous GA Graduate - Brian Ridge
[Brians GitHub](https://github.com/briandridge) - Zeb recommended that I reach out to Brian, as he did a similar project during WDI's second cohort. Brian was very helpful, and gave me recommendations on where to look when I was hitting a wall while getting started.

## Challenges
### Breaking Asteroids into Three New Asteroids Upon Beam Collision
I was unable to create a function where current asteroids would break up into 3 new asteroids. I think this would be possible by creating a extension on the asteroid.destroy() function, and having it create another small asteroid that has a xVelocity in a different direction using the Asteroid constructor.
### Player Rotation and Firing in the Direction the Player is Facing
I was unable to get the player to fire in the direction it was facing, which led to the top down style game I produced in the end. I was able to adjust the xVelocity to a different direction in javascript, but unable to make it work with keyboard controls.

## What I Would Do Different
### Take More Time to Research
I did not do enough research into what it would take to create a game on Canvas, and this led to a lot of research during the beginning of the game on how to use it. I feel if I had researched more what it would take to learn how to use it, I would have allocated my time differently.
### Plan!!!
Doing more research initially, I feel I could plan out what steps to take to build the game better. Also, planning more to finish the requirements before adding features would have saved me a lot of time from building games and them scrapping them and starting over.
