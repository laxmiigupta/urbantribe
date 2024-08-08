import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchCart } from '../../../../Redux/Fetures/Cart/Cart'
import { useCookies } from 'react-cookie'
import { API } from '../../../Api/axiosConfig'
import { toast } from 'react-toastify'
import { Button } from 'flowbite-react'
import { Bag } from 'react-bootstrap-icons'

export default function Cart() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    let [cookies] = useCookies()
    const { cartData, cartId } = useSelector((store) => store?.cartSlice)
    const [subtotal, setSubtotal] = useState(0)

    useEffect(() => {
        dispatch(fetchCart(cookies?.token))
        // Calculate subtotal whenever cartData changes
        if (cartData && cartData?.length > 0) {
            const calculatedSubtotal = cartData?.reduce((total, cartItem) => {
                const itemPrice = cartItem?.productId?.price || 0
                const itemQuantity = cartItem?.count || 0
                return total + itemPrice * itemQuantity
            }, 0)
            setSubtotal(calculatedSubtotal)
        } else {
            setSubtotal(0)
        }
    }, [cartData])

    // Add Product to Cart
    const addProduct = async (productId) => {
        if (!cookies?.token) return navigate("/signin")
        try {
            let { data } = await API?.post("/cart/create/" + productId, null, {
                headers: {
                    Authorization: "Bearer " + cookies.token,
                },
            })
            toast.success("Product Added To Cart")
            dispatch(fetchCart(cookies?.token))
        } catch (error) {
            console.log("-----------error-------------->", error)
            toast.error("Failed to add product to cart")
        }
    }

    // Remove Product to Cart
    const removeProduct = async (productId, count) => {
        let isRemove = false
        if (count === 1) isRemove = true
        if (!cookies?.token) return navigate("/signin")
        try {
            let { data } = await API?.put(`/cart/update/`, { _id: cartId, productId: productId, isRemove: isRemove }, {
                headers: {
                    Authorization: "Bearer " + cookies.token,
                },
            })
            toast.success("Product Removed From Cart")
            dispatch(fetchCart(cookies?.token))
        } catch (error) {
            console.log("-----------error-------------->", error)
            toast.error("Failed to remove product from cart")
        }
    }

    // Remove Product to All Cart
    const removeProductCart = async (productId) => {
        if (!cookies?.token) return navigate("/signin")
        try {
            let { data } = await API?.put(`/cart/update/`, { _id: cartId, productId: productId, isRemove: true }, {
                headers: {
                    Authorization: "Bearer " + cookies.token,
                },
            })
            toast.success("Product Removed From Cart")
            dispatch(fetchCart(cookies?.token))
        } catch (error) {
            console.log("-----------error-------------->", error)
            toast.error("Failed to remove product from cart")
        }
    }

    const clearCart = async () => {
        if (!cookies?.token) return navigate("/signin")
        try {
            let { data } = await API?.delete(`/cart/delete/` + cartId, {
                headers: {
                    Authorization: "Bearer " + cookies.token,
                },
            })
            toast.success("Cart Cleared Successfully")
            dispatch(fetchCart(cookies?.token))
        } catch (error) {
            console.log("-----------error-------------->", error)
            toast.error("Failed to clear cart")
        }
    }

    return (
        <>
            <div className="bg-gray-100 pt-20 pb-5">
                {
                    cartData?.length > 0 ?
                    <>
                        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
                        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                            <div className="rounded-lg md:w-2/3">
                                {
                                    cartData?.map((cart) => {
                                        return (
                                            <div key={cart?._id} className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                                                <img src={cart?.productId?.thumbnail} alt="product-image" className="w-full rounded-lg sm:w-40" />
                                                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                                    <div className="mt-5 sm:mt-0">
                                                        <h2 className="text-lg font-bold text-gray-900">{cart?.productId?.title}</h2>
                                                        <p className="mt-1 text-xs text-gray-700">$ {cart?.productId?.price}</p>
                                                    </div>
                                                    <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                                                        <div className="flex items-center border-gray-100">
                                                            <span onClick={() => removeProduct(cart?.productId?._id, cart?.count)} className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> - </span>
                                                            <p className="h-8 w-8 border m-0 bg-white text-center text-xs outline-none" type="number" value="2" min="1">{cart?.count}</p>
                                                            <span onClick={() => addProduct(cart?.productId?._id)} className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </span>
                                                        </div>
                                                        <div className="flex items-center space-x-4">
                                                            <p className="text-sm m-0">$ {cart?.count * cart?.productId?.price}</p>
                                                            <svg onClick={()=>removeProductCart(cart?.productId?._id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                            {/* Sub total */}
                            <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                                <div className="mb-2 flex justify-between">
                                    <p className="text-gray-700">Subtotal</p>
                                    <p className="text-gray-700">$ {subtotal.toFixed(2)}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-gray-700">Shipping</p>
                                    <p className="text-gray-700">$ 4.99</p>
                                </div>
                                <hr className="my-4" />
                                <div className="flex justify-between">
                                    <p className="text-lg font-bold">Total</p>
                                    <div className="">
                                        <p className="mb-1 text-lg font-bold">$ {(subtotal + 4.99).toFixed(2)}</p>
                                    </div>
                                </div>
                                <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
                                    Check out
                                </button>
                                <button onClick={()=>clearCart()} className="mt-3 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
                                    Clear Cart
                                </button>
                            </div>
                        </div> 
                    </>:
                    <div className='text-center'>
                        <Bag className='m-auto text-9xl text-[#ebecee] mb-4' />
                        <h1 className='text-[#191919]'>SHOPPING CART IS EMPTY</h1>
                        <p className='text-[#777777]'>You have no items in your shopping cart.</p>
                        <Button className='m-auto focus:ring-0 mt-4 bg-[#d11e33] text-white hover:!text-[#d11e33] hover:!bg-transparent hover:!border-[#d11e33]' onClick={()=>navigate("/product/all")}>CONTINUE SHOPPING</Button>
                    </div>
                }
            </div>
        </>
    )
}
