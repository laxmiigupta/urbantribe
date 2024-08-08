import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BE_URL } from '../../../../Config'
import { toast } from 'react-toastify'
import { useCookies } from 'react-cookie'

const genderOptions = ["male", "female"]

const initialUser = {
    name: "",
    email: "",
    number: "",
    password: "",
    conPassword: "",
    gender: "",
    age: "",
}

const initialAddress = {
    add: "",
    city: "",
    state: "",
    pinCode: "",
}

export default function SignUp() {
    let [user, setUser] = useState(initialUser)
    let [address, setAddress] = useState(initialAddress)
    
    // cookies
    const [cookies, setCookie, removeCookie] = useCookies([])

    // navigation
    const navigate = useNavigate()

    // register handler
    const registerHandler = async (e) => {
        e?.preventDefault()
        if (user?.password !== user?.conPassword) {
            toast.error("Confirm password not match")
            setUser({ ...user, conPassword: "" })
        } else {
            let mainData = { ...user, address: [address] }
            try {
                let response = await axios({
                    method: "post",
                    url: BE_URL + "/user/signup",
                    data: mainData,
                })
                if (response) {
                    setCookie("user", response?.data?.data)
                    setCookie("token", response?.data?.token)
                }
                navigate("/")
                window.scrollTo(0, 0)
            } catch (error) {
                toast.error(error?.message)
            }
        }
    }

    return (
        <>
            <div className='py-8 flex items-center flex-col'>
                <h1 className='font-medium text-3xl mb-12 text-[#191919]'>CREATE AN ACCOUNT</h1>
                <div className='[&_input]:rounded-md [&_label]:font-semibold flex flex-col items-start border w-[50%] px-8 text-sm py-9'>
                    <h3 className='font-medium text-xl mb-4'>PERSONAL INFORMATION</h3>
                    <form action="#" autoComplete='off'>
                        <label htmlFor="name" className='w-[100%] flex justify-between text-[#191919]'>
                            <span>Name *</span>{" "}
                            <span className='text-[#777777]'>* Required Fields</span>
                        </label>
                        <input type="text" id='name' value={user?.name} placeholder='Enter Your Name' className="mb-3 mt-2 w-full border-none bg-[#f7f8fa] focus:!ring-[#d11e33] focus:ring-1" required onChange={(e) => setUser({ ...user, name: e?.target?.value })} />
                        <label htmlFor="email">Email *</label>
                        <input type="email" id='email' value={user?.email} placeholder='Enter Your Email' className="mb-3 mt-2 w-full border-none bg-[#f7f8fa] focus:!ring-[#d11e33] focus:ring-1" required onChange={(e) => setUser({ ...user, email: e?.target?.value })} />
                        <label htmlFor="number">Number *</label>
                        <input type="text" id='number' value={user?.number} placeholder='Enter Your Number' className="mb-3 mt-2 w-full border-none bg-[#f7f8fa] focus:!ring-[#d11e33] focus:ring-1" required onChange={(e) => setUser({ ...user, number: e?.target?.value })} maxLength='10' minLength='2' />
                        <label htmlFor="age">Age *</label>
                        <input type="text" id='age' value={user?.age} placeholder='Enter Your Number' className="mb-3 mt-2 w-full border-none bg-[#f7f8fa] focus:!ring-[#d11e33] focus:ring-1" required onChange={(e) => setUser({ ...user, age: e?.target?.value })} />
                        <label htmlFor="gender">Gender *</label>
                        <div className='flex gap-4 mb-3 mt-1'>
                            {
                                genderOptions?.map((gender, index) => {
                                    return (
                                        <div key={index}>
                                            <input type="radio" id='gender' value={user?.gender} checked={user?.gender === gender} name='radio1' className="focus:ring-0 mr-2" required onChange={() => setUser({ ...user, gender: gender })} />
                                            <label htmlFor="gender">{gender}</label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <label htmlFor="add">Address-1 *</label>
                        <input type="text" id='add' value={address?.add} placeholder='Enter Your Number' className="mb-3 mt-2 w-full border-none bg-[#f7f8fa] focus:!ring-[#d11e33] focus:ring-1" required onChange={(e) => setAddress({ ...address, add: e?.target?.value })} />
                        <label htmlFor="city">City *</label>
                        <input type="text" id='city' value={address?.city} placeholder='Enter Your Number' className="mb-3 mt-2 w-full border-none bg-[#f7f8fa] focus:!ring-[#d11e33] focus:ring-1" required onChange={(e) => setAddress({ ...address, city: e?.target?.value })} />
                        <label htmlFor="state">State *</label>
                        <input type="text" id='state' value={address?.state} placeholder='Enter Your Number' className="mb-3 mt-2 w-full border-none bg-[#f7f8fa] focus:!ring-[#d11e33] focus:ring-1" required onChange={(e) => setAddress({ ...address, state: e?.target?.value })} />
                        <label htmlFor="pincode">Pincode *</label>
                        <input type="text" id='pincode' value={address?.pinCode} placeholder='Enter Your Number' className="mb-3 mt-2 w-full border-none bg-[#f7f8fa] focus:!ring-[#d11e33] focus:ring-1" required onChange={(e) => setAddress({ ...address, pinCode: e?.target?.value })} />
                        <label htmlFor="password">Password *</label>
                        <input type="password" id='password' value={user?.password} placeholder='Enter Your Number' className="mb-3 mt-2 w-full border-none bg-[#f7f8fa] focus:!ring-[#d11e33] focus:ring-1" required onChange={(e) => setUser({ ...user, password: e?.target?.value })} />
                        <label htmlFor="conPassword">Confirm Password *</label>
                        <input type="password" id='conPassword' value={user?.conPassword} placeholder='Enter Your Number' className="mb-3 mt-2 w-full border-none bg-[#f7f8fa] focus:!ring-[#d11e33] focus:ring-1" required onChange={(e) => setUser({ ...user, conPassword: e?.target?.value })} />
                        <div>
                            <button className="mt-4 ring-2 ring-red-600 px-6 py-2 rou text-red-600 hover:bg-red-600 hover:text-white rounded-md" onClick={(e) => registerHandler(e)}>
                                CREATE
                            </button>
                            <span className='text-[#777777] ms-7'>or</span>
                            <span className='text-[#d11e33] hover:text-[#191919] cursor-pointer ps-1' onClick={() => navigate("/")}>Return to Store</span>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
