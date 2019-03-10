/*
  This is a structure to easily create commands.
  Passing in options and adding new ones is easy.
*/
module.exports = class Command {
  constructor(name, options, callback) {
    this.name = name;
    this.run = callback;
    this.aliases = options.aliases ? options.aliases : [];
    this.ownerOnly = options.ownerOnly ? true : false;
  }
}
