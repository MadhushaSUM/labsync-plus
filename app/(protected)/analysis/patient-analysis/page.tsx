"use client";

import { ScrollArea } from "@/components/custom-ui/ScrollArea";
import useGetPatients from "@/hooks/api/useGetPatients";
import { calculateAge } from "@/lib/date-utils";
import { PatientType } from "@/types/entity/patient";
import { Button, Card, DatePicker, Form, List, Modal, Select, Spin } from "antd";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData, Chart, ChartTypeRegistry, Point, BubbleDataPoint } from "chart.js";
import { Doughnut, getElementAtEvent } from "react-chartjs-2";
import { formatISO } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import useGetPatientAnalysis from "@/hooks/api/analysis/useGetPatientAnalysis";
import ShowData from "@/components/custom-ui/ShowData";

ChartJS.register(ArcElement, Tooltip, Legend);

const { Meta } = Card;
const { Option } = Select;

export default function PatientAnalysis() {
    const chartRef = useRef<ChartJS<'doughnut'>>(null);
    const [form] = Form.useForm();

    // Patient
    const [patientSearchPhrase, setPatientSearchPhrase] = useState("");
    const [selectedPatient, setSelectedPatient] = useState<PatientType>();

    const { data: patientResults, error: patientFetchError, isLoading: patientLoading } = useGetPatients({ limit: 5, skip: 0, search: patientSearchPhrase });
    if (patientFetchError) {
        toast.error(patientFetchError.message);
    }
    const onPatientSearch = (value: string) => {
        setPatientSearchPhrase(value);
    }
    const handlePatientSelect = (value: number) => {
        setSelectedPatient(patientResults?.content.find(patient => patient.id == value));
    }

    const [analysisParams, setAnalysisParams] = useState<{ patientId?: number, startDate?: string, endDate?: string }>();
    const { data, error, isLoading } = useGetPatientAnalysis({ patientId: analysisParams?.patientId, startDate: analysisParams?.startDate, endDate: analysisParams?.endDate });
    if (error) {
        toast.error(error.message);
    }
    const handleFormSubmit = async (values: any) => {
        setListData([]);

        if (selectedPatient?.id) {
            if (values.dateRange) {
                setAnalysisParams({
                    patientId: selectedPatient.id,
                    startDate: values.dateRange[0],
                    endDate: values.dateRange[1],
                });
            } else {
                setAnalysisParams({
                    patientId: selectedPatient.id,
                    startDate: undefined,
                    endDate: undefined,
                });
            }
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
                    title="Patient Analysis"
                    description="Review and analyze data of a single patient"
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
                            <Form.Item
                                label="Patient"
                                name="patient"
                                required
                                rules={[{ required: true, message: 'Please select a patient!' }]}
                            >
                                <Select
                                    showSearch
                                    allowClear
                                    placeholder="Search for a patient"
                                    onSearch={onPatientSearch}
                                    onSelect={handlePatientSelect}
                                    onClear={() => setSelectedPatient(undefined)}
                                    notFoundContent={patientLoading ? <Spin size="small" /> : "No patients found"}
                                    filterOption={false}
                                    style={{ width: 300 }}
                                    value={selectedPatient?.id}
                                >
                                    {patientResults && patientResults.content.map((patient) => (
                                        <Option key={patient.id} value={patient.id}>
                                            {patient.name} [{calculateAge(patient.date_of_birth)}]
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
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
                                                        <p>{`Date: ${formatISO(item.date, { representation: 'date' })}`}</p>
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