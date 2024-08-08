import { faFacebookF, faInstagram, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Footer, FooterLinkGroup, FooterTitle, Tooltip } from "flowbite-react"
import { NavLink } from "react-router-dom"
import { Input } from "reactstrap"

export default function Footers() {
    return (
        <>
            <Footer className="bg-[#f7f8fa] mt-10 py-[50px]">
                <div className="grid grid-cols-3 justify-items-center w-full">
                    <div>
                        <FooterTitle className="text-[#d11e33] text-sm" title="Customer Service" />
                        <FooterLinkGroup className="p-0 flex-column gap-2">
                            <NavLink className="no-underline text-[#5f5d5d] hover:text-[#d11e33] hover:!underline">Sign In</NavLink>
                            <NavLink className="no-underline text-[#5f5d5d] hover:text-[#d11e33] hover:!underline">View Cart</NavLink>
                            <NavLink className="no-underline text-[#5f5d5d] hover:text-[#d11e33] hover:!underline">Help</NavLink>
                        </FooterLinkGroup>
                    </div>

                    <div>
                        <FooterTitle className="text-[#d11e33] text-sm" title="Contact Us" />
                        <FooterLinkGroup className="p-0">
                            <p className="w-72">
                                <span className="text-black font-bold">Address: </span>
                                Urban Tribe, Backpack International Pvt LTD, B-8, Pravasi Industrial Estate, Goregaon East, Mumbai- 400101

                                <div className="my-2">
                                    <span className="text-black font-bold">Phone: </span>+91 9769487901
                                </div>
                                <span className="text-black font-bold">Hours: </span>5 Days a week from 10:00 am to 7.00 pm

                                <div className="my-2 text-[#d11e33] hover:text-[#5f5d5d] cursor-pointer">
                                    <span className="text-black font-bold">E-mail: </span>support@urbantribe.in
                                </div>
                            </p>
                        </FooterLinkGroup>
                    </div>

                    <div>
                        <FooterTitle className="text-[#d11e33] text-sm" title="New Sletter SignUp" />
                        <FooterLinkGroup className="p-0">
                            <p className="w-80">
                                Subscribe to our email and be the first to know about our special offers! In addition, we will give you a 15% discount on the next order after registration.
                                <div className="my-4 input-group">
                                    <Input placeholder="Enter your e-mail" className="focus:!ring-0 focus:!border-[#d11e33] m-0 hover:!border-[#d11e33]" />
                                    <Button className="text-white !bg-[#d11e33] hover:!bg-black input-group-text focus:ring-0">
                                        GET!
                                    </Button>
                                </div>
                                <div className="flex gap-4">
                                    <Tooltip content="Facebook" placement='bottom' style='light' animation="duration-500">
                                        <FontAwesomeIcon icon={faFacebookF} className='cursor-pointer text-black hover:!text-[#d11e33]' />
                                    </Tooltip>
                                    <Tooltip content="Twitter" placement='bottom' style='light' animation="duration-500">
                                        <FontAwesomeIcon icon={faTwitter} className='cursor-pointer text-black hover:!text-[#d11e33]' />
                                    </Tooltip>
                                    <Tooltip content="Instagram" placement='bottom' style='light' animation="duration-500">
                                        <FontAwesomeIcon icon={faInstagram} className='cursor-pointer text-black hover:!text-[#d11e33]' />
                                    </Tooltip>
                                    <Tooltip content="Youtube" placement='bottom' style='light' animation="duration-500">
                                        <FontAwesomeIcon icon={faYoutube} className='cursor-pointer text-black hover:!text-[#d11e33]' />
                                    </Tooltip>
                                </div>
                            </p>
                        </FooterLinkGroup>
                    </div>
                </div>
            </Footer>

            <div className="bg-[#d11e33] w-full">
                <div className="container">
                    <p className="py-[20px] text-sm m-0 text-white">
                        © UrbanTribe 2022. All Rights Reserved
                    </p>
                </div>
            </div>
        </>
    )
}
