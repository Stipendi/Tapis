const msg = require("../utilities/message.js");
const Command = require("../structures/command.js");
const wittyResponses = ["pong!", "Do you really think I'd respond with \"pong\" or something like that?", "I'm not your toy.", "Yes, yes, I'm here.", "Who created this dumb command?", "Here I am.", "Who disturbed my peace?", "Go bother someone else."];

module.exports = new Command("ping", { aliases: "heyareyoualive" }, (message, args) => {
  msg.create(message.channel, wittyResponses[~~(Math.random() * wittyResponses.length)]);
});
