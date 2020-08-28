import React from "react";
import BlocklyDrawer from "react-blockly-drawer";
import Beautifier from 'js-beautify'
import Blockly from "node-blockly/browser";
import toolbox from "./toolbox";
import stone from "./theme";
import defineBlocks from "./Blocks";
import { defaultGenerators } from "./functions";
import { discordBlocks, discordTools, discordGenerators } from "./discord";

const js_beautify = Beautifier.js
//add to block prototypes
Blockly.Block.prototype.allInputsFilledUnRecursive = function(
  opt_shadowBlocksAreFilled
) {
  let returnee = true;
  // Account for the shadow block filledness toggle.
  if (opt_shadowBlocksAreFilled === undefined) {
    opt_shadowBlocksAreFilled = true;
  }
  if (!opt_shadowBlocksAreFilled && this.isShadow()) {
    return false;
  }

  // Recursively check each input block of the current block.
  this.inputList.forEach(input => {
    if (!input.connection) {
      return;
    }
    let target = input.connection.targetBlock();
    if (!target || !target.allInputsFilled(opt_shadowBlocksAreFilled)) {
      returnee = false;
      return;
    }
  });

  // Recursively check the next block after the current block.
  return returnee;
};
export default class BlocklyDiv extends React.Component {
  constructor(props) {
    super(props);
    this.jsCode = null;
    this.discordInit =
      "const Discord = require('discord.js')\nconst client = new Discord.Client()\n";
    this.xmlCode = null;
    defineBlocks([discordBlocks]);
    defaultGenerators();
    discordGenerators();
    let meThis = this;
    // let disValue = "";
    // if (Blockly.getMainWorkspace())
    //   disValue =
    //     Blockly.getMainWorkspace()
    //       .getBlocksByType("setup", true)[0]
    //       .getInput("discord").fieldRow[1].value_ || "";
    //     console
    // if (Blockly.getMainWorkspace())
    //   Blockly.getMainWorkspace().addChangeListener(
    //     Blockly.Events.disableOrphans
    //   );
    try {
      Blockly.Extensions.unregister("setup_extension");
      Blockly.Extensions.register("setup_extension", function() {
        var thisBlock = this;
        if (meThis.props.data.discord) {
          thisBlock
            .appendDummyInput("discord")
            .appendField(
              new Blockly.FieldLabel("initialize discord bot with token ")
            )
            .appendField(
              new Blockly.FieldTextInput("", null, { name: "TOKEN" })
            );
        }
        if (meThis.props.data.reddit) {
          thisBlock
            .appendDummyInput("reddit")
            .appendField(
              new Blockly.FieldLabel("initialize reddit bot with token ")
            )
            .appendField(
              new Blockly.FieldTextInput("", null, { name: "TOKEN2" })
            );
        }
      });
    } catch {
      Blockly.Extensions.register("setup_extension", function() {
        var thisBlock = this;
        if (meThis.props.data.discord) {
          thisBlock
            .appendDummyInput("discord")
            .appendField(
              new Blockly.FieldLabel("initialize discord bot with token ")
            )
            .appendField(
              new Blockly.FieldTextInput("", null, { name: "TOKEN" })
            );
        }
        if (meThis.props.data.reddit) {
          thisBlock
            .appendDummyInput("reddit")
            .appendField(
              new Blockly.FieldLabel("initialize reddit bot with token ")
            )
            .appendField(
              new Blockly.FieldTextInput("", null, { name: "TOKEN2" })
            );
        }
      });
    }
  }
  componentDidUpdate() {
    this.props.remount();
    this.props.fetchData({ upload: false });
  }
  // componentWillUnmount() {

  // }
  shouldComponentUpdate(nextProps) {
    const differentRender =
      this.props.data.renderer !== nextProps.data.renderer;
    const differentMin = this.props.data.minScale !== nextProps.data.minScale;
    const differentMax = this.props.data.maxScale !== nextProps.data.maxScale;
    const differentDiscord = this.props.data.discord !== nextProps.data.discord;
    const differentReddit = this.props.data.reddit !== nextProps.data.reddit;
    const differentScroll = this.props.data.scroll !== nextProps.data.scroll;
    const upload = this.props.data.upload != nextProps.data.upload
    // console.log(differentMin);
    // console.log(differentMax);
    // console.log(differentRender);
    // console.log(differentReddit);
    // console.log(differentScroll);
    // console.log(differentDiscord);
    return (
      differentRender ||
      differentMin ||
      differentMax ||
      differentDiscord ||
      differentReddit ||
      differentScroll || 
      upload
    );
  }
  componentDidMount() {}
  render() {
    return (
      <BlocklyDrawer
        style={{
          position: "relative",
          top: 0,
          bottom: 0,
          height: "100%"
        }}
        onChange={(code, workspace) => {
          // var topBlocks = Blockly.getMainWorkspace().getTopBlocks();
          // for (var i = 0; i < topBlocks.length; i++) {
          //   var topBlock = topBlocks[i];
          //   if (topBlock.type !== "setup") {
          //     topBlock.setEnabled(false);
          //   } else {
          //     topBlock.setEnabled(true);
          //   }
          // }
          Blockly.getMainWorkspace().addChangeListener(
            Blockly.Events.disableOrphans
          );
          let prev = this.jsCode;
          this.jsCode = js_beautify(`${
            this.props.data.discord ? this.discordInit : ""
          };(async function() {\n${code}\n}()`, {indent_size: 2, space_in_empty_paren: true});
          this.xmlCode = workspace;
          if (prev !== this.jsCode)
            this.props.fetchData({ xml: this.xmlCode, code: this.jsCode });
          Blockly.JavaScript.INFINITE_LOOP_TRAP =
            "//Make sure all loops have a break function. If you're loop can't break, it risks being a infinite loop, which can crash your bot.\n";
        }}
        //init xml
        workspaceXML={this.props.data.xml}
        //optional rendering
        injectOptions={{
          renderer: `${this.props.data.renderer.toLowerCase()}`,
          zoom: {
            controls: true,
            wheel: this.props.data.scroll.toLowerCase() === "true",
            startScale: 1.0,
            maxScale: this.props.data.maxScale,
            minScale: this.props.data.minScale,
            scaleSpeed: 1.4
          },
          theme: stone
        }}
      >
        {toolbox}
        {this.props.data.discord || this.props.data.reddit ? <sep /> : null}
        {this.props.data.discord ? discordTools : null}
      </BlocklyDrawer>
    );
  }
}
