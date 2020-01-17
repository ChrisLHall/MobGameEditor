function findChildInputs (domObj, result) {
  if (domObj) {
    if (domObj.type && domObj.type === "text") {
      result.push(domObj);
    } else {
      var children = domObj.children;
      for (var j = 0; j < children.length; j++) {
        findChildInputs(children[j], result);
      }
    }
  }
}
