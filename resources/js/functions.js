// Functions written by Michael Bell


// ======================================================================================== MATH

// Linear interpolation function
function lerp (x,x0,x1,y0,y1) {
	return ((y1 - y0) / (x1-x0)) * (x - x0) + y0;
}

// Relative error function
function rerr (measuredVal, expectedVal) {
	return (measuredVal - expectedVal) / expectedVal;
}

// Map function, maps one set of values to a linear scale of other values
function map (x, in_min, in_max, out_min, out_max) {
	return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

// Besselj function, returns an approximate value given the order (alpha) and x
function besselj (alpha, x) {
	var ja = (x/2)**alpha;
	for (let m = 0; m < 130; m++) {
		//ja += (((-1) ** m) / (fact(m) * gamma(m + alpha + 1)))*((x/2)**(2*m+alpha)); // Original bessel func
		ja += (((-(1/4)*(x ** 2)) ** m) / (fact(m) * gamma(m + alpha + 1)));
	}
	ja -= 1;
	
	return parseFloat(ja).toFixed(6);
}

// Gamma funciton
function gamma (n) {
   return fact(n-1);
}

// Factorial
function fact (x) {
   if(x==0) {
      return 1;
   }
   return x * fact(x-1);
}

// Multiply an Array by Scalar
function multscalar (arr, sclr) {
	for (let i = 0; i < arr.length; i++) {
		arr[i] *= sclr; 
	}
	return arr;
}

// Get product of Array
function prod (arr) {
	for (let i = 0; i < arr.length; i++) {
		product *= arr[i]; 
	}
	return product;
}

// Get sum of Array
function summation (arr) {
	for (let i = 0; i < arr.length; i++) {
		sum += arr[i]; 
	}
	return sum;
}

// Get the closest Eseries equivalent. Returns value, error
function closest_eseries(val_arb, series){
	var E = eseries(series);
	E[E.length] = E[0]*10;
	var expon = Math.floor(Math.log10(val_arb));
	var v_norm = val_arb/(10 ** expon);
	var abs_err = [];
	for (let i = 0; i < E.length; i++) {
		abs_err[i] = Math.abs(rerr(E[i], v_norm));
	}
	var idx = abs_err.indexOf(Math.min(...abs_err));
	var val_out = E[idx] * (10 ** expon);
	var err_out = rerr(val_out, val_arb);
	
	return [val_out, err_out];
}





// ======================================================================================== FORMATTING

// String formatting function
function fstring (str_in, ...args) {
	// Example: fstring("test ID{1}. First Name:{2}. Code:{3}", id, name, 1234);
	
	for (let n = 0; n < args.length; n++) str_in = str_in.replace("{"+ (n+1) +"}", args[n]);
	return str_in;
}

// Convert error decimal to a readable string/percentage
function ferr (val) {

	if (Math.abs(val) == 0)	{					// error = 0
		return "Exact";
	} else if (Math.abs(val) == Infinity) {  	// error = inf
		return "Div_0%";
	} else if (Math.abs(val) < 0.0001) {		// error less than 0.01%
		return "<0.01%";
	} else if (Math.abs(val) >= 1) {			// error greater than 100%
		return ">100%";
	} else {									// Other value
		return parseFloat(100*val).toFixed(2) + "%";
	}
	
}

// Convert numbers to an RTK SI style string notation
function fnum2si (val, round=8, space=false) {

	// Seperate value and mantissa
	// seperate by degrees of 3: ie 1, 1*10^3, 1*10^6, etc.
	var expon = Math.floor(Math.floor(Math.log10(val))/3);
	if (val == 0) { expon = 0; }
	
	// Calculate value with the degree of 3 taken into account
	var val = fnum(val*(10**(-1*expon*3)),round);
	
	switch (expon) {
		case -5: //femto
			val += "f";
			break;
		case -4: //pico
			val += "p";
			break;
		case -3: //nano
			val += "n";
			break;
		case -2: //micro
			val += "u";
			break;
		case -1: //milli
			val += "m";
			break;
		case 0: //no suffix
			val += "";
			break;
		case 1: //kilo
			val += "k";
			break;
		case 2: //mega
			val += "M";
			break;
		case 3: //giga
			val += "G";
			break;
		case 4: //tera
			val += "T";
			break;
		default: //other
			val += "*10^" + (expon*3);
			break;
	}
	
	// If space bool is true, insert space before si suffix
	if (space == true) {
		if (expon == 0) {
			val += " ";
		} else {
			val = val.slice(0, -1) + " " + val.slice(-1);
		}
	}
	
	return val;
}

// Convert an RKM SI style string notation to number
function fsi2num (val) {
	
	const nxn = new RegExp('^[0-9]+[a-zA-Z][0-9]+$'); 		// #X#
	const nnx = new RegExp('^[0-9]+[a-zA-Z]$');				// ##X
	const ndnx = new RegExp('^[0-9]+[.][0-9]+[a-zA-Z]$');	// #.#X
	
	if (nxn.test(val)) {
		si = val.replaceAll(/[0-9]+/g,'');		// Remove all numbers to get SI suffix letter
		num = val.replaceAll(/[a-zA-Z]/g,'.'); 	// Replace si letter with the decimal
	} else if (nnx.test(val)) {
		si = val.replaceAll(/[0-9]+/g,'');		// Remove all numbers to get SI suffix letter	
		num = val.replaceAll(/[^0-9]/g,''); 	// Remove all that isnt numbers
	} else if (ndnx.test(val)) {
		si = val.replaceAll(/[0-9.]+/g,'');		// Remove all numbers to get SI suffix letter	
		num = val.replaceAll(/[^0-9.]/g,''); 	// Remove all that isnt numbers
	} else {
		si = 0;
		num = val;
	}
	
	num = Number(num);
	
	switch (si) {
		case 'p':  	// pico
			return num*(10 ** -12);
			break;
		case 'n': 	// nano
			return num*(10 ** -9);
			break;
		case 'u': 	// micro
			return num*(10 ** -6);
			break;
		case 'm': 	// milli
			return num*(10 ** -3);
			break;
		case 'k': 	// kilo
			return num*(10 ** 3);
			break;
		case 'M': 	// mega
			return num*(10 ** 6);
			break;
		case 'G': 	// giga
			return num*(10 ** 9);
			break;
		case 'T': 	// tera
			return num*(10 ** 12);
			break;
		default:	// none
			return num;
			break;
	}
	
}

// Convert RKM SI notation to numbers as an array
function fsi2num_arr(arr) {
	
	for (let n = 0; n < arr.length; n++) {
		arr[n] = Number(fsi2num(arr[n]));
	}
	
	return arr;
}


// Reduce floating point error creating large numbers by reducing precision to 8 decimal places
// Removes padded/trailing zeros
function fnum (num, digits=8) {
	return parseFloat(num.toFixed(digits));
}


// ======================================================================================== LOOKUP

// Exclude values from one array from another
function exclude (arr, exc_arr) {
	for ( var i = 0; i < arr.length; i++ ) { 
		for ( var j = 0; j < exc_arr.length; j++ ) { 
			if ( arr[i] === exc_arr[j] ) {
				arr.remove(i);
			}
		}
	}
}

// E-Series of preferred numbers lookup arrays
function eseries (series) {
	switch (series) {
		case 3:
			return [1.0, 2.2, 4.7];
			break;
		case 6:
			return [1.0, 1.5, 2.2, 3.3, 4.7, 6.8];
			break;
		case 12:
			return [1.0, 1.2, 1.5, 1.8, 2.2, 2.7, 3.3, 3.9, 4.7, 5.6, 6.8, 8.2];
			break;
		case 24:
			return [1.0, 1.1, 1.2, 1.3, 1.5, 1.6, 1.8, 2.0, 2.2, 2.4, 2.7, 3.0, 
					3.3, 3.6, 3.9, 4.3, 4.7, 5.1, 5.6, 6.2, 6.8, 7.5, 8.2, 9.1];
			break;
		case 48:
			return [1.00, 1.05, 1.10, 1.15, 1.21, 1.27, 1.33, 1.40, 1.47, 1.54, 
					1.62, 1.69, 1.78, 1.87, 1.96, 2.05, 2.15, 2.26, 2.37, 2.49, 
					2.61, 2.74, 2.87, 3.01, 3.16, 3.32, 3.48, 3.65, 3.83, 4.02, 
					4.22, 4.42, 4.64, 4.87, 5.11, 5.36, 5.62, 5.90, 6.19, 6.49, 
					6.81, 7.15, 7.50, 7.87, 8.25, 8.66, 9.09, 9.53];
			break;
		case 96:
			return [1.00, 1.02, 1.05, 1.07, 1.10, 1.13, 1.15, 1.18, 1.21, 1.24, 
					1.27, 1.30, 1.33, 1.37, 1.40, 1.43, 1.47, 1.50, 1.54, 1.58, 
					1.62, 1.65, 1.69, 1.74, 1.78, 1.82, 1.87, 1.91, 1.96, 2.00, 
					2.05, 2.10, 2.15, 2.21, 2.26, 2.32, 2.37, 2.43, 2.49, 2.55, 
					2.61, 2.67, 2.74, 2.80, 2.87, 2.94, 3.01, 3.09, 3.16, 3.24, 
					3.32, 3.40, 3.48, 3.57, 3.65, 3.74, 3.83, 3.92, 4.02, 4.12, 
					4.22, 4.32, 4.42, 4.53, 4.64, 4.75, 4.87, 4.99, 5.11, 5.23, 
					5.36, 5.49, 5.62, 5.76, 5.90, 6.04, 6.19, 6.34, 6.49, 6.65, 
					6.81, 6.98, 7.15, 7.32, 7.50, 7.68, 7.87, 8.06, 8.25, 8.45, 
					8.66, 8.87, 9.09, 9.31, 9.53, 9.76];
			break;
		case 192:
			return [1.00, 1.01, 1.02, 1.04, 1.05, 1.06, 1.07, 1.09, 1.10, 1.11, 
					1.13, 1.14, 1.15, 1.17, 1.18, 1.20, 1.21, 1.23, 1.24, 1.26, 
					1.27, 1.29, 1.30, 1.32, 1.33, 1.35, 1.37, 1.38, 1.40, 1.42, 
					1.43, 1.45, 1.47, 1.49, 1.50, 1.52, 1.54, 1.56, 1.58, 1.60, 
					1.62, 1.64, 1.65, 1.67, 1.69, 1.72, 1.74, 1.76, 1.78, 1.80, 
					1.82, 1.84, 1.87, 1.89, 1.91, 1.93, 1.96, 1.98, 2.00, 2.03, 
					2.05, 2.08, 2.10, 2.13, 2.15, 2.18, 2.21, 2.23, 2.26, 2.29, 
					2.32, 2.34, 2.37, 2.40, 2.43, 2.46, 2.49, 2.52, 2.55, 2.58, 
					2.61, 2.64, 2.67, 2.71, 2.74, 2.77, 2.80, 2.84, 2.87, 2.91, 
					2.94, 2.98, 3.01, 3.05, 3.09, 3.12, 3.16, 3.20, 3.24, 3.28, 
					3.32, 3.36, 3.40, 3.44, 3.48, 3.52, 3.57, 3.61, 3.65, 3.70, 
					3.74, 3.79, 3.83, 3.88, 3.92, 3.97, 4.02, 4.07, 4.12, 4.17, 
					4.22, 4.27, 4.32, 4.37, 4.42, 4.48, 4.53, 4.59, 4.64, 4.70, 
					4.75, 4.81, 4.87, 4.93, 4.99, 5.05, 5.11, 5.17, 5.23, 5.30, 
					5.36, 5.42, 5.49, 5.56, 5.62, 5.69, 5.76, 5.83, 5.90, 5.97, 
					6.04, 6.12, 6.19, 6.26, 6.34, 6.42, 6.49, 6.57, 6.65, 6.73, 
					6.81, 6.90, 6.98, 7.06, 7.15, 7.23, 7.32, 7.41, 7.50, 7.59, 
					7.68, 7.77, 7.87, 7.96, 8.06, 8.16, 8.25, 8.35, 8.45, 8.56, 
					8.66, 8.76, 8.87, 8.98, 9.09, 9.20, 9.31, 9.42, 9.53, 9.65, 
					9.76, 9.88];
			break;
		default:
			return 0;
			break;
	}
	
}
