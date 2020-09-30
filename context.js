const modifier = (text) => {
  if(state.modules.contextIsContinue){
    if(state.modules.addToOut === undefined) state.modules.addToOut = ""
    
    for(module of modules) if(module.process) module.process("input")
    
    
    let modifiedText = ""
    for(module of modules) if(module.consume && module.consume(modifiedText)) {
      state.modules.contextIsContinue = true
      state.modules.addToOut += state.modules.forceOutput
      return {text, stop: true}
    }
    
    for(module of modules) if(module.input) modifiedText = module.input(modifedText)
    state.modules.addToOut += modifedText
    
    state.message = ""
    state.memory.context = memory
    state.memory.frontMemory = ""
  }
  for(module of modules) if(module.process) module.process("context")
  let modifiedText = text
  for(module of modules) if(module.context) modifiedText = module.context(modifiedText)
  return { text: modifiedText }
}

// Don't modify this part
modifier(text)