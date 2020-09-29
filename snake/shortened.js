{name:"snake",init:function(){state.snake.board=[];for(let e=0;e<settings.snake.size;e++){state.snake.board.push([]);for(let s=0;s<settings.snake.size;s++)state.snake.board[e].push(0)}state.snake.snakeX=settings.snake.size/2,state.snake.snakeY=settings.snake.size/2,state.snake.snakeLength=1,state.snake.board[state.snake.snakeY][state.snake.snakeX]=state.snake.snakeLength,functions.snake.generateApple(),state.snake.lastTime=(new Date).getTime(),state.snake.direction=1},functions:{stepSnake:function(){if(0==state.snake.direction&&state.snake.snakeY--,1==state.snake.direction&&state.snake.snakeX++,2==state.snake.direction&&state.snake.snakeY++,3==state.snake.direction&&state.snake.snakeX--,state.snake.snakeX<0||state.snake.snakeY<0)return!0;if(state.snake.snakeX>=settings.snake.size||state.snake.snakeY>=settings.snake.size)return!0;if(state.snake.board[state.snake.snakeY][state.snake.snakeX]>0)return!0;for(let e=0;e<settings.snake.size;e++)for(let s=0;s<settings.snake.size;s++)state.snake.board[e][s]>0&&state.snake.board[e][s]--;return-1===state.snake.board[state.snake.snakeY][state.snake.snakeX]&&(state.snake.snakeLength++,functions.snake.generateApple()),state.snake.board[state.snake.snakeY][state.snake.snakeX]=state.snake.snakeLength,!1},render:function(){let e="===================\n";for(let s=0;s<settings.snake.size;s++){for(let t=0;t<settings.snake.size;t++)state.snake.board[s][t]>0?e+="█":-1===state.snake.board[s][t]?e+="▚":e+="░";e+="\n"}return e},generateApple:function(){let e=0;for(let s=0;s<settings.snake.size;s++)for(let t=0;t<settings.snake.size;t++)0===state.snake.board[s][t]&&e++;let s=Math.trunc(Math.random()*e);for(let e=0;e<settings.snake.size;e++)for(let t=0;t<settings.snake.size;t++)0===state.snake.board[e][t]&&(0===s&&(state.snake.board[e][t]=-1),s--)}},consume:function(e){for(let e=0;e<((new Date).getTime()-state.snake.lastTime)/settings.snake.msPerTurn;e++)if(functions.snake.stepSnake()||state.snake.death)return state.message="You failed!",state.snake.death=!0,!0;return"w"===(e=(e=e.replace(/[^wasd]/g,"")).charAt(e.length-1))&&(state.snake.direction=0),"d"===e&&(state.snake.direction=1),"s"===e&&(state.snake.direction=2),"a"===e&&(state.snake.direction=3),state.snake.lastTime=(new Date).getTime(),state.modules.forceOutput=functions.snake.render(),state.message=state.modules.forceOutput,!0},settings:[{name:"size",default:10},{name:"msPerTurn",default:2e3}]},