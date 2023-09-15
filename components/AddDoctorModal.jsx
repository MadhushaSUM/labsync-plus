"use client";

import { ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { useState } from "react";

const AddDoctorModal = ({onClose, addDoctor}) => {
    const [newDetails, setNewDetails] = useState();

    const newDoctorDetails = (e) => {
        setNewDetails(e.target.value);
    };
    const addNewDoctor = () => {
        addDoctor(newDetails)
    }

    return (
        <div>
            <ModalHeader className="flex flex-col gap-1">Add a Doctor</ModalHeader>
            <ModalBody>
                <p> 
                Name:
                </p>
                <input type="text" placeholder="Doctor's Name" value={newDetails} onChange={newDoctorDetails}/>
                
            </ModalBody>
            <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                Close
                </Button>
                <Button color="primary" onPress={addNewDoctor}>
                Add
                </Button>
            </ModalFooter>
        </div>
    )
}

export default AddDoctorModal