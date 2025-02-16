"use client";

import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import {
    Button,
    Card,
    Form,
    Input,
} from "antd";

import { Suspense, useEffect, useState } from "react";
import { BranchType } from "@/types/entity/branch";
import useUpdateBranch from "@/hooks/api/branches/useUpdateBranch";
import { useCurrentUser } from "@/hooks/api/auth/useCurrentUser";

const { Meta } = Card;

function BranchForm() {
    const router = useRouter();
    const currentUser = useCurrentUser();
    useEffect(() => {
        if (currentUser?.role != "admin") {
            toast.error("Admin privileges required!");
            router.push("/dashboard");
            return;
        }
    },[currentUser]);

    const [form] = Form.useForm();
    const [oldBranch, setOldBranch] = useState<BranchType>();

    const searchParams = useSearchParams();

    const data = searchParams.get("data");
    useEffect(() => {
        if (!data) {
            router.push("/settings/branches");
            return;
        }

        const parsedData = JSON.parse(data)
        setOldBranch(parsedData);

        form.setFieldsValue({
            "name": parsedData.name,
            "address": parsedData.address,
            "telephone": parsedData.telephone,
        });
    }, [data, router, form]);

    const { mutateAsync: updateBranch, isPending } = useUpdateBranch();

    async function onSubmit(values: any) {
        if (oldBranch?.id) {
            const savingBranch: BranchType = {
                name: values.name,
                address: values.address,
                telephone: values.telephone,
                version: oldBranch.version,
            };

            const promise = updateBranch({ branchId: oldBranch.id, branchData: savingBranch });

            toast.promise(promise, {
                loading: "Updating branch data",
                success: "Branch has been updated"
            });
            try {
                await promise;
                router.push("/settings/branches");
            } catch (error: any) {
                toast.error(error.toString())
            }
        }
    }

    if (currentUser?.role != "admin") return null; 
    if (!data) return null;

    return (
        <div>
            <div>
                <Card
                    className="apply_shadow"
                >
                    <Meta
                        title="Edit Branch"
                        description={`Edit branch ${"branch details here"}`}
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
                            <Form.Item
                                label="Name"
                                name="name"
                                required
                                rules={[{ required: true, message: 'Please input branch name!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Address"
                                name="address"
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="telephone"
                                label="Telephone"
                                rules={[{min:12, max:12, message:"Enter a valid phone number!"}]}
                            >
                                <Input placeholder="+94..."/>
                            </Form.Item>

                            <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                                <div className="flex flex-row gap-5">
                                    <Button type="primary" htmlType="submit">
                                        Update Branch
                                    </Button>
                                    <Button type="default" onClick={() => router.push("/settings/branches")}>Go Back</Button>
                                </div>
                            </Form.Item>
                        </Form>
                    </div>
                </Card>
            </div>
        </div>
    );
}


export default function EditBranch() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <BranchForm />
        </Suspense>
    );
}