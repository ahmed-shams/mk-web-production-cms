export const jsonValidator = (content) => {
  console.log(content)
};


export const updateState = (original, newData) => {
  let i;
  if (original.fileId === newData.parentId) {
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

  