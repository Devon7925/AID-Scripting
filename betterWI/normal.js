{
    name:"betterWI",
    functions:[
      commands:[
        ifCommand:(context,args)=>{
          if(functions.betterWI.conditions[args.condition.type](context,args.condition.args)) for(command of args.run) functions.betterWI.commands[command.type](context,command.args)
          else if(args.otherwise) for(command of args.otherwise) functions.betterWI.commands[command.type](context,command.args)
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
      ],
      conditions:[
      ]
    ],
    input:(input)=>{},
    context:(text)=>{},
    settings:[{name:"wi"}]
  },