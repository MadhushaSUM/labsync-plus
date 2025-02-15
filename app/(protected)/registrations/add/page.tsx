"use client";

import { useCurrentUser } from "@/hooks/api/auth/useCurrentUser";
import useGetBranches from "@/hooks/api/branches/useGetBranches";
import useGetDoctors from "@/hooks/api/doctors/useGetDoctors";
import useAddInvestigationRegister from "@/hooks/api/investigationRegister/useAddInvestigationRegister";
import useGetInvestigations from "@/hooks/api/investigations/useGetInvestigations";
import useGetPatients from "@/hooks/api/useGetPatients";
import { calculateAge } from "@/lib/date-utils";
import { BranchType } from "@/types/entity/branch";
import { DoctorType } from "@/types/entity/doctor";
import { PatientType } from "@/types/entity/patient";
import { Button, Card, Checkbox, Col, DatePicker, Form, Input, InputNumber, Row, Select, Spin } from "antd";
import dayjs from 'dayjs';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
    const { data: investigationResults, error: investigationFetchError, isLoading: investigationLoading } = useGetInvestigations({ limit: 50, skip: 0 });
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

    // Branch
    const [branchSearchPhrase, setBranchSearchPhrase] = useState("");
    const [selectedBranch, setSelectedBranch] = useState<BranchType>();

    const { data: branchResults, error: branchFetchError, isLoading: branchLoading } = useGetBranches({ limit: 5, skip: 0, search: branchSearchPhrase });
    if (branchFetchError) {
        toast.error(branchFetchError.message);
    }
    const onBranchSearch = (value: string) => {
        setBranchSearchPhrase(value);
    }
    const handleBranchSelect = (value: number) => {
        setSelectedBranch(branchResults?.content.find(branch => branch.id == value));
    }

    const currentUser = useCurrentUser();

    useEffect(() => {
        form.setFieldValue("branch", currentUser?.branch.id);
    }, [currentUser]);

    const { mutateAsync: createRegistration, isPending } = useAddInvestigationRegister();
    const onFormSubmit = async (values: any) => {
        if (selectedPatient && selectedBranch?.id) {
            const patientId = Number(selectedPatient.id);
            const doctorId = selectedDoctor?.id;
            const refNumber = values.ref_number ? values.ref_number : null;
            const branchId = selectedBranch.id;

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
                branch_id: branchId,
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
                                <InputNumber controls={false} style={{ width: 150 }} />
                            </Form.Item>

                            <Form.Item
                                label="Branch"
                                name="branch"
                                required
                                rules={[{ required: true, message: 'Please select a Branch!' }]}
                            >
                                <Select
                                    showSearch
                                    allowClear
                                    placeholder="Search for a branch"
                                    onSearch={onBranchSearch}
                                    onSelect={handleBranchSelect}
                                    onClear={() => setSelectedBranch(undefined)}
                                    notFoundContent={branchLoading ? <Spin size="small" /> : "No branch found"}
                                    filterOption={false}
                                    value={selectedBranch?.id}
                                    style={{ width: 150 }}
                                >
                                    {branchResults && branchResults.content.map((branch) => (
                                        <Option key={branch.id} value={branch.id}>
                                            {branch.name}
                                        </Option>
                                    ))}
                                </Select>
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
                                <Input readOnly style={{ width: 150 }} />
                            </Form.Item>

                            <Form.Item
                                name="paid_price"
                                label="Paid"
                            >
                                <InputNumber style={{ width: 150 }} />
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