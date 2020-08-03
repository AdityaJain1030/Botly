import React from "react";
import Blockly from "node-blockly/browser";
import { Block, Category } from "react-blockly-drawer";
import { insideWrongBlock } from "./functions";

const discordTools = (
  <category name="Discord" colour="#7289DA">
    <label text="Events" web-class="text" />
    <Block type="initMessageListener" />
    <sep gap="15" />
    <Block type="newGuildJoinUser" />
    <sep gap="15" />
    <Block type="memberLeaveGuild" />
    <sep gap="15" />
    <Block type="channelCreate" />
    <sep gap="15" />
    <Block type="channelDelete" />
    <sep gap="15" />
    <Block type="roleCreate" />
    <sep gap="15" />
    <Block type="roleDelete" />
    <sep gap="50" />
    <label text="Executables" web-class="text" />
    <Block type="sendMessage" />
    <sep gap="15" />
    <Block type="replyToMessage" />
    <sep gap="15" />
    <Block type="embedMessage" />
    <sep gap="15" />
    <Block type="pin_unpin" />
    <sep gap="15" />
    <Block type="sendDM" />
    <sep gap="30" />
    <Block type="limit_unlimit" />
    <sep gap="15" />
    <Block type="createChannel" />
    <sep gap="30" />
    <Block type="roleToMember" />
    <sep gap="15" />
    <Block type="permissionToRole" />
    <sep gap="15" />
    <Block type="createrole" />
    <sep gap="15" />
    <Block type="kickUser" />
    <sep gap="15" />
    <Block type="delete" />
    <label text="Values" web-class="text" />
    <Block type="Returned" />
    <sep gap="15" />
    <Block type="me" />
    <sep gap="30" />
    <Block type="getFromMessage" />
    <sep gap="15" />
    <Block type="getFromMember" />
    <sep gap="15" />
    <Block type="getFromUserProfile" />
    <sep gap="15" />
    <Block type="getFromChannel" />
    <sep gap="15" />
    <Block type="getFromRole" />
    <sep gap="15" />
    <Block type="getFromGuild" />
    <sep gap="15" />
    <Block type="getFromChannelList" />
    <sep gap="15" />
    <Block type="getFromMemberList" />
    <sep gap="15" />
    <Block type="getFromRoleList" />
    <sep gap="30" />
    <Block type="getcustomemoji" />
    <sep gap="15" />
    <Block type="createInvite" />
    <sep gap="15" />
    <Block type="ifMemberhasPermission" />
    <sep gap="50" />
    <Category name="Events" colour="#7B2CBF">
      <Block type="initMessageListener" />
      <sep gap="15" />
      <Block type="newGuildJoinUser" />
      <sep gap="15" />
      <Block type="memberLeaveGuild" />
      <sep gap="15" />
      <Block type="channelCreate" />
      <sep gap="15" />
      <Block type="channelDelete" />
      <sep gap="15" />
      <Block type="roleCreate" />
      <sep gap="15" />
      <Block type="roleDelete" />
    </Category>
    <Category name="Executables" colour="#9D4EDD">
      <Block type="sendMessage" />
      <sep gap="15" />
      <Block type="replyToMessage" />
      <sep gap="15" />
      <Block type="embedMessage" />
      <sep gap="15" />
      <Block type="pin_unpin" />
      <sep gap="15" />
      <Block type="sendDM" />
      <sep gap="30" />
      <Block type="limit_unlimit" />
      <sep gap="15" />
      <Block type="createChannel" />
      <sep gap="30" />
      <Block type="roleToMember" />
      <sep gap="15" />
      <Block type="permissionToRole" />
      <sep gap="15" />
      <Block type="createrole" />
      <sep gap="15" />
      <Block type="kickUser" />
      <sep gap="15" />
      <Block type="delete" />
    </Category>
    <Category name="Values" colour="#C77DFF">
      <Block type="Returned" />
      <sep gap="15" />
      <Block type="me" />
      <sep gap="30" />
      <Block type="getFromMessage" />
      <sep gap="15" />
      <Block type="getFromMember" />
      <sep gap="15" />
      <Block type="getFromUserProfile" />
      <sep gap="15" />
      <Block type="getFromChannel" />
      <sep gap="15" />
      <Block type="getFromRole" />
      <sep gap="15" />
      <Block type="getFromGuild" />
      <sep gap="15" />
      <Block type="getFromChannelList" />
      <sep gap="15" />
      <Block type="getFromMemberList" />
      <sep gap="15" />
      <Block type="getFromRoleList" />
      <sep gap="30" />
      <Block type="getcustomemoji" />
      <sep gap="15" />
      <Block type="createInvite" />
      <sep gap="15" />
      <Block type="ifMemberhasPermission" />
    </Category>
  </category>
);

const discordBlocks = [
  {
    message0: "%1 On Message %2",
    type: "initMessageListener",
    args0: [
      {
        type: "field_image",
        src: require("../images/discord.png"),
        width: 20,
        height: 20,
        alt: "*",
        flipRtl: false
      },
      {
        type: "input_statement",
        name: "CALLBACK"
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#7B2CBF",
    tooltip:
      "Every time message is sent on the server, the code inside this block runs",
    helpUrl:
      "https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-message"
  },
  {
    message0: "%1 On New User Joining Server %2",
    type: "newGuildJoinUser",
    args0: [
      {
        type: "field_image",
        src: require("../images/discord.png"),
        width: 20,
        height: 20,
        alt: "*",
        flipRtl: false
      },
      {
        type: "input_statement",
        name: "CALLBACK"
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#7B2CBF",
    tooltip:
      "When a new user joins the server, call what you put inside the block",
    helpUrl:
      "https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberAdd"
  },
  {
    message0: "%1 On Member Leaving Server %2",
    type: "memberLeaveGuild",
    args0: [
      {
        type: "field_image",
        src: require("../images/discord.png"),
        width: 20,
        height: 20,
        alt: "*",
        flipRtl: false
      },
      {
        type: "input_statement",
        name: "CALLBACK"
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#7B2CBF",
    tooltip:
      "When a member leaves the server, call what you put inside the block",
    helpUrl:
      "https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberRemove"
  },
  {
    message0: "%1 On New Channel Created %2",
    type: "channelCreate",
    args0: [
      {
        type: "field_image",
        src: require("../images/discord.png"),
        width: 20,
        height: 20,
        alt: "*",
        flipRtl: false
      },
      {
        type: "input_statement",
        name: "CALLBACK"
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#7B2CBF",
    tooltip:
      "When a new channel is added to a server, call what you put inside the block",
    helpUrl:
      "https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberAdd"
  },
  {
    message0: "%1 On Channel Deleted %2",
    type: "channelDelete",
    args0: [
      {
        type: "field_image",
        src: require("../images/discord.png"),
        width: 20,
        height: 20,
        alt: "*",
        flipRtl: false
      },
      {
        type: "input_statement",
        name: "CALLBACK"
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#7B2CBF",
    tooltip: "When a channel is deleted, call what you put inside the block",
    helpUrl:
      "https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberAdd"
  },
  {
    message0: "%1 On New Role Created %2",
    type: "roleCreate",
    args0: [
      {
        type: "field_image",
        src: require("../images/discord.png"),
        width: 20,
        height: 20,
        alt: "*",
        flipRtl: false
      },
      {
        type: "input_statement",
        name: "CALLBACK"
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#7B2CBF",
    tooltip:
      "When a new role is added to a server, call what you put inside the block",
    helpUrl:
      "https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-roleCreate"
  },
  {
    message0: "%1 On Role Deleted %2",
    type: "roleDelete",
    args0: [
      {
        type: "field_image",
        src: require("../images/discord.png"),
        width: 20,
        height: 20,
        alt: "*",
        flipRtl: false
      },
      {
        type: "input_statement",
        name: "CALLBACK"
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#7B2CBF",
    tooltip: "When a role is deleted, call what you put inside the block",
    helpUrl:
      "https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-roleDelete"
  },
  {
    message0: "%1 %2 data returned by %3Listeners",
    type: `Returned`,
    args0: [
      {
        type: "field_image",
        src: require("../images/discord_opposite.png"),
        width: 20,
        height: 20,
        alt: "*",
        flipRtl: false
      },
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
    colour: "#C77DFF",
    tooltip: "Get An Object Returned By a Certain Listener",
    helpUrl: ""
  },
  {
    message0: "%4 Get %1 %2 from message data %3",
    type: "getFromMessage",
    args0: [
      {
        type: "field_dropdown",
        name: "NAME",
        options: [
          ["text", "content"],
          ["author", "member"],
          ["author user profile", "user"],
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
      },
      {
        type: "field_image",
        src: require("../images/discord_opposite.png"),
        width: 20,
        height: 20,
        alt: "*",
        flipRtl: false
      }
    ],
    inputsInline: true,
    output: null,
    colour: "#C77DFF",
    tooltip: "This block gets specific data from a message.",
    helpUrl: "https://discord.js.org/#/docs/main/stable/class/Message"
  },
  {
    message0: "%1 Get %2 %3 from member data %4",
    type: "getFromMember",
    args0: [
      {
        type: "field_image",
        src: require("../images/discord_opposite.png"),
        width: 20,
        height: 20,
        alt: "*",
        flipRtl: false
      },
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
    colour: "#C77DFF",
    tooltip: "This block gets data from a specific member",
    helpUrl: "https://discord.js.org/#/docs/main/stable/class/GuildMember"
  },
  {
    message0: "%4 Get %1 %2 from User Profile %3",
    type: "getFromUserProfile",
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
      },
      {
        type: "field_image",
        src: require("../images/discord_opposite.png"),
        width: 20,
        height: 20,
        alt: "*",
        flipRtl: false
      }
    ],
    inputsInline: true,
    output: null,
    colour: "#C77DFF",
    tooltip: "This block gets data from a specific User Profile",
    helpUrl: "https://discord.js.org/#/docs/main/stable/class/User"
  },
  {
    message0: "%4 Get %1 %2 from channel %3",
    type: "getFromChannel",
    args0: [
      {
        type: "field_dropdown",
        name: "NAME",
        options: [
          ["server", "guild"],
          ["Array of Members", "members"],
          ["Creation Date", "date"],
          ["Channel Name", "name"],
          ["Channel type", "type"]
        ]
      },
      {
        type: "input_dummy"
      },
      {
        type: "input_value",
        name: "CHANNEL",
        check: "Channel"
      },
      {
        type: "field_image",
        src: require("../images/discord_opposite.png"),
        width: 20,
        height: 20,
        alt: "*",
        flipRtl: false
      }
    ],
    inputsInline: true,
    output: null,
    colour: "#C77DFF",
    tooltip: "This block gets specific data from a channel",
    helpUrl: "https://discord.js.org/#/docs/main/stable/class/GuildChannel"
  },
  {
    message0: "%4 Get %1 %2 from role data %3",
    type: "getFromRole",
    args0: [
      {
        type: "field_dropdown",
        name: "NAME",
        options: [
          ["Server", "guild"],
          ["Name", "name"],
          ["Is Mentionable", "mentionable"],
          ["Color", "color"],
          ["List Of Members With This Role", "members"]
        ]
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
        type: "field_image",
        src: require("../images/discord_opposite.png"),
        width: 20,
        height: 20,
        alt: "*",
        flipRtl: false
      }
    ],
    inputsInline: true,
    output: null,
    colour: "#C77DFF",
    tooltip: "This block gets data from a specific role",
    helpUrl: "https://discord.js.org/#/docs/main/stable/class/Role"
  },
  {
    message0: "%1 Me (this bot)",
    type: "me",
    output: "User",
    colour: "#C77DFF",
    args0: [
      {
        type: "field_image",
        src: require("../images/discord_opposite.png"),
        width: 20,
        height: 20,
        alt: "*",
        flipRtl: false
      }
    ],
    tooltip: "The Bot Identity",
    helpUrl:
      "https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=user"
  },
  {
    message0: "%3 Get Custom Emoji Named %2 From Server %1",
    type: "getcustomemoji",
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
      },
      {
        type: "field_image",
        src: require("../images/discord_opposite.png"),
        width: 20,
        height: 20,
        alt: "*",
        flipRtl: false
      }
    ],
    inputsInline: true,
    output: "String",
    colour: "#C77DFF",
    tooltip: "Get a custom emoji from a specific server",
    helpUrl:
      "https://discord.js.org/#/docs/main/stable/class/GuildEmojiManager?scrollTo=cache"
  },
  {
    message0:
      "%4 Create Invite Link To Channel %1 That Can Be Used  %2 Times, And Will Stay Active For  %3 Seconds",
    type: "createInvite",
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
      },
      {
        type: "field_image",
        src: require("../images/discord_opposite.png"),
        width: 20,
        height: 20,
        alt: "*",
        flipRtl: false
      }
    ],
    inputsInline: true,
    output: "String",
    colour: "#C77DFF",
    tooltip: "Returns an Invite to a Channel you input",
    helpUrl:
      "https://discord.js.org/#/docs/main/stable/class/GuildChannel?scrollTo=createInvite"
  },
  {
    message0: "%3 Does Member %1 Has Permission To %2",
    type: "ifMemberhasPermission",
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
      },
      {
        type: "field_image",
        src: require("../images/discord_opposite.png"),
        width: 20,
        height: 20,
        alt: "*",
        flipRtl: false
      }
    ],
    output: "Boolean",
    colour: "#C77DFF",
    tooltip: "Check if the user has the permission to do something.",
    helpUrl:
      "https://discord.js.org/#/docs/main/stable/class/GuildMember?scrollTo=hasPermission"
  },
  {
    message0: "%3 Get %2 From Server %1",
    type: "getFromGuild",
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
      },
      {
        type: "field_image",
        src: require("../images/discord_opposite.png"),
        width: 20,
        height: 20,
        alt: "*",
        flipRtl: false
      }
    ],
    inputsInline: true,
    output: null,
    tooltip: "Get something from a server",
    helpUrl: "https://discord.js.org/#/docs/main/stable/class/Guild",
    colour: "#C77DFF"
  },
  {
    message0: "%3 From Channel Array %1 Get Channel Named %2",
    type: "getFromChannelList",
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
      },
      {
        type: "field_image",
        src: require("../images/discord_opposite.png"),
        width: 20,
        height: 20,
        alt: "*",
        flipRtl: false
      }
    ],
    inputsInline: true,
    output: null,
    tooltip: "Get a Channel with a specific name from a channel array",
    helpUrl:
      "https://discord.js.org/#/docs/main/stable/class/GuildChannelManager",
    colour: "#C77DFF"
  },
  {
    message0: "%3 From Member Array %1 Get Member Named %2",
    type: "getFromMemberList",
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
      },
      {
        type: "field_image",
        src: require("../images/discord_opposite.png"),
        width: 20,
        height: 20,
        alt: "*",
        flipRtl: false
      }
    ],
    inputsInline: true,
    output: "Member",
    tooltip: "Get a specific member from a Array of members",
    helpUrl:
      "https://discord.js.org/#/docs/main/stable/class/GuildChannelManager",
    colour: "#C77DFF"
  },
  {
    message0: "%3 From Role Array %1 Get Role Named %2",
    type: "getFromRoleList",
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
      },
      {
        type: "field_image",
        src: require("../images/discord_opposite.png"),
        width: 20,
        height: 20,
        alt: "*",
        flipRtl: false
      }
    ],
    inputsInline: true,
    output: "Role",
    tooltip: "Get a specific role from a Array of roles",
    helpUrl: "https://discord.js.org/#/docs/main/stable/class/RoleManager",
    colour: "#C77DFF"
  },
  {
    message0: "%3 Send Text %1 On Channel %2",
    type: "sendMessage",
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
      },
      {
        type: "field_image",
        src: require("../images/discord.png"),
        width: 20,
        height: 20,
        alt: "*",
        flipRtl: false
      }
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: "#9D4EDD",
    tooltip: "Send A Message On a Channel You Input",
    helpUrl:
      "https://discord.js.org/#/docs/main/stable/class/TextChannel?scrollTo=send"
  },
  {
    message0: "%3 Reply %1 To Message %2",
    type: "replyToMessage",
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
      },
      {
        type: "field_image",
        src: require("../images/discord.png"),
        width: 20,
        height: 20,
        alt: "*",
        flipRtl: false
      }
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: "#9D4EDD",
    tooltip: "Reply to a message you input",
    helpUrl:
      "https://discord.js.org/#/docs/main/stable/class/Message?scrollTo=reply"
  },
  {
    message0: "%3 %1 Message %2",
    type: "pin_unpin",
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
      },
      {
        type: "field_image",
        src: require("../images/discord.png"),
        width: 20,
        height: 20,
        alt: "*",
        flipRtl: false
      }
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: "#9D4EDD",
    tooltip: "Pin/Unpin a message to the channelthe message was sent on",
    helpUrl:
      "https://discord.js.org/#/docs/main/stable/class/Message?scrollTo=pin"
  },
  {
    lastDummyAlign0: "RIGHT",
    message0:
      "%6 Embed Message On Channel  %1 With These Properties: %2 Title: %3 Description: %4 Color %5",
    type: "embedMessage",
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
      },
      {
        type: "field_image",
        src: require("../images/discord.png"),
        width: 20,
        height: 20,
        alt: "*",
        flipRtl: false
      }
    ],
    inputsInline: false,
    previousStatement: null,
    nextStatement: null,
    colour: "#9D4EDD",
    tooltip: "Embed A message on a channel you input",
    helpUrl: "https://discord.js.org/#/docs/main/stable/class/MessageEmbed"
  },
  {
    message0: "%7 %1 %2 Members with Role %3 %4 %5 Messages in Channel %6",
    type: "limit_unlimit",
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
      },
      {
        type: "field_image",
        src: require("../images/discord.png"),
        width: 20,
        height: 20,
        alt: "*",
        flipRtl: false
      }
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: "#9D4EDD",
    tooltip: "Limit things that people can do on a specific channel.",
    helpUrl: "https://discordjs.guide/popular-topics/permissions.html"
  },
  {
    message0: "%5 %1 %2 Role %3 To Member %4",
    type: "roleToMember",
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
      },
      {
        type: "field_image",
        src: require("../images/discord.png"),
        width: 20,
        height: 20,
        alt: "*",
        flipRtl: false
      }
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: "#9D4EDD",
    tooltip: "Give/Take a role from a member",
    helpUrl: "https://anidiots.guide/understanding/roles"
  },
  {
    message0: "%5 %1 %2 Permission %3 To All Members With Role %4",
    type: "permissionToRole",
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
      },
      {
        type: "field_image",
        src: require("../images/discord.png"),
        width: 20,
        height: 20,
        alt: "*",
        flipRtl: false
      }
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: "#9D4EDD",
    tooltip: "Give/Take a permmission from all users with a role",
    helpUrl: "https://discord.js.org/#/docs/main/stable/class/Permissions"
  },
  {
    message0: "%3 DM %1 To Member %2",
    type: "sendDM",
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
      },
      {
        type: "field_image",
        src: require("../images/discord.png"),
        width: 20,
        height: 20,
        alt: "*",
        flipRtl: false
      }
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: "#9D4EDD",
    tooltip: "Send A DM to a Server Member you input",
    helpUrl:
      "https://discord.js.org/#/docs/main/stable/class/User?scrollTo=send"
  },
  {
    message0: "%4 %1 Member %2 For This Reason %3",
    type: "kickUser",
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
      },
      {
        type: "field_image",
        src: require("../images/discord.png"),
        width: 20,
        height: 20,
        alt: "*",
        flipRtl: false
      }
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: "#9D4EDD",
    tooltip: "Kick/Ban a user from the server for some reason.",
    helpUrl:
      "https://discord.js.org/#/docs/main/stable/class/GuildMember?scrollTo=kick"
  },
  {
    message0: "%3 Create A Text Channel Named %1 On Server %2",
    type: "createChannel",
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
      },
      {
        type: "field_image",
        src: require("../images/discord.png"),
        width: 20,
        height: 20,
        alt: "*",
        flipRtl: false
      }
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: "#9D4EDD",
    tooltip: "Create a Text Channel",
    helpUrl:
      "https://discord.js.org/#/docs/main/stable/class/GuildChannelManager?scrollTo=create"
  },
  {
    message0:
      "%8 Create a Role on Server %1 With Name %2 With Color %3 %4 That Is Mentionable %5 %6 This many places from the bottom %7",
    type: "createrole",
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
      },
      {
        type: "field_image",
        src: require("../images/discord.png"),
        width: 20,
        height: 20,
        alt: "*",
        align: "left",
        flipRtl: false
      }
    ],
    inputsInline: false,
    previousStatement: null,
    nextStatement: null,
    colour: "#9D4EDD",
    tooltip: "Create a Role on a server with these specific properties",
    helpUrl: "https://discord.js.org/#/docs/main/stable/typedef/RoleData"
  },
  {
    type: "delete",
    message0: "%3 Delete %1 %2",
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
      },
      {
        type: "field_image",
        src: require("../images/discord.png"),
        width: 20,
        height: 20,
        alt: "*",
        flipRtl: false
      }
    ],
    previousStatement: null,
    nextStatement: null,
    inputsInline: true,
    colour: "#9D4EDD",
    tooltip: "Deletes a Channel/Message/Role",
    helpUrl:
      "https://discord.js.org/#/docs/main/stable/class/Message?scrollTo=delete"
  }
];

const discordGenerators = () => {
  Blockly.JavaScript["initMessageListener"] = block => {
    let statements_callback = Blockly.JavaScript.statementToCode(
      block,
      "CALLBACK"
    );
    if (block.getTopStackBlock() !== null) {
      if (block.getTopStackBlock().type !== "setup") {
        block.unplug(true, true);
      }
    }
    //console.log(Blockly.JavaScript.RESERVED_WORDS_);
    let code = `client.on('message', async(msg) => {\n${statements_callback}})\n`;
    return code;
  };
  Blockly.JavaScript["newGuildJoinUser"] = block => {
    let statements_callback = Blockly.JavaScript.statementToCode(
      block,
      "CALLBACK"
    );
    if (block.getTopStackBlock() !== null) {
      if (block.getTopStackBlock().type !== "setup") {
        block.unplug(true, true);
      }
    }
    // TODO: Assemble JavaScript into code variable.
    let code = `client.on('guildMemberAdd', async(member) => {\n${statements_callback}})\n`;
    return code;
  };
  Blockly.JavaScript["memberLeaveGuild"] = block => {
    let statements_callback = Blockly.JavaScript.statementToCode(
      block,
      "CALLBACK"
    );
    if (block.getTopStackBlock() !== null) {
      if (block.getTopStackBlock().type !== "setup") {
        block.unplug(true, true);
      }
    }
    // TODO: Assemble JavaScript into code variable.
    let code = `client.on('guildMemberRemove', async(member) => {\n${statements_callback}})\n`;
    return code;
  };
  Blockly.JavaScript["channelCreate"] = block => {
    let statements_callback = Blockly.JavaScript.statementToCode(
      block,
      "CALLBACK"
    );
    if (block.getTopStackBlock() !== null) {
      if (block.getTopStackBlock().type !== "setup") {
        block.unplug(true, true);
      }
    }
    // TODO: Assemble JavaScript into code variable.
    let code = `client.on('channelCreate', async(channel) => {\n${statements_callback}})\n`;
    return code;
  };
  Blockly.JavaScript["channelDelete"] = block => {
    let statements_callback = Blockly.JavaScript.statementToCode(
      block,
      "CALLBACK"
    );
    if (block.getTopStackBlock() !== null) {
      if (block.getTopStackBlock().type !== "setup") {
        block.unplug(true, true);
      }
    }
    // TODO: Assemble JavaScript into code variable.
    let code = `client.on('channelDelete', async(channel) => {\n${statements_callback}})\n`;
    return code;
  };
  Blockly.JavaScript["roleCreate"] = block => {
    let statements_callback = Blockly.JavaScript.statementToCode(
      block,
      "CALLBACK"
    );
    if (block.getTopStackBlock() !== null) {
      if (block.getTopStackBlock().type !== "setup") {
        block.unplug(true, true);
      }
    }
    // TODO: Assemble JavaScript into code variable.
    let code = `client.on('roleCreate', async(role) => {\n${statements_callback}})\n`;
    return code;
  };
  Blockly.JavaScript["roleDelete"] = block => {
    let statements_callback = Blockly.JavaScript.statementToCode(
      block,
      "CALLBACK"
    );
    if (block.getTopStackBlock() !== null) {
      if (block.getTopStackBlock().type !== "setup") {
        block.unplug(true, true);
      }
    }
    // TODO: Assemble JavaScript into code variable.
    let code = `client.on('roleDelete', async(role) => {\n${statements_callback}})\n`;
    return code;
  };
  Blockly.JavaScript["Returned"] = block => {
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
          insideWrongBlock(
            block,
            ["newGuildJoinUser", "memberLeaveGuild"],
            []
          ) === true
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
  };
  Blockly.JavaScript["getFromMessage"] = block => {
    let dropdown_name = block.getFieldValue("NAME");
    let value_message = Blockly.JavaScript.valueToCode(
      block,
      "MESSAGE",
      Blockly.JavaScript.ORDER_ATOMIC
    );
    // block.setOnChange(block.setEnabled(block.allInputsFilledUnRecursive()));
    block.setOnChange(() => {
      block.setEnabled(block.allInputsFilledUnRecursive());
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
  };
  Blockly.JavaScript["getFromMember"] = block => {
    let dropdown_name = block.getFieldValue("NAME");
    let value_member = Blockly.JavaScript.valueToCode(
      block,
      "MEMBER",
      Blockly.JavaScript.ORDER_ATOMIC
    );
    block.setOnChange(() => {
      block.setEnabled(block.allInputsFilledUnRecursive());
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
  };
  Blockly.JavaScript["getFromUserProfile"] = block => {
    let dropdown_name = block.getFieldValue("NAME");
    let value_member = Blockly.JavaScript.valueToCode(
      block,
      "USER",
      Blockly.JavaScript.ORDER_ATOMIC
    );
    block.setOnChange(() => {
      block.setEnabled(block.allInputsFilledUnRecursive());
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
  };
  Blockly.JavaScript["getFromChannel"] = block => {
    let dropdown_name = block.getFieldValue("NAME");
    let value_channel = Blockly.JavaScript.valueToCode(
      block,
      "CHANNEL",
      Blockly.JavaScript.ORDER_ATOMIC
    );
    block.setOnChange(() => {
      block.setEnabled(block.allInputsFilledUnRecursive());
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
  };
  Blockly.JavaScript["getFromRole"] = block => {
    let dropdown_name = block.getFieldValue("NAME");
    let value_role = Blockly.JavaScript.valueToCode(
      block,
      "ROLE",
      Blockly.JavaScript.ORDER_ATOMIC
    );
    block.setOnChange(() => {
      block.setEnabled(block.allInputsFilledUnRecursive());
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
  };
  Blockly.JavaScript["me"] = block => {
    let code = `client.user`;
    return [code, Blockly.JavaScript.ORDER_NONE];
  };
  Blockly.JavaScript["getcustomemoji"] = block => {
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
      block.setEnabled(block.allInputsFilledUnRecursive());
    });
    let code = `${value_server}.emojis.cache.find(emoji => emoji.name= ${value_emoji}).toString()`;
    return [code, Blockly.JavaScript.ORDER_NONE];
  };
  Blockly.JavaScript["createInvite"] = block => {
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
      block.setEnabled(block.allInputsFilledUnRecursive());
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
  };
  Blockly.JavaScript["ifMemberhasPermission"] = block => {
    let value_member = Blockly.JavaScript.valueToCode(
      block,
      "MEMBER",
      Blockly.JavaScript.ORDER_ATOMIC
    );
    let dropdown_permissions = block.getFieldValue("PERMISSIONS");
    block.setOnChange(() => {
      block.setEnabled(block.allInputsFilledUnRecursive());
    });
    // TODO: Assemble JavaScript into code variable.
    let code = `${value_member}.hasPermission("${dropdown_permissions}")`;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
  };
  Blockly.JavaScript["getFromGuild"] = block => {
    let value_guild = Blockly.JavaScript.valueToCode(
      block,
      "GUILD",
      Blockly.JavaScript.ORDER_ATOMIC
    );
    let value_channel_name = block.getFieldValue("TYPE");
    block.setOnChange(() => {
      block.setEnabled(block.allInputsFilledUnRecursive());
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
  };
  Blockly.JavaScript["getFromChannelList"] = block => {
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
      block.setEnabled(block.allInputsFilledUnRecursive());
    });
    let code = `${value_channellist}.cache.find(x => x.name === ${value_name})`;

    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
  };
  Blockly.JavaScript["getFromMemberList"] = block => {
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
      block.setEnabled(block.allInputsFilledUnRecursive());
    });
    let code = `${value_memberlist}.cache.find(member => member.user.username === ${value_name})`;

    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
  };
  Blockly.JavaScript["getFromRoleList"] = block => {
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
      block.setEnabled(block.allInputsFilledUnRecursive());
    });
    let code = `${value_memberlist}.cache.find(role => role.name === ${value_name})`;

    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
  };
  Blockly.JavaScript["sendMessage"] = block => {
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
      block.setEnabled(block.allInputsFilledUnRecursive());
    });
    // TODO: Assemble JavaScript into code variable.
    let code = `await ${value_channel}.send(${value_message});\n`;
    return code;
  };
  Blockly.JavaScript["replyToMessage"] = block => {
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
      block.setEnabled(block.allInputsFilledUnRecursive());
    });
    // TODO: Assemble JavaScript into code variable.
    let code = `await ${value_message}.reply(${value_reply});\n`;
    return code;
  };
  Blockly.JavaScript["pin_unpin"] = block => {
    let dropdown_pin_unpin = block.getFieldValue("pin/unpin");
    let value_message = Blockly.JavaScript.valueToCode(
      block,
      "Message",
      Blockly.JavaScript.ORDER_ATOMIC
    );
    block.setOnChange(() => {
      block.setEnabled(block.allInputsFilledUnRecursive());
    });
    // TODO: Assemble JavaScript into code variable.
    let code = `await ${value_message}${dropdown_pin_unpin};\n`;
    return code;
  };
  Blockly.JavaScript["embedMessage"] = block => {
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
      block.setEnabled(block.allInputsFilledUnRecursive());
    });
    // TODO: Assemble JavaScript into code variable.
    let code = `let embed = new Discord.MessageEmbed()\n  .setTitle(${value_title})\n  .setDescription(${value_message})\n  .setColor("${colour_color}");\n${value_channel}.send(embed);\n`;
    return code;
  };
  Blockly.JavaScript["limit_unlimit"] = block => {
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
      block.setEnabled(block.allInputsFilledUnRecursive());
    });
    // TODO: Assemble JavaScript into code variable.
    let code = `await ${value_channel}.updateOverwrite(${value_role}, {\n   ${dropdown_a}: ${dropdown_true} \n});\n`;
    return code;
  };
  Blockly.JavaScript["roleToMember"] = block => {
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
      block.setEnabled(block.allInputsFilledUnRecursive());
    });
    // TODO: Assemble JavaScript into code variable.
    let code = `await ${value_member}.${dropdown_give_take}Role(${value_role});\n`;
    return code;
  };
  Blockly.JavaScript["permissionToRole"] = block => {
    let dropdown_give_take = block.getFieldValue("GIVE/TAKE");
    let dropdown_permissions = block.getFieldValue("PERMISSION");
    let value_role = Blockly.JavaScript.valueToCode(
      block,
      "ROLE",
      Blockly.JavaScript.ORDER_ATOMIC
    );
    block.setOnChange(() => {
      block.setEnabled(block.allInputsFilledUnRecursive());
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
  };
  Blockly.JavaScript["sendDM"] = block => {
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
      block.setEnabled(block.allInputsFilledUnRecursive());
    });
    // TODO: Assemble JavaScript into code variable.
    let code = `await ${value_member}.send(${value_message});\n`;
    return code;
  };
  Blockly.JavaScript["kickUser"] = block => {
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
      block.setEnabled(block.allInputsFilledUnRecursive());
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
  };
  Blockly.JavaScript["createChannel"] = block => {
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
      block.setEnabled(block.allInputsFilledUnRecursive());
    });
    // TODO: Assemble JavaScript into code variable.
    let code = `await ${value_guild}.channels.create(${value_channelname}, "text");\n`;
    // TODO: Change ORDER_NONE to the correct strength.
    return code;
  };
  Blockly.JavaScript["createrole"] = block => {
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
      block.setEnabled(block.allInputsFilledUnRecursive());
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
  };
  Blockly.JavaScript["delete"] = block => {
    let value_message = Blockly.JavaScript.valueToCode(
      block,
      "msg",
      Blockly.JavaScript.ORDER_ATOMIC
    );
    block.setOnChange(() => {
      if (!block.allInputsFilledUnRecursive()) {
        block.setEnabled(true);
        block.inputList[0].setCheck(block.getFieldValue("e/f"));
      } else {
        block.inputList[0].setCheck(block.getFieldValue("e/f"));
      }
      block.setEnabled(block.allInputsFilledUnRecursive());
      // console.log(block.inputList[0]);
    });
    // TODO: Assemble JavaScript into code variable.
    let code = `await ${value_message}.delete();`;
    // TODO: Change ORDER_NONE to the correct strength.
    return code;
  };
};

export { discordBlocks, discordTools, discordGenerators };
