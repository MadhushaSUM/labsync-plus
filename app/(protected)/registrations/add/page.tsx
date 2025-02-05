"use client";

import { Card } from "antd";

const { Meta } = Card;

export default function AddRegistration() {

    return (
        <div>
            <div>
                <Card
                    className="apply_shadow"
                >
                    <Meta
                        title="Add Registration"
                        description="Add new registration to the database"
                    />
                </Card>
            </div>
        </div>
    )
}