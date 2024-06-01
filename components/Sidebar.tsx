'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Toggle } from "./ui/toggle";
import { useRouter } from "next/navigation";
import { useAccordion } from "@/context/AccordionContext";

import ConstructionIcon from '@mui/icons-material/Construction';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import DeskIcon from '@mui/icons-material/Desk';

interface SidebarProps {
    toggleSidebar: () => void;
    isExpanded: boolean;
    sidebarSize: number;
}

export default function Sidebar({ toggleSidebar, isExpanded, sidebarSize }: Readonly<SidebarProps>) {
    const router = useRouter();
    const { expandedAccordion, setExpandedAccordion } = useAccordion();

    const handleMenuItemClick = (e: React.MouseEvent<HTMLElement>) => {
        switch (e.currentTarget.id) {
            case "btnPatientManagement":
                router.push("/patientManagement");
                break;
            case "btnDoctorManagement":
                router.push("/doctor_management");
                break;
            case "btnNewInvestigationRegister":
                router.push("/newInvestigationRegister");
                break;
            default:
                break;
        }
    };

    const handleAccordionChange = (value: string) => {
        setExpandedAccordion(value === expandedAccordion ? null : value);
    };

    return (
        <div className="transition-all duration-300 ease-in-out h-full" style={{ width: `${sidebarSize}rem` }}>
            <div className="flex flex-col h-full">
                <ScrollArea className="flex-grow">
                    <div className="p-2">
                        <Accordion type="single" collapsible={true} value={expandedAccordion} onValueChange={handleAccordionChange}>
                            <AccordionItem value="item-1">
                                <AccordionTrigger><DeskIcon className="AccordionChevron" />Operations</AccordionTrigger>
                                <AccordionContent>Add a test to list</AccordionContent>
                                <AccordionContent>Add test results</AccordionContent>
                                <AccordionContent className="cursor-pointer" id="btnPatientManagement" onClick={handleMenuItemClick}>
                                    Patient management
                                </AccordionContent>
                                <AccordionContent className="cursor-pointer" id="btnDoctorManagement" onClick={handleMenuItemClick}>
                                    Doctor management
                                </AccordionContent>
                                <AccordionContent>Print reports</AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        <Accordion type="single" collapsible={true} value={expandedAccordion} onValueChange={handleAccordionChange}>
                            <AccordionItem value="item-2">
                                <AccordionTrigger><QueryStatsIcon className="AccordionChevron" />Analysis</AccordionTrigger>
                                <AccordionContent>Patient analysis</AccordionContent>
                                <AccordionContent>Test analysis</AccordionContent>
                                <AccordionContent>Financial analysis</AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        <Accordion type="single" collapsible={true} value={expandedAccordion} onValueChange={handleAccordionChange}>
                            <AccordionItem value="item-3">
                                <AccordionTrigger><ConstructionIcon className="AccordionChevron" />Settings</AccordionTrigger>
                                <AccordionContent>Page settings</AccordionContent>
                                <AccordionContent>Flag settings</AccordionContent>
                                <AccordionContent>Age preferences</AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        <Toggle onClick={toggleSidebar}>
                            {isExpanded ? "<<" : ">>"}
                        </Toggle>
                    </div>
                    <ScrollBar />
                </ScrollArea>
            </div>
        </div>
    );
}
