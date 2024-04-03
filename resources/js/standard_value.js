// **********************************************************************************************************
// Standard Value Calculator [standard_value.htm]															*
// **********************************************************************************************************
function standard_value() {
	console.log("Standard E-Series Value");
	
	
	// Inputs
	var val_arb = fsi2num(document.getElementById("target_value").value);
	var ser = Number(document.getElementById("series").value);
	var E = eseries(ser);
	
	// Calculation
	
	// Convert to a value between 1 and 10, and get mantissa
	var expon = Math.floor(Math.log10(val_arb));
	var v_norm = val_arb/(10 ** expon);
	
	console.log([v_norm, expon]);
	
	
	// Add the next degree to the array
	E[E.length] = E[0]*10;
	
	
	// Create an array of error values between E series and arbitrary value
	var abs_err = [];
	for (let i = 0; i < E.length; i++) {
		abs_err[i] = Math.abs(rerr(E[i], v_norm));
	}
	
	// Get index of lowest error element
	var idx = abs_err.indexOf(Math.min(...abs_err));
	
	// Output
	var val_out = E[idx] * (10 ** expon);
	var err_out = rerr(val_out, val_arb);
	
	console.log([val_out, err_out]);
	
	document.getElementById("out_val").value = fnum2si(val_out);
	document.getElementById("out_err").value = ferr(err_out);
	
}