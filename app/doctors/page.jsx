"use client";

import Image from "next/image"
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, User, Tooltip} from "@nextui-org/react";
import {Modal, ModalContent, useDisclosure} from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import {EditIcon} from "@/components/EditIcon"
import {DeleteIcon} from "@/components/DeleteIcon";
import AddDoctorModal from "@/components/AddDoctorModal";

const columns = [
    {name: "ID", uid: "id"},
    {name: "NAME", uid: "name"},
    {name: "ACTIONS", uid: "actions"},
];

const Doctors = () => {

    const [rows, setRows] = useState([]);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [selectedDoctor, setSelectedDoctor] = useState({});

    const loadDoctors = async () => {
        try {
            const res = await fetch("/api/doctors/getall", {
                method:"GET",
            }) 
            const { doctors } = await res.json(); 
            setRows(doctors)                
        } catch (error) {
            console.log(error);                
        }
       
    }

    useEffect(() => {
        loadDoctors();
    },[]);

    const updateDoctor = async (id, name) => {
        await fetch("/api/doctors", {
            method: "PUT",
            body: JSON.stringify({
                id: id,
                name: name,
            }),
        });
        loadDoctors();
    };
    const deleteDoctor = async (id) => {
        await fetch("/api/doctors", {
            method: "DELETE",
            body: JSON.stringify({
                id: id,
            }),
        });
        loadDoctors();
    };


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
                                setSelectedDoctor(user);
                                onOpen();                                
                            }}>
                                <EditIcon />
                            </span>     
                        </Tooltip>

                        <Tooltip color="danger" content="Delete user">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => {
                                deleteDoctor(user.id);                                
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

    return (
        <div className="m-5">
            <h1 className="text-3xl font-bold">Manage Doctors</h1>

            <div className="bg-gray-100 h-12 rounded-xl mx-10 mt-5 flex flex-row items-center justify-end p-5">
                <button className="bg-blue-400 rounded-full p-1 px-2 text-white font-semibold hover:bg-blue-500" onClick={()=>{}} >
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
                <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl" backdrop="blur">
                    <ModalContent>
                    {(onClose) => (
                        <>
                            <AddDoctorModal onClose={onClose} doctor={selectedDoctor} updateDoctor={updateDoctor}/>                           
                            
                        </>
                    )}
                    </ModalContent>
                </Modal>                
            </div>
        </div>
    )
}

export default Doctors