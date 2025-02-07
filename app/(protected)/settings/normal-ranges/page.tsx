"use client";

import useGetInvestigations from "@/hooks/api/investigations/useGetInvestigations";
import { Card, TableColumnsType } from "antd";
import { useState } from "react";
import { toast } from "sonner";

const { Meta } = Card;



export default function NormalRangesSettings() {

    return (
        <div>
            <div>
                <Card className="apply_shadow">
                    <Meta
                        title="Normal Ranges"
                        description="Manage normal ranges"
                    />
                    <div className="mt-5">

                    </div>
                </Card>

            </div>

        </div>
    );
}