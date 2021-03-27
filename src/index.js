const { response } = require("express");
const express = require("express");

const app = express();
const port = 3030;
const { v4 } = require("uuid");

app.use(express.json());

const customers = [];

function verifyIfExistAccountCpf(req, res, next) {
  const { cpf } = req.headers;
  const customer = customers.find((customer) => customer.cpf === cpf);

  if (!customer) {
    return res.status(400).json({ error: "Customer not found!" });
  }

  req.customer = customer;

  return next();
}

function getBalance(statements) {
  const balance = statements.reduce((acc, statement) => {
    if (statement.type === "credit") {
      return acc + statement.amount;
    }
    return acc - statement.amount;
  }, 0);

  return balance;
}

app.post("/account", (req, res) => {
  const { cpf, name } = req.body;
  const customerAlreadyExist = customers.some(
    (customer) => customer.cpf === cpf
  );

  if (customerAlreadyExist) {
    return res.status(400).json({ error: "Customer already exists!" });
  }

  customers.push({
    cpf,
    name,
    id: v4(),
    statements: [],
  });

  return res.status(201).send();
});

app.get("/statement/", verifyIfExistAccountCpf, (req, res) => {
  const { customer } = req;

  return res.json(customer.statements);
});

app.post("/deposit", verifyIfExistAccountCpf, (req, res) => {
  const { description, amount } = req.body;
  const { customer } = req;
  const statementOperation = {
    description,
    amount,
    created_at: new Date(),
    type: "credit",
  };

  customer.statements.push(statementOperation);

  return res.status(201).send();
});

app.post("/withdraw", verifyIfExistAccountCpf, (req, res) => {
  const { amount, description } = req.body;
  const { customer } = req;
  const balance = getBalance(customer.statements);

  if (balance < amount) {
    return res.status(400).json({ error: "Insufficient funds!" });
  }

  const statementOperation = {
    description,
    amount,
    created_at: new Date(),
    type: "debit",
  };
  customer.statements.push(statementOperation);

  return res.status(201).send();
});

app.get("/statement/date", verifyIfExistAccountCpf, (req, res) => {
  const { customer } = req;
  const { date } = req.query;
  const dateFormat = new Date(date + ' 00:00');

  const statements = customer.statements.filter((statement) => {
    return statement.created_at.toDateString() === dateFormat.toDateString();
  });

  return res.status(201).json(statements);
});

app.put('/account', verifyIfExistAccountCpf, (req, res) => {
  const { customer } = req;
  const { name } = req.body;

  customer.name = name;

  return res.status(201).send();
});

app.get('/account', verifyIfExistAccountCpf, (req, res) => {
  const { customer } = req;

  return res.json(customer);
});

app.delete('/account', verifyIfExistAccountCpf, (req, res) => {
  const { customer } = req;

  customers.splice(customer, 1);

  return res.status(204).send();
});

app.get('/balance', verifyIfExistAccountCpf, (req, res) => {
  const { customer } = req;
  const balance = getBalance(customer.statements);

  return res.json(balance);
})

app.listen(port);
