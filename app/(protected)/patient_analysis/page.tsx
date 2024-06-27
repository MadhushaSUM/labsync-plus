"use client";

import BreadCrumbService from "@/components/breadcrumb/BreadcrumbService";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { PatientType } from "@/types/entity/patient";
import { CheckIcon } from "lucide-react";
import useSearchPatientsByName from "@/hooks/api/useSearchPatientsByName";
import { cn } from "@/lib/utils";
import { calculateAge } from "@/lib/date-utils";
import { Input } from "@/components/ui/input";
import { investigations } from "@/lib/Investigations";
import { InvestigationType } from "@/types/entity/investigation";
import useGetInvestigationDataAnalysis from "@/hooks/api/investigationData/useGetPatientDataPatientAnalysis";
import { PatientAnalysisDataRequestDto } from "@/types/Dto/InvestigationData";
import FBSLineChart from "@/components/patient-analysis/FBSLineChart";

export default function PatientAnalysis() {
    const breadcrumbArr = [
        {
            name: "Home",
            link: "/dashboard"
        }
    ];
    const currentPageName = "Patient analysis";

    const [openPatientCombo, setOpenPatientCombo] = useState<boolean>(false);
    const [openInvestigationCombo, setOpenInvestigationCombo] = useState<boolean>(false);

    const [loadingData, setLoadingData] = useState<boolean>(false);

    const [selectedPatient, setSelectedPatient] = useState<PatientType | null>(null);
    const [selectedInvestigation, setSelectedInvestigation] = useState<InvestigationType | null>(null);
    const [selectedFromDate, setSelectedFromDate] = useState<string | null>(null);
    const [selectedToDate, setSelectedToDate] = useState<string | null>(null);

    const [invSearchQuery, setInvSearchQuery] = useState<string>("");

    const { searchPatientData, searchPatientQuery, setSearchPatientQuery, loadingSearchPatients } = useSearchPatientsByName();
    const { data, setData, error, setSearchPatientAnalysisQuery } = useGetInvestigationDataAnalysis();

    const handleSearchPatientData = () => {
        setData(null);
        const searchQuery: PatientAnalysisDataRequestDto = {
            patientId: selectedPatient?.id!,
            investigationId: selectedInvestigation?.id!,
            startDate: selectedFromDate!,
            endDate: selectedToDate!
        }

        setSearchPatientAnalysisQuery(searchQuery);
        
    };    

    const loadChart = () => {
        if (!data || loadingData) {
            return (<></>);
        }

        switch (selectedInvestigation?.id) {
            case 1:
                return (
                    <FBSLineChart data={data}/>
                );
        
            default:
                return (<></>);
        }
    }

    return (
        <div>
            <div>
                <Card className="apply_shadow">
                    <CardHeader>
                        <CardTitle>Patient analysis</CardTitle>
                        <CardDescription>
                            Review and analyze data of a single patient
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>

            <BreadCrumbService breadcrumbArr={breadcrumbArr} currentPageName={currentPageName} />

            <div>
                <Card className="apply_shadow">
                    <CardContent>
                        <div className="py-5">
                            <Popover open={openPatientCombo} onOpenChange={setOpenPatientCombo}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={openPatientCombo}
                                        className="w-[200px] justify-between"
                                        disabled={loadingData}
                                    >
                                        {selectedPatient
                                            ? selectedPatient.name
                                            : "Select patient..."}
                                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <CommandInput
                                            placeholder={"Search patient..."}
                                            className="h-9"
                                            value={searchPatientQuery}
                                            onValueChange={(e) => setSearchPatientQuery(e)}
                                        />
                                        <CommandList>
                                            {loadingSearchPatients && <CommandEmpty>Loading...</CommandEmpty>}
                                            {!loadingSearchPatients && searchPatientData.length === 0 && <CommandEmpty>No patient found</CommandEmpty>}
                                            <CommandGroup>
                                                {searchPatientData.map((item) => (
                                                    <CommandItem
                                                        key={item.id}
                                                        value={item.name}
                                                        onSelect={(currentValue) => {
                                                            setSelectedPatient(currentValue === selectedPatient?.name ? null : item);
                                                            setOpenPatientCombo(false);
                                                        }}
                                                    >
                                                        {item.name}
                                                        <CheckIcon
                                                            className={cn(
                                                                "ml-auto h-4 w-4",
                                                                selectedPatient?.name === item.name ? "opacity-100" : "opacity-0"
                                                            )}
                                                        />
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </CardContent>
                </Card>
            </div>
            {
                selectedPatient && (
                    <div className="mt-5">
                        <Card className="apply_shadow pt-2">
                            <CardContent>
                                <div className="flex flex-col gap-1 mt-2">
                                    <div className="flex flex-row">
                                        <div className="text-sm w-44">Patient name</div>
                                        <div className="font-bold text-sm">{selectedPatient.name}</div>
                                    </div>
                                    <div className="flex flex-row">
                                        <div className="text-sm w-44">Patient age</div>
                                        <div className="font-bold text-sm">{calculateAge(selectedPatient.dateOfBirth)}</div>
                                    </div>
                                    <div className="flex flex-row">
                                        <div className="text-sm w-44">Contact number</div>
                                        <div className="font-bold text-sm">{selectedPatient.contactNumber}</div>
                                    </div>
                                    <div className="flex flex-row">
                                        <div className="text-sm w-44">Gender</div>
                                        <div className="font-bold text-sm">{selectedPatient.gender}</div>
                                    </div>
                                    <div className="flex flex-row">
                                        <div className="text-sm w-44">Patient ID</div>
                                        <div className="font-bold text-sm">{selectedPatient.id}</div>
                                    </div>
                                </div>

                                <div className="flex flex-row gap-5 mt-5">
                                    <div className="flex flex-row w-full justify-between">
                                        <div className="flex flex-row gap-2">
                                            <Popover open={openInvestigationCombo} onOpenChange={setOpenInvestigationCombo}>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        aria-expanded={openInvestigationCombo}
                                                        className="w-[200px] justify-between"
                                                        disabled={loadingData}
                                                    >
                                                        {selectedInvestigation
                                                            ? selectedInvestigation.name
                                                            : "Select investigation..."}
                                                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-[200px] p-0">
                                                    <Command>
                                                        <CommandInput
                                                            placeholder={"Search patient..."}
                                                            className="h-9"
                                                            value={invSearchQuery}
                                                            onValueChange={(e) => setInvSearchQuery(e)}
                                                        />
                                                        <CommandList>
                                                            {investigations.filter(inv => inv.name.includes(invSearchQuery)).length === 0 && <CommandEmpty>No investigation found</CommandEmpty>}
                                                            <CommandGroup>
                                                                {investigations.filter(inv => inv.name.includes(invSearchQuery)).map((item) => (
                                                                    <CommandItem
                                                                        key={item.id}
                                                                        value={item.name}
                                                                        onSelect={(currentValue) => {
                                                                            setSelectedInvestigation(currentValue === selectedInvestigation?.name ? null : item);
                                                                            setOpenInvestigationCombo(false);
                                                                        }}
                                                                    >
                                                                        {item.name}
                                                                        <CheckIcon
                                                                            className={cn(
                                                                                "ml-auto h-4 w-4",
                                                                                selectedPatient?.name === item.name ? "opacity-100" : "opacity-0"
                                                                            )}
                                                                        />
                                                                    </CommandItem>
                                                                ))}
                                                            </CommandGroup>
                                                        </CommandList>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                            <Input className="w-60" placeholder="From date" type="date" onChange={e => setSelectedFromDate(e.target.value)} />
                                            <Input className="w-60" placeholder="To date" type="date" onChange={e => setSelectedToDate(e.target.value)} />
                                        </div>
                                        <Button onClick={handleSearchPatientData}>
                                            Search
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )
            }
            {loadChart()}
        </div>
    );
}