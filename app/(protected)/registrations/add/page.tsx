"use client";

import useGetDoctors from "@/hooks/api/doctors/useGetDoctors";
import useAddInvestigationRegister from "@/hooks/api/investigationRegister/useAddInvestigationRegister";
import useGetInvestigations from "@/hooks/api/investigations/useGetInvestigations";
import useGetPatients from "@/hooks/api/useGetPatients";
import { calculateAge } from "@/lib/date-utils";
import { DoctorType } from "@/types/entity/doctor";
import { PatientType } from "@/types/entity/patient";
import { Button, Card, Checkbox, Col, DatePicker, Form, Input, InputNumber, Row, Select, Spin } from "antd";
import dayjs from 'dayjs';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const { Meta } = Card;
const { Option } = Select;

export default function AddRegistration() {
    const router = useRouter();
    const [form] = Form.useForm();

    
    // Patient
    const [patientSearchPhrase, setPatientSearchPhrase] = useState("");
    const [selectedPatient, setSelectedPatient] = useState<PatientType>();
    
    const { data: patientResults, error: patientFetchError, isLoading: patientLoading } = useGetPatients({ limit: 5, skip: 0, search: patientSearchPhrase });
    if (patientFetchError) {
        toast.error(patientFetchError.message);
    }
    const onPatientSearch = (value: string) => {
        setPatientSearchPhrase(value);
    }
    const handlePatientSelect = (value: number) => {
        setSelectedPatient(patientResults?.content.find(patient => patient.id == value));
    }

    // Doctor
    const [doctorSearchPhrase, setDoctorSearchPhrase] = useState("");
    const [selectedDoctor, setSelectedDoctor] = useState<DoctorType>();

    const { data: doctorResults, error: doctorFetchError, isLoading: doctorLoading } = useGetDoctors({ limit: 5, skip: 0, search: doctorSearchPhrase });
    if (doctorFetchError) {
        toast.error(doctorFetchError.message);
    }
    const onDoctorSearch = (value: string) => {
        setDoctorSearchPhrase(value);
    }
    const handleDoctorSelect = (value: number) => {
        setSelectedDoctor(doctorResults?.content.find(doc => doc.id == value));
    }

    // Investigation
    const { data: investigationResults, error: investigationFetchError, isLoading: investigationLoading } = useGetInvestigations({ limit: 5, skip: 0 });
    if (investigationFetchError) {
        toast.error(investigationFetchError.message);
    }
    const onSelectedInvestigationsChange = (checkedValues: string[]) => {
        let total_cost = 0;
        for (const checkedValue of checkedValues) {
            const price = investigationResults?.content.find((test) => test.id == Number(checkedValue))?.price;
            total_cost += price ? price : 0;
        }

        form.setFieldValue("total_cost", total_cost);
    }

    const { mutateAsync: createRegistration, isPending } = useAddInvestigationRegister();
    const onFormSubmit = async (values: any) => {
        if (selectedPatient) {
            const patientId = Number(selectedPatient.id);
            const doctorId = selectedDoctor?.id;
            const refNumber = values.ref_number ? values.ref_number : null;

            let investigations = [];
            for (const investigationStr of values.investigations) {
                investigations.push(Number(investigationStr));
            }
            const promise = createRegistration({
                patient_id: patientId,
                doctor_id: doctorId,
                refNumber: refNumber,
                date: new Date(values.date),
                investigations: investigations,
                totalCost: Number(values.total_cost),
                paid: Number(values.paid_price),
                //TODO: this should be taken from the current session 
                branch_id: 1,
                version: 1,
            });

            toast.promise(promise, {
                loading: "Adding a registration",
                success: "Registration has been added",
            });
            try {
                await promise;
                router.push("/registrations");
            } catch (error: any) {
                toast.error(error.toString())
            }
        } else {
            return undefined;
        }
    }

    return (
        <div>
            <div>
                <Card
                    className="apply_shadow"
                >
                    <Meta
                        title="Add Registration"
                        description="Add new registration to the database"
                    />

                    <div className="mt-5">
                        <Form
                            form={form}
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 18 }}
                            layout="horizontal"
                            style={{ maxWidth: 800 }}
                            onFinish={onFormSubmit}
                            initialValues={{ date: dayjs() }}
                            disabled={isPending}
                        >
                            <Form.Item
                                label="Patient"
                                name="patient"
                                required
                                rules={[{ required: true, message: 'Please select a patient!' }]}
                            >
                                <Select
                                    showSearch
                                    allowClear
                                    placeholder="Search for a patient"
                                    onSearch={onPatientSearch}
                                    onSelect={handlePatientSelect}
                                    onClear={() => setSelectedPatient(undefined)}
                                    notFoundContent={patientLoading ? <Spin size="small" /> : "No patients found"}
                                    filterOption={false}
                                    style={{ width: 300 }}
                                    value={selectedPatient?.id}
                                >
                                    {patientResults && patientResults.content.map((patient) => (
                                        <Option key={patient.id} value={patient.id}>
                                            {patient.name} [{calculateAge(patient.date_of_birth)}]
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label="Doctor"
                                name="doctor"
                            >
                                <Select
                                    showSearch
                                    allowClear
                                    placeholder="Search for a doctor"
                                    onSearch={onDoctorSearch}
                                    onSelect={handleDoctorSelect}
                                    onClear={() => setSelectedDoctor(undefined)}
                                    notFoundContent={doctorLoading ? <Spin size="small" /> : "No doctors found"}
                                    filterOption={false}
                                    style={{ width: 300 }}
                                    value={selectedDoctor?.id}
                                >
                                    {doctorResults && doctorResults.content.map((doctor) => (
                                        <Option key={doctor.id} value={doctor.id}>
                                            {doctor.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label="Reference number"
                                name="ref_number"
                                rules={[{ type: "integer", message: "Only integers are accepted!" }]}
                            >
                                <InputNumber controls={false} style={{ width: 100 }} />
                            </Form.Item>

                            <Form.Item
                                label="Date"
                                name="date"
                                required
                                rules={[{ required: true, message: 'Please select a date!' }]}
                            >
                                <DatePicker />
                            </Form.Item>

                            <Form.Item
                                label="Investigations"
                                name="investigations"
                                rules={[{ required: true, message: 'Please select at least one investigation!' }]}
                            >
                                <Checkbox.Group style={{ width: '100%' }} onChange={onSelectedInvestigationsChange}>
                                    <Row>
                                        {investigationResults && investigationResults?.content.map((test, _) => (
                                            <Col key={test.id} span={8}>
                                                <Checkbox value={test.id}>{test.name}</Checkbox>
                                            </Col>
                                        ))}
                                    </Row>
                                </Checkbox.Group>
                            </Form.Item>

                            <Form.Item
                                name="total_cost"
                                label="Total cost"
                            >
                                <Input readOnly style={{ width: 100 }} />
                            </Form.Item>

                            <Form.Item
                                name="paid_price"
                                label="Paid"
                            >
                                <InputNumber style={{ width: 100 }} />
                            </Form.Item>

                            <Form.Item wrapperCol={{ offset: 6, span: 16 }} style={{ display: "flex", justifyContent: "end" }}>
                                <div className="flex flex-row gap-5">
                                    <Button type="primary" onClick={() => { }}>
                                        Save & Print receipt
                                    </Button>
                                    <Button type="default" htmlType="submit">
                                        Save
                                    </Button>
                                    <Button type="default" onClick={() => router.push("/registrations")}>Go Back</Button>
                                </div>
                            </Form.Item>
                        </Form>
                    </div>
                </Card>
            </div>
        </div>
    )
}