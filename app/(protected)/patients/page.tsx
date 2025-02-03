"use client";

import BreadCrumbService from "@/components/breadcrumb/BreadcrumbService";
import { Card, Button } from "antd";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const { Meta } = Card;

export default function PatientManagement() {
    const router = useRouter();

    return (
        <div>
            <Card className="apply_shadow">
                <Meta
                    title="Patient management"
                    description="Manage your patient details here"
                />
            </Card>
        </div>
    );
}