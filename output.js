const modifier = (text) => {
  if(state.modules.queryAI) for(module of modules) if(module.name === state.modules.queryModule && module.getQuery) {
    state.modules.forceOutput = ""
    module.getQuery(text)
    if(state.memory.authorsNote === "") delete state.memory.authorsNote
    return state.modules.forceOutput
  }

  for(i of state.modules.order) if(modules[i].process) modules[i].process("output")
  let modifiedText = text
  for(i of state.modules.order) if(modules[i].output) modifiedText = modules[i].output(modifiedText)
  state.modules.contextIsContinue = true
  if(state.modules.addToOut){
    modifiedText = state.modules.addToOut + modifiedText;
    delete state.modules.addToOut
  }
  if(state.memory.authorsNote === "") delete state.memory.authorsNote
  return { text: modifiedText }
}

// Don't modify this part
modifier(text)