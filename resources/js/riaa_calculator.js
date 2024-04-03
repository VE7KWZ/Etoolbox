// **********************************************************************************************************
// RIAA Filter Calculator [riaa_calculator.htm]																*
// **********************************************************************************************************
function riaa_calculator() {
	
	// Inputs
	var f1 = fsi2num(document.getElementById("F1").value); // 50hz
	var f2 = fsi2num(document.getElementById("F2").value); //	500hz
	var f3 = fsi2num(document.getElementById("F3").value); // 2120hz
	var r1 = fsi2num(document.getElementById("R1").value); // R1
	
	
	// Calculations
	var t1 = (1 / (f1 * Math.PI * 2)); // 50hz filter time
	var t2 = (1 / (f2 * Math.PI * 2)); // 500hz filter time
	var t3 = (1 / (f3 * Math.PI * 2)); // 2120hz filter time
	
	var r2 = r1 / (((t1 - t2) * (t2 - t3)) / Math.pow(t2,2)); 	// R2
	var c1 = (t2 / r2); 										// C1
	var c2 = (((t1 * t3)/t2)/r1); 								// C2
	
	
	// Output
	result = fstring("R1 = {1}\nR2 = {2}\nC1 = {3}F\nC2 = {4}F",
					fnum2si(r1,4), fnum2si(r2,4),
					fnum2si(c1,3), fnum2si(c2,3)
					);
					
	result += fstring("\n\nf1 = {1}Hz\t T1 = {2}s\nf2 = {3}Hz\t T2 = {4}s\nf3 = {5}Hz\t T3 = {6}s\n",
					 fnum2si(f1,3), fnum2si(t1,3), fnum2si(f2,3), fnum2si(t2,4), fnum2si(f3,4), fnum2si(t3,4)
					 );

	// Number of rows for output
	document.getElementById("output").rows = result.split(/\r\n|\r|\n/).length;
	
	// Print result
	document.getElementById("output").value = result;
	
}
