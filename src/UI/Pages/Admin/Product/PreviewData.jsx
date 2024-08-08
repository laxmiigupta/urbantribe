import { Modal } from "flowbite-react"

export default function PreviewData({ modal, setModal, previewData }) {
    let discountPrice = (previewData?.price * previewData?.discountPercentage) / 100

    const formattedPrice = (price) => {
        return price?.toLocaleString('en-IN')
    }

    return (
        <>
            <Modal show={modal} size="5xl" onClose={() => setModal(false)} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="flex">
                        <div className="w-[50%] mr-3">
                            <img src={previewData?.thumbnail} className="h-full rounded-md " alt="" />
                        </div>
                        <div className="w-[70%] text-start pl-3 text-[#191919] [&_p]:m-0 ps-[39px]">
                            <p>SKU: <span className="text-[#999999]">{previewData?._id}</span> </p>
                            <p>Availability: <span className="text-[#999999]">{previewData?.availableStock} In Stock</span> </p>
                            <h1 className="text-2xl mt-4">{previewData?.title}</h1>
                            <div className="text-3xl flex gap-3 items-center font-semibold">
                                <span className="text-[#f8353e]">RS. {formattedPrice(previewData?.price - discountPrice.toFixed(0))}.00</span>
                                <span className="line-through">RS. {formattedPrice(previewData?.price)}.00</span>
                            </div>
                            <p className="text-[#999999] mt-5">{previewData?.description}</p>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
