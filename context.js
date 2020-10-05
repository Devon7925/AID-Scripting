const modifier = (text) => {
  if(state.modules.contextIsContinue){
    if(state.modules.addToOut === undefined) state.modules.addToOut = ""
    
    for(i of state.modules.order) if(modules[i].process) modules[i].process("input")
    
    
    let modifiedText = ""
    for(i of state.modules.order) {
      let module = modules[i]
      if(module.consume && module.consume(modifiedText)) {
        state.modules.contextIsContinue = true
        state.modules.addToOut += state.modules.forceOutput
        return {text, stop: true}
      }
    }
    
    for(i of state.modules.order) if(modules[i].input) modifiedText = modules[i].input(modifedText)
    state.modules.addToOut += modifedText
    
    state.message = ""
    state.memory.context = memory
    state.memory.frontMemory = ""
  }
  for(i of state.modules.order) if(modules[i].process) modules[i].process("context")
  let modifiedText = text
  for(i of state.modules.order) if(modules[i].context) modifiedText = modules[i].context(modifiedText)
  return { text: modifiedText }
}

// Don't modify this part
modifier(text)