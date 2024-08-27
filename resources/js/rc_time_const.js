// requires functions.js

// Time required for a capacitor to charge to 1-exp(-1) (approx 63.2%) times the supply voltage
// 1tau ~ 63.2%, 2tau ~ 86.5%, 3tau ~ 95.0%, 4tau ~ 98.2%, 5tau ~ 99.3%, 6tau ~ 99.8%, 7tau ~ 99.9%

// tau = R*C;

const sig_figs = 4;

function resistor() {
	// R provided
	var res = fsi2num(document.getElementById("res").value);	
	var cap = fsi2num(document.getElementById("cap").value);
	var tau = fsi2num(document.getElementById("tau").value);
	
	if ((tau == 0 || tau == undefined) && (cap == 0 || cap == undefined)) return;
	
	if (!(cap == 0 || cap == undefined)) {
		document.getElementById("tau").value = fnum2eng(res*cap, sig_figs);
		involt();
		return;
	}
		
	if (!(tau == 0 || tau == undefined)) {
		document.getElementById("cap").value = fnum2eng(tau/res, sig_figs);
		return;
	}
	
}

function capacitor() {
	// C provided
	var res = fsi2num(document.getElementById("res").value);
	var cap = fsi2num(document.getElementById("cap").value);
	var tau = fsi2num(document.getElementById("tau").value);
	
	if ((tau == 0 || tau == undefined) && (res == 0 || res == undefined)) return;
	
	if (!(res == 0 || res == undefined)) {
		document.getElementById("tau").value = fnum2eng(res*cap, sig_figs);
		involt();
		return;
	}
	
	if (!(tau == 0 || tau == undefined)) {
		document.getElementById("res").value = fnum2eng(tau/cap, sig_figs);
		return;	
	}
	
}

function time_const() {
	// Tau provided
	var res = fsi2num(document.getElementById("res").value);
	var cap = fsi2num(document.getElementById("cap").value);
	var tau = fsi2num(document.getElementById("tau").value);
	
	if ((cap == 0 || cap == undefined) && 
			(res == 0 || res == undefined) ||
			(tau == 0 || tau == undefined)) return;
	
	if (!(cap == 0 || cap == undefined)) {
		document.getElementById("res").value = fnum2eng(tau/cap, sig_figs);
		return;
	}
	
	if (!(res == 0 || res == undefined)) {
		document.getElementById("cap").value = fnum2eng(tau/res, sig_figs);
		return;
	}
	
}

// ----------------------------
// Vo/Vi = (1-Math.exp(-t/RC));

function input_volt() {
	// input voltage provided
	var tau = fsi2num(document.getElementById("tau").value);
	var vi = fsi2num(document.getElementById("volt_in").value);
	var vo = fsi2num(document.getElementById("volt_out").value);
	var tvo = fsi2num(document.getElementById("t_vo").value);
	
	if ((tau == 0 || tau == undefined) || (vi == 0 || vi == undefined)) return;
	
	if (!(vo == 0 || vo == undefined)) {	// vi & vo = tvo
		document.getElementById("t_vo").value = fnum2eng(-tau*Math.log(1-(vo/vi)), sig_figs);
		return;
	}
	
	if (!(tvo == 0 || tvo == undefined)) { // vi & tvo = vo
		document.getElementById("volt_out").value = fnum2eng(vi*(1-Math.exp(-tvo/tau)), sig_figs);
		return;
	}
	
}

function output_volt() {
	// output voltage provided
	var tau = fsi2num(document.getElementById("tau").value);
	var vi = fsi2num(document.getElementById("volt_in").value);
	var vo = fsi2num(document.getElementById("volt_out").value);
	var tvo = fsi2num(document.getElementById("t_vo").value);
	
	if ((tau == 0 || tau == undefined) || (vo == 0 || vo == undefined)) return;
	
	if (!(vi == 0 || vi == undefined)) {	// vi & vo = tvo
		document.getElementById("t_vo").value = fnum2eng(-tau*Math.log(1-(vo/vi)), sig_figs);
		return;
	}
	
	if (!(tvo == 0 || tvo == undefined)) { // vo & tvo = vi
		document.getElementById("volt_in").value = fnum2eng(vo/(1-Math.exp(-tvo/tau)), sig_figs);
		return;
	}

}

function charge_time() {
	// charge time to output voltage provided
	var tau = fsi2num(document.getElementById("tau").value);
	var vi = fsi2num(document.getElementById("volt_in").value);
	var vo = fsi2num(document.getElementById("volt_out").value);
	var tvo = fsi2num(document.getElementById("t_vo").value);
	
	if ((tau == 0 || tau == undefined) || (tvo == 0 || tvo == undefined)) return;
	
	if (!(vi == 0 || vi == undefined)) {	// vi & tvo = vo
		document.getElementById("volt_out").value = fnum2eng(vi*(1-Math.exp(-tvo/tau)), sig_figs);
		return;
	}
	
	if (!(vo == 0 || vo == undefined)) { // vo & tvo = vi
		document.getElementById("volt_in").value = fnum2eng(vo/(1-Math.exp(-tvo/tau)), sig_figs);
		return;
	}

	
}


document.getElementById("tau").addEventListener("keyup", 
	function(){ 
		input_volt(); 
		output_volt();
		charge_time(); 
	}
);


function involt() {
	var tau = Number(document.getElementById("tau").value);
	if (tau == 0 || tau == undefined || tau == null) {
		document.getElementById("volt_in").value = "";
		document.getElementById("volt_out").value = "";
		document.getElementById("t_vo").value = "";
		document.getElementById("volt_in").setAttribute("placeholder", "RC Time Constant Required");
		document.getElementById("volt_out").setAttribute("placeholder", "RC Time Constant Required");
		document.getElementById("t_vo").setAttribute("placeholder", "RC Time Constant Required");
		document.getElementById("volt_in").setAttribute("disabled", "true");
		document.getElementById("volt_out").setAttribute("disabled", "true");
		document.getElementById("t_vo").setAttribute("disabled", "true");
	} else {
		document.getElementById("volt_in").setAttribute("placeholder", "Enter Value");
		document.getElementById("volt_out").setAttribute("placeholder", "Enter Value");
		document.getElementById("t_vo").setAttribute("placeholder", "Enter Value");
		document.getElementById("volt_in").removeAttribute("disabled");
		document.getElementById("volt_out").removeAttribute("disabled");
		document.getElementById("t_vo").removeAttribute("disabled");
	}
	
	input_volt(); output_volt(); charge_time(); 
	return;
}