"use client";

import useGetDoctors from "@/hooks/api/doctors/useGetDoctors";
import useUpdateRegistration from "@/hooks/api/investigationRegister/useUpdateInvestigationRegister";
import useGetInvestigations from "@/hooks/api/investigations/useGetInvestigations";
import useGetPatients from "@/hooks/api/useGetPatients";
import { calculateAge } from "@/lib/date-utils";
import { DoctorType } from "@/types/entity/doctor";
import { Registration } from "@/types/entity/investigationRegister";
import { PatientType } from "@/types/entity/patient";
import { Button, Card, Checkbox, Col, DatePicker, Form, Input, InputNumber, Row, Select, Spin, Switch } from "antd";
import dayjs from 'dayjs';
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { toast } from "sonner";

const { Meta } = Card;
const { Option } = Select;

export default function EditRegistration() {
    const router = useRouter();
    const [form] = Form.useForm();
    const [oldRegistration, setOldRegistration] = useState<Registration>();

    const searchParams = useSearchParams();

    const data = searchParams.get("data");

    if (!data) {
        router.push("/registrations");
    }

    useEffect(() => {
        if (data) {
            const parsedData = JSON.parse(data) as Registration;
            setOldRegistration(parsedData);

            setSelectedPatient(parsedData.patient);
            setSelectedDoctor(parsedData.registeredTests[0].doctor || undefined);

            form.setFieldsValue({
                "patient": `${parsedData.patient.name} [${calculateAge(parsedData.patient.date_of_birth)}]`,
                "doctor": parsedData.registeredTests[0].doctor?.name,
                "ref_number": Number(parsedData.ref_number) || undefined,
                "date": dayjs(parsedData.date),
                "investigations": parsedData.registeredTests.map(item => item.test.id),
                "total_cost": parsedData.total_cost,
                "paid_price": parsedData.paid_price,
                "collected": parsedData.collected == true,
            });
        }
    }, [data]);

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

    const { mutateAsync: updateRegistration, isPending } = useUpdateRegistration();
    const onFormSubmit = async (values: any) => {
        console.log(values);

        if (selectedPatient) {
            const patientId = Number(selectedPatient.id);
            const doctorId = selectedDoctor?.id || undefined;
            const refNumber = values.ref_number ? values.ref_number : null;

            let investigations = [];
            for (const investigationStr of values.investigations) {
                investigations.push(Number(investigationStr));
            }
            const promise = updateRegistration({
                registrationId: oldRegistration?.id!,
                registrationData: {
                    id: oldRegistration?.id!,
                    patient_id: patientId,
                    doctor_id: doctorId,
                    refNumber: refNumber,
                    date: new Date(values.date),
                    investigations: investigations,
                    totalCost: Number(values.total_cost),
                    paid: Number(values.paid_price),
                    //TODO: this should be taken from the current session 
                    branch_id: 1,
                    collected: values.collected == true,
                    version: oldRegistration?.version!,
                }
            });

            toast.promise(promise, {
                loading: "Updating the registration",
                success: "Registration has been updated",
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
        <Suspense>
            <div>
                <div>
                    <Card
                        className="apply_shadow"
                    >
                        <Meta
                            title="Edit Registration"
                            description={`Edit registration details ${"reg details"}`}
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
                                            {investigationResults && investigationResults?.content.map((test, _) => {
                                                const dataAdded = oldRegistration?.registeredTests.find(item => item.test.id == test.id)?.data_added;
                                                return (<Col key={test.id} span={8}>
                                                    <Checkbox disabled={dataAdded} value={test.id}>{test.name}</Checkbox>
                                                </Col>)
                                            })}
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

                                <Form.Item
                                    name="collected"
                                    label="Collected"
                                >
                                    <Switch />
                                </Form.Item>

                                <Form.Item wrapperCol={{ offset: 6, span: 16 }} style={{ display: "flex", justifyContent: "end" }}>
                                    <div className="flex flex-row gap-5">
                                        <Button type="primary" htmlType="submit">
                                            Update
                                        </Button>
                                        <Button type="default" onClick={() => router.push("/registrations")}>Go Back</Button>
                                    </div>
                                </Form.Item>
                            </Form>
                        </div>
                    </Card>
                </div>
            </div>
        </Suspense>
    )
}