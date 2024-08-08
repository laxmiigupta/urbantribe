import axios from "axios"
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react"
import { useEffect, useState } from "react"

export default function User() {
    const [user, setUser] = useState([])

    useEffect(() => {
        axios({
            method: "get",
            url: "http://localhost:9999/user/getAll",
        })?.then((res) => {
            setUser(res?.data?.data)
        })?.catch((err) => {
            console.log("-----------err----------->", err)
        })
    }, [])


    return (
        <div className="m-10">
            <Table striped>
                <TableHead className="[&_*]:!bg-slate-300">
                    <TableHeadCell>Sr.No.</TableHeadCell>
                    <TableHeadCell>Name</TableHeadCell>
                    <TableHeadCell>Email</TableHeadCell>
                    <TableHeadCell>City</TableHeadCell>
                    <TableHeadCell>Mobile</TableHeadCell>
                </TableHead>
                <TableBody className="divide-y">
                    {
                        user?.map((user, index) => {
                            if (user?.userType === "admin") return
                            return (
                                <TableRow key={user?._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{user?.name}</TableCell>
                                    <TableCell>{user?.email}</TableCell>
                                    <TableCell>{user?.address?.[0]?.city}</TableCell>
                                    <TableCell>{user?.number}</TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </div>
    )
}