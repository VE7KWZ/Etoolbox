// **********************************************************************************************************
// Resonance Calculator [resonance_calc.htm]
// **********************************************************************************************************

function resonance_calc () {
	console.log("Resonance Calculator");
	
	var cap = fsi2num(document.getElementById("capacitance").value);	// Capacitance value
	var ind = fsi2num(document.getElementById("inductance").value);	// Inductance value
	var res = fsi2num(document.getElementById("resistance").value);	// Resistance value
	var f_res = fsi2num(document.getElementById("frequency").value);	// Resonant frequency
	
	var opt = 0;
	if (cap <= 0 && ind <= 0 && f_res <= 0) { opt = 0; }
	if (cap > 0 && ind > 0 && f_res == 0) 	{ opt = 1; } // Capacitance and Inductance Provided
	if (cap == 0 && ind > 0 && f_res > 0) 	{ opt = 2; } // Inductance and Frequency Provided
	if (cap > 0 && ind == 0 && f_res > 0) 	{ opt = 3; } // Capacitance and Frequency Provided
	
	
	switch(opt) {
		case 0:
			// No Inputs
			break;
		case 1:
			// L and C provided
			f_res = 1/(2*Math.PI*Math.sqrt(ind*cap));
			
			document.getElementById("frequency").value = fnum2si(f_res, 3);
			break;
		case 2:
			// L and Frequency provided
			cap = 1/(((2*Math.PI*f_res)**2)*ind);
			
			document.getElementById("capacitance").value = fnum2si(cap, 3);
			break;
		case 3:
			// C and Frequency provided
			ind = 1/(((2*Math.PI*f_res)**2)*cap);
			
			document.getElementById("inductance").value = fnum2si(ind, 3);
			break;
	}
	
	if (res > 0) { 
		// R provided
		Zd_ser = res;
		Zd_par = ind/(res*cap);
		
		Q_ser = (1/res)*Math.sqrt(ind/cap);
		Q_par = res*Math.sqrt(cap/ind);
		
		series = fstring("Series\nQ: {1}\nZ: {2} \u2126", fnum(Q_ser,3), fnum2si(Zd_ser,3));
		parallel = fstring("Parallel\nQ: {1}\nZ: {2} \u2126", fnum(Q_par,3), fnum2si(Zd_par,3));
		
		// OUTPUT Q AND Z
		document.getElementById("zq_out_series").value = series;
		document.getElementById("zq_out_parallel").value = parallel;
	} else {
		// OUTPUT Q AND Z BLANK
		document.getElementById("zq_out_series").value = "";
		document.getElementById("zq_out_parallel").value = "";
	}
	
	


}