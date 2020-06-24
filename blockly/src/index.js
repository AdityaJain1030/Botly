import React from 'react'
import ReactDOM from 'react-dom'
import Blockly from 'node-blockly/browser'

import BlocklyDrawer, { Block, Category } from 'react-blockly-drawer'

const blocklyTools = [
  {
    name: 'setup',
    category: 'Listeners',
    block: {
      init: function() {
        this.jsonInit({
          message0: 'Bot Access Token %1 %2 Callback %3',
          args0: [
            {
              type: 'field_input',
              name: 'TOKEN',
              text: ''
            },
            {
              type: 'input_dummy'
            },
            {
              type: 'input_statement',
              name: 'Callback'
            }
          ],
          inputsInline: true,
          colour: '#AD3A52',
          tooltip: '',
          helpUrl: ''
        })
      }
    },
    generator: block => {
      let text_token = block.getFieldValue('TOKEN')
      let statements_callback = Blockly.JavaScript.statementToCode(
        block,
        'Callback'
      )
      // TODO: Assemble JavaScript into code variable.
      let code = `client.login(${text_token});\nclient.on('ready', () => {\n${statements_callback}});`
      return code
    }
  },
  {
    name: 'initMessageListener',
    category: 'Listeners',
    block: {
      init: function() {
        this.jsonInit({
          message0: 'On Message %1',
          args0: [
            {
              type: 'input_statement',
              name: 'CALLBACK'
            }
          ],
          previousStatement: null,
          nextStatement: null,
          colour: '#AD3A52',
          tooltip: 'Every time message is sent,  run callback',
          helpUrl: ''
        })
      }
    },
    generator: block => {
      let statements_callback = Blockly.JavaScript.statementToCode(
        block,
        'CALLBACK'
      )
      // TODO: Assemble JavaScript into code variable.
      let code = `client.on('message', (msg) => {\n${statements_callback}})\n`
      return code
    }
  },
  {
    name: 'getFromMessage',
    category: 'Values',
    block: {
      init: function() {
        this.jsonInit({
          message0: 'Get %1 from message',
          args0: [
            {
              type: 'field_dropdown',
              name: 'NAME',
              options: [
                ['content', 'content'],
                ['author', 'author'],
                ['channel', 'channel'],
                ['all', 'all']
              ]
            }
          ],
          output: null,
          colour: '#fe645a',
          tooltip: '',
          helpUrl: ''
        })
      }
    },
    generator: block => {
      let dropdown_name = block.getFieldValue('NAME')
      // TODO: Assemble JavaScript into code variable.
      let code
      if (dropdown_name !== 'all') {
        code = `msg.${dropdown_name}`
      } else {
        code = `msg`
      }
      // TODO: Change ORDER_NONE to the correct strength.
      return [code, Blockly.JavaScript.ORDER_NONE]
    }
  },
  {
    name: 'sendMessage',
    category: 'Executables',
    block: {
      init: function() {
        this.jsonInit({
          message0: 'Send Message %1 %2 On Channel %3',
          args0: [
            {
              type: 'field_input',
              name: 'Message',
              text: ''
            },
            {
              type: 'input_dummy'
            },
            {
              type: 'input_value',
              name: 'Channel'
            }
          ],
          inputsInline: true,
          previousStatement: null,
          nextStatement: null,
          colour: '#Aecd1e',
          tooltip: '',
          helpUrl: ''
        })
      }
    },
    generator: block => {
      let text_message = block.getFieldValue('Message')
      let value_channel = Blockly.JavaScript.valueToCode(
        block,
        'Channel',
        Blockly.JavaScript.ORDER_ATOMIC
      )
      // TODO: Assemble JavaScript into code variable.
      let code = `${value_channel}.send("${text_message}")\n`
      return code
    }
  },
  {
    name: 'replyToMessage',
    category: 'Executables',
    block: {
      init: function() {
        this.jsonInit({
          message0: 'Reply %1 %2 To Message %3',
          args0: [
            {
              type: 'field_input',
              name: 'Reply',
              text: ''
            },
            {
              type: 'input_dummy'
            },
            {
              type: 'input_value',
              name: 'Message'
            }
          ],
          inputsInline: true,
          previousStatement: null,
          nextStatement: null,
          colour: '#Aecd1e',
          tooltip: '',
          helpUrl: ''
        })
      }
    },
    generator: block => {
      let text_reply = block.getFieldValue('Reply')
      let value_message = Blockly.JavaScript.valueToCode(
        block,
        'Message',
        Blockly.JavaScript.ORDER_ATOMIC
      )
      // TODO: Assemble JavaScript into code variable.
      let code = `${value_message}.reply("${text_reply}")\n`
      return code
    }
  },
  {
    name: 'embedMessage',
    category: 'Executables',
    block: {
      init: function() {
        this.jsonInit({
          lastDummyAlign0: 'RIGHT',
          message0:
            'Embed Message On Channel  %1 With These Values: %2 Title %3 %4 Description %5 %6 Color %7',
          args0: [
            {
              type: 'input_value',
              name: 'Channel'
            },
            {
              type: 'input_dummy',
              align: 'RIGHT'
            },
            {
              type: 'field_input',
              name: 'title',
              text: ''
            },
            {
              type: 'input_dummy',
              align: 'RIGHT'
            },
            {
              type: 'field_input',
              name: 'description',
              text: ''
            },
            {
              type: 'input_dummy',
              align: 'RIGHT'
            },
            {
              type: 'field_colour',
              name: 'color',
              colour: '#ff0000'
            }
          ],
          previousStatement: null,
          nextStatement: null,
          colour: '#Aecd1e',
          tooltip: '',
          helpUrl: ''
        })
      }
    },
    generator: block => {
      let value_channel = Blockly.JavaScript.valueToCode(
        block,
        'Channel',
        Blockly.JavaScript.ORDER_ATOMIC
      )
      let text_title = block.getFieldValue('title')
      let text_description = block.getFieldValue('description')
      let colour_color = block.getFieldValue('color')
      // TODO: Assemble JavaScript into code variable.
      let code = `let embed = new Discord.MessageEmbed();\n  .setTitle("${text_title}")\n  .setDescription("${text_description}")\n  .setColor("${colour_color}")\n${value_channel}.send(embed);\n`
      return code
    }
  },
  // {
  //   name: 'setTimeout',
  //   category: 'Misc',
  //   block: {
  //     init: function() {
  //       this.jsonInit({
  //         type: 'settimeout',
  //         message0: 'Wait For  %1 Seconds',
  //         args0: [
  //           {
  //             type: 'input_value',
  //             name: 'Timeout',
  //             check: 'Number'
  //           }
  //         ],
  //         inputsInline: true,
  //         previousStatement: null,
  //         nextStatement: null,
  //         colour: '#fe645a',
  //         tooltip: '',
  //         helpUrl: ''
  //       })
  //     }
  //   },
  //   generator: block => {
  //     let value_timeout = Blockly.JavaScript.valueToCode(
  //       block,
  //       'Timeout',
  //       Blockly.JavaScript.ORDER_ATOMIC
  //     )
  //     // TODO: Assemble JavaScript into code variable.
  //     let code = `setTimeout(${value_timeout});\n`
  //     return code
  //   }
  // },
  {
    name: 'me',
    category: 'Values',
    block: {
      init: function() {
        this.jsonInit({
          message0: 'Me',
          output: null,
          colour: '#fe645a',
          tooltip: '',
          helpUrl: ''
        })
      }
    },
    generator: block => {
      let code = `client.user.tag`
      return [code, Blockly.JavaScript.ORDER_NONE]
    }
  }
]

ReactDOM.render(
  <BlocklyDrawer
    tools={blocklyTools}
    onChange={code => {
      let fullCode = `const Discord = require('discord.js');\nconst client = Discord.Client();\n\n${code}`
      let node = document.getElementById('node')
      node.innerHTML = ''
      node.innerHTML = fullCode
    }}
    appearance={{
      categories: {
        Listeners: {
          colour: '#AD3A52'
        },
        Values: {
          colour: '#fa6e9b'
        },
        Executables: {
          colour: '#Aecd1e'
        },
        Misc: {
          colour: '#fe645a'
        }
      }
    }}
  >
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
        <field name="VAR" id="7]RumilQTy$NMo`aJv8g">
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
        <field name="VAR" id="3YVXM5T${p5;|s7ig}m9">
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
        <field name="VAR" id="5I5C-TPE^HkTz2L72*RR">
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
            <field name="VAR" id="nq(339~y143?xTzU~wHS">
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
            <field name="VAR" id="nq(339~y143?xTzU~wHS">
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
            <field name="VAR" id="nq(339~y143?xTzU~wHS">
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
  </BlocklyDrawer>,
  document.getElementById('root')
)
//try the editor IIT WORKS
