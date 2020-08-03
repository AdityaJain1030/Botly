import Blockly from "node-blockly/browser";

const defineBlocks = plugins => {
  let defaultBlocks = [
    {
      message0: "Date Right Now (in milliseconds)",
      type: "getDateMilliseconds",
      output: "Number",
      colour: "#2d728f",
      tooltip:
        "Get the date right now in milliseconds. For most practical applications, you will want to pass this through the ",
      helpUrl:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now"
    },
    {
      message0: "Turn %1 Milliseconds to a UTC Date",
      type: "getDateFromMilliseconds",
      args0: [
        {
          type: "input_value",
          name: "Milliseconds",
          check: "Number"
        }
      ],
      output: "String",
      colour: "#2d728f",
      tooltip:
        "Convert the date that you pass in milliseconds to a proper date, in mm/dd/yyyy format",
      helpUrl:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toUTCString"
    },
    {
      message0: "Try to %1 And If that doesn't work %2",
      type: "trycatch",
      args0: [
        {
          type: "input_statement",
          name: "TRY",
          align: "RIGHT"
        },
        {
          type: "input_statement",
          name: "CATCH",
          align: "RIGHT"
        }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: "#2d728f",
      tooltip:
        "Try to do the thing in the first part; if it doesnt work, do the thing in the second part.",
      helpUrl:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch"
    },
    {
      message0: "If %1 Includes %2",
      type: "includes",
      args0: [
        {
          type: "input_value",
          name: "STR",
          check: ["Array", "String"]
        },
        {
          type: "input_value",
          name: "SUB"
        }
      ],
      inputsInline: true,
      output: "Boolean",
      colour: "#2d728f",
      tooltip:
        "Returns true if the first bit of text you passed in contains the second bit of text you passed in; returns false otherwise.",
      helpUrl:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes"
    },
    {
      message0: "Turn Text %1 to Number",
      type: "stringToInt",
      args0: [
        {
          type: "input_value",
          name: "String",
          check: "String"
        }
      ],
      inputsInline: true,
      output: "Number",
      colour: "#2d728f",
      tooltip: "Convert text to a number",
      helpUrl:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseFloat"
    },
    {
      message0: "Turn Number %1 to Text",
      type: "intToString",
      args0: [
        {
          type: "input_value",
          name: "Number",
          check: "Number"
        }
      ],
      inputsInline: true,
      output: "String",
      colour: "#2d728f",
      tooltip: "Convert a number to text",
      helpUrl:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toString"
    },
    {
      message0: "On Start %1",
      type: "setup",
      args0: [
        {
          type: "field_image",
          src: require("../images/flag.png"),
          width: 30,
          height: 30,
          alt: "*",
          flipRtl: false
        }
      ],
      style: {
        hat: "cap"
      },
      inputsInline: false,
      colour: "#dab600",
      nextStatement: null,
      extensions: ["setup_extension"],
      movable: false,
      tooltip:
        "This Is the initialization block. All your code will be inside here.",
      helpUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    }
  ];
  plugins.forEach(plugin => {
    plugin.forEach(block => {
      defaultBlocks.push(block);
    });
  });
  Blockly.defineBlocksWithJsonArray(defaultBlocks);
};

export default defineBlocks;
