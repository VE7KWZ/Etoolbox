// Requires functions.js

function resistor_divider() {
	
	// Timer
	console.time("Runtime");
	startTime = performance.now();
	
	var vp = fsi2num(document.getElementById("vpos").value);		// Positive end of divider
	var vn = fsi2num(document.getElementById("vneg").value); 	// Negative end of divider
	var rtot = fsi2num(document.getElementById("rtot").value);	// Total series Resistance
	var series = Number(document.getElementById("series").value); // Eseries
	var sig_figs = Number(document.getElementById("precision").value); // Output Precision
	
	var vt = document.getElementById("vtap").value;			// Tap voltages CSV
	vt = (vt.replace(/\s/g,"")).split(','); 						// Convert CSV string to array
	
	for (n = 0; n < vt.length; n++)
		vt[n] = fsi2num(vt[n]);				// Convert array into numbers
	
	vt = vt.sort(function(a, b) {return b - a;}); // Sort csv array highest to lowest (idiot-proofing)
	
	if (vp < vn) {
		n = vn;
		vn = vp;
		vp = n;
	}
	
	var vd = vp - vn;						// get potential difference between pos and neg rail 
	
	for (n = 0; n < vt.length; n++) {	
		if (vt[n] > vp || vt[n] < vn) {
			alert("One or more tap voltage is greater than the positive voltage or less than the negative voltage.");
			return;
		}
		vt[n] = vt[n] - vn;				// Subtract negative rail voltage from tap voltages
	}
	
	console.log([vp,vn,rtot])
	console.log(vt)
	
	// Calculate arbitrary resistor values for exact result
	var rout = [];
	
	rout[0] = rtot * (1 - vt[0]/vd);
	rout[1] = rtot * vt[0]/vd;
	
	for (n = 1; n < vt.length; n++) {
		var rtemp = rout[n];
		rout[n] = rtemp * (1 - vt[n]/vt[n-1]);
		rout[n+1] = rtemp * vt[n]/vt[n-1];
	}
	
	
	// Calculate closest standard resistor values for approximate result
	var erout = [];
	
	erout[0] = closest_val(rtot * (1 - vt[0]/vd), series);
	erout[1] = closest_val(rtot * vt[0]/vd, series);
	
	for (n = 1; n < vt.length; n++) {
		var rtemp = erout[n];
		erout[n] = closest_val(rtemp * (1 - vt[n]/vt[n-1]), series);
		erout[n+1] = closest_val(rtemp * vt[n]/vt[n-1], series);
	}
	
	console.log(erout)
	
	// Approximate result voltages
	var ertot = 0;
	for (n = 0; n < erout.length; n++)
		ertot += erout[n];
	
	
	var evtap = [];
	var ertop = 0;
	for (n = 0; n < vt.length; n++) {
		ertop += erout[n];
		evtap[n] = vd * ((ertot-ertop)/ertot) + vn;
	}
	
	
	var result = fstring(">\t(Target Value)\n>\tClosest Standard Value\n>\tRelative Error\n\n     :\t({1})\n Rtot: \t{2}\n     :\t{3}\n\n",
						fnum2si(rtot), fnum2si(ertot, sig_figs), ferr((ertot-rtot)/rtot));
	
	//First Resistor
	result += fstring("  O--<\t{1}\n  |\n ---\t({2})\n |R|\t{3}\n ---\t{4}\n  |  ",
						fnum2si(vp, sig_figs), fnum2si(rout[0], sig_figs), fnum2si(erout[0], sig_figs), ferr((erout[0]-rout[0])/rout[0])
						);
	
	for (n = 1; n < rout.length; n++) {
		result += fstring("\n  |\t({1})\n  o-V{2}\t{3}\n  |\t{4}\n  |\n ---\t({5})\n |R|\t{6}\n ---\t{7}\n  |",
							fnum2si(vt[n-1]+vn, sig_figs),
							n,
							fnum2si(evtap[n-1], sig_figs),
							ferr((evtap[n-1]-(vt[n-1]+vn))/vt[n-1], sig_figs),
							fnum2si(rout[n], sig_figs),
							fnum2si(erout[n], sig_figs),
							ferr((erout[n]-rout[n])/rout[n])
							);
	}
	
	result += fstring("\n  O-->\t{1}\n",vn);
	
	// Number of rows for output
	document.getElementById("output").rows = result.split(/\r\n|\r|\n/).length;
	
	// Print result
	document.getElementById("output").value = result;
	
	// Calculation Time
	console.timeEnd("Runtime");
	document.getElementById("time").innerHTML = fstring("Time: {1}ms (approx)", performance.now()-startTime);

}

function closest_val(val, series){
	var E = eseries(series);
	E[E.length] = E[0]*10;
	var expon = Math.floor(Math.log10(val));
	var v_norm = val/(10 ** expon);
	var abs_err = [];
	for (i = 0; i < E.length; i++)
		abs_err[i] = Math.abs((E[i] - v_norm) / v_norm);
	var idx = abs_err.indexOf(Math.min(...abs_err));
	var val_out = E[idx] * (10 ** expon);
	return val_out;
}