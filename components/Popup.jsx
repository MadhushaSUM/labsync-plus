import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button} from "@nextui-org/react";
import { useState } from "react";

const Popup = ({
    isOpen, 
    onOpenChange,
    isForEditPatient, 
    setUpdatedPatient, 
    updatePatient, 
    updatedPatient, 
    selectedPatient,
    addPatient,
    newPatientName,
    setNewPatientName
    }) => {

    
        if (isForEditPatient) {
            return (
                <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur" size="xl">
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
            )            
        } else {
            return (
                <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur" size="xl">
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Add New Patient</ModalHeader>
                                <ModalBody>
                                    <p>
                                        Name:
                                    </p>
                                    <input 
                                        placeholder="Patient Name"
                                        value={newPatientName}
                                        onChange={(e) => setNewPatientName(e.target.value)}
                                    />
                                    
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button color="primary" onPress={addPatient}>
                                        Add
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            )
        }
}

export default Popup