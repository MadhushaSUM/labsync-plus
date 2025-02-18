"use client";

import useRegisterUser from '@/hooks/api/auth/useRegisterUser';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Card } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';


export default function LoginPage() {
    const router = useRouter();

    const { mutateAsync: createNewUser, isPending } = useRegisterUser();
    const onFinish = async (values: any) => {
        const user = {
            name: values.name,
            email: values.email,
            password: values.password,
        };

        const promise = createNewUser(user);

        toast.promise(promise, {
            loading: "Registering new user",
        });
        try {
            const res = await (await promise).json();
            toast.success(res.message);
        } catch (error: any) {
            toast.error(error.toString())
        }
    };

    return (
        <div>
            <Card
                hoverable
                style={{ width: 300, height: 480 }}
            >
                <div className="h-[440px] flex flex-col justify-between">
                    <div>
                        <Image
                            src="/LabSync-Plus_logo_wide.png"
                            width={300}
                            height={100}
                            alt="labsync - plus banner"
                        />
                    </div>
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
                                name="name"
                                label="Name"
                                rules={[{ required: true, message: 'Please input your name!' }]}
                            >
                                <Input prefix={<UserOutlined />} placeholder="Name" />
                            </Form.Item>

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
                                    Register
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                    <div>
                        <Button
                            type="link"
                            block
                            onClick={() => router.push("/auth/login")}
                        >
                            Already registered?
                        </Button>
                    </div>
                </div>
            </Card >
        </div >
    );
}