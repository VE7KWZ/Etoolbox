// **********************************************************************************************************
// Wye Delta Resistor Network Conversion [wye_delta_network.htm]
// **********************************************************************************************************
function yd_network() {
  
	var Rin1 = Number(document.getElementById("rin1").value);
	var Rin2 = Number(document.getElementById("rin2").value);
	var Rin3 = Number(document.getElementById("rin3").value);
  
	//(delta === pi network, wye === tee network)
  
	if (document.getElementById("config0").checked) {
		// delta (pi) to wye (tee) resistor network
		var Rab = Rin1; var Rbc = Rin2; var Rac = Rin3;
    
		document.getElementById("rout1").value = Rab*Rac/(Rab+Rac+Rbc); // Ra
		document.getElementById("rout2").value = Rab*Rbc/(Rab+Rac+Rbc); // Rb
		document.getElementById("rout3").value = Rac*Rbc/(Rab+Rac+Rbc); // Rc
	}
  
	if (document.getElementById("config1").checked) {
		// wye (tee) to delta (pi) resistor network
		var Ra = Rin1; var Rb = Rin2; var Rc = Rin3;
    
		document.getElementById("rout1").value = (Ra*Rb+Ra*Rc+Rb*Rc)/Rc; // Rab
		document.getElementById("rout2").value = (Ra*Rb+Ra*Rc+Rb*Rc)/Ra; // Rbc
		document.getElementById("rout3").value = (Ra*Rb+Ra*Rc+Rb*Rc)/Rb; // Rac
	}

}

// https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.allaboutcircuits.com%2Ftextbook%2Fdirect-current%2Fchpt-10%2Fdelta-y-and-y-conversions%2F&psig=AOvVaw2ob8sVtXtodQLUQHMLySSz