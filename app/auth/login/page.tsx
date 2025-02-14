"use client";

import { login } from '@/actions/login';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input, Card } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';


export default function LoginPage() {
    const router = useRouter();
    const [isPending, setIsPending] = useState<boolean>(false);

    const onFinish = async (values: any) => {
        try {
            setIsPending(true);
            const res = await login(values);
            if (res) {
                toast.error(res.error);
            }
        } catch (error: any) {
            toast.error(error.toString())
        } finally {
            setIsPending(false);
        }
    };

    return (
        <div>
            <Card
                hoverable
                style={{ width: 300, height: 480, alignContent: 'center' }}
            >
                <div>
                    <Form
                        name="login"
                        initialValues={{ remember: true }}
                        style={{ maxWidth: 360 }}
                        onFinish={onFinish}
                        disabled={isPending}
                        layout='vertical'
                    >
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'Please input a valid email!' }]}
                        >
                            <Input prefix={<MailOutlined />} placeholder="Email" />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
                        </Form.Item>

                        <Form.Item>
                            <Button loading={isPending} block type="primary" htmlType="submit">
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                    <Button
                        type="link"
                        block
                        onClick={() => router.push("/auth/register")}
                    >
                        Register
                    </Button>
                </div>
                <div>
                </div>
            </Card>
        </div>
    );
}