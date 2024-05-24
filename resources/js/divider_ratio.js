// **********************************************************************************************************
// Component Ratio/Resistor Divider Calculator [divider_calculator.htm]													*
// **********************************************************************************************************
function divider_ratio (){
	console.log("Component Ratio/Resistor Divider Calculator");
	
	// Timer
	console.time("Runtime");
	startTime = performance.now();
	
	// Clear output box
	document.getElementById("output").value = '';
	
	// Inputs
	var calc_type = Number(document.getElementById("calc_type").value);			// Calculation Type (0 Divider/1 Ratio)
	var ratio = document.getElementById("target_ratio").value;					// Target Ratio
	var series = Number(document.getElementById("series").value);				// Tolerance
	var num_outputs = Number(document.getElementById("num_outputs").value);		// Show More Combinations
	var setr = Number(document.getElementById("set_r").value);					// Set 0:R2 or 1:R1 option
	var setr_val = fsi2num(document.getElementById("setr_val").value);			// Set R2 Value
	
	if (ratio.includes("/")) {
		indx = ratio.indexOf("/");
		ratio = Number(ratio.substring(0, indx))/Number(ratio.substring(indx+1, ratio.length));
	} else {
		ratio = Number(ratio);
	}
	
	
	var E = eseries(series);
	
	// Invert ratio if greater than 1
	var inverted = false;
	if (ratio > 1) { 
		inverted = true;
		ratio = 1/ratio;
	}
	
	if (num_outputs > 50) { num_outputs = 50; }
	if (num_outputs < 1) { num_outputs = 1; }
	
	// Based on how small the ratio is, adjust values accordingly
	var degree = Math.floor(-1*Math.log10(ratio));
	
	
	var mult = 100;	 // Base value multiplier
	
	// If R2 value provided, get base value and degree
	if (!(setr_val == "" || setr_val == null)) {
		var setr_degree = Math.floor(Math.log10(setr_val));
		var setr_base = setr_val / (10**setr_degree);
		mult = 10**setr_degree;
	}
	
	console.log([ratio, degree]);
	console.log([setr_base, setr_degree, mult]);
	
	
	var abs_max_err = 10;
	var lengthset = 0;
	var output = [];
	
	var xlen = E.length;
	if (setr == 1 && !(setr_val == "" || setr_val == null))
		xlen = 1;
	
	var ylen = E.length;
	if (setr == 0 && !(setr_val == "" || setr_val == null))
		ylen = 1;

	
	// Main Calculation
	for (n = degree-2; n < degree+2; n++) {
		for (x = 0; x < xlen; x++) {
			
			if (xlen == 1) {
				Ex = setr_base;
			} else {
				Ex = E[x]*(10**n);
			}
			
			for (y = 0; y < ylen; y++) {
				
				if (ylen == 1) {
					Ey = setr_base;
				} else {
					Ey = E[y]*(10**n);
				}
				
				switch (calc_type) {
					case 0: // Divider
						rat = Ey / (Ex + Ey);
						err = rerr(rat, ratio);
						abs_err = Math.abs(err);
						
						if (abs_err < abs_max_err) {
							output = [...output, [abs_err, err, rat, Ex, Ey] ];
						}
						
						break;
						
					case 1:	// Ratio
						rat = Ex / Ey;
						err = rerr(rat, ratio);
						abs_err = Math.abs(err);
						
						if (abs_err < abs_max_err) {
							output = [...output, [abs_err, err, rat, Ex, Ey] ];
						}
						
						break;
				}
				
				if (output.length > lengthset) {
					// Sort based on errors (index 0 of each nested array)
					output = output.sort(function(a, b) {return a[0] - b[0];});
					
					// Keep only the first n elements with the lowest errors
					output = output.slice(0,num_outputs); 
					
					lengthset = output.length;
					
					abs_max_err = output[output.length-1][0];
				}
			
			} // loop y
		} // loop x
	} // loop n
	
	
	console.log(output);
	
	var result = "R1\tR2\tError\t  Ratio\n=====\t=====\t======\t  ========\n";
	
	for (let n = 0; n < output.length; n++) {
		result += fstring("{1}\t{2}\t{3}\t  {4}\n", 
							fnum2si(output[n][3]*mult), 
							fnum2si(output[n][4]*mult), 
							ferr(output[n][1]),
							fnum(output[n][2], degree+3)
						 );
	}
	
	// Inverted warning
	if (inverted == true) {
		result += fstring("\nNote: Input ratio was greater than 1 so it was inverted ({1}).",fnum(ratio,6));
	}
	
	// Number of rows for output
	document.getElementById("output").rows = result.split(/\r\n|\r|\n/).length;
	
	// Print result
	document.getElementById("output").value = result;
	
	// Calculation Time
	console.timeEnd("Runtime");
	document.getElementById("time").innerHTML = fstring("Time: {1}ms (approx)", fnum(performance.now()-startTime, 4));
	
	
}