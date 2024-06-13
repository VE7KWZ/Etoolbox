// Requires functions.js
const sig_figs = 4;
const c = 299792458;	// speed of light in vacuum

function freq_wave() {
	// freq to wavelength or wavelength (in meters) to freq. wavelength in m and ft/in
	
	var freq = document.getElementById("frequency").value;
	var vel = document.getElementById("velocity").value;
	var wl = document.getElementById("wavelength").value;
	
	var vf = Number(document.getElementById("velo_f").value);
	var wfact = Number(document.getElementById("wl_f").value);
	
	var nfreq = fsi2num(freq);
	var nvel = Number(vel);
	var nwl = fsi2num(wl);
	
	// wavelength factor: 1, 0.5, or 0.25 for full, half, and quarter wavelength
	var wf = 0;
	if (wfact === 0) wf = 1;
	if (wfact === 1) wf = 0.5;
	if (wfact === 2) wf = 0.25;
	
	// cant have vf of 0
	if (vf <= 0) vf = 1;
	
	var slct = 0;
	if ((wl != "" && nwl >= 0) && (vel != "" && nvel >= 0)) slct = 3;
	if ((freq != "" && nfreq >= 0) && (wl != "" && nwl >= 0)) slct = 2;
	if ((freq != "" && nfreq >= 0) && (vel != "" && nvel >= 0)) slct = 1;
	
	if (vf < 1 && vel == "") {
		nvel = c*vf;
		vel = nvel;
		document.getElementById("velocity").value = fnum(nvel, sig_figs);
		document.getElementById("velo_f").value = "";
	}
	
	switch (slct) {
		case 1:	// solve for wavelength (freq + vel --> wl)
			document.getElementById("wavelength").value = fnum2si((nvel*vf*wf)/nfreq, sig_figs);
			break;
		case 2: // solve for velocity (freq + wl --> vel)
			document.getElementById("velocity").value = fnum((nfreq*nwl*wf)/vf, sig_figs);
			break;
		case 3: // Solve for frequency (vel + wl --> freq)
			document.getElementById("frequency").value = fnum2si((nvel*vf)/(nwl*wf), sig_figs);
			break;
	}
	
}

function v_factor() {
	// Calculate Velocity factor relative to c given the velocity
	var v = Number(document.getElementById("velocity").value);
	var vf = Number(document.getElementById("velo_f").value);
	
	vf = v/c;
	v = c;
	
	if (vf === 0) vf = 1; 
	
	document.getElementById("velocity").value = fnum(v, sig_figs);
	document.getElementById("velo_f").value = fnum(vf, sig_figs+2);
}
