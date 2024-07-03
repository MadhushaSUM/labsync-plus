
"use client";

import BreadCrumbService from "@/components/breadcrumb/BreadcrumbService";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function NormalRangeRules() {
    const breadcrumbArr = [
        {
            name: "Home",
            link: "/dashboard"
        }
    ];
    const currentPageName = "Normal range rules";

    return (
        <div>
            <div>
                <Card className="apply_shadow">
                    <CardHeader>
                        <CardTitle>Normal range rules</CardTitle>
                        <CardDescription>
                            Setup your normal range rules here
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>

            <BreadCrumbService breadcrumbArr={breadcrumbArr} currentPageName={currentPageName} />

            <Card>
                <CardContent>
                    
                </CardContent>
            </Card>
        </div>
    );
}