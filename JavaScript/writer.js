'use strict';

const { Bank } = require('./bank.js');

class AccountCommand {
  constructor(account, operation, amount = 0) {
    this.operation = operation;
    this.account = account;
    this.amount = amount;
  }
}

class BankWrite {
  constructor(eventBus) {
    this.bank = new Bank();
    this.commands = [];
    this.eventBus = eventBus;
  }

  createAccount(account) {
    const operation = 'create';
    const command = new AccountCommand(account, operation);
    this.commands.push(command);
    this.eventBus.emit('command', command);
    this.bank.execute(command);
  }

  operation(account, value) {
    const operation = value < 0 ? 'withdraw' : 'income';
    const amount = Math.abs(value);
    const command = new AccountCommand(account, operation, amount);
    this.commands.push(command);
    this.eventBus.emit('command', command);
    this.bank.execute(command);
  }
}

module.exports = { BankWrite };
