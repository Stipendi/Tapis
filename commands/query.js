const msg = require("../utilities/message.js");
const Command = require("../structures/command.js");
const tapis = require("../index.js");

module.exports = new Command("query", {
  aliases: ["postgres", "sql", "qry"],
  ownerOnly: true
}, async (message, args) => {
  let result = await tapis.pool.query(args.join(" ")).catch(e => { // do the query
    msg.create(message.channel, "```\n" + e + "\n```"); // error handling
    return false; // signal failure
  });
  console.log(result.rows);
  if (result && result.rows.length) {
    msg.create(message.channel, "Here's the first result (not necessarily the only one):\n\n```\n" + JSON.stringify(result.rows[0]) + "\n```");
  }else if (result) {
    msg.create(message.channel, "The query probably yielded no reasonable output, but it may have had other effects.");
  }
});
