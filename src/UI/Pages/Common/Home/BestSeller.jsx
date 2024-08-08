import React from 'react'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import best1 from "../../../../../public/best1.webp"
import best2 from "../../../../../public/best2.webp"
import best3 from "../../../../../public/best3.webp"
import best4 from "../../../../../public/best4.webp"
import best5 from "../../../../../public/best5.webp"
import best6 from "../../../../../public/best6.webp"
import bestHover1 from "../../../../../public/bestt1.webp"
import bestHover2 from "../../../../../public/bestt2.webp"
import bestHover3 from "../../../../../public/bestt3.webp"
import bestHover4 from "../../../../../public/bestt4.webp"
import bestHover5 from "../../../../../public/bestt5.webp"
import bestHover6 from "../../../../../public/bestt6.webp"
import Card from '../../../Component/Card/Card'

const bestSellerData = [
    {
        id: 1,
        title: "Accelerator",
        category: "Bag",
        price: 1599,
        image: best1,
        HoverImage: bestHover1,
        old_price: 2399,
        rating: 4,
        discount: "33%",
    },
    {
        id: 2,
        title: "Amigo Backpack",
        category: "Bag",
        price: 1899,
        image: best2,
        HoverImage: bestHover2,
        old_price: 3299,
        rating: 5,
        discount: "42%",
    },
    {
        id: 3,
        title: "Fitpack Neo",
        category: "Bag",
        price: 1829,
        image: best3,
        HoverImage: bestHover3,
        old_price: 2899,
        rating: 4,
        discount: "37%",
    },
    {
        id: 4,
        title: "Fitpack Pro",
        category: "Bag",
        price: 3499,
        image: best4,
        HoverImage: bestHover4,
        old_price: 2399,
        rating: 4,
        discount: "31%",
    },
    {
        id: 5,
        title: "Havana",
        category: "Bag",
        price: 999,
        image: best5,
        HoverImage: bestHover5,
        old_price: 1999,
        rating: 5,
        discount: "50%",
    },
    {
        id: 6,
        title: "Rumble",
        category: "Bag",
        price: 2399,
        image: best6,
        HoverImage: bestHover6,
        old_price: 3999,
        rating: 5,
        discount: "40%",
    },
]

export default function BestSeller() {
    var settings = {
        dots: false,
        nav: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    }

    return (
        <div className='container'>
            <h2 className='font-normal my-4 hover:text-[#d11e33] cursor-pointer w-25'>BEST SELLER</h2>
            <div className="w-full h-fit">
                <Slider {...settings}>
                    {
                        bestSellerData?.map((item, index) => (
                            <Card key={index} data={item} />
                        ))
                    }
                </Slider>
            </div>
        </div>
    )
}
