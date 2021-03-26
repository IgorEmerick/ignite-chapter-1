const { response } = require('express');
const express = require('express');
const app = express();
const port = 3030;
const {v4} = require('uuid');

app.use(express.json());

const customers = [];

function verifyIfExistAccountCpf(req, res, next) {
  const {cpf} = req.headers;
  const customer = customers.find(customer => customer.cpf === cpf);

  if (!customer) {
    return res.status(400).json({error: 'Customer not found!'});
  }

  req.customer = customer;

  return next();
}

function getBalance(statement) {
  const balance = statement.reduce((acc, operation) => {
    if (operation.type === 'credit') {
      return acc + operation.amount;
    } else {
      return acc - operation.amount;
    }
  }, 0);

  return balance;
}

app.post('/account', (req, res) => {
  const { cpf, name } = req.body;
  const customerAlreadyExist = customers.some(customer => customer.cpf === cpf);

  if (customerAlreadyExist) {
    return res.status(400).json({error: "Customer already exists!"});
  }

  customers.push({
    cpf,
    name,
    id: v4(),
    statement: []
  });

  return res.status(201).send();
});

app.get('/statement/', verifyIfExistAccountCpf, (req, res) => {
  const {customer} = req;
  
  return res.json(customer.statement);
});

app.post('/deposit', verifyIfExistAccountCpf, (req, res) => {
  const {description, amount} = req.body;
  const {customer} = req;
  const statementOperation = {
    description,
    amount,
    created_at: new Date(),
    type: 'credit'
  }

  customer.statement.push(statementOperation);

  return res.status(201).send();
})

app.post('/withdraw', verifyIfExistAccountCpf, (req, res) => {
  const { amount, description } = req.body;
  const { customer } = req;
  const balance = getBalance(customer.statement);

  if (balance < amount) {
    return res.status(400).json({error: 'Insufficient funds!'});
  }

  const statementOperation = {
    description,
    amount,
    created_at: new Date(),
    type: 'debit'
  }
  // customer.statement.push(statementOperation);

  return res.status(201).send();
})

app.listen(port);