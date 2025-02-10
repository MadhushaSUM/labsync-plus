"use client";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Card, Form, Input } from "antd";
import { Suspense, useEffect, useState } from "react";
import { DoctorType } from "@/types/entity/doctor";
import useUpdateDoctor from "@/hooks/api/doctors/useUpdateDoctor";

const { Meta } = Card;

function DoctorForm() {
    const router = useRouter();
    const [form] = Form.useForm();
    const [oldDoctor, setOldDoctor] = useState<DoctorType>();
    const searchParams = useSearchParams();
    const data = searchParams.get("data");

    useEffect(() => {
        if (!data) {
            router.push("/doctors");
            return;
        }

        const parsedData = JSON.parse(data);
        setOldDoctor(parsedData);
        form.setFieldsValue({
            name: parsedData.name,
        });
    }, [data, router, form]);

    const { mutateAsync: updatePatient, isPending } = useUpdateDoctor();

    async function onSubmit(values: DoctorType) {
        if (oldDoctor?.id) {
            const savingDoctor: DoctorType = {
                name: values.name,
                version: oldDoctor.version,
            };

            const promise = updatePatient({
                doctorId: oldDoctor.id,
                doctorData: savingDoctor
            });

            toast.promise(promise, {
                loading: "Updating doctor",
                success: "Doctor has been updated"
            });

            try {
                await promise;
                router.push("/doctors");
            } catch (error: any) {
                toast.error(error.toString())
            }
        }
    }

    if (!data) return null;

    return (
        <div>
            <Card className="apply_shadow">
                <Meta
                    title="Edit Doctor"
                    description={`Edit doctor ${"doctor details here"}`}
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
                                    Update Doctor
                                </Button>
                                <Button type="default" onClick={() => router.push("/doctors")}>
                                    Go Back
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
            </Card>
        </div>
    );
}

export default function EditDoctor() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DoctorForm />
        </Suspense>
    );
}