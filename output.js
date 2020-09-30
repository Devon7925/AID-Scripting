const modifier = (text) => {
  for(module of modules) if(module.process) module.process("output")
  let modifiedText = text
  for(module of modules) if(module.output) modifiedText = module.output(modifiedText)
  state.modules.contextIsContinue = true
  if(state.modules.addToOut){
    modifiedText = state.modules.addToOut + modifiedText;
    delete state.modules.addToOut
  }
  return { text: modifiedText }
}

// Don't modify this part
modifier(text)