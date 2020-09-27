const modifier = (text) => {
  for(module of modules) if(module.process) module.process("input")
  for(module of modules) if(module.consume && module.consume(text)){
    state.modules.consume = true
    return {text: ""}
  } 
  let modifiedText = text
  for(module of modules) if(module.input) modifiedText = module.input(modifiedText)
  return { text: modifiedText }
}

// Don't modify this part
modifier(text)