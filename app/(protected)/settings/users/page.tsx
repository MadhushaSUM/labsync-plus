"use client";

import { Card } from "antd";

const { Meta } = Card;

export default function UsersSettings() {
    return (
        <div>
            <Card className="apply_shadow">
                <Meta
                    title="Manage Users"
                    description="Approve user registrations and assign users to branches"
                />
                <div className="mt-5">

                </div>
            </Card>
        </div>
    )
}