"use client";

import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Chip, User, Tooltip} from "@nextui-org/react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import {EditIcon} from "@/components/EditIcon"
import {DeleteIcon} from "@/components/DeleteIcon";
import {EyeIcon} from "@/components/EyeIcon";
import Popup from "@/components/Popup"
import Image from "next/image";

const statusColorMap = {
    active: "success",
    paused: "danger",
    vacation: "warning",
};

const columns = [
    {name: "ID", uid: "id"},
    {name: "NAME", uid: "name"},
    {name: "STATUS", uid: "status"},
    {name: "ACTIONS", uid: "actions"},
];

const PatientsPage = () => {

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const [rows, setRows] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState({
        id:-1,
        name:""
    });
    const [updatedPatient, setUpdatedPatient] = useState({
        id: -1,
        name: "",
    });
    const [isForEditPatient, setIsForEditPatient] = useState(true);
    const [newPatientName, setNewPatientName] = useState("");

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

    const renderCell = useCallback((user, columnKey) => {
        const cellValue = user[columnKey];        
    
        switch (columnKey) {
            case "name":
                return (
                    <User
                        avatarProps={{radius: "full", src: user.avatar}}
                        description={user.email}
                        name={cellValue}
                    >
                        {user.email}
                    </User>
                );
            case "role":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{cellValue}</p>
                        <p className="text-bold text-sm capitalize text-default-400">{user.team}</p>
                    </div>
                );
            case "status":
                return (
                    <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
                        {cellValue}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        
                        <Tooltip content="Edit user">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => {
                                setSelectedPatient(user);
                                setUpdatedPatient(user);
                                setIsForEditPatient(true);
                                onOpen();
                            }}>
                                <EditIcon />
                            </span>     
                        </Tooltip>

                        <Tooltip color="danger" content="Delete user">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => {
                                deletePatient(user);
                            }}>
                                <DeleteIcon />
                            </span>
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    const updatePatient = async () => {
        await fetch("/api/patients", {
            method: "PUT",
            body: JSON.stringify({
                id: updatedPatient.id,
                name: updatedPatient.name,
            }),
        });
        loadPatients();
    };
    const deletePatient = async (user) => {
        await fetch("/api/patients", {
            method: "DELETE",
            body: JSON.stringify({
                id: user.id,
            }),
        });
        loadPatients();
    };
    const addPatient = async () => {
        await fetch("/api/patients/addnew", {
            method: "POST",
            body: JSON.stringify({
                name: newPatientName,
            }),
        });
        loadPatients();
    };

    return (
        <div className="m-5">
            <h1 className="text-3xl font-bold">Manage Patients</h1>

            <div className="bg-gray-100 h-12 rounded-xl mx-10 mt-5 flex flex-row items-center justify-end p-5">
                <button className="bg-blue-400 rounded-full p-1 px-2 text-white font-semibold hover:bg-blue-500"
                onClick={()=>{
                    setIsForEditPatient(false);
                    onOpen();
                }}
                >
                    <div className="flex flex-row gap-2">
                        <Image src="/plus-icon.svg" width={15} height={15} alt="plus-icon" className="text-white"/>
                        Add
                    </div>
                </button>
            </div>
            <div className="pt-5 px-10">
                <Table aria-label="Example table with custom cells">
                    <TableHeader columns={columns}>
                        {(column) => (
                            <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                                {column.name}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody items={rows}>
                        {(item) => (
                            <TableRow key={item.id}>
                                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>


            <div>
                <Popup 
                    isOpen={isOpen}
                    isForEditPatient={isForEditPatient} 
                    onOpenChange={onOpenChange} 
                    updatePatient={updatePatient} 
                    updatedPatient={updatedPatient} 
                    setUpdatedPatient={setUpdatedPatient} 
                    selectedPatient={selectedPatient}
                    addPatient={addPatient}
                    newPatientName={newPatientName}
                    setNewPatientName={setNewPatientName}
                />
            </div>
        </div>
    )
}

export default PatientsPage