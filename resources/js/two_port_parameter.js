// http://www.calculatoredge.com/electronics/parameter%20conv.htm
// https://www.rfcafe.com/references/electrical/s-h-y-z.htm
// https://onlinelibrary.wiley.com/doi/pdf/10.1002/9780470768020.app4

// Requires functions.js
// Requires math.js

function label_chg() {
	var input_param = Number(document.getElementById("param").value);
	
	switch (input_param) {
		case 0: // S
			document.getElementById("m11").innerHTML = `S<sub>1,1</sub>`;
			document.getElementById("m12").innerHTML = `S<sub>1,2</sub>`;
			document.getElementById("m21").innerHTML = `S<sub>2,1</sub>`;
			document.getElementById("m22").innerHTML = `S<sub>2,2</sub>`;
			break;
		case 1: // Y
			document.getElementById("m11").innerHTML = `Y<sub>1,1</sub>`;
			document.getElementById("m12").innerHTML = `Y<sub>1,2</sub>`;
			document.getElementById("m21").innerHTML = `Y<sub>2,1</sub>`;
			document.getElementById("m22").innerHTML = `Y<sub>2,2</sub>`;
			break;
		case 2: // Z
			document.getElementById("m11").innerHTML = `Z<sub>1,1</sub>`;
			document.getElementById("m12").innerHTML = `Z<sub>1,2</sub>`;
			document.getElementById("m21").innerHTML = `Z<sub>2,1</sub>`;
			document.getElementById("m22").innerHTML = `Z<sub>2,2</sub>`;
			break;
		case 3: // h
			document.getElementById("m11").innerHTML = `h<sub>1,1</sub>`;
			document.getElementById("m12").innerHTML = `h<sub>1,2</sub>`;
			document.getElementById("m21").innerHTML = `h<sub>2,1</sub>`;
			document.getElementById("m22").innerHTML = `h<sub>2,2</sub>`;
			break;
		case 4: // ABCD
			document.getElementById("m11").innerHTML = `A<sub></sub>`;
			document.getElementById("m12").innerHTML = `B<sub></sub>`;
			document.getElementById("m21").innerHTML = `C<sub></sub>`;
			document.getElementById("m22").innerHTML = `D<sub></sub>`;
			break;
		case 5: // T
			document.getElementById("m11").innerHTML = `T<sub>1,1</sub>`;
			document.getElementById("m12").innerHTML = `T<sub>1,2</sub>`;
			document.getElementById("m21").innerHTML = `T<sub>2,1</sub>`;
			document.getElementById("m22").innerHTML = `T<sub>2,2</sub>`;
			break;
	}
	
	document.getElementById("m11").innerHTML += `<span style="color:#00A;"><sup>+</sup></span>`;
	document.getElementById("m12").innerHTML += `<span style="color:#00A;"><sup>+</sup></span>`;
	document.getElementById("m21").innerHTML += `<span style="color:#00A;"><sup>+</sup></span>`;
	document.getElementById("m22").innerHTML += `<span style="color:#00A;"><sup>+</sup></span>`;
	
}

// Two Port param calc
function param_calc() {
	
	var input_param = Number(document.getElementById("param").value);
	
	var z1 = document.getElementById("z1").value.replace("j","i");
	var z2 = document.getElementById("z2").value.replace("j","i");
	
	var mat11 = document.getElementById("mat11").value.replace("j","i");
	var mat12 = document.getElementById("mat12").value.replace("j","i");
	var mat21 = document.getElementById("mat21").value.replace("j","i");
	var mat22 = document.getElementById("mat22").value.replace("j","i");
	
	// Set up as complex variables
	z1 = math.complex(z1);
	z2 = math.complex(z2);
	mat11 = math.complex(mat11);
	mat12 = math.complex(mat12);
	mat21 = math.complex(mat21);
	mat22 = math.complex(mat22);
	
	switch (input_param) {
		case 0: // S
			S_conv(z1, z2, mat11, mat12, mat21, mat22);
			break;
		case 1: // Y
			Y_conv(z1, z2, mat11, mat12, mat21, mat22);
			break;
		case 2: // Z
			Z_conv(z1, z2, mat11, mat12, mat21, mat22);
			break;
		case 3: // h
			h_conv(z1, z2, mat11, mat12, mat21, mat22);
			break;
		case 4: // ABCD
			c_conv(z1, z2, mat11, mat12, mat21, mat22);
			break;
		case 5: // T
			T_conv(z1, z2, mat11, mat12, mat21, mat22);
			break;
	}
	
	
}	// Order: S Y Z h ABCD T

// For checking: https://www.jotrin.com/tool/details/ZSYACSZHJSQ
// Formula at https://empossible.net/wp-content/uploads/2018/03/IEEETransMTT_v42_n2_p205-Parameter-Conversion-Tables.pdf
// https://www.rfcafe.com/references/electrical/s-h-y-z.htm


// When S provided
function S_conv(z1, z2, s11, s12, s21, s22){
	
	// Scope
	let scope = {
		Z1: z1,
		Z2: z2,
		S11: s11,
		S12: s12,
		S21: s21,
		S22: s22
	}
	
	
	// Y PARAMETERS FROM S PARAMETERS
	var y11_expr = 'Y11 = ((1-S11)*(conj(Z2)+S22*Z2)+(S12*S21*Z2))/((conj(Z1)+S11*Z1)*(conj(Z2)+S22*Z2)-(S12*S21*Z1*Z2))';
	var y12_expr = 'Y12 = (-2*S12*sqrt(re(Z1)*re(Z2)))/((conj(Z1)+S11*Z1)*(conj(Z2)+S22*Z2)-(S12*S21*Z1*Z2))';
	var y21_expr = 'Y21 = (-2*S21*sqrt(re(Z1)*re(Z2)))/((conj(Z1)+S11*Z1)*(conj(Z2)+S22*Z2)-(S12*S21*Z1*Z2))';
	var y22_expr = 'Y22 = ((1-S22)*(conj(Z1)+S11*Z1)+(S12*S21*Z1))/((conj(Z1)+S11*Z1)*(conj(Z2)+S22*Z2)-(S12*S21*Z1*Z2))';
	
	math.evaluate(y11_expr, scope);
	math.evaluate(y12_expr, scope);
	math.evaluate(y21_expr, scope);
	math.evaluate(y22_expr, scope);
	
	
	// Z PARAMETERS FROM S PARAMETERS
	var z11_expr = 'Z11 = ((1-S22)*(conj(Z1)+S11*Z1)+(S12*S21*Z1))/((1-S11)*(1-S22)-(S12*S21))';
	var z12_expr = 'Z12 = (2*S12*sqrt(re(Z1)*re(Z2)))/((1-S11)*(1-S22)-(S12*S21))';
	var z21_expr = 'Z21 = (2*S21*sqrt(re(Z1)*re(Z2)))/((1-S11)*(1-S22)-(S12*S21))';
	var z22_expr = 'Z22 = ((1-S11)*(conj(Z2)+S22*Z2)+(S12*S21*Z2))/((1-S11)*(1-S22)-(S12*S21))';
	
	math.evaluate(z11_expr, scope);
	math.evaluate(z12_expr, scope);
	math.evaluate(z21_expr, scope);
	math.evaluate(z22_expr, scope);
	
	
	// h PARAMETERS FROM S PARAMETERS
	var h11_expr = 'h11 = ((conj(Z1)+S11*Z1)*(conj(Z2)+S22*Z2)-(S12*S21*Z1*Z2))/((1-S11)*(conj(Z2)+S22*Z2)+(S12*S21*Z2))';
	var h12_expr = 'h12 = (2*S12*sqrt(re(Z1)*re(Z2)))/((1-S11)*(conj(Z2)+S22*Z2)+(S12*S21*Z2))';
	var h21_expr = 'h21 = (-2*S21*sqrt(re(Z1)*re(Z2)))/((1-S11)*(conj(Z2)+S22*Z2)+(S12*S21*Z2))';
	var h22_expr = 'h22 = ((1-S11)*(1-S22)-(S12*S21))/((1-S11)*(conj(Z2)+S22*Z2)+(S12*S21*Z2))';
	
	math.evaluate(h11_expr, scope);
	math.evaluate(h12_expr, scope);
	math.evaluate(h21_expr, scope);
	math.evaluate(h22_expr, scope);
	
	
	// ABCD PARAMETERS FROM S PARAMETERS
	var A_expr = 'A = ((conj(Z1)+S11*Z1)*(1-S22)+(S12*S21*Z1))/(2*S21*sqrt(re(Z1)*re(Z2)))';
	var B_expr = 'B = ((conj(Z1)+S11*Z1)*(conj(Z2)+S22*Z2)-(S12*S21*Z1*Z2))/(2*S21*sqrt(re(Z1)*re(Z2)))';
	var C_expr = 'C = ((1-S11)*(1-S22)-(S12*S21))/(2*S21*sqrt(re(Z1)*re(Z2)))';
	var D_expr = 'D = ((1-S11)*(conj(Z2)+S22*Z2)+(S12*S21*Z2))/(2*S21*sqrt(re(Z1)*re(Z2)))';
	
	math.evaluate(A_expr, scope);
	math.evaluate(B_expr, scope);
	math.evaluate(C_expr, scope);
	math.evaluate(D_expr, scope);
	
	
	// T PARAMETERS FROM ABCD PARAMETERS
	var t11_expr = 'T11 = (A*Z2+B+(C*Z1*Z2)+D*Z1)/(2*sqrt(re(Z1)*re(Z2)))';
	var t12_expr = 'T12 = (A*conj(Z2)-B+(C*Z1*conj(Z2))-D*Z1)/(2*sqrt(re(Z1)*re(Z2)))';
	var t21_expr = 'T21 = (A*Z2+B-(C*conj(Z1)*Z2)-D*conj(Z1))/(2*sqrt(re(Z1)*re(Z2)))';
	var t22_expr = 'T22 = (A*conj(Z2)-B-(C*conj(Z1)*conj(Z2))+D*conj(Z1))/(2*sqrt(re(Z1)*re(Z2)))';
	
	math.evaluate(t11_expr, scope);
	math.evaluate(t12_expr, scope);
	math.evaluate(t21_expr, scope);
	math.evaluate(t22_expr, scope);
	
	
	output_evalresult(scope);
}

// When Y provided
function Y_conv(z1, z2, y11, y12, y21, y22){
	
	// Scope
	let scope = {
		Z1: z1,
		Z2: z2,
		Y11: y11,
		Y12: y12,
		Y21: y21,
		Y22: y22
	}
	
	
	// S PARAMETERS FROM Y PARAMETERS
	var s11_expr = 'S11 = ((1-Y11*conj(Z1))*(1+Y22*Z2)+(Y12*Y21*conj(Z1)*Z2))/((1+Y11*Z1)*(1+Y22*Z2)-(Y12*Y21*Z1*Z2))';
	var s12_expr = 'S12 = (-2*Y12*sqrt(re(Z1)*re(Z2)))/((1+Y11*Z1)*(1+Y22*Z2)-(Y12*Y21*Z1*Z2))';
	var s21_expr = 'S21 = (-2*Y21*sqrt(re(Z1)*re(Z2)))/((1+Y11*Z1)*(1+Y22*Z2)-(Y12*Y21*Z1*Z2))';
	var s22_expr = 'S22 = ((1+Y11*Z1)*(1-Y22*conj(Z2))+(Y12*Y21*Z1*conj(Z2)))/((1+Y11*Z1)*(1+Y22*Z2)-(Y12*Y21*Z1*Z2))';
	
	math.evaluate(s11_expr, scope);
	math.evaluate(s12_expr, scope);
	math.evaluate(s21_expr, scope);
	math.evaluate(s22_expr, scope);
	
	
	// Z PARAMETERS FROM S PARAMETERS
	var z11_expr = 'Z11 = ((1-S22)*(conj(Z1)+S11*Z1)+(S12*S21*Z1))/((1-S11)*(1-S22)-(S12*S21))';
	var z12_expr = 'Z12 = (2*S12*sqrt(re(Z1)*re(Z2)))/((1-S11)*(1-S22)-(S12*S21))';
	var z21_expr = 'Z21 = (2*S21*sqrt(re(Z1)*re(Z2)))/((1-S11)*(1-S22)-(S12*S21))';
	var z22_expr = 'Z22 = ((1-S11)*(conj(Z2)+S22*Z2)+(S12*S21*Z2))/((1-S11)*(1-S22)-(S12*S21))';
	
	math.evaluate(z11_expr, scope);
	math.evaluate(z12_expr, scope);
	math.evaluate(z21_expr, scope);
	math.evaluate(z22_expr, scope);
	
	
	// h PARAMETERS FROM S PARAMETERS
	var h11_expr = 'h11 = ((conj(Z1)+S11*Z1)*(conj(Z2)+S22*Z2)-(S12*S21*Z1*Z2))/((1-S11)*(conj(Z2)+S22*Z2)+(S12*S21*Z2))';
	var h12_expr = 'h12 = (2*S12*sqrt(re(Z1)*re(Z2)))/((1-S11)*(conj(Z2)+S22*Z2)+(S12*S21*Z2))';
	var h21_expr = 'h21 = (-2*S21*sqrt(re(Z1)*re(Z2)))/((1-S11)*(conj(Z2)+S22*Z2)+(S12*S21*Z2))';
	var h22_expr = 'h22 = ((1-S11)*(1-S22)-(S12*S21))/((1-S11)*(conj(Z2)+S22*Z2)+(S12*S21*Z2))';
	
	math.evaluate(h11_expr, scope);
	math.evaluate(h12_expr, scope);
	math.evaluate(h21_expr, scope);
	math.evaluate(h22_expr, scope);
	
	
	// ABCD PARAMETERS FROM S PARAMETERS
	var A_expr = 'A = ((conj(Z1)+S11*Z1)*(1-S22)+(S12*S21*Z1))/(2*S21*sqrt(re(Z1)*re(Z2)))';
	var B_expr = 'B = ((conj(Z1)+S11*Z1)*(conj(Z2)+S22*Z2)-(S12*S21*Z1*Z2))/(2*S21*sqrt(re(Z1)*re(Z2)))';
	var C_expr = 'C = ((1-S11)*(1-S22)-(S12*S21))/(2*S21*sqrt(re(Z1)*re(Z2)))';
	var D_expr = 'D = ((conj(Z2)+S22*Z2)*(1-S11)+(S12*S21*Z2))/(2*S21*sqrt(re(Z1)*re(Z2)))';
	
	math.evaluate(A_expr, scope);
	math.evaluate(B_expr, scope);
	math.evaluate(C_expr, scope);
	math.evaluate(D_expr, scope);
	
	
	// T PARAMETERS FROM Y PARAMETERS
	var t11_expr = 'T11 = ((-1-Y11*Z1)*(1+Y22*Z2)+(Y12*Y21*Z1*Z2))/(2*Y21*sqrt(re(Z1)*re(Z2)))';
 	var t12_expr = 'T12 = ((1+Y11*Z1)*(1-Y22*conj(Z2))+(Y12*Y21*Z1*conj(Z2)))/(2*Y21*sqrt(re(Z1)*re(Z2)))';
	var t21_expr = 'T21 = ((Y11*conj(Z1)-1)*(1+Y22*Z2)-(Y12*Y21*conj(Z1)*Z2))/(2*Y21*sqrt(re(Z1)*re(Z2)))';
	var t22_expr = 'T22 = ((1-Y11*conj(Z1))*(1-Y22*conj(Z2))-(Y12*Y21*conj(Z1)*conj(Z2)))/(2*Y21*sqrt(re(Z1)*re(Z2)))';
	
	math.evaluate(t11_expr, scope);
	math.evaluate(t12_expr, scope);
	math.evaluate(t21_expr, scope);
	math.evaluate(t22_expr, scope);
	
	
	output_evalresult(scope);
}

// When Z provided
function Z_conv(z1, z2, z11, z12, z21, z22){
	
	// Scope
	let scope = {
		Z1: z1,
		Z2: z2,
		Z11: z11,
		Z12: z12,
		Z21: z21,
		Z22: z22
	}
	
	
	// S PARAMETERS FROM Z PARAMETERS
	var s11_expr = 'S11 = ((Z11-conj(Z1))*(Z22+Z2)-(Z12*Z21))/((Z11+Z1)*(Z22+Z2)-(Z12*Z21))';
	var s12_expr = 'S12 = (2*Z12*sqrt(re(Z1)*re(Z2)))/((Z11+Z1)*(Z22+Z2)-(Z12*Z21))';
	var s21_expr = 'S21 = (2*Z21*sqrt(re(Z1)*re(Z2)))/((Z11+Z1)*(Z22+Z2)-(Z12*Z21))';
	var s22_expr = 'S22 = ((Z11+Z1)*(Z22-conj(Z2))-(Z12*Z21))/((Z11+Z1)*(Z22+Z2)-(Z12*Z21))';
	
	math.evaluate(s11_expr, scope);
	math.evaluate(s12_expr, scope);
	math.evaluate(s21_expr, scope);
	math.evaluate(s22_expr, scope);
	
	
	// Y PARAMETERS FROM S PARAMETERS
	var y11_expr = 'Y11 = ((1-S11)*(conj(Z2)+S22*Z2)+(S12*S21*Z2))/((conj(Z1)+S11*Z1)*(conj(Z2)+S22*Z2)-(S12*S21*Z1*Z2))';
	var y12_expr = 'Y12 = (-2*S12*sqrt(re(Z1)*re(Z2)))/((conj(Z1)+S11*Z1)*(conj(Z2)+S22*Z2)-(S12*S21*Z1*Z2))';
	var y21_expr = 'Y21 = (-2*S21*sqrt(re(Z1)*re(Z2)))/((conj(Z1)+S11*Z1)*(conj(Z2)+S22*Z2)-(S12*S21*Z1*Z2))';
	var y22_expr = 'Y22 = ((1-S22)*(conj(Z1)+S11*Z1)+(S12*S21*Z1))/((conj(Z1)+S11*Z1)*(conj(Z2)+S22*Z2)-(S12*S21*Z1*Z2))';
	
	math.evaluate(y11_expr, scope);
	math.evaluate(y12_expr, scope);
	math.evaluate(y21_expr, scope);
	math.evaluate(y22_expr, scope);
	
	
	// h PARAMETERS FROM S PARAMETERS
	var h11_expr = 'h11 = ((conj(Z1)+S11*Z1)*(conj(Z2)+S22*Z2)-(S12*S21*Z1*Z2))/((1-S11)*(conj(Z2)+S22*Z2)+(S12*S21*Z2))';
	var h12_expr = 'h12 = (2*S12*sqrt(re(Z1)*re(Z2)))/((1-S11)*(conj(Z2)+S22*Z2)+(S12*S21*Z2))';
	var h21_expr = 'h21 = (-2*S21*sqrt(re(Z1)*re(Z2)))/((1-S11)*(conj(Z2)+S22*Z2)+(S12*S21*Z2))';
	var h22_expr = 'h22 = ((1-S11)*(1-S22)-(S12*S21))/((1-S11)*(conj(Z2)+S22*Z2)+(S12*S21*Z2))';
	
	math.evaluate(h11_expr, scope);
	math.evaluate(h12_expr, scope);
	math.evaluate(h21_expr, scope);
	math.evaluate(h22_expr, scope);
	
	
	// ABCD PARAMETERS FROM S PARAMETERS
	var A_expr = 'A = ((conj(Z1)+S11*Z1)*(1-S22)+(S12*S21*Z1))/(2*S21*sqrt(re(Z1)*re(Z2)))';
	var B_expr = 'B = ((conj(Z1)+S11*Z1)*(conj(Z2)+S22*Z2)-(S12*S21*Z1*Z2))/(2*S21*sqrt(re(Z1)*re(Z2)))';
	var C_expr = 'C = ((1-S11)*(1-S22)-(S12*S21))/(2*S21*sqrt(re(Z1)*re(Z2)))';
	var D_expr = 'D = ((conj(Z2)+S22*Z2)*(1-S11)+(S12*S21*Z2))/(2*S21*sqrt(re(Z1)*re(Z2)))';
	
	math.evaluate(A_expr, scope);
	math.evaluate(B_expr, scope);
	math.evaluate(C_expr, scope);
	math.evaluate(D_expr, scope);
	
	
	// T PARAMETERS FROM Z PARAMETERS
	var t11_expr = 'T11 = ((Z11+Z1)*(Z22+Z2)-(Z12*Z21))/(2*Z21*sqrt(re(Z1)*re(Z2)))';
	var t12_expr = 'T12 = ((Z11+Z1)*(conj(Z2)-Z22)+(Z12*Z21))/(2*Z21*sqrt(re(Z1)*re(Z2)))';
	var t21_expr = 'T21 = ((Z11-conj(Z1))*(Z22+Z2)-(Z12*Z21))/(2*Z21*sqrt(re(Z1)*re(Z2)))';
	var t22_expr = 'T22 = ((conj(Z1)-Z11)*(Z22-conj(Z2))+(Z12*Z21))/(2*Z21*sqrt(re(Z1)*re(Z2)))';
	
	math.evaluate(t11_expr, scope);
	math.evaluate(t12_expr, scope);
	math.evaluate(t21_expr, scope);
	math.evaluate(t22_expr, scope);
	
	
	output_evalresult(scope);
}

// When h provided
function h_conv(z1, z2, h11, h12, h21, h22){
	
	// Scope
	let scope = {
		Z1: z1,
		Z2: z2,
		h11: h11,
		h12: h12,
		h21: h21,
		h22: h22
	}
	
	
	// S PARAMETERS FROM h PARAMETERS
	var s11_expr = 'S11 = ((h11-conj(Z1))*(1+h22*Z2)-(h12*h21*Z2))/((Z1+h11)*(1+h22*Z2)-(h12*h21*Z2))';
	var s12_expr = 'S12 = (2*h12*sqrt(re(Z1)*re(Z2)))/((Z1+h11)*(1+h22*Z2)-(h12*h21*Z2))';
	var s21_expr = 'S21 = (-2*h21*sqrt(re(Z1)*re(Z2)))/((Z1+h11)*(1+h22*Z2)-(h12*h21*Z2))';
	var s22_expr = 'S22 = ((Z1+h11)*(1-h22*conj(Z2))+(h12*h21*conj(Z2)))/((Z1+h11)*(1+h22*Z2)-(h12*h21*Z2))';
	
	math.evaluate(s11_expr, scope);
	math.evaluate(s12_expr, scope);
	math.evaluate(s21_expr, scope);
	math.evaluate(s22_expr, scope);
	
	
	// Y PARAMETERS FROM S PARAMETERS
	var y11_expr = 'Y11 = ((1-S11)*(conj(Z2)+S22*Z2)+(S12*S21*Z2))/((conj(Z1)+S11*Z1)*(conj(Z2)+S22*Z2)-(S12*S21*Z1*Z2))';
	var y12_expr = 'Y12 = (-2*S12*sqrt(re(Z1)*re(Z2)))/((conj(Z1)+S11*Z1)*(conj(Z2)+S22*Z2)-(S12*S21*Z1*Z2))';
	var y21_expr = 'Y21 = (-2*S21*sqrt(re(Z1)*re(Z2)))/((conj(Z1)+S11*Z1)*(conj(Z2)+S22*Z2)-(S12*S21*Z1*Z2))';
	var y22_expr = 'Y22 = ((1-S22)*(conj(Z1)+S11*Z1)+(S12*S21*Z1))/((conj(Z1)+S11*Z1)*(conj(Z2)+S22*Z2)-(S12*S21*Z1*Z2))';
	
	math.evaluate(y11_expr, scope);
	math.evaluate(y12_expr, scope);
	math.evaluate(y21_expr, scope);
	math.evaluate(y22_expr, scope);
	
	
	// Z PARAMETERS FROM S PARAMETERS
	var z11_expr = 'Z11 = ((1-S22)*(conj(Z1)+S11*Z1)+(S12*S21*Z1))/((1-S11)*(1-S22)-(S12*S21))';
	var z12_expr = 'Z12 = (2*S12*sqrt(re(Z1)*re(Z2)))/((1-S11)*(1-S22)-(S12*S21))';
	var z21_expr = 'Z21 = (2*S21*sqrt(re(Z1)*re(Z2)))/((1-S11)*(1-S22)-(S12*S21))';
	var z22_expr = 'Z22 = ((1-S11)*(conj(Z2)+S22*Z2)+(S12*S21*Z2))/((1-S11)*(1-S22)-(S12*S21))';
	
	math.evaluate(z11_expr, scope);
	math.evaluate(z12_expr, scope);
	math.evaluate(z21_expr, scope);
	math.evaluate(z22_expr, scope);
	
	
	// ABCD PARAMETERS FROM S PARAMETERS
	var A_expr = 'A = ((conj(Z1)+S11*Z1)*(1-S22)+(S12*S21*Z1))/(2*S21*sqrt(re(Z1)*re(Z2)))';
	var B_expr = 'B = ((conj(Z1)+S11*Z1)*(conj(Z2)+S22*Z2)-(S12*S21*Z1*Z2))/(2*S21*sqrt(re(Z1)*re(Z2)))';
	var C_expr = 'C = ((1-S11)*(1-S22)-(S12*S21))/(2*S21*sqrt(re(Z1)*re(Z2)))';
	var D_expr = 'D = ((conj(Z2)+S22*Z2)*(1-S11)+(S12*S21*Z2))/(2*S21*sqrt(re(Z1)*re(Z2)))';
	
	math.evaluate(A_expr, scope);
	math.evaluate(B_expr, scope);
	math.evaluate(C_expr, scope);
	math.evaluate(D_expr, scope);
	
	
	// T PARAMETERS FROM h PARAMETERS
	var t11_expr = 'T11 = ((-h11-Z1)*(1+h22*Z2)+(h12*h21*Z2))/(2*h21*sqrt(re(Z1)*re(Z2)))';
	var t12_expr = 'T12 = ((h11+Z1)*(1-h22*conj(Z2))+(h12*h21*conj(Z2)))/(2*h21*sqrt(re(Z1)*re(Z2)))';
	var t21_expr = 'T21 = ((conj(Z1)-h11)*(1+h22*Z2)+(h12*h21*Z2))/(2*h21*sqrt(re(Z1)*re(Z2)))';
	var t22_expr = 'T22 = ((h11-conj(Z1))*(1-h22*conj(Z2))+(h12*h21*conj(Z2)))/(2*h21*sqrt(re(Z1)*re(Z2)))';
	
	math.evaluate(t11_expr, scope);
	math.evaluate(t12_expr, scope);
	math.evaluate(t21_expr, scope);
	math.evaluate(t22_expr, scope);
	
	
	output_evalresult(scope);
}

// When ABCD provided
function c_conv(z1, z2, a, b, c, d){
	
	// Scope
	let scope = {
		Z1: z1,
		Z2: z2,
		A: a,
		B: b,
		C: c,
		D: d
	}
	
	
	// S PARAMETERS FROM ABCD PARAMETERS
	var s11_expr = 'S11 = (A*Z2+B-C*conj(Z1)*Z2-D*conj(Z1))/(A*Z2+B+C*Z1*Z2+D*Z1)';
	var s12_expr = 'S12 = (2*(A*D-B*C)*sqrt(re(Z1)*re(Z2)))/(A*Z2+B+C*Z1*Z2+D*Z1)';
	var s21_expr = 'S21 = (2*sqrt(re(Z1)*re(Z2)))/(A*Z2+B+C*Z1*Z2+D*Z1)';
	var s22_expr = 'S22 = (-A*conj(Z2)+B-C*Z1*conj(Z2)+D*Z1)/(A*Z2+B+C*Z1*Z2+D*Z1)';
	
	math.evaluate(s11_expr, scope);
	math.evaluate(s12_expr, scope);
	math.evaluate(s21_expr, scope);
	math.evaluate(s22_expr, scope);
	
	
	// Y PARAMETERS FROM S PARAMETERS
	var y11_expr = 'Y11 = ((1-S11)*(conj(Z2)+S22*Z2)+(S12*S21*Z2))/((conj(Z1)+S11*Z1)*(conj(Z2)+S22*Z2)-(S12*S21*Z1*Z2))';
	var y12_expr = 'Y12 = (-2*S12*sqrt(re(Z1)*re(Z2)))/((conj(Z1)+S11*Z1)*(conj(Z2)+S22*Z2)-(S12*S21*Z1*Z2))';
	var y21_expr = 'Y21 = (-2*S21*sqrt(re(Z1)*re(Z2)))/((conj(Z1)+S11*Z1)*(conj(Z2)+S22*Z2)-(S12*S21*Z1*Z2))';
	var y22_expr = 'Y22 = ((1-S22)*(conj(Z1)+S11*Z1)+(S12*S21*Z1))/((conj(Z1)+S11*Z1)*(conj(Z2)+S22*Z2)-(S12*S21*Z1*Z2))';
	
	math.evaluate(y11_expr, scope);
	math.evaluate(y12_expr, scope);
	math.evaluate(y21_expr, scope);
	math.evaluate(y22_expr, scope);
	
	
	// Z PARAMETERS FROM S PARAMETERS
	var z11_expr = 'Z11 = ((1-S22)*(conj(Z1)+S11*Z1)+(S12*S21*Z1))/((1-S11)*(1-S22)-(S12*S21))';
	var z12_expr = 'Z12 = (2*S12*sqrt(re(Z1)*re(Z2)))/((1-S11)*(1-S22)-(S12*S21))';
	var z21_expr = 'Z21 = (2*S21*sqrt(re(Z1)*re(Z2)))/((1-S11)*(1-S22)-(S12*S21))';
	var z22_expr = 'Z22 = ((1-S11)*(conj(Z2)+S22*Z2)+(S12*S21*Z2))/((1-S11)*(1-S22)-(S12*S21))';
	
	math.evaluate(z11_expr, scope);
	math.evaluate(z12_expr, scope);
	math.evaluate(z21_expr, scope);
	math.evaluate(z22_expr, scope);
	
	
	// h PARAMETERS FROM S PARAMETERS
	var h11_expr = 'h11 = ((conj(Z1)+S11*Z1)*(conj(Z2)+S22*Z2)-(S12*S21*Z1*Z2))/((1-S11)*(conj(Z2)+S22*Z2)+(S12*S21*Z2))';
	var h12_expr = 'h12 = (2*S12*sqrt(re(Z1)*re(Z2)))/((1-S11)*(conj(Z2)+S22*Z2)+(S12*S21*Z2))';
	var h21_expr = 'h21 = (-2*S21*sqrt(re(Z1)*re(Z2)))/((1-S11)*(conj(Z2)+S22*Z2)+(S12*S21*Z2))';
	var h22_expr = 'h22 = ((1-S11)*(1-S22)-(S12*S21))/((1-S11)*(conj(Z2)+S22*Z2)+(S12*S21*Z2))';
	
	math.evaluate(h11_expr, scope);
	math.evaluate(h12_expr, scope);
	math.evaluate(h21_expr, scope);
	math.evaluate(h22_expr, scope);
	
	
	// T PARAMETERS FROM ABCD PARAMETERS
	var t11_expr = 'T11 = (A*Z2+B+(C*Z1*Z2)+D*Z1)/(2*sqrt(re(Z1)*re(Z2)))';
	var t12_expr = 'T12 = (A*conj(Z2)-B+(C*Z1*conj(Z2))-D*Z1)/(2*sqrt(re(Z1)*re(Z2)))';
	var t21_expr = 'T21 = (A*Z2+B-(C*conj(Z1)*Z2)-D*conj(Z1))/(2*sqrt(re(Z1)*re(Z2)))';
	var t22_expr = 'T22 = (A*conj(Z2)-B-(C*conj(Z1)*conj(Z2))+D*conj(Z1))/(2*sqrt(re(Z1)*re(Z2)))';
	
	math.evaluate(t11_expr, scope);
	math.evaluate(t12_expr, scope);
	math.evaluate(t21_expr, scope);
	math.evaluate(t22_expr, scope);
	
	
	output_evalresult(scope);
}

// When T provided
function T_conv(z1, z2, t11, t12, t21, t22){
	
	// Scope
	let scope = {
		Z1: z1,
		Z2: z2,
		T11: t11,
		T12: t12,
		T21: t21,
		T22: t22
	}
	
	
	// Y PARAMETERS FROM T PARAMETERS
	var y11_expr = 'Y11 = (conj(Z2)*(T11-T21)-Z2*(T12-T22))/((T11*conj(Z1)*conj(Z2))-(T12*conj(Z1)*Z2)+(T21*Z1*conj(Z2))-(T22*Z1*Z2))';
	var y12_expr = 'Y12 = (-2*sqrt(re(Z1)*re(Z2))*(T11*T22-T12*T21))/((T11*conj(Z1)*conj(Z2))-(T12*conj(Z1)*Z2)+(T21*Z1*conj(Z2))-(T22*Z1*Z2))';
	var y21_expr = 'Y21 = (-2*sqrt(re(Z1)*re(Z2)))/((T11*conj(Z1)*conj(Z2))-(T12*conj(Z1)*Z2)+(T21*Z1*conj(Z2))-(T22*Z1*Z2))';
	var y22_expr = 'Y22 = (conj(Z1)*(T11+T12)+Z1*(T21+T22))/((T11*conj(Z1)*conj(Z2))-(T12*conj(Z1)*Z2)+(T21*Z1*conj(Z2))-(T22*Z1*Z2))';
	
	math.evaluate(y11_expr, scope);
	math.evaluate(y12_expr, scope);
	math.evaluate(y21_expr, scope);
	math.evaluate(y22_expr, scope);
	
	
	// S PARAMETERS FROM Y PARAMETERS
	var s11_expr = 'S11 = ((1-Y11*conj(Z1))*(1+Y22*Z2)+(Y12*Y21*conj(Z1)*Z2))/((1+Y11*Z1)*(1+Y22*Z2)-(Y12*Y21*Z1*Z2))';
	var s12_expr = 'S12 = (-2*Y12*sqrt(re(Z1)*re(Z2)))/((1+Y11*Z1)*(1+Y22*Z2)-(Y12*Y21*Z1*Z2))';
	var s21_expr = 'S21 = (-2*Y21*sqrt(re(Z1)*re(Z2)))/((1+Y11*Z1)*(1+Y22*Z2)-(Y12*Y21*Z1*Z2))';
	var s22_expr = 'S22 = ((1+Y11*Z1)*(1-Y22*conj(Z2))+(Y12*Y21*Z1*conj(Z2)))/((1+Y11*Z1)*(1+Y22*Z2)-(Y12*Y21*Z1*Z2))';
	
	math.evaluate(s11_expr, scope);
	math.evaluate(s12_expr, scope);
	math.evaluate(s21_expr, scope);
	math.evaluate(s22_expr, scope);
	
	
	// Z PARAMETERS FROM T PARAMETERS
	var z11_expr = 'Z11 = (conj(Z1)*(T11+T12)+Z1*(T21+T22))/(T11+T12-T21-T22)';
	var z12_expr = 'Z12 = (2*sqrt(re(Z1)*re(Z2))*(T11*T22-T12*T21))/(T11+T12-T21-T22)';
	var z21_expr = 'Z21 = (2*sqrt(re(Z1)*re(Z2)))/(T11+T12-T21-T22)';
	var z22_expr = 'Z22 = (conj(Z2)*(T11-T21)-Z2*(T12-T22))/(T11+T12-T21-T22)';
	
	math.evaluate(z11_expr, scope);
	math.evaluate(z12_expr, scope);
	math.evaluate(z21_expr, scope);
	math.evaluate(z22_expr, scope);
	
	
	// h PARAMETERS FROM T PARAMETERS
	var h11_expr = 'h11 = (T11*conj(Z1)*conj(Z2)-T12*conj(Z1)*Z2+T21*Z1*conj(Z2)-T22*Z1*Z2)/(T11*conj(Z2)-T12*Z2-T21*conj(Z2)+T22*Z2)';
	var h12_expr = 'h12 = (2*sqrt(re(Z1)*re(Z2))*(T11*T22-T12*T21))/(T11*conj(Z2)-T12*Z2-T21*conj(Z2)+T22*Z2)';
	var h21_expr = 'h21 = (-2*sqrt(re(Z1)*re(Z2)))/(T11*conj(Z2)-T12*Z2-T21*conj(Z2)+T22*Z2)';
	var h22_expr = 'h22 = (T11+T12-T21-T22)/(T11*conj(Z2)-T12*Z2-T21*conj(Z2)+T22*Z2)';
	
	
	math.evaluate(h11_expr, scope);
	math.evaluate(h12_expr, scope);
	math.evaluate(h21_expr, scope);
	math.evaluate(h22_expr, scope);
	
	
	// ABCD PARAMETERS FROM T PARAMETERS
	var A_expr = 'A = (conj(Z1)*(T11+T12)+Z1*(T21+T22))/(2*sqrt(re(Z1)*re(Z2)))';
	var B_expr = 'B = (conj(Z2)*(T11*conj(Z1)+T21*Z1)-Z2*(T12*conj(Z1)+T22*Z1))/(2*sqrt(re(Z1)*re(Z2)))';
	var C_expr = 'C = (T11+T12-T21-T22)/(2*sqrt(re(Z1)*re(Z2)))';
	var D_expr = 'D = (conj(Z2)*(T11-T21)-Z2*(T12-T22))/(2*sqrt(re(Z1)*re(Z2)))';
	
	math.evaluate(A_expr, scope);
	math.evaluate(B_expr, scope);
	math.evaluate(C_expr, scope);
	math.evaluate(D_expr, scope);
	
	
	output_evalresult(scope);
}


// Output
function output_evalresult(scope) {
	
	var prec = 6; // precision
	var result = "";
	
	// toFixed all numbers to clear out any rounding errors
	for (const key in scope) {
		scope[key].re = fnum(scope[key].re,12);
		scope[key].im = fnum(scope[key].im,12);
	}
	
	// S
	result += "S11 = " + scope.S11.format(prec).replace("i","j") + "\n";
	result += "S12 = " + scope.S12.format(prec).replace("i","j") + "\n";
	result += "S21 = " + scope.S21.format(prec).replace("i","j") + "\n";
	result += "S22 = " + scope.S22.format(prec).replace("i","j") + "\n\n";
	// Y
	result += "Y11 = " + scope.Y11.format(prec).replace("i","j") + "\n";
	result += "Y12 = " + scope.Y12.format(prec).replace("i","j") + "\n";
	result += "Y21 = " + scope.Y21.format(prec).replace("i","j") + "\n";
	result += "Y22 = " + scope.Y22.format(prec).replace("i","j") + "\n\n";
	// Z
	result += "Z11 = " + scope.Z11.format(prec).replace("i","j") + "\n";
	result += "Z12 = " + scope.Z12.format(prec).replace("i","j") + "\n";
	result += "Z21 = " + scope.Z21.format(prec).replace("i","j") + "\n";
	result += "Z22 = " + scope.Z22.format(prec).replace("i","j") + "\n\n";
	// h
	result += "h11 = " + scope.h11.format(prec).replace("i","j") + "\n";
	result += "h12 = " + scope.h12.format(prec).replace("i","j") + "\n";
	result += "h21 = " + scope.h21.format(prec).replace("i","j") + "\n";
	result += "h22 = " + scope.h22.format(prec).replace("i","j") + "\n\n";
	// abcd
	result += "A =   " + scope.A.format(prec).replace("i","j") + "\n";
	result += "B =   " + scope.B.format(prec).replace("i","j") + "\n";
	result += "C =   " + scope.C.format(prec).replace("i","j") + "\n";
	result += "D =   " + scope.D.format(prec).replace("i","j") + "\n\n";
	// T
	result += "T11 = " + scope.T11.format(prec).replace("i","j") + "\n";
	result += "T12 = " + scope.T12.format(prec).replace("i","j") + "\n";
	result += "T21 = " + scope.T21.format(prec).replace("i","j") + "\n";
	result += "T22 = " + scope.T22.format(prec).replace("i","j");
	
	// Number of rows for output
	document.getElementById("output").rows = result.split(/\r\n|\r|\n/).length;
	
	// Print result
	document.getElementById("output").value = result;

}
