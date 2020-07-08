import React from "react";
import JSZip from "jszip";
import Blockly from "node-blockly/browser";
import saveAs from "file-saver";
import BlocklyDrawer, { Block, Category } from "react-blockly-drawer";
import "./styles.css";
import Blocks from "./Blocks.js";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.zip = new JSZip();
    this.jsCode = null;
    this.xmlCode = null;
    this.parentArray = [];
    this.state = {
      xml: `<xml xmlns="https://developers.google.com/Blockly/xml" id="workspaceBlocks" style="display: none">
      <Block type="setup" id="xSh562M^2+@$ad}:f}uU" x="13" y="13" deletable="false">
        <field name="TOKEN"></field>
      </Block>
    </xml>`
    };
    this.downloadBot = this.downloadBot.bind(this);
  }
  componentDidMount() {
    this._isMounted = true;
    if (!Blockly.JavaScript.RESERVED_WORDS_.includes("msg")) {
      Blockly.JavaScript.addReservedWords([
        "msg",
        "channel",
        "arr",
        "member",
        "Discord",
        "client",
        "xyz"
      ]);
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  // onClick(type, state){
  //   if
  // }

  downloadBot() {
    this.zip.file("index.js", this.jsCode);
    this.zip.file(
      "package.json",
      `{
      "name": "MyCustomBot",
      "version": "1.0.0",
      "description": "",
      "main": "index.js",
      "scripts": {
        "test": "echo 'Error: no test specified' && exit 1"
      },
      "keywords": [],
      "author": "",
      "license": "ISC",
      "dependencies": {
        "discord.js": "^12.2.0"
      }
    }`
    );
    this.zip.file("botly.BLOCKSCONFIG", this.xmlCode);
    this.zip.generateAsync({ type: "blob" }).then(content => {
      saveAs(content, "bot.zip");
    });
  }

  render() {
    return (
      <div>
        <div className="bgMain" />
        <div className="CODE">
          <div className="NavBars">
            <div className="index" id="clicked">
              Code
            </div>
          </div>
          <div id="Main_Code" />
        </div>
        <div
          className="BlocklyDiv"
          style={{
            position: "absolute",
            top: "130px",
            left: "6.52%",
            right: "6.52%",
            zIndex: "0",
            borderRadius: "2px",
            border: "5px solid #C4C4C4",
            boxSizing: "border-box"
          }}
        >
          <BlocklyDrawer
            top="200px"
            tools={Blocks}
            onChange={(code, workspace) => {
              let fullCode;
              //switch (code.includes("/*include helper*/")) {
              //case true:
              fullCode = `const Discord = require('discord.js')\nconst client = new Discord.Client()\n\n${code}`;
              // break;
              // default:
              //fullCode = `const Discord = require('discord.js');\n\nconst helper = require('@sombertm/discordjs-helper')\nconst client = new Discord.Client();\n\n${code}`;
              //break;
              //}
              this.jsCode = fullCode;
              this.xmlCode = workspace;
              Blockly.JavaScript.INFINITE_LOOP_TRAP =
                "//Make sure all loops have a break function. If you're loop can't break, it risks being a infinite loop, which can crash your bot.\n";
              let node = document.getElementById("Main_Code");
              node.innerHTML = `<pre>${fullCode}</pre>`;
              // console.log(this.jsCode)
            }}
            //init xml
            workspaceXML={this.state.xml}
            //optional rendering
            injectOptions={{
              renderer: "thrasos"
            }}
            //make stuff look nice
            appearance={{
              categories: {
                Events: {
                  colour: "#ff6d6b"
                },
                Values: {
                  colour: "#fa6e9b"
                },
                init: {
                  display: "none"
                },
                Executables: {
                  colour: "#Aecd1e"
                },
                Misc: {
                  colour: "#2d728f"
                }
              }
            }}
          >
            {/* //initialization categories */}
            <Category name="Logic" colour="#5b80a5">
              <Block type="controls_if" />
              <Block type="logic_compare">
                <field name="OP">EQ</field>
              </Block>
              <Block type="logic_operation">
                <field name="OP">AND</field>
              </Block>
              <Block type="logic_negate" />
              <Block type="logic_boolean">
                <field name="BOOL">TRUE</field>
              </Block>
              <Block type="logic_null" />
              <Block type="logic_ternary" />
            </Category>
            <Category name="Loops" colour="#5ba55b">
              <Block type="controls_repeat_ext">
                <value name="TIMES">
                  <shadow type="math_number">
                    <field name="NUM">10</field>
                  </shadow>
                </value>
              </Block>
              <Block type="controls_whileUntil">
                <field name="MODE">WHILE</field>
              </Block>
              <Block type="controls_for">
                <field name="let" id="7]RumilQTy$NMo`aJv8g">
                  i
                </field>
                <value name="FROM">
                  <shadow type="math_number">
                    <field name="NUM">1</field>
                  </shadow>
                </value>
                <value name="TO">
                  <shadow type="math_number">
                    <field name="NUM">10</field>
                  </shadow>
                </value>
                <value name="BY">
                  <shadow type="math_number">
                    <field name="NUM">1</field>
                  </shadow>
                </value>
              </Block>
              <Block type="controls_forEach">
                <field name="let" id="3YVXM5T${p5;|s7ig}m9">
                  j
                </field>
              </Block>
              <Block type="controls_flow_statements">
                <field name="FLOW">BREAK</field>
              </Block>
            </Category>
            <Category name="Math" colour="#995ba5">
              <Block type="math_number">
                <field name="NUM">0</field>
              </Block>
              <Block type="math_arithmetic">
                <field name="OP">ADD</field>
                <value name="A">
                  <shadow type="math_number">
                    <field name="NUM">1</field>
                  </shadow>
                </value>
                <value name="B">
                  <shadow type="math_number">
                    <field name="NUM">1</field>
                  </shadow>
                </value>
              </Block>
              <Block type="math_single">
                <field name="OP">ROOT</field>
                <value name="NUM">
                  <shadow type="math_number">
                    <field name="NUM">9</field>
                  </shadow>
                </value>
              </Block>
              <Block type="math_trig">
                <field name="OP">SIN</field>
                <value name="NUM">
                  <shadow type="math_number">
                    <field name="NUM">45</field>
                  </shadow>
                </value>
              </Block>
              <Block type="math_constant">
                <field name="CONSTANT">PI</field>
              </Block>
              <Block type="math_number_property">
                <mutation divisor_input="false" />
                <field name="PROPERTY">EVEN</field>
                <value name="NUMBER_TO_CHECK">
                  <shadow type="math_number">
                    <field name="NUM">0</field>
                  </shadow>
                </value>
              </Block>
              <Block type="math_round">
                <field name="OP">ROUND</field>
                <value name="NUM">
                  <shadow type="math_number">
                    <field name="NUM">3.1</field>
                  </shadow>
                </value>
              </Block>
              <Block type="math_on_list">
                <mutation op="SUM" />
                <field name="OP">SUM</field>
              </Block>
              <Block type="math_modulo">
                <value name="DIVIDEND">
                  <shadow type="math_number">
                    <field name="NUM">64</field>
                  </shadow>
                </value>
                <value name="DIVISOR">
                  <shadow type="math_number">
                    <field name="NUM">10</field>
                  </shadow>
                </value>
              </Block>
              <Block type="math_constrain">
                <value name="VALUE">
                  <shadow type="math_number">
                    <field name="NUM">50</field>
                  </shadow>
                </value>
                <value name="LOW">
                  <shadow type="math_number">
                    <field name="NUM">1</field>
                  </shadow>
                </value>
                <value name="HIGH">
                  <shadow type="math_number">
                    <field name="NUM">100</field>
                  </shadow>
                </value>
              </Block>
              <Block type="math_random_int">
                <value name="FROM">
                  <shadow type="math_number">
                    <field name="NUM">1</field>
                  </shadow>
                </value>
                <value name="TO">
                  <shadow type="math_number">
                    <field name="NUM">100</field>
                  </shadow>
                </value>
              </Block>
              <Block type="math_random_float" />
            </Category>
            <Category name="Text" colour="#9fa55b">
              <Block type="text">
                <field name="TEXT" />
              </Block>
              <Block type="text_join">
                <mutation items="2" />
              </Block>
              <Block type="text_append">
                <field name="let" id="5I5C-TPE^HkTz2L72*RR">
                  item
                </field>
                <value name="TEXT">
                  <shadow type="text">
                    <field name="TEXT" />
                  </shadow>
                </value>
              </Block>
              <Block type="text_length">
                <value name="VALUE">
                  <shadow type="text">
                    <field name="TEXT">abc</field>
                  </shadow>
                </value>
              </Block>
              <Block type="text_isEmpty">
                <value name="VALUE">
                  <shadow type="text">
                    <field name="TEXT" />
                  </shadow>
                </value>
              </Block>
              <Block type="text_indexOf">
                <field name="END">FIRST</field>
                <value name="VALUE">
                  <Block type="variables_get">
                    <field name="let" id="nq(339~y143?xTzU~wHS">
                      text
                    </field>
                  </Block>
                </value>
                <value name="FIND">
                  <shadow type="text">
                    <field name="TEXT">abc</field>
                  </shadow>
                </value>
              </Block>
              <Block type="text_charAt">
                <mutation at="true" />
                <field name="WHERE">FROM_START</field>
                <value name="VALUE">
                  <Block type="variables_get">
                    <field name="let" id="nq(339~y143?xTzU~wHS">
                      text
                    </field>
                  </Block>
                </value>
              </Block>
              <Block type="text_getSubstring">
                <mutation at1="true" at2="true" />
                <field name="WHERE1">FROM_START</field>
                <field name="WHERE2">FROM_START</field>
                <value name="STRING">
                  <Block type="variables_get">
                    <field name="let" id="nq(339~y143?xTzU~wHS">
                      text
                    </field>
                  </Block>
                </value>
              </Block>
              <Block type="text_changeCase">
                <field name="CASE">UPPERCASE</field>
                <value name="TEXT">
                  <shadow type="text">
                    <field name="TEXT">abc</field>
                  </shadow>
                </value>
              </Block>
              <Block type="text_trim">
                <field name="MODE">BOTH</field>
                <value name="TEXT">
                  <shadow type="text">
                    <field name="TEXT">abc</field>
                  </shadow>
                </value>
              </Block>
            </Category>
            <Category name="Lists" colour="#745ba5">
              <Block type="lists_create_with">
                <mutation items="0" />
              </Block>
              <Block type="lists_create_with">
                <mutation items="3" />
              </Block>
              <Block type="lists_repeat">
                <value name="NUM">
                  <shadow type="math_number">
                    <field name="NUM">5</field>
                  </shadow>
                </value>
              </Block>
              <Block type="lists_length" />
              <Block type="lists_isEmpty" />
              <Block type="lists_indexOf">
                <field name="END">FIRST</field>
                <value name="VALUE">
                  <Block type="variables_get">
                    <field name="VAR" id="d;esfk%RcS`=[uSd8e,o">
                      list
                    </field>
                  </Block>
                </value>
              </Block>
              <Block type="lists_getIndex">
                <mutation statement="false" at="true" />
                <field name="MODE">GET</field>
                <field name="WHERE">FROM_START</field>
                <value name="VALUE">
                  <Block type="variables_get">
                    <field name="VAR" id="d;esfk%RcS`=[uSd8e,o">
                      list
                    </field>
                  </Block>
                </value>
              </Block>
              <Block type="lists_setIndex">
                <mutation at="true" />
                <field name="MODE">SET</field>
                <field name="WHERE">FROM_START</field>
                <value name="LIST">
                  <Block type="variables_get">
                    <field name="VAR" id="d;esfk%RcS`=[uSd8e,o">
                      list
                    </field>
                  </Block>
                </value>
              </Block>
              <Block type="lists_getSublist">
                <mutation at1="true" at2="true" />
                <field name="WHERE1">FROM_START</field>
                <field name="WHERE2">FROM_START</field>
                <value name="LIST">
                  <Block type="variables_get">
                    <field name="VAR" id="d;esfk%RcS`=[uSd8e,o">
                      list
                    </field>
                  </Block>
                </value>
              </Block>
              <Block type="lists_split">
                <mutation mode="SPLIT" />
                <field name="MODE">SPLIT</field>
                <value name="DELIM">
                  <shadow type="text">
                    <field name="TEXT">,</field>
                  </shadow>
                </value>
              </Block>
              <Block type="lists_sort">
                <field name="TYPE">NUMERIC</field>
                <field name="DIRECTION">1</field>
              </Block>
            </Category>
            <Category name="Variables" colour="#8cd3fd" custom="VARIABLE" />
            <Category
              name="Custom Functions"
              colour="#c1292e"
              custom="PROCEDURE"
            />
          </BlocklyDrawer>
        </div>

        {/* {console.log(this.jsCode)} */}
        <div className="NavBar">
          <span className="txtN">Botly Editor</span>
          <span className="download" />
          <img src={require("./images/logo.png")} alt="logo" className="Logo" />
          <div className="Download" onClick={this.downloadBot}>
            Download
          </div>
          {/* Uploading will work in v1.1 */}
          {/* <label for="file-upload" className="Upload">Upload</label>
          <input type="file" id="file-upload" accept=".BlocksConfig" onChange={console.log('file uploaded')}/> */}
        </div>
      </div>
    );
  }
}
