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

const FBCForm = ({ data, clearScreen }: { data: DataEmptyTests, clearScreen: (testRegisterId: number, testId: number) => void }) => {
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
        const hb = Number(form.getFieldValue('heamoglobinValue'));
        const pcv = Number(form.getFieldValue('htcpvcValue'));
        const rbc = Number(form.getFieldValue('rbcValue'));

        if (hb && pcv && rbc) {
            const mcv = Math.round(((pcv / rbc) * 10) * 100) / 100;
            const mch = Math.round(((hb / rbc) * 10) * 100) / 100;
            const mchc = Math.round(((hb / mch) * 100) * 100) / 100;

            form.setFieldValue('mcvValue', mcv);
            form.setFieldValue('mchValue', mch);
            form.setFieldValue('mchcValue', mchc);

            setFlag('mcvValue', mcv.toString(), investigationFieldsResults?.content, normalRangeRulesResults?.content, data.patientDOB, data.patientGender, form);
            setFlag('mchValue', mch.toString(), investigationFieldsResults?.content, normalRangeRulesResults?.content, data.patientDOB, data.patientGender, form);
            setFlag('mchcValue', mchc.toString(), investigationFieldsResults?.content, normalRangeRulesResults?.content, data.patientDOB, data.patientGender, form);
        } else {
            form.setFieldValue('mcvValue', undefined);
            form.setFieldValue('mchValue', undefined);
            form.setFieldValue('mchcValue', undefined);
            form.setFieldValue('mcvValueFlag', undefined);
            form.setFieldValue('mchValueFlag', undefined);
            form.setFieldValue('mchcValueFlag', undefined);
        }
    }

    const { mutateAsync: updateRegistrationData, isPending } = useUpdateInvestigationData();
    const onFinish = async (values: any) => {
        try {
            const savingData = {
                wbcValue: Number(values.wbcValue),
                wbcValueFlag: values.wbcValueFlag,
                neutrophilsValue: Number(values.neutrophilsValue),
                neutrophilsValueFlag: values.neutrophilsValueFlag,
                lymphocytesValue: Number(values.lymphocytesValue),
                lymphocytesValueFlag: values.lymphocytesValueFlag,
                eosinophilsValue: Number(values.eosinophilsValue),
                eosinophilsValueFlag: values.eosinophilsValueFlag,
                monocytesValue: Number(values.monocytesValue),
                monocytesValueFlag: values.monocytesValueFlag,
                basophilsValue: Number(values.basophilsValue),
                basophilsValueFlag: values.basophilsValueFlag,
                heamoglobinValue: Number(values.heamoglobinValue),
                heamoglobinValueFlag: values.heamoglobinValueFlag,
                rbcValue: Number(values.rbcValue),
                rbcValueFlag: values.rbcValueFlag,
                htcpvcValue: Number(values.htcpvcValue),
                htcpvcValueFlag: values.htcpvcValueFlag,
                mcvValue: Number(values.mcvValue),
                mcvValueFlag: values.mcvValueFlag,
                mchValue: Number(values.mchValue),
                mchValueFlag: values.mchValueFlag,
                mchcValue: Number(values.mchcValue),
                mchcValueFlag: values.mchcValueFlag,
                plateletValue: Number(values.plateletValue),
                plateletValueFlag: values.plateletValueFlag,
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
                Full Blood Count
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
                        "wbcValue": data.data?.wbcValue,
                        "wbcValueFlag": data.data?.wbcValueFlag,
                        "neutrophilsValue": data.data?.neutrophilsValue,
                        "neutrophilsValueFlag": data.data?.neutrophilsValueFlag,
                        "lymphocytesValue": data.data?.lymphocytesValue,
                        "lymphocytesValueFlag": data.data?.lymphocytesValueFlag,
                        "eosinophilsValue": data.data?.eosinophilsValue,
                        "eosinophilsValueFlag": data.data?.eosinophilsValueFlag,
                        "monocytesValue": data.data?.monocytesValue,
                        "monocytesValueFlag": data.data?.monocytesValueFlag,
                        "basophilsValue": data.data?.basophilsValue,
                        "basophilsValueFlag": data.data?.basophilsValueFlag,
                        "heamoglobinValue": data.data?.heamoglobinValue,
                        "heamoglobinValueFlag": data.data?.heamoglobinValueFlag,
                        "rbcValue": data.data?.rbcValue,
                        "rbcValueFlag": data.data?.rbcValueFlag,
                        "htcpvcValue": data.data?.htcpvcValue,
                        "htcpvcValueFlag": data.data?.htcpvcValueFlag,
                        "mcvValue": data.data?.mcvValue,
                        "mcvValueFlag": data.data?.mcvValueFlag,
                        "mchValue": data.data?.mchValue,
                        "mchValueFlag": data.data?.mchValueFlag,
                        "mchcValue": data.data?.mchcValue,
                        "mchcValueFlag": data.data?.mchcValueFlag,
                        "plateletValue": data.data?.plateletValue,
                        "plateletValueFlag": data.data?.plateletValueFlag,
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

                <Form.Item label="Total WBC Count" style={{ marginBottom: 0 }}>
                    <Form.Item
                        name="wbcValue"
                        rules={[{ required: true }]}
                        style={{ display: 'inline-block', width: '200px' }}
                    >
                        <Input addonAfter="x10^(9) /L" placeholder="value" onChange={(e) => setFlag('wbcValue', e.target.value, investigationFieldsResults?.content, normalRangeRulesResults?.content, data.patientDOB, data.patientGender, form)} />
                    </Form.Item>
                    <div className="flex-row items-center inline-flex">
                        <Form.Item
                            name="wbcValueFlag"
                            style={{ display: 'inline-block', width: '150px', margin: '0 20px' }}
                        >
                            <Select placeholder="flag" mode="tags" maxCount={1}>
                                <Option value="Low">Low</Option>
                                <Option value="High">High</Option>
                            </Select>
                        </Form.Item>
                        <span>
                            {displayNormalRange('wbcValue', investigationFieldsResults?.content, normalRangeRulesResults?.content, data.patientDOB, data.patientGender)}
                        </span>
                    </div>
                </Form.Item>
                <Form.Item label="Neutrophils" style={{ marginBottom: 0 }}>
                    <Form.Item
                        name="neutrophilsValue"
                        rules={[{ required: true }]}
                        style={{ display: 'inline-block', width: '200px' }}
                    >
                        <Input addonAfter="%" placeholder="value" onChange={(e) => setFlag('neutrophilsValue', e.target.value, investigationFieldsResults?.content, normalRangeRulesResults?.content, data.patientDOB, data.patientGender, form)} />
                    </Form.Item>
                    <div className="flex-row items-center inline-flex">
                        <Form.Item
                            name="neutrophilsValueFlag"
                            style={{ display: 'inline-block', width: '150px', margin: '0 20px' }}
                        >
                            <Select placeholder="flag" mode="tags" maxCount={1}>
                                <Option value="Low">Low</Option>
                                <Option value="High">High</Option>
                            </Select>
                        </Form.Item>
                        <span>
                            {displayNormalRange('neutrophilsValue', investigationFieldsResults?.content, normalRangeRulesResults?.content, data.patientDOB, data.patientGender)}
                        </span>
                    </div>
                </Form.Item>
                <Form.Item label="Lymphocytes" style={{ marginBottom: 0 }}>
                    <Form.Item
                        name="lymphocytesValue"
                        rules={[{ required: true }]}
                        style={{ display: 'inline-block', width: '200px' }}
                    >
                        <Input addonAfter="%" placeholder="value" onChange={(e) => setFlag('lymphocytesValue', e.target.value, investigationFieldsResults?.content, normalRangeRulesResults?.content, data.patientDOB, data.patientGender, form)} />
                    </Form.Item>
                    <div className="flex-row items-center inline-flex">
                        <Form.Item
                            name="lymphocytesValueFlag"
                            style={{ display: 'inline-block', width: '150px', margin: '0 20px' }}
                        >
                            <Select placeholder="flag" mode="tags" maxCount={1}>
                                <Option value="Low">Low</Option>
                                <Option value="High">High</Option>
                            </Select>
                        </Form.Item>
                        <span>
                            {displayNormalRange('lymphocytesValue', investigationFieldsResults?.content, normalRangeRulesResults?.content, data.patientDOB, data.patientGender)}
                        </span>
                    </div>
                </Form.Item>
                <Form.Item label="Eosinophils" style={{ marginBottom: 0 }}>
                    <Form.Item
                        name="eosinophilsValue"
                        rules={[{ required: true }]}
                        style={{ display: 'inline-block', width: '200px' }}
                    >
                        <Input addonAfter="%" placeholder="value" onChange={(e) => setFlag('eosinophilsValue', e.target.value, investigationFieldsResults?.content, normalRangeRulesResults?.content, data.patientDOB, data.patientGender, form)} />
                    </Form.Item>
                    <div className="flex-row items-center inline-flex">
                        <Form.Item
                            name="eosinophilsValueFlag"
                            style={{ display: 'inline-block', width: '150px', margin: '0 20px' }}
                        >
                            <Select placeholder="flag" mode="tags" maxCount={1}>
                                <Option value="Low">Low</Option>
                                <Option value="High">High</Option>
                            </Select>
                        </Form.Item>
                        <span>
                            {displayNormalRange('eosinophilsValue', investigationFieldsResults?.content, normalRangeRulesResults?.content, data.patientDOB, data.patientGender)}
                        </span>
                    </div>
                </Form.Item>
                <Form.Item label="Monocytes" style={{ marginBottom: 0 }}>
                    <Form.Item
                        name="monocytesValue"
                        rules={[{ required: true }]}
                        style={{ display: 'inline-block', width: '200px' }}
                    >
                        <Input addonAfter="%" placeholder="value" onChange={(e) => setFlag('monocytesValue', e.target.value, investigationFieldsResults?.content, normalRangeRulesResults?.content, data.patientDOB, data.patientGender, form)} />
                    </Form.Item>
                    <div className="flex-row items-center inline-flex">
                        <Form.Item
                            name="monocytesValueFlag"
                            style={{ display: 'inline-block', width: '150px', margin: '0 20px' }}
                        >
                            <Select placeholder="flag" mode="tags" maxCount={1}>
                                <Option value="Low">Low</Option>
                                <Option value="High">High</Option>
                            </Select>
                        </Form.Item>
                        <span>
                            {displayNormalRange('monocytesValue', investigationFieldsResults?.content, normalRangeRulesResults?.content, data.patientDOB, data.patientGender)}
                        </span>
                    </div>
                </Form.Item>
                <Form.Item label="Basophils" style={{ marginBottom: 0 }}>
                    <Form.Item
                        name="basophilsValue"
                        rules={[{ required: true }]}
                        style={{ display: 'inline-block', width: '200px' }}
                    >
                        <Input addonAfter="%" placeholder="value" onChange={(e) => setFlag('basophilsValue', e.target.value, investigationFieldsResults?.content, normalRangeRulesResults?.content, data.patientDOB, data.patientGender, form)} />
                    </Form.Item>
                    <div className="flex-row items-center inline-flex">
                        <Form.Item
                            name="basophilsValueFlag"
                            style={{ display: 'inline-block', width: '150px', margin: '0 20px' }}
                        >
                            <Select placeholder="flag" mode="tags" maxCount={1}>
                                <Option value="Low">Low</Option>
                                <Option value="High">High</Option>
                            </Select>
                        </Form.Item>
                        <span>
                            {displayNormalRange('basophilsValue', investigationFieldsResults?.content, normalRangeRulesResults?.content, data.patientDOB, data.patientGender)}
                        </span>
                    </div>
                </Form.Item>
                <Form.Item label="Haemoglobin" style={{ marginBottom: 0 }}>
                    <Form.Item
                        name="heamoglobinValue"
                        rules={[{ required: true }]}
                        style={{ display: 'inline-block', width: '200px' }}
                    >
                        <Input addonAfter="g/dl" placeholder="value" onChange={(e) => setFlag('heamoglobinValue', e.target.value, investigationFieldsResults?.content, normalRangeRulesResults?.content, data.patientDOB, data.patientGender, form)} />
                    </Form.Item>
                    <div className="flex-row items-center inline-flex">
                        <Form.Item
                            name="heamoglobinValueFlag"
                            style={{ display: 'inline-block', width: '150px', margin: '0 20px' }}
                        >
                            <Select placeholder="flag" mode="tags" maxCount={1}>
                                <Option value="Low">Low</Option>
                                <Option value="High">High</Option>
                            </Select>
                        </Form.Item>
                        <span>
                            {displayNormalRange('heamoglobinValue', investigationFieldsResults?.content, normalRangeRulesResults?.content, data.patientDOB, data.patientGender)}
                        </span>
                    </div>
                </Form.Item>
                <Form.Item label="RBC Count" style={{ marginBottom: 0 }}>
                    <Form.Item
                        name="rbcValue"
                        rules={[{ required: true }]}
                        style={{ display: 'inline-block', width: '200px' }}
                    >
                        <Input addonAfter="x10^(12) /L" placeholder="value" onChange={(e) => setFlag('rbcValue', e.target.value, investigationFieldsResults?.content, normalRangeRulesResults?.content, data.patientDOB, data.patientGender, form)} />
                    </Form.Item>
                    <div className="flex-row items-center inline-flex">
                        <Form.Item
                            name="rbcValueFlag"
                            style={{ display: 'inline-block', width: '150px', margin: '0 20px' }}
                        >
                            <Select placeholder="flag" mode="tags" maxCount={1}>
                                <Option value="Low">Low</Option>
                                <Option value="High">High</Option>
                            </Select>
                        </Form.Item>
                        <span>
                            {displayNormalRange('rbcValue', investigationFieldsResults?.content, normalRangeRulesResults?.content, data.patientDOB, data.patientGender)}
                        </span>
                    </div>
                </Form.Item>
                <Form.Item label="HCT / PCV" style={{ marginBottom: 0 }}>
                    <Form.Item
                        name="htcpvcValue"
                        rules={[{ required: true }]}
                        style={{ display: 'inline-block', width: '200px' }}
                    >
                        <Input addonAfter="%" placeholder="value" onChange={(e) => setFlag('htcpvcValue', e.target.value, investigationFieldsResults?.content, normalRangeRulesResults?.content, data.patientDOB, data.patientGender, form)} />
                    </Form.Item>
                    <div className="flex-row items-center inline-flex">
                        <Form.Item
                            name="htcpvcValueFlag"
                            style={{ display: 'inline-block', width: '150px', margin: '0 20px' }}
                        >
                            <Select placeholder="flag" mode="tags" maxCount={1}>
                                <Option value="Low">Low</Option>
                                <Option value="High">High</Option>
                            </Select>
                        </Form.Item>
                        <span>
                            {displayNormalRange('htcpvcValue', investigationFieldsResults?.content, normalRangeRulesResults?.content, data.patientDOB, data.patientGender)}
                        </span>
                        <Button color="default" variant="filled" onClick={calculateFields}>Calculate</Button>
                    </div>
                </Form.Item>
                <Form.Item label="MCV" style={{ marginBottom: 0 }}>
                    <Form.Item
                        name="mcvValue"
                        rules={[{ required: true }]}
                        style={{ display: 'inline-block', width: '200px' }}
                    >
                        <Input addonAfter="fl" placeholder="value" onChange={(e) => setFlag('mcvValue', e.target.value, investigationFieldsResults?.content, normalRangeRulesResults?.content, data.patientDOB, data.patientGender, form)} />
                    </Form.Item>
                    <div className="flex-row items-center inline-flex">
                        <Form.Item
                            name="mcvValueFlag"
                            style={{ display: 'inline-block', width: '150px', margin: '0 20px' }}
                        >
                            <Select placeholder="flag" mode="tags" maxCount={1}>
                                <Option value="Low">Low</Option>
                                <Option value="High">High</Option>
                            </Select>
                        </Form.Item>
                        <span>
                            {displayNormalRange('mcvValue', investigationFieldsResults?.content, normalRangeRulesResults?.content, data.patientDOB, data.patientGender)}
                        </span>
                    </div>
                </Form.Item>
                <Form.Item label="MCH" style={{ marginBottom: 0 }}>
                    <Form.Item
                        name="mchValue"
                        rules={[{ required: true }]}
                        style={{ display: 'inline-block', width: '200px' }}
                    >
                        <Input addonAfter="pg" placeholder="value" onChange={(e) => setFlag('mchValue', e.target.value, investigationFieldsResults?.content, normalRangeRulesResults?.content, data.patientDOB, data.patientGender, form)} />
                    </Form.Item>
                    <div className="flex-row items-center inline-flex">
                        <Form.Item
                            name="mchValueFlag"
                            style={{ display: 'inline-block', width: '150px', margin: '0 20px' }}
                        >
                            <Select placeholder="flag" mode="tags" maxCount={1}>
                                <Option value="Low">Low</Option>
                                <Option value="High">High</Option>
                            </Select>
                        </Form.Item>
                        <span>
                            {displayNormalRange('mchValue', investigationFieldsResults?.content, normalRangeRulesResults?.content, data.patientDOB, data.patientGender)}
                        </span>
                    </div>
                </Form.Item>
                <Form.Item label="MCHC" style={{ marginBottom: 0 }}>
                    <Form.Item
                        name="mchcValue"
                        rules={[{ required: true }]}
                        style={{ display: 'inline-block', width: '200px' }}
                    >
                        <Input addonAfter="g/dl" placeholder="value" onChange={(e) => setFlag('mchcValue', e.target.value, investigationFieldsResults?.content, normalRangeRulesResults?.content, data.patientDOB, data.patientGender, form)} />
                    </Form.Item>
                    <div className="flex-row items-center inline-flex">
                        <Form.Item
                            name="mchcValueFlag"
                            style={{ display: 'inline-block', width: '150px', margin: '0 20px' }}
                        >
                            <Select placeholder="flag" mode="tags" maxCount={1}>
                                <Option value="Low">Low</Option>
                                <Option value="High">High</Option>
                            </Select>
                        </Form.Item>
                        <span>
                            {displayNormalRange('mchcValue', investigationFieldsResults?.content, normalRangeRulesResults?.content, data.patientDOB, data.patientGender)}
                        </span>
                    </div>
                </Form.Item>
                <Form.Item label="Platelet count" style={{ marginBottom: 0 }}>
                    <Form.Item
                        name="plateletValue"
                        rules={[{ required: true }]}
                        style={{ display: 'inline-block', width: '200px' }}
                    >
                        <Input addonAfter="x10^(9) /L" placeholder="value" onChange={(e) => setFlag('plateletValue', e.target.value, investigationFieldsResults?.content, normalRangeRulesResults?.content, data.patientDOB, data.patientGender, form)} />
                    </Form.Item>
                    <div className="flex-row items-center inline-flex">
                        <Form.Item
                            name="plateletValueFlag"
                            style={{ display: 'inline-block', width: '150px', margin: '0 20px' }}
                        >
                            <Select placeholder="flag" mode="tags" maxCount={1}>
                                <Option value="Low">Low</Option>
                                <Option value="High">High</Option>
                            </Select>
                        </Form.Item>
                        <span>
                            {displayNormalRange('plateletValue', investigationFieldsResults?.content, normalRangeRulesResults?.content, data.patientDOB, data.patientGender)}
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

export default FBCForm;