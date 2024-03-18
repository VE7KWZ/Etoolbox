// **********************************************************************************************************
// Reactance Calculator [reactance_calc.htm]
// **********************************************************************************************************

function reactance_calc () {
	console.log("Reactance Calculator");
	
	var component = Number(document.getElementById("component").value);		// Component Inductor/Capacitor
	var comp_value = fsi2num(document.getElementById("comp_value").value);	// Component Value
	var frequency = fsi2num(document.getElementById("frequency").value);		// Frequency
	var reactance = fsi2num(document.getElementById("reactance").value);		// Component reactance
	
	var opt = 0;
	if (comp_value <= 0 && frequency <= 0 && reactance <= 0) { opt = 0; }
	if (comp_value > 0 && frequency > 0 && reactance <= 0)   { opt = 1; } // Component and Frequency Provided
	if (comp_value <= 0 && frequency > 0 && reactance > 0)   { opt = 2; } // Reactance and Frequency Provided
	if (comp_value > 0 && frequency <= 0 && reactance > 0)   { opt = 3; } // Component and Reactance Provided
	
	console.log([opt, component]);
	
	switch(opt) {
		case 0:
			// No Inputs
			break;
		case 1:
			// Calculate Reactance
			if (component == 0) { reactance = 1/(2*Math.PI*frequency*comp_value); }
			if (component == 1) { reactance = 2*Math.PI*frequency*comp_value; }
			
			document.getElementById("reactance").value = fnum2si(reactance, 3);
			break;
		case 2:
			// Calculate Component Value
			if (component == 0) { comp_value = 1/(2*Math.PI*frequency*reactance); }
			if (component == 1) { comp_value = reactance/(2*Math.PI*frequency); }
			
			document.getElementById("comp_value").value = fnum2si(comp_value, 3);
			break;
		case 3:
			// Calculate Frequency
			if (component == 0) { frequency = 1/(2*Math.PI*reactance*comp_value); }
			if (component == 1) { frequency = reactance/(2*Math.PI*comp_value); }
			
			document.getElementById("frequency").value = fnum2si(frequency, 3);
			break;
	}
	
	
}