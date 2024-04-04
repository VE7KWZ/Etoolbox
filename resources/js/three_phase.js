// **********************************************************************************************************
// Three Phase Calculator [three_phase.htm]
// **********************************************************************************************************
function three_phase () {
	
	var v_line = fsi2num(document.getElementById("lv").value);
	var v_phase = fsi2num(document.getElementById("pv").value);
	var i_line = fsi2num(document.getElementById("li").value);
	var i_phase = fsi2num(document.getElementById("pi").value);
	var s = fsi2num(document.getElementById("s").value);
	var p = fsi2num(document.getElementById("p").value);
	var q = fsi2num(document.getElementById("q").value);
	
	var pf = 0; var ph_a = 0;
	
	// 0: delta configuration, 1: wye configuration
	var config = document.getElementById("config0").checked && !document.getElementById("config1").checked;
	
	switch (config*1) {
		case 0:	// DELTA CONFIGURATION
			if (v_phase !== 0) v_line = v_phase; 		// If v_phase given
			if (v_line !== 0) v_phase = v_line; 		// If v_line given
		
			if (i_phase !== 0) i_line = sqrt3*i_phase;	 	// If i_phase given
			if (i_line !== 0) i_phase = i_line/sqrt3; 		// If i_line given
			
			// If voltage and current provided
			if (v_phase !== 0 && i_phase !== 0) s = 3*v_phase*i_phase;
			
			if (p !== 0 && q !== 0) s = Math.sqrt((p*p)+(q*q));	// If Q and P provided
			if (p !== 0 && s !== 0) q = Math.sqrt((s*s)-(p*p));	// If S and P provided
			if (q !== 0 && s !== 0) p = Math.sqrt((s*s)-(q*q));	// If S and Q provided
			
			if (p !== 0 && s !== 0) {
				pf = p/s;
				ph_a = Math.acos(pf);
			}
		
			break;
	case 1:	// WYE CONFIGURATION
		if (v_phase !== 0) v_line = sqrt3*v_phase; 		// If v_phase given
			if (v_line !== 0) v_phase = v_line/sqrt3; 		// If v_line given
		
			if (i_phase !== 0) i_line = i_phase;	 	// If i_phase given
			if (i_line !== 0) i_phase = i_line; 		// If i_line given
			
			// If voltage and current provided
			if (v_phase !== 0 && i_phase !== 0) s = 3*v_phase*i_phase;
			
			if (p !== 0 && q !== 0) s = Math.sqrt((p*p)+(q*q));	// If Q and P provided
			if (p !== 0 && s !== 0) q = Math.sqrt((s*s)-(p*p));	// If S and P provided
			if (q !== 0 && s !== 0) p = Math.sqrt((s*s)-(q*q));	// If S and Q provided
			
			if (p !== 0 && s !== 0) {
				pf = p/s;
				ph_a = Math.acos(pf);
			}
			
			break;
	}
	
	
	// Outputs
	document.getElementById("lv").value = fnum2si(v_line,3);
	document.getElementById("pv").value = fnum2si(v_phase,3);
	document.getElementById("li").value = fnum2si(i_line,3);
	document.getElementById("pi").value = fnum2si(i_phase,3);
	document.getElementById("s").value = fnum2si(s,3);
	document.getElementById("p").value = fnum2si(p,3);
	document.getElementById("q").value = fnum2si(q,3);
	
	document.getElementById("pf").value = fnum(pf,6);
	document.getElementById("ph_a").value = fnum(ph_a*180/Math.PI,3);
	
	
	// If zero, clear the inputs
	if (v_line === 0 || v_line === undefined) document.getElementById("lv").value = "";
	if (i_line === 0 || i_line === undefined)document.getElementById("li").value = "";
	if (v_phase === 0 || v_phase === undefined)document.getElementById("pv").value = "";
	if (i_phase === 0 || i_phase === undefined)document.getElementById("pi").value = "";
	if (s === 0 || s === undefined)document.getElementById("s").value = "";
	if (p === 0 || p === undefined)document.getElementById("p").value = "";
	if (q === 0 || q === undefined)document.getElementById("q").value = "";
	if (pf === 0 || pf === undefined)document.getElementById("pf").value = "";
	if (ph_a === 0 || ph_a === undefined)document.getElementById("ph_a").value = "";
	
	
}


