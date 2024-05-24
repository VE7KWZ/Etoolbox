// requires functions.js

const sig_figs = 3;

function r_attenuator() {
	
	var Zo = fsi2num(document.getElementById("impedance").value);	// Line Impedance of input and output
	var dB = Number(document.getElementById("atten").value); 		// dB of attenuation
	
	var R1 = 0;
	var R2 = 0;
  
	
	// Pi Attenuator
	R1 = Zo*((10**(dB/20)+1)/(10**(dB/20)-1));
	R2 = (Zo/2)*(10**(dB/10)-1)/(10**(dB/20));
	
	//	--o--[ R2 ]--o--
	//	  |		 	 |
	//	[R1 ]	   [ R1]
	//	  |		 	 |
	
	var result = "Pi Attenuator\n\n"
	result += " --o--[R2]--o--\n   |        |\n  [R1]     [R1]\n   |        |\n";
	result += fstring("\nR1 = {1}\nR2 = {2}\n\n", fnum2si(R1, sig_figs), fnum2si(R2, sig_figs));
  
  
  
	// Tee Attenuator
	R1 = Zo*((10**(dB/20)-1)/(10**(dB/20)+1));
	R2 = 2*Zo*(10**(dB/20)/(10**(dB/10)-1));
  
	// --[ R1 ]--o--[ R1 ]--
	//			 |
	//		   [R2 ]
	//			 |
	
	result += "\n**************************\nTee Attenuator\n\n"
	result += " --[R1]--o--[R1]--\n         |\n        [R2]\n         |\n";
	result += fstring("\nR1 = {1}\nR2 = {2}\n\n", fnum2si(R1, sig_figs), fnum2si(R2, sig_figs));
  
  
  
	// Bridged Tee Attenuator
	R1 = Zo*(10**(dB/20)-1);
	R2 = Zo/(10**(dB/20)-1);
	
  
	//	o-----[ R1 ]------o
	//	|				  |
	// -o[ Zo ]--o--[ Zo ]o-
	//			 |
	//		   [R2 ]
	//			 |
	
	result += "\n**************************\nBridged Tee Attenuator\n\n"
	result += "  o-----[R1]----o\n  |             |\n--o-[Zo]-o-[Zo]-o--\n         |\n        [R2]\n         |\n";
	result += fstring("\nR1 = {1}\nR2 = {2}\n\n", fnum2si(R1, sig_figs), fnum2si(R2, sig_figs));
	
	
	// Number of rows for output
	document.getElementById("output").rows = result.split(/\r\n|\r|\n/).length;
	
	// Print result
	document.getElementById("output").value = result;
  
  
}




function fstring (str_in, ...args) {
	// Example: fstring("test ID{1}. First Name:{2}. Code:{3}", id, name, 1234);
	
	for (let n = 0; n < args.length; n++) str_in = str_in.replace("{"+ (n+1) +"}", args[n]);
	return str_in;
}
