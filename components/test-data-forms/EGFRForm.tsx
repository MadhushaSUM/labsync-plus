import { Button, Divider, Form, Input, Select, Spin } from "antd";
import { useState } from "react";
import { calculateEGFR } from "../../lib/utils";
import { DataEmptyTests } from "@/types/entity/investigation";
import { DoctorType } from "@/types/entity/doctor";
import useGetDoctors from "@/hooks/api/doctors/useGetDoctors";
import { toast } from "sonner";
import useUpdateInvestigationData from "@/hooks/api/investigationData/useUpdateInvestigationData";
import { calculateAgeArray } from "@/lib/date-utils";

const { Option } = Select;

const EGFRForm = ({ data, clearScreen }: { data: DataEmptyTests, clearScreen: (testRegisterId: number, testId: number) => void }) => {
    const [form] = Form.useForm();

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

    const { mutateAsync: updateRegistrationData, isPending } = useUpdateInvestigationData();

    const onFinish = async (values: any) => {
        try {
            const savingData = {
                sCreatinineValue: Number(values.sCreatinineValue),
                egfrValue: Number(values.egfrValue),
                egfrValueFlag: values.egfrValueFlag,
                comment: values.comment
            }
            const options = {
                preferred_age_format: JSON.parse(values.ageFormat)
            }
            const promise = updateRegistrationData({
                investigationRegisterId: data.testRegisterId,
                investigationId: data.testId,
                body: {
                    data: savingData,
                    options: options,
                    version: data.version,
                    doctor_id: selectedDoctor?.id,
                },
            });
            toast.promise(promise, {
                loading: "Updating the registration",
            });
            try {
                const res = await (await promise).json();
                toast.success(res.message);
                clearScreen(data.testRegisterId, data.testId);
            } catch (error: any) {
                toast.error(error.toString())
            }
        } catch (error) {
            console.error(error);
        }
    };

    const setEGFRFieldValue = (value: string) => {
        const ageArr = calculateAgeArray(data.patientDOB);
        if (value && Number(value)) {
            const egfr = calculateEGFR(Number(value), data.patientGender, false, ageArr[0]);
            form.setFieldValue("egfrValue", (Math.round(egfr * 100) / 100));
        } else {
            form.setFieldValue("egfrValue", "");
        }
    }

    return (
        <div className="w-full">
            <p className="w-full text-lg text-center m-5 font-bold">
                EGFR
            </p>
            <Form
                name="complex-form"
                onFinish={onFinish}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 16 }}
                form={form}
                disabled={isPending || doctorLoading}
                initialValues={
                    {
                        "patient": data.patientName,
                        "doctor": data.doctorName,
                        "sCreatinineValue": data.data?.sCreatinineValue,
                        "egfrValue": data.data?.egfrValue,
                        "egfrValueFlag": data.data?.egfrValueFlag,
                        "comment": data.data?.comment,
                        "ageFormat": data.options.preferred_age_format ? JSON.stringify(data.options.preferred_age_format) : '["years"]'
                    }
                }
            >
                <Form.Item
                    name="patient"
                    label="Patient"
                >
                    <Input readOnly style={{ width: 300 }} />
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
                    label="Preferred age format"
                    name="ageFormat"
                >
                    <Select
                        allowClear
                        style={{ width: 300 }}
                    >
                        <Option value='["years"]'>years</Option>
                        <Option value='["months"]'>months</Option>
                        <Option value='["days"]'>days</Option>
                        <Option value='["months","days"]'>months and days</Option>
                        <Option value='["years","months","days"]'>years, months,and days</Option>
                    </Select>
                </Form.Item>

                <Divider />

                <Form.Item
                    name="sCreatinineValue"
                    label="S. Creatinine"
                    rules={[{ required: true }]}
                >
                    <Input addonAfter="mg/dl" placeholder="value" style={{ width: 300 }} onChange={(event) => setEGFRFieldValue(event.target.value)} />
                </Form.Item>

                <Form.Item label="e - GFR" style={{ marginBottom: 0 }}>
                    <Form.Item
                        name="egfrValue"
                        rules={[{ required: true }]}
                        style={{ display: 'inline-block', width: '300px' }}
                    >
                        <Input addonAfter="ml/min/1.73m²" placeholder="value" />
                    </Form.Item>
                    <div className="flex-row items-center inline-flex">
                        <Form.Item
                            name="egfrValueFlag"
                            style={{ display: 'inline-block', width: '150px', margin: '0 20px' }}
                        >
                            <Select placeholder="flag" mode="tags" maxCount={1}>
                                <Option value="Low">Low</Option>
                                <Option value="High">High</Option>
                            </Select>
                        </Form.Item>
                    </div>
                </Form.Item>
                <Form.Item
                    label="Comment"
                    name="comment"
                >
                    <Input.TextArea style={{ width: 375 }} />
                </Form.Item>
                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default EGFRForm;