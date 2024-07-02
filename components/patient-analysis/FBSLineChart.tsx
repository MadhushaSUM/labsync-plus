import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Card, CardContent } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { PatientInvestigationAnalysisDto } from "@/types/Dto/PatientInvestigationAnalysisDto";
import PatientHistoryEntry from './PatientHistoryEntry';
import { Separator } from '../ui/separator';

interface FBSLineChartProps {
    data: PatientInvestigationAnalysisDto;
}

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function FBSLineChart({ data }: FBSLineChartProps) {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Fasting blood sugar history',
            },
        },
    };

    let labels: string[] = [];
    let fbsDataPoints: number[] = [];

    for (const entry of data.data) {
        labels.push(entry.date);
        fbsDataPoints.push(entry.data.fbsValue);
    }

    const cahrtData = {
        labels,
        datasets: [
            {
                label: 'FBS',
                data: fbsDataPoints,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };

    return (
        <div className="mt-5">
            <Card className="apply_shadow">
                <CardContent>
                    <div className="flex flex-row">
                        <div className="w-3/4 h-[450px]">
                            <Line options={options} data={cahrtData} />
                        </div>
                        <div className="w-1/4 p-5">
                            <ScrollArea className="h-[420px] rounded-md border">
                                <div className="p-4">
                                    <h4 className="mb-4 text-sm font-medium leading-none">History</h4>
                                    {data.data.map((entry) => (
                                        <>
                                            <PatientHistoryEntry date={entry.date} key={entry.date} />
                                            <Separator className="my-2" />
                                        </>
                                    ))}
                                </div>
                            </ScrollArea>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}