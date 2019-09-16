export const jsonValidator = (item) => {
  // console.log("json validator");
  item = typeof item !== "string" ? JSON.stringify(item) : item;
  try {
    item = JSON.parse(item);
  } catch (e) {
    console.dir(e);
    console.log("e: ", e.message);
    return false;
  }
  if (typeof item === "object" && item !== null) {
    return true;
  }
  return false;
}

export const updateState = (original, newData) => {
  if (isEmpty(original)) {
    return newData;
  }
  let i;
  if (original.id === newData.parentId) {
    original.children.push(newData)
    return original;
  } else {
    if (original.children) {
      for (i=0; i < original.children.length; i++) {
        updateState(original.children[i], newData);
      }
    }
  }
  return original;
};

export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
}