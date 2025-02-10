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

const LipidProfileForm = ({ data, clearScreen }: { data: DataEmptyTests, clearScreen: (testRegisterId: number, testId: number) => void }) => {
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

    const calculateFields = () => {
        const totalCholesterol = Number(form.getFieldValue('totalCholesterolValue'));
        const triglycerids = Number(form.getFieldValue('triglyceridsValue'));
        const hdlCholesterol = Number(form.getFieldValue('hdlCholesterolValue'));

        if (totalCholesterol && triglycerids && hdlCholesterol) {
            const ldl = Math.round((totalCholesterol - (hdlCholesterol + triglycerids / 5)) * 100) / 100;
            const vldl = Math.round((triglycerids / 5) * 100) / 100;
            const last = Math.round((totalCholesterol / hdlCholesterol) * 100) / 100;

            form.setFieldValue('ldlCholesterolValue', ldl);
            form.setFieldValue('vldlCholesterolValue', vldl);
            form.setFieldValue('tchoHdlRValue', last);

            setFlag('ldlCholesterolValue', ldl.toString(), investigationFieldsResults?.content, normalRangeRulesResults?.content, data.patientDOB, data.patientGender, form);
            setFlag('vldlCholesterolValue', vldl.toString(), investigationFieldsResults?.content, normalRangeRulesResults?.content, data.patientDOB, data.patientGender, form);
            setFlag('tchoHdlRValue', last.toString(), investigationFieldsResults?.content, normalRangeRulesResults?.content, data.patientDOB, data.patientGender, form);
        } else {
            form.setFieldValue('ldlCholesterolValue', undefined);
            form.setFieldValue('vldlCholesterolValue', undefined);
            form.setFieldValue('tchoHdlRValue', undefined);
            form.setFieldValue('ldlCholesterolValueFlag', undefined);
            form.setFieldValue('vldlCholesterolValueFlag', undefined);
            form.setFieldValue('tchoHdlRValueFlag', undefined);
        }
    }

    const { mutateAsync: updateRegistrationData, isPending } = useUpdateInvestigationData();
    const onFinish = async (values: any) => {
        try {
            const savingData = {
                totalCholesterolValue: Number(values.totalCholesterolValue),
                totalCholesterolValueFlag: values.totalCholesterolValueFlag,
                triglyceridsValue: Number(values.triglyceridsValue),
                triglyceridsValueFlag: values.triglyceridsValueFlag,
                hdlCholesterolValue: Number(values.hdlCholesterolValue),
                hdlCholesterolValueFlag: values.hdlCholesterolValueFlag,
                ldlCholesterolValue: Number(values.ldlCholesterolValue),
                ldlCholesterolValueFlag: values.ldlCholesterolValueFlag,
                vldlCholesterolValue: Number(values.vldlCholesterolValue),
                vldlCholesterolValueFlag: values.vldlCholesterolValueFlag,
                tchoHdlRValue: Number(values.tchoHdlRValue),
                tchoHdlRValueFlag: values.tchoHdlRValueFlag,
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
                Lipid Profile
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
                        "totalCholesterolValue": data.data?.totalCholesterolValue,
                        "totalCholesterolValueFlag": data.data?.totalCholesterolValueFlag,
                        "triglyceridsValue": data.data?.triglyceridsValue,
                        "triglyceridsValueFlag": data.data?.triglyceridsValueFlag,
                        "hdlCholesterolValue": data.data?.hdlCholesterolValue,
                        "hdlCholesterolValueFlag": data.data?.hdlCholesterolValueFlag,
                        "ldlCholesterolValue": data.data?.ldlCholesterolValue,
                        "ldlCholesterolValueFlag": data.data?.ldlCholesterolValueFlag,
                        "vldlCholesterolValue": data.data?.vldlCholesterolValue,
                        "vldlCholesterolValueFlag": data.data?.vldlCholesterolValueFlag,
                        "tchoHdlRValue": data.data?.tchoHdlRValue,
                        "tchoHdlRValueFlag": data.data?.tchoHdlRValueFlag,
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

                <Form.Item label="Total Cholesterol" style={{ marginBottom: 0 }}>
                    <Form.Item
                        name="totalCholesterolValue"
                        rules={[{ required: true }]}
                        style={{ display: 'inline-block', width: '200px' }}
                    >
                        <Input addonAfter="mg/dl" placeholder="value" onChange={(e) => setFlag('totalCholesterolValue', e.target.value, investigationFieldsResults?.content, normalRangeRulesResults?.content, data.patientDOB, data.patientGender, form)} />
                    </Form.Item>
                    <div className="flex-row items-center inline-flex">
                        <Form.Item
                            name="totalCholesterolValueFlag"
                            style={{ display: 'inline-block', width: '150px', margin: '0 20px' }}
                        >
                            <Select placeholder="flag" mode="tags" maxCount={1}>
                                <Option value="Low">Low</Option>
                                <Option value="High">High</Option>
                            </Select>
                        </Form.Item>
                        <span>
                            {displayNormalRange('totalCholesterolValue', investigationFieldsResults?.content, normalRangeRulesResults?.content, data.patientDOB, data.patientGender)}
                        </span>
                    </div>
                </Form.Item>
                <Form.Item label="Triglycerids" style={{ marginBottom: 0 }}>
                    <Form.Item
                        name="triglyceridsValue"
                        rules={[{ required: true }]}
                        style={{ display: 'inline-block', width: '200px' }}
                    >
                        <Input addonAfter="mg/dl" placeholder="value" onChange={(e) => setFlag('triglyceridsValue', e.target.value, investigationFieldsResults?.content, normalRangeRulesResults?.content, data.patientDOB, data.patientGender, form)} />
                    </Form.Item>
                    <div className="flex-row items-center inline-flex">
                        <Form.Item
                            name="triglyceridsValueFlag"
                            style={{ display: 'inline-block', width: '150px', margin: '0 20px' }}
                        >
                            <Select placeholder="flag" mode="tags" maxCount={1}>
                                <Option value="Low">Low</Option>
                                <Option value="High">High</Option>
                            </Select>
                        </Form.Item>
                        <span>
                            {displayNormalRange('triglyceridsValue', investigationFieldsResults?.content, normalRangeRulesResults?.content, data.patientDOB, data.patientGender)}
                        </span>
                    </div>
                </Form.Item>
                <Form.Item label="HDL Cholesterol" style={{ marginBottom: 0 }}>
                    <Form.Item
                        name="hdlCholesterolValue"
                        rules={[{ required: true }]}
                        style={{ display: 'inline-block', width: '200px' }}
                    >
                        <Input addonAfter="mg/dl" placeholder="value" onChange={(e) => setFlag('hdlCholesterolValue', e.target.value, investigationFieldsResults?.content, normalRangeRulesResults?.content, data.patientDOB, data.patientGender, form)} />
                    </Form.Item>
                    <div className="flex-row items-center inline-flex">
                        <Form.Item
                            name="hdlCholesterolValueFlag"
                            style={{ display: 'inline-block', width: '150px', margin: '0 20px' }}
                        >
                            <Select placeholder="flag" mode="tags" maxCount={1}>
                                <Option value="Low">Low</Option>
                                <Option value="High">High</Option>
                            </Select>
                        </Form.Item>
                        <span>
                            {displayNormalRange('hdlCholesterolValue', investigationFieldsResults?.content, normalRangeRulesResults?.content, data.patientDOB, data.patientGender)}
                        </span>
                        <Button color="default" variant="filled" onClick={calculateFields}>Calculate</Button>
                    </div>
                </Form.Item>
                <Form.Item label="LDL Cholesterol" style={{ marginBottom: 0 }}>
                    <Form.Item
                        name="ldlCholesterolValue"
                        rules={[{ required: true }]}
                        style={{ display: 'inline-block', width: '200px' }}
                    >
                        <Input addonAfter="mg/dl" placeholder="value" onChange={(e) => setFlag('ldlCholesterolValue', e.target.value, investigationFieldsResults?.content, normalRangeRulesResults?.content, data.patientDOB, data.patientGender, form)} />
                    </Form.Item>
                    <div className="flex-row items-center inline-flex">
                        <Form.Item
                            name="ldlCholesterolValueFlag"
                            style={{ display: 'inline-block', width: '150px', margin: '0 20px' }}
                        >
                            <Select placeholder="flag" mode="tags" maxCount={1}>
                                <Option value="Low">Low</Option>
                                <Option value="High">High</Option>
                            </Select>
                        </Form.Item>
                        <span>
                            {displayNormalRange('ldlCholesterolValue', investigationFieldsResults?.content, normalRangeRulesResults?.content, data.patientDOB, data.patientGender)}
                        </span>
                    </div>
                </Form.Item>
                <Form.Item label="VLDL Cholesterol" style={{ marginBottom: 0 }}>
                    <Form.Item
                        name="vldlCholesterolValue"
                        rules={[{ required: true }]}
                        style={{ display: 'inline-block', width: '200px' }}
                    >
                        <Input addonAfter="mg/dl" placeholder="value" onChange={(e) => setFlag('vldlCholesterolValue', e.target.value, investigationFieldsResults?.content, normalRangeRulesResults?.content, data.patientDOB, data.patientGender, form)} />
                    </Form.Item>
                    <div className="flex-row items-center inline-flex">
                        <Form.Item
                            name="vldlCholesterolValueFlag"
                            style={{ display: 'inline-block', width: '150px', margin: '0 20px' }}
                        >
                            <Select placeholder="flag" mode="tags" maxCount={1}>
                                <Option value="Low">Low</Option>
                                <Option value="High">High</Option>
                            </Select>
                        </Form.Item>
                        <span>
                            {displayNormalRange('vldlCholesterolValue', investigationFieldsResults?.content, normalRangeRulesResults?.content, data.patientDOB, data.patientGender)}
                        </span>
                    </div>
                </Form.Item>
                <Form.Item label="Total Chol. / HDL" style={{ marginBottom: 0 }}>
                    <Form.Item
                        name="tchoHdlRValue"
                        rules={[{ required: true }]}
                        style={{ display: 'inline-block', width: '200px' }}
                    >
                        <Input placeholder="value" onChange={(e) => setFlag('tchoHdlRValue', e.target.value, investigationFieldsResults?.content, normalRangeRulesResults?.content, data.patientDOB, data.patientGender, form)} />
                    </Form.Item>
                    <div className="flex-row items-center inline-flex">
                        <Form.Item
                            name="tchoHdlRValueFlag"
                            style={{ display: 'inline-block', width: '150px', margin: '0 20px' }}
                        >
                            <Select placeholder="flag" mode="tags" maxCount={1}>
                                <Option value="Low">Low</Option>
                                <Option value="High">High</Option>
                            </Select>
                        </Form.Item>
                        <span>
                            {displayNormalRange('tchoHdlRValue', investigationFieldsResults?.content, normalRangeRulesResults?.content, data.patientDOB, data.patientGender)}
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

export default LipidProfileForm;