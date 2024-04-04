// **********************************************************************************************************
// Frequency Wavelength Calculator [frequency_wavelength.htm]
// **********************************************************************************************************
const c = 299792458;	// speed of light in vacuum

function freq_wavelength () {
	// freq to wavelength or wavelength (in meters) to freq. wavelength in m and ft/in
	
	var f = fsi2num(document.getElementById("frequency").value);
	var v = Number(document.getElementById("velocity").value);
	var vf = Number(document.getElementById("vf").value);
	var w = fsi2num(document.getElementById("wavelength").value);
	var wfact = Number(document.getElementById("wf").value);
	
  
	// wavelength factor: 1, 0.5, or 0.25 for full, half, and quarter wavelength
	var wf = 0;
	if (wfact === 0) wf = 1;
	if (wfact === 1) wf = 0.5;
	if (wfact === 2) wf = 0.25;
  
  
	var slct = 0;
	if (w !== 0 && v !== 0) slct = 3;
	if (f !== 0 && w !== 0) slct = 2;
	if (f !== 0 && v !== 0) slct = 1;
  
	switch (slct) {
		case 1:	// solve for wavelength
			w = (v*vf*wf)/f;
			break;
		case 2: // solve for velocity
			v = (f*w*wf)/vf;
			break;
		case 3: // Solve for frequency
			f = (v*vf)/(w*wf);
			break;
	}
	
	document.getElementById("frequency").value = fnum2si(f,4);
	document.getElementById("velocity").value = v;
	document.getElementById("vf").value = vf;
	document.getElementById("wavelength").value = fnum2si(w,3);

}

function v_factor() {
	// Calculate Velocity factor relative to c given the velocity
	var v = Number(document.getElementById("velocity").value);
	var vf = Number(document.getElementById("vf").value);
	
	vf = v/c;
	v = c;
	
	if (vf === 0) vf = 1; 
	
	document.getElementById("velocity").value = v;
	document.getElementById("vf").value = vf;
	
}