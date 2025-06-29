import express from "express";
import {
    addExpense,
    getAllExpense,
    markAsDoneOrUndone,
    removeExpense,
    updateExpense,
} from "../controllers/expense.controller.js";

import isAuthenticate from "../middlewares/auth.middleware.js";

const router = express.Router()

router.post('/add',isAuthenticate,addExpense);

router.get('/',isAuthenticate,getAllExpense);

router.patch('/mark/:id',isAuthenticate, markAsDoneOrUndone);

router.delete("/remove/:id",isAuthenticate,removeExpense);

router.put('/update/:id',isAuthenticate,updateExpense)

export default router