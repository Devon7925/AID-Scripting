{
    name:"basicCommands",
    requirements:[{name:"commands",url:"https://github.com/Devon7925/AID-Scripting/tree/master/commands"}],
    order:[{name:"commands",location:"before"}],
    init:function(){
      state.commands.commandList["listModules"] = {
        name:"listModules",
        description: "lists modules",
        args:false,
        module:"basicCommands"
      }
      state.commands.commandList["listCommands"] = {
        name:"listCommands",
        description: "lists the commands",
        args:false,
        module:"basicCommands"
      }
    },
    functions:{
      listModules: ()=>{
        for(module of modules) {
          let message = module.name
          if(module.info){
            if(module.info.description) message += " - " + module.info.description
            if(module.info.code) message += " (" + module.info.code + ")"
          }
          message += "\n"
          state.message += message
          console.log(message)
        }
      },
      listCommands: ()=>{
        for(commandName in state.commands.commandList) {
          let message = commandName
          let command = state.commands.commandList[commandName]
          if(command.description) message += " - " + command.description
          if(command.args) message += ", has arguments"
          else message += ", does not have any arguments"
          if(command.usage) message += "\nUsage - " + settings.commands.prefix + commandName + " " + command.usage + "\n"
          message += "\n"
          state.message += message
          console.log(message)
        }
      }
    },
    info:{
      description: "A module that adds commands to list the commands and list the modules",
      code: "https://github.com/Devon7925/AID-Scripting/tree/master/basicCommands"
    },
    version: "0.1.1",
    minVersion: "0.1.1"
  },