"use client";

import { Button, Card, DatePicker, Form, Select, Spin } from "antd";
import { useEffect, useRef, useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    ChartData,
    BarElement,
    ArcElement,
} from 'chart.js';
import { Bar, Doughnut, getElementAtEvent } from 'react-chartjs-2';
import { formatISO } from "date-fns";
import useGetFinancialAnalysis from "@/hooks/api/analysis/useGetFinancialAnalysis";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/api/auth/useCurrentUser";
import { BranchType } from "@/types/entity/branch";
import useGetBranches from "@/hooks/api/branches/useGetBranches";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const { Option } = Select;

const { Meta } = Card;

export default function FinancialAnalysis() {
    const router = useRouter();
    const currentUser = useCurrentUser();
    useEffect(() => {
        if (currentUser?.role != "admin") {
            toast.error("Admin privileges required!");
            router.push("/dashboard");
            return;
        }
    }, [currentUser]);

    const [form] = Form.useForm();
    const chartRef = useRef<ChartJS<"bar">>(null);

    // Branch
    const [branchSearchPhrase, setBranchSearchPhrase] = useState("");
    const [selectedBranch, setSelectedBranch] = useState<BranchType>();

    const { data: branchResults, error: branchFetchError, isLoading: branchLoading } = useGetBranches({ limit: 5, skip: 0, search: branchSearchPhrase });
    if (branchFetchError) {
        toast.error(branchFetchError.message);
    }
    const onBranchSearch = (value: string) => {
        setBranchSearchPhrase(value);
    }
    const handleBranchSelect = (value: number) => {
        setSelectedBranch(branchResults?.content.find(branch => branch.id == value));
    }

    const [analysisParams, setAnalysisParams] = useState<{ step?: string, startDate?: string, endDate?: string, branchId?: number }>();
    const { data, error, isLoading } = useGetFinancialAnalysis({ step: analysisParams?.step, startDate: analysisParams?.startDate, endDate: analysisParams?.endDate, branchId: analysisParams?.branchId });
    if (error) {
        toast.error(error.message);
    }
    const handleFormSubmit = async (values: any) => {
        try {
            setPieChartData(undefined);

            if (values.dateRange) {
                setAnalysisParams({
                    step: values.step,
                    startDate: values.dateRange[0],
                    endDate: values.dateRange[1],
                    branchId: Number(values.branch),
                });
            } else {
                setAnalysisParams({
                    step: values.step,
                    startDate: undefined,
                    endDate: undefined,
                    branchId: Number(values.branch),
                });
            }
        } catch (error) {
            console.error(error);
        }
    }

    const [lineData, setLineData] = useState<ChartData<"bar">>();
    useEffect(() => {
        if (data?.content) {
            setLineData({
                labels: data.content.periods.map(item => formatISO(item.endDate, { representation: "date" })),
                datasets: [
                    {
                        label: "Total",
                        data: data.content.periods.map(item => item.periodCost),
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    },
                    {
                        label: "Paid",
                        data: data.content.periods.map(item => item.periodPaid),
                        borderColor: 'rgb(53, 162, 235)',
                        backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    }
                ],
            })
        }
    }, [data?.content]);

    const [pieChartData, setPieChartData] = useState<{
        startDate: Date;
        endDate: Date;
        periodCost: number;
        periodPaid: number;
        tests: {
            testId: number;
            testName: string;
            testTotalCost: number;
        }[]
    }>();
    const onClick = (event: any) => {
        const { current: chart } = chartRef;

        if (!chart) {
            return;
        }

        if (data?.content) {
            setPieChartData(data.content.periods[getElementAtEvent(chart, event)[0].index]);
        }
    }

    const [chartData, setChartData] = useState<ChartData<'doughnut'>>();
    const generateRandomColors = (length: number): string[] => {
        return Array.from({ length }, () => {
            const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
            return randomColor;
        });
    };
    useEffect(() => {
        if (pieChartData) {
            setChartData({
                labels: pieChartData.tests.map(item => item.testName),
                datasets: [
                    {
                        data: pieChartData.tests.map(item => item.testTotalCost),
                        backgroundColor: generateRandomColors(pieChartData.tests.length),
                    }
                ]
            });
        }
    }, [pieChartData]);

    if (currentUser?.role != "admin") return null;

    return (
        <div>
            <Card className="apply_shadow">
                <Meta
                    title="Financial Analysis"
                    description="Review and analyze your earnings within a time period"
                />

                <div className="mt-5">
                    <div>
                        <Form
                            layout="inline"
                            form={form}
                            disabled={isLoading}
                            style={{ maxWidth: 'none' }}
                            onFinish={handleFormSubmit}
                        >
                            <Form.Item label="Date range" name="dateRange">
                                <DatePicker.RangePicker
                                    placeholder={['Start date', 'End date']}
                                    allowEmpty={[false, false]}
                                />
                            </Form.Item>
                            <Form.Item
                                name="step"
                                label="Step"
                                rules={[{ required: true }]}
                            >
                                <Select style={{ width: 100 }}>
                                    <Option value="daily">Daily</Option>
                                    <Option value="weekly">Weekly</Option>
                                    <Option value="monthly">Monthly</Option>
                                    <Option value="annually">Annually</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label="Branch"
                                name="branch"
                            >
                                <Select
                                    showSearch
                                    allowClear
                                    placeholder="Search for a branch"
                                    onSearch={onBranchSearch}
                                    onSelect={handleBranchSelect}
                                    onClear={() => setSelectedBranch(undefined)}
                                    notFoundContent={branchLoading ? <Spin size="small" /> : "No branch found"}
                                    filterOption={false}
                                    value={selectedBranch?.id}
                                    style={{ width: 150 }}
                                >
                                    {branchResults && branchResults.content.map((branch) => (
                                        <Option key={branch.id} value={branch.id}>
                                            {branch.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item>
                                <Button loading={isLoading} type="primary" htmlType="submit">
                                    Search
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>

                    {data?.content && lineData &&
                        <div className="mt-5">
                            <Bar
                                ref={chartRef}
                                data={lineData}
                                onClick={onClick}
                                options={{
                                    scales: {
                                        y: {
                                            title: {
                                                text: "Income (Rs.)",
                                                display: true,
                                            }
                                        },
                                        x: {
                                            title: {
                                                text: "Period end date",
                                                display: true,
                                            }
                                        }
                                    }
                                }}
                            />
                        </div>
                    }
                    {pieChartData &&
                        <div className="flex justify-center items-center mt-5">
                            <div className="w-1/2">
                                {chartData && <Doughnut data={chartData} options={{
                                    cutout: "80%", plugins: {
                                        legend: {
                                            position: 'bottom'
                                        }
                                    }
                                }} />}
                            </div>
                        </div>
                    }
                </div>
            </Card>
        </div>
    )
}