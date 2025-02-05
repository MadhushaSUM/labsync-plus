"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
    Button,
    Card,
    Form,
    Input,
} from "antd";
import { DoctorType } from "@/types/entity/doctor";
import useAddDoctor from "@/hooks/api/doctors/useAddDoctor";

const { Meta } = Card;

export default function AddDoctor() {
    const router = useRouter();
    const [form] = Form.useForm();

    const { mutateAsync: createNewPatient, isPending } = useAddDoctor();

    async function onSubmit(values: DoctorType) {
        const savingDoctor: DoctorType = {
            name: values.name,
            version: 1,
        };

        const promise = createNewPatient(savingDoctor);

        toast.promise(promise, {
            loading: "Adding a doctor",
            success: "Doctor has been added",
        });
        try {
            await promise;
            router.push("/doctors");
        } catch (error: any) {
            toast.error(error.toString())
        }
    }

    return (
        <div>
            <div>
                <Card
                    className="apply_shadow"
                >
                    <Meta
                        title="Add Doctor"
                        description="Add new doctor to the database"
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
                            <Form.Item<DoctorType>
                                label="Name"
                                name="name"
                                required
                                rules={[{ required: true, message: 'Please input doctor name!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                                <div className="flex flex-row gap-5">
                                    <Button type="primary" htmlType="submit">
                                        Add Doctor
                                    </Button>
                                    <Button type="default" onClick={() => router.push("/doctors")}>Go Back</Button>
                                </div>
                            </Form.Item>
                        </Form>
                    </div>
                </Card>
            </div>
        </div>
    );
}