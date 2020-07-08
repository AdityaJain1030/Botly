const insideWrongBlock = (block, namesofBlocksToAllowIn, parentArray) => {
    let xyz;
    if (block.getSurroundParent() !== null) {
      if (block.getSurroundParent().type !== "setup") {
        parentArray.push(block.getSurroundParent());
        return insideWrongBlock(
          block.getSurroundParent(),
          namesofBlocksToAllowIn,
          parentArray
        );
      }
      if (block.getSurroundParent().type === "setup") {
        parentArray.push(block.getSurroundParent());
        let names = [];
        parentArray.forEach(parent => {
          names.push(parent.type);
        });
        namesofBlocksToAllowIn.forEach(blockName => {
          if (!names.includes(blockName)) {
            if (xyz) {
              xyz = true;
            }
          } else {
            xyz = false;
          }
        });
      }
    }
    return xyz;
  };
  
  export default insideWrongBlock;
  