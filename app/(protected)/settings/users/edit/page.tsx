"use client";

import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import {
    Button,
    Card,
    Form,
    Input,
    Select,
    Spin,
} from "antd";

import { Suspense, useEffect, useState } from "react";
import { UserType } from "@/types/entity/user";
import useUpdateUser from "@/hooks/api/auth/useUpdateUser";
import { BranchType } from "@/types/entity/branch";
import useGetBranches from "@/hooks/api/branches/useGetBranches";

const { Meta } = Card;
const { Option } = Select;

function UserForm() {
    const router = useRouter();
    const [form] = Form.useForm();
    const [oldUser, setOldUser] = useState<UserType>();

    const searchParams = useSearchParams();

    const data = searchParams.get("data");
    useEffect(() => {
        if (!data) {
            router.push("/settings/users");
            return;
        }

        const parsedData = JSON.parse(data)
        setOldUser(parsedData);

        form.setFieldsValue({
            "name": parsedData.name,
            "role": parsedData.role,
            "branch": parsedData.branch,
            "image": parsedData.image,
        });
    }, [data, router, form]);

    // Branch
    const [branchSearchPhrase, setBranchSearchPhrase] = useState("");
    const [selectedBranch, setSelectedBranch] = useState<BranchType>();

    const { data: branchResults, error: branchFetchError, isLoading: branchLoading } = useGetBranches({ limit: 5, skip: 0, search: branchSearchPhrase });
    if (branchFetchError) {
        toast.error(branchFetchError.message);
    }
    const onBranchSearch = (value: string) => {
        setBranchSearchPhrase(value);
    }
    const handleBranchSelect = (value: number) => {
        setSelectedBranch(branchResults?.content.find(branch => branch.id == value));
    }

    const { mutateAsync: updateUser, isPending } = useUpdateUser();

    async function onSubmit(values: any) {
        if (oldUser?.id) {
            if (selectedBranch?.id) {
                const savingUser: UserType = {
                    id: oldUser.id,
                    name: values.name,
                    email: oldUser.email,
                    role: values.role,
                    branch: selectedBranch.id,
                    version: oldUser.version,
                };

                const promise = updateUser({ userId: oldUser.id, userData: savingUser });

                toast.promise(promise, {
                    loading: "Updating user data",
                    success: "User has been updated"
                });
                try {
                    await promise;
                    router.push("/settings/users");
                } catch (error: any) {
                    toast.error(error.toString())
                }
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
                        title="Edit User"
                        description={`Edit user ${"user details here"}`}
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
                                rules={[{ required: true, message: 'Please input user name!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Role"
                                name="role"
                                required
                                rules={[{ required: true, message: "You must select a role!" }]}
                            >
                                <Select>
                                    <Option value='user'>User</Option>
                                    <Option value='admin'>Admin</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="branch"
                                label="Branch ID"
                                required
                                rules={[{ required: true, message: "You must select a branch id!" }]}
                            >
                                <Select
                                    showSearch
                                    allowClear
                                    placeholder="Search for a branch"
                                    onSearch={onBranchSearch}
                                    onSelect={handleBranchSelect}
                                    onClear={() => setSelectedBranch(undefined)}
                                    notFoundContent={branchLoading ? <Spin size="small" /> : "No branch found"}
                                    filterOption={false}
                                    value={selectedBranch?.id}
                                >
                                    {branchResults && branchResults.content.map((branch) => (
                                        <Option key={branch.id} value={branch.id}>
                                            {branch.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="image"
                                label="Image URL"
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                                <div className="flex flex-row gap-5">
                                    <Button type="primary" htmlType="submit">
                                        Update User
                                    </Button>
                                    <Button type="default" onClick={() => router.push("/settings/users")}>Go Back</Button>
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
            <UserForm />
        </Suspense>
    );
}