const Eris = require("eris"); // Discord API wrapper library, Eris
const config = require("./config.json"); // a publicly visible file storing global bot settings
const secret = require("./secret.json"); // a file with private stuff such as the token
const fs = require("fs"); // a module to help us structure our code to multiple files, file-system
class Tapis { // a class containing useful methods and properties
  constructor(token) {
    this.client = new Eris(token, { getAllUsers: true }); // the client object Eris provides
    this.commands = []; // an array that stores all the commands
  }
}

let tapis = new Tapis(secret.token); // our central Tapis instance that contains useful things
module.exports = tapis; // great! other files can use it!
tapis.client.connect(); // connect the bot

tapis.client.on("ready", () => { // gets executed when the bot is first booted up
  console.log("I'm alive!");
  fs.readdir("./commands/", (err, files) => { // gets us an array of file names that contain commands
    const jsFiles = files.filter(file => file.split(".").pop() === "js"); // filters out non-js files
    for (let i = 0; i < jsFiles.length; i++) { // iterate through the file names
      const requiredFile = require("./commands/" + jsFiles[i]); // import the file
      if (requiredFile.name && requiredFile.run) { // if it's a valid command
        tapis.commands.push(requiredFile); // ... then add it to the commands array!
        console.log("[" + (i + 1) + "/" + jsFiles.length + "] Successfully loaded command " + requiredFile.name); // add a nice little console message
      }
    }
  });
  tapis.client.editStatus("online", { // set the bot's status
    name: "Work in progress!",
    type: 0
  });
});

tapis.client.on("messageCreate", message => {
  if (message.content.startsWith(config.prefix)) { // IF PREFIX IS USED:
    const args = message.content.split(/\s+/); // get command arguments
    const commandName = args.shift().toLowerCase().slice(config.prefix.length); // get command name
    let command = tapis.commands.find(cmd => cmd.name === commandName || cmd.aliases.includes(commandName)); // find the corresponding function;
    if (command) { // if a command was found
      command.run(message, args); // ... run it and give the command the message and the arguments
    }
  }
});
