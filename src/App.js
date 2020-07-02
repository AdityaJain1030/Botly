import React from "react";
import Blockly from 'node-blockly/browser'
import JSZip from 'jszip'
import saveAs from 'file-saver'
import BlocklyDrawer, { Block, Category } from 'react-blockly-drawer'
import "./styles.css";

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this._isMounted = false
    this.zip = new JSZip()
    this.jsCode = null
    this.xmlCode = null
    this.state = {
      xml: `<xml xmlns="https://developers.google.com/blockly/xml" id="workspaceBlocks" style="display: none">
      <block type="setup" id="xSh562M^2+@$ad}:f}uU" x="13" y="13" deletable="false">
        <field name="TOKEN"></field>
      </block>
    </xml>`
  }
  this.downloadBot = this.downloadBot.bind(this)
}
  componentDidMount() {
    this._isMounted = true
  }
  componentWillUnmount() {
    this._isMounted = false
  }
  // onClick(type, state){
  //   if
  // }
  downloadBot(){
    this.zip.file("index.js", this.jsCode)
    this.zip.file("package.json", 
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
    )
    this.zip.file("botly.BLOCKSCONFIG", this.xmlCode)
    this.zip.generateAsync({type:"blob"})
      .then(content => {
        saveAs(content, "bot.zip");
      });
  }

  render() {
    return (
      <div>
        <div className="bgMain" />
        <div className="CODE">
          <div className="NavBars">
            <div className="index" id="clicked">Code
            </div>
          </div>
          <div id="Main_Code"></div>
        </div>
        <div className="blocklyDiv" style={{ position: "absolute", top: "130px", left: "6.52%", right: "6.52%", zIndex: "0", borderRadius: "2px", border: "5px solid #C4C4C4", boxSizing: "border-box" }}>
          <BlocklyDrawer top="200px"
            tools={[
              {
                name: 'setup',
                category: "Listeners",
                block: {
                  init: function () {
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
                      colour: '#ff6d6b',
                      style: {
                        hat: 'cap'
                      },
                      movable: false,
                      tooltip:
                        'This Is the initialization block. All your code will be inside here. To start, put your bot access token in the field and add an event listener',
                      helpUrl:
                        'https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=login'
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
                  let code = `client.login("${text_token}");\nclient.on('ready', () => {\n${statements_callback}});`
                  return code
                }
              },
              {
                name: 'initMessageListener',
                category: 'Listeners',
                block: {
                  init: function () {
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
                      colour: '#ff6d6b',
                      tooltip:
                        'Every time message is sent on the server, the code inside this block runs',
                      helpUrl:
                        'https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-message'
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
                  // TODO: Assemble JavaScript into code variable.
                  let code = `client.on('message', async(msg) => {\n${statements_callback}})\n`
                  return code
                }
              },
              {
                name: 'getFromMessage',
                category: 'Values',
                block: {
                  init: function () {
                    this.jsonInit({
                      message0: 'Get %1 from message returned by "On Message"',
                      args0: [
                        {
                          type: 'field_dropdown',
                          name: 'NAME',
                          options: [
                            ['content', 'content'],
                            ['author', 'member'],
                            ['author profile', 'user'],
                            ['channel', 'channel'],
                            ['first_user_mention', 'mentions'],
                            ['all', 'all']
                          ]
                        }
                      ],
                      output: null,
                      disable: true,
                      colour: '#fa6e9b',
                      tooltip:
                        'This Block is similar to the "Get \'x\' from message \'y\'" block. The only difference is that this block can only be used in the "On Message" block. It automatically takes the message returned by "On Message" as its input, rather then asking you to input a message to parse.',
                      helpUrl: 'https://discord.js.org/#/docs/main/stable/class/Message'
                    })
                  }
                },
                generator: block => {
                  let dropdown_name = block.getFieldValue('NAME')
                  // TODO: Assemble JavaScript into code variable.
                  let code
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
                    case 'user':
                      block.setOutput(true, 'User')
                      //console.log(block)
                      code = `msg.author`
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
                name: 'getFromMessageOuter',
                category: 'Values',
                block: {
                  init: function () {
                    this.jsonInit({
                      message0: 'Get %1 %2 from message %3',
                      args0: [
                        {
                          type: 'field_dropdown',
                          name: 'NAME',
                          options: [
                            ['content', 'content'],
                            ['author', 'member'],
                            ['author profile', 'user'],
                            ['channel', 'channel'],
                            ['first_user_mention', 'mentions']
                          ]
                        },
                        {
                          type: 'input_dummy'
                        },
                        {
                          type: 'input_value',
                          name: 'MESSAGE',
                          check: 'Message'
                        }
                      ],
                      inputsInline: true,
                      output: null,
                      colour: '#fa6e9b',
                      tooltip:
                        'This Block is similar to the "Get \'x\' from message" block. The only difference is that this block can be used anywhere, not just in the "On Message Block". This block asks you to input a message rather than automatically getting it from "On Message".',
                      helpUrl: 'https://discord.js.org/#/docs/main/stable/class/Message'
                    })
                  }
                },
                generator: block => {
                  let dropdown_name = block.getFieldValue('NAME')
                  let value_message = Blockly.JavaScript.valueToCode(
                    block,
                    'MESSAGE',
                    Blockly.JavaScript.ORDER_ATOMIC
                  )
                  // TODO: Assemble JavaScript into code variable.
                  let code
                  switch (dropdown_name) {
                    case 'content':
                      block.setOutput(true, 'String')
                      //console.log(block)
                      code = `${value_message}.content`
                      break
                    case 'member':
                      block.setOutput(true, 'Member')
                      //console.log(block)
                      code = `${value_message}.member`
                      break
                    case 'channel':
                      block.setOutput(true, 'Channel')
                      //console.log(block)
                      code = `${value_message}.channel`
                      break
                    case 'user':
                      block.setOutput(true, 'User')
                      //console.log(block)
                      code = `msg.author`
                      break
                    case 'mentions':
                      block.setOutput(true, 'Member')
                      //console.log(block)
                      code = `${value_message}.mentions.members.first()`
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
                  init: function () {
                    this.jsonInit({
                      message0:
                        'Get %1 from member returned by "On New User Joining Server"',
                      args0: [
                        {
                          type: 'field_dropdown',
                          name: 'OPTIONS',
                          options: [
                            ['all', 'all'],
                            ['server', 'guild'],
                            ['nickname', 'nickname']
                          ]
                        }
                      ],
                      output: null,
                      colour: '#fa6e9b',
                      tooltip:
                        'This Block is similar to the "Get \'x\' from member \'y\'" block. The only difference is that this block can only be used in the "On New User Joining Server" block. It automatically takes the message returned by "On New User Joining Server" as its input, rather then asking you to input a member to parse.',
                      helpUrl: 'https://discord.js.org/#/docs/main/stable/class/GuildMember'
                    })
                  }
                },
                generator: block => {
                  let dropdown_name = block.getFieldValue('OPTIONS')
                  // TODO: Assemble JavaScript into code variable.
                  let code
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
                name: 'getFromMemberOuter',
                category: 'Values',
                block: {
                  init: function () {
                    this.jsonInit({
                      message0: 'Get %1 %2 from member %3',
                      args0: [
                        {
                          type: 'field_dropdown',
                          name: 'NAME',
                          options: [['server', 'guild'], ['nickname', 'nickname']]
                        },
                        {
                          type: 'input_dummy'
                        },
                        {
                          type: 'input_value',
                          name: 'MEMBER',
                          check: 'Member'
                        }
                      ],
                      inputsInline: true,
                      output: null,
                      colour: '#fa6e9b',
                      tooltip:
                        'This Block is similar to the "Get \'x\' from member" block. The only difference is that this block can be used anywhere, not just in the "On New User Joining Server" block. This block asks you to input a member rather than automatically getting it from "On New User Joining Server".',
                      helpUrl: 'https://discord.js.org/#/docs/main/stable/class/GuildMember'
                    })
                  }
                },
                generator: block => {
                  let dropdown_name = block.getFieldValue('NAME')
                  let value_member = Blockly.JavaScript.valueToCode(
                    block,
                    'MEMBER',
                    Blockly.JavaScript.ORDER_ATOMIC
                  )
                  // TODO: Assemble JavaScript into code variable.
                  let code
                  switch (dropdown_name) {
                    case 'guild':
                      block.setOutput(true, 'Guild')
                      //console.log(block)
                      code = `${value_member}.guild`
                      break
                    case 'roles':
                      block.setOutput(true, 'Roles')
                      //console.log(block)
                      code = `${value_member}.roles`
                      break
                    case 'nickname':
                      block.setOutput(true, 'String')
                      //console.log(block)
                      code = `${value_member}.nickname`
                      break
                    case 'permissions':
                      block.setOutput(true, 'Permissions')
                      //console.log(block)
                      code = `${value_member}.permissions`
                      break
                    default:
                      break
                  }
                  // TODO: Change ORDER_NONE to the correct strength.
                  return [code, Blockly.JavaScript.ORDER_NONE]
                }
              },
              {
                name: 'getFromChannel',
                category: 'Values',
                block: {
                  init: function () {
                    this.jsonInit({
                      message0: 'Get %1 %2 from channel %3',
                      args0: [
                        {
                          type: 'field_dropdown',
                          name: 'NAME',
                          options: [['server', 'guild'], ['list of Members', 'members']]
                        },
                        {
                          type: 'input_dummy'
                        },
                        {
                          type: 'input_value',
                          name: 'CHANNEL',
                          check: 'Channel'
                        }
                      ],
                      inputsInline: true,
                      output: null,
                      colour: '#fa6e9b',
                      tooltip:
                        'This Block Takes A Channel as an Input, and outputs the field you are looking for from the channel.',
                      helpUrl:
                        'https://discord.js.org/#/docs/main/stable/class/GuildChannel'
                    })
                  }
                },
                generator: block => {
                  let dropdown_name = block.getFieldValue('NAME')
                  let value_channel = Blockly.JavaScript.valueToCode(
                    block,
                    'CHANNEL',
                    Blockly.JavaScript.ORDER_ATOMIC
                  )
                  // TODO: Assemble JavaScript into code variable.
                  let code
                  switch (dropdown_name) {
                    case 'guild':
                      block.setOutput(true, 'Guild')
                      //console.log(block)
                      code = `${value_channel}.guild`
                      break
                    case 'roles':
                      block.setOutput(true, 'Roles')
                      //console.log(block)
                      code = `${value_channel}.roles`
                      break
                    case 'members':
                      block.setOutput(true, 'String')
                      //console.log(block)
                      code = `${value_channel}.members`
                      break
                    case 'permissions':
                      block.setOutput(true, 'Permissions')
                      //console.log(block)
                      code = `${value_channel}.permissions`
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
                  init: function () {
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
                      tooltip: 'Send A Message On a Channel You Input',
                      helpUrl:
                        'https://discord.js.org/#/docs/main/stable/class/TextChannel?scrollTo=send'
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
                  // TODO: Assemble JavaScript into code variable.
                  let code = `${value_channel}.send(${value_message})\n`
                  return code
                }
              },
              {
                name: 'replyToMessage',
                category: 'Executables',
                block: {
                  init: function () {
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
                      tooltip: 'Reply to a message you input',
                      helpUrl:
                        'https://discord.js.org/#/docs/main/stable/class/Message?scrollTo=reply'
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
                  // TODO: Assemble JavaScript into code variable.
                  let code = `${value_message}.reply(${value_reply})\n`
                  return code
                }
              },
              {
                name: 'embedMessage',
                category: 'Executables',
                block: {
                  init: function () {
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
                      tooltip: 'Embed A message on a channel you input',
                      helpUrl:
                        'https://discord.js.org/#/docs/main/stable/class/MessageEmbed'
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
                  // TODO: Assemble JavaScript into code variable.
                  let code = `let embed = new Discord.MessageEmbed();\n  .setTitle(${value_title})\n  .setDescription(${value_message})\n  .setColor("${colour_color}")\n${value_channel}.send(embed);\n`
                  return code
                }
              },
              {
                name: 'sendDM',
                category: 'Executables',
                block: {
                  init: function () {
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
                      tooltip: 'Send A DM to a Server Member you input',
                      helpUrl:
                        'https://discord.js.org/#/docs/main/stable/class/User?scrollTo=send'
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
                  // TODO: Assemble JavaScript into code variable.
                  let code = `${value_member}.send(${value_message})\n`
                  return code
                }
              },
              {
                name: 'me',
                category: 'Values',
                block: {
                  init: function () {
                    this.jsonInit({
                      message0: 'Me',
                      output: 'User',
                      colour: '#fa6e9b',
                      tooltip: 'The Bot Identity',
                      helpUrl:
                        'https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=user'
                    })
                  }
                },
                generator: block => {
                  let code = `client.user`
                  return [code, Blockly.JavaScript.ORDER_NONE]
                }
              },
              {
                name: 'createInvite',
                category: 'Values',
                block: {
                  init: function () {
                    this.jsonInit({
                      message0:
                        'Create Invite Link To Channel %1 That Can Be Used  %2 Times, And Will Stay Active For  %3 Seconds',
                      args0: [
                        {
                          type: 'input_value',
                          name: 'CHANNEL',
                          check: 'Channel'
                        },
                        {
                          type: 'input_value',
                          name: 'USES',
                          check: 'Number'
                        },
                        {
                          type: 'input_value',
                          name: 'DURATION',
                          check: 'Number'
                        }
                      ],
                      inputsInline: true,
                      output: 'String',
                      colour: '#fa6e9b',
                      tooltip: 'Returns an Invite to a Channel you input',
                      helpUrl:
                        'https://discord.js.org/#/docs/main/stable/class/GuildChannel?scrollTo=createInvite'
                    })
                  }
                },
                generator: block => {
                  let value_channel = Blockly.JavaScript.valueToCode(
                    block,
                    'CHANNEL',
                    Blockly.JavaScript.ORDER_ATOMIC
                  )
                  let value_uses = Blockly.JavaScript.valueToCode(
                    block,
                    'USES',
                    Blockly.JavaScript.ORDER_ATOMIC
                  )
                  let value_duration = Blockly.JavaScript.valueToCode(
                    block,
                    'DURATION',
                    Blockly.JavaScript.ORDER_ATOMIC
                  )

                  let code =
                    '`${await ' +
                    value_channel +
                    '.createInvite({maxAge: ' +
                    value_duration +
                    ', maxUses: ' +
                    value_uses +
                    '})}`\n'
                  return [code, Blockly.JavaScript.ORDER_NONE]
                }
              },
              {
                name: 'deleteChannel',
                category: 'Executables',
                block: {
                  init: function () {
                    this.jsonInit({
                      message0: 'Delete Channel %1',
                      args0: [
                        {
                          type: 'input_value',
                          name: 'ChannelName',
                          check: 'Channel'
                        }
                      ],
                      inputsInline: true,
                      previousStatement: null,
                      nextStatement: null,
                      colour: '#aecd1e',
                      tooltip: 'Deletes A specific channel you input',
                      helpUrl:
                        'https://discord.js.org/#/docs/main/stable/class/GuildChannel?scrollTo=delete'
                    })
                  }
                },
                generator: block => {
                  let value_channelname = Blockly.JavaScript.valueToCode(
                    block,
                    'ChannelName',
                    Blockly.JavaScript.ORDER_ATOMIC
                  )

                  let code = `${value_channelname}.delete()\n`
                  return code
                }
              },
              {
                name: 'ifMemberHasPermission',
                category: 'Values',
                block: {
                  init: function () {
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
                            ['Ban', 'BAN_MEMBERS'],
                            ['Administrate', 'ADMINISTRATOR'],
                            ['Manage Emojis', 'MANAGE_EMOJIS'],
                            ['Send Message', 'SEND_MESSAGE'],
                            ['Edit Roles', 'MANAGE_ROLES'],
                            ['Create/Delete Channels', 'MANAGE_CHANNELS'],
                            ['Invite Users', 'CREATE_INSTANT_INVITE']
                          ]
                        }
                      ],
                      output: 'Boolean',
                      colour: '#fa6e9b',
                      tooltip: 'Check if the user has the permission to do something.',
                      helpUrl:
                        'https://discord.js.org/#/docs/main/stable/class/GuildMember?scrollTo=hasPermission'
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
                  // TODO: Assemble JavaScript into code variable.
                  let code = `${value_member}.hasPermission("${dropdown_permissions}")`
                  // TODO: Change ORDER_NONE to the correct strength.
                  return [code, Blockly.JavaScript.ORDER_NONE]
                }
              },
              {
                name: 'getFromGuild',
                category: 'Values',
                block: {
                  init: function () {
                    this.jsonInit({
                      message0: 'From Server %1 Get %2',
                      args0: [
                        {
                          type: 'input_value',
                          name: 'GUILD',
                          check: 'Guild'
                        },
                        {
                          type: 'field_dropdown',
                          name: 'TYPE',
                          options: [
                            ['list of channels', 'channels'],
                            ['list of members', 'members']
                          ]
                        }
                      ],
                      inputsInline: true,
                      output: null,
                      tooltip: 'Get something from a guild',
                      helpUrl: 'https://discord.js.org/#/docs/main/stable/class/Guild',
                      colour: '#fa6e9b'
                    })
                  }
                },
                generator: block => {
                  let value_guild = Blockly.JavaScript.valueToCode(
                    block,
                    'GUILD',
                    Blockly.JavaScript.ORDER_ATOMIC
                  )
                  let value_channel_name = Blockly.JavaScript.valueToCode(
                    block,
                    'CHANNEL_NAME',
                    Blockly.JavaScript.ORDER_ATOMIC
                  )
                  let code
                  switch (value_channel_name) {
                    case 'channels':
                      block.setOutput(true, 'ChannelList')
                      //console.log(block)
                      code = `${value_guild}.channels`
                      break
                    case 'members':
                      block.setOutput(true, 'MemberList')
                      code = `${value_guild}.members`
                      break
                    default:
                      break
                  }
                  // TODO: Change ORDER_NONE to the correct strength.
                  return [code, Blockly.JavaScript.ORDER_NONE]
                }
              },
              {
                name: 'getFromChannelList',
                category: 'Values',
                block: {
                  init: function () {
                    this.jsonInit({
                      message0: 'From Channel List %1 Get Channel Named %2',
                      args0: [
                        {
                          type: 'input_value',
                          name: 'CHANNELLIST',
                          check: 'ChannelList'
                        },
                        {
                          type: 'input_value',
                          name: 'NAME',
                          check: 'String'
                        }
                      ],
                      inputsInline: true,
                      output: 'Channel',
                      tooltip: 'Get a specific channel from a list of channels',
                      helpUrl:
                        'https://discord.js.org/#/docs/main/stable/class/GuildChannelManager',
                      colour: '#fa6e9b'
                    })
                  }
                },
                generator: block => {
                  let value_channellist = Blockly.JavaScript.valueToCode(
                    block,
                    'CHANNELLIST',
                    Blockly.JavaScript.ORDER_ATOMIC
                  )
                  let value_name = Blockly.JavaScript.valueToCode(
                    block,
                    'NAME',
                    Blockly.JavaScript.ORDER_ATOMIC
                  )
                  let code = `${value_channellist}.cache.find(channel => channel.name = ${value_name})`

                  // TODO: Change ORDER_NONE to the correct strength.
                  return [code, Blockly.JavaScript.ORDER_NONE]
                }
              },
              {
                name: 'getFromMemberList',
                category: 'Values',
                block: {
                  init: function () {
                    this.jsonInit({
                      message0: 'From Member List %1 Get Member Named %2',
                      args0: [
                        {
                          type: 'input_value',
                          name: 'MEMBERLIST',
                          check: 'MemberList'
                        },
                        {
                          type: 'input_value',
                          name: 'NAME',
                          check: 'String'
                        }
                      ],
                      inputsInline: true,
                      output: 'Member',
                      tooltip: 'Get a specific member from a list of members',
                      helpUrl:
                        'https://discord.js.org/#/docs/main/stable/class/GuildChannelManager',
                      colour: '#fa6e9b'
                    })
                  }
                },
                generator: block => {
                  let value_memberlist = Blockly.JavaScript.valueToCode(
                    block,
                    'MEMBERLIST',
                    Blockly.JavaScript.ORDER_ATOMIC
                  )
                  let value_name = Blockly.JavaScript.valueToCode(
                    block,
                    'NAME',
                    Blockly.JavaScript.ORDER_ATOMIC
                  )
                  let code = `${value_memberlist}.cache.find(member => member.nickname = ${value_name})`

                  // TODO: Change ORDER_NONE to the correct strength.
                  return [code, Blockly.JavaScript.ORDER_NONE]
                }
              },
              {
                name: 'kickUser',
                category: 'Executables',
                block: {
                  init: function () {
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
                      tooltip: 'Kick a user from the server for some reason.',
                      helpUrl:
                        'https://discord.js.org/#/docs/main/stable/class/GuildMember?scrollTo=kick'
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
                  // TODO: Assemble JavaScript into code variable.
                  let code = `if(${value_user}){\n   await ${value_user}.kick(${value_reason})\n}\n`
                  // TODO: Change ORDER_NONE to the correct strength.
                  return code
                  //k its gud
                }
              },
              {
                name: 'banUser',
                category: 'Executables',
                block: {
                  init: function () {
                    this.jsonInit({
                      message0: 'Ban Member %1 For This Reason %2',
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
                      tooltip: 'Ban a user from the server for some reason.',
                      helpUrl:
                        'https://discord.js.org/#/docs/main/stable/class/GuildMember?scrollTo=ban'
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
                  // TODO: Assemble JavaScript into code variable.
                  let code = `if(${value_user}){\n   ${value_user}.ban({reason: ${value_reason}})\n}\n`
                  // TODO: Change ORDER_NONE to the correct strength.
                  return code
                  //k its gud
                }
              },
              {
                name: 'createChannel',
                category: 'Executables',
                block: {
                  init: function () {
                    this.jsonInit({
                      message0: 'Create A Text Channel Named %1 On Server %2',
                      args0: [
                        {
                          type: 'input_value',
                          name: 'ChannelName',
                          check: 'String'
                        },
                        {
                          type: 'input_value',
                          name: 'GUILD',
                          check: 'Guild'
                        }
                      ],
                      inputsInline: true,
                      previousStatement: null,
                      nextStatement: null,
                      colour: '#aecd1e',
                      tooltip: 'Create a Text Channel',
                      helpUrl:
                        'https://discord.js.org/#/docs/main/stable/class/GuildChannelManager?scrollTo=create'
                    })
                  }
                },
                generator: block => {
                  let value_channelname = Blockly.JavaScript.valueToCode(
                    block,
                    'ChannelName',
                    Blockly.JavaScript.ORDER_ATOMIC
                  )
                  let value_guild = Blockly.JavaScript.valueToCode(
                    block,
                    'GUILD',
                    Blockly.JavaScript.ORDER_ATOMIC
                  )
                  // TODO: Assemble JavaScript into code variable.
                  let code = `${value_guild}.channels.(${value_channelname}, "text")\n`
                  // TODO: Change ORDER_NONE to the correct strength.
                  return code
                  //k its gud
                }
              },
              {
                name: 'deletemsg',
                category: 'Executables',
                block: {
                  init: function () {
                    this.jsonInit({
                      type: 'delete',
                      message0: 'Delete Message %1',
                      args0: [
                        {
                          type: 'input_value',
                          name: 'msg',
                          check: 'Message'
                        }
                      ],
                      previousStatement: null,
                      nextStatement: null,
                      inputsInline: true,
                      colour: '#aecd1e',
                      tooltip: 'Deletes a Message You Input',
                      helpUrl:
                        'https://discord.js.org/#/docs/main/stable/class/Message?scrollTo=delete'
                    })
                  }
                },
                generator: block => {
                  let value_message = Blockly.JavaScript.valueToCode(
                    block,
                    'Message',
                    Blockly.JavaScript.ORDER_ATOMIC
                  )
                  // TODO: Assemble JavaScript into code variable.
                  let code = `${value_message}.delete(1000)`
                  // TODO: Change ORDER_NONE to the correct strength.
                  return code
                  //k its gud
                }
              },
              {
                name: 'getDateMilliseconds',
                category: 'Misc',
                block: {
                  init: function () {
                    this.jsonInit({
                      message0: 'Date Right Now (in milliseconds)',
                      output: 'Number',
                      colour: '#2d728f',
                      tooltip:
                        'Get the date right now in milliseconds. For most practical applications, you will want to pass this through the ',
                      helpUrl:
                        'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now'
                    })
                  }
                },
                generator: block => {
                  let code = `Date.now()`
                  return [code, Blockly.JavaScript.ORDER_NONE]
                }
              },
              {
                name: 'getDateFromMilliseconds',
                category: 'Misc',
                block: {
                  init: function () {
                    this.jsonInit({
                      message0: 'Turn %1 Milliseconds to a UTC Date',
                      args0: [
                        {
                          type: 'input_value',
                          name: 'Milliseconds',
                          check: 'Number'
                        }
                      ],
                      output: 'String',
                      colour: '#2d728f',
                      tooltip:
                        'Convert the date that you pass in milliseconds to a proper date, in mm/dd/yyyy format',
                      helpUrl:
                        'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toUTCString'
                    })
                  }
                },
                generator: block => {
                  let value_milliseconds = Blockly.JavaScript.valueToCode(
                    block,
                    'Milliseconds',
                    Blockly.JavaScript.ORDER_ATOMIC
                  )
                  // TODO: Assemble JavaScript into code variable.
                  let code = `new Date(${value_milliseconds}).toUTCString()`
                  return [code, Blockly.JavaScript.ORDER_NONE]
                }
              },
              {
                name: 'trycatch',
                category: 'Misc',
                block: {
                  init: function () {
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
                      colour: '#2d728f',
                      tooltip:
                        'Try to do the thing in the first part; if it doesnt work, do the thing in the second part.',
                      helpUrl:
                        'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch'
                    })
                  }
                },
                generator: block => {
                  let statements_try = Blockly.JavaScript.statementToCode(block, 'TRY')
                  let statements_catch = Blockly.JavaScript.statementToCode(block, 'CATCH')
                  // TODO: Assemble JavaScript into code variable.
                  let code = `try{\n   ${statements_try}\n}catch{\n   ${statements_catch}\n}`
                  return code
                }
              },
              {
                name: 'includes',
                category: 'Misc',
                block: {
                  init: function () {
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
                      colour: '#2d728f',
                      tooltip:
                        'Returns true if the first bit of text you passed in contains the second bit of text you passed in; returns false otherwise.',
                      helpUrl:
                        'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes'
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
                  // TODO: Assemble JavaScript into code variable.
                  let code = `${value_str}.includes(${value_sub})`
                  // TODO: Change ORDER_NONE to the correct strength.
                  return [code, Blockly.JavaScript.ORDER_NONE]
                }
              },

              {
                name: 'newGuildJoinUser',
                category: 'Listeners',
                block: {
                  init: function () {
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
                      colour: '#ff6d6b',
                      tooltip:
                        'When a new user joins the server, call what you put inside the block',
                      helpUrl:
                        'https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberAdd'
                    })
                  }
                },
                generator: block => {
                  let statements_callback = Blockly.JavaScript.statementToCode(
                    block,
                    'CALLBACK'
                  )
                  // TODO: Assemble JavaScript into code variable.
                  let code = `client.on('guildMemberAdd', (member) => {\n${statements_callback}})\n`
                  return code
                }
              }
            ]}
            onChange={(code, workspace) => {
              let fullCode
              switch (code.includes('/*include helper*/')) {
                case true:
                  fullCode = `const Discord = require('discord.js');\nconst helper = require('@sombertm/discordjs-helper');\nconst client = new Discord.Client();\n\n${code}`
                  break
                default:
                  fullCode = `const Discord = require('discord.js');\nconst client = new Discord.Client();\n\n${code}`
                  break
              }
              this.jsCode = fullCode
              this.xmlCode = workspace
              let node = document.getElementById("Main_Code")
              node.innerHTML = `<pre>${fullCode}</pre>`
              // console.log(this.jsCode)
            }}
            //init xml
            workspaceXML={this.state.xml}
            //optional rendering
            injectOptions={{
              renderer: 'thrasos'
            }}
            //make stuff look nice
            appearance={{
              categories: {
                Listeners: {
                  colour: '#ff6d6b'
                },
                Values: {
                  colour: '#fa6e9b'
                },
                init: {
                  display: "none"
                },
                Executables: {
                  colour: '#Aecd1e'
                },
                Misc: {
                  colour: '#2d728f'
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
            <Category name="Custom Functions" colour="#c1292e" custom="PROCEDURE"></Category>
          </BlocklyDrawer>
        </div>
        {console.log(this.jsCode)}
        <div className="NavBar">
          <span className="txtN">Botly Editor</span>
          <span className="download" />
          <img src={require("./images/logo.png")} alt="logo" className="Logo" />
          <div className="Download" onClick={this.downloadBot} >Download</div>
          {/* Uploading will work in v1.1 */}
          {/* <label for="file-upload" className="Upload">Upload</label>
          <input type="file" id="file-upload" accept=".blocksConfig" onChange={console.log('file uploaded')}/> */}
        </div>
      </div>
    );
  }
}
