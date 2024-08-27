// Easter Eggs

// Meow!
document.getElementById("title_c").addEventListener("click", function() { meow();});

function meow() {
	
	var imageurl = "https://thecatapi.com/api/images/get?format=src&d=" + Date.now();
	var div_id = "meow" + Date.now();
	
	var slider = document.createElement('div');
	document.body.appendChild(slider);
	
	slider.setAttribute("id", div_id);
	slider.classList.add("flier");
	slider.setAttribute("style", "width: 40vw; height: 30vh; z-index: 999; position: absolute; top: -30vh; left: 30vw;");
	slider.innerHTML = "<img src=" + imageurl + " style='width: inherit;'>";
	
	slider.addEventListener('animationend', () => {
		slider.remove();
	});
	
}


// Text color shuffle
document.getElementById("title_e").addEventListener("click", function() { clrshft('title_e'); });

function clrshft(id_str) {
	
	//const toRGBArray = rgbStr => rgbStr.match(/\d+/g).map(Number);
	//document.getElementById(id_str).setAttribute("onclick", "");
	document.getElementById(id_str).setAttribute("onmouseout", "clrshft('" + id_str + "');");
	document.getElementById(id_str).style.transition = "color 0.15s";
	var rgb = toRGBArray(document.getElementById(id_str).style.color);
	var hsl = rgbToHsl(rgb[0],rgb[1],rgb[2]);
	
	var n = 16; // number of colors in cycle
	hsl[2] = 0.6; // lightness 0=black, 1=white
	
	hsl[0] = Math.round((hsl[0]*360)+180+(360/n)+(90/n))%360;
	hsl[1] = hsl[1]*100 + "%";
	hsl[2] = hsl[2]*100 + "%";
	
	document.getElementById(id_str).style.color = "hsl("+ hsl[0] + "," + hsl[1] +","+ hsl[2] +")";
}

// Convert RGB string rgb([0-255],[0-255],[0-255]) to
// an array of RGB values [R,G,B].
function toRGBArray(rgbStr) {
	return rgbStr.match(/\d+/g).map(Number);
}

/**
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and l in the set [0, 1].
 *
 * @param	 Number	r			 The red color value
 * @param	 Number	g			 The green color value
 * @param	 Number	b			 The blue color value
 * @return	Array					 The HSL representation
 */
function rgbToHsl(r, g, b) {
	r /= 255, g /= 255, b /= 255;

	var max = Math.max(r, g, b), min = Math.min(r, g, b);
	var h, s, l = (max + min) / 2;

	if (max == min) {
		h = s = 0; // achromatic
	} else {
		var d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

		switch (max) {
			case r: h = (g - b) / d + (g < b ? 6 : 0); break;
			case g: h = (b - r) / d + 2; break;
			case b: h = (r - g) / d + 4; break;
		}

		h /= 6;
	}

	return [ h, s, l ];
}

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param	 Number	h			 The hue
 * @param	 Number	s			 The saturation
 * @param	 Number	l			 The lightness
 * @return	Array					 The RGB representation
 */
function hslToRgb(h, s, l) {
	var r, g, b;

	if (s == 0) {
		r = g = b = l; // achromatic
	} else {
		function hue2rgb(p, q, t) {
			if (t < 0) t += 1;
			if (t > 1) t -= 1;
			if (t < 1/6) return p + (q - p) * 6 * t;
			if (t < 1/2) return q;
			if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
			return p;
		}

		var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		var p = 2 * l - q;

		r = hue2rgb(p, q, h + 1/3);
		g = hue2rgb(p, q, h);
		b = hue2rgb(p, q, h - 1/3);
	}

	return [ r * 255, g * 255, b * 255 ];
}