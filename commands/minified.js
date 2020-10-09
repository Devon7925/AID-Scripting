{name:"commands",init:function(){state.commands.commandList={}},consume:function(input){if(input.startsWith(settings.commands.prefix)){const args=text.slice(settings.commands.prefix.length).split(/ +/);const commandName=args.shift();if(!(commandName in state.commands.commandList)){state.message+="Invalid Command!";return true}const command=state.commands.commandList[commandName];if(command.args&&!args.length){let reply=`You didn't provide any arguments!\n`;if(command.usage){reply+=`Example: \`${settings.commands.prefix }${command.name } ${command.usage }\``}state.message+=reply;return true}try{functions[command.module][command.name](args)}catch(error){state.message=`There was an error!\n${ error }`}return true}return false},settings:[{name:"prefix"}],info:{code:"https://github.com/Devon7925/AID-Scripting/tree/master/commands",description:"An module that allows other modules to add commands"},version:"0.1.1",minVersion:"0.1.0"},