# Botly
The open-source Visual-Based Development Interface for creating bots. Made on top of functions from Discord.JS. Online Prototype: [Botly](https://botly-56339.web.app)

# How to use
To add a block to your program, you can just drag and drop the corresponding blocks. On hovering over the block, you can see a description of the use cases of the block. If you right-click, you will be able to colapse/expand/disable blocks. All your code must be inside the original setup block, and will cause an error on compile if done otherwise. The code is auto-generated at the bottom. 

# Once you have created your bot, do the following:
1) Create a new file on your computer (or server if you're hosting the bot elsewhere) called "index.js"
2) Go to the bot you created in Botly, and copy the line of code at the bottom. Paste it into index.js
3) Install [Node.JS](https://nodejs.org/en/) if you haven't done so yet.
4) In the same directory as index.js run the following commands:  
  ```
  npm init 
  npm install discord.js
  ```
5) Once those have run, type in node index
