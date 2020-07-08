import Blockly from "node-blockly/browser";
import insideWrongBlock from "./functions.js";

const Blocks = [
  {
    name: "setup",
    category: "Events",
    block: {
      init: function() {
        this.jsonInit({
          message0: "Setup Discord bot with token %1 %2 then run %3",
          args0: [
            {
              type: "field_input",
              name: "TOKEN",
              text: ""
            },
            {
              type: "input_dummy"
            },
            {
              type: "input_statement",
              name: "Callback"
            }
          ],
          style: {
            hat: "cap"
          },
          disabled: true,
          inputsInline: false,
          colour: "#ff6d6b",
          movable: false,
          tooltip:
            "This Is the initialization block. All your code will be inside here. To start, put your bot access token in the field and add an event listener",
          helpUrl:
            "https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=login"
        });
      }
    },
    generator: block => {
      let text_token = block.getFieldValue("TOKEN");
      let statements_callback = Blockly.JavaScript.statementToCode(
        block,
        "Callback"
      );
      // TODO: Assemble JavaScript into code variable.
      let code = `client.login("${text_token}")\nclient.on('ready', () => {\n${statements_callback}})`;
      return code;
    }
  },
  {
    name: "initMessageListener",
    category: "Events",
    block: {
      init: function() {
        this.jsonInit({
          message0: "On Message %1",
          args0: [
            {
              type: "input_statement",
              name: "CALLBACK"
            }
          ],
          previousStatement: null,
          nextStatement: null,
          colour: "#ff6d6b",
          tooltip:
            "Every time message is sent on the server, the code inside this block runs",
          helpUrl:
            "https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-message"
        });
      }
    },
    generator: block => {
      let statements_callback = Blockly.JavaScript.statementToCode(
        block,
        "CALLBACK"
      );
      if (block.getSurroundParent() !== null) {
        if (block.getSurroundParent().type !== "setup") {
          block.unplug(true, true);
        }
      }
      //console.log(Blockly.JavaScript.RESERVED_WORDS_);
      let code = `client.on('message', async(msg) => {\n${statements_callback}})\n`;
      return code;
    }
  },
  {
    name: `Returned`,
    category: "Values",
    block: {
      init: function() {
        this.jsonInit({
          message0: "%1 returned by%2Listeners",
          args0: [
            {
              type: "field_dropdown",
              name: "NAME",
              options: [
                ["Message", "msg"],
                ["Member", "member"],
                ["Channel", "channel"],
                ["Role", "role"]
              ]
            },
            {
              type: "field_label_serializable",
              name: "TYPE",
              text: `"Message"`
            }
          ],
          inputsInline: true,
          output: null,
          colour: "#fa6e9b",
          tooltip: "",
          helpUrl: ""
        });
      }
    },
    generator: block => {
      let dropdown_name = block.getFieldValue("NAME");
      let field_label_serializable_type = block.getField("TYPE");

      switch (dropdown_name) {
        case "msg":
          block.setTooltip(
            `This Block Represents the Message returned by the "On Message" Listener. It can only be used inside the "On Message" Listener`
          );
          block.setHelpUrl(
            `https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-message`
          );
          field_label_serializable_type.setValue(`"Message"`);
          block.setOutput(true, "Message");
          if (insideWrongBlock(block, ["initMessageListener"], []) === true) {
            block.unplug(true, true);
          }
          break;
        case "member":
          block.setTooltip(
            `This Block Represents the Member returned by the "On New User Joining Server"/"On Member Leaving Server" Events. It can only be used inside the "On New User Joining Server"/"On Member Leaving Server" Events`
          );
          block.setHelpUrl(
            `https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberAdd`
          );
          field_label_serializable_type.setValue(`"Member"`);
          block.setOutput(true, "Member");
          if (
            insideWrongBlock(block, ["newGuildJoinUser", "memberLeave"], []) ===
            true
          ) {
            block.unplug(true, true);
          }
          break;
        case "channel":
          block.setTooltip(
            `This Block Represents the channel returned by the "On New Channel Created"/"on Channel Deleted" Events. It can only be used inside the "On New Channel Created"/"On Channel Deleted" Events`
          );
          block.setHelpUrl(
            `https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-channelCreate`
          );
          field_label_serializable_type.setValue(`"Channel"`);
          block.setOutput(true, "Channel");
          //console.log(block.output);
          if (
            insideWrongBlock(block, ["channelCreate", "channelDelete"], []) ===
            true
          ) {
            block.unplug(true, true);
          }
          break;
        case "role":
          block.setTooltip(
            `This Block Represents the role returned by the "On New Role Created"/"On Role Deleted" Events. It can only be used inside the "On New Role Created"/"On Role Deleted" Events`
          );
          block.setHelpUrl(
            `https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-roleCreate`
          );
          field_label_serializable_type.setValue(`"Role"`);
          block.setOutput(true, "Role");
          if (
            insideWrongBlock(block, ["roleCreate", "roleDelete"], []) === true
          ) {
            block.unplug(true, true);
          }
          break;

        default:
          break;
      }
      let code = dropdown_name;
      // TODO: Change ORDER_NONE to the correct strength.
      return [code, Blockly.JavaScript.ORDER_NONE];
    }
  },
  {
    name: "getFromMessage",
    category: "Values",
    block: {
      init: function() {
        this.jsonInit({
          message0: "Get %1 %2 from message %3",
          args0: [
            {
              type: "field_dropdown",
              name: "NAME",
              options: [
                ["content", "content"],
                ["author", "member"],
                ["author user", "user"],
                ["isPinned", "pinned"],
                ["channel", "channel"],
                ["first_user_mention", "mentions"]
              ]
            },
            {
              type: "input_dummy"
            },
            {
              type: "input_value",
              name: "MESSAGE",
              check: "Message"
            }
          ],
          inputsInline: true,
          output: null,
          colour: "#fa6e9b",
          tooltip: "This block gets specific data from a message.",
          helpUrl: "https://discord.js.org/#/docs/main/stable/class/Message"
        });
      }
    },
    generator: block => {
      let dropdown_name = block.getFieldValue("NAME");
      let value_message = Blockly.JavaScript.valueToCode(
        block,
        "MESSAGE",
        Blockly.JavaScript.ORDER_ATOMIC
      );
      // block.setOnChange(block.setEnabled(block.allInputsFilled()));
      block.setOnChange(() => {
        block.setEnabled(block.allInputsFilled());
      });
      let code;
      //wut?
      switch (dropdown_name) {
        case "content":
          block.setOutput(true, "String");
          //console.log(block)
          code = `${value_message}.content`;
          break;
        case "member":
          block.setOutput(true, "Member");
          //console.log(block)
          code = `${value_message}.member`;
          break;
        case "channel":
          block.setOutput(true, "Channel");
          //console.log(block)
          code = `${value_message}.channel`;
          break;
        case "user":
          block.setOutput(true, "User");
          //console.log(block)
          code = `msg.author`;
          break;
        case "pinned":
          block.setOutput(true, "Boolean");
          //console.log(block)
          code = `msg.pinned`;
          break;
        case "mentions":
          block.setOutput(true, "Member");
          //console.log(block)
          code = `${value_message}.mentions.members.first()`;
          break;
        default:
          break;
      }
      // TODO: Change ORDER_NONE to the correct strength.
      return [code, Blockly.JavaScript.ORDER_NONE];
    }
  },
  {
    name: "getFromMember",
    category: "Values",
    block: {
      init: function() {
        this.jsonInit({
          message0: "Get %1 %2 from member %3",
          args0: [
            {
              type: "field_dropdown",
              name: "NAME",
              options: [
                ["Server", "guild"],
                ["Nickname", "nickname"],
                ["Last Message Sent", "message"],
                ["First Role", "role"],
                ["All Roles", "roles"],
                ["User Profile", "user"]
              ]
            },
            {
              type: "input_dummy"
            },
            {
              type: "input_value",
              name: "MEMBER",
              check: "Member"
            }
          ],
          inputsInline: true,
          output: null,
          colour: "#fa6e9b",
          tooltip: "This block gets data from a specific member",
          helpUrl: "https://discord.js.org/#/docs/main/stable/class/GuildMember"
        });
      }
    },
    generator: block => {
      let dropdown_name = block.getFieldValue("NAME");
      let value_member = Blockly.JavaScript.valueToCode(
        block,
        "MEMBER",
        Blockly.JavaScript.ORDER_ATOMIC
      );
      block.setOnChange(() => {
        block.setEnabled(block.allInputsFilled());
      });
      // TODO: Assemble JavaScript into code variable.
      let code;
      switch (dropdown_name) {
        case "guild":
          block.setOutput(true, "Guild");
          //console.log(block)
          code = `${value_member}.guild`;
          break;
        case "roles":
          block.setOutput(true, "RoleList");
          //console.log(block)
          code = `${value_member}.roles`;
          break;
        case "role":
          block.setOutput(true, "Role");
          //console.log(block)
          code = `${value_member}.roles.cache.first()`;
          break;
        case "nickname":
          block.setOutput(true, "String");
          //console.log(block)
          code = `${value_member}.nickname`;
          break;
        case "message":
          block.setOutput(true, "Message");
          //console.log(block)
          code = `${value_member}.lastMessage`;
          break;
        case "user":
          block.setOutput(true, "User");
          //console.log(block)
          code = `${value_member}.user`;
          break;
        default:
          break;
      }
      // TODO: Change ORDER_NONE to the correct strength.
      return [code, Blockly.JavaScript.ORDER_NONE];
    }
  },
  {
    name: "getFromUserProfile",
    category: "Values",
    block: {
      init: function() {
        this.jsonInit({
          message0: "Get %1 %2 from User Profile %3",
          args0: [
            {
              type: "field_dropdown",
              name: "NAME",
              options: [
                ["Name", "name"],
                ["Avatar URL", "avatar"],
                ["is a Bot?", "bot"],
                ["Tag", "tag"]
              ]
            },
            {
              type: "input_dummy"
            },
            {
              type: "input_value",
              name: "USER",
              check: "User"
            }
          ],
          inputsInline: true,
          output: null,
          colour: "#fa6e9b",
          tooltip: "This block gets data from a specific User Profile",
          helpUrl: "https://discord.js.org/#/docs/main/stable/class/User"
        });
      }
    },
    generator: block => {
      let dropdown_name = block.getFieldValue("NAME");
      let value_member = Blockly.JavaScript.valueToCode(
        block,
        "USER",
        Blockly.JavaScript.ORDER_ATOMIC
      );
      block.setOnChange(() => {
        block.setEnabled(block.allInputsFilled());
      });
      // TODO: Assemble JavaScript into code variable.
      let code;
      switch (dropdown_name) {
        case "name":
          block.setOutput(true, "String");
          //console.log(block)
          code = `${value_member}.username`;
          break;
        case "roles":
          block.setOutput(true, "String");
          //console.log(block)
          code = `${value_member}.displayAvatarURL()`;
          break;
        case "bot":
          block.setOutput(true, "Boolean");
          //console.log(block)
          code = `${value_member}.bot`;
          break;
        case "tag":
          block.setOutput(true, "String");
          //console.log(block)
          code = `${value_member}.tag`;
          break;
        default:
          break;
      }
      // TODO: Change ORDER_NONE to the correct strength.
      return [code, Blockly.JavaScript.ORDER_NONE];
    }
  },
  {
    name: "getFromChannel",
    category: "Values",
    block: {
      init: function() {
        this.jsonInit({
          message0: "Get %1 %2 from channel %3",
          args0: [
            {
              type: "field_dropdown",
              name: "NAME",
              options: [
                ["server", "guild"],
                ["Array of Members", "members"],
                ["Creation Date", "date"],
                ["Channel Name", "name"],
                ["channel type", "type"]
              ]
            },
            {
              type: "input_dummy"
            },
            {
              type: "input_value",
              name: "CHANNEL",
              check: "Channel"
            }
          ],
          inputsInline: true,
          output: null,
          colour: "#fa6e9b",
          tooltip: "This block gets specific data from a channel",
          helpUrl:
            "https://discord.js.org/#/docs/main/stable/class/GuildChannel"
        });
      }
    },
    generator: block => {
      let dropdown_name = block.getFieldValue("NAME");
      let value_channel = Blockly.JavaScript.valueToCode(
        block,
        "CHANNEL",
        Blockly.JavaScript.ORDER_ATOMIC
      );
      block.setOnChange(() => {
        block.setEnabled(block.allInputsFilled());
      });
      // TODO: Assemble JavaScript into code variable.
      let code;
      switch (dropdown_name) {
        case "guild":
          block.setOutput(true, "Guild");
          //console.log(block)
          code = `${value_channel}.guild`;
          break;
        case "type":
          block.setOutput(true, "String");
          //console.log(block)
          code = `${value_channel}.type`;
          break;
        case "members":
          block.setOutput(true, "String");
          //console.log(block)
          code = `${value_channel}.members`;
          break;
        case "name":
          block.setOutput(true, "String");
          //console.log(block)
          code = `${value_channel}.name`;
          break;
        case "date":
          block.setOutput(true, "String");
          //console.log(block)
          code = `${value_channel}.createdAt.toUTCString()`;
          break;
        default:
          break;
      }
      // TODO: Change ORDER_NONE to the correct strength.
      return [code, Blockly.JavaScript.ORDER_NONE];
    }
  },
  {
    name: "getFromRole",
    category: "Values",
    block: {
      init: function() {
        this.jsonInit({
          message0: "Get %1 %2 from role %3",
          args0: [
            {
              type: "field_dropdown",
              name: "NAME",
              options: [
                ["Server", "guild"],
                ["Name", "name"],
                ["Is Mentionable", "mentionable"],
                ["Color", "color"],
                ["List Of Members With Role", "members"]
              ]
            },
            {
              type: "input_dummy"
            },
            {
              type: "input_value",
              name: "ROLE",
              check: "Role"
            }
          ],
          inputsInline: true,
          output: null,
          colour: "#fa6e9b",
          tooltip: "This block gets data from a specific role",
          helpUrl: "https://discord.js.org/#/docs/main/stable/class/Role"
        });
      }
    },
    generator: block => {
      let dropdown_name = block.getFieldValue("NAME");
      let value_role = Blockly.JavaScript.valueToCode(
        block,
        "ROLE",
        Blockly.JavaScript.ORDER_ATOMIC
      );
      block.setOnChange(() => {
        block.setEnabled(block.allInputsFilled());
      });
      // TODO: Assemble JavaScript into code variable.
      let code;
      switch (dropdown_name) {
        case "guild":
          block.setOutput(true, "Guild");
          //console.log(block)
          code = `${value_role}.guild`;
          break;
        case "name":
          block.setOutput(true, "String");
          //console.log(block)
          code = `${value_role}.name`;
          break;
        case "role":
          block.setOutput(true, "Boolean");
          //console.log(block)
          code = `${value_role}.mentionable`;
          break;
        case "color":
          block.setOutput(true, "String");
          //console.log(block)
          code = `${value_role}.hexColor`;
          break;
        case "member":
          block.setOutput(true, "MemberList");
          //console.log(block)
          code = `${value_role}.members`;
          break;
        default:
          break;
      }
      // TODO: Change ORDER_NONE to the correct strength.
      return [code, Blockly.JavaScript.ORDER_NONE];
    }
  },
  {
    name: "sendMessage",
    category: "Executables",
    block: {
      init: function() {
        this.jsonInit({
          message0: "Message To Send %1 Channel To Send On %2",
          args0: [
            {
              type: "input_value",
              name: "MESSAGE",
              check: "String",
              align: "RIGHT"
            },
            {
              type: "input_value",
              check: "Channel",
              name: "Channel"
            }
          ],
          inputsInline: true,
          previousStatement: null,
          nextStatement: null,
          colour: "#Aecd1e",
          tooltip: "Send A Message On a Channel You Input",
          helpUrl:
            "https://discord.js.org/#/docs/main/stable/class/TextChannel?scrollTo=send"
        });
      }
    },
    generator: block => {
      let value_message = Blockly.JavaScript.valueToCode(
        block,
        "MESSAGE",
        Blockly.JavaScript.ORDER_ATOMIC
      );
      let value_channel = Blockly.JavaScript.valueToCode(
        block,
        "Channel",
        Blockly.JavaScript.ORDER_ATOMIC
      );
      block.setOnChange(() => {
        block.setEnabled(block.allInputsFilled());
      });
      // TODO: Assemble JavaScript into code variable.
      let code = `await ${value_channel}.send(${value_message});\n`;
      return code;
    }
  },
  {
    name: "replyToMessage",
    category: "Executables",
    block: {
      init: function() {
        this.jsonInit({
          message0: "Reply %1 To Message %2",
          args0: [
            {
              type: "input_value",
              name: "REPLY",
              check: "String"
            },
            {
              type: "input_value",
              name: "Message",
              check: "Message"
            }
          ],
          inputsInline: true,
          previousStatement: null,
          nextStatement: null,
          colour: "#Aecd1e",
          tooltip: "Reply to a message you input",
          helpUrl:
            "https://discord.js.org/#/docs/main/stable/class/Message?scrollTo=reply"
        });
      }
    },
    generator: block => {
      let value_reply = Blockly.JavaScript.valueToCode(
        block,
        "REPLY",
        Blockly.JavaScript.ORDER_ATOMIC
      );
      let value_message = Blockly.JavaScript.valueToCode(
        block,
        "Message",
        Blockly.JavaScript.ORDER_ATOMIC
      );
      block.setOnChange(() => {
        block.setEnabled(block.allInputsFilled());
      });
      // TODO: Assemble JavaScript into code variable.
      let code = `await ${value_message}.reply(${value_reply});\n`;
      return code;
    }
  },
  {
    name: "pin_unpin",
    category: "Executables",
    block: {
      init: function() {
        this.jsonInit({
          message0: "%1 Message %2",
          args0: [
            {
              type: "field_dropdown",
              name: "pin/unpin",
              options: [["Pin", ".pin()"], ["Unpin", ".unpin()"]]
            },
            {
              type: "input_value",
              name: "Message",
              check: "Message"
            }
          ],
          inputsInline: true,
          previousStatement: null,
          nextStatement: null,
          colour: "#aecd1e",
          tooltip: "Pin/Unpin a message to the channelthe message was sent on",
          helpUrl:
            "https://discord.js.org/#/docs/main/stable/class/Message?scrollTo=pin"
        });
      }
    },
    generator: block => {
      let dropdown_pin_unpin = block.getFieldValue("pin/unpin");
      let value_message = Blockly.JavaScript.valueToCode(
        block,
        "Message",
        Blockly.JavaScript.ORDER_ATOMIC
      );
      block.setOnChange(() => {
        block.setEnabled(block.allInputsFilled());
      });
      // TODO: Assemble JavaScript into code variable.
      let code = `await ${value_message}${dropdown_pin_unpin};\n`;
      return code;
    }
  },
  {
    name: "embedMessage",
    category: "Executables",
    block: {
      init: function() {
        this.jsonInit({
          lastDummyAlign0: "RIGHT",
          message0:
            "Embed Message On Channel  %1 With These Properties: %2 Title: %3 Description: %4 Color %5",
          args0: [
            {
              type: "input_value",
              check: "Channel",
              name: "Channel"
            },
            {
              type: "input_dummy",
              align: "RIGHT"
            },
            {
              type: "input_value",
              name: "TITLE",
              align: "RIGHT",
              check: "String"
            },
            {
              type: "input_value",
              name: "MESSAGE",
              align: "RIGHT",
              check: "String"
            },
            {
              type: "field_colour",
              name: "color",
              colour: "#ff0000"
            }
          ],
          inputsInline: false,
          previousStatement: null,
          nextStatement: null,
          colour: "#Aecd1e",
          tooltip: "Embed A message on a channel you input",
          helpUrl:
            "https://discord.js.org/#/docs/main/stable/class/MessageEmbed"
        });
      }
    },
    generator: block => {
      let value_channel = Blockly.JavaScript.valueToCode(
        block,
        "Channel",
        Blockly.JavaScript.ORDER_ATOMIC
      );
      let value_title = Blockly.JavaScript.valueToCode(
        block,
        "TITLE",
        Blockly.JavaScript.ORDER_ATOMIC
      );
      let value_message = Blockly.JavaScript.valueToCode(
        block,
        "MESSAGE",
        Blockly.JavaScript.ORDER_ATOMIC
      );
      let colour_color = block.getFieldValue("color");
      block.setOnChange(() => {
        block.setEnabled(block.allInputsFilled());
      });
      // TODO: Assemble JavaScript into code variable.
      let code = `let embed = new Discord.MessageEmbed()\n  .setTitle(${value_title})\n  .setDescription(${value_message})\n  .setColor("${colour_color}");\n${value_channel}.send(embed);\n`;
      return code;
    }
  },
  {
    name: "Limit/Unlimit Channel",
    category: "Executables",
    block: {
      init: function() {
        this.jsonInit({
          message0: "%1 %2 Members with Role %3 %4 %5 Messages in Channel %6",
          args0: [
            {
              type: "field_dropdown",
              name: "y/n",
              options: [["Let", "true"], ["Don't let", "false"]]
            },
            {
              type: "input_dummy",
              align: "RIGHT"
            },
            {
              type: "input_value",
              name: "role",
              check: "Role"
            },
            {
              type: "field_dropdown",
              name: "a/b",
              options: [["View", "VIEW_CHANNEL"], ["Send", "SEND_MESSAGES"]]
            },
            {
              type: "input_dummy"
            },
            {
              type: "input_value",
              name: "CHANNEL",
              check: "Channel"
            }
          ],
          inputsInline: true,
          previousStatement: null,
          nextStatement: null,
          colour: "#aecd1e",
          tooltip: "Limit things that people can do on a specific channel.",
          helpUrl: "https://discordjs.guide/popular-topics/permissions.html"
        });
      }
    },
    generator: block => {
      let dropdown_true = block.getFieldValue("y/n");
      let dropdown_a = block.getFieldValue("a/b");
      let value_role = Blockly.JavaScript.valueToCode(
        block,
        "role",
        Blockly.JavaScript.ORDER_ATOMIC
      );
      let value_channel = Blockly.JavaScript.valueToCode(
        block,
        "CHANNEL",
        Blockly.JavaScript.ORDER_ATOMIC
      );
      block.setOnChange(() => {
        block.setEnabled(block.allInputsFilled());
      });
      // TODO: Assemble JavaScript into code variable.
      let code = `await ${value_channel}.updateOverwrite(${value_role}, {\n   ${dropdown_a}: ${dropdown_true} \n});\n`;
      return code;
    }
  },
  {
    name: "roleToMember",
    category: "Executables",
    block: {
      init: function() {
        this.jsonInit({
          message0: "%1 %2 Role %3 To Member %4",
          args0: [
            {
              type: "field_dropdown",
              name: "GIVE/TAKE",
              options: [["Give", "add"], ["Take", "remove"]]
            },
            {
              type: "input_dummy"
            },
            {
              type: "input_value",
              name: "ROLE",
              check: "Role"
            },
            {
              type: "input_value",
              name: "MEMBER",
              check: "Member"
            }
          ],
          inputsInline: true,
          previousStatement: null,
          nextStatement: null,
          colour: "#aecd1e",
          tooltip: "Give/Take a role from a member",
          helpUrl: "https://anidiots.guide/understanding/roles"
        });
      }
    },
    generator: block => {
      let dropdown_give_take = block.getFieldValue("GIVE/TAKE");
      let value_role = Blockly.JavaScript.valueToCode(
        block,
        "ROLE",
        Blockly.JavaScript.ORDER_ATOMIC
      );
      let value_member = Blockly.JavaScript.valueToCode(
        block,
        "MEMBER",
        Blockly.JavaScript.ORDER_ATOMIC
      );
      block.setOnChange(() => {
        block.setEnabled(block.allInputsFilled());
      });
      // TODO: Assemble JavaScript into code variable.
      let code = `await ${value_member}.${dropdown_give_take}Role(${value_role});\n`;
      return code;
    }
  },
  {
    name: "permissionToRole",
    category: "Executables",
    block: {
      init: function() {
        this.jsonInit({
          message0: "%1 %2 Permission %3 To All Members With Role %4",
          args0: [
            {
              type: "field_dropdown",
              name: "GIVE/TAKE",
              options: [["Give", "add"], ["Take", "remove"]]
            },
            {
              type: "input_dummy"
            },
            {
              type: "field_dropdown",
              name: "PERMISSION",
              options: [
                ["Kick", "KICK_MEMBERS"],
                ["Ban", "BAN_MEMBERS"],
                ["Administrate", "ADMINISTRATOR"],
                ["Manage Emojis", "MANAGE_EMOJIS"],
                ["Manage Channels", "MANAGE_CHANNELS"],
                ["Embed", "EMBED_LINKS"],
                ["Send Files", "ATTACH_FILES"],
                ["Connect to Voice Channels", "CONNECT"],
                ["Speak in Voice Channels", "SPEAK"],
                ["Change Nicknames", "MANAGE_NICKNAMES"],
                ["Send Message", "SEND_MESSAGE"],
                ["Edit Roles", "MANAGE_ROLES"],
                ["Delete Messages", "MANAGE_MESSAGES"],
                ["Create/Delete Channels", "MANAGE_CHANNELS"],
                ["Invite Users", "CREATE_INSTANT_INVITE"]
              ]
            },
            {
              type: "input_value",
              name: "ROLE",
              check: "Role"
            }
          ],
          inputsInline: true,
          previousStatement: null,
          nextStatement: null,
          colour: "#aecd1e",
          tooltip: "Give/Take a permmission from all users with a role",
          helpUrl: "https://discord.js.org/#/docs/main/stable/class/Permissions"
        });
      }
    },
    generator: block => {
      let dropdown_give_take = block.getFieldValue("GIVE/TAKE");
      let dropdown_permissions = block.getFieldValue("PERMISSION");
      let value_role = Blockly.JavaScript.valueToCode(
        block,
        "ROLE",
        Blockly.JavaScript.ORDER_ATOMIC
      );
      block.setOnChange(() => {
        block.setEnabled(block.allInputsFilled());
      });
      let c;
      switch (dropdown_give_take) {
        case "add":
          c = `arr.push("${dropdown_permissions}");`;
          break;
        case "remove":
          c = `arr.splice(arr.indexOf("${dropdown_permissions})", 1);`;
          break;
        default:
          break;
      }
      // TODO: Assemble JavaScript into code variable.
      let code = `let arr = await ${value_role}.permissions.toArray();\n${c}\n${value_role}.setPermissions(arr);\n`;
      return code;
    }
  },
  {
    name: "sendDM",
    category: "Executables",
    block: {
      init: function() {
        this.jsonInit({
          message0: "DM %1 To Member %2",
          args0: [
            {
              type: "input_value",
              name: "MESSAGE",
              check: "String",
              align: "RIGHT"
            },
            {
              type: "input_value",
              name: "MEMBER",
              check: "Member"
            }
          ],
          inputsInline: true,
          previousStatement: null,
          nextStatement: null,
          colour: "#Aecd1e",
          tooltip: "Send A DM to a Server Member you input",
          helpUrl:
            "https://discord.js.org/#/docs/main/stable/class/User?scrollTo=send"
        });
      }
    },
    generator: block => {
      let value_message = Blockly.JavaScript.valueToCode(
        block,
        "MESSAGE",
        Blockly.JavaScript.ORDER_ATOMIC
      );
      let value_member = Blockly.JavaScript.valueToCode(
        block,
        "MEMBER",
        Blockly.JavaScript.ORDER_ATOMIC
      );
      block.setOnChange(() => {
        block.setEnabled(block.allInputsFilled());
      });
      // TODO: Assemble JavaScript into code variable.
      let code = `await ${value_member}.send(${value_message});\n`;
      return code;
    }
  },
  {
    name: "me",
    category: "Values",
    block: {
      init: function() {
        this.jsonInit({
          message0: "Me",
          output: "User",
          colour: "#fa6e9b",
          tooltip: "The Bot Identity",
          helpUrl:
            "https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=user"
        });
      }
    },
    generator: block => {
      let code = `client.user`;
      return [code, Blockly.JavaScript.ORDER_NONE];
    }
  },
  {
    name: "getcustomemoji",
    category: "Values",
    block: {
      init: function() {
        this.jsonInit({
          message0: "Get Custom Emoji Named %2 From Server %1",
          args0: [
            {
              type: "input_value",
              name: "SERVER",
              check: "Guild"
            },
            {
              type: "input_value",
              name: "EMOJI",
              check: "String"
            }
          ],
          inputsInline: true,
          output: "String",
          colour: "#fa6e9b",
          tooltip: "Get a custom emoji from a specific server",
          helpUrl:
            "https://discord.js.org/#/docs/main/stable/class/GuildEmojiManager?scrollTo=cache"
        });
      }
    },
    generator: block => {
      let value_server = Blockly.JavaScript.valueToCode(
        block,
        "SERVER",
        Blockly.JavaScript.ORDER_ATOMIC
      );
      let value_emoji = Blockly.JavaScript.valueToCode(
        block,
        "EMOJI",
        Blockly.JavaScript.ORDER_ATOMIC
      );
      block.setOnChange(() => {
        block.setEnabled(block.allInputsFilled());
      });
      let code = `${value_server}.emojis.cache.find(emoji => emoji.name= ${value_emoji}).toString()`;
      return [code, Blockly.JavaScript.ORDER_NONE];
    }
  },
  {
    name: "createInvite",
    category: "Values",
    block: {
      init: function() {
        this.jsonInit({
          message0:
            "Create Invite Link To Channel %1 That Can Be Used  %2 Times, And Will Stay Active For  %3 Seconds",
          args0: [
            {
              type: "input_value",
              name: "CHANNEL",
              check: "Channel"
            },
            {
              type: "input_value",
              name: "USES",
              check: "Number"
            },
            {
              type: "input_value",
              name: "DURATION",
              check: "Number"
            }
          ],
          inputsInline: true,
          output: "String",
          colour: "#fa6e9b",
          tooltip: "Returns an Invite to a Channel you input",
          helpUrl:
            "https://discord.js.org/#/docs/main/stable/class/GuildChannel?scrollTo=createInvite"
        });
      }
    },
    generator: block => {
      let value_channel = Blockly.JavaScript.valueToCode(
        block,
        "CHANNEL",
        Blockly.JavaScript.ORDER_ATOMIC
      );
      let value_uses = Blockly.JavaScript.valueToCode(
        block,
        "USES",
        Blockly.JavaScript.ORDER_ATOMIC
      );
      let value_duration = Blockly.JavaScript.valueToCode(
        block,
        "DURATION",
        Blockly.JavaScript.ORDER_ATOMIC
      );
      block.setOnChange(() => {
        block.setEnabled(block.allInputsFilled());
      });
      let code =
        "`${await " +
        value_channel +
        ".createInvite({maxAge: " +
        value_duration +
        ", maxUses: " +
        value_uses +
        "})}`\n";
      return [code, Blockly.JavaScript.ORDER_NONE];
    }
  },
  {
    name: "ifMemberHasPermission",
    category: "Values",
    block: {
      init: function() {
        this.jsonInit({
          message0: "Does Member %1 Has Permission To %2",
          args0: [
            {
              type: "input_value",
              name: "MEMBER",
              check: "Member"
            },
            {
              type: "field_dropdown",
              name: "PERMISSIONS",
              options: [
                ["Kick", "KICK_MEMBERS"],
                ["Ban", "BAN_MEMBERS"],
                ["Administrate", "ADMINISTRATOR"],
                ["Manage Emojis", "MANAGE_EMOJIS"],
                ["Manage Channels", "MANAGE_CHANNELS"],
                ["Embed", "EMBED_LINKS"],
                ["Send Files", "ATTACH_FILES"],
                ["Connect to Voice Channels", "CONNECT"],
                ["Speak in Voice Channels", "SPEAK"],
                ["Change Nicknames", "MANAGE_NICKNAMES"],
                ["Send Message", "SEND_MESSAGE"],
                ["Edit Roles", "MANAGE_ROLES"],
                ["Delete Messages", "MANAGE_MESSAGES"],
                ["Create/Delete Channels", "MANAGE_CHANNELS"],
                ["Invite Users", "CREATE_INSTANT_INVITE"]
              ]
            }
          ],
          output: "Boolean",
          colour: "#fa6e9b",
          tooltip: "Check if the user has the permission to do something.",
          helpUrl:
            "https://discord.js.org/#/docs/main/stable/class/GuildMember?scrollTo=hasPermission"
        });
      }
    },
    generator: block => {
      let value_member = Blockly.JavaScript.valueToCode(
        block,
        "MEMBER",
        Blockly.JavaScript.ORDER_ATOMIC
      );
      let dropdown_permissions = block.getFieldValue("PERMISSIONS");
      block.setOnChange(() => {
        block.setEnabled(block.allInputsFilled());
      });
      // TODO: Assemble JavaScript into code variable.
      let code = `${value_member}.hasPermission("${dropdown_permissions}")`;
      // TODO: Change ORDER_NONE to the correct strength.
      return [code, Blockly.JavaScript.ORDER_NONE];
    }
  },
  {
    name: "getFromGuild",
    category: "Values",
    block: {
      init: function() {
        this.jsonInit({
          message0: "Get %2 From Server %1",
          args0: [
            {
              type: "input_value",
              name: "GUILD",
              check: "Guild"
            },
            {
              type: "field_dropdown",
              name: "TYPE",
              options: [
                ["Array of channels", "channels"],
                ["Array of members", "members"],
                ["banner URL", "banner"],
                ["icon URL", "icon"],
                ["name", "name"],
                ["description", "description"],
                ["owner", "owner"],
                ["Array of roles", "roles"]
              ]
            }
          ],
          inputsInline: true,
          output: null,
          tooltip: "Get something from a server",
          helpUrl: "https://discord.js.org/#/docs/main/stable/class/Guild",
          colour: "#fa6e9b"
        });
      }
    },
    generator: block => {
      let value_guild = Blockly.JavaScript.valueToCode(
        block,
        "GUILD",
        Blockly.JavaScript.ORDER_ATOMIC
      );
      let value_channel_name = block.getFieldValue("TYPE");
      block.setOnChange(() => {
        block.setEnabled(block.allInputsFilled());
      });
      let code;
      switch (value_channel_name) {
        case "channels":
          block.setOutput(true, "ChannelList");
          //console.log(block)
          code = `${value_guild}.channels`;
          break;
        case "members":
          block.setOutput(true, "MemberList");
          code = `${value_guild}.members`;
          break;
        case "icon":
          block.setOutput(true, "String");
          code = `${value_guild}.iconURL()`;
          break;
        case "banner":
          block.setOutput(true, "String");
          code = `${value_guild}.bannerURL()`;
          break;
        case "name":
          block.setOutput(true, "String");
          code = `${value_guild}.name`;
          break;
        case "description":
          block.setOutput(true, "String");
          code = `${value_guild}.description`;
          break;
        case "owner":
          block.setOutput(true, "Member");
          code = `${value_guild}.owner`;
          break;
        case "roles":
          block.setOutput(true, "RoleList");
          code = `${value_guild}.roles`;
          break;
        default:
          break;
      }
      // TODO: Change ORDER_NONE to the correct strength.
      return [code, Blockly.JavaScript.ORDER_NONE];
    }
  },
  {
    name: "getFromChannelList",
    category: "Values",
    block: {
      init: function() {
        this.jsonInit({
          message0: "From Channel Array %1 Get Channel Named %2",
          args0: [
            {
              type: "input_value",
              name: "INPUT",
              check: "ChannelList"
            },
            {
              type: "input_value",
              name: "NAME",
              check: "String"
            }
          ],
          inputsInline: true,
          output: null,
          tooltip: "Get a Channel with a specific name from a channel array",
          helpUrl:
            "https://discord.js.org/#/docs/main/stable/class/GuildChannelManager",
          colour: "#fa6e9b"
        });
      }
    },
    generator: block => {
      let value_channellist = Blockly.JavaScript.valueToCode(
        block,
        "INPUT",
        Blockly.JavaScript.ORDER_ATOMIC
      );
      let value_name = Blockly.JavaScript.valueToCode(
        block,
        "NAME",
        Blockly.JavaScript.ORDER_ATOMIC
      );
      block.setOnChange(() => {
        block.setEnabled(block.allInputsFilled());
      });
      let code = `${value_channellist}.cache.find(x => x.name === ${value_name})`;

      // TODO: Change ORDER_NONE to the correct strength.
      return [code, Blockly.JavaScript.ORDER_NONE];
    }
  },
  {
    name: "getFromMemberList",
    category: "Values",
    block: {
      init: function() {
        this.jsonInit({
          message0: "From Member Array %1 Get Member Named %2",
          args0: [
            {
              type: "input_value",
              name: "MEMBERLIST",
              check: "MemberList"
            },
            {
              type: "input_value",
              name: "NAME",
              check: "String"
            }
          ],
          inputsInline: true,
          output: "Member",
          tooltip: "Get a specific member from a Array of members",
          helpUrl:
            "https://discord.js.org/#/docs/main/stable/class/GuildChannelManager",
          colour: "#fa6e9b"
        });
      }
    },
    generator: block => {
      let value_memberlist = Blockly.JavaScript.valueToCode(
        block,
        "MEMBERLIST",
        Blockly.JavaScript.ORDER_ATOMIC
      );
      let value_name = Blockly.JavaScript.valueToCode(
        block,
        "NAME",
        Blockly.JavaScript.ORDER_ATOMIC
      );
      block.setOnChange(() => {
        block.setEnabled(block.allInputsFilled());
      });
      let code = `${value_memberlist}.cache.find(member => member.user.username === ${value_name})`;

      // TODO: Change ORDER_NONE to the correct strength.
      return [code, Blockly.JavaScript.ORDER_NONE];
    }
  },
  {
    name: "getFromRoleList",
    category: "Values",
    block: {
      init: function() {
        this.jsonInit({
          message0: "From Role Array %1 Get Role Named %2",
          args0: [
            {
              type: "input_value",
              name: "ROLELIST",
              check: "RoleList"
            },
            {
              type: "input_value",
              name: "NAME",
              check: "String"
            }
          ],
          inputsInline: true,
          output: "Role",
          tooltip: "Get a specific role from a Array of roles",
          helpUrl:
            "https://discord.js.org/#/docs/main/stable/class/RoleManager",
          colour: "#fa6e9b"
        });
      }
    },
    generator: block => {
      let value_memberlist = Blockly.JavaScript.valueToCode(
        block,
        "ROLELIST",
        Blockly.JavaScript.ORDER_ATOMIC
      );
      let value_name = Blockly.JavaScript.valueToCode(
        block,
        "NAME",
        Blockly.JavaScript.ORDER_ATOMIC
      );
      block.setOnChange(() => {
        block.setEnabled(block.allInputsFilled());
      });
      let code = `${value_memberlist}.cache.find(role => role.name === ${value_name})`;

      // TODO: Change ORDER_NONE to the correct strength.
      return [code, Blockly.JavaScript.ORDER_NONE];
    }
  },
  {
    name: "kickUser",
    category: "Executables",
    block: {
      init: function() {
        this.jsonInit({
          message0: "%1 Member %2 For This Reason %3",
          args0: [
            {
              type: "field_dropdown",
              name: "c/d",
              options: [["Kick", "Kick"], ["Ban", "Ban"]]
            },
            {
              type: "input_value",
              name: "USER",
              check: "Member"
            },
            {
              type: "input_value",
              name: "REASON",
              check: "String"
            }
          ],
          inputsInline: true,
          previousStatement: null,
          nextStatement: null,
          colour: "#aecd1e",
          tooltip: "Kick/Ban a user from the server for some reason.",
          helpUrl:
            "https://discord.js.org/#/docs/main/stable/class/GuildMember?scrollTo=kick"
        });
      }
    },
    generator: block => {
      let dropdown_a = block.getFieldValue("c/d");
      let value_user = Blockly.JavaScript.valueToCode(
        block,
        "USER",
        Blockly.JavaScript.ORDER_ATOMIC
      );
      let value_reason = Blockly.JavaScript.valueToCode(
        block,
        "REASON",
        Blockly.JavaScript.ORDER_ATOMIC
      );
      block.setOnChange(() => {
        block.setEnabled(block.allInputsFilled());
      });
      let code;
      switch (dropdown_a) {
        case "Kick":
          code = `if(${value_user}){\n   await ${value_user}.kick(${value_reason})\n};\n`;
          break;
        case "Ban":
          code = `if(${value_user}){\n   await ${value_user}.ban({reason: ${value_reason}})\n};\n`;
          break;
        default:
          break;
      }
      return code;
      //k its gud
    }
  },
  {
    name: "createChannel",
    category: "Executables",
    block: {
      init: function() {
        this.jsonInit({
          message0: "Create A Text Channel Named %1 On Server %2",
          args0: [
            {
              type: "input_value",
              name: "ChannelName",
              check: "String"
            },
            {
              type: "input_value",
              name: "GUILD",
              check: "Guild"
            }
          ],
          inputsInline: true,
          previousStatement: null,
          nextStatement: null,
          colour: "#aecd1e",
          tooltip: "Create a Text Channel",
          helpUrl:
            "https://discord.js.org/#/docs/main/stable/class/GuildChannelManager?scrollTo=create"
        });
      }
    },
    generator: block => {
      let value_channelname = Blockly.JavaScript.valueToCode(
        block,
        "ChannelName",
        Blockly.JavaScript.ORDER_ATOMIC
      );
      let value_guild = Blockly.JavaScript.valueToCode(
        block,
        "GUILD",
        Blockly.JavaScript.ORDER_ATOMIC
      );
      block.setOnChange(() => {
        block.setEnabled(block.allInputsFilled());
      });
      // TODO: Assemble JavaScript into code variable.
      let code = `await ${value_guild}.channels.create(${value_channelname}, "text");\n`;
      // TODO: Change ORDER_NONE to the correct strength.
      return code;
      //k its gud
    }
  },
  {
    name: "createrole",
    category: "Executables",
    block: {
      init: function() {
        this.jsonInit({
          message0:
            "Create a Role on Server %1 With Name %2 With Color %3 %4 That Is Mentionable %5 %6 This many places from the bottom %7",
          args0: [
            {
              type: "input_value",
              name: "SERVER",
              check: "Guild",
              align: "RIGHT"
            },
            {
              type: "input_value",
              name: "ROLENAME",
              check: "String",
              align: "RIGHT"
            },
            {
              type: "field_colour",
              name: "COLOR",
              colour: "#ff0000"
            },
            {
              type: "input_dummy",
              align: "RIGHT"
            },
            {
              type: "field_checkbox",
              name: "NAME",
              checked: true
            },
            {
              type: "input_dummy",
              align: "RIGHT"
            },
            {
              type: "input_value",
              name: "LEVEL",
              check: "Number"
            }
          ],
          inputsInline: false,
          previousStatement: null,
          nextStatement: null,
          colour: "#aecd1e",
          tooltip: "Create a Role on a server with these specific properties",
          helpUrl: "https://discord.js.org/#/docs/main/stable/typedef/RoleData"
        });
      }
    },
    generator: block => {
      let value_server = Blockly.JavaScript.valueToCode(
        block,
        "SERVER",
        Blockly.JavaScript.ORDER_ATOMIC
      );
      let value_rolename = Blockly.JavaScript.valueToCode(
        block,
        "ROLENAME",
        Blockly.JavaScript.ORDER_ATOMIC
      );
      let colour_color = block.getFieldValue("COLOR");
      let checkbox_name = block.getFieldValue("NAME") === "TRUE";
      let value_level = Blockly.JavaScript.valueToCode(
        block,
        "LEVEL",
        Blockly.JavaScript.ORDER_ATOMIC
      );
      block.setOnChange(() => {
        block.setEnabled(block.allInputsFilled());
      });
      if (checkbox_name === "TRUE") {
        checkbox_name = true;
      }
      if (checkbox_name === "FALSE") {
        checkbox_name = false;
      }
      let code = `${value_server}.roles.create({\n   data:{\n      name:${value_rolename},\n      color:"${colour_color}",\n      mentionable:${checkbox_name},\n      position:${value_level}\n   }\n});`;
      // TODO: Change ORDER_NONE to the correct strength.
      return code;
      //k its gud
    }
  },
  {
    name: "delete",
    category: "Executables",
    block: {
      init: function() {
        this.jsonInit({
          type: "delete",
          message0: "Delete %1 %2",
          args0: [
            {
              type: "field_dropdown",
              name: "e/f",
              options: [
                ["Channel", "Channel"],
                ["Message", "Message"],
                ["Role", "Role"]
              ]
            },
            {
              type: "input_value",
              name: "msg",
              check: null
            }
          ],
          previousStatement: null,
          nextStatement: null,
          inputsInline: true,
          colour: "#aecd1e",
          tooltip: "Deletes a Channel/Message/Role",
          helpUrl:
            "https://discord.js.org/#/docs/main/stable/class/Message?scrollTo=delete"
        });
      }
    },
    generator: block => {
      let value_message = Blockly.JavaScript.valueToCode(
        block,
        "msg",
        Blockly.JavaScript.ORDER_ATOMIC
      );
      block.setOnChange(() => {
        if (!block.allInputsFilled()) {
          block.setEnabled(true);
          block.inputList[0].setCheck(block.getFieldValue("e/f"));
        } else {
          block.inputList[0].setCheck(block.getFieldValue("e/f"));
        }
        block.setEnabled(block.allInputsFilled());
        // console.log(block.inputList[0]);
      });
      // TODO: Assemble JavaScript into code variable.
      let code = `await ${value_message}.delete();`;
      // TODO: Change ORDER_NONE to the correct strength.
      return code;
      //k its gud
    }
  },
  {
    name: "getDateMilliseconds",
    category: "Misc",
    block: {
      init: function() {
        this.jsonInit({
          message0: "Date Right Now (in milliseconds)",
          output: "Number",
          colour: "#2d728f",
          tooltip:
            "Get the date right now in milliseconds. For most practical applications, you will want to pass this through the ",
          helpUrl:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now"
        });
      }
    },
    generator: block => {
      let code = `Date.now()`;
      return [code, Blockly.JavaScript.ORDER_NONE];
    }
  },
  {
    name: "getDateFromMilliseconds",
    category: "Misc",
    block: {
      init: function() {
        this.jsonInit({
          message0: "Turn %1 Milliseconds to a UTC Date",
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
        });
      }
    },
    generator: block => {
      let value_milliseconds = Blockly.JavaScript.valueToCode(
        block,
        "Milliseconds",
        Blockly.JavaScript.ORDER_ATOMIC
      );
      block.setOnChange(() => {
        block.setEnabled(block.allInputsFilled());
      });
      // TODO: Assemble JavaScript into code variable.
      let code = `new Date(${value_milliseconds}).toUTCString()`;
      return [code, Blockly.JavaScript.ORDER_NONE];
    }
  },
  {
    name: "trycatch",
    category: "Misc",
    block: {
      init: function() {
        this.jsonInit({
          message0: "Try to %1 And If that doesn't work %2",
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
        });
      }
    },
    generator: block => {
      let statements_try = Blockly.JavaScript.statementToCode(block, "TRY");
      let statements_catch = Blockly.JavaScript.statementToCode(block, "CATCH");
      // TODO: Assemble JavaScript into code variable.
      let code = `try{\n   ${statements_try}\n}catch{\n   ${statements_catch}\n}`;
      return code;
    }
  },
  {
    name: "includes",
    category: "Misc",
    block: {
      init: function() {
        this.jsonInit({
          message0: "If %1 Includes %2",
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
        });
      }
    },
    generator: block => {
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
        block.setEnabled(block.allInputsFilled());
      });
      // TODO: Assemble JavaScript into code variable.
      let code = `${value_str}.includes(${value_sub})`;
      // TODO: Change ORDER_NONE to the correct strength.
      return [code, Blockly.JavaScript.ORDER_NONE];
    }
  },
  {
    name: "stringtoInt",
    category: "Misc",
    block: {
      init: function() {
        this.jsonInit({
          message0: "Turn Text %1 to Number",
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
        });
      }
    },
    generator: block => {
      let value_string = Blockly.JavaScript.valueToCode(
        block,
        "String",
        Blockly.JavaScript.ORDER_ATOMIC
      );
      block.setOnChange(() => {
        block.setEnabled(block.allInputsFilled());
      });
      let code = `parsefloat(${value_string})`;
      // TODO: Change ORDER_NONE to the correct strength.
      return [code, Blockly.JavaScript.ORDER_NONE];
    }
  },
  {
    name: "intToString",
    category: "Misc",
    block: {
      init: function() {
        this.jsonInit({
          message0: "Turn Number %1 to Text",
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
        });
      }
    },
    generator: block => {
      let value_number = Blockly.JavaScript.valueToCode(
        block,
        "Number",
        Blockly.JavaScript.ORDER_ATOMIC
      );
      block.setOnChange(() => {
        block.setEnabled(block.allInputsFilled());
      });
      let code = `${value_number}.toString()`;
      // TODO: Change ORDER_NONE to the correct strength.
      return [code, Blockly.JavaScript.ORDER_NONE];
    }
  },
  {
    name: "newGuildJoinUser",
    category: "Events",
    block: {
      init: function() {
        this.jsonInit({
          message0: "On New User Joining Server %1",
          args0: [
            {
              type: "input_statement",
              name: "CALLBACK"
            }
          ],
          previousStatement: null,
          nextStatement: null,
          colour: "#ff6d6b",
          tooltip:
            "When a new user joins the server, call what you put inside the block",
          helpUrl:
            "https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberAdd"
        });
      }
    },
    generator: block => {
      let statements_callback = Blockly.JavaScript.statementToCode(
        block,
        "CALLBACK"
      );
      if (block.getSurroundParent() !== null) {
        if (block.getSurroundParent().type !== "setup") {
          block.unplug(true, true);
        }
      }
      // TODO: Assemble JavaScript into code variable.
      let code = `client.on('guildMemberAdd', async(member) => {\n${statements_callback}})\n`;
      return code;
    }
  },
  {
    name: "memberLeavesGuild",
    category: "Events",
    block: {
      init: function() {
        this.jsonInit({
          message0: "On Member Leaving Server %1",
          args0: [
            {
              type: "input_statement",
              name: "CALLBACK"
            }
          ],
          previousStatement: null,
          nextStatement: null,
          colour: "#ff6d6b",
          tooltip:
            "When a member leaves the server, call what you put inside the block",
          helpUrl:
            "https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberRemove"
        });
      }
    },
    generator: block => {
      let statements_callback = Blockly.JavaScript.statementToCode(
        block,
        "CALLBACK"
      );
      if (block.getSurroundParent() !== null) {
        if (block.getSurroundParent().type !== "setup") {
          block.unplug(true, true);
        }
      }
      // TODO: Assemble JavaScript into code variable.
      let code = `client.on('guildMemberRemove', async(member) => {\n${statements_callback}})\n`;
      return code;
    }
  },
  {
    name: "channelCreate",
    category: "Events",
    block: {
      init: function() {
        this.jsonInit({
          message0: "On New Channel Created %1",
          args0: [
            {
              type: "input_statement",
              name: "CALLBACK"
            }
          ],
          previousStatement: null,
          nextStatement: null,
          colour: "#ff6d6b",
          tooltip:
            "When a new channel is added to a server, call what you put inside the block",
          helpUrl:
            "https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberAdd"
        });
      }
    },
    generator: block => {
      let statements_callback = Blockly.JavaScript.statementToCode(
        block,
        "CALLBACK"
      );
      if (block.getSurroundParent() !== null) {
        if (block.getSurroundParent().type !== "setup") {
          block.unplug(true, true);
        }
      }
      // TODO: Assemble JavaScript into code variable.
      let code = `client.on('channelCreate', async(channel) => {\n${statements_callback}})\n`;
      return code;
    }
  },
  {
    name: "channelDelete",
    category: "Events",
    block: {
      init: function() {
        this.jsonInit({
          message0: "On Channel Deleted %1",
          args0: [
            {
              type: "input_statement",
              name: "CALLBACK"
            }
          ],
          previousStatement: null,
          nextStatement: null,
          colour: "#ff6d6b",
          tooltip:
            "When a channel is deleted, call what you put inside the block",
          helpUrl:
            "https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberAdd"
        });
      }
    },
    generator: block => {
      let statements_callback = Blockly.JavaScript.statementToCode(
        block,
        "CALLBACK"
      );
      if (block.getSurroundParent() !== null) {
        if (block.getSurroundParent().type !== "setup") {
          block.unplug(true, true);
        }
      }
      // TODO: Assemble JavaScript into code variable.
      let code = `client.on('channelDelete', async(channel) => {\n${statements_callback}})\n`;
      return code;
    }
  },
  {
    name: "roleCreate",
    category: "Events",
    block: {
      init: function() {
        this.jsonInit({
          message0: "On New Role Created %1",
          args0: [
            {
              type: "input_statement",
              name: "CALLBACK"
            }
          ],
          previousStatement: null,
          nextStatement: null,
          colour: "#ff6d6b",
          tooltip:
            "When a new role is added to a server, call what you put inside the block",
          helpUrl:
            "https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-roleCreate"
        });
      }
    },
    generator: block => {
      let statements_callback = Blockly.JavaScript.statementToCode(
        block,
        "CALLBACK"
      );
      if (block.getSurroundParent() !== null) {
        if (block.getSurroundParent().type !== "setup") {
          block.unplug(true, true);
        }
      }
      // TODO: Assemble JavaScript into code variable.
      let code = `client.on('roleCreate', async(role) => {\n${statements_callback}})\n`;
      return code;
    }
  },
  {
    name: "roleDelete",
    category: "Events",
    block: {
      init: function() {
        this.jsonInit({
          message0: "On Role Deleted %1",
          args0: [
            {
              type: "input_statement",
              name: "CALLBACK"
            }
          ],
          previousStatement: null,
          nextStatement: null,
          colour: "#ff6d6b",
          tooltip: "When a role is deleted, call what you put inside the block",
          helpUrl:
            "https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-roleDelete"
        });
      }
    },
    generator: block => {
      let statements_callback = Blockly.JavaScript.statementToCode(
        block,
        "CALLBACK"
      );
      if (block.getSurroundParent() !== null) {
        if (block.getSurroundParent().type !== "setup") {
          block.unplug(true, true);
        }
      }
      // TODO: Assemble JavaScript into code variable.
      let code = `client.on('roleDelete', async(role) => {\n${statements_callback}})\n`;
      return code;
    }
  }
];

export default Blocks;
