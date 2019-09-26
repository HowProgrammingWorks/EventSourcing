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
    const operation = 'Create';
    const command = new AccountCommand(account, operation);
    this.commands.push(command);
    this.eventBus.emit('command', command);
    this.bank.execute(command);
  }

  operation(account, amount) {
    const operation = amount < 0 ? 'Withdraw' : 'Income';
    const command = new AccountCommand(account, operation, Math.abs(amount));
    this.commands.push(command);
    this.eventBus.emit('command', command);
    this.bank.execute(command);
  }
}

module.exports = { BankWrite };
