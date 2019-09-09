export const jsonValidator = (content) => {
  console.log(content)
};


export const updateState = (original, newData) => {
  console.log("newData: ", newData);
  if (isEmpty(original)) {
    return newData;
  }
  let i;
  if (original.id === newData.parentId) {
    original.children.push(newData)
    return
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