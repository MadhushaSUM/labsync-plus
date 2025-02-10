"use client";

import { PatientType } from "@/types/entity/patient";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import useUpdatePatient from "@/hooks/api/useUpdatePatient";
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
import { Suspense, useEffect, useState } from "react";

const { Meta } = Card;

type AddPatientFormType = Omit<PatientType, "whatsapp_number"> & {
    whatsapp_number: {
        prefix: string;
        number: string;
    }
}

function PatientForm() {
    const router = useRouter();
    const [form] = Form.useForm();
    const [oldPatient, setOldPatient] = useState<PatientType>();

    const searchParams = useSearchParams();

    const data = searchParams.get("data");
    useEffect(() => {
        if (!data) {
            router.push("/patients");
            return;
        }

        const parsedData = JSON.parse(data)
        setOldPatient(parsedData);

        form.setFieldsValue({
            "name": parsedData.name,
            "gender": parsedData.gender,
            "date_of_birth": dayjs(parsedData.date_of_birth),
        });

        if (parsedData.whatsapp_number) {
            form.setFieldsValue({
                "whatsapp_number": {
                    "prefix": parsedData.whatsapp_number.substring(0, 3),
                    "number": parsedData.whatsapp_number.substring(3),
                }
            });
        }
    }, [data, router, form]);

    const { mutateAsync: updatePatient, isPending } = useUpdatePatient();

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
        if (oldPatient?.id) {
            const savingPatient: PatientType = {
                name: values.name,
                date_of_birth: values.date_of_birth,
                gender: values.gender,
                version: oldPatient.version,
            };
            if (values.whatsapp_number.number) {
                savingPatient.whatsapp_number = `${values.whatsapp_number.prefix}${values.whatsapp_number.number}`;
            }

            const promise = updatePatient({ patientId: oldPatient.id, patientData: savingPatient });

            toast.promise(promise, {
                loading: "Updating patient",
                success: "Patient has been updated"
            });
            try {
                await promise;
                router.push("/patients");
            } catch (error: any) {
                toast.error(error.toString())
            }
        }
    }

    if (!data) return null;

    return (
        <div>
            <div>
                <Card
                    className="apply_shadow"
                >
                    <Meta
                        title="Edit Patient"
                        description={`Edit patient ${"patient details here"}`}
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
                                        Update Patient
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

export default function EditPatient() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PatientForm />
        </Suspense>
    );
}