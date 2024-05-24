// **********************************************************************************************************
// Wye Delta Resistor Network Conversion [wye_delta_network.htm]
// **********************************************************************************************************
function yd_network() {
  
	var Rin1 = fsi2num(document.getElementById("rin1").value);
	var Rin2 = fsi2num(document.getElementById("rin2").value);
	var Rin3 = fsi2num(document.getElementById("rin3").value);
  
	//(delta === pi network, wye === tee network)
  
	if (document.getElementById("config0").checked) {
		// delta (pi) to wye (tee) resistor network
		var Rab = Rin1; var Rbc = Rin2; var Rac = Rin3;
    
		document.getElementById("rout1").value = fnum(Rab*Rac/(Rab+Rac+Rbc),2); // Ra
		document.getElementById("rout2").value = fnum(Rab*Rbc/(Rab+Rac+Rbc),2); // Rb
		document.getElementById("rout3").value = fnum(Rac*Rbc/(Rab+Rac+Rbc),2); // Rc
	}
  
	if (document.getElementById("config1").checked) {
		// wye (tee) to delta (pi) resistor network
		var Ra = Rin1; var Rb = Rin2; var Rc = Rin3;
    
		document.getElementById("rout1").value = fnum((Ra*Rb+Ra*Rc+Rb*Rc)/Rc,2); // Rab
		document.getElementById("rout2").value = fnum((Ra*Rb+Ra*Rc+Rb*Rc)/Ra,2); // Rbc
		document.getElementById("rout3").value = fnum((Ra*Rb+Ra*Rc+Rb*Rc)/Rb,2); // Rac
	}

}

// https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.allaboutcircuits.com%2Ftextbook%2Fdirect-current%2Fchpt-10%2Fdelta-y-and-y-conversions%2F&psig=AOvVaw2ob8sVtXtodQLUQHMLySSz