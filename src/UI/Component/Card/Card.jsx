import { faEye, faHeart } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Rating } from "flowbite-react"
import React, { useState } from "react"
import { Bag } from "react-bootstrap-icons"
import PreviewData from "../../Pages/Admin/Product/PreviewData"

export default function Card({ data, addProduct }) {
    const [modal, setModal] = useState(false)
    const [previewData, setPreviewData] = useState({})

    const previewHandler = (data) => {
        setModal(true)
        setPreviewData(data)
    }

    let discountPrice = (data?.price * data?.discountPercentage) / 100

    return (
        <>
            <div className=" hover:h-40 group datas-center m-3">
                <div className="relative">
                    <img src={data?.thumbnail} alt={data?.title} className="w-full h-[100%] group-hover:!opacity-0 group-hover:!duration-700" />
                    <img src={data?.images?.[0]} alt={data?.title} className="absolute top-0 left-0 w-full h-[100%] group-hover:!opacity-100 transition-opacity !duration-700 opacity-0" />
                    <p className="bg-[#d11e33] absolute p-0.5 text-xs px-1 font-semibold top-2 left-2 rounded-sm text-white">Sale {data?.discountPercentage} %</p>
                    <div className=" opacity-0 group-hover:!opacity-100 duration-300 absolute top-0 m-2 right-0">
                        <div className=" bg-white hover:!bg-[#d11e33] hover:!border-[#d11e33] mb-2 hover:text-white border h-12 w-12 text-center rounded-full grid place-content-center cursor-pointer" onClick={() => previewHandler(data)}>
                            <FontAwesomeIcon icon={faEye} />
                        </div>
                        <div className="bg-white hover:!bg-[#d11e33] hover:!border-[#d11e33] hover:text-white border h-12 w-12 text-center rounded-full grid place-content-center">
                            <FontAwesomeIcon icon={faHeart} />
                        </div>
                    </div>
                </div>
                <div className="bg-white group-hover:-translate-y-12 transition-all duration-500 flex flex-col items-center">
                    <div className="flex items-center space-x-2 my-2 ">
                        <Rating>
                            {
                                [1, 2, 3, 4, 5].map((rating, index) => {
                                    return <Rating.Star key={index} filled={rating > data?.rating ? false : true} />
                                })
                            }
                        </Rating>
                    </div>
                    <h6 className="text-[#191919] font-normal hover:text-[#d11e33] cursor-pointer">{data?.title}</h6>
                    <div className="flex m-0 space-x-2">
                        <h6 className="text-[#d11e33] text-sm">Rs.₹ {data?.price - discountPrice?.toFixed(0)}.00 </h6>
                        <h6 className="text-[#191919] text-sm line-through">
                            Rs.{data?.price}.00
                        </h6>
                    </div>
                    <button onClick={() => addProduct(data?._id)} className="bg-[#d11e33] text-white rounded-md py-2 px-4 hidden group-hover:block hover:bg-white hover:border-2 hover:border-[#d11e33] hover:!text-[#d11e33]">
                        <div className="flex items-center gap-2">
                            <div><Bag /></div>
                            <div>ADD TO CART</div>
                        </div>
                    </button>
                </div>
            </div>
            <PreviewData setModal={setModal} modal={modal} previewData={previewData} />
        </>
    )
}
