"use client";

import BreadCrumbService from "@/components/breadcrumb/BreadcrumbService";
import InvestigationPieChart from "@/components/investigation-analysis/InvestigationPieChart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useGetTestAnalysisData from "@/hooks/api/investigationData/useGetTestAnalysisData";
import { useState } from "react";
import { toast } from "sonner";

export default function InvestigationAnalysis() {
    const breadcrumbArr = [
        {
            name: "Home",
            link: "/dashboard"
        }
    ];
    const currentPageName = "Investigation analysis";

    const { data, error, setData, loading, setSearchTestAnalysisQuery } = useGetTestAnalysisData();
    const [selectedStartDate, setSelectedStartDate] = useState<string | null>(null);
    const [selectedEndDate, setSelectedEndDate] = useState<string | null>(null);
    if (error) {
        toast.error(error.message);
    }

    const handleSearch = () => {
        if (selectedStartDate && selectedEndDate) {
            setData([]);
            setSearchTestAnalysisQuery(
                {
                    startDate: selectedStartDate,
                    endDate: selectedEndDate
                }
            );
        }
    }

    const loadChart = () => {
        if (!data) {
            return (<></>);
        } else {
            return <InvestigationPieChart data={data} />
        }
    }

    return (
        <div>
            <div>
                <Card className="apply_shadow">
                    <CardHeader>
                        <CardTitle>Investigation analysis</CardTitle>
                        <CardDescription>
                            Review and analyze data of a all investigations done within a time period
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>

            <BreadCrumbService breadcrumbArr={breadcrumbArr} currentPageName={currentPageName} />

            <div>
                <Card className="apply_shadow">
                    <CardContent>
                        <div className="flex flex-row gap-5 mt-5">
                            <Input
                                placeholder="Select a start date"
                                type="date"
                                className="w-[200px]"
                                onChange={e => setSelectedStartDate(e.target.value)}
                            />
                            <Input
                                placeholder="Select a end date"
                                type="date"
                                className="w-[200px]"
                                onChange={e => setSelectedEndDate(e.target.value)}
                            />
                            <Button
                                onClick={handleSearch}
                            >
                                Search
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {loadChart()}
        </div>
    );
}