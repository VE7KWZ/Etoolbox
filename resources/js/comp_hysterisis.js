// requires functions.js

var sig_figs = 4;

function comp_hyst() {
	
	var series = fsi2num(document.getElementById("series").value);
	var vref = fsi2num(document.getElementById("vref").value);
	var voh = fsi2num(document.getElementById("voh").value);
	var vol = fsi2num(document.getElementById("vol").value);
	var vth = fsi2num(document.getElementById("vth").value);
	var vtl = fsi2num(document.getElementById("vtl").value);
	
	var b = (vref*(vth-vtl))/((vref-vth)*(vtl-vol)-(vref-vtl)*(vth-voh));
	var a = (vtl+b*(vtl-vol))/(vref-vtl);
	
 	var r2 = 10000;
	
	var r1 = r2/a;
	var r3 = r2/b;
	
	document.getElementById("r1").value = fnum2eng(r1, sig_figs);
	document.getElementById("r2").value = fnum2eng(r2, sig_figs);
	document.getElementById("r3").value = fnum2eng(r3, sig_figs);
	
}


