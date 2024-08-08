import React from 'react'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import bag1 from "../../../../../public/bag1.webp"
import bag2 from "../../../../../public/bag2.webp"
import bag3 from "../../../../../public/bag3.webp"
import bag4 from "../../../../../public/bag4.webp"
import bag5 from "../../../../../public/bag5.webp"
import bag6 from "../../../../../public/bag6.webp"
import bag7 from "../../../../../public/bag7.webp"
import bag8 from "../../../../../public/bag8.webp"
import bagHover1 from "../../../../../public/bagg1.webp"
import bagHover2 from "../../../../../public/bagg2.webp"
import bagHover3 from "../../../../../public/bagg3.webp"
import bagHover4 from "../../../../../public/bagg4.webp"
import bagHover5 from "../../../../../public/bagg5.webp"
import bagHover6 from "../../../../../public/bagg6.webp"
import bagHover7 from "../../../../../public/bagg7.webp"
import bagHover8 from "../../../../../public/bagg8.webp"
import Card from '../../../Component/Card/Card'

const ourCollectionData = [
    {
        id: 1,
        title: "Fitpack Neo",
        category: "Bag",
        price: 1829,
        image: bag1,
        HoverImage: bagHover1,
        old_price: 2899,
        rating: 4,
        discount: "37%",
    },
    {
        id: 2,
        title: "Accelerator",
        category: "Bag",
        price: 1599,
        image: bag2,
        HoverImage: bagHover2,
        old_price: 2399,
        rating: 5,
        discount: "33%",
    },
    {
        id: 3,
        title: "Amigo Backpack",
        category: "Bag",
        price: 1899,
        image: bag3,
        HoverImage: bagHover3,
        old_price: 3299,
        rating: 4,
        discount: "42%",
    },
    {
        id: 4,
        title: "Amigo Backpack",
        category: "Bag",
        price: 1899,
        image: bag4,
        HoverImage: bagHover4,
        old_price: 3299,
        rating: 4,
        discount: "42%",
    },
    {
        id: 5,
        title: "Armor Dust / Rain Cover for Backpack",
        category: "Bag",
        price: 449,
        image: bag5,
        HoverImage: bagHover5,
        old_price: 499,
        rating: 5,
        discount: "10%",
    },
    {
        id: 6,
        title: "Amigo Backpack",
        category: "Bag",
        price: 1899,
        image: bag6,
        HoverImage: bagHover6,
        old_price: 3299,
        rating: 5,
        discount: "42%",
    },
    {
        id: 7,
        title: "Fitpack Neo",
        category: "Bag",
        price: 1899,
        image: bag7,
        HoverImage: bagHover7,
        old_price: 2899,
        rating: 5,
        discount: "37%",
    },
    {
        id: 8,
        title: "Caprio",
        category: "Bag",
        price: 999,
        image: bag8,
        HoverImage: bagHover8,
        old_price: 1999,
        rating: 5,
        discount: "50%",
    },
]

export default function OurCollection() {
    var settings = {
        dots: false,
        nav: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
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
        <div className='container my-2'>
            <h2 className='font-normal mb-4 hover:text-[#d11e33] cursor-pointer w-25'>OUR COLLECTIONS</h2>
            <div className="w-full h-fit">
                <Slider {...settings}>
                    {
                        ourCollectionData?.map((item, index) => (
                            <Card key={index} data={item} />
                        ))
                    }
                </Slider>
            </div>
        </div>
    )
}
