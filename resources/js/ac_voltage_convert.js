// **********************************************************************************************************
// Voltage Conversion Calculator [ac_voltage_convert.htm]													*
// **********************************************************************************************************
function volt_power() {
	console.log("Component Combination Calculator");
	
	// Clear output box
	document.getElementById("output").value = '';
	
	// 0:Vp, 1:Vpp, 2:Vrms, 3:Vavg, 4:P, 5:dbm
	unit = Number(document.getElementById("input_type").value); 	// Set input type
	Zo = fsi2num(document.getElementById("impedance_in").value);	// Input Impedance
	value = fsi2num(document.getElementById("value_in").value); 	// Input Value
	
	Vp = 0; Vpp = 0; Vrms = 0;
	Vavg = 0; P = 0; dbm = 0;
	
	switch (unit) {
		case 0:
			// If Vp provided
			Vp = value;
			Vpp = Vp*2;
			Vrms = Vp/Math.sqrt(2);
			Vavg = Vp*2/Math.PI;
			
			break;
		case 1:
			// If Vpp provided
			Vpp = value;
			Vp = Vpp/2;
			Vrms = Vpp/(2*Math.sqrt(2));
			Vavg = Vpp/Math.PI;
			
			break;
		case 2:
			// If Vrms provided
			Vrms = value;
			Vp = Vrms*Math.sqrt(2);
			Vpp = 2*Math.sqrt(2)*Vrms;
			Vavg = Vrms*(2*Math.sqrt(2))/Math.PI;
		
			break;
		case 3:
			// If Vavg provided
			Vavg = value;
			Vp = Vavg*Math.PI/2;
			Vpp = Vavg*Math.PI;
			Vrms = Vavg*Math.PI/(2*Math.sqrt(2));
			
			break;
		case 4:
			// If Zo (input impedance) and Pmw provided
			P = value;
			Vrms = Math.sqrt(P*Zo);
			Vp = Vrms*Math.sqrt(2);
			Vpp = 2*Math.sqrt(2)*Vrms;
			Vavg = Vrms*(2*Math.sqrt(2))/Math.PI;
			
			dbm = 10*Math.log10(P*1000);
			
			break;
		case 5:
			// If Zo (input impedance) and dbm provided
			dbm = value;
			Vrms = Math.sqrt(Zo/1000)*(10**(dbm/20));
			Vp = Vrms*Math.sqrt(2);
			Vpp = 2*Math.sqrt(2)*Vrms;
			Vavg = Vrms*(2*Math.sqrt(2))/Math.PI;
			
			P = (10**((dbm)/10))/1000;
			
			break;
	}
	
	result = fstring("Vp = {1}V\nVpp = {2}V\nVrms = {3}V\nVavg = {4}V", 
						fnum2si(Vp,3,true), fnum2si(Vpp,3,true),
						fnum2si(Vrms,3,true), fnum2si(Vavg,3,true)
						);
	
	if (Zo || unit >= 3) {
		P = (Vrms**2)/Zo;
		dbm = 10*Math.log10(P*1000);
		
		result += fstring("\n\nZo = {1}Ohms\nP = {2}W\ndBm = {3}", 
							fnum2si(Zo,3,true), fnum2si(P,3,true), fnum(dbm,4)
							);
		
		
	}
	
	
	
	console.log([Vp, Vpp, Vrms, Vavg, P, dbm]);
	
	
	
	// Number of rows for output
	document.getElementById("output").rows = result.split(/\r\n|\r|\n/).length;
	
	// Print result
	document.getElementById("output").value = result;

	
}