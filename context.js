const modifier = (text) => {
  for(module of modules) if(module.process) module.process("context")
  let modifiedText = text
  for(module of modules) if(module.context) modifiedText = module.context(modifiedText)
  return { text: modifiedText }
}

// Don't modify this part
modifier(text)