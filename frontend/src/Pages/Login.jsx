import { Label } from '@radix-ui/react-label';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { setAuthUser, setLoading, setAuthenticate } from '@/features/user/authSlice';
import { USER_API_END_POINT } from '@/utils/endpoints';
import { toast } from 'sonner';
import axios from 'axios';
import { CircleUserRound, Loader2 } from 'lucide-react';

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: ""
    })
    const { isAuthenticated, loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/')
        }
    })


    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            dispatch(setLoading(true))
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
            if (res.data.success) {
                dispatch(setAuthenticate(true))
                dispatch(setAuthUser(res.data.user))
                toast.success(res.data.message)
                navigate('/')
            }

        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message)

        }
        finally {
            dispatch(setLoading(false))
        }
    }

    return (
        <div className='flex items-center justify-center h-screen'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-5 w-95 p-8 shadow-lg'>
                <div className='flex justify-center'>
                    <CircleUserRound size={100}/>
                </div>
                <div className='flex flex-col gap-5'>
                    <Label>Email</Label>
                    <Input
                        type="email"
                        name="email"
                        value={input.email}
                        onChange={changeEventHandler}
                    />
                </div>
                <div className='flex flex-col gap-5'>
                    <Label>Password</Label>
                    <Input
                        type="password"
                        name="password"
                        value={input.password}
                        onChange={changeEventHandler}
                    />
                </div>
                <div>
                    {
                        loading ? (
                            <Button className='w-full my-4'>
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                Please wait
                            </Button>
                        ) : (
                            <Button className="w-full my-5">Login</Button>
                        )
                    }
                </div>
                <div className='flex justify-center gap-2'>
                    <p>Not have account?</p>
                    <Link to='/signup' className='text-blue-500 underline'>Sign up</Link>
                </div>
            </form>
        </div>
    )
}

export default Login