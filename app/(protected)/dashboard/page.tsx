"use client";

import { Card } from "antd";

const { Meta } = Card;

export default function Dashboard() {
    return (
        <div>
            <Card
                className="apply_shadow"
            >
                <Meta
                    title="LabSync - Plus"
                    description="Your trusted medical laboratory management software"
                />
            </Card>

        </div>
    );
}