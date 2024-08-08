import React from 'react'
import bgImage from '../../../../../public/bg.webp'
import fitPack from '../../../../../public/fitpack.webp'
import rumble from '../../../../../public/rumble.webp'
import { Clock3, HelpingHand, RefreshCcw } from 'lucide-react'
import Popular from './Popular'
import OurCollection from './OurCollection'
import BestSeller from './BestSeller'

export default function Home() {
    return (
        <>
            {/* slider section */}
            <div className='relative flex justify-center'>
                <img src={bgImage} alt="" />
                <button className=" mb-3 px-[40px] absolute bottom-0 py-[10px] bg-red-700 rounded-3xl text-white hover:!text-red-700 hover:bg-white">Shop Now</button>
            </div>

            {/* fitpack-rumble section */}
            <div className='flex justify-center container gap-4 py-5'>
                <div className='overflow-hidden'>
                    <img src={fitPack} alt="FitPack" className='hover:scale-110 transition-all duration-700' />
                </div>
                <div className='overflow-hidden'>
                    <img src={rumble} alt="Rumble" className='hover:scale-110 transition-all duration-700' />
                </div>
            </div>

            {/*Our collection section */}
            <OurCollection />

            {/*icons section */}
            <div className='bg-[#d11e33] text-white pt-[80px] pb-[80px]'>
                <div className="container">
                    <div className="flex justify-around text-center [&>*]:cursor-pointer">
                        <div className="flex flex-col items-center">
                            <RefreshCcw size={40} className='mb-4' />Hassle Free Returns
                        </div>
                        <div className="flex flex-col items-center">
                            <HelpingHand size={40} className='mb-4' />Cash On Delivery
                        </div>
                        <div className="flex flex-col items-center">
                            <Clock3 size={40} className='mb-4' />12 Months Warranty
                        </div>
                    </div>
                </div>
            </div>

            {/*best seller section */}
            <BestSeller/>

            {/*popular section */}
            <Popular />

            {/* HomeGrown Indian Brand*/}
            <div className='bg-[#d11e33] text-white pt-[80px] pb-[80px]'>
                <div className="container">
                    <div className='flex justify-center mb-12'>
                        <h2>HOMEGROWN INDIAN BRAND</h2>
                    </div>
                    <div className="flex justify-around text-center [&>*]:cursor-pointer">
                        <div className="group/item flex flex-col items-center">
                            <span className='group-hover/item:text-black mb-2'>1M+</span>Happy Customer
                        </div>
                        <div className="group/item flex flex-col items-center">
                            <span className='group-hover/item:text-black mb-2'>500k+</span>Website Visitors every month
                        </div>
                        <div className="group/item flex flex-col items-center">
                            <span className='group-hover/item:text-black mb-2'>100+</span>Hyperfunctional designsS
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
