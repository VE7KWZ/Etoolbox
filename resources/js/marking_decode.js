// **********************************************************************************************************
// Component Marking Decoder [component_decoder.htm]														*
// **********************************************************************************************************
function marking_decode() {
	console.log("Component Marking Decoder");
	
	// Timer
	console.time("Runtime");
	startTime = performance.now();
	
	// Clear output box
	document.getElementById("output").value = '';
	
	// Inputs
	var slct = Number(document.getElementById("select").value);			// SMD Resistor/Capacitor select
	var code = document.getElementById("input_val").value.toString();	// Code
	
	// Regex Filter/Match Test strings
	var R3digiteia = new RegExp("^[0-9]([R]|[0-9])[0-9]$");
	var R4digiteia = new RegExp("^[0-9](([0-9][R])|([R][0-9])|([0-9]{2}))[0-9]$");
	var Reia96 = new RegExp("^[0-9]{2}[A-FHRSXYZ]$");
	
	var C3digiteia = new RegExp("^[1-9](([R][0-9])|([0-9]{2}))$");
	var C4digiteia = new RegExp("^[1-9](([R][0-9])|([0-9]{2}))[BCDFGJKMZ]$");
	var Ceia198 = new RegExp("^[ABCDEFGHJKaLMNbPQdReSfTUmVWnXtYyZ][0-9]$");
	//code.match(RegExp("^([0-9][R][0-9])|([0-9]{3})$"));
	
	// Declare Variables
	var value; var type; var tolerance = "";
	
	console.log(slct);
	
	// Resistor or Capacitor code select
	switch (slct) {
		
		case 0:	// SMD Resistor
			
			// Test for 3, 4 digit EIA, or EIA-96 format
			if (R3digiteia.test(code)) {
				type = "3-Digit EIA";
				
				if ((RegExp("R")).test(code)) {
					value = Number(code.replace('R','.'));
				} else {
					value = Number(code[0] + code[1]) * (10**Number(code[2]));
				}
				
			}
			
			if (R4digiteia.test(code)) {
				type = "4-Digit EIA";
				
				if ((RegExp("R")).test(code)) {
					value = Number(code.replace('R','.'));
				} else {
					value = Number(code[0] + code[1] + code[2]) * (10**Number(code[3]));
				}
				
			}
			
			if (Reia96.test(code)) {
				type = "EIA-96";
				
				mval = [0, 1, 2, 3, 4, 5, 1, -2, -1, -1, -2, -3];
				
				value = eseries(96)[Number(code[0] + code[1])] * (10 ** (mval["ABCDEFHRSXYZ".indexOf(code[2])] + 2));
				
			}
			
			if (RegExp("^[0]{1,4}$").test(code)) {
				type = "Jumper/Bridge Resistor";
				value = 0;
			}
			
			break;
		
		
		case 1:	// SMD Capacitor
			
			// Test for 3, 4 digit EIA, or EIA-198 format
			if (C3digiteia.test(code) || C4digiteia.test(code)) {
				type = "3-Digit EIA";
				
				if ((RegExp("R")).test(code)) {
					value = (code[0] + code[1] + code[2]);
					value = Number(value.replace('R','.'));
				} else {
					value = Number(code[0] + code[1]) * (10**Number(code[2]));
				}
				
				value = value*(10 ** -12); // base value in pF
				
				
				if (C4digiteia.test(code)) {
					type = "4-Digit EIA";
					
					cval = ["0.1%", "0.25%", "0.5%", "1%", "2%", "5%", "10%", "20%", "+80% / -20%"];
					
					tolerance = cval["BCDFGJKMZ".indexOf(code[3])];
				}
				
			}
			
			
			if (Ceia198.test(code)) {
				type = "EIA-198";
				
				cval = [1.0,1.1,1.2,1.3,1.5,1.6,1.8,2.0,2.2,2.4,2.6,2.7,3.0,3.3,3.5,3.6,3.9,
						4.0,4.3,4.5,4.7,5.0,5.1,5.6,6.0,6.2,6.8,7.0,7.5,8.0,8.2,9.0,9.1];
				
				value = cval["ABCDEFGHJKaLMNbPQdReSfTUmVWnXtYyZ".indexOf(code[0])] * (10 ** Number(code[1]));
				value = value*(10 ** -12); // base value in pF
				
			}
			
			break;
		
	}
	
	console.log( [type, fnum2si(value), tolerance] );
	
	var result = fstring("Type:\t{1}\nValue:\t{2}", type, fnum2si(value));
	
	if (tolerance != "") {
		result += fstring("\nTol:\t{1}", tolerance);
	}
	
	// Number of rows for the output textarea
	document.getElementById("output").rows = result.split(/\r\n|\r|\n/).length;
	
	// Print result
	document.getElementById("output").value = result;
	
	// Calculation Time
	console.timeEnd("Runtime");
	document.getElementById("time").innerHTML = fstring("Time: {1}ms (approx)", fnum(performance.now()-startTime, 4));
	
}