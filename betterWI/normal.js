{
  name:"scriptedWI",
  functions:{
    commands:{
      ifCommand:(context,args)=>{
        if(functions.scriptedWI.conditions[args.condition.type](context,args.condition.args)) for(command of args.run) functions.scriptedWI.commands[command.type](context,command.args)
        else if(args.otherwise) for(command of args.otherwise) functions.scriptedWI.commands[command.type](context,command.args)
      },
      an:(context,args)=>{
        state.memory.authorsNote += args[0]
      },
      fm:(context,args)=>{
        state.memory.frontMemory += args[0]
      },
      memS:(context,args)=>{
        state.memory.context = state.memory.context + args[0]
      },
      memE:(context,args)=>{
        state.memory.context += args[0]
      }
    },
    conditions:{
      and:(context,args)=>{
        for(arg of args) if(!functions.scriptedWI.conditions[arg.type](context,arg.args)) return false
        return true
      },
      or:(context,args)=>{
        for(arg of args) if(functions.scriptedWI.conditions[arg.type](context,arg.args)) return true
        return false
      },
      not:(context,args)=>{
        for(arg of args) if(functions.scriptedWI.conditions[arg.type](context,arg.args)) return false
        return true
      },
      p:(context,args)=>{
        return Math.random() < parseFloat(args[0])
      },
      e:(context,args)=>{
        return context.slice(parseInt(args[1])).flatMap(elem => elem["text"]).join().includes(args[0])
      }
    }
  },
  input:(input)=>{
    let context = history
    context.push({type:"input",text:input,rawText:input})
    for(command of settings.scriptedWI.wi) functions.scriptedWI.commands[command.type](context,command.args)
    return text
  },
  context:(text)=>{},
  settings:[{name:"wi"}],
  info: {
    code: "https://github.com/Devon7925/AID-Scripting/tree/master/betterWI",
    description: "A script that adds scripting logic to WI"
  },
  version: "0.1.2",
  minVersion: "0.1.2"
},