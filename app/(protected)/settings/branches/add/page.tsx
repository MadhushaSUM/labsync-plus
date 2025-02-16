"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
    Button,
    Card,
    Form,
    Input,
} from "antd";
import useAddBranch from "@/hooks/api/branches/useAddBranch";
import { BranchType } from "@/types/entity/branch";
import { useCurrentUser } from "@/hooks/api/auth/useCurrentUser";
import { useEffect } from "react";

const { Meta } = Card;

export default function AddBranch() {
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

    const { mutateAsync: createNewBranch, isPending } = useAddBranch();

    async function onSubmit(values: BranchType) {
        const savingBranch: BranchType = {
            name: values.name,
            address: values.address,
            telephone: values.telephone,
            version: 1,
        };

        const promise = createNewBranch(savingBranch);

        toast.promise(promise, {
            loading: "Adding a branch",
            success: "Branch has been added",
        });
        try {
            await promise;
            router.push("/settings/branches");
        } catch (error: any) {
            toast.error(error.toString())
        }
    }

    if (currentUser?.role != "admin") return null; 

    return (
        <div>
            <div>
                <Card
                    className="apply_shadow"
                >
                    <Meta
                        title="Add Branch"
                        description="Add new branch laboratory to the database"
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
                                rules={[{ min: 12, max: 12, message: "Enter a valid phone number!" }]}
                            >
                                <Input placeholder="+94..." />
                            </Form.Item>

                            <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                                <div className="flex flex-row gap-5">
                                    <Button type="primary" htmlType="submit">
                                        Add Branch
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