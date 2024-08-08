import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import logo from '../../../../public/logo.avif'
import { Tooltip } from 'flowbite-react'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { Bag } from 'react-bootstrap-icons'
import { User } from 'lucide-react'
import { useCookies } from 'react-cookie'
import { NavItem } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { refetch } from '../../../Redux/Fetures/Cart/Cart'

// customer site
const menuItem = [
    { label: "Track Order", redirect: "" },
    { label: "All Products", redirect: "/product/all" },
    { label: "Casual Backpacks", redirect: "/product/causal" },
    { label: "Professional", redirect: "/product/professional" },
    { label: "Travel", redirect: "/product/travel" },
    { label: "Sports", redirect: "/product/sports" },
    { label: "School Bags", redirect: "/product/school" },
    { label: "Corporate gifting", redirect: "" },
    { label: "Best Offer", redirect: "" },
    { label: "Lunch Bags", redirect: "/product/lunchBag" },
    { label: "Blogs", redirect: "" },
    { label: "Contact Us", redirect: "" },
]

// admin site
const adminMenuItems = [
    { label: 'Dashboard', link: '/admin-dashboard' },
    { label: 'Product', link: '/admin-product' },
    { label: 'User', link: '/admin-user' },
    { label: 'Order', link: '/admin-order' },
]

export default function Header() {
    const navigate = useNavigate()
    const [cookies] = useCookies(["token"])
    const dispatch = useDispatch()

    const { cartData, isRefresh } = useSelector((store)=> store.cartSlice)

    useEffect(()=>{
        dispatch(refetch())
    }, [isRefresh])

    return (
        <>
            {
                cookies?.user?.userType !== "admin" &&
                <div>
                    <p className='text-center py-1 text-sm text-white bg-[#d11e33] m-0'>
                        <marquee>
                            Get Rs 100 Off on Prepaid Orders | Free Shipping All Over India
                        </marquee>
                    </p>

                    <div className='bg-[#f7f8fa] border-b border-gray-200 flex px-2 py-2 justify-around text-[#777777]'>
                        <ul className='flex gap-3 text-sm py-2 m-0 p-0 items-center'>
                            {
                                menuItem?.map((menuItem, index) => {
                                    return (
                                        <li key={index}>
                                            <NavLink to={menuItem?.redirect} className="text-decoration-none text-black hover:!text-[#d11e33]">
                                                {menuItem?.label}
                                            </NavLink>
                                        </li>
                                    )
                                })
                            }
                        </ul>

                        <div className='border border-gray-400 rounded-md flex justify-center items-center pl-3 pr-1 bg-white'>
                            <FontAwesomeIcon icon={faSearch} className='text-gray-400 cursor-pointer' />
                            <input placeholder='SEARCH PRODUCTS...' className='border-none shadow-none focus:outline-none ps-2 py-1' />
                        </div>
                    </div>
                </div>
            }

            <div className="border-b border-gray-200 flex items-center justify-between px-8 py-2">
                <div className='cursor-pointer pb-2' onClick={() => navigate("/")}>
                    <img src={logo} alt="" />
                </div>
                {
                    cookies?.user?.userType === "admin" &&
                    <ul className='flex items-center gap-5 [*_&]:mx-3 [&_a]:!no-underline m-0 p-0 [&_a]:text-[#191919] w-[37%]'>
                        {
                            // Admin menu items
                            adminMenuItems?.map((menuItem, index) => (
                                <NavItem key={index}>
                                    <NavLink to={menuItem?.link} className='hover:!text-[#d11e33] font-semibold'>
                                        {menuItem?.label}
                                    </NavLink>
                                </NavItem>
                            ))
                        }
                    </ul>
                }

                <div className='flex gap-6 items-center'>
                    {
                        cookies?.token ?
                            <div>
                                <User className='text-[#d11e33]' role='button' onClick={() => navigate("/profile")} />
                            </div> :
                            <p className='text-[#d11e33] m-0 flex gap-1 text-sm'>
                                <span className='hover:text-black cursor-pointer' onClick={() => navigate("/signin")}>Sign In</span>
                                <span className='text-gray-300'>or</span>
                                <span className='hover:text-black cursor-pointer' onClick={() => navigate("/signup")}>Register</span>
                            </p>
                    }

                    {
                        cookies?.user?.userType !== "admin" &&
                        <>
                            <Tooltip content="Wishlist" placement='bottom' style='light' animation="duration-500">
                                <NavLink className="text-decoration-none group/item">
                                    <div className='flex items-center'>
                                        <FontAwesomeIcon icon={faHeart} className='text-2xl pr-2.5 text-[#d11e33] group-hover/item:!text-black' />
                                        <span className='text-black'>WISHLIST</span>
                                    </div>
                                </NavLink>
                            </Tooltip>

                            <Tooltip content="Cart" placement='bottom' style='light' animation="duration-500">
                                <NavLink to={"/addToCart"} className="text-decoration-none group/item">
                                    <div className='flex items-center relative'>
                                        <Bag className='text-4xl pr-2.5 text-[#d11e33] group-hover/item:!text-black' />
                                        <span className='text-black'>MY CART</span>
                                        <span className='absolute top-0 left-4 text-white bg-[#d11e33] rounded-full grid place-content-center text-[13px] h-[20px] w-[20px]'>
                                            {cartData?.length || 0}
                                        </span>
                                    </div>
                                </NavLink>
                            </Tooltip>
                        </>
                    }
                </div>
            </div>
        </>
    )
}