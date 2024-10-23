const Transaction = require('../models/Transaction');

exports.createTransaction = async (req, res) => {
    try {
        const { type, category, amount, date, description } = req.body;
        const newTransaction = await Transaction.create({ type, category, amount, date, description });
        res.status(201).json(newTransaction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.findAll();
        res.status(200).json(transactions);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getTransactionById = async (req, res) => {
    try {
        const transaction = await Transaction.findByPk(req.params.id);
        if (!transaction) return res.status(404).json({ error: "Transaction not found" });
        res.status(200).json(transaction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateTransaction = async (req, res) => {
    try {
        const { type, category, amount, date, description } = req.body;
        const transaction = await Transaction.findByPk(req.params.id);
        if (!transaction) return res.status(404).json({ error: "Transaction not found" });

        transaction.type = type;
        transaction.category = category;
        transaction.amount = amount;
        transaction.date = date;
        transaction.description = description;

        await transaction.save();
        res.status(200).json(transaction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findByPk(req.params.id);
        if (!transaction) return res.status(404).json({ error: "Transaction not found" });

        await transaction.destroy();
        res.status(200).json({ message: "Transaction deleted" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getSummary = async (req, res) => {
    try {
        const income = await Transaction.sum('amount', { where: { type: 'income' } });
        const expenses = await Transaction.sum('amount', { where: { type: 'expense' } });
        const balance = income - expenses;

        res.status(200).json({ totalIncome: income, totalExpenses: expenses, balance });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
