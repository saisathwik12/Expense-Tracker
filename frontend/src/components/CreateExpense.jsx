// Create Expense Page
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useState } from "react";
import axios from "axios";
import { EXPENSE_API_END_POINT } from "@/utils/endpoints";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setExpenses, setLoading } from "../features/expenses/expensesSlice.js";
import { Loader2 } from "lucide-react";

export function CreateExpense() {
    const [formData, setFormData] = useState({
        description: "",
        amount: "",
        category: "",
    });
    const [isOpen, setIsOpen] = useState(false);
    const { expenses, loading } = useSelector(store => store.expense);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCategoryChange = (value) => {
        setFormData((prevData) => ({
            ...prevData,
            category: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${EXPENSE_API_END_POINT}/add`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setExpenses([...expenses, res.data.expense]));
                toast.success(res.data.message);
                setIsOpen(false);  // Close the dialog after success
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "An error occurred");
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button onClick={() => setIsOpen(true)}>Add New Expense</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Expense</DialogTitle>
                    <DialogDescription>
                        Create expense to here. Click add when you're done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                Description
                            </Label>
                            <Input
                                id="description"
                                placeholder="description"
                                className="col-span-3"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="amount" className="text-right">
                                Amount
                            </Label>
                            <Input
                                id="amount"
                                placeholder="xxx in ₹"
                                className="col-span-3"
                                name="amount"
                                value={formData.amount}
                                onChange={handleChange}
                            />
                        </div>
                        <Select onValueChange={handleCategoryChange}>
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
                    <DialogFooter>
                        {
                            loading ? (
                                <Button className='w-full my-4'>
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                    Please wait
                                </Button>
                            ) : (
                                <Button type="submit">Add</Button>
                            )
                        }
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}