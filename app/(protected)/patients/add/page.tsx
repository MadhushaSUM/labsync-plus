"use client";

import useAddPatient from "@/hooks/api/useAddPatient";
import { PatientType } from "@/types/entity/patient";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
    Button,
    Card,
    Space,
    DatePicker,
    Form,
    Input,
    Select,
} from "antd";

import dayjs from "dayjs";
import { calculateDateOfBirth } from "@/lib/date-utils";


const { Meta } = Card;

type AddPatientFormType = Omit<PatientType, "whatsapp_number"> & {
    whatsapp_number: {
        prefix: string;
        number: string;
    }
}

export default function AddPatient() {
    const router = useRouter();
    const [form] = Form.useForm();

    const { mutateAsync: createNewPatient, isPending } = useAddPatient();

    const handleSimpleDateOfBirth = (value: string) => {
        const matchArr = value.match(new RegExp(/^(\d+y\s?)?(\d+m\s?)?(\d+d\s?)?$/));
        let years = 0;
        let months = 0;
        let days = 0;

        if (matchArr) {
            if (matchArr[1]) {
                years = Number(matchArr[1].split('y')[0]);
            }
            if (matchArr[2]) {
                months = Number(matchArr[2].split('m')[0]);
            }
            if (matchArr[3]) {
                days = Number(matchArr[3].split('d')[0]);
            }

            const dateOfBirth = calculateDateOfBirth(years, months, days);
            form.setFieldValue("date_of_birth", dayjs(dateOfBirth));
        }
    }

    async function onSubmit(values: AddPatientFormType) {
        const savingPatient: PatientType = {
            name: values.name,
            date_of_birth: values.date_of_birth,
            gender: values.gender,
            version: 1,
        };
        if (values.whatsapp_number.number) {
            savingPatient.whatsapp_number = `${values.whatsapp_number.prefix}${values.whatsapp_number.number}`;
        }

        const promise = createNewPatient(savingPatient);

        toast.promise(promise, {
            loading: "Creating a patient",
            success: "Patient has been created",
            error: "Error while creating the patient"
        });
        try {
            await promise;
            router.push("/patients");
        } catch (error) {
            console.error(error);
        }

    }

    return (
        <div>
            <div>
                <Card
                    className="apply_shadow"
                >
                    <Meta
                        title="Add Patient"
                        description="Add new patient to database"
                    />

                    <div className="mt-5">
                        <Form
                            form={form}
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 14 }}
                            layout="horizontal"
                            style={{ maxWidth: 600 }}
                            onFinish={onSubmit}
                            disabled={isPending}
                            initialValues={{ whatsapp_number: { prefix: "+94" } }}
                        >
                            <Form.Item<AddPatientFormType>
                                label="Name"
                                name="name"
                                required
                                rules={[{ required: true, message: 'Please input patient name!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item<AddPatientFormType>
                                label="Gender"
                                name="gender"
                                required
                                rules={[{ required: true, message: 'Please select patient gender!' }]}
                            >
                                <Select>
                                    <Select.Option value="Male">Male</Select.Option>
                                    <Select.Option value="Female">Female</Select.Option>
                                    <Select.Option value="Other">Other</Select.Option>
                                </Select>
                            </Form.Item>

                            <Form.Item<AddPatientFormType>
                                label="Date of birth"
                                style={{ marginBottom: 0 }}
                            >
                                <Space>
                                    <Form.Item
                                        name="simpleDateOfBirth"
                                        rules={[
                                            {
                                                required: false,
                                                pattern: /^(\d+y\s?)?(\d+m\s?)?(\d+d\s?)?$/,
                                                message: "Wrong format!",
                                            },
                                        ]}
                                    >
                                        <Input
                                            style={{ width: 190 }}
                                            placeholder="00y 00m 00d"
                                            onChange={(e) => handleSimpleDateOfBirth(e.target.value)}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        name="date_of_birth"
                                        required
                                        rules={[{ required: true, message: 'Please select patient date of birth!' }]}
                                    >
                                        <DatePicker />
                                    </Form.Item>
                                </Space>
                            </Form.Item>

                            <Form.Item<AddPatientFormType>
                                label="WhatsApp number"
                            >
                                <Space.Compact>
                                    <Form.Item<AddPatientFormType>
                                        name={["whatsapp_number", "prefix"]}
                                        noStyle
                                    >
                                        <Input style={{ width: '20%' }} />
                                    </Form.Item>
                                    <Form.Item<AddPatientFormType>
                                        name={["whatsapp_number", "number"]}
                                        noStyle
                                        hasFeedback
                                        validateDebounce={500}
                                        rules={[{ len: 9, message: 'Please enter a valid contact number!' }]}
                                    >
                                        <Input style={{ width: '80%' }} />
                                    </Form.Item>
                                </Space.Compact>
                            </Form.Item>

                            <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                                <div className="flex flex-row gap-5">
                                    <Button type="primary" htmlType="submit">
                                        Add Patient
                                    </Button>
                                    <Button type="default" onClick={() => router.push("/patients")}>Go Back</Button>
                                </div>
                            </Form.Item>
                        </Form>
                    </div>
                </Card>
            </div>
        </div>
    );
}