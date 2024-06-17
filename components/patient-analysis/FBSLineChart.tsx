import { investigationData } from "@/types/entity/InvestigationData";
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
import { Separator } from "@radix-ui/react-select";

interface FBSLineChartProps {
    data: investigationData[];
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
                text: 'Chart.js Line Chart',
            },
        },
    };

    const labels = ['January', 'February', 'March', 'April'];

    const cahrtData = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: [1, 2, 5, 3],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };

    const tags = Array.from({ length: 50 }).map(
        (_, i, a) => `v1.2.0-beta.${a.length - i}`
    )

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
                                    {tags.map((tag) => (
                                        <>
                                            <div key={tag} className="text-sm">
                                                {tag}
                                            </div>
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