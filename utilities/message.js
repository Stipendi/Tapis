const Embed = require("../structures/embed.js");
const random = require("./random.js");

module.exports = new class Message {
  async create(channel, content) { // this will offer more flexibility later on
    return await channel.createMessage(content);
  }
  formatQuestion(triviaQuestion) {
    console.log(triviaQuestion);
    let answers = triviaQuestion.answers.map((ans, i) => {
      return { content: ans, right: triviaQuestion.right_answers[i] };
    });
    return new Embed(triviaQuestion.question, answers.map((ans, i) => {
      return this.bold(String.fromCharCode(97 + i).toUpperCase() + ") ") + ans.content + " (" + ans.right + ")";
    }).join("\n"));
  }
  bold(string) {
    return "**" + string + "**";
  }
}();
