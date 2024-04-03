// **********************************************************************************************************
// Component Combination Calculator [equivalent_solver.htm]													*
// **********************************************************************************************************
function equivalent_solver () {
	console.log("Equivalent Value Solver");
	
	// Timer
	console.time("Runtime");
	startTime = performance.now();
	
	// Clear output box
	document.getElementById("output").value = '';
	
	// Inputs
	var component = Number(document.getElementById("component_type").value);	// Component Selection
	var formula = document.getElementById("formula_input").value;				// Formula
	var precision = document.getElementById("precision").value;					// Output Precision
	var hide_stack = !document.getElementById("show_stack").checked;			// Hide Stack Ouput Bool
	
	if (precision <= 0) {
		precision = 4;
	}
	
	console.log(component);
	
	// Parse the formula. Array of values and +, |, (, ), operators
	p_formula = formula.trim().match(/([|])|([+])|([\)])|([\(])|([A-Za-z0-9.]+)/g);
	
	console.log(p_formula);
	
	// Test:
	// 22k|(1M+(29|8k))+(22k|12k)
	// 29291.13805834403
	// Answer: 29.29113806k
	
	
	// Infix to Reverse Polish Notation conversion
	// *******************************************************************
	
	var op_stack = [];	// Operator stack
	var exp_stack = []; // RPN expression stack
	
	for (let n = 0; n < p_formula.length; n++) {
		
		// If there is a "+" or "|" operator
		if (p_formula[n] == "+" || p_formula[n] == "|") {
			
			// If there are operators on the operator stack, pop the top one off
			if (op_stack.length > 0 && op_stack[op_stack.length-1] != "(") {	
				exp_stack[exp_stack.length] = op_stack.pop();
			}
			
			// add operator to op stack
			op_stack[op_stack.length] = p_formula[n];
		
		} else if (p_formula[n] == "(") {
			// add opening parenthesis to op stack
			op_stack[op_stack.length] = p_formula[n];
		
		} else if (p_formula[n] == ")") {
			// If closing parenthesis, pop all operators off until the opening parenthesis found
			m = op_stack.length-1;
			while (op_stack[m] != "(" && m >= 0) {
				
				exp_stack[exp_stack.length] = op_stack.pop();
				m--;
			}
			
			// remove opening parenthesis afterwards
			if (op_stack[op_stack.length-1] == "(") { op_stack.pop(); }
			
		} else {
			// add any other term found to the expression stack
			exp_stack[exp_stack.length] = p_formula[n];
		}
		
	}
	
	// While there are operators on the op stack, add them to the expression stack
	while (op_stack.length > 0) {
		exp_stack[exp_stack.length] = op_stack.pop();
		
	}
	
	console.log(exp_stack);
	
	
	// Reverse Polish Notation Evaluation
	// *******************************************************************

	var process = "";		// Stack output representation
	var eval_stack = [];	// Evaluation stack
	
	// For each value in the RPN expression
	for (let n = 0; n < exp_stack.length; n++) {
		
		if ( (exp_stack[n] == "+" && component == 0) || (exp_stack[n] == "|" && component == 1) ) {
			// If + operator, pop the two top most elements of eval stack
			a = fsi2num(eval_stack.pop());
			b = fsi2num(eval_stack.pop());
			
			// Evaluate and push to stack
			eval_stack[eval_stack.length] = fnum2si((a + b), precision);
			
			process += fstring("{1} {2}\n", exp_stack[n], String(eval_stack).replaceAll(",", ", "));
			console.log(["+", a, b, a+b]);
			
		} else if ( (exp_stack[n] == "|" && component == 0) || (exp_stack[n] == "+" && component == 1) ) {
			// If | operator, pop the two top most elements of eval stack
			a = fsi2num(eval_stack.pop());
			b = fsi2num(eval_stack.pop());
			
			// Evaluate and push to stack
			eval_stack[eval_stack.length] = fnum2si((a*b)/(a+b), precision);
			
			process += fstring("{1} {2}\n", exp_stack[n], String(eval_stack).replaceAll(",", ", "));
			console.log(["|", a, b, (a*b)/(a+b)]);
			
		} else {
			// If not an operator or parenthesis, push value to eval stack
			eval_stack[eval_stack.length] = exp_stack[n];
			
			process += fstring("  {1}\n", String(eval_stack).replaceAll(",", ", "));
		}
		
	}
	
	
	// Output formatting
	// *******************************************************************
	
	// If there is more than 1 entry in the eval stack, convergence failed.
	if (eval_stack.length != 1) {
		result = "Syntax Error.";
	} else {
		result = fstring("Equivalent Value = {1}", eval_stack[0]);
	}
	
	if (hide_stack == false) {
		result += "\n\nRPN Expression: " + String(exp_stack).replaceAll(",", " ");
		result += "\n\nStack Operations:\n" + process;
	}
	
	// Number of rows for output
	document.getElementById("output").rows = result.split(/\r\n|\r|\n/).length;
	
	// Print result
	document.getElementById("output").value = result;
	
	// Calculation Time
	console.timeEnd("Runtime");
	document.getElementById("time").innerHTML = fstring("Time: {1}ms (approx)", fnum(performance.now()-startTime, 4));
	
}