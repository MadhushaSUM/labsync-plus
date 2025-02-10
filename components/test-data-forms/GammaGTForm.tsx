import { Button, Divider, Form, Input, Select, Spin } from "antd";
import { useState } from "react";
import { DataEmptyTests } from "@/types/entity/investigation";
import { DoctorType } from "@/types/entity/doctor";
import useGetDoctors from "@/hooks/api/doctors/useGetDoctors";
import useGetNormalRangesByTest from "@/hooks/api/investigations/useGetNormalRangesByTest";
import useGetInvestigationFields from "@/hooks/api/investigations/useGetInvestigationFields";
import useUpdateInvestigationData from "@/hooks/api/investigationData/useUpdateInvestigationData";
import { toast } from "sonner";
import { displayNormalRange, setFlag } from "@/lib/normalRangeFlag";

const { Option } = Select;

const GammaGTForm = ({ data, clearScreen }: { data: DataEmptyTests, clearScreen: (testRegisterId: number, testId: number) => void }) => {
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
                gammaGtValue: Number(values.gammaGtValue),
                gammaGtValueFlag: values.gammaGtValueFlag,
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
                Gamma GT
            </p>
            <Form
                name="complex-form"
                onFinish={onFinish}
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 15 }}
                form={form}
                disabled={isPending || rulesLoading || doctorLoading || investigationFieldsLoading}
                initialValues={
                    {
                        "patient": data.patientName,
                        "doctor": data.doctorName,
                        "gammaGtValue": data.data?.gammaGtValue,
                        "gammaGtValueFlag": data.data?.gammaGtValueFlag,
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

                <Form.Item label="GAMMA GT" style={{ marginBottom: 0 }}>
                    <Form.Item
                        name="gammaGtValue"
                        rules={[{ required: true }]}
                        style={{ display: 'inline-block', width: '200px' }}
                    >
                        <Input addonAfter="U/L" placeholder="value" onChange={(e) => setFlag('gammaGtValue', e.target.value, investigationFieldsResults?.content, normalRangeRulesResults?.content, data.patientDOB, data.patientGender, form)} />
                    </Form.Item>
                    <div className="flex-row items-center inline-flex">
                        <Form.Item
                            name="gammaGtValueFlag"
                            style={{ display: 'inline-block', width: '150px', margin: '0 20px' }}
                        >
                            <Select placeholder="flag" mode="tags" maxCount={1}>
                                <Option value="Low">Low</Option>
                                <Option value="High">High</Option>
                            </Select>
                        </Form.Item>
                        <span>
                            {displayNormalRange('gammaGtValue', investigationFieldsResults?.content, normalRangeRulesResults?.content, data.patientDOB, data.patientGender)}
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

export default GammaGTForm;