let settings = {

}

let modules = [
  {name:"modules",init:function(){state.modules.initialized = true;}},
]

function error(errorText){
  state.message += '\n' + errorText;
  console.log(errorText)
  state.modules.errored = true;
}

state.message = ""
state.memory.context = memory
state.memory.frontMemory = ""

// initialize state.module_name for you
for(module of modules) if(state[module.name] === undefined) state[module.name] = {}

if(!state.modules.initialized){
  for(module of modules) {
    for(module2 of modules) if(module.name === module2.name && module !== module2){
      error('Two modules cannot have the same name but there are multiple modules with the name "' + module.name + '"')
      break
    }
    if(module.requirements) for(requirement of module.requirements) {
      let requirementFufilled = false
      for(module2 of modules) {
        if(requirement === module2.name){
          requirementFufilled = true
        }else if(requirement.name && requirement.name === module2.name){
          requirementFufilled = true
        }
      }
      if(!requirementFufilled){
        let errorText = "requirement " + (requirement.name?requirement.name:requirement) + " is unsatisfied"
        if(requirement.url) errorText += ", but it can be found at " + requirement.url
        error(errorText)
      }
    }
  }
  // init
  for(module of modules) if(module.init) module.init()
}