// Requires functions.js

var sig_figs = 4;

function f_awg() {
	// awg provided
	var awg = document.getElementById("awg").value;
	
	if (awg == "" || awg == undefined || document.getElementById("awg").value == "") { clr_in(); return; }
	
	awg = Number(awg);
	
	var d_mm = 0.127*(92**((36-awg)/39)); 	// Diameter in mm
	var d_in = d_mm / 25.4; 				// Diameter in in
	var a_mm = pi*(d_mm/2)**2;				// Area in mm^2
	var a_in = pi*(d_in/2)**2;				// Area in in^2
	var cmil = (d_in*1000)**2;				// Circular Mils
	
	document.getElementById("dmm").value = fnum2eng(d_mm, sig_figs);
	document.getElementById("din").value = fnum2eng(d_in, sig_figs);
	document.getElementById("amm").value = fnum2eng(a_mm, sig_figs);
	document.getElementById("ain").value = fnum2eng(a_in, sig_figs);
	document.getElementById("cmil").value = fnum2eng(cmil, sig_figs);

}

function f_cmil() {
	// cmil provided
	var cmil = Number(document.getElementById("cmil").value);
	
	if (cmil < 0 || cmil == undefined || document.getElementById("cmil").value == "") { clr_in(); return; }
	
	var d_in = Math.sqrt(cmil)/1000;	// Diameter in in
	var d_mm = d_in * 25.4;				// Diameter in mm
	var a_in = pi*(d_in/2)**2;			// Area in in^2
	var a_mm = pi*(d_mm/2)**2;			// Area in mm^2
	var awg = -39*(Math.log(d_mm/0.127)/Math.log(92)) + 36; // d_mm to awg
	
	document.getElementById("dmm").value = fnum2eng(d_mm, sig_figs);
	document.getElementById("din").value = fnum2eng(d_in, sig_figs);
	document.getElementById("amm").value = fnum2eng(a_mm, sig_figs);
	document.getElementById("ain").value = fnum2eng(a_in, sig_figs);
	document.getElementById("awg").value = fnum(awg, sig_figs);

}

function f_dmm() {
	// diam in mm provided
	var d_mm = Number(document.getElementById("dmm").value);
	
	if (d_mm < 0 || d_mm == undefined || document.getElementById("dmm").value == "") { clr_in(); return; }
	
	var d_in = d_mm / 25.4;			// Diameter in in
	var a_mm = pi*(d_mm/2)**2;		// Area in mm^2
	var a_in = pi*(d_in/2)**2;		// Area in in^2
	var cmil = (d_in*1000)**2;		// Circular Mils
	var awg = -39*(Math.log(d_mm/0.127)/Math.log(92)) + 36; // d_mm to awg
	
	document.getElementById("din").value = fnum2eng(d_in, sig_figs);
	document.getElementById("amm").value = fnum2eng(a_mm, sig_figs);
	document.getElementById("ain").value = fnum2eng(a_in, sig_figs);
	document.getElementById("awg").value = fnum(awg, sig_figs);
	document.getElementById("cmil").value = fnum2eng(cmil, sig_figs);

}

function f_din() {
	// diam in in provided
	var d_in = Number(document.getElementById("din").value);
	
	if (d_in < 0 || d_in == undefined || document.getElementById("din").value == "") { clr_in(); return; }
	
	var d_mm = d_in * 25.4;			// Diameter in mm
	var a_mm = pi*(d_mm/2)**2;		// Area in mm^2
	var a_in = pi*(d_in/2)**2;		// Area in in^2
	var cmil = (d_in*1000)**2;		// Circular Mils
	var awg = -39*(Math.log(d_mm/0.127)/Math.log(92)) + 36; // d_mm to awg
	
	document.getElementById("dmm").value = d_mm.toExponential(sig_figs);
	document.getElementById("amm").value = a_mm.toExponential(sig_figs);
	document.getElementById("ain").value = a_in.toExponential(sig_figs);
	document.getElementById("awg").value = fnum(awg, sig_figs);
	document.getElementById("cmil").value = fnum2eng(cmil, sig_figs);

}

function f_amm() {
	// area in mm provided
	var a_mm = Number(document.getElementById("amm").value);
	
	if (a_mm < 0 || a_mm == undefined || document.getElementById("amm").value == "") { clr_in(); return; }
	
	var d_mm = 2*Math.sqrt(a_mm/pi);	// Diameter in mm
	var d_in = d_mm / 25.4;				// Diameter in in
	var a_in = pi*(d_in/2)**2;			// Area in in^2
	var cmil = (d_in*1000)**2;			// Circular Mils
	var awg = -39*(Math.log(d_mm/0.127)/Math.log(92)) + 36; // d_mm to awg
	
	document.getElementById("dmm").value = d_mm.toExponential(sig_figs);
	document.getElementById("din").value = d_in.toExponential(sig_figs);
	document.getElementById("ain").value = a_in.toExponential(sig_figs);
	document.getElementById("awg").value = fnum(awg, sig_figs);
	document.getElementById("cmil").value = fnum2eng(cmil, sig_figs);

}

function f_ain() {
	// area in in provided
	var a_in = Number(document.getElementById("ain").value);
	
	if (a_in < 0 || a_in == undefined || document.getElementById("ain").value == "") { clr_in(); return; }
	
	
	var d_in = 2*Math.sqrt(a_in/pi);	// Diameter in in
	var d_mm = d_in * 25.4;				// Diameter in mm
	var a_mm = pi*(d_mm/2)**2;			// Area in mm^2
	var cmil = (d_in*1000)**2;			// Circular Mils
	var awg = -39*(Math.log(d_mm/0.127)/Math.log(92)) + 36; // d_mm to awg
	
	document.getElementById("dmm").value = d_mm.toExponential(sig_figs);
	document.getElementById("din").value = d_in.toExponential(sig_figs);
	document.getElementById("ain").value = a_in.toExponential(sig_figs);
	document.getElementById("awg").value = fnum(awg, sig_figs);
	document.getElementById("cmil").value = fnum2eng(cmil, sig_figs);

}

function closestawg() {
	// Find closest AWG to current result (round to nearest even number)
	var awg = Number(document.getElementById("awg").value);
	
	awg = awg - (awg % 1); 			// remove anything after the decimal point
	if (awg % 2 == 1) awg++; 		// if awg is odd, round up. if awg in even, round down (leave the same)
	
	document.getElementById("awg").value = fnum(awg, sig_figs);
	f_awg();	// run awg conversion function
	
}

function clr_in() {
	document.getElementById("dmm").value = "";
	document.getElementById("din").value = "";
	document.getElementById("amm").value = "";
	document.getElementById("ain").value = "";
	document.getElementById("awg").value = "";
	document.getElementById("cmil").value = "";
}
