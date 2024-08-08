import React from 'react'
import { Button } from "flowbite-react"
import popular1 from "../../../../../public/popular1.webp"
import popular2 from "../../../../../public/popular2.webp"
import popular3 from "../../../../../public/popular3.webp"
import popular4 from "../../../../../public/popular4.webp"
import popular5 from "../../../../../public/popular5.webp"
import popular6 from "../../../../../public/popular6.webp"
import popular7 from "../../../../../public/popular7.webp"
import popular8 from "../../../../../public/popular8.webp"

let popularMenu = [
    {
        image: popular1,
        title: "Casual",
        shop: "Shop Now",
    },
    {
        image: popular2,
        title: "College",
        shop: "Shop Now",
    },
    {
        image: popular3,
        title: "School",
        shop: "Shop Now",
    },
    {
        image: popular4,
        title: "Professional",
        shop: "Shop Now",
    },
    {
        image: popular5,
        title: "Travel",
        shop: "Shop Now",
    },
    {
        image: popular6,
        title: "Sports",
        shop: "Shop Now",
    },
    {
        image: popular7,
        title: "Mask and Accessories",
        shop: "Shop Now",
    },
    {
        image: popular8,
        title: "Messenger",
        shop: "Shop Now",
    },
]

export default function Popular() {
    return (
        <>
            <div className='container mb-5'>
                <h2 className='font-normal'>POPULAR</h2>
                <div className='grid grid-cols-4'>
                    {
                        popularMenu?.map((popularMenu, index) => {
                            return (
                                <div key={index}>
                                    <div style={{ padding: "2.5rem 2.5rem 0 2.5rem" }}>
                                        <div className="overflow-hidden rounded-full">
                                            <img className='hover:scale-110 transition-all duration-700 rounded-full m-auto' src={popularMenu?.image} alt={popularMenu?.title} />
                                        </div>
                                    </div>
                                    <div className="text-center py-3">{popularMenu?.title}</div>
                                    <Button className="m-auto mt-4 text-white bg-red-600 hover:!bg-black">{popularMenu?.shop}</Button>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}
