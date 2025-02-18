"use client";

import { Button, Card } from "antd";
import { DownloadOutlined } from '@ant-design/icons';
import usePatientPortal from "@/hooks/api/patient-portal/usePatientPortal";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast, Toaster } from "sonner";
import pdfTemplateMapper from "@/lib/pdf/pdfTemplateMapper";

const { Meta } = Card;

function PatientPortalCard() {

    const [queryString, setQueryString] = useState<string>();
    const searchParams = useSearchParams();
    const data = searchParams.get("s");

    useEffect(() => {
        if (!data) {
            toast.error("Invalid request!")
            return;
        }

        setQueryString(data);
    }, [data]);

    const { data: reportData, error, isLoading } = usePatientPortal(queryString);
    if (error) {
        toast.error(error.message);
    }
    const onClickDownload = async () => {
        console.log(reportData?.content);
        
        if (reportData && reportData.content) {
            await pdfTemplateMapper(false, true, reportData.content, reportData.normalRanges);
        }
    }

    return (
        <div className="flex justify-center items-center h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400/30 to-blue-800/30">
            <Card
                hoverable
                style={{ width: 300, height: 480 }}
                cover={
                    <img
                        alt="labsync-plus logo"
                        src="/LabSync-Plus_logo_128.png"
                    />
                }
                actions={[
                    <Button
                        icon={<DownloadOutlined />}
                        key="login-btn"
                        variant="solid"
                        color="default"
                        onClick={onClickDownload}
                        loading={isLoading}
                    >
                        Download Report
                    </Button>
                ]}
            >
                <Toaster richColors position="top-right"/>
                <Meta
                    title="LabSync - Plus - Patient Portal"
                    description="Your trusted medical laboratory management software"

                />
            </Card>
        </div>
    );
}

export default function PatientPortal() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PatientPortalCard />
        </Suspense>
    );
}