import useGetDoctors from "@/hooks/api/doctors/useGetDoctors";
import useUpdateInvestigationData from "@/hooks/api/investigationData/useUpdateInvestigationData";
import { DoctorType } from "@/types/entity/doctor";
import { DataEmptyTests } from "@/types/entity/investigation";
import { Button, Divider, Form, Input, Select, Spin } from "antd";
import { useState } from "react";
import { toast } from "sonner";

const { Option } = Select;

const UFRForm = ({ data, clearScreen }: { data: DataEmptyTests, clearScreen: (testRegisterId: number, testId: number) => void }) => {
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
                colour: values.colour,
                appearance: values.appearance,
                reaction: values.reaction,
                albumin: values.albumin,
                reducingSubs: values.reducingSubs,
                bile: values.bile,
                urobilinogen: values.urobilinogen,
                pusCells: values.pusCells,
                redCells: values.redCells,
                epithelialCells: values.epithelialCells,
                casts: values.casts,
                crystals: values.crystals,
                organisms: values.organisms,
                comment: values.comment,
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

    return (
        <div className="w-full">
            <p className="w-full text-lg text-center m-5 font-bold">
                Urine Full Report
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
                        "colour": data.data ? data.data?.colour : "Pale yellow",
                        "appearance": data.data ? data.data?.appearance : "Clear",
                        "reaction": data.data ? data.data?.reaction : "Acidic",
                        "albumin": data.data ? data.data?.albumin : "Nil",
                        "reducingSubs": data.data ? data.data?.reducingSubs : "Nil",
                        "bile": data.data ? data.data?.bile : "Nil",
                        "urobilinogen": data.data ? data.data?.urobilinogen : "Normal amount",
                        "pusCells": data.data ? data.data?.pusCells : "Occasional",
                        "redCells": data.data ? data.data?.redCells : "Nil",
                        "epithelialCells": data.data ? data.data?.epithelialCells : "+",
                        "casts": data.data ? data.data?.casts : "Not seen",
                        "crystals": data.data ? data.data?.crystals : "Not seen",
                        "organisms": data.data ? data.data?.organisms : "Not seen",
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
                    name="colour"
                    label="Colour"
                    rules={[{ required: true }]}
                >
                    <Select mode="tags" maxCount={1} style={{ width: 300 }}>
                        <Option value="Pale yellow">Pale yellow</Option>
                        <Option value="Yellow">Yellow</Option>
                        <Option value="Dark yellow">Dark yellow</Option>
                        <Option value="Slightly blood stained">Slightly blood stained</Option>
                        <Option value="Grossly blood stained">Grossly blood stained</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="appearance"
                    label="Appearance"
                    rules={[{ required: true }]}
                >
                    <Select mode="tags" maxCount={1} style={{ width: 300 }} >
                        <Option value="Clear">Clear</Option>
                        <Option value="Slightly turbid">Slightly turbid</Option>
                        <Option value="Turbid">Turbid</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="reaction"
                    label="Reaction (pH)"
                    rules={[{ required: true }]}
                >
                    <Select mode="tags" maxCount={1} style={{ width: 300 }}>
                        <Option value="Acidic">Acidic</Option>
                        <Option value="Alkaline">Alkaline</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="albumin"
                    label="Albumin"
                    rules={[{ required: true }]}
                >
                    <Select mode="tags" maxCount={1} style={{ width: 300 }}>
                        <Option value="Nil">Nil</Option>
                        <Option value="Faint trace">Faint trace</Option>
                        <Option value="Trace">Trace</Option>
                        <Option value="+">+</Option>
                        <Option value="++">++</Option>
                        <Option value="+++">+++</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="reducingSubs"
                    label="Reducing substances"
                    rules={[{ required: true }]}
                >
                    <Select mode="tags" maxCount={1} style={{ width: 300 }}>
                        <Option value="Nil">Nil</Option>
                        <Option value="Green (0.5g%)">Green (0.5g%)</Option>
                        <Option value="Yellow (1g%)">Yellow (1g%)</Option>
                        <Option value="Orange (1.5g%)">Orange (1.5g%)</Option>
                        <Option value="Red brick (>2g%)">Red brick (&gt;2g%)</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="bile"
                    label="Bile"
                    rules={[{ required: true }]}
                >
                    <Select mode="tags" maxCount={1} style={{ width: 300 }}>
                        <Option value="Nil">Nil</Option>
                        <Option value="Positive">Positive</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="urobilinogen"
                    label="Urobilinogen"
                    rules={[{ required: true }]}
                >
                    <Select mode="tags" maxCount={1} style={{ width: 300 }}>
                        <Option value="Normal amount">Normal amount</Option>
                        <Option value="Increased">Increased</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="pusCells"
                    label="Pus Cells"
                    rules={[{ required: true }]}
                >
                    <Select mode="tags" maxCount={1} style={{ width: 300 }} >
                        <Option value="Occasional">Occasional</Option>
                        <Option value="1 - 3">1 - 3</Option>
                        <Option value="2 - 5">2 - 5</Option>
                        <Option value="Mod. field full">Mod. field full</Option>
                        <Option value="Field full">Field full</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="redCells"
                    label="Red Cells"
                    rules={[{ required: true }]}
                >
                    <Select mode="tags" maxCount={1} style={{ width: 300 }}>
                        <Option value="Occasional">Occasional</Option>
                        <Option value="1 - 3">1 - 3</Option>
                        <Option value="2 - 5">2 - 5</Option>
                        <Option value="Mod. field full">Mod. field full</Option>
                        <Option value="Field full">Field full</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="epithelialCells"
                    label="Epithelial Cells"
                    rules={[{ required: true }]}
                >
                    <Select mode="tags" maxCount={1} style={{ width: 300 }}>
                        <Option value="+">+</Option>
                        <Option value="++">++</Option>
                        <Option value="+++">+++</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="casts"
                    label="Casts"
                    rules={[{ required: true }]}
                >
                    <Select mode="tags" maxCount={1} style={{ width: 300 }}>
                        <Option value="Not seen">Not seen</Option>
                        <Option value="Granular">Granular</Option>
                        <Option value="Red cell casts">Red cell casts</Option>
                        <Option value="Pus cell casts">Pus cell casts</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="crystals"
                    label="Crystals"
                    rules={[{ required: true }]}
                >
                    <Select mode="tags" maxCount={1} style={{ width: 300 }}>
                        <Option value="Not seen">Not seen</Option>
                        <Option value="CaC₂O₄">CaC₂O₄</Option>
                        <Option value="CaCO₃">CaCO₃</Option>
                        <Option value="Triple PO₄">Triple PO₄</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="organisms"
                    label="Organisms"
                    rules={[{ required: true }]}
                >
                    <Select mode="tags" maxCount={1} style={{ width: 300 }}>
                        <Option value="Not seen">Not seen</Option>
                        <Option value="Yeast cells">Yeast cells</Option>
                    </Select>
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

export default UFRForm;