// **********************************************************************************************************
// Ohms Law Calculator [ohms_law.htm]
// **********************************************************************************************************
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


