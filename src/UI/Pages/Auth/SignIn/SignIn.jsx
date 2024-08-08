import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BE_URL } from '../../../../Config'
import { toast } from 'react-toastify'
import { useCookies } from 'react-cookie'
import { Eye, EyeOff } from 'lucide-react'

export default function SignIn() {
    let [credential, setCredential] = useState({ email: "", password: "" })
    let [showPassword, setShowPassword] = useState(false)

    // cookies
    let [cookie, setCookie] = useCookies([])

    // navigation
    const navigate = useNavigate()

    // login handler
    const loginHandler = (e) => {
        e?.preventDefault()
        axios({
            method: "post",
            url: BE_URL + '/user/signin',
            data: credential,
        })?.then((res) => {
            toast.success("Login Successfully")
            console.log(res?.data,"data");
            setCookie("user", res?.data?.data)
            setCookie("token", res?.data?.token)
            navigate("/")
            window.scrollTo(0, 0)
        })?.catch((err) => {
            toast.error("Something Went Worng")
        })
    }

    // password hide and show
    const passwordShowHideHandler = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div className=''>
            <h1 className='text-center p-10 font-medium text-3xl text-[#191919]'>ALREADY REGISTERED?</h1>
            <div className='container'>
                <div className='flex justify-center gap-3'>
                    <div className='border border-[#e9e7e7] w-[50%] px-[40px] py-[30px]'>
                        <h3 className='text-[#191919] text-2xl font-normal pb-3'>NEW CUSTOMER</h3>
                        <p className='text-[#777777] text-[13px] leading-5'>
                            By creating an account with our store, you will be able to move through the checkout process faster, store multiple shipping addresses, view and track your orders in your account and more.
                        </p>
                        <button type='submit' className=" text-sm mt-3 transition-colors duration-500 hover:text-white border-2 border-[#d11e33] py-2 px-4 rounded-md hover:!bg-[#d11e33] !bg-white text-[#d11e33]" onClick={() => navigate("/signup")}>CREATE AN ACCOUNT</button>
                    </div>
                    <div className='border border-[#e9e7e7] px-[40px] py-[30px] ml-2 w-[50%] [&_input]:rounded-md [&_label]:font-semibold'>
                        <h3 className='text-[#191919] text-2xl font-normal pb-3'>LOGIN</h3>
                        <p className='text-sm text-[#777777]'>If you have an account with us, please log in.</p>
                        <form action="#" autoComplete='off'>
                            <label htmlFor="email" className='w-[100%] flex justify-between text-[#191919]'>
                                <span>Email *</span>{" "}
                                <span className='text-[#777777]'>* Required Fields</span>
                            </label>
                            <input type="email" id='email' placeholder='Enter Your Email' className="mb-3 mt-2 w-full border-none bg-[#f7f8fa] focus:!ring-[#d11e33] focus:ring-1" required onChange={(e) => setCredential({ ...credential, email: e?.target?.value })} />
                            <label htmlFor="password">Password *</label>
                            <div className='relative mb-4'>
                                <input type={showPassword ? "text" : "password"} id='password' placeholder='Enter Your Number' className="mt-2 w-full border-none bg-[#f7f8fa] focus:!ring-[#d11e33] focus:ring-1" required onChange={(e) => setCredential({ ...credential, password: e?.target?.value })} />
                                {
                                    showPassword ?
                                    <EyeOff className='absolute top-[32%] right-[3%] cursor-pointer hover:text-[#777777] text-[#d11e33]' onClick={() => passwordShowHideHandler()} /> :
                                    <Eye className='absolute top-[32%] right-[3%] cursor-pointer hover:text-[#d11e33] text-[#777777]' onClick={() => passwordShowHideHandler()} />
                                }
                            </div>
                            <div className="flex justify-between items-end">
                                <button type="submit" className=" text-sm transition-colors duration-500 hover:text-white border-2 border-[#d11e33] py-2 px-12 rounded-md hover:!bg-[#d11e33] !bg-white text-[#d11e33] me-4" onClick={(e) => loginHandler(e)}>
                                    Login
                                </button>
                                <p className="text-[#d11e33] cursor-pointer hover:text-[#191919] m-0">Lost your password?</p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
