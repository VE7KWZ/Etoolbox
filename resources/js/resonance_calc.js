// Requires functions.js

const sig_figs = 4;

function res_freq_calc() {
	
	var cap = document.getElementById("cap").value;		// Capacitance value
	var ind = document.getElementById("ind").value;		// Inductance value
	var freq = document.getElementById("freq").value;	// Resonant frequency
	
	var ncap = fsi2num(cap);
	var nind = fsi2num(ind);
	var nfreq = fsi2num(freq);
	
	var opt;
	
	if ((ind != "" && nind >= 0) && (freq != "" && nfreq >= 0)) opt = 2;
	if ((cap != "" && ncap >= 0) && (freq != "" && nfreq >= 0)) opt = 1;
	if ((ind != "" && nind >= 0) && (cap != "" && ncap >= 0)) opt = 0;
	
	switch (opt) {
		case 0:	// Cap + Ind --> Freq
			document.getElementById("freq").value = fnum2si(1/(2*pi*Math.sqrt(nind*ncap)), sig_figs);
			break;
		case 1:	// Cap + Freq --> Ind
			document.getElementById("ind").value = fnum2si(1/(((2*pi*nfreq)**2)*ncap), sig_figs);
			break;
		case 2:	// Ind + Freq --> Cap
			document.getElementById("cap").value = fnum2si(1/(((2*pi*nfreq)**2)*nind), sig_figs);
			break;
	}
	
	res_chg();
	
}

function res_chg() {
	// Resistance changes
	var cap = document.getElementById("cap").value;		// Capacitance value
	var ind = document.getElementById("ind").value;		// Inductance value
	var res = document.getElementById("res").value;		// Resistance value
	
	if ((cap == "" || cap == undefined) && 
		(ind == "" || ind == undefined) || 
		(res == "" || res == undefined)
		) { return; }
	
	var ncap = fsi2num(cap);
	var nind = fsi2num(ind);
	var nres = fsi2num(res);
	
	var zd_ser = fnum2si(nres, sig_figs);
	var zd_par = fnum2si(nind/(nres*ncap), sig_figs);
	
	var qf_ser = fnum2si((1/nres)*Math.sqrt(nind/ncap), sig_figs);
	var qf_par = fnum2si(nres*Math.sqrt(ncap/nind), sig_figs);
	
	var result = fstring("Serial Resonant ----\nZd = {1}\nQ  = {2}\n\nParallel Resonant --\nZd = {3}\nQ  = {4}", zd_ser, qf_ser, zd_par, qf_par);
	
	document.getElementById("qf_imped").value = result;

}

