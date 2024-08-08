import axios from "axios"
import { Dropdown, Label, Pagination, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, TextInput } from "flowbite-react"
import { useEffect, useState } from "react"
import PreviewData from "./PreviewData"
import { toast } from "react-toastify"
import { Search } from "lucide-react"

const img = "https://marketplace.canva.com/EAFijA-Es8I/1/0/1600w/canva-beige-minimalist-stay-tuned-coming-soon-instagram-post-iv_vQnhdRkY.jpg"

const sizeOptions = ["S", "M", "L", "XL"]

export default function ProductTable({ refetch, isRefresh, setUpdatedData, toggle }) {
    const [data, setdata] = useState([])
    const [modal, setModal] = useState(false)
    const [previewData, setPreviewData] = useState({})
    const [search, setSearch] = useState("")
    const [paginate, setPaginate] = useState({
        totalProduct: 0,
        page: 0,
        limit: 10,
    })
    let id
    const onPageChange = (page) => {
        clearTimeout(id)
        id = setTimeout(() => {
            setPaginate({ ...paginate, page: page - 1})
        }, 200)
    }

    const getSearchInput = (e) => {
        setSearch(e?.target?.value)
        setPaginate({ ...paginate, page: 0, limit: 10 })
    }

    useEffect(() => {
        axios({
            method: "get",
            url: "http://localhost:9999/product/getAllPaginate",
            params: {
                page: paginate.page || 0,
                limit: paginate.limit,
                search: search,
            },
        })?.then((res) => {
            setdata(res?.data?.data)
            setPaginate({ ...paginate, totalProduct: res?.data?.count })
        })?.catch((err) => {
            console.log("-----------err----------->", err)
        })
    }, [isRefresh, paginate.page, paginate.limit, search])

    const deleteHandler = (id) => {
        axios({
            method: "delete",
            url: "http://localhost:9999/product/delete/" + id,
        })?.then((res) => {
            toast.success("Product deleted..")
            refetch()
        })?.catch((err) => {
            toast.error("Somthing went wrong..")
        })
    }

    const updateHandler = (product) => {
        toggle()
        setUpdatedData(product)
    }

    const previewHandler = (data) => {
        setModal(true)
        setPreviewData(data)
    }


    return (
        <div className="m-10">
            <div className="flex justify-between mb-4 items-center">
                <Dropdown color={"white"} outline={true} label={`${paginate?.limit}`} className="border hover:!bg-gray-400 [&_ul]:p-0" placement="bottom">
                    {
                        [10, 20, 50, 100]?.map?.((e, i) => {
                            return (
                                <Dropdown.Item onClick={() => setPaginate({ ...paginate, limit: e })}> {e} </Dropdown.Item>
                            )
                        })
                    }
                </Dropdown>
                <div className="flex items-center">
                    <TextInput onChange={(e) => getSearchInput(e)} type="email" value={search} placeholder="Search your text hear..." className="w-1/3 input-group" style={{ boxShadow: "none", border: "1px solid #dee2e6", borderTopRightRadius: "0%", borderBottomRightRadius: "0%" }} required />
                    <Label className='input-group-text m-0 py-2' style={{ borderTopLeftRadius: "0%", borderBottomLeftRadius: "0%", border: "1px solid #dee2e6" }}>
                        <Search className="text-[#b2c1d1]" />
                    </Label>
                </div>
            </div>
            <PreviewData setModal={setModal} modal={modal} previewData={previewData} />
            <Table striped>
                <TableHead className="[&_*]:!bg-slate-300">
                    <TableHeadCell>Sr.No.</TableHeadCell>
                    <TableHeadCell>Image</TableHeadCell>
                    <TableHeadCell>Title</TableHeadCell>
                    <TableHeadCell>price</TableHeadCell>
                    <TableHeadCell>Color</TableHeadCell>
                    <TableHeadCell>Size</TableHeadCell>
                    <TableHeadCell>Action</TableHeadCell>
                    <TableHeadCell>
                        <span className="sr-only">Edit</span>
                    </TableHeadCell>
                </TableHead>
                <TableBody className="divide-y">
                    {
                        data?.map((product, index) => {
                            if (product?.userType === "admin") return
                            return (
                                <TableRow key={product?._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <TableCell>{index + 1 + paginate?.page * 10}</TableCell>
                                    <TableCell>
                                        <img
                                            className="h-[70px]"
                                            src={product?.thumbnail || img}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = img;
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>{product?.title}</TableCell>
                                    <TableCell>
                                        <div className="bordering flex gap-1">
                                            <span className="fw-bold">Price:- </span>
                                            <div className="text-black font-bold">
                                                ₹ {product?.price}
                                            </div>
                                        </div>
                                        <div className="bordering flex gap-1">
                                            <span className="fw-bold">Discount:- </span>
                                            <div className="text-red-500 font-bold">
                                                {product?.discountPercentage || 0} %
                                            </div>
                                        </div>

                                        <div className="bordering flex gap-1">
                                            <span className="fw-bold">FinalPrice:- </span>
                                            <div className="text-green-500 font-bold">
                                                ₹{product?.price - ((product?.price * product?.discountPercentage) / 100).toFixed(0)}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex">
                                            {
                                                product?.color?.map((color, index) => {
                                                    return (
                                                        <div key={index} className="mr-1 rounded-xl w-[15px] h-[15px] border border-black" style={{ background: color }}></div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex">
                                            {
                                                sizeOptions?.map((size, index) => {
                                                    let include = product?.size?.includes(size)
                                                    return (
                                                        <div key={index}
                                                            style={{
                                                                color: include ? "black" : "gray",
                                                                border: include ? "1.5px solid black" : "1.5px solid gray"
                                                            }}
                                                            className="relative w-[25px] h-[25px] rounded-full grid place-content-center mr-1">
                                                            {size}
                                                            {
                                                                !include && (
                                                                    <hr className="absolute top-[45%] rotate-[40deg] !m-0 w-full !border-2 !border-gray-500" />
                                                                )
                                                            }
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-3 [&_p]:cursor-pointer [&_p]:m-0">
                                            <p className="underline text-green-500" onClick={() => previewHandler(product)}>Preview</p>
                                            <p className="underline text-blue-800" onClick={() => updateHandler(product)}>Edit</p>
                                            <p className="underline text-red-500" onClick={() => deleteHandler(product?._id)}>Delete</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
            <Pagination className="flex justify-end" currentPage={paginate?.page + 1} totalPages={Math.ceil(paginate?.totalProduct / paginate?.limit) || 10} onPageChange={onPageChange} showIcons />
        </div>
    )
}
