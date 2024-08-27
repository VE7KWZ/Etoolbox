
var sig_figs = 4;


function yd_network() {
  
	var Rin1 = fsi2num(document.getElementById("rin1").value);
	var Rin2 = fsi2num(document.getElementById("rin2").value);
	var Rin3 = fsi2num(document.getElementById("rin3").value);
  
	//(delta === pi network, wye === tee network)
  
	if (document.getElementById("config0").checked) {
		// delta (pi) to wye (tee) resistor network
		var Rab = Rin1; var Rbc = Rin2; var Rac = Rin3;
    
		document.getElementById("rout1").value = fnum2eng(Rab*Rac/(Rab+Rac+Rbc), sig_figs); // Ra
		document.getElementById("rout2").value = fnum2eng(Rab*Rbc/(Rab+Rac+Rbc), sig_figs); // Rb
		document.getElementById("rout3").value = fnum2eng(Rac*Rbc/(Rab+Rac+Rbc), sig_figs); // Rc
	}
  
	if (document.getElementById("config1").checked) {
		// wye (tee) to delta (pi) resistor network
		var Ra = Rin1; var Rb = Rin2; var Rc = Rin3;
    
		document.getElementById("rout1").value = fnum2eng((Ra*Rb+Ra*Rc+Rb*Rc)/Rc, sig_figs); // Rab
		document.getElementById("rout2").value = fnum2eng((Ra*Rb+Ra*Rc+Rb*Rc)/Ra, sig_figs); // Rbc
		document.getElementById("rout3").value = fnum2eng((Ra*Rb+Ra*Rc+Rb*Rc)/Rb, sig_figs); // Rac
	}

}

// https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.allaboutcircuits.com%2Ftextbook%2Fdirect-current%2Fchpt-10%2Fdelta-y-and-y-conversions%2F&psig=AOvVaw2ob8sVtXtodQLUQHMLySSz