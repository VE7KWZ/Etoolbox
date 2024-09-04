// requires functions.js

function cfg_chg() {
	if (document.getElementById("config0").checked) {
		document.getElementById("time").readOnly = true;
		document.getElementById("time").placeholder = "";
		document.getElementById("res").readOnly = false;
		document.getElementById("res").placeholder = "Enter Value";
	}
	
	if (document.getElementById("config1").checked) {
		document.getElementById("time").readOnly = false;
		document.getElementById("time").placeholder = "Enter Value";
		document.getElementById("res").readOnly = true;
		document.getElementById("res").placeholder = "";
	}
}

var sig_figs = 5;

function cap_discharge() {

	var cap = fsi2num(document.getElementById("cap").value);
	var vo = fsi2num(document.getElementById("vo").value);
	var vc = fsi2num(document.getElementById("vc").value);
	var res = fsi2num(document.getElementById("res").value);
	var t = fsi2num(document.getElementById("time").value);
	
	
	// vc = vo * exp(-t/RC)
	if (document.getElementById("config0").checked)
		t = -res*cap*Math.log(vc/vo);
		
	if (document.getElementById("config1").checked)
		res = -t/(Math.log(vc/vo)*cap);
	
	var pow = vo*vo/res;
	var energy = 0.5*cap*vo*vo;
	
	document.getElementById("cap").value = fnum2eng(cap, sig_figs);
	document.getElementById("vo").value = fnum2eng(vo, sig_figs);
	document.getElementById("vc").value = fnum2eng(vc, sig_figs);
	document.getElementById("res").value = fnum2eng(res, sig_figs);
	document.getElementById("time").value = fnum2eng(t, sig_figs);
	document.getElementById("pow").value = fnum2eng(pow, sig_figs);
	document.getElementById("energy").value = fnum2eng(energy, sig_figs);

}