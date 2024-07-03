'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Toggle } from "./ui/toggle";
import { useRouter } from "next/navigation";

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

    const handleMenuItemClick = (e: React.MouseEvent<HTMLElement>) => {
        switch (e.currentTarget.id) {
            case "btnPatientManagement":
                router.push("/patient_management");
                break;
            case "btnDoctorManagement":
                router.push("/doctor_management");
                break;
            case "btnInvestigationRegistration":
                router.push("/investigation_registration");
                break;
            case "btnPatientAnalysis":
                router.push("/patient_analysis");
                break;
            case "btnInvestigationAnalysis":
                router.push("/investigation_analysis");
                break;
            case "btnNormalRangeRules":
                router.push("/normal_range_rules");
                break;
            default:
                break;
        }
    };

    return (
        <div className="transition-all duration-300 ease-in-out h-full" style={{ width: `${sidebarSize}rem` }}>
            <div className="flex flex-col h-full">
                <ScrollArea className="flex-grow">
                    <div className="p-2">
                        <Accordion type="single" collapsible={true}>
                            <AccordionItem value="item-1">
                                <AccordionTrigger><DeskIcon className="AccordionChevron" />Operations</AccordionTrigger>
                                <AccordionContent className="cursor-pointer ml-5" id="btnInvestigationRegistration" onClick={handleMenuItemClick}>
                                    Investigation management
                                </AccordionContent>
                                <AccordionContent className="cursor-pointer ml-5" id="btnPatientManagement" onClick={handleMenuItemClick}>
                                    Patient management
                                </AccordionContent>
                                <AccordionContent className="cursor-pointer ml-5" id="btnDoctorManagement" onClick={handleMenuItemClick}>
                                    Doctor management
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        <Accordion type="single" collapsible={true}>
                            <AccordionItem value="item-2">
                                <AccordionTrigger><QueryStatsIcon className="AccordionChevron" />Analysis</AccordionTrigger>
                                <AccordionContent className="cursor-pointer ml-5" id="btnPatientAnalysis" onClick={handleMenuItemClick}>
                                    Patient analysis
                                </AccordionContent>
                                <AccordionContent className="cursor-pointer ml-5" id="btnInvestigationAnalysis" onClick={handleMenuItemClick}>
                                    Investigation analysis
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        <Accordion type="single" collapsible={true}>
                            <AccordionItem value="item-3">
                                <AccordionTrigger><ConstructionIcon className="AccordionChevron" />Settings</AccordionTrigger>
                                <AccordionContent className="cursor-pointer ml-5">Page settings</AccordionContent>
                                <AccordionContent className="cursor-pointer ml-5" id="btnNormalRangeRules" onClick={handleMenuItemClick}>
                                    Normal range rules
                                </AccordionContent>
                                <AccordionContent className="cursor-pointer ml-5">Age preferences</AccordionContent>
                                <AccordionContent className="cursor-pointer ml-5">Integrations</AccordionContent>
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
