import { InvestigationRegisterType } from "@/types/entity/investigationRegister";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, ChartEvent, ActiveElement } from 'chart.js';
import { Doughnut } from "react-chartjs-2";
import { Card, CardContent } from "../ui/card";
import { investigations } from "@/lib/Investigations";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "../ui/scroll-area";
import { useState } from "react";
import { InvestigationType } from "@/types/entity/investigation";
import { Separator } from "../ui/separator";
import { register } from "module";
import InvestigationHistoryEntry from "./InvestigationHistoryEntry";

interface InvestigationPieChartProps {
    data: InvestigationRegisterType[]
}

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    Title
);

export default function InvestigationPieChart({ data }: InvestigationPieChartProps) {
    const [clickedInvestigation, setClickedInvestigation] = useState<InvestigationType>();


    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Investigation distribution',
            },
        },
        cutout: '60%',
        onClick: (event: ChartEvent, elements: ActiveElement[]) => {
            if (elements.length > 0) {
                const chartElement = elements[0];
                const index = chartElement.index;
                const label = pie_data.labels[index];

                const inv = investigations.find(inv => inv.name === label);
                setClickedInvestigation(inv);
            }
        },
    };

    const investigationCount = [];
    for (const inv of investigations) {
        let count = 0;
        for (const enty of data) {
            if (enty.investigations.map(inv => inv.id).includes(inv.id)) count++;
        }
        investigationCount.push(count);
    }

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const backgroundColors = investigations.map(() => getRandomColor());

    const pie_data = {
        labels: investigations.map(investigation => investigation.name),
        datasets: [{
            label: 'count',
            data: investigationCount,
            backgroundColor: backgroundColors,
            hoverOffset: 5,
        }]
    };

    return (
        <div >
            <Card className="apply_shadow mt-5">
                <CardContent>

                    <div className="flex flex-row h-[500px]">
                        <div className="w-2/3 justify-center flex">
                            <Doughnut
                                data={pie_data}
                                options={options}
                            />
                        </div>
                        <div className="w-1/3 p-5">
                            <ScrollArea className="h-full rounded-md border">
                                <div className="p-4">
                                    <h4 className="mb-4 text-sm font-medium leading-none">Investigation records</h4>
                                    {
                                        clickedInvestigation && data
                                            .filter(register => register.investigations.map(inv => inv.name).includes(clickedInvestigation.name))
                                            .map(register => (
                                                (
                                                    <>
                                                        <InvestigationHistoryEntry
                                                            patientName={register.patient.name}
                                                            date={register.registeredDate}
                                                            key={register.id!} 
                                                        />
                                                        <Separator />
                                                    </>
                                                )
                                            ))
                                    }
                                </div>
                            </ScrollArea>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}