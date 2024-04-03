// **********************************************************************************************************
// Component Combination Calculator [combination_calculator.htm]											*
// **********************************************************************************************************
function combination_calc (){
	console.log("Component Combination Calculator");
	
	// Timer
	console.time("Runtime");
	startTime = performance.now();
	
	// Clear output box
	document.getElementById("output").value = '';
	
	// =============================================================================================================
	// Inputs
	// =============================================================================================================
	var target_val = fsi2num(document.getElementById("target_value").value);	// Target Value
	var series = Number(document.getElementById("series").value);				// Series/Tolerance Selection
	var triple_calc = document.getElementById("three_component").checked;		// Three component calculation?
	var must_inc = document.getElementById("must_include").value;				// Single value that must be included
	var par_ser_only = Number(document.getElementById("par_ser_only").value);	// Parallel only solutions
	var in_ex_slct = Number(document.getElementById("in_ex_custom").value);		// Exclude Include Selection
	
	
	// =============================================================================================================
	// Variable pre-calculations
	// =============================================================================================================
	
	// Only, Include, Exclude calculation/transformations
	var include_vals; var exclude_vals; var only_vals;
	
	switch (in_ex_slct) {	
		case 0:
			// 'Include' CSV input
			include_vals = document.getElementById("include_vals").value;
			
			// 'Exclude' CSV input
			exclude_vals = document.getElementById("exclude_vals").value;
			
			// Convert CSV to array
			include_vals = (include_vals.replace(/\s/g,"")).split(',');
			exclude_vals = (exclude_vals.replace(/\s/g,"")).split(',');
			
			// Convert arrays to numbers
			include_vals = fsi2num_arr(include_vals);
			exclude_vals = fsi2num_arr(exclude_vals);
			
			console.log(include_vals);
			console.log(exclude_vals);
			break;
		
		case 1:
			// 'Only Include' CSV input
			var only_vals = document.getElementById("custom_vals").value;
			
			// Convert CSV to array
			only_vals = (only_vals.replace(/\s/g,"")).split(',');
			
			// Convert array to numbers
			only_vals = fsi2num_arr(only_vals);
			
			console.log(only_vals);
			break;
		
	}
	
	// Set must include variable
	var m_inc = false;
	
	if (must_inc != 0) {
		var m_inc = true;
		must_inc = Number(fsi2num(must_inc));
	}
	
	console.log([m_inc, must_inc]);
	
	// Parallel & Series calculations bool
	var ser; var par;
	switch (par_ser_only) {
		case 0:	// Both parallel & series
			par = true;
			ser = true;
			break;
		case 1: // only parallel
			par = true;
			ser = false;
			break;
		case 2:	// only series
			par = false;
			ser = true;
			break;
	}
	
	console.log([par, ser]);
	
	
	// =============================================================================================================
	// E-Series Array preperation
	// =============================================================================================================
	
	// E array of various degrees based on input value
	var expon = Math.floor(Math.log10(target_val)); 	// Get input mantissa 
	
	console.log(expon);
	
	// Mantissa boundaries
	var L, H;
	if ((expon < 2)&&(expon >= -3))	{						// If mantissa is between 1 and 1m
		L = -3; 	// minimum value is 1e-3 (1m)
		H = 3; 		// maximum value is 1e4 (10k)
	} else if ((expon < -3)&&(expon >= -12)) {				// If mantissa is between 1m and 1p
		L = -12; 	// minimum value is 1e-12 (1p)
		H = -3; 	// maximum value is 1e-3 (1m)
	} else {												// Else mantissa is bigger than 1
		L = 0; 		// minimum value is 1e1 (10)
		H = 6; 		// maximum value is 1e6 (1M)
	}
	
	
	// Create array of various degrees of e-series
	E_temp = eseries(series);		// Start temp array E_temp
	
	E = [];
	for (let n = L; n < H; n++)	{
		for (let m = 0; m < E_temp.length; m++)	{
			E[E.length] = E_temp[m] * (10**n);
		}
	}
	E[E.length] = E_temp[0]*(10**H);		// Add first value of highest magnitude
	
	delete E_temp; // Delete temp var
	
	
	// Include / Exclude / Only array configurations
	switch (in_ex_slct) {
		case 0:		
			if (exclude_vals != 0) {
				// Exclude values
				E = E.filter(( el ) => !exclude_vals.includes( el ));
			}
			
			if (include_vals != 0) {
				// Include (in numerical order) values
				E = [...E, ...include_vals]; // Concatenate include array to E value array
				E = E.sort(function(a, b) {return a - b;}); // Sort numerical (normally sorts alphabetical)
			}
			
			break;
		case 1:		
			// Only These Values (if 'only' input empty, break)
			if (only_vals == 0) break;
			E = structuredClone(only_vals);
			break;
	}
	
	console.log(E.length);
	
	
	// =============================================================================================================
	// Main Calculations
	// =============================================================================================================
	
	const one_out_num = 1; 		// Number of outputs for one component solution
	const two_out_num = 4; 		// Number of outputs for two component solution
	const three_out_num = 4;	// Number of outputs for three component solution
	
	var one_comp = [];
	var two_comp = [];
	var three_comp = [];
	
	
	// Single Component
	// *********************************************************************
	
	for (let x = 0; x < E.length*(!m_inc) + 1*m_inc; x++) { // In the case of a "must include" value, 
		
		if (m_inc) { Ex = must_inc; } 
		else { Ex = E[x]; }
		
		// Single value
		err = rerr(Ex, target_val);
		abs_err = Math.abs(err);
		
		one_comp = [ ...one_comp, [abs_err, err, Ex] ];
		// Array[index][absolute err, err, value];
		
		// Sort based on errors (index 0 of each nested array)
		one_comp = one_comp.sort(function(a, b) {return a[0] - b[0];});
		
		// Keep only the first n elements with the lowest errors
		one_comp = one_comp.slice(0,one_out_num); 
	
	
	// Two Components
	// *********************************************************************
		
		var lengthset = 0;
		var abs_max_err = 10;
		
		
		for (let y = 0; y < E.length; y++) {
			
			var skip = false;
			
			// Prevent duplicate result (swapped values)
			for (let n = 0; n < two_comp.length; n++){
				if (two_comp[n][2] == Ex && two_comp[n][1] == E[y] ) skip = true;
			}
			
			// If no need to skip, continue
			if (!skip) {
				
				if (ser) {
					// Series
					calc_s = Ex + E[y];		
					err_s = rerr(calc_s, target_val);				
					abs_err_s = Math.abs(err_s);
					
					if (abs_err_s <= abs_max_err) {
						two_comp = [ ...two_comp, [abs_err_s, err_s, Ex, E[y], 0] ];
					}
				}
				
				if (par) {
					// Parallel
					calc_p = ((Ex**-1) + (E[y]**-1))**-1; 
					err_p = rerr(calc_p, target_val);
					abs_err_p = Math.abs(err_p);
					
					if (abs_err_p <= abs_max_err) {
						two_comp = [ ...two_comp, [abs_err_p, err_p, Ex, E[y], 1] ];
					}
				}
				
				// 0 indicates series
				// 1 indicates parallel
				// Array[index][absolute err, value1, value2, indicator];
				
				if (two_comp.length > lengthset) {
					// Sort based on errors (index 0 of each nested array)
					two_comp = two_comp.sort(function(a, b) {return a[0] - b[0];});
					
					// Keep only the first n elements with the lowest errors
					two_comp = two_comp.slice(0,two_out_num); 
					
					lengthset = two_comp.length;
							
					// Using the following with 'if' statements before each array concatenation speeds everything up apparently.
					abs_max_err = two_comp[two_comp.length-1][0];
				}
				
			}
	
	
	// Three Components (if enabled by user)
	// *********************************************************************
	
			var lengthset2 = 0;
			var abs_max_err2 = 10;
		
			if (triple_calc) { // If 3 component calculation enabled
			
				for (let z = 0; z < E.length; z++) {
					
					var skip1 = false;
					var skip2 = false;
				
					// Prevent duplicate result (swapped values)
					for (let n = 0; n < three_comp.length; n++){
						
						// Triple Series condition
						// Triple Parallel  condition
						if (three_comp[n][2] == Ex && three_comp[n][4] == E[y] && three_comp[n][3] == E[z] ||	// 1x 3y 2z
							three_comp[n][3] == Ex && three_comp[n][2] == E[y] && three_comp[n][4] == E[z] ||	// 2x 1y 3z
							three_comp[n][4] == Ex && three_comp[n][3] == E[y] && three_comp[n][2] == E[z] ||	// 3x 2y 1z
							three_comp[n][3] == Ex && three_comp[n][4] == E[y] && three_comp[n][2] == E[z] ||	// 2x 3y 1z
							three_comp[n][4] == Ex && three_comp[n][2] == E[y] && three_comp[n][3] == E[z]		// 3x 1y 2z
							) skip1 = true;
							
						// Series Parallel condition
						if (three_comp[n][2] == Ex && three_comp[n][4] == E[y] && three_comp[n][3] == E[z]	// 1x 3y 2z
							) skip2 = true;
					}
					
					
					// If no need to skip, continue
					if (!skip1) {
						
						if (ser) {
							// Triple Series : A+B+C
							calc_ss = Ex + E[y] + E[z];
							err_ss = rerr(calc_ss, target_val);
							abs_err_ss = Math.abs(err_ss);
							
							if (abs_err_ss <= abs_max_err2) {
								three_comp = [ ...three_comp, [abs_err_ss, err_ss, Ex, E[y], E[z], 0] ];
							}
						}
						
						if (par) {
							// Triple Parallel : A|B|C
							calc_pp = ((Ex**-1) + (E[y]**-1) + (E[z]**-1))**-1; 	
							err_pp = rerr(calc_pp, target_val)
							abs_err_pp = Math.abs(err_pp);
							
							if (abs_err_pp <= abs_max_err2) {
								three_comp = [ ...three_comp, [abs_err_pp, err_pp, Ex, E[y], E[z], 1] ];
							}
						}
					}
					
					
					if (!skip2 && par && ser) {	
						// Series (Parallel): A+(B|C)
						calc_sp = Ex + ((E[y]**-1) + (E[z]**-1))**-1;
						err_sp = rerr(calc_sp, target_val);
						abs_err_sp = Math.abs(err_sp);
						
						if (abs_err_sp <= abs_max_err2) {
							three_comp = [ ...three_comp, [abs_err_sp, err_sp, Ex, E[y], E[z], 2] ];
						}
						
						// Parallel (Series) : A|(B+C)
						calc_ps = ((Ex**-1) + ((E[y] + E[z])**-1))**-1;
						err_ps = rerr(calc_ps, target_val);
						abs_err_ps = Math.abs(err_ps);
						
						if (abs_err_ps <= abs_max_err2) {
							three_comp = [ ...three_comp, [abs_err_ps, err_ps, Ex, E[y], E[z], 3] ];
						}
					}
					
					
					// 0 indicates triple series
					// 1 indicates triple parallel
					// 2 indicates series (parallel)
					// 3 indicates parallel (series)
					
					// Array[index][absolute err, value1, value2, value3, indicator];
					
					
					// Only re-sort and slice the array if the output array increased in size 
					if (three_comp.length > lengthset2) {
						
						// Sort based on errors (index 0 of each nested array)
						three_comp = three_comp.sort(function(a, b) {return a[0] - b[0];});
				
						// Keep only the first n elements with the lowest errors
						three_comp = three_comp.slice(0,three_out_num); 
						
						lengthset2 = three_comp.length;
						
						// Using the following with 'if' statements before each array concatenation speeds everything up apparently.
						abs_max_err2 = three_comp[three_comp.length-1][0];  
						
					}
					
					
				} // Loop z
				
			} // If triple calc enabled
			
		} // loop y
	} // loop x
		
	console.log(one_comp);
	console.log(two_comp);
	console.log(three_comp);
	
	
	
	// =============================================================================================================
	// Output
	// =============================================================================================================
	result = "Error\t Solution\n======\t ================\n";
	
	// One Component
	for (let n = 0; n < one_comp.length; n++) {
		result += fstring("{1}\t {2}\n", 
							ferr(one_comp[n][1]),
							fnum2si(one_comp[n][2]) 
							);
	} // 1 comp loop
	
	// Two Components
	for (let n = 0; n < two_comp.length; n++) {
		
		// Set parallel or series based on indicator
		if (two_comp[n][4] == 1) { fill = "|"; } 
		else { fill = "+"; }
		
		result += fstring("{1}\t {2} {3} {4}\n", 
							ferr(two_comp[n][1]),
							fnum2si(two_comp[n][2]), 
							fill,
							fnum2si(two_comp[n][3])
							);
	} // 2 comp loop
	
	// Three Components
	if (triple_calc) { 
		
		for (let n = 0; n < three_comp.length; n++) {
			
			result += fstring("{1}\t ", ferr(three_comp[n][1]));
			
			// Set parallel or series based on indicator
			switch (three_comp[n][5]) {
				case 0:
					result += fstring("{1} + {2} + {3}\n", 
								fnum2si(three_comp[n][2]),
								fnum2si(three_comp[n][3]),
								fnum2si(three_comp[n][4]) 
								);
					break;
				case 1:
					result += fstring("{1} | {2} | {3}\n",  
								fnum2si(three_comp[n][2]),
								fnum2si(three_comp[n][3]),
								fnum2si(three_comp[n][4]) 
								);
					break;
				case 2:
					result += fstring("{1} + ({2} | {3})\n",  
								fnum2si(three_comp[n][2]),
								fnum2si(three_comp[n][3]),
								fnum2si(three_comp[n][4]) 
								);
					break;
				case 3:
					result += fstring("{1} | ({2} + {3})\n", 
								fnum2si(three_comp[n][2]),
								fnum2si(three_comp[n][3]),
								fnum2si(three_comp[n][4]) 
								);
					break;
			}
		
		} // 3 comp loop
		
	} // if triple calc enabled
	
	
	// Number of rows for output
	document.getElementById("output").rows = result.split(/\r\n|\r|\n/).length;
	
	// Print result
	document.getElementById("output").value = result;
	
	// Calculation Time
	console.timeEnd("Runtime");
	document.getElementById("time").innerHTML = fstring("Time: {1}ms (approx)", fnum(performance.now()-startTime, 4));

}


