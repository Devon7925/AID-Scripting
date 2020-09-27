# Settings
```js
let settings = {//Settings are for script configuration by script users ex. setting prefix for commands
	example: {//use own area for settings to prevent incomptibility
		
	}
}
```
# Module
Modules should appear inside the square brackets ([]) after `let modules = `

Module Example:
```js
{
	name: "Example", // Only required value
	requirements: [ //Will create error in state.message and log if required modules are not included
		"Example 2",
		{
			name: "Example 3",
			url: "github.com/example/example3" //Allow linking to module in error
		}
	],
	order: [ //Allows enforcing a order relative to other modules note these modules don't have to be requirements
		{
			name: "Example 3",
			location: "before" //Example 3 before Example, not the other way around
		}
	],
	onEnd: true, //Allows encouraging module to be activated later, or earlier if false, is ignored if any modules in order exist
	init: function(){
		state.example.something = "something" //always use substate variable to prevent conflicts
	}, //Called on first script activation
	consume: function(input){}, //Can return true, if it does input and output will be made empty and input scripts won't run. If it returns false, it shouldn't do anything
	input: function(input){}, //Processes input
	output: function(output){}, //Processes output
	context: function(context){}, //Processes context
	process: function(type){} //Runs on all script activations. type can be "input", "output", or "context"
}
```