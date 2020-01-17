var selectedSlot = null
var selectedInsert = null

function sameParent(a, b) {
  return a.parentNode == b.parentNode
}

function isSubContainer(container) {
  console.log("checking class name " + a.parentNode.className.toString())
  return a.parentNode.className == "subcontainer"
}

var exampleFile = [
  {
    instr: "if",
    values: ["lives < 1"],
    comp: "<",
  }, {
    instr: "func",
    //name: "die",
    args: ["die", 0,],
  }, {
    instr: "end",
  },
]

var blocks = [];

var BlockInstance = function (data, parent) {
  parent = parent || null;
  this.data = data;
  this.domBlock = addBlockHTML(this.data)
  this.inputList = [];
  findChildInputs(this.domBlock, this.inputList);
  if (this.data.hasOwnProperty("values")) {
    populateInputs(this.inputList, this.data.values);
  } else if (this.data.hasOwnProperty("args")) {
    populateInputs(this.inputList, this.data.args);
  }
  this.parent = parent;
}

BlockInstance.prototype.readInputs = function () {
  if (this.data.hasOwnProperty("values")) {
    this.data.values = readInputs(this.inputList);
  } else if (this.data.hasOwnProperty("args")) {
    this.data.args = readInputs(this.inputList);
  }
}

BlockInstance.prototype.toCode = function () {
  this.readInputs();
  console.log("done w inputs");
  var text = BlockInstance.TextSubs[this.data.instr];
  console.log(text);
  console.log(dumpProps(this.data));
  if (this.data.hasOwnProperty("values")) {
    for (var j = 0; j < this.data.values.length; j++) {
      var replace = "{" + j + "}"
      console.log("replace values " + replace);
      text = text.replace(replace, this.data.values[j]);
    }
  } else if (this.data.hasOwnProperty("args")) {
    var concat = "";
    for (var j = 0; j < this.data.args.length; j++) {
      concat += this.data.args[j];
      if (j !== this.data.args.length - 1) {
        concat += ", ";
      }
    }
    console.log("concat " + concat);
    text = text.replace("{0}", concat);
  }
  return text;
}

var ToolboxItems = {
  "if": "#ifTemplate",
  "elseIf": "#elseIfTemplate",
  "else": "#elseTemplate",
  "end": "#endTemplate",
  "assign": "#assignTemplate",
  "func": "#funcTemplate",
  "var": "#varTemplate",
  "math": "#mathTemplate",
  "bool": "#boolTemplate",
}
function toolboxName(tool) {
  // TODO
}
BlockInstance.TextSubs = {
  "if": "if ({0}) {",
  "elseIf": "} else if ({0}) {",
  "else": "} else {",
  "end": "}",
  "assign": "{0} = {1};",
  "func": "{0}({1});",
  "var": "var {0} = {1};",
  "math": "{0} {1} {2}",
  "bool": "{0} {1} {2}",
}
BlockInstance.astTemplates = { 
  "if": {
    instr: "if",
    values: ["v", "0"],
    comp: "==",
  },
  "elseIf": {
    instr: "elseIf",
    values: ["v", "0"],
    comp: "<",
  },
  "else": {
  
  },
  "func": {
    instr: "func",
    //name: "die",
    args: ["function", 0,],
  }, 
  "end": {
    instr: "end",
  },
  "assign": {
    instr: "assign",
    values: ["v", "1"]
  },
  "var": {
    instr: "var",
    values: ["v", "0"]
  },
  "math": {
    instr: "math",
    values: ["8", "v"],
    op: "*",
  },
  "comp": {
    instr: "comp",
    values: ["v", "0"],
    comp: "==",
  },
};
function addBlock(name) {
  template = BlockInstance.astTemplates[name];
  var block = new BlockInstance(template);
  //addBlock(block.instr);
  blocks.push(block);
}

function addBlockHTML(data) {
  console.log("add block " + data.instr);
  template = ToolboxItems[data.instr];
  if (!template) {
    return null
  }
  console.log(template)
  copied = document.querySelector(template).cloneNode(true)
  copied.removeAttribute("id")
  var updown = document.querySelector("#updowntemplate").cloneNode(true)
  updown.removeAttribute("id")
  copied.insertBefore(updown, copied.firstChild)
  if (null !== selectedInsert) {
    document.querySelector("#listy").insertBefore(copied, selectedInsert.nextSibling)
  } else {
    document.querySelector("#listy").appendChild(copied)
  }
  
  // todo add and remove insert buttons only when adding somethin
  //addInsertButton(copied)
  recolorBlocks()
  return copied
}

function addInsertButton(after) {
  var between = document.querySelector("#betweentemplate").cloneNode(true)
  between.removeAttribute("id")
  between.removeAttribute("hidden")
  after.parentNode.insertBefore(between, after.nextSibling)
}

function populateInputs(inputList, values) {
  for (var j = 0; j < inputList.length && j < values.length; j++) {
    inputList[j].value = values[j];
  }
}

function readInputs(inputList) {
  var result = [];
  for (var j = 0; j < inputList.length; j++) {
    result.push(inputList[j].value);
  }
  return result;
}

function swapUp(node) {
  if (node.previousSibling) {
    node.parentNode.insertBefore(node, node.previousSibling)
  }
  recolorBlocks()
}

function swapDown(node) {
  if (node.nextSibling) {
    node.parentNode.insertBefore(node.nextSibling, node)
  }
  recolorBlocks()
}

function recolorBlocks() {
  // actually dont ... sad
  /*
  var lis = document.querySelectorAll("#listy li")
  var toggle = false
  for (var i = 0; i < lis.length; i++) {
    var list = lis[i].classList
    console.log(list)
    var color = toggle ? "color2" : "color1"
    var removeColor = toggle ? "color1" : "color2"
    list.add(color)
    if (list.contains(removeColor)) {
      list.remove(removeColor)
    }
    toggle = !toggle
  }
  */
}

function selectSlot(button, codePiece) {
  var lis = document.querySelectorAll("#listy .subselectbutton")
  for (var i = 0; i < lis.length; i++) {
    var item = lis[i]
    var classes = item.classList
    var thisOne = item == button

    var addStyle = thisOne ? "subselected" : "subdeselected"
    var removeStyle = thisOne ? "subdeselected" : "subselected"
    if (!classes.contains(addStyle)) {
      classes.add(addStyle)
    }
    if (classes.contains(removeStyle)) {
      classes.remove(removeStyle)
    }
    console.log(escapeHTML(button.innerHTML))
    console.log(escapeHTML(item.innerHTML))
    console.log(classes)
    console.log(thisOne.toString())
    // todo finish
  }
}

function selectInsert(button) {
  var lis = document.querySelectorAll("#listy .betweenselectbutton")
  for (var i = 0; i < lis.length; i++) {
    var item = lis[i]
    var classes = item.classList
    var thisOne = item == button

    var addStyle = thisOne ? "subselected" : "subdeselected"
    var removeStyle = thisOne ? "subdeselected" : "subselected"
    if (!classes.contains(addStyle)) {
      classes.add(addStyle)
    }
    if (classes.contains(removeStyle)) {
      classes.remove(removeStyle)
    }
  }
}

function populateFromAST(blockList) {
  blocks.length = 0;
  for (var i = 0; i < blockList.length; i++) {
    console.log("new block " + i)
    var block = new BlockInstance(blockList[i]);
    //addBlock(block.instr);
    blocks.push(block);
  }
}

function collectAll() {
  var collected = "";
  for (var j = 0; j < blocks.length; j++) {
    console.log(dumpProps(blocks[j]));
    collected += blocks[j].toCode() + "\n";
  }
  document.querySelector("#collectalltext").textContent = collected;
}