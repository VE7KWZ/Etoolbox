
//	https://helloworld922.blogspot.com/2014/11/experimenting-with-diodes-and-non.html
//	https://electronics.stackexchange.com/questions/559667/how-to-determine-the-ideality-factor-n-of-a-diode-from-the-datasheet
//	https://github.com/wuyongzheng/wuyongzheng.github.com/tree/master/diode-fitting
//	http://utkstair.org/clausius/docs/mse301/pdf/intronumericalrecipes_v01_chapter05_rootfindsys.pdf
//	https://www.researchgate.net/profile/Rachid-Masrour/publication/290506513_Two_methods_for_extracting_the_parameters_of_a_non-ideal_diode/links/56a166ef08ae27f7de266b7f/Two-methods-for-extracting-the-parameters-of-a-non-ideal-diode.pdf
//	https://www.allaboutcircuits.com/textbook/semiconductors/chpt-3/spice-models/
//	https://en.wikipedia.org/wiki/Newton%27s_method#:~:text=In%20numerical%20analysis%2C%20Newton%27s%20method,of%20a%20real%2Dvalued%20function.
//	https://electronics.stackexchange.com/questions/559667/how-to-determine-the-ideality-factor-n-of-a-diode-from-the-datasheet

// inspiration from:
// https://wuyongzheng.github.io/diode-fitting/diode-fitting.html



// requires functions.js

const sig_figs = 4;

function diode_params(){
	// Timer
	console.time("Runtime");
	startTime = performance.now();
	
	// Clear output box
	document.getElementById("output").value = '';
	
	var TA = Number(document.getElementById("amb_temp").value);
	var vi_points = document.getElementById("vi_points").value;
	
	// parse input
	vi_points = vi_points.replace(/[\t\f\cK ]+/g, ""); // Remove whitespace, but not new lines
	vi_points = vi_points.replace(/[\r?\n]+/g, "\n");	// Remove consecutive new lines
	vi_points = vi_points.replace(/^[\r?\n]+|[\r?\n]+$/g, "");	// Remove new lines at start and end of list
	vi_points = vi_points.split(/[\r?\n]/); // Split all new lines (rows) into pairs of V-I points
	
	//console.log(vi_points);
	
	if (vi_points.length < 3) {
		document.getElementById("output").value = "3 or more V-I points required."
		return;
	}
	
	var v = []; var i = [];
	for (k = 0; k < vi_points.length; k++) {
		v[k] = Number(vi_points[k].split(",")[0]);
		i[k] = Number(vi_points[k].split(",")[1]);
	}
	
	//console.log(v);
	//console.log(i);
	
	var VT = 8.61733034e-5 * ( 273.15 + TA );	// Thermal Voltage
	
	// Parameters: P[0] = N, P[1] = IS, P[2] = RS
	// function: Vd = N*VT*ln(1+(Id/IS))+RS*Id
	fn = function(x,P){return x.map(function(xi){
		return P[0]*VT*Math.log((xi/P[1])+1)+P[2]*xi;
	});}
	
	var NIsRs = fminsearch(fn,[2,1e-12,3],i,v,{maxIter:6000,display:false});
	
	console.log(NIsRs);
	
	result = "";
	result += fstring(" N =\t{1}\nIS =\t{2}\nRS =\t{3}",fnum2si(NIsRs[0],sig_figs), fnum2si(NIsRs[1],sig_figs), fnum2si(NIsRs[2],sig_figs));
	result += fstring("\n\nSpice Model:\n.MODEL diodeName D(IS={1} RS={2} N={3})",
						fnum2eng(NIsRs[1],sig_figs), fnum2eng(NIsRs[2],sig_figs), fnum2eng(NIsRs[0],sig_figs));
	
	// Number of rows for output
	document.getElementById("output").rows = result.split(/\r\n|\r|\n/).length;
	
	// Print result
	document.getElementById("output").value = result;
	
	// Calculation Time
	console.timeEnd("Runtime");
	document.getElementById("time").innerHTML = fstring("Time: {1}ms (approx)", fnum(performance.now()-startTime, 4));

}

// Test Cases

// Test 1 v,i
//	0.552, 200e-6
//	0.842, 20e-3
//	1.158, 200e-3
// Result N,IS,RS
//	2.282820621434911, 1.6412831075974897e-8, 1.0052772539099295

// Test 2 v,i
//	1.59214e-1, 1.00000e-4
//	2.18182e-1, 9.66217e-4
//	2.81572e-1,9.02036e-3
//	3.71499e-1,	1.05290e-1 
//	5.80835e-1,1.10860e+0
//	8.37346e-1, 1.14736e+1
//	9.67076e-1,2.28144e+1
// Result N,IS,RS
//	1.7219148039949106, 0.000007030363990270337, 0.01427631406519347


////////////////////////////////////////////////////////////////////////
// https://github.com/jonasalmeida/fminsearch

fminsearch=function(fun,Parm0,x,y,Opt){ // fun = function(x,Parm)
	// example
	//
	// x = [32,37,42,47,52,57,62,67,72,77,82,87,92];y=[749,1525,1947,2201,2380,2537,2671,2758,2803,2943,3007,2979,2992]
	// fun = function(x,P){return x.map(function(xi){return (P[0]+1/(1/(P[1]*(xi-P[2]))+1/P[3]))})}
	// Parms=jmat.fminsearch(fun,[100,30,10,5000],x,y)
	//
	// Another test:
	// x=[32,37,42,47,52,57,62,67,72,77,82,87,92];y=[0,34,59,77,99,114,121,133,146,159,165,173,170];
	//
	// Opt is an object will all other parameters, from the objective function (cost function), to the 
	// number of iterations, initial step vector and the display switch, for example
	// Parms=fminsearch(fun,[100,30,10,5000],x,y,{maxIter:10000,display:false})
	
	if(!Opt){Opt={}};
	if(!Opt.maxIter){Opt.maxIter=1000};
	if(!Opt.step){// initial step is 1/100 of initial value (remember not to use zero in Parm0)
		Opt.step=Parm0.map(function(p){return p/100});
		Opt.step=Opt.step.map(function(si){if(si==0){return 1}else{ return si}}); // convert null steps into 1's
	};
	if(typeof(Opt.display)=='undefined'){Opt.display=true};
	if(!Opt.objFun){Opt.objFun=function(y,yp){return y.map(function(yi,i){return Math.pow((yi-yp[i]),2)}).reduce(function(a,b){return a+b})}} //SSD
	
	var cloneVector=function(V){return V.map(function(v){return v})};
	var ya,y0,yb,fP0,fP1;
	var P0=cloneVector(Parm0),P1=cloneVector(Parm0);
	var n = P0.length;
	var step=Opt.step;
	var funParm=function(P){return Opt.objFun(y,fun(x,P))}//function (of Parameters) to minimize
	// silly multi-univariate screening
	for(var i=0;i<Opt.maxIter;i++){
		for(var j=0;j<n;j++){ // take a step for each parameter
			P1=cloneVector(P0);
			P1[j]+=step[j];
			if(funParm(P1)<funParm(P0)){ // if parm value going in the righ direction
				step[j]=1.2*step[j]; // then go a little faster
				P0=cloneVector(P1);
			}
			else{
				step[j]=-(0.5*step[j]); // otherwiese reverse and go slower
			}	
		}
		if(Opt.display){if(i>(Opt.maxIter-10)){console.log(i+1,funParm(P0),P0)}}
	}
	if (!!document.getElementById('plot')){ // if there is then use it
		fminsearch.plot(x,y,fun(x,P0),P0);
	}
	return P0
}
	


