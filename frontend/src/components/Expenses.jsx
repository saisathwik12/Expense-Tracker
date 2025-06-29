import { setCategory, setExpenses, setMarkAsDone } from '@/features/expenses/expensesSlice';
import { EXPENSE_API_END_POINT, USER_API_END_POINT } from '@/utils/endpoints';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from './ui/button';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { CreateExpense } from './CreateExpense';
import UpdateExpenses from './UpdateExpenses';
import { setAuthenticate } from '@/features/user/authSlice';

const GetExpenses = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { category, markAsDone, expenses } = useSelector((store) => store.expense);
    const { isAuthenticated } = useSelector((store) => store.auth);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login')
        }
    }, [isAuthenticated])

    const fetchExpenses = async () => {
        try {

            const res = await axios.get(`${EXPENSE_API_END_POINT}?category=${category}&done=${markAsDone}`, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })


            if (res.data.success) {
                dispatch(setExpenses(res.data.expenses))
            }


        }
        catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message)

        }

    }

    const handleLogout = async() =>{
        try {
            const res = await axios.post(`${USER_API_END_POINT}/logout`)

            if(res.data.success){
                toast.success(res.data.message);
                dispatch(setAuthenticate(false))
                navigate('/login')
            }

        } catch (error) {
            console.log('Logout',error)
        }
    }


    useEffect(() => {

        fetchExpenses();

    }, [dispatch, markAsDone, category])


    //DELETE EXPENSE
    const removeExpenseHandler = async (expenseId) => {
        try {
            console.log(expenseId)
            const res = await axios.delete(`${EXPENSE_API_END_POINT}/remove/${expenseId}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                fetchExpenses()
                toast.success(res.data.message);
                // update the local state
                // const filteredExpenses = localExpense.filter(expense => expense._id !== expenseId);
                // setLocalExpense(filteredExpenses);
            }
        } catch (error) {
            console.log("remove", error);
        }
    }


    return (
        <div className='flex gap-5 flex-col p-5'>
            <div className='text-end'>
                {
                    isAuthenticated ? (<Button onClick={handleLogout} variant='destructive'>Logout</Button>) :
                        (<Link to='/login'>
                            <Button>Login</Button>
                        </Link>)
                }

            </div>
            <h1 className='md:text-5xl text-2xl font-bold'>Expenses</h1>
            <div className='text-end'>
                <CreateExpense />
            </div>
            <div>
                <Table className='border-2 shadow-lg '>
                    <TableCaption>A list of Expenses</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='py-5'>S.No</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>
                                <select value={category} onChange={(e) => dispatch(setCategory(e.target.value))} className='py-1'>
                                    <option value="" disabled>
                                        Category
                                    </option>
                                    <option value="food">Food</option>
                                    <option value="shopping">Shopping</option>
                                    <option value="salary">Salary</option>
                                    <option value="rent">Rent</option>
                                    <option value="other">Other</option>
                                    <option value="all">All</option>
                                </select>

                            </TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>
                                <select value={markAsDone} onChange={(e) => dispatch(setMarkAsDone(e.target.value))} className='py-1'>
                                    <option value="" disabled hidden>
                                        Status
                                    </option>
                                    <option value="done">Done</option>
                                    <option value="undone">Undone</option>

                                </select>
                            </TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>

                        {expenses && expenses.map((data, index) => {
                            return (

                                <TableRow className='' key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{data.description}</TableCell>
                                    <TableCell>{data.category}</TableCell>
                                    <TableCell>{data.amount}</TableCell>
                                    <TableCell>{data.done ? "done" : "undone"}</TableCell>
                                    <TableCell className='flex gap-5 justify-end'>
                                        <Button><UpdateExpenses expense={data} /></Button>
                                        <Button onClick={() => removeExpenseHandler(data._id)}>Delete</Button>
                                    </TableCell>
                                </TableRow>

                            )

                        })}

                    </TableBody>

                </Table>
            </div>

        </div >
    )
}

export default GetExpenses