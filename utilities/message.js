module.exports = new class Message {
  async create(channel, content) { // this will offer more flexibility later on
    return await channel.createMessage(content);
  }
}();
