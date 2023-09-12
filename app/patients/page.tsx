"use client";

import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


  
const columns = [
    {
      key: "id",
      label: "ID",
    },
    {
      key: "name",
      label: "NAME",
    },
    {
      key: "status",
      label: "STATUS",
    },
];


const PatientsPage = () => {

    const [rows, setRows] = useState([]);
    const router = useRouter();

    const loadPatients = async () => {
        try {
            const res = await fetch("/api/getpatient", {
                method:"GET",
            }) 
            const { patients } = await res.json(); 
            setRows(patients)                
        } catch (error) {
            console.log(error);                
        }
       
    }

    useEffect(() => {
        loadPatients();
    },[]);

    return (
        <div className="m-5">
            <h1 className="text-3xl font-bold">Manage Patients</h1>

            <div className="pt-5">
                <Table aria-label="patient table">
                    <TableHeader columns={columns}>
                        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                    </TableHeader>
                    <TableBody items={rows}>
                        {(item) => (
                        <TableRow key={item.key}>
                            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                        </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default PatientsPage