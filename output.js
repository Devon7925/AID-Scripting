const modifier = (text) => {
  for(module of modules) if(module.process) module.process("output")
  let modifiedText = text
  for(module of modules) if(module.output) modifiedText = module.output(modifiedText)
  return { text: modifiedText }
}

// Don't modify this part
modifier(text)