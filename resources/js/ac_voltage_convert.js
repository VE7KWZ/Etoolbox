// functions.js required

var precision = 3;

function v_p() {
	// vp changed
	var vp = fsi2num(document.getElementById("vp").value);
	var z = fsi2num(document.getElementById("z").value);
	
	if (vp == 0 || vp == "" || vp == undefined) { clr_in(); return; }
	
	var vpp = vp*2;
	var vrms = vp/sqrt2;
	var vavg = vp*2/pi;
	var dbv = 20*Math.log10(vp/sqrt2/1);
	var dbu = 20*Math.log10(vp/sqrt2/0.7746);
	
	document.getElementById("vpp").value = fnum2si(vpp,precision);
	document.getElementById("vrms").value = fnum2si(vrms,precision);
	document.getElementById("vavg").value = fnum2si(vavg,precision);
	document.getElementById("dbv").value = fnum(dbv,precision);
	document.getElementById("dbu").value = fnum(dbu,precision);
	
	if (!(z == 0 || z == undefined)) {
		document.getElementById("pow").value = fnum2si((vrms**2)/z,precision);
		document.getElementById("dbm").value = fnum(10*Math.log10(1000*(vrms**2)/z),precision);
	}
	
}

function v_pp() {
	// vpp changed
	var vpp = fsi2num(document.getElementById("vpp").value);
	var z = fsi2num(document.getElementById("z").value);

	if (vpp == 0 || vpp == undefined) { clr_in(); return; }

	var vp = vpp/2;
	var vrms = vpp/(2*sqrt2);
	var vavg = vpp/pi;
	var dbv = 20*Math.log10(vpp/(2*sqrt2)/1);
	var dbu = 20*Math.log10(vpp/(2*sqrt2)/0.7746);
	
	document.getElementById("vp").value = fnum2si(vp,precision);
	document.getElementById("vrms").value = fnum2si(vrms,precision);
	document.getElementById("vavg").value = fnum2si(vavg,precision);
	document.getElementById("dbv").value = fnum(dbv,precision);
	document.getElementById("dbu").value = fnum(dbu,precision);
	
	if (!(z == 0 || z == undefined)) {
		document.getElementById("pow").value = fnum2si((vrms**2)/z,precision);
		document.getElementById("dbm").value = fnum(10*Math.log10(1000*(vrms**2)/z),precision);
	}

}

function v_rms() {
	// vrms changed
	var vrms = fsi2num(document.getElementById("vrms").value);
	var z = fsi2num(document.getElementById("z").value);

	if (vrms == 0 || vrms == undefined) { clr_in(); return; }

	var vp = vrms*sqrt2;
	var vpp = 2*sqrt2*vrms;
	var vavg = vrms*(2*sqrt2)/pi;
	var dbv = 20*Math.log10(vrms/1);
	var dbu = 20*Math.log10(vrms/0.7746);
	
	document.getElementById("vp").value = fnum2si(vp,precision);
	document.getElementById("vpp").value = fnum2si(vpp,precision);
	document.getElementById("vavg").value = fnum2si(vavg,precision);
	document.getElementById("dbv").value = fnum(dbv,precision);
	document.getElementById("dbu").value = fnum(dbu,precision);
	
	if (!(z == 0 || z == undefined)) {
		document.getElementById("pow").value = fnum2si((vrms**2)/z,precision);
		document.getElementById("dbm").value = fnum(10*Math.log10(1000*(vrms**2)/z),precision);
	}

}

function v_avg() {
	// vavg changed
	var vavg = fsi2num(document.getElementById("vavg").value);
	var z = fsi2num(document.getElementById("z").value);

	if (vavg == 0 || vavg == undefined) { clr_in(); return; }

	var vp = vavg*pi/2;
	var vpp = vavg*pi;
	var vrms = vavg*pi/(2*sqrt2);
	var dbv = 20*Math.log10(vavg*pi/(2*sqrt2)/1);
	var dbu = 20*Math.log10(vavg*pi/(2*sqrt2)/0.7746);
	
	document.getElementById("vp").value = fnum2si(vp,precision);
	document.getElementById("vpp").value = fnum2si(vpp,precision);
	document.getElementById("vrms").value = fnum2si(vrms,precision);
	document.getElementById("dbv").value = fnum(dbv,precision);
	document.getElementById("dbu").value = fnum(dbu,precision);
	
	if (!(z == 0 || z == undefined)) {
		document.getElementById("pow").value = fnum2si((vrms**2)/z,precision);
		document.getElementById("dbm").value = fnum(10*Math.log10(1000*(vrms**2)/z),precision);
	}

}

function f_dbv() {
	// dbv changed
	var dbv = Number(document.getElementById("dbv").value);
	var z = fsi2num(document.getElementById("z").value);
	
	if (dbv == 0 || dbv == undefined) { clr_in(); return; }
	
	var vrms = 10**(dbv/20);

	var vp = vrms*sqrt2;
	var vpp = 2*sqrt2*vrms;
	var vavg = vrms*(2*sqrt2)/pi;
	var dbu = 20*Math.log10(vrms/0.7746);
	
	document.getElementById("vp").value = fnum2si(vp,precision);
	document.getElementById("vpp").value = fnum2si(vpp,precision);
	document.getElementById("vrms").value = fnum2si(vrms,precision);
	document.getElementById("dbv").value = fnum(dbv,precision);
	document.getElementById("dbu").value = fnum(dbu,precision);
	
	if (!(z == 0 || z == undefined)) {
		document.getElementById("pow").value = fnum2si((vrms**2)/z,precision);
		document.getElementById("dbm").value = fnum(10*Math.log10(1000*(vrms**2)/z),precision);
	}

}

function f_dbu() {
	// dbu changed
	var dbu = Number(document.getElementById("dbu").value);
	var z = fsi2num(document.getElementById("z").value);
	
	if (dbu == 0 || dbu == undefined) { clr_in(); return; }
	
	var vrms = 0.7746*(10**(dbu/20));
	
	var vp = vrms*sqrt2;
	var vpp = 2*sqrt2*vrms;
	var vavg = vrms*(2*sqrt2)/pi;
	var dbv = 20*Math.log10(vavg*pi/(2*sqrt2)/1);
	
	document.getElementById("vp").value = fnum2si(vp,precision);
	document.getElementById("vpp").value = fnum2si(vpp,precision);
	document.getElementById("vrms").value = fnum2si(vrms,precision);
	document.getElementById("dbv").value = fnum(dbv,precision);
	document.getElementById("dbu").value = fnum(dbu,precision);
	
	if (!(z == 0 || z == undefined)) {
		document.getElementById("pow").value = fnum2si((vrms**2)/z,precision);
		document.getElementById("dbm").value = fnum(10*Math.log10(1000*(vrms**2)/z),precision);
	}

}

function imped() {
	// impedance changed
	var z = fsi2num(document.getElementById("z").value,precision);
	
	if (z <= 0 || z == undefined) {
		// If Z field empty, clear power and dBm fields and lock them
		document.getElementById("dbm").value = "";
		document.getElementById("pow").value = "";
		document.getElementById("dbm").setAttribute('placeholder', "Enter Impedance First");
		document.getElementById("pow").setAttribute('placeholder', "Enter Impedance First");
		document.getElementById("dbm").setAttribute('disabled', true);
		document.getElementById("pow").setAttribute('disabled', true);
		return;
	} else {
		document.getElementById("dbm").setAttribute('placeholder', "Enter Value");
		document.getElementById("pow").setAttribute('placeholder', "Enter Value");
		document.getElementById('dbm').removeAttribute('disabled');
		document.getElementById('pow').removeAttribute('disabled');
	}
	
	// call VRMS (any voltage function will do)
	v_rms();
	
}

function f_dbm() {
	// dbm changed
	var dbm = Number(document.getElementById("dbm").value);
	var z = fsi2num(document.getElementById("z").value);
	
	if (dbm == 0 || dbm == undefined) { clr_in(); return; }
	if (z == 0) return;	// If impedance undefined, do not continue
	
	var vrms = Math.sqrt(z/1000)*(10**(dbm/20));
	
	var vp = vrms*sqrt2;
	var vpp = 2*sqrt2*vrms;
	var vavg = vrms*(2*sqrt2)/pi;
	var dbv = 20*Math.log10(vavg*pi/(2*sqrt2)/1);
	var dbu = 20*Math.log10(vrms/0.7746);
	
	var pow = (10**((dbm)/10))/1000;
	
	document.getElementById("vp").value = fnum2si(vp);
	document.getElementById("vpp").value = fnum2si(vpp);
	document.getElementById("vrms").value = fnum2si(vrms);
	document.getElementById("vavg").value = fnum(vavg);
	document.getElementById("dbv").value = fnum(dbv);
	document.getElementById("dbu").value = fnum(dbu);
	document.getElementById("pow").value = fnum2si(pow);
	
}

function powr() {
	// power changed
	var pow = fsi2num(document.getElementById("pow").value);
	var z = fsi2num(document.getElementById("z").value);
	
	if (pow == 0 || pow == undefined) { clr_in(); return; }
	if (z == 0) return;	// If impedance undefined, do not continue
	
	var vrms = Math.sqrt(pow*z);
	
	var vp = vrms*sqrt2;
	var vpp = 2*sqrt2*vrms;
	var vavg = vrms*(2*sqrt2)/pi;
	var dbv = 20*Math.log10(vavg*pi/(2*sqrt2)/1);
	var dbu = 20*Math.log10(vrms/0.7746);
	
	var dbm = 10*Math.log10(pow*1000);
	
	document.getElementById("vp").value = fnum2si(vp);
	document.getElementById("vpp").value = fnum2si(vpp);
	document.getElementById("vrms").value = fnum2si(vrms);
	document.getElementById("vavg").value = fnum(vavg);
	document.getElementById("dbv").value = fnum(dbv);
	document.getElementById("dbu").value = fnum(dbu);
	document.getElementById("dbm").value = fnum(dbm);

}

function clr_in() {

	document.getElementById("vp").value = "";
	document.getElementById("vpp").value = "";
	document.getElementById("vrms").value = "";
	document.getElementById("vavg").value = "";
	document.getElementById("dbv").value = "";
	document.getElementById("dbu").value = "";
	document.getElementById("dbm").value = "";
	document.getElementById("pow").value = "";

}