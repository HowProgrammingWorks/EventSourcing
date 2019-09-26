'use strict';

class BankAccount {
  constructor(name) {
    this.name = name;
    this.balance = 0;
  }
}

const operations = {
  Create: (command, bank) => {
    const account = bank.find(command.account);
    if (!account) bank.createAccount(command.account);
  },
  Withdraw: (command, bank) => {
    const account = bank.find(command.account);
    account.balance -= command.amount;
  },
  Income: (command, bank) => {
    const account = bank.find(command.account);
    account.balance += command.amount;
  },
};

class Bank {
  constructor() {
    this.accounts = new Map();
  }

  createAccount(name) {
    const account = new BankAccount(name);
    this.accounts.set(name, account);
  }

  find(name) {
    return this.accounts.get(name);
  }

  execute(command) {
    const operation = operations[command.operation];
    operation(command, this);
    console.dir(command);
  }
}

module.exports = { Bank };
