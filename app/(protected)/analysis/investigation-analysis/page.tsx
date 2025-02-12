"use client";

import { ScrollArea } from "@/components/custom-ui/ScrollArea";
import { Button, Card, DatePicker, Form, List, Modal } from "antd";
import { Chart as ChartJS, ArcElement, ChartData, Chart, ChartTypeRegistry, Point, BubbleDataPoint } from "chart.js";
import { Doughnut, getElementAtEvent } from "react-chartjs-2";
import { formatISO } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import ShowData from "@/components/custom-ui/ShowData";
import useGetInvestigationAnalysis from "@/hooks/api/analysis/useGetInvestigationAnalysis";

const { Meta } = Card;
Chart.register(ArcElement);

export default function InvestigationAnalysis() {
    const [form] = Form.useForm();
    const chartRef = useRef<ChartJS<'doughnut'>>(null);

    const [analysisParams, setAnalysisParams] = useState<{ initial: boolean, startDate?: string, endDate?: string }>({ initial: true });
    const { data, error, isLoading } = useGetInvestigationAnalysis({ initial: analysisParams.initial, startDate: analysisParams?.startDate, endDate: analysisParams?.endDate });
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
            });
        } else {
            setAnalysisParams({
                initial: false,
                startDate: undefined,
                endDate: undefined,
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