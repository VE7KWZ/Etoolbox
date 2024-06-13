// Requires functions.js

const sig_figs = 4;

function f_metr() {
	// meter to feet and inches
	var m = fsi2num(document.getElementById("meter").value);
	
	var inch = m/0.0254;
	var ft = m/(12*0.0254);
	
	document.getElementById("inch").value = fnum(inch, sig_figs);
	document.getElementById("feet").value = fnum(ft, sig_figs);
	document.getElementById("ftin").value = m2fracimperial(m);
	
}

function f_inch() {
	// inch to meters and feet
	var inch = Number(document.getElementById("inch").value);
	
	var m = inch/39.37;
	var ft = inch/12;
	
	document.getElementById("meter").value = fnum2si(m, sig_figs);
	document.getElementById("feet").value = fnum(ft, sig_figs);
	document.getElementById("ftin").value = m2fracimperial(m);
}

function f_feet() {
	// feet to meters and inches
	var ft = Number(document.getElementById("feet").value);
	
	var m = ft/(12*0.0254);
	var inch = ft/12;
	
	document.getElementById("meter").value = fnum2si(m, sig_figs);
	document.getElementById("inch").value = fnum(inch, sig_figs);
	document.getElementById("ftin").value = m2fracimperial(m);
	
}

function m2fracimperial(value) {
	var val_in = value / 0.0254;
	var val_ft = Math.floor(val_in/12);
	val_in -= val_ft*12;
	var val_frac = val_in - Math.floor(val_in);
	val_in = Math.floor(val_in);
	
	val_frac = Math.round(val_frac*64)
	
	for (i = 6; i > 1; i--) {
		if ((val_frac/2)%1 !== 0) break;
		val_frac /= 2;
	}
	
	var out = val_ft + "ft " + val_in + "in";
	if (val_frac > 0) out += " and " + val_frac + "/" + 2**i;
	return	out;
}


