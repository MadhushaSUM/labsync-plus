import useGetDoctors from "@/hooks/api/doctors/useGetDoctors";
import useUpdateInvestigationData from "@/hooks/api/investigationData/useUpdateInvestigationData";
import useGetInvestigationFields from "@/hooks/api/investigations/useGetInvestigationFields";
import useGetNormalRangesByTest from "@/hooks/api/investigations/useGetNormalRangesByTest";
import { displayNormalRange, setFlag } from "@/lib/normalRangeFlag";
import { DoctorType } from "@/types/entity/doctor";
import { DataEmptyTests } from "@/types/entity/investigation";
import { Button, Divider, Form, Input, Select, Spin } from "antd";
import { useState } from "react";
import { toast } from "sonner";

const { Option } = Select;

const OralGlucoseForm = ({ data, clearScreen }: { data: DataEmptyTests, clearScreen: (testRegisterId: number, testId: number) => void }) => {
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

    // Get normal range rules
    const { data: normalRangeRulesResults, error: rulesFetchError, isLoading: rulesLoading } = useGetNormalRangesByTest(data.testId);
    if (rulesFetchError) {
        toast.error(rulesFetchError.message);
    }

    // Investigation Fields
    const { data: investigationFieldsResults, error: investigationFieldsFetchError, isLoading: investigationFieldsLoading } = useGetInvestigationFields(data.testId);
    if (investigationFieldsFetchError) {
        toast.error(investigationFieldsFetchError.message);
    }

    const { mutateAsync: updateRegistrationData, isPending } = useUpdateInvestigationData();
    const onFinish = async (values: any) => {
        try {
            const savingData = {
                glucoseWeight: values.glucoseWeight,
                fbsValue: Number(values.fbsValue),
                fbsValueFlag: values.fbsValueFlag,
                firstHourValue: Number(values.firstHourValue),
                firstHourValueFlag: values.firstHourValueFlag,
                secondHourValue: Number(values.secondHourValue),
                secondHourValueFlag: values.secondHourValueFlag,
                comment: values.comment
            };
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

    return (
        <div className="w-full">
            <p className="w-full text-lg text-center m-5 font-bold">
                Oral Glucose Tolerance
            </p>
            <Form
                name="complex-form"
                onFinish={onFinish}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 16 }}
                form={form}
                disabled={isPending || rulesLoading || doctorLoading || investigationFieldsLoading}
                initialValues={
                    {
                        "patient": data.patientName,
                        "doctor": data.doctorName,
                        "glucoseWeight": data.data ? data.data?.glucoseWeight : "50g",
                        "fbsValue": data.data?.fbsValue,
                        "fbsValueFlag": data.data?.fbsValueFlag,
                        "firstHourValue": data.data?.firstHourValue,
                        "firstHourValueFlag": data.data?.firstHourValueFlag,
                        "secondHourValue": data.data?.secondHourValue,
                        "secondHourValueFlag": data.data?.secondHourValueFlag,
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
                    name="glucoseWeight"
                    label="Glucose weight"
                    rules={[{ required: true }]}
                >
                    <Select style={{ width: 200 }}>
                        <Option value="50g">50g</Option>
                        <Option value="75g">75g</Option>
                    </Select>
                </Form.Item>

                <Form.Item label="FBS" style={{ marginBottom: 0 }}>
                    <Form.Item
                        name="fbsValue"
                        rules={[{ required: true }]}
                        style={{ display: 'inline-block', width: '200px' }}
                    >
                        <Input addonAfter="mg/dl" placeholder="value" onChange={(e) => setFlag('fbsValue', e.target.value, investigationFieldsResults?.content, normalRangeRulesResults?.content, data.patientDOB, data.patientGender, form)} />
                    </Form.Item>
                    <div className="flex-row items-center inline-flex">
                        <Form.Item
                            name="fbsValueFlag"
                            style={{ display: 'inline-block', width: '150px', margin: '0 20px' }}
                        >
                            <Select placeholder="flag" mode="tags" maxCount={1}>
                                <Option value="Low">Low</Option>
                                <Option value="High">High</Option>
                            </Select>
                        </Form.Item>
                        <span>
                            {displayNormalRange('fbsValue', investigationFieldsResults?.content, normalRangeRulesResults?.content, data.patientDOB, data.patientGender)}
                        </span>
                    </div>
                </Form.Item>

                <Form.Item label="1ˢᵗ hour" style={{ marginBottom: 0 }}>
                    <Form.Item
                        name="firstHourValue"
                        style={{ display: 'inline-block', width: '200px' }}
                    >
                        <Input addonAfter="mg/dl" placeholder="value" onChange={(e) => setFlag('firstHourValue', e.target.value, investigationFieldsResults?.content, normalRangeRulesResults?.content, data.patientDOB, data.patientGender, form)} />
                    </Form.Item>
                    <div className="flex-row items-center inline-flex">
                        <Form.Item
                            name="firstHourValueFlag"
                            style={{ display: 'inline-block', width: '150px', margin: '0 20px' }}
                        >
                            <Select placeholder="flag" mode="tags" maxCount={1}>
                                <Option value="Low">Low</Option>
                                <Option value="High">High</Option>
                            </Select>
                        </Form.Item>
                        <span>
                            {displayNormalRange('firstHourValue', investigationFieldsResults?.content, normalRangeRulesResults?.content, data.patientDOB, data.patientGender)}
                        </span>
                    </div>
                </Form.Item>

                <Form.Item label="2ⁿᵈ hour" style={{ marginBottom: 0 }}>
                    <Form.Item
                        name="secondHourValue"
                        style={{ display: 'inline-block', width: '200px' }}
                    >
                        <Input addonAfter="mg/dl" placeholder="value" onChange={(e) => setFlag('secondHourValue', e.target.value, investigationFieldsResults?.content, normalRangeRulesResults?.content, data.patientDOB, data.patientGender, form)} />
                    </Form.Item>
                    <div className="flex-row items-center inline-flex">
                        <Form.Item
                            name="secondHourValueFlag"
                            style={{ display: 'inline-block', width: '150px', margin: '0 20px' }}
                        >
                            <Select placeholder="flag" mode="tags" maxCount={1}>
                                <Option value="Low">Low</Option>
                                <Option value="High">High</Option>
                            </Select>
                        </Form.Item>
                        <span>
                            {displayNormalRange('secondHourValue', investigationFieldsResults?.content, normalRangeRulesResults?.content, data.patientDOB, data.patientGender)}
                        </span>
                    </div>
                </Form.Item>

                <Form.Item
                    label="Comment"
                    name="comment"
                >
                    <Input.TextArea style={{ width: 375 }} />
                </Form.Item>
                <Form.Item label={null}>
                    <div className="flex justify-end mb-5">
                        <Button type="primary" htmlType="submit">
                            Save
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </div>
    )
}

export default OralGlucoseForm;