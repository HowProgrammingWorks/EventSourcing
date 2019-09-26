'use strict';

const { EventEmitter } = require('events');
const eventBus = new EventEmitter();

const { BankWrite } = require('./writer.js');
const { BankRead } = require('./reader.js');

const writeApi = new BankWrite(eventBus);
const readApi1 = new BankRead(eventBus);
const readApi2 = new BankRead(eventBus);
const readApi3 = new BankRead(eventBus);

const marcus = 'Marcus Aurelius';
writeApi.createAccount(marcus);
writeApi.operation(marcus, 1000);
writeApi.operation(marcus, -50);

const pius = 'Antoninus Pius';
writeApi.createAccount(pius);
writeApi.operation(pius, 500);
writeApi.operation(pius, -100);
writeApi.operation(pius, 150);

const res1 = readApi1.select({ account: marcus });
console.table(res1);
const marcusBalance1 = readApi1.getAccount(marcus);
console.dir({ marcusBalance1 });

const res2 = readApi2.select({ account: pius, operation: 'Income' });
console.table(res2);

const res3 = readApi3.select({ operation: 'Withdraw' });
console.table(res3);
