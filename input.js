const modifier = (text) => {
  for(module of modules) if(module.process) module.process("input")
  for(module of modules) if(module.consume && module.consume(text)) return {text: "", stop: true}
  let modifiedText = text
  for(module of modules) if(module.input) modifiedText = module.input(modifiedText)
  return { text: modifiedText }
}

// Don't modify this part
modifier(text)