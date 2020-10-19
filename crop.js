javascript: document.body.style.userSelect = 'none';
firstClick = false;
var d = document.createElement("div");
d.id = "ggRectSelector";
d.style.border = "1px dotted #000";
d.style.backgroundColor = "blue";
d.style.opacity = '0.3';
d.style.position = "absolute";
d.hidden = true;
document.body.appendChild(d);
var div = document.getElementById('ggRectSelector'), x1 = 0, y1 = 0, x2 = 0, y2 = 0;
function reCalc() {
	var x3 = Math.min(x1, x2);
	var x4 = Math.max(x1, x2);
	var y3 = Math.min(y1, y2);
	var y4 = Math.max(y1, y2);
	div.style.left = x3 + 'px';
	div.style.top = y3 + 'px';
	div.style.width = x4 - x3 + 'px';
	div.style.height = y4 - y3 + 'px';
} onmousedown = function (e) {
	div.hidden = 0;
	x1 = e.clientX;
	y1 = e.clientY;
	reCalc();
	console.log(x1, y1);
	firstClick = true;
};
onmousemove = function (e) {
	x2 = e.clientX;
	y2 = e.clientY;
	if (firstClick == true) {
		reCalc();
	}
};
onmouseup = function (e) {
	div.hidden = 1;
	console.log(x2, y2);
	ggProcessPage(x1, x2, y1, y2);
	onmousedown = '';
	onmouseup = '';
	onmousemove = '';
};
function ggProcessPage(x1, x2, y1, y2) {
	a = [];
	comp = {};
	comp.x = x1;
	comp.widht = x2 - x1;
	comp.y = y1;
	comp.height = y2 - y1;
	d = document.body.getElementsByTagName('*');
	for (var i = 0;
		i < d.length;
		++i) {
			temp = d[i].getBoundingClientRect();
		c1 = comp.x - temp.x;
		c2 = comp.x - (temp.width + temp.x);
		c3 = temp.x - comp.x;
		c4 = temp.x - (comp.width + comp.x);
		c5 = comp.y - temp.y;
		c6 = comp.y - (temp.height + temp.y);
		c7 = temp.y - comp.y;
		c8 = temp.y - (comp.height + comp.y);
		if (c1 > 0 && c2 > 0) {
			a.push(d[i]);
		} if (c3 > 0 && c4 > 0) {
			a.push(d[i]);
		} if (c5 > 0 && c6 > 0) {
			a.push(d[i]);
		} if (c7 > 0 && c8 > 0) {
			a.push(d[i]);
		}
	} for (var i = 0;
		i < a.length;
		++i) {
			a[i].remove();
	} var htmlContent = [document.documentElement.innerHTML.replaceAll('href="/', 'href="' + window.origin + '/').replaceAll('src="/', 'src="' + window.origin + '/')];
	var bl = new Blob(htmlContent, { type: "text/html" });
	var a = document.createElement("a");
	a.href = URL.createObjectURL(bl);
	a.download = "test.html";
	a.hidden = true;
	document.body.appendChild(a);
	a.innerHTML = "something random - nobody will see this, it doesn't matter what you put here";
	a.click();
	document.body.style.userSelect = ''
}
