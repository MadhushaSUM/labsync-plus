
"use client";

import BreadCrumbService from "@/components/breadcrumb/BreadcrumbService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress";
import { investigationFields, investigations } from "@/lib/Investigations";
import { cn } from "@/lib/utils";
import { InvestigationType } from "@/types/entity/investigation";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { CheckIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ScrollArea } from "@/components/ui/scroll-area";
import NormalRangeDataItem from "@/components/normal-range-rules/NormalRangeDataItem";
import { NormalRangeType } from "@/types/commonTypes";

export default function NormalRangeRules() {
    const [openInvestigationCombo, setOpenInvestigationCombo] = useState<boolean>(false);
    const [selectedInvestigation, setSelectedInvestigation] = useState<InvestigationType | null>(null);
    const [openFieldCombo, setOpenFieldCombo] = useState<boolean>(false);
    const [selectedField, setSelectedField] = useState<{ code: string; name: string; } | null>(null);
    const [invSearchQuery, setInvSearchQuery] = useState<string>("");
    const [fieldSearchQuery, setFieldSearchQuery] = useState<string>("");

    const [invFields, setInvFields] = useState<{ code: string; name: string; }[]>([]);
    const [normalRanges, setNormalRanges] = useState<NormalRangeType[]>([]);
    const [maleAgeCoverage, setMaleAgeCoverage] = useState<number>(0);
    const [femaleAgeCoverage, setFemaleAgeCoverage] = useState<number>(0);
    const [otherAgeCoverage, setOtherAgeCoverage] = useState<number>(0);

    const breadcrumbArr = [
        {
            name: "Home",
            link: "/dashboard"
        }
    ];
    const currentPageName = "Normal range rules";

    const filterInvestigationFields = (id: number) => {
        const fieldsOfCurrentInvestigation = investigationFields.find(inv => inv.investigationId === id)?.fields ?? [];
        setInvFields(fieldsOfCurrentInvestigation);
    }

    const addNormalRangeRule = () => {
        const rule: NormalRangeType = {
            id: uuidv4(),
            genders: ["Male", "Female", "Other"],
            ageLowerBound: 0,
            ageUpperBound: 0,
            valueLowerBound: 0,
            valueUpperBound: 0
        }
        setNormalRanges([...normalRanges, rule]);
    }

    const removeNormalRangeRule = (id: string) => {
        setNormalRanges((prevNormalRanges) =>
            prevNormalRanges.filter((rule) => rule.id !== id)
        );
    }

    const updateNormalRangeRule = (id: string, updatedRule: NormalRangeType) => {
        setNormalRanges((prevNormalRanges) =>
            prevNormalRanges.map((rule) => rule.id === id ? updatedRule : rule)
        );
    }

    useEffect(() => {
        let male = 0;
        let female = 0;
        let other = 0;
        for (const range of normalRanges) {
            if (range.genders.includes("Male")) {
                male += (range.ageUpperBound - range.ageLowerBound);
            }
            if (range.genders.includes("Female")) {
                female += (range.ageUpperBound - range.ageLowerBound);
            }
            if (range.genders.includes("Other")) {
                other += (range.ageUpperBound - range.ageLowerBound);
            }
        }
        setMaleAgeCoverage(male);
        setFemaleAgeCoverage(female);
        setOtherAgeCoverage(other);
    }, [normalRanges]);

    const saveNormalRangeRules = () => {
        console.log(normalRanges);
    }

    return (
        <div>
            <div>
                <Card className="apply_shadow">
                    <CardHeader>
                        <CardTitle>Normal range rules</CardTitle>
                        <CardDescription>
                            Setup your normal range rules here
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>

            <BreadCrumbService breadcrumbArr={breadcrumbArr} currentPageName={currentPageName} />

            <Card className="apply_shadow">
                <CardContent>
                    <div className="flex flex-row gap-2 mt-5">
                        <Popover open={openInvestigationCombo} onOpenChange={setOpenInvestigationCombo}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={openInvestigationCombo}
                                    className="w-[200px] justify-between"
                                // disabled={loadingData}
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
                                        placeholder={"Search investigation..."}
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
                                                        setSelectedField(null);
                                                        filterInvestigationFields(item.id);
                                                        setOpenInvestigationCombo(false);
                                                    }}
                                                >
                                                    {item.name}
                                                    <CheckIcon
                                                        className={cn(
                                                            "ml-auto h-4 w-4",
                                                            selectedInvestigation?.name === item.name ? "opacity-100" : "opacity-0"
                                                        )}
                                                    />
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>

                        {selectedInvestigation && <Popover open={openFieldCombo} onOpenChange={setOpenFieldCombo}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={openFieldCombo}
                                    className="w-[200px] justify-between"
                                // disabled={loadingData}
                                >
                                    {selectedField
                                        ? selectedField.name
                                        : "Select a field..."}
                                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                                <Command>
                                    <CommandInput
                                        placeholder={"Search field..."}
                                        className="h-9"
                                        value={fieldSearchQuery}
                                        onValueChange={(e) => setFieldSearchQuery(e)}
                                    />
                                    <CommandList>
                                        {invFields.filter(field => field.name.includes(fieldSearchQuery)).length === 0 && <CommandEmpty>Unsupported investigation</CommandEmpty>}
                                        <CommandGroup>
                                            {invFields.filter(field => field.name.includes(fieldSearchQuery)).map((field) => (
                                                <CommandItem
                                                    key={field.code}
                                                    value={field.name}
                                                    onSelect={(currentValue) => {
                                                        setSelectedField(currentValue === selectedField?.name ? null : field);
                                                        setOpenFieldCombo(false);
                                                    }}
                                                >
                                                    {field.name}
                                                    <CheckIcon
                                                        className={cn(
                                                            "ml-auto h-4 w-4",
                                                            selectedField?.name === field.name ? "opacity-100" : "opacity-0"
                                                        )}
                                                    />
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>}
                    </div>
                </CardContent>
            </Card>

            {selectedField && <div>
                <Card className="apply_shadow mt-5">
                    <CardContent>
                        <div className="mt-5 w-full">
                            <p className="font-bold mb-2">Age coverage</p>
                            <div className="flex flex-row justify-around gap-5">
                                <div className="w-full">
                                    <Label htmlFor="ageCoverage">Male</Label>
                                    <Progress id="ageCoverage" className="h-4" value={maleAgeCoverage} indicatorColor="bg-blue-400" />
                                </div>
                                <div className="w-full">
                                    <Label htmlFor="ageCoverage">Female</Label>
                                    <Progress id="ageCoverage" className="h-4" value={femaleAgeCoverage} indicatorColor="bg-red-400" />
                                </div>
                                <div className="w-full">
                                    <Label htmlFor="ageCoverage">Other</Label>
                                    <Progress id="ageCoverage" className="h-4" value={otherAgeCoverage} indicatorColor="bg-green-400" />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="apply_shadow mt-5">
                    <CardContent>
                        <div className="flex flex-col items-center">
                            <ScrollArea className="h-[480px] mt-5 w-full border rounded-lg p-2 bg-gray-50">
                                <div className="flex flex-col items-center gap-5">
                                    {
                                        normalRanges.map((range) => (
                                            <NormalRangeDataItem
                                                key={range.id}
                                                data={range}
                                                removeData={removeNormalRangeRule}
                                                updateData={updateNormalRangeRule}
                                            />
                                        ))
                                    }
                                </div>
                                <div className="flex justify-center mt-5">
                                    <Button
                                        onClick={addNormalRangeRule}
                                        variant="outline"
                                        className="w-[40rem]"
                                    >
                                        Add rule
                                    </Button>
                                </div>
                            </ScrollArea>
                        </div>
                        <div className="flex justify-end mt-5">
                            <Button
                                size="sm"
                                onClick={saveNormalRangeRules}
                            >
                                Save
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>}
        </div>
    );
}