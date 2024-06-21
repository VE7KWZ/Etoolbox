// requires functions.js

const sig_figs = 4;

function cfg_update() {
	if (document.getElementById("config0").checked) {
		document.getElementById("outlbl").innerHTML = "Reciever Power";
    document.getElementById("outunit").innerHTML = "W";
    document.getElementById("pwrdbm_out").style = "";
		document.getElementById("inlbl").innerHTML = "RX-TX Range";
    document.getElementById("inunit").innerHTML = "m";
	}
	if (document.getElementById("config1").checked) {
		document.getElementById("outlbl").innerHTML = "RX-TX Range";
    document.getElementById("outunit").innerHTML = "m";
    document.getElementById("pwrdbm_out").style = "display:none;";
		document.getElementById("inlbl").innerHTML = "Reciever Power";
    document.getElementById("inunit").innerHTML = "W";
    document.getElementById("pwrdbm").value = "";
	}
  document.getElementById("out").value = "";
  document.getElementById("in").value = "";
}

function path_loss() {
	// https://www.rfcafe.com/references/electrical/path-loss.htm
	
  var freq = fsi2num(document.getElementById("freq").value);
  var gtx = Number(document.getElementById("txgain").value);
  var ptx = fsi2num(document.getElementById("ptx").value);
  var grx = Number(document.getElementById("rxgain").value);
  var sysloss = Number(document.getElementById("sysloss").value);
	
  var val_in = fsi2num(document.getElementById("in").value);
  
  if (sysloss > 0) sysloss *= -1;
  
  var lambda = 299792458/freq;	// Freq to wavelength
  var G_tx = 10**(gtx/10);			// dB Gain to Linear
  var G_rx = 10**(grx/10);			// dB Gain to Linear
  var loss = 10**(sysloss/10);	// dB Loss to Linear
  
  
  // Solve for RX Power
  if (document.getElementById("config0").checked) {
  	
    var prx = (ptx*G_tx*G_rx*(lambda**2))/(16*(pi**2)*(val_in**2)*loss);
    
    document.getElementById("out").value = fnum2si(prx, sig_figs);
    document.getElementById("pwrdbm").value = fnum(10*Math.log10(prx*1000),sig_figs);
  	return;
  }
  
  // Solve for RX-TX Range
  if (document.getElementById("config1").checked) {
  	
    var range = Math.sqrt((G_tx*G_rx*(lambda**2)*ptx)/(16*(pi**2)*val_in*loss));
    
    document.getElementById("out").value = fnum2si(range, sig_figs);
    return;
  }
  
}