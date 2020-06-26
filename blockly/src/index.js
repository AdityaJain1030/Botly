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
          style: {
            hat: 'cap'
          },
          movable: false,
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
      // TODO: Assemble JavaScript into code letiable.
      let code = `client.login("${text_token}");\nclient.on('ready', () => {\n${statements_callback}});`
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
          previousStatement: 'Boolean',
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
      // console.log(block.outputConnection)
      // if (block.parentBlock_ !== null) {
      //   if (block.parentBlock_.hat !== 'cap') {
      //     //console.log(block.outputConnection.sourceBlock_)
      //    // block.dispose(true)
      //   }
      // }
      // TODO: Assemble JavaScript into code letiable.
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
                ['author', 'member'],
                ['channel', 'channel'],
                ['first_user_mention', 'mentions'],
                ['all', 'all']
              ]
            }
          ],
          output: null,
          disable: true,
          colour: '#fe645a',
          tooltip: '',
          helpUrl: ''
        })
      }
    },
    generator: block => {
      let dropdown_name = block.getFieldValue('NAME')
      // TODO: Assemble JavaScript into code letiable.
      let code
      // let findParent = (block) => {
      //   if (block.parentBlock_ !== null){
      //     findParent(block.parentBlock_)
      //   }
      //   else{
      //     return block
      //   }
      // }
      // console.log(findParent(block))
      switch (dropdown_name) {
        case 'content':
          block.setOutput(true, 'String')
          //console.log(block)
          code = `msg.content`
          break
        case 'member':
          block.setOutput(true, 'Member')
          //console.log(block)
          code = `msg.member`
          break
        case 'channel':
          block.setOutput(true, 'Channel')
          //console.log(block)
          code = `msg.channel`
          break
        case 'mentions':
          block.setOutput(true, 'Member')
          //console.log(block)
          code = `msg.mentions.members.first()`
          break
        case 'all':
          block.setOutput(true, 'Message')
          //console.log(block)
          code = `msg`
          break
        default:
          break
      }
      // TODO: Change ORDER_NONE to the correct strength.
      return [code, Blockly.JavaScript.ORDER_NONE]
    }
  },
  {
    name: 'getFromMember',
    category: 'Values',
    block: {
      init: function() {
        this.jsonInit({
          message0: 'Get %1 from Member',
          args0: [
            {
              type: 'field_dropdown',
              name: 'OPTIONS',
              options: [
                ['all', 'all'],
                ['server', 'guild'],
                ['roles', 'roles'],
                ['permissions', 'permissions'],
                ['nickname', 'nickname']
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
      let dropdown_name = block.getFieldValue('OPTIONS')
      // TODO: Assemble JavaScript into code letiable.
      let code
      // let findParent = (block) => {
      //   if (block.parentBlock_ !== null){
      //     findParent(block.parentBlock_)
      //   }
      //   else{
      //     return block
      //   }
      // }
      // console.log(findParent(block))
      switch (dropdown_name) {
        case 'all':
          block.setOutput(true, 'Member')
          //console.log(block)
          code = `member`
          break
        case 'guild':
          block.setOutput(true, 'Guild')
          //console.log(block)
          code = `member.guild`
          break
        case 'roles':
          block.setOutput(true, 'Roles')
          //console.log(block)
          code = `member.roles`
          break
        case 'nickname':
          block.setOutput(true, 'String')
          //console.log(block)
          code = `member.nickname`
          break
        case 'permissions':
          block.setOutput(true, 'Permissions')
          //console.log(block)
          code = `member.permissions`
          break
        default:
          break
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
          message0: 'Message To Send %1 Channel To Send On %2',
          args0: [
            {
              type: 'input_value',
              name: 'MESSAGE',
              check: 'String',
              align: 'RIGHT'
            },
            {
              type: 'input_value',
              check: 'Channel',
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
      let value_message = Blockly.JavaScript.valueToCode(
        block,
        'MESSAGE',
        Blockly.JavaScript.ORDER_ATOMIC
      )
      let value_channel = Blockly.JavaScript.valueToCode(
        block,
        'Channel',
        Blockly.JavaScript.ORDER_ATOMIC
      )
      // TODO: Assemble JavaScript into code letiable.
      let code = `${value_channel}.send(${value_message})\n`
      return code
    }
  },
  {
    name: 'replyToMessage',
    category: 'Executables',
    block: {
      init: function() {
        this.jsonInit({
          message0: 'Reply %1 To Message %2',
          args0: [
            {
              type: 'input_value',
              name: 'REPLY',
              check: 'String'
            },
            {
              type: 'input_value',
              name: 'Message',
              check: 'Message'
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
      let value_reply = Blockly.JavaScript.valueToCode(
        block,
        'REPLY',
        Blockly.JavaScript.ORDER_ATOMIC
      )
      let value_message = Blockly.JavaScript.valueToCode(
        block,
        'Message',
        Blockly.JavaScript.ORDER_ATOMIC
      )
      // TODO: Assemble JavaScript into code letiable.
      let code = `${value_message}.reply(${value_reply})\n`
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
            'Embed Message On Channel  %1 With These Properties: %2 Title: %3 Description: %4 Color %5',
          args0: [
            {
              type: 'input_value',
              check: 'Channel',
              name: 'Channel'
            },
            {
              type: 'input_dummy',
              align: 'RIGHT'
            },
            {
              type: 'input_value',
              name: 'TITLE',
              align: 'RIGHT',
              check: 'String'
            },
            {
              type: 'input_value',
              name: 'MESSAGE',
              align: 'RIGHT',
              check: 'String'
            },
            {
              type: 'field_colour',
              name: 'color',
              colour: '#ff0000'
            }
          ],
          inputsInline: false,
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
      let value_title = Blockly.JavaScript.valueToCode(
        block,
        'TITLE',
        Blockly.JavaScript.ORDER_ATOMIC
      )
      let value_message = Blockly.JavaScript.valueToCode(
        block,
        'MESSAGE',
        Blockly.JavaScript.ORDER_ATOMIC
      )
      let colour_color = block.getFieldValue('color')
      // TODO: Assemble JavaScript into code letiable.
      let code = `let embed = new Discord.MessageEmbed();\n  .setTitle(${value_title})\n  .setDescription(${value_message})\n  .setColor("${colour_color}")\n${value_channel}.send(embed);\n`
      return code
    }
  },
  {
    name: '=sendDM',
    category: 'Executables',
    block: {
      init: function() {
        this.jsonInit({
          message0: 'DM %1 To Member %2',
          args0: [
            {
              type: 'input_value',
              name: 'MESSAGE',
              check: 'String',
              align: 'RIGHT'
            },
            {
              type: 'input_value',
              name: 'MEMBER',
              check: 'Member'
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
      let value_message = Blockly.JavaScript.valueToCode(
        block,
        'MESSAGE',
        Blockly.JavaScript.ORDER_ATOMIC
      )
      let value_member = Blockly.JavaScript.valueToCode(
        block,
        'MEMBER',
        Blockly.JavaScript.ORDER_ATOMIC
      )
      // TODO: Assemble JavaScript into code letiable.
      let code = `${value_member}.send(${value_message})\n`
      return code
    }
  },
  {
    name: 'me',
    category: 'Values',
    block: {
      init: function() {
        this.jsonInit({
          message0: 'Me',
          output: 'User',
          colour: '#fe645a',
          tooltip: '',
          helpUrl: ''
        })
      }
    },
    generator: block => {
      let code = `client.user`
      return [code, Blockly.JavaScript.ORDER_NONE]
    }
  },
  {
    name: 'ifMemberHasPermission',
    category: 'Values',
    block: {
      init: function() {
        this.jsonInit({
          message0: 'Does Member %1 Has Permission To %2',
          args0: [
            {
              type: 'input_value',
              name: 'MEMBER',
              check: 'Member'
            },
            {
              type: 'field_dropdown',
              name: 'PERMISSIONS',
              options: [
                ['Kick', 'KICK_MEMBERS'],
                ['Administrate', 'ADMINISTRATOR'],
                ['Manage Emojis', 'MANAGE_EMOJIS'],
                ['Send Message', 'SEND_MESSAGE'],
                ['Edit Roles', 'MANAGE_ROLES']
              ]
            }
          ],
          output: 'Boolean',
          colour: '#fe645a',
          tooltip: '',
          helpUrl: ''
        })
      }
    },
    generator: block => {
      let value_member = Blockly.JavaScript.valueToCode(
        block,
        'MEMBER',
        Blockly.JavaScript.ORDER_ATOMIC
      )
      let dropdown_permissions = block.getFieldValue('PERMISSIONS')
      // TODO: Assemble JavaScript into code letiable.
      let code = `${value_member}.hasPermission("${dropdown_permissions}")`
      // TODO: Change ORDER_NONE to the correct strength.
      return [code, Blockly.JavaScript.ORDER_NONE]
    }
  },
  {
    name: 'kickUser',
    category: 'Executables',
    block: {
      init: function() {
        this.jsonInit({
          message0: 'Kick Member %1 For This Reason %2',
          args0: [
            {
              type: 'input_value',
              name: 'USER',
              check: 'Member'
            },
            {
              type: 'input_value',
              name: 'REASON',
              check: 'String'
            }
          ],
          inputsInline: true,
          previousStatement: null,
          nextStatement: null,
          colour: '#aecd1e',
          tooltip: '',
          helpUrl: ''
        })
      }
    },
    generator: block => {
      let value_user = Blockly.JavaScript.valueToCode(
        block,
        'USER',
        Blockly.JavaScript.ORDER_ATOMIC
      )
      let value_reason = Blockly.JavaScript.valueToCode(
        block,
        'REASON',
        Blockly.JavaScript.ORDER_ATOMIC
      )
      // TODO: Assemble JavaScript into code letiable.
      let code = `if(${value_user}){\n   ${value_user}.kick(${value_reason})}`
      // TODO: Change ORDER_NONE to the correct strength.
      return code
      //k its gud
    }
  },
  {
    name: 'trycatch',
    category: 'Misc',
    block: {
      init: function() {
        this.jsonInit({
          message0: "Try to %1 And If that doesn't work %2",
          args0: [
            {
              type: 'input_statement',
              name: 'TRY',
              align: 'RIGHT'
            },
            {
              type: 'input_statement',
              name: 'CATCH',
              align: 'RIGHT'
            }
          ],
          previousStatement: null,
          nextStatement: null,
          colour: '#fe645a',
          tooltip: '',
          helpUrl: ''
        })
      }
    },
    generator: block => {
      let statements_try = Blockly.JavaScript.statementToCode(block, 'TRY')
      let statements_catch = Blockly.JavaScript.statementToCode(block, 'CATCH')
      // TODO: Assemble JavaScript into code letiable.
      let code = `try{\n   ${statements_try}\n}catch{\n   ${statements_catch}\n}`
      return code
    }
  },
  {
    name: 'includes',
    category: 'Misc',
    block: {
      init: function() {
        this.jsonInit({
          message0: 'If %1 Includes %2',
          args0: [
            {
              type: 'input_value',
              name: 'STR',
              check: ['Array', 'String']
            },
            {
              type: 'input_value',
              name: 'SUB'
            }
          ],
          inputsInline: true,
          output: 'Boolean',
          colour: '#fe645a',
          tooltip: '',
          helpUrl: ''
        })
      }
    },
    generator: block => {
      let value_str = Blockly.JavaScript.valueToCode(
        block,
        'STR',
        Blockly.JavaScript.ORDER_ATOMIC
      )
      let value_sub = Blockly.JavaScript.valueToCode(
        block,
        'SUB',
        Blockly.JavaScript.ORDER_ATOMIC
      )
      // TODO: Assemble JavaScript into code letiable.
      let code = `${value_str}.includes(${value_sub})`
      // TODO: Change ORDER_NONE to the correct strength.
      return [code, Blockly.JavaScript.ORDER_NONE]
    }
  },

  {
    name: 'newGuildJoinUser',
    category: 'Listeners',
    block: {
      init: function() {
        this.jsonInit({
          message0: 'On New User Joining Server %1',
          args0: [
            {
              type: 'input_statement',
              name: 'CALLBACK'
            }
          ],
          previousStatement: null,
          nextStatement: null,
          colour: '#AD3A52',
          tooltip: '',
          helpUrl: ''
        })
      }
    },
    generator: block => {
      let statements_callback = Blockly.JavaScript.statementToCode(
        block,
        'CALLBACK'
      )
      // TODO: Assemble JavaScript into code letiable.
      let code = `client.on('guildMemberAdd', (member) => {\n${statements_callback}})\n`
      return code
    }
  }
]

ReactDOM.render(
  <BlocklyDrawer
    tools={blocklyTools}
    onChange={(code, workspace) => {
      let fullCode = `const Discord = require('discord.js');\nconst client = new Discord.Client();\n\n${code}`
      let node = document.getElementById('node')
      node.innerHTML = ''
      node.innerHTML = fullCode
    }}
    workspaceXML={`<xml xmlns="https://developers.google.com/blockly/xml" id="workspaceBlocks" style="display: none">
    <block type="setup" id="xSh562M^2+@$ad}:f}uU" x="13" y="13" deletable="false">
      <field name="TOKEN"></field>
    </block>
  </xml>`}
    injectOptions={{
      renderer: 'thrasos'
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
          <Block type="letiables_get">
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
          <Block type="letiables_get">
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
          <Block type="letiables_get">
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
  </BlocklyDrawer>,
  document.getElementById('root')
)
