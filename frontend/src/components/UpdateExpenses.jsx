import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from '@radix-ui/react-label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useDispatch, useSelector } from 'react-redux';
import { DialogClose } from '@radix-ui/react-dialog';
import { setExpenses, setLoading } from '@/features/expenses/expensesSlice';
import { toast } from 'sonner';
import axios from 'axios';
import { EXPENSE_API_END_POINT } from '@/utils/endpoints';

const UpdateExpenses = ({expense}) => {
    const [formData, setFormData] = useState({
        description: "",
        amount: "",
        category: ""
    })
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch()
    const { expenses } = useSelector(store => store.expense)
    useState(()=>{
        setFormData({
            description : expense.description,
            amount : expense.amount,
            category : expense.category
        })
    })

    const handleCategoryChange = (value) => {
        setFormData((prev) => ({
            ...prev,
            category: value
        }))

    }
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
        
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            dispatch(setLoading(true));
            const res = await axios.put(`${EXPENSE_API_END_POINT}/update/${expense._id}`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                const updatedExpenses = expenses.map(exp => exp._id === expense._id ? res.data.expense : exp);
                dispatch(setExpenses(updatedExpenses));
                toast.success(res.data.message);
                setOpen(false);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message);
        } finally {
            dispatch(setLoading(false));
        }
    }


    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button>Edit</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Expense</DialogTitle>
                        <DialogDescription>
                            Edit the expense to here. Click on done
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={submitHandler}>
                        <div className="grid gap-4">
                            <div className="grid gap-3">
                                <Label htmlFor="desc">Description</Label>
                                <Input id="desc" name="description" onChange={handleChange} value={formData.description} />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="amount">Amount</Label>
                                <Input id="amount" name="amount" onChange={handleChange} value={formData.amount} />
                            </div>
                            <div className="grid gap-3">
                                <Select value={formData.category} onValueChange={handleCategoryChange}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="rent">Rent</SelectItem>
                                            <SelectItem value="food">Food</SelectItem>
                                            <SelectItem value="salary">Salary</SelectItem>
                                            <SelectItem value="shopping">Shopping</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>

                                </Select>

                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div >
    )
}

export default UpdateExpenses