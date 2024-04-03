// **********************************************************************************************************
// Frequency Wavelength Calculator [frequency_wavelength.htm]
// **********************************************************************************************************
function combination_calc (){
	console.log("Component Combination Calculator");
	
	// Clear output box
	document.getElementById("output").value = '';
	

	var input1 = fsi2num(document.getElementById("input1").value);		// Input with SI
	var input2 = Number(document.getElementById("input2").value);		// Select input
	var input3 = document.getElementById("input3").value;				// Input
	var input4 = document.getElementById("input4").checked;				// Checkbox checked
	
	
	const c = 299792458; // speed of light in vacuum
	
	v = c; 		// Default value for v is c
	
	vf = 1;		// velocity factor
	wf = 1; 	// wavelength factor: 1, 0.5, or 0.25 for full, half, and quarter wavelength
	
	
	slct = 0;
	if (only freq empty) { slct = 1; }
	if (only velocity empty) { slct = 2; }
	if (only wavelength empty) { slct = 3; }
	
	switch (slct) {
		case 1:	// Solve for frequency
		f = (v*vf)/l;
		break;
		case 2: // solve for velocity
		v = (f*l)/vf;
		break;
		case 3: // solve for wavelength
		l = (v*vf)/(f*wf);
		break;
	}
	
	result = "";
	result += fstring("");
	
	
	// Number of rows for output
	document.getElementById("output").rows = result.split(/\r\n|\r|\n/).length;
	
	// Print result
	document.getElementById("output").value = result;
	

}

function m2fracimperial(value) {
	val_in = value / 0.0254;
	val_ft = Math.floor(val_in/12);
	val_in -= val_ft*12;
	val_frac = val_in - Math.floor(val_in);
	val_in = Math.floor(val_in);
  
	val_frac = Math.round(val_frac*64)
  
	for (i = 6; i > 1; i--) {
		if ((val_frac/2)%1 !== 0) break;
		val_frac /= 2;
	}
  
	return val_ft + "ft " + val_in + " " + val_frac + "/" + 2**i + "in";
}
