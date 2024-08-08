import React from "react"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"

export default function Profile() {
    let [cookie, setCookie, removeCookie] = useCookies([])
    const navigate = useNavigate()

    // logout handler
    const logoutHandler = () => {
        removeCookie("token")
        removeCookie("user")
        navigate("/")
        window.scrollTo(0, 0)
    }

    return (
        <div className="ml-36 mr-36">
            <h1 className="text-center mb-14 text-4xl font-semibold mt-3">ACCOUNT</h1>
            <h3 className="font-semibold text-xl mb-9">ACCOUNT DETAILS</h3>
            <div>
                <ul>
                    <li className="py-3 border-b-2">
                        Name : {cookie?.user?.name || "Admin"}
                    </li>
                    <li className="py-3 border-b-2">Email : {cookie.user.email} </li>
                    <li className="py-3 border-b-2">User Type : {cookie.user.userType} </li>
                    {
                        cookie?.user?.userType !== "admin" &&
                        <>
                            <li className="py-3 border-b-2">
                                ADDRESS : {cookie?.user?.address?.[0]?.add}
                            </li>
                            <li className="py-3 border-b-2">COUNTRY: India</li>
                            <li className="py-3 border-b-2">
                                ZIP: {cookie?.user?.address?.[0]?.pinCode}
                            </li>
                            <li className="py-3 mb-5 border-b-2">
                                PHONE: {cookie?.user?.number}
                            </li>
                        </>
                    }
                </ul>
                <button className="p-2 mt-4 rounded-md !border-2 font-semibold !border-[#d11e33] text-[#d11e33] hover:text-white hover:bg-[#d11e33]" onClick={() => logoutHandler()}>LOGOUT</button>
            </div>
        </div>
    )
}
