{
  name: "snake",
  tags: ["game"],
  incompatibles: ["#game"],
  init: function(){
    state.snake.board = []
    for(let y = 0; y < settings.snake.size; y++){
      state.snake.board.push([])
      for(let x = 0; x < settings.snake.size; x++){
        state.snake.board[y].push(0)
      }
    }
    state.snake.snakeX = settings.snake.size/2
    state.snake.snakeY = settings.snake.size/2
    state.snake.snakeLength = 1
    state.snake.board[state.snake.snakeY][state.snake.snakeX] = state.snake.snakeLength
    functions["snake"].generateApple()
    state.snake.lastTime = Math.trunc(new Date().getTime()/settings.snake.msPerTurn)
    state.snake.direction = 1
  },
  functions: {
    stepSnake: function(){
      if(state.snake.direction == 0) state.snake.snakeY--
      if(state.snake.direction == 1) state.snake.snakeX++
      if(state.snake.direction == 2) state.snake.snakeY++
      if(state.snake.direction == 3) state.snake.snakeX--
      if(state.snake.snakeX < 0 || state.snake.snakeY < 0) return true
      if(state.snake.snakeX >= settings.snake.size || state.snake.snakeY >= settings.snake.size) return true
      if(state.snake.board[state.snake.snakeY][state.snake.snakeX] > 0) return true
      for(let y = 0; y < settings.snake.size; y++){
        for(let x = 0; x < settings.snake.size; x++){
          if(state.snake.board[y][x] > 0) state.snake.board[y][x]--
        }
      }
      if(state.snake.board[state.snake.snakeY][state.snake.snakeX] === -1) {
        state.snake.snakeLength++
        functions["snake"].generateApple()
      }
      state.snake.board[state.snake.snakeY][state.snake.snakeX] = state.snake.snakeLength
      return false
    },
    render: function(){
      let text = ""
      for(let y = 0; y < settings.snake.size; y++){
        for(let x = 0; x < settings.snake.size; x++){
          if(state.snake.board[y][x] > 0) text += "█"
          else if(state.snake.board[y][x] === -1) text += "▚"
          else text += "░"
        }
        text += "\n"
      }
      return text
    },
    generateApple: function(){
      let zeroTileCount = 0
      for(let y = 0; y < settings.snake.size; y++)
        for(let x = 0; x < settings.snake.size; x++)
          if(state.snake.board[y][x] === 0) zeroTileCount++
      let appleTileIndex = Math.trunc(Math.random()*zeroTileCount)
      for(let y = 0; y < settings.snake.size; y++)
        for(let x = 0; x < settings.snake.size; x++)
          if(state.snake.board[y][x] === 0) {
            if(appleTileIndex === 0) state.snake.board[y][x] = -1
            appleTileIndex--
          }
    }
  },
  consume: function(input){
    let time = Math.trunc(new Date().getTime()/settings.snake.msPerTurn)
    if(time > state.snake.lastTime)
      for(let t = 0; t < time-state.snake.lastTime; t++) if(functions["snake"].stepSnake() || state.snake.death){
        state.message = "You failed!"
        state.snake.death = true
        return true
      }
    input = input.replace(/[^wasd]/g, "")
    input = input.charAt(input.length-1)
    if(input === "w") state.snake.direction = 0
    if(input === "d") state.snake.direction = 1
    if(input === "s") state.snake.direction = 2
    if(input === "a") state.snake.direction = 3
    state.snake.lastTime = time
    let render = functions["snake"].render()
    state.modules.forceOutput = "===================\n" + render
    state.message += render
    state.message += "Score: "+state.snake.snakeLength
    return true;
  },
  settings: [{name:"size",default:10},{name:"msPerTurn",default:2000}],
	info: {
		code: "https://github.com/Devon7925/AID-Scripting/snake",
		description: "A script that turns AI dungeon into snake"
	},
	version: "0.1.0",
	minVersion: "0.1.0"
},