"use client";

import { ScrollArea } from "@/components/custom-ui/ScrollArea";
import { Button, Card, DatePicker, Form, List, Modal, Select, Spin } from "antd";
import { Chart as ChartJS, ArcElement, ChartData, Chart, ChartTypeRegistry, Point, BubbleDataPoint } from "chart.js";
import { Doughnut, getElementAtEvent } from "react-chartjs-2";
import { formatISO } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import ShowData from "@/components/custom-ui/ShowData";
import useGetInvestigationAnalysis from "@/hooks/api/analysis/useGetInvestigationAnalysis";
import { useCurrentUser } from "@/hooks/api/auth/useCurrentUser";
import { useRouter } from "next/navigation";
import { BranchType } from "@/types/entity/branch";
import useGetBranches from "@/hooks/api/branches/useGetBranches";

const { Meta } = Card;
const {Option} = Select;
Chart.register(ArcElement);

export default function InvestigationAnalysis() {
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
    const chartRef = useRef<ChartJS<'doughnut'>>(null);

    const [analysisParams, setAnalysisParams] = useState<{ initial: boolean, startDate?: string, endDate?: string, branchId?: number }>({ initial: true });

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


    const { data, error, isLoading } = useGetInvestigationAnalysis({ initial: analysisParams.initial, startDate: analysisParams?.startDate, endDate: analysisParams?.endDate, branchId: analysisParams.branchId });
    if (error) {
        toast.error(error.message);
    }
    const handleFormSubmit = async (values: any) => {
        setListData([]);
        if (values.dateRange) {
            setAnalysisParams({
                initial: false,
                startDate: values.dateRange[0],
                endDate: values.dateRange[1],
                branchId: Number(values.branch),
            });
        } else {
            setAnalysisParams({
                initial: false,
                startDate: undefined,
                endDate: undefined,
                branchId: Number(values.branch),
            });
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
        if (data?.content) {
            const chartData: ChartData<'doughnut'> = {
                datasets: [
                    {
                        data: data.content.pieChartData.map((item) => item.count),
                        backgroundColor: generateRandomColors(data.content.pieChartData.length),

                    }
                ],
                labels: data.content.pieChartData.map((item) => item.testName),
            }
            setChartData(chartData);
        }
    }, [data?.content]);

    const [listData, setListData] = useState<{
        date: Date,
        refNumber?: number,
        testRegisterId: number,
        data?: object,
    }[]>([]);
    const onClick = (event: any) => {
        const { current: chart } = chartRef;

        if (!chart) {
            return;
        }

        if (data?.content) {
            const castChart = chart as unknown as Chart<
                keyof ChartTypeRegistry,
                (number | Point | [number, number] | BubbleDataPoint | null)[],
                unknown
            >;
            const elements = getElementAtEvent(castChart, event);
            if (elements.length > 0) {
                const index = elements[0].index;
                setListData(data.content.pieChartData[index].tests);
            }
        }
    }

    const showDataInModal = (data: any) => {
        Modal.info({
            width: "50%",
            title: 'Investigation data',
            content: (
                <div>
                    <ShowData data={data} />
                </div>
            ),
            onOk() { },
        });
    }

    if (currentUser?.role != "admin") return null;

    return (
        <div>
            <Card className="apply_shadow">
                <Meta
                    title="Investigation Analysis"
                    description="Review and analyze data of a all investigations done within a time period"
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

                    {data?.content &&
                        <div className="flex flex-row gap-2 items-center justify-center mt-5">
                            <div style={{ width: "50%", height: "50%" }}>
                                {chartData && <Doughnut ref={chartRef} data={chartData} options={{ cutout: "80%" }} onClick={onClick} />}
                            </div>
                            <div>
                                <ScrollArea
                                    className="ring-1 ring-gray-300/20 rounded-lg"
                                >
                                    <List<{
                                        date: Date,
                                        refNumber?: number,
                                        testRegisterId: number,
                                        data?: object,
                                    }>
                                        size="small"
                                        style={{ height: "calc(100vh - 400px)", width: "300px" }}
                                        dataSource={listData}
                                        renderItem={(item) => {
                                            return (
                                                <List.Item>
                                                    <div className='flex flex-col gap-1 w-full'>
                                                        <p>{`Date: ${formatISO(item.date, { representation: "date" })}`}</p>
                                                        <p>{`Reference no.: ${item.refNumber}`}</p>
                                                        <Button
                                                            color='primary'
                                                            variant='filled'
                                                            size='small'
                                                            onClick={() => showDataInModal(item.data)}
                                                        >
                                                            View
                                                        </Button>
                                                    </div>
                                                </List.Item>
                                            )
                                        }}
                                    />
                                </ScrollArea>
                            </div>
                        </div>
                    }

                </div>
            </Card>
        </div>
    );
}