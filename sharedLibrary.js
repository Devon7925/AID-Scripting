let settings = {

}

let modules = [
  {name:"modules",init:function(){state.modules.initialized = true; state.modules.contextIsContinue = true}},
]

function error(errorText){
  state.message += '\n' + errorText;
  console.log(errorText)
  state.modules.errored = true;
}

function checkRequirements(module){
  if(module.requirements) for(requirement of module.requirements) {
    let requirementFufilled = false
    if((requirement.name && requirement.name.startsWith("#")) || requirement.startsWith("#")){
      let tag = (requirement.name?requirement.name:requirement).substring(1)
      for(module2 of modules) if(module2 !== module && module2.tags) for(tag2 of module2.tags){
        if(tag === tag2) requirementFufilled = true
      }
    }else{
      for(module2 of modules) {
        if(requirement === module2.name){
          requirementFufilled = true
        }else if(requirement.name && requirement.name === module2.name){
          requirementFufilled = true
        }
      }
    }
    if(!requirementFufilled){
      let errorText = "requirement " + (requirement.name?requirement.name:requirement) + " is unsatisfied"
      if(requirement.url) errorText += ", but it can be found at " + requirement.url
      error(errorText)
    }
  }
}

function checkIncompatibilities(module){
  if(module.incompatibles) for(incompatible of module.incompatibles) {
    let incompatibility = false
    if(incompatible.startsWith("#")){
      let tag = incompatible.substring(1)
      for(module2 of modules) if(module2 !== module && module2.tags) for(tag2 of module2.tags){
        if(tag === tag2) incompatibility = true
      }
    }else{
      for(module2 of modules) {
        if(incompatible === module2.name) incompatibility = true
      }
    }
    if(incompatibility){
      error("module " + module.name + " is incompatible with " + incompatible)
    }
  }
}

// initialize state.module_name for you
for(module of modules) if(state[module.name] === undefined) state[module.name] = {}
for(module of modules) if(settings[module.name] === undefined && module.settings) settings[module.name] = []

if(!state.modules.initialized){
  const keyList = ["name","tags","requirements","incompatibles","order","onEnd","init","functions","consume","input","output","context","process","settings","info","metadatax"]
  for(module of modules) {
    for(module2 of modules) if(module.name === module2.name && module !== module2){
      error('Two modules cannot have the same name but there are multiple modules with the name "' + module.name + '"')
      break
    }
    for(var key in module){
      if(!keyList.includes(key)) error("Property " + key + " in module " + module.name + " is not valid in the current schema")
    }
    checkRequirements(module)
    checkIncompatibilities(module)
    if(module.settings) for(setting of module.settings) {
      if(settings[module.name][setting.name] === undefined){
        if(setting.default === undefined){
          error('Setting ' + setting.name + ' is required because it does not have a default value, but it is not included')
        }
      }
    }
  }
}

for(module of modules) {
  if(module.settings) for(setting of module.settings) {
    if(settings[module.name][setting.name] === undefined){
      settings[module.name][setting.name] = setting.default
    }
  }
}

let functions = []
for(module of modules) {
  if(module.functions) functions[module.name] = module.functions
}

if(!state.modules.initialized){
  for(module of modules) if(module.init) module.init()
}

state.message = ""
state.memory.context = memory
state.memory.frontMemory = ""