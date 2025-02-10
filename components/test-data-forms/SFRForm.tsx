import useGetDoctors from "@/hooks/api/doctors/useGetDoctors";
import useUpdateInvestigationData from "@/hooks/api/investigationData/useUpdateInvestigationData";
import { DoctorType } from "@/types/entity/doctor";
import { DataEmptyTests } from "@/types/entity/investigation";
import { Button, Divider, Form, Input, Select, Spin } from "antd";
import { useState } from "react";
import { toast } from "sonner";

const { Option } = Select;

const SFRForm = ({ data, clearScreen }: { data: DataEmptyTests, clearScreen: (testRegisterId: number, testId: number) => void }) => {
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
                reducingSubs: values.reducingSubs,
                aoc: values.aoc,
                redCells: values.redCells,
                pusCells: values.pusCells,
                epithelialCells: values.epithelialCells,
                fatGlobules: values.fatGlobules,
                mucus: values.mucus,
                vegFibrous: values.vegFibrous,
                yeast: values.yeast,
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
                Stool Full Report
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
                        "colour": data.data ? data.data?.colour : "Greenish yellow",
                        "appearance": data.data ? data.data?.appearance : "Semi solid",
                        "reducingSubs": data.data ? data.data?.reducingSubs : "Nil",
                        "aoc": data.data ? data.data?.aoc : "Not detected",
                        "redCells": data.data ? data.data?.redCells : "Nil",
                        "pusCells": data.data ? data.data?.pusCells : "Nil",
                        "epithelialCells": data.data ? data.data?.epithelialCells : "Nil",
                        "fatGlobules": data.data ? data.data?.fatGlobules : "Nil",
                        "mucus": data.data ? data.data?.mucus : "Nil",
                        "vegFibrous": data.data ? data.data?.vegFibrous : "Nil",
                        "yeast": data.data ? data.data?.yeast : "Nil",
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
                        <Option value="Greenish yellow">Greenish yellow</Option>
                        <Option value="Pale yellow">Pale yellow</Option>
                        <Option value="Yellow">Yellow</Option>
                        <Option value="Pale brown">Pale brown</Option>
                        <Option value="Brown">Brown</Option>
                        <Option value="Pale black">Pale black</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="appearance"
                    label="Appearance"
                    rules={[{ required: true }]}
                >
                    <Select mode="tags" maxCount={1} style={{ width: 300 }} >
                        <Option value="Watery">Watery</Option>
                        <Option value="Semi solid">Semi solid</Option>
                        <Option value="Solid">Solid</Option>
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
                    name="aoc"
                    label="AOC"
                    rules={[{ required: true }]}
                >
                    <Select mode="tags" maxCount={1} style={{ width: 300 }}>
                        <Option value="Not detected">Not detected</Option>
                        <Option value="Detected">Detected</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="redCells"
                    label="Red Cells"
                    rules={[{ required: true }]}
                >
                    <Select mode="tags" maxCount={1} style={{ width: 300 }}>
                        <Option value="Nil">Nil</Option>
                        <Option value="Occasional">Occasional</Option>
                        <Option value="1 - 3">1 - 3</Option>
                        <Option value="2 - 5">2 - 5</Option>
                        <Option value="Mod. field full">Mod. field full</Option>
                        <Option value="Field full">Field full</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="pusCells"
                    label="Pus Cells"
                    rules={[{ required: true }]}
                >
                    <Select mode="tags" maxCount={1} style={{ width: 300 }} >
                        <Option value="Nil">Nil</Option>
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
                        <Option value="Nil">Nil</Option>
                        <Option value="+">+</Option>
                        <Option value="++">++</Option>
                        <Option value="+++">+++</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="fatGlobules"
                    label="Fat Globules"
                    rules={[{ required: true }]}
                >
                    <Select mode="tags" maxCount={1} style={{ width: 300 }}>
                        <Option value="Nil">Nil</Option>
                        <Option value="+">+</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="mucus"
                    label="Mucus"
                    rules={[{ required: true }]}
                >
                    <Select mode="tags" maxCount={1} style={{ width: 300 }}>
                        <Option value="Nil">Nil</Option>
                        <Option value="+">+</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="vegFibrous"
                    label="Veg. Fibrous"
                    rules={[{ required: true }]}
                >
                    <Select mode="tags" maxCount={1} style={{ width: 300 }}>
                        <Option value="Nil">Nil</Option>
                        <Option value="+">+</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="yeast"
                    label="Yeast"
                    rules={[{ required: true }]}
                >
                    <Select mode="tags" maxCount={1} style={{ width: 300 }}>
                        <Option value="Nil">Nil</Option>
                        <Option value="+">+</Option>
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

export default SFRForm;