# Settings
```js
let settings = {//Settings are for script configuration by script users ex. setting prefix for commands
	example: {//use own area for settings to prevent incomptibility
		"required":6
	}
}
```
# Module
Modules should appear inside the square brackets ([]) after `let modules = `

Module Example:
```js
{
	name: "Example", // Only required value`
	tags: ["example"]
	requirements: [ //Will create error in state.message and log if required modules are not included
		"Example 2",
		{
			name: "Example 3",
			url: "github.com/example/example3" //Allow linking to module in error
		},
		"#ExampleTag"
	],
	incompatibles: ["example3","#example"],
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
	functions: {//provides functions that can be accessed for utility
		exFunc: function(){}
	},
	consume: function(input){}, //Can return true, if it does input and output will be made empty and input scripts won't run. If it returns false, it shouldn't do anything
	input: function(input){}, //Processes input
	output: function(output){}, //Processes output
	context: function(context){}, //Processes context
	process: function(type){}, //Runs on all script activations. type can be "input", "output", or "context"
	settings: [{name:"ex", default:5},{name:"required"}], //settings without a default are required and will throw an error if not included
	info: {
		code: "https://github.com/Devon7925/AID-Scripting",
		description: "An example script to show off the capabilities of modules" // doesn't do anything on its own, but can be used by other scripts
	},
	version: "0.1.0", //the highest version the module is known to work on
	minVersion: "0.1.0" //the minimum version the module was tested on
}
```