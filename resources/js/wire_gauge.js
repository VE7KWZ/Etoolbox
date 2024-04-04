// **********************************************************************************************************
// Wire Gauge Calculator [wire_gauge.htm]
// **********************************************************************************************************
function wire_gauge (){

	// Clear output box
	document.getElementById("output").value = '';
	
	var value = Number(document.getElementById("input_value").value);	// Input value
	var unit = Number(document.getElementById("unit").value);	// unit select
	
	switch(unit) {
		case 0:
		// Diameter in mm provided
		d_mm = value;
		d_in = d_mm / 25.4;
		
		a_mm = Math.PI*(d_mm/2)**2;		// Area in mm^2
		a_in = Math.PI*(d_in/2)**2;		// Area in in^2
		cmil = (d_in*1000)**2;			// Circular Mils
		awg = -39*(Math.log(d_mm/0.127)/Math.log(92)) + 36; // d_mm to awg
		
		break;
	case 1:
		// Diameter in inches provided
		d_in = value;
		d_mm = d_in * 25.4;		
		
		a_in = Math.PI*(d_in/2)**2;		// Area in in^2
		a_mm = Math.PI*(d_mm/2)**2;		// Area in mm^2
		cmil = (d_in*1000)**2;			// Circular Mils
		awg = -39*(Math.log(d_mm/0.127)/Math.log(92)) + 36; // d_mm to awg
		cmil = (5*(92**((36-awg)/39)))**2;		// awg to cmil
		
		
		break;
	case 2:
		// AWG provided
		awg = value;
		d_mm = 0.127*(92**((36-awg)/39));
		d_in = d_mm / 25.4;
		
		a_mm = Math.PI*(d_mm/2)**2;	// Area in mm^2
		a_in = Math.PI*(d_in/2)**2;	// Area in in^2
		cmil = (d_in*1000)**2;		// Circular Mils
		
		break;
	case 3:
		// CMIL provided
		cmil = value;
		d_in = Math.sqrt(cmil)/1000;
		d_mm = d_in * 25.4;		
		
		a_in = Math.PI*(d_in/2)**2;		// Area in in^2
		a_mm = Math.PI*(d_mm/2)**2;		// Area in mm^2
		cmil = (d_in*1000)**2;			// Circular Mils
		awg = -39*(Math.log(d_mm/0.127)/Math.log(92)) + 36; // d_mm to awg
		
		break;
	}
	
	
	// Get closest AWG value and subsequent measurements
	c_awg = Math.round(awg);
	c_d_mm = 0.127*(92**((36-c_awg)/39));
	c_d_in = c_d_mm / 25.4;
	c_a_mm = Math.PI*(c_d_mm/2)**2;	// Area in mm^2
	c_a_in = Math.PI*(c_d_in/2)**2;	// Area in in^2
	c_cmil = (c_d_in*1000)**2;		// Circular Mils
	
	
	var result = "";
	result += fstring("AWG : {1}\nCMIL: {2}\nDiam: {3} mm ({4} in)\nArea: {5} mm2 ({6} in2)",
					fnum(awg,2), fnum(cmil,3), fnum(d_mm,6,true), fnum(d_in,6,true), fnum(a_mm,6,true), fnum(a_in,6,true)
					);
	
	if (unit !== 2) {
		result += "\n\nClosest AWG Value\n";
		result += fstring("AWG : {1}\nCMIL: {2}\nDiam: {3} mm ({4} in)\nArea: {5} mm2 ({6} in2)\n",
						fnum(c_awg,2), fnum(c_cmil,3), fnum(c_d_mm,6,true), fnum(c_d_in,6,true), fnum(c_a_mm,6,true), fnum(c_a_in,6,true)
						);
	}
	
	// Number of rows for output
	document.getElementById("output").rows = result.split(/\r\n|\r|\n/).length;
	
	// Print result
	document.getElementById("output").value = result;
	
}


