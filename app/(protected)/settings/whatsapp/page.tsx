"use client";

import { useCurrentUser } from "@/hooks/api/auth/useCurrentUser";
import { Button, Card, Form, Input, Switch } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import useUpdateConfig from "@/hooks/api/configs/useUpdateConfig";
import useGetConfig from "@/hooks/api/configs/useGetConfig";

const { Meta } = Card;
const { Password } = Input;

export default function WhatsAppSettings() {
    const router = useRouter();
    const currentUser = useCurrentUser();
    useEffect(() => {
        if (currentUser?.role != "admin") {
            toast.error("Admin privileges required!");
            router.push("/dashboard");
            return;
        }
    }, [currentUser]);

    const [form] = Form.useForm();

    const { data, error, isLoading } = useGetConfig(1);
    if (error) {
        toast.error(error.message);
    }

    useEffect(() => {
        if (data) {
            form.setFieldsValue({
                enabled: data.content?.configuration.enabled,
                API_URL: data.content?.configuration.WHATSAPP_API_URL,
                ACCESS_TOKEN: data.content?.configuration.WHATSAPP_ACCESS_TOKEN,
            });
        }
    }, [data]);

    const { mutateAsync: updateConfig, isPending } = useUpdateConfig();
    const onSubmit = async (values: any) => {
        const config = {
            enabled: values.enabled,
            WHATSAPP_API_URL: values.API_URL,
            WHATSAPP_ACCESS_TOKEN: values.ACCESS_TOKEN,
        }
        const promise = updateConfig({ config: config, configId: 1 });

        toast.promise(promise, {
            loading: "Updating WhatsApp configuration",
            success: "WhatsApp configuration has been updated"
        });
        try {
            await promise;
        } catch (error: any) {
            toast.error(error.toString())
        }
    }

    if (currentUser?.role != "admin") return null;


    return (
        <div>
            <Card className="apply_shadow">
                <Meta
                    title="WhatsApp Configuration"
                    description="Enable and setup WhatsApp configurations"
                />
                <div className="mt-5">
                    <Form
                        form={form}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 14 }}
                        layout="horizontal"
                        style={{ maxWidth: 600 }}
                        onFinish={onSubmit}
                        disabled={isPending || isLoading}
                    >
                        <Form.Item
                            label="Enable"
                            name="enabled"
                        >
                            <Switch />
                        </Form.Item>

                        <Form.Item
                            label="API URL"
                            name="API_URL"
                        >
                            <Password
                                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            />
                        </Form.Item>

                        <Form.Item
                            label="ACCESS TOKEN"
                            name="ACCESS_TOKEN"
                        >
                            <Password
                                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                            <div className="flex flex-row gap-5">
                                <Button type="primary" htmlType="submit">
                                    Update Config
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
            </Card>
        </div>
    )
}