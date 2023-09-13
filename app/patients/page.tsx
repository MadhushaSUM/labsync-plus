"use client";

import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Chip, User, Tooltip} from "@nextui-org/react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import {EditIcon} from "@/components/EditIcon"
import {DeleteIcon} from "@/components/DeleteIcon";
import {EyeIcon} from "@/components/EyeIcon";

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
    const [selectedPatient, setSelectedPatient] = useState({});
    const [updatedPatient, setUpdatedPatient] = useState({
        id: -1,
        name: "",
    });

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
                        <Tooltip content="Details">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EyeIcon />
                            </span>
                        </Tooltip>

                        <Tooltip content="Edit user">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => {
                                setSelectedPatient(user);
                                setUpdatedPatient(user);
                                onOpen();
                            }}>
                                <EditIcon />
                            </span>     
                        </Tooltip>

                        <Tooltip color="danger" content="Delete user">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
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
    };

    return (
        <div className="m-5">
            <h1 className="text-3xl font-bold">Manage Patients</h1>

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
                <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur" size="5xl">
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Edit Patient Details</ModalHeader>
                                <ModalBody>
                                    <p> 
                                    Patient ID:
                                    </p>
                                    <input type="text" placeholder="Patient ID" disabled value={selectedPatient.id}/>
                                    <p> 
                                    Patient Name:
                                    </p>
                                    <input type="text" placeholder="Patient Name" value={updatedPatient.name} onChange={(e) => {setUpdatedPatient({id:selectedPatient.id, name: e.target.value}); }}/>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                    </Button>
                                    <Button color="primary" onPress={updatePatient}>
                                    Save
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </div>
        </div>
    )
}

export default PatientsPage