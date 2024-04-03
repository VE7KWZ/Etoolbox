// **********************************************************************************************************
// Title [template.htm]
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
	var input1 = fsi2num(document.getElementById("input1").value);		// Input with SI
	var input2 = Number(document.getElementById("input2").value);		// Select input
	var input3 = document.getElementById("input3").value;				// Input
	var input4 = document.getElementById("input4").checked;				// Checkbox checked
	
	// =============================================================================================================
	// Main
	// =============================================================================================================
	
	
	
	
	// =============================================================================================================
	// Output
	// =============================================================================================================
	result = "";
	result += fstring("");
	
	
	// Number of rows for output
	document.getElementById("output").rows = result.split(/\r\n|\r|\n/).length;
	
	// Print result
	document.getElementById("output").value = result;
	
	// Calculation Time
	console.timeEnd("Runtime");
	document.getElementById("time").innerHTML = fstring("Time: {1}ms (approx)", fnum(performance.now()-startTime, 4));

}


