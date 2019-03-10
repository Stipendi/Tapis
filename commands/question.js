const msg = require("../utilities/message.js");
const Command = require("../structures/command.js");
const Tapis = require("../index.js");

module.exports = new Command("question", {}, async (message, args) => {
  let question = await Tapis.getQuestionData(args[0]);
  if (question)
    msg.create(message.channel, { embed: msg.formatQuestion(question) });
  else
    msg.create(message.channel, "Yeah I didn't find shit");
});
