import axios from 'axios'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'

const LoginForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const validate = () =>{
        let result = true
        if(!email || !password){
            toast.error("You must missing a field")
            result =false;
        }
        return result;
    }
    const handleLogin = (e) =>{
        e.preventDefault()
        validate()
        axios.get('http://localhost:4000/users?email='+ email)
        .then((res) =>{
            return res.json
        })
        .then((res) =>{
            if(res.email !== email){
                toast.error("Please enter valid email")
            }
            else {
                if(res.password === password){
                    toast.success("Login success")
                    window.location.href='/'
                }else{
                    toast.error("Please enter valid password")
                }
            }
        })
    }
    
  return (
    <div className='flex flex-col items-center justify-center'>
        <ToastContainer/>
        <img src='https://bgr.com/wp-content/uploads/2021/05/amazon-sign.jpg?quality=70&strip=all' 
        className='h-40 rounded-md'
        alt='logo'/>
        <form className='block gap-4 rows-2 my-5 h-max bg-white ring-gray-400 ring-1 shadow-md rounded-lg' onSubmit={handleLogin}>
        <div className='pt-8 pl-5 block'>
            <label htmlFor='email' className='text-neutral-600'>Email: </label>
            <input id='email' className='px-2 block w-[300px] mr-5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-inset focus:ring-0 sm:text-sm sm:leading-6'
                value={email} onChange={(e) => setEmail(e.target.value)} type='email'
            />
        </div>
        <div className='pt-8 pl-5 block'>
            <label htmlFor='password' className='text-neutral-600'>Password: </label>
            <input id='password' type='password' className='px-2 block w-[300px] mr-5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-inset focus:ring-0 sm:text-sm sm:leading-6 '
                value={password} onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <div className=' text-center my-6'>
            <button type='submit' className=' bg-orange-500 text-white py-1 rounded-md w-[300px]'>Login</button>
        </div>
        <div className='text-center my-3 text-blue-800 underline'>
            <a href='/signup'>Create an account</a>
        </div>
        </form>
    </div>
  )
}

export default LoginForm