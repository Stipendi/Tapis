/*
  This is a structure to easily create commands.
  Passing in options and adding new ones is easy.
*/
module.exports = class Command {
  constructor(name, options, callback) {
    this.name = name;
    this.run = callback;
    options.aliases ? this.aliases = options.aliases : [];
  }
}
