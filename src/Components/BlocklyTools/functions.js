import Blockly from "node-blockly/browser";

const insideWrongBlock = (block, namesofBlocksToAllowIn, parentArray) => {
  let xyz = true;
  if (block.getSurroundParent() !== null) {
    if (block.getTopStackBlock().type !== "setup") {
      parentArray.push(block.getSurroundParent());
      // console.log(parentArray);
      return insideWrongBlock(
        block.getSurroundParent(),
        namesofBlocksToAllowIn,
        parentArray
      );
    }
  } else {
    if (block.getTopStackBlock() !== null) {
      if (block.getTopStackBlock().type === "setup") {
        parentArray.push(block.getTopStackBlock());
        let names = parentArray.map(parent => parent.type);
        // console.log(names);
        namesofBlocksToAllowIn.forEach(blockName => {
          if (!names.includes(blockName)) {
            if (xyz) xyz = true;
          } else {
            xyz = false;
          }
        });
      } else {
        if (block.getSurroundParent() === null) xyz = false;
      }
    }
  }
  return xyz;
};

const defaultGenerators = () => {
  Blockly.JavaScript["setup"] = block => {
    let text_token = "";
    let text_token2 = "";
    let code = "";
    if (block.getInput("discord")) {
      text_token = block.getInput("discord").fieldRow[1].value_;
      code = `client.login("${text_token}")\nawait client.on('ready')\n`;
    }
    if (block.getInput("reddit")) {
      text_token2 = block.getInput("reddit").fieldRow[1].value_;
    }
    //   let div = new BlocklyDiv({
    //     data: {
    //       description: "Does Cool Stuff",
    //       discord: true,
    //       fontSize: 15,
    //       gitLink: "https://github.com/",
    //       maxScale: 3,
    //       minScale: 0.3,
    //       name: "My Bot",
    //       reddit: false,
    //       renderer: "Thrasos",
    //       scroll: "False",
    //       version: 0.1,
    //       code: `const Discord = require('discord.js')\nconst client = new Discord.Client()\n\n`,
    //       xml: `<xml xmlns="https://developers.google.com/Blockly/xml" id="workspaceBlocks" style="display: none"><Block type="setup" id="xSh562M^2+@$ad}:f}uU" x="13" y="13" deletable="false"><field name="TOKEN"></field></Block></xml>`
    //     }
    //   });
    //   div.check(block);
    return code;
  };
  Blockly.JavaScript["getDateMilliseconds"] = block => {
    let code = `Date.now()`;
    return [code, Blockly.JavaScript.ORDER_NONE];
  };
  Blockly.JavaScript["getDateFromMilliseconds"] = block => {
    let value_milliseconds = Blockly.JavaScript.valueToCode(
      block,
      "Milliseconds",
      Blockly.JavaScript.ORDER_ATOMIC
    );
    block.setOnChange(() => {
      block.setEnabled(block.allInputsFilledUnRecursive());
    });
    // TODO: Assemble JavaScript into code variable.
    let code = `new Date(${value_milliseconds}).toUTCString()`;
    return [code, Blockly.JavaScript.ORDER_NONE];
  };
  Blockly.JavaScript["trycatch"] = block => {
    let statements_try = Blockly.JavaScript.statementToCode(block, "TRY");
    let statements_catch = Blockly.JavaScript.statementToCode(block, "CATCH");
    // TODO: Assemble JavaScript into code variable.
    let code = `try{\n   ${statements_try}\n}catch{\n   ${statements_catch}\n}`;
    return code;
  };
  Blockly.JavaScript["includes"] = block => {
    let value_str = Blockly.JavaScript.valueToCode(
      block,
      "STR",
      Blockly.JavaScript.ORDER_ATOMIC
    );
    let value_sub = Blockly.JavaScript.valueToCode(
      block,
      "SUB",
      Blockly.JavaScript.ORDER_ATOMIC
    );
    block.setOnChange(() => {
      block.setEnabled(block.allInputsFilledUnRecursive());
    });
    // TODO: Assemble JavaScript into code variable.
    let code = `${value_str}.includes(${value_sub})`;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
  };
  Blockly.JavaScript["stringToInt"] = block => {
    let value_string = Blockly.JavaScript.valueToCode(
      block,
      "String",
      Blockly.JavaScript.ORDER_ATOMIC
    );
    block.setOnChange(() => {
      block.setEnabled(block.allInputsFilledUnRecursive());
    });
    let code = `parsefloat(${value_string})`;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
  };
  Blockly.JavaScript["intToString"] = block => {
    let value_number = Blockly.JavaScript.valueToCode(
      block,
      "Number",
      Blockly.JavaScript.ORDER_ATOMIC
    );
    block.setOnChange(() => {
      block.setEnabled(block.allInputsFilledUnRecursive());
    });
    let code = `${value_number}.toString()`;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
  };
};

export { defaultGenerators, insideWrongBlock };
