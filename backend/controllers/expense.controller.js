import { Expense } from "../models/expense.model.js";

export const addExpense = async (req,res) => {
    try {
        const { description, amount, category } = req.body;
        const userId = req.id
        if (!description || !amount || !category) return res.status(401).json({ message: "Something is Misssing", success: false })
        const expense = await Expense.create({
            description,
            amount: Number(amount),
            category,
            userId
        }); 
        return res.status(201).json({
            message: "New Expenses Added.",
            expense,
            success: true,
        });
    }
    catch (err) {

        console.log(err)
    }
}
export const getAllExpense = async (req, res) => {
    try {
        const userId = req.id;
        const category = req.query.category || "";
        const done = req.query.done || "";

        const query = { userId };

        if (category.toLowerCase() !== 'all') {
            query.category = { $regex: category, $options: 'i' };
        }

        if (done.toLowerCase() === "done") {
            query.done = true;
        } else if (done.toLowerCase() === "undone") {
            query.done = false;
        }

        const expenses = await Expense.find(query);
       

        if (!expenses || expenses.length === 0) {
            return res.status(404).json({ message: "No expenses found", success: false });
        }

        return res.status(200).json({ expenses, success: true });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
}

export const markAsDoneOrUndone = async (req, res) => {
    try {
        const expenseId = req.params.id
        const done  = req.body
        const expense = await Expense.findByIdAndUpdate(expenseId, done, { new: true })
        if (!expense) {
            return res.status(404).json({ meassage: "Expense not found", success: false })

        }
        return res.status(200).json({ message: `Expense Marked as ${expense.done ? "done" : "undone"}`, success: true })


    } catch (error) {
        console.log(error)
    }
}

export const removeExpense = async (req, res) => {
    try {
        const expenseId = req.params.id;
        await Expense.findByIdAndDelete(expenseId);

        res.status(200).json({ message: "Expense id Removed", success: true })

    } catch (error) {
        console.log(error)
    }
}

export const updateExpense = async (req, res) => {
    try {

        const { description, amount, category } = req.body
        const expenseId = req.params.id

        const updateData = { description, amount, category }

        const expense = await Expense.findByIdAndUpdate(expenseId, updateData, { new: true });
        res.status(200).json({ message: "Expense Updated", expense, success: true })

    } catch (error) {
        console.log(error)

    }
}
