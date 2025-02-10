"use client";

import { Card } from "antd";

const { Meta } = Card;

export default function PatientAnalysis() {

    return (
        <div>
            <Card className="apply_shadow">
                <Meta
                    title="Patient Analysis"
                    description="Review and analyze data of a single patient"
                />

                <div className="mt-5">

                </div>
            </Card>

        </div>
    );
}