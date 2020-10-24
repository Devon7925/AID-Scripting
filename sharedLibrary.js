let settings = {

}

let modules = [
  {name:"modules",init:function(){state.modules.initialized = true; state.modules.contextIsContinue = true}},
]

const version = "0.1.4"
const breakVersion = "0.1.0"

function versionGreater(version1, version2){
  const split1 = version1.split(".")
  const split2 = version2.split(".")
  for(let i = 0; i <= 3; i++){
    if(Number(split1[i])>Number(split2[i])) return true
    if(Number(split1[i])<Number(split2[i])) return false
  }
  return false
}

function error(errorText){
  state.message += '\n' + errorText;
  console.log(errorText)
  state.modules.errored = true;
}

function checkRequirements(module){
  if(module.requirements) for(requirement of module.requirements) {
    let requirementFufilled = false
    if(typeof requirement === "string" && requirement.startsWith("#")){
      let tag = requirement.substring(1)
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

function uniqBy(a, key) {
    var seen = {};
    return a.filter(function(item) {
        var k = key(item);
        return seen.hasOwnProperty(k) ? false : (seen[k] = true);
    })
}

function calculateOrder(){
  for(module of modules) if(module.order) for(orderElem of module.order){
      let inScript = false
      for(module2 of modules) if(orderElem.name === module2.name) inScript = true
      if(!inScript) module.order.splice(module.order.indexOf(orderElem), 1)
    }
    
  for(module of modules) if(module.order) for(orderElem of module.order){
      if(orderElem.location === "after"){
        for(module2 of modules) if(orderElem.name === module2.name) {
          if(!module2.order) module2.order = []
          module2.order.push({name:module.name,location:"before"})
        }
        module.order.splice(module.order.indexOf(orderElem), 1)
      }
    }
  for(module of modules) if(module.order) module.order = uniqBy(module.order, JSON.stringify)
  for(module of modules) module.level = 0
  
  let settled = true
  let maxLevel = 0;
  do {
    settled = true
    for(module of modules) if(module.order) for(orderElem of module.order) for(module2 of modules) if(module2.name === orderElem.name){
      if(module2.level >= module.level){
        module.level = module2.level + 1
        if(module.level > maxLevel) maxLevel = module.level
        settled = false
      }
    }
    
  }while(!settled)
  
  state.modules.order = []
  for(let level = 0; level <= maxLevel; level++){
    for(module of modules) if(module.level == level && module.onEnd === false) state.modules.order.push(modules.indexOf(module))
    for(module of modules) if(module.level == level && module.onEnd === undefined) state.modules.order.push(modules.indexOf(module))
    for(module of modules) if(module.level == level && module.onEnd === true) state.modules.order.push(modules.indexOf(module))
  }
}

// initialize state.module_name and settings.module_name for you
for(module of modules) if(state[module.name] === undefined) state[module.name] = {}
for(module of modules) if(settings[module.name] === undefined && module.settings) settings[module.name] = []

if(!state.modules.initialized){
  const keyList = ["name","tags","requirements","incompatibles","order","onEnd","init","functions","consume","queryContext","getQuery","input","output","context","process","settings","info","version","minVersion"]
  for(module of modules) if(module.version && versionGreater(breakVersion, module.version)) error("There has been a breaking change since module " + module.name + " was developed")
  for(module of modules) if(module.minVersion && versionGreater(module.minVersion, version)) error("Your module version is too out of date for " + module.name + ", please update")
  
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
  calculateOrder()
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
  for(i of state.modules.order) if(modules[i].init) modules[i].init()
}

if (!state.message){
  state.message = ""
}
state.memory.context = memory
state.memory.frontMemory = ""
state.memory.authorsNote = ""
