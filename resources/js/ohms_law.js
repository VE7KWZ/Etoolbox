// **********************************************************************************************************
// Ohms Law Calculator [ohms_law.htm]
// **********************************************************************************************************

function ohms_law_v(){
	
	var v = fsi2num(document.getElementById("volt").value);
	var i = fsi2num(document.getElementById("amp").value);
	var r = fsi2num(document.getElementById("ohm").value);
	var p = fsi2num(document.getElementById("watt").value);
	
	if (v == 0 || v == null) throw "exit"; // Exit fuction if field value deleted
	if (i == 0 && r == 0 && p == 0) throw "exit"; // Exit fuction if all other values blank
	
	
	var op = 0;
	if (v !== 0 && p !== 0) op = 3; // VP
	if (v !== 0 && r !== 0) op = 2; // VR
	if (i !== 0 && v !== 0) op = 1; // VI
	
	switch (op) {
		case 1: // VI
			r = v/i;
			p = v*i;
			break;
		case 2: // VR
			i = v/r;
			p = v*v/r;
			break;
		case 3: // VP
			i = p/v;
			r = v*v/p;
			break;
	}
	
	document.getElementById("amp").value = fnum2si(i,3);
	document.getElementById("ohm").value = fnum2si(r,3);
	document.getElementById("watt").value = fnum2si(p,3);
	
}

function ohms_law_i(){
	
	var v = fsi2num(document.getElementById("volt").value);
	var i = fsi2num(document.getElementById("amp").value);
	var r = fsi2num(document.getElementById("ohm").value);
	var p = fsi2num(document.getElementById("watt").value);
	
	if (i == 0 || i == null) throw "exit"; // Exit function if field value deleted
	if (i == 0 && r == 0 && p == 0) throw "exit"; // Exit fuction if all other values blank
	
	var op = 0;
	if (i !== 0 && p !== 0) op = 3; // IP
	if (i !== 0 && r !== 0) op = 2; // IR
	if (i !== 0 && v !== 0) op = 1; // VI
	
	switch (op) {
		case 1: // VI
			r = v/i;
			p = v*i;
			break;
		case 2: // IR
			v = i*r;
			p = i*i*r;
			break;
		case 3: // IP
			v = p/i;
			r = p/(i*i);
			break;
	}
	
	document.getElementById("volt").value = fnum2si(v,3);
	document.getElementById("ohm").value = fnum2si(r,3);
	document.getElementById("watt").value = fnum2si(p,3);
	
}

function ohms_law_r(){
	
	var v = fsi2num(document.getElementById("volt").value);
	var i = fsi2num(document.getElementById("amp").value);
	var r = fsi2num(document.getElementById("ohm").value);
	var p = fsi2num(document.getElementById("watt").value);
	
	if (r == 0 || r == null) throw "exit"; // Exit function if field value deleted
	if (i == 0 && r == 0 && p == 0) throw "exit"; // Exit fuction if all other values blank
	
	var op = 0;
	if (r !== 0 && p !== 0) op = 3; // RP
	if (i !== 0 && r !== 0) op = 2; // IR
	if (v !== 0 && r !== 0) op = 1; // VR
	
	switch (op) {
		case 1: // VR
			i = v/r;
			p = v*v/r;
			break;
		case 2: // IR
			v = i*r;
			p = i*i*r;
			break;
		case 3: // RP
			v = Math.sqrt(p*r);
			i = Math.sqrt(p/r);
			break;
	}
	
	document.getElementById("volt").value = fnum2si(v,3);
	document.getElementById("amp").value = fnum2si(i,3);
	document.getElementById("watt").value = fnum2si(p,3);
}

function ohms_law_p(){
	
	var v = fsi2num(document.getElementById("volt").value);
	var i = fsi2num(document.getElementById("amp").value);
	var r = fsi2num(document.getElementById("ohm").value);
	var p = fsi2num(document.getElementById("watt").value);
	
	if (p == 0 || p == null) throw "exit"; // Exit function if field value deleted
	if (i == 0 && r == 0 && p == 0) throw "exit"; // Exit fuction if all other values blank
	
	var op = 0;
	if (r !== 0 && p !== 0) op = 3; // RP
	if (i !== 0 && p !== 0) op = 2; // IP
	if (v !== 0 && p !== 0) op = 1; // VP
	
	switch (op) {
		case 1: // VP
			i = p/v;
			r = v*v/p;
			break;
		case 2: // IP
			v = p/i;
			r = p/(i*i);
			break;
		case 3: // RP
			v = Math.sqrt(p*r);
			i = Math.sqrt(p/r);
			break;
	}
	
	document.getElementById("volt").value = fnum2si(v,3);
	document.getElementById("amp").value = fnum2si(i,3);
	document.getElementById("ohm").value = fnum2si(r,3);
}



// Old All-in-one function. I seperated it into seperate functions to
// make the other values change with the value that is being changed.
// This artifact here is just for reference purposes.
function ohms_law (){
	
	var v = fsi2num(document.getElementById("volt").value);
	var i = fsi2num(document.getElementById("amp").value);
	var r = fsi2num(document.getElementById("ohm").value);
	var p = fsi2num(document.getElementById("watt").value);
	
	var op = 0;
	if (r !== 0 && p !== 0) op = 6; // RP
	if (i !== 0 && p !== 0) op = 5; // IP
	if (i !== 0 && r !== 0) op = 4; // IR
	if (v !== 0 && p !== 0) op = 3; // VP
	if (v !== 0 && r !== 0) op = 2; // VR
	if (i !== 0 && v !== 0) op = 1; // VI
	
	switch (op) {
		case 1: // VI
			r = v/i;
			p = v*i;
			break;
		case 2: // VR
			i = v/r;
			p = v*v/r;
			break;
		case 3: // VP
			i = p/v;
			r = v*v/p;
			break;
		case 4: // IR
			v = i*r;
			p = i*i*r;
			break;
		case 5: // IP
			v = p/i;
			r = p/(i*i);
			break;
		case 6: // RP
			v = Math.sqrt(p*r);
			i = Math.sqrt(p/r);
			break;
	}
	
	document.getElementById("volt").value = fnum2si(v,3);
	document.getElementById("amp").value = fnum2si(i,3);
	document.getElementById("ohm").value = fnum2si(r,3);
	document.getElementById("watt").value = fnum2si(p,3);
}


