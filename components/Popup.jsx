import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button} from "@nextui-org/react";

const Popup = ({isOpen, onOpenChange, setUpdatedPatient, updatePatient, updatedPatient, selectedPatient}) => {
    return (
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
    )
}

export default Popup