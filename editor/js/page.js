var source;
var copied;

function sameParent(a, b) {
  return a.parentNode == b.parentNode;
}

function isSubContainer(container) {
  console.log("checking class name " + a.parentNode.className.toString())
  return a.parentNode.className == "subcontainer"
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
  console.log("starting!")
  console.log(e.target)
  source = e.target;
  e.dataTransfer.effectAllowed = 'move';
}

function blockdragenter(e) {
  console.log("drag")
  console.log(e.target);
  if (sameParent(source, e.target)) {
    if (isbefore(source, e.target)) {
      e.target.parentNode.insertBefore(source, e.target);
    }
    else {
      e.target.parentNode.insertBefore(source, e.target.nextSibling);
    }
  } else if (isSubContainer(e.target)) {
    e.target.parentNode.insertBefore(source, e.target)
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
