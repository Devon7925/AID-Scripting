{
    name:"commands",
    init:function(){
      state.commands.commandList = {}
    },
    consume:function(input){
      if (input.startsWith(settings.commands.prefix)) {
        const args = text.slice(settings.commands.prefix.length).split(/ +/); // Create a list of the words provided.
        const commandName = args.shift(); // Fetch and remove the actual command from the list.
        if (!(commandName in state.commands.commandList)) {state.message += "Invalid Command!"; return true;} // Command is not in the list, lets exist early.
        const command = state.commands.commandList[commandName];
        
        if (command.args && !args.length) {//If the command expects to be passed arguments, but none are present then
          let reply = `You didn't provide any arguments!\n`
          if (command.usage) {reply += `Example: \`${settings.commands.prefix}${command.name} ${command.usage}\``;} // Provide instructions for how to use the command if provided.
          state.message += reply;
          return true;
        }
        
        
        try{functions[command.module][command.name](args);}
        catch (error) {state.message = `There was an error!\n${error}`;}
        return true
      }
      return false
    },
    settings:[{name:"prefix"}],
    info: {
  		code: "https://github.com/Devon7925/AID-Scripting/commands",
  		description: "An module that allows other modules to add commands"
	  },
    version:"0.1.1",
    minVersion:"0.1.0"
  },