var source;
var copied;

function sameParent(a, b) {
  return a.parentNode == b.parentNode;
}

function isbefore(a, b) {
    if (sameParent(a, b)) {
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
  if (sameParent(source, e.target)) {
    if (isbefore(source, e.target)) {
      e.target.parentNode.insertBefore(source, e.target);
    }
    else {
      e.target.parentNode.insertBefore(source, e.target.nextSibling);
    }
  }
}

var ToolboxItems = {
  "if": "#ifTemplate",
  "elseIf": "#elseIfTemplate",
  "else": "#elseTemplate",
  "end": "#endTemplate",
  "assign": "#assignTemplate",
}
var TextSubs = {
  "ifTemplate": "if ({0}) {",
  "elseIfTemplate": "} else if ({0}) {",
  "elseTemplate": "} else {",
  "endTemplate": "}",
  "assignTemplate": "{0} = {1}",
  "fruitTemplate": "froot {0}",
}
function toolbox_dbl_click(which) {
  template = ToolboxItems[which]
  if (!template) {
    return
  }
  copied = document.querySelector(template).cloneNode(true)
  copied.removeAttribute("id")
  document.querySelector("#listy").appendChild(copied)
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
		console.log(lis[i].childNodes)
    var addedText = TextSubs[lis[i].className] + "\n"
    var children = lis[i].childNodes[0].childNodes
    var inputIdx = 0
    for (var j = 0; j < children.length; j++) {
      console.log("child " + j.toString())
      var child = children[j]
      console.log(child)
      if (child.type && child.type === "text") {
        var text = "{" + inputIdx.toString() + "}"
        console.log("THERES A CHILD")
        console.log(child)
        console.log(child.value)
        addedText = addedText.replace(text, child.value)
        inputIdx++
      }
    }
    collected += addedText
	}
	document.querySelector("#collectalltext").textContent = collected;
}
