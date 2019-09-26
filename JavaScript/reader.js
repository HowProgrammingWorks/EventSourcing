'use strict';

const { Bank } = require('./bank.js');

class AccountQuery {
  constructor(account, operation) {
    this.account = account;
    this.operation = operation;
    this.rows = 0;
  }
}

class BankRead {
  constructor(eventBus) {
    this.bank = new Bank();
    this.commands = [];
    this.queries = [];
    eventBus.on('command', command => {
      this.commands.push(command);
      this.bank.execute(command);
    });
  }

  select({ account, operation }) {
    const query = new AccountQuery(account, operation);
    this.queries.push(query);
    const result = [];
    for (const command of this.commands) {
      let condition = true;
      if (account) condition = command.account === account;
      if (operation) condition = condition && command.operation === operation;
      if (condition) result.push(command);
    }
    query.rows = result.length;
    console.dir(query);
    return result;
  }

  getAccount(name) {
    return this.bank.find(name);
  }
}

module.exports = { BankRead };
