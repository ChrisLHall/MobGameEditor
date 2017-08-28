var source;
var copied;

function isbefore(a, b) {
    if (a.parentNode == b.parentNode) {
        for (var cur = a; cur; cur = cur.previousSibling) {
            if (cur === b) { 
                return true;
            }
        }
    }
    return false;
} 

function blockdragstart(e) {
    source = e.target;
    e.dataTransfer.effectAllowed = 'move';
}

function blockdragenter(e) {
    if (isbefore(source, e.target)) {
        e.target.parentNode.insertBefore(source, e.target);
    }
    else {
        e.target.parentNode.insertBefore(source, e.target.nextSibling);
    }
}

function toolboxdragstart(e) {
    copied = e.target.cloneNode(true);
    document.querySelector("#listy").appendChild(copied);
    e.dataTransfer.effectAllowed = 'move';
}

function toolboxdragenter(e) {
    if (isbefore(copied, e.target)) {
        e.target.parentNode.insertBefore(copied, e.target);
    }
    else {
        e.target.parentNode.insertBefore(copied, e.target.nextSibling);
    }
}

function collectAll() {
	var lis = document.querySelectorAll("#listy li");
	var collected = "";
	for (var i = 0; i < lis.length; i++) {
		console.log(lis[i].childNodes[0].value);
		collected += lis[i].childNodes[0].value;
	}
	document.querySelector("#collectalltext").textContent = collected;
}

var collect = document.querySelector("#collect_button");
collect.addEventListener('click', collectAll);
console.log("dumb");