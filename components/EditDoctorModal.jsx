"use client";

import { ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { useEffect, useState } from "react";

const EditDoctorModal = ({onClose, doctor, updateDoctor}) => {
    const [newDetails, setNewDetails] = useState();

    const newDoctorDetails = (e) => {
        setNewDetails(e.target.value);
    };
    const updateDoctorDetails = () => {
        updateDoctor(doctor.id, newDetails)
    }

    useEffect(() => {
        setNewDetails(doctor.name);
    },[]);

    return (
        <div>
            <ModalHeader className="flex flex-col gap-1">Edit Doctor</ModalHeader>
            <ModalBody>
                <p> 
                ID:
                </p>
                <input type="text" placeholder="Doctor's ID" value={doctor.id} disabled/>
                <p> 
                Name:
                </p>
                <input type="text" placeholder="Doctor's Name" value={newDetails} onChange={newDoctorDetails}/>
                
            </ModalBody>
            <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                Close
                </Button>
                <Button color="primary" onPress={updateDoctorDetails}>
                Update
                </Button>
            </ModalFooter>
        </div>
    )
}

export default EditDoctorModal