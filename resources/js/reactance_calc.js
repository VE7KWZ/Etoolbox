// functions.js required

const sig_figs = 3;

function comp_chg() {
	console.log("c");
	// component changes
	var component = document.getElementById("component").value;
	var frequency = document.getElementById("frequency").value;
	var reactance = document.getElementById("reactance").value;
	
	var comp = fsi2num(component);
	var freq = fsi2num(frequency);
	var reac = fsi2num(reactance);
	
	// Blank if box cleared
	if (component == "") { document.getElementById("component").value = ""; return; }
	
	// Calculate Reactance (Component and Frequency Provided)
	if (frequency != "" && document.getElementById("config0").checked) {	// frequency provided (capacitive)
		document.getElementById("reactance").value = fnum2eng(1/(2*pi*freq*comp), sig_figs); 
		return; 
	}
	
	if (frequency != "" && document.getElementById("config1").checked) {	// frequency provided (inductive)
		document.getElementById("reactance").value = fnum2eng(2*pi*freq*comp, sig_figs); 
		return;
	}
	
	// Calculate Frequency (Component and Reactance Provided)
	if (reactance != "" && document.getElementById("config0").checked) {	// reactance provided (capacitive)
		document.getElementById("frequency").value = fnum2eng(1/(2*pi*reac*comp), sig_figs); 
		return; 
	}
	
	if (reactance != "" && document.getElementById("config1").checked) {	// reactance provided (inductive)
		document.getElementById("frequency").value = fnum2eng(reac/(2*pi*comp), sig_figs); 
		return; 
	}
	
}

function freq_chg() {
	console.log("f");
	// frequency changes
	var component = document.getElementById("component").value;
	var frequency = document.getElementById("frequency").value;
	var reactance = document.getElementById("reactance").value;
	
	var comp = fsi2num(component);
	var freq = fsi2num(frequency);
	var reac = fsi2num(reactance);
	
	// Blank if box cleared
	if (frequency == "") { document.getElementById("frequency").value = ""; return; }
	
	// Calculate Reactance (Component and Frequency Provided)
	if (component != "" && document.getElementById("config0").checked) {	// component provided (capacitive)
		document.getElementById("reactance").value = fnum2eng(1/(2*pi*freq*comp), sig_figs); 
		return; 
	}
	
	if (component != "" && document.getElementById("config1").checked) {	// component provided (inductive)
		document.getElementById("reactance").value = fnum2eng(2*pi*freq*comp, sig_figs); 
		return;
	}
	
	// Calculate Component (Frequency and Reactance Provided)
	if (reactance != "" && document.getElementById("config0").checked) {	// reactance provided (capacitive)
		document.getElementById("component").value = fnum2eng(1/(2*pi*freq*reac), sig_figs); 
		return; 
	}
	
	if (reactance != "" && document.getElementById("config1").checked) {	// reactance provided (inductive)
		document.getElementById("component").value = fnum2eng(reac/(2*pi*freq), sig_figs); 
		return; 
	}
	
}

function reac_chg() {
	console.log("X");
	// reactance changes
	var component = document.getElementById("component").value;
	var frequency = document.getElementById("frequency").value;
	var reactance = document.getElementById("reactance").value;
	
	var comp = fsi2num(component);
	var freq = fsi2num(frequency);
	var reac = fsi2num(reactance);
	
	// Blank if box cleared
	if (reactance == "") { document.getElementById("reactance").value = ""; return; }
	
	// Calculate Frequency (Reactance and Component Provided)
	if (component != "" && document.getElementById("config0").checked) {	// component provided (capacitive)
		document.getElementById("frequency").value = fnum2eng(1/(2*pi*reac*comp), sig_figs); 
		return; 
	}
	
	if (component != "" && document.getElementById("config1").checked) {	// component provided (inductive)
		document.getElementById("frequency").value = fnum2eng(reac/(2*pi*comp), sig_figs); 
		return;
	}
	
	// Calculate Component (Frequency and Reactance Provided)
	if (frequency != "" && document.getElementById("config0").checked) {	// frequency provided (capacitive)
		document.getElementById("component").value = fnum2eng(1/(2*pi*freq*reac), sig_figs); 
		return; 
	}
	
	if (frequency != "" && document.getElementById("config1").checked) {	// frequency provided (inductive)
		document.getElementById("component").value = fnum2eng(reac/(2*pi*freq), sig_figs); 
		return; 
	}
	
}

function comp_slct() {
	if (document.getElementById("config0").checked) {
		document.getElementById("c_label").innerHTML = "Capacitance";
		document.getElementById("c_unit").innerHTML = "F<span style='color:#A00;'>*</span>";
	}
	if (document.getElementById("config1").checked) {
		document.getElementById("c_label").innerHTML = "Inductance";
		document.getElementById("c_unit").innerHTML = "H<span style='color:#A00;'>*</span>";
	}
	comp_chg();
}