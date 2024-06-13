// **********************************************************************************************************
// Ohms Law Calculator [ohms_law.htm]
// **********************************************************************************************************
var prev_in = ""; // Previous input that changed
var curr_in = ""; // Current input that changed

function ohms_law_v(){
	if (curr_in != "volt") {
		prev_in = curr_in;
  	curr_in = "volt";
  }
  
  in_track();
  
	var v = fsi2num(document.getElementById("volt").value);
	var i = fsi2num(document.getElementById("amp").value);
	var r = fsi2num(document.getElementById("ohm").value);
	var p = fsi2num(document.getElementById("watt").value);
	
	if (v == 0 || v == null) return; // Exit fuction if field value deleted
	if (i == 0 && r == 0 && p == 0) return; // Exit fuction if all other values blank
  if (document.getElementById(prev_in).value == "") return;
  
	var op = 0;
  if (prev_in == "watt") op = 3; // VP
  if (prev_in == "ohm") op = 2; // VR
  if (prev_in == "amp") op = 1; // VI
	
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
	if (curr_in != "amp") {
  	prev_in = curr_in;
  	curr_in = "amp";
  }
  
  in_track();
  
	var v = fsi2num(document.getElementById("volt").value);
	var i = fsi2num(document.getElementById("amp").value);
	var r = fsi2num(document.getElementById("ohm").value);
	var p = fsi2num(document.getElementById("watt").value);
	
	if (i == 0 || i == null) return; // Exit function if field value deleted
	if (i == 0 && r == 0 && p == 0) return; // Exit fuction if all other values blank
	if (document.getElementById(prev_in).value == "") return;
  
	var op = 0;
  if (prev_in == "watt") op = 3; // IP
  if (prev_in == "ohm") op = 2; // IR
  if (prev_in == "volt") op = 1; // VI
	
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
	if (curr_in != "ohm") {
		prev_in = curr_in;
	  curr_in = "ohm";
  }
  
  in_track();
  
	var v = fsi2num(document.getElementById("volt").value);
	var i = fsi2num(document.getElementById("amp").value);
	var r = fsi2num(document.getElementById("ohm").value);
	var p = fsi2num(document.getElementById("watt").value);
	
  //  throw "exit"
	if (r == 0 || r == null) return; // Exit function if field value deleted   
	if (i == 0 && r == 0 && p == 0) return; // Exit fuction if all other values blank
	if (document.getElementById(prev_in).value == "") return;
  
	var op = 0;
	if (prev_in == "watt") op = 3; // RP
	if (prev_in == "amp") op = 2; // IR
	if (prev_in == "volt") op = 1; // VR
	
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
	if (curr_in != "watt") {
		prev_in = curr_in;
	  curr_in = "watt";
  }
  
  in_track();
  
	var v = fsi2num(document.getElementById("volt").value);
	var i = fsi2num(document.getElementById("amp").value);
	var r = fsi2num(document.getElementById("ohm").value);
	var p = fsi2num(document.getElementById("watt").value);
	
	if (p == 0 || p == null) return; // Exit function if field value deleted
	if (i == 0 && r == 0 && p == 0) return; // Exit fuction if all other values blank
  if (document.getElementById(prev_in).value == "") return;
  
	var op = 0;
	if (prev_in == "ohm") op = 3; // RP
  if (prev_in == "amp") op = 2; // IP
  if (prev_in == "volt") op = 1; // VP
	
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

function in_track(){
  // Which input was last, and second to last. Tracker adds border to the left of input to indicate.
  var id = ["volt","amp","ohm","watt"];
  var k = 0;
  
  for (i=0; i < 4; i++){
  	if (document.getElementById(id[i]).value == "") k++;
  	document.getElementById(id[i]).style = "";
  	if (curr_in == id[i]) document.getElementById(id[i]).style = "border-left: 2px solid #A22;";
    if (prev_in == id[i]) document.getElementById(id[i]).style = "border-left: 2px solid #722;";
  }
  
  if (k == 4) {
  	for (i=0; i < 4; i++) document.getElementById(id[i]).style = "";
    curr_in = "";
    prev_in = "";
  }
  
}



// Old All-in-one function. I seperated it into seperate functions to
// make the other values change with the value that is being changed.
// This artifact here is just for reference purposes.
function ohms_law_old (){
	
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


