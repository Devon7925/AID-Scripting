const modifier = (text) => {
  for(module of modules) if(module.process) module.process("input")
  
  state.modules.forceOutput = ""
  for(module of modules) if(module.consume && module.consume(text)) {
    state.modules.contextIsContinue = true
    if(state.modules.addToOut){
      state.modules.forceOutput = state.modules.addToOut + state.modules.forceOutput;
      delete state.modules.addToOut
    }
    return {text: state.modules.forceOutput, stop: true}
  }
  
  let modifiedText = text
  for(module of modules) if(module.input) modifiedText = module.input(modifiedText)
  state.modules.contextIsContinue = false
  if(state.modules.addToOut){
    modifiedText = state.modules.addToOut + modifiedText;
    delete state.modules.addToOut
  }
  return { text: modifiedText }
}

// Don't modify this part
modifier(text)