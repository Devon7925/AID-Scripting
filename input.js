const modifier = (text) => {
  state.message = ""

  for(i of state.modules.order) if(modules[i].process) modules[i].process("input")
  
  state.modules.forceOutput = ""
  state.modules.queryAI = false
  for(i of state.modules.order) {
    let module = modules[i]
    if(module.consume && module.consume(text)) {
      state.modules.contextIsContinue = true
      if(state.modules.addToOut){
        state.modules.forceOutput = state.modules.addToOut + state.modules.forceOutput;
        delete state.modules.addToOut
      }
      if(state.modules.queryAI) state.modules.queryModule = module.name
      if(state.memory.authorsNote === "") delete state.memory.authorsNote
      return {text: state.modules.forceOutput, stop: !state.modules.queryAI}
    }
  }
  
  let modifiedText = text
  for(i of state.modules.order) if(modules[i].input) modifiedText = modules[i].input(modifiedText)
  state.modules.contextIsContinue = false
  if(state.modules.addToOut){
    modifiedText = state.modules.addToOut + modifiedText;
    delete state.modules.addToOut
  }
  if(state.memory.authorsNote === "") delete state.memory.authorsNote
  return { text: modifiedText }
}

// Don't modify this part
modifier(text)

  
