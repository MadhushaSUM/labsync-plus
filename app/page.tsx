"use client";

import { Button, Card } from "antd";
import { LoginOutlined } from '@ant-design/icons';
import { useRouter } from "next/navigation";

const { Meta } = Card;

export default function Home() {
    const router = useRouter();

    return (
        <div className="flex justify-center items-center h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400/30 to-blue-800/30">
            <Card
                hoverable
                style={{ width: 300, height:480 }}
                cover={
                    <img
                        alt="example"
                        src="https://demo.ou.ac.lk/wp-content/uploads/2024/10/Medical-Laboratory-Sciences.jpg"
                    />
                }
                actions={[
                    <Button
                        icon={<LoginOutlined />}
                        key="login-btn"
                        onClick={() => router.push("/auth/login")}
                    >
                        Login
                    </Button>
                ]}
            >
                <Meta
                    title="LabSync - Plus"
                    description="Your trusted medical laboratory management software"

                />
            </Card>
        </div>
    );
}
