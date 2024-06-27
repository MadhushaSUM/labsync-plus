"use client";

import useAddInvestigationData from "@/hooks/api/investigationData/useAddInvestigationData";
import useGetInvestigationData from "@/hooks/api/investigationData/useGetInvestigationData";
import useUpdateInvestigationData from "@/hooks/api/investigationData/useUpdateInvestigationData";
import { getNormalRangeFlag } from "@/lib/normalRangeFlag";
import { FullBloodCountFormSchema } from "@/schema/InvestigationDataSchema";
import { AddInvestigationDataRequestDto, UpdateInvestigationDataRequestDto } from "@/types/Dto/InvestigationData";
import { InvestigationFormProps } from "@/types/commonTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { fbcNormalRanges } from "./MockNormalRanges";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Input } from "../ui/input";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";

type FlagFields =
    "wbcCountFlag" |
    "neutrophilsFlag" |
    "lymphocytesFlag" |
    "eosinophilsFlag" |
    "monocytesFlag" |
    "basophilsFlag" |
    "haemoglobinFlag" |
    "rbcCountFlag" |
    "pcvFlag" |
    "mcvFlag" |
    "mchFlag" |
    "mchcFlag" |
    "plateletCountFlag";

export default function FBCForm({ patient, investigationRegisterId, investigationId }: InvestigationFormProps) {
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const [investigationDataId, setInvestigationDataId] = useState(undefined);

    const form = useForm<z.infer<typeof FullBloodCountFormSchema>>({
        resolver: zodResolver(FullBloodCountFormSchema),
        defaultValues:
        {
            wbcCount: 0,
            neutrophils: 0,
            lymphocytes: 0,
            eosinophils: 0,
            monocytes: 0,
            basophils: 0,
            haemoglobin: 0,
            rbcCount: 0,
            pcv: 0,
            mcv: 0,
            mch: 0,
            mchc: 0,
            plateletCount: 0,
            wbcCountFlag: "",
            neutrophilsFlag: "",
            lymphocytesFlag: "",
            eosinophilsFlag: "",
            monocytesFlag: "",
            basophilsFlag: "",
            haemoglobinFlag: "",
            rbcCountFlag: "",
            pcvFlag: "",
            mcvFlag: "",
            mchFlag: "",
            mchcFlag: "",
            plateletCountFlag: "",
        }
    });

    const { data, error } = useGetInvestigationData(
        investigationRegisterId,
        investigationId
    );
    const { updateExistingInvestigationData, errorUpdate } = useUpdateInvestigationData();

    if (error) {
        toast.error(error.message);
    }
    if (errorUpdate) {
        toast.error(errorUpdate.message);
    }

    useEffect(() => {
        if (data && data.length !== 0) {
            setInvestigationDataId(data[0].investigationDataId);

            form.reset({
                wbcCount: data[0].wbcCount,
                neutrophils: data[0].neutrophils,
                lymphocytes: data[0].lymphocytes,
                eosinophils: data[0].eosinophils,
                monocytes: data[0].monocytes,
                basophils: data[0].basophils,
                haemoglobin: data[0].haemoglobin,
                rbcCount: data[0].rbcCount,
                pcv: data[0].pcv,
                mcv: data[0].mcv,
                mch: data[0].mch,
                mchc: data[0].mchc,
                plateletCount: data[0].plateletCount,
                wbcCountFlag: data[0].wbcCountFlag,
                neutrophilsFlag: data[0].neutrophilsFlag,
                lymphocytesFlag: data[0].lymphocytesFlag,
                eosinophilsFlag: data[0].eosinophilsFlag,
                monocytesFlag: data[0].monocytesFlag,
                basophilsFlag: data[0].basophilsFlag,
                haemoglobinFlag: data[0].haemoglobinFlag,
                rbcCountFlag: data[0].rbcCountFlag,
                pcvFlag: data[0].pcvFlag,
                mcvFlag: data[0].mcvFlag,
                mchFlag: data[0].mchFlag,
                mchcFlag: data[0].mchcFlag,
                plateletCountFlag: data[0].plateletCountFlag,
            });
        }
    }, [data, form]);

    const normalRanges = fbcNormalRanges;
    const handleSetFlag = (field: string, value: number, flagField: FlagFields) => {
        const range = normalRanges.data.find(range => range.fieldName === field)?.normalRanges;

        if (range) {
            const flag = getNormalRangeFlag(patient, range, flagField, value);
            form.setValue(flagField, flag)
        }
    };

    const { saveInvestigationData, errorAdd } = useAddInvestigationData();
    if (errorAdd) {
        toast.error(errorAdd.message);
    }

    function onSubmit(values: z.infer<typeof FullBloodCountFormSchema>) {
        setSaving(true);

        if (investigationDataId) {
            // updating data
            const updateData: UpdateInvestigationDataRequestDto = {
                investigationDataId: investigationDataId,
                investigationRegisterId: investigationRegisterId,
                investigationId: investigationId,
                investigationData: values
            }
            const promise = updateExistingInvestigationData(updateData);

            toast.promise(promise, {
                loading: "Updating investigation data",
                success: "Investigation data has been saved",
                error: "Error while updating investigation data"
            });
        } else {
            // saving data as a new record
            const savingData: AddInvestigationDataRequestDto = {
                investigationRegisterId: investigationRegisterId,
                investigationId: investigationId,
                investigationData: values
            };

            const promise = saveInvestigationData(savingData);

            toast.promise(promise, {
                loading: "Saving investigation data",
                success: "Investigation data has been saved",
                error: "Error while saving investigation data"
            });
        }

        setSaving(false);
        router.push("/investigation_registration");
    }

    function onFormCancel() {
        router.push("/investigation_registration");
    }

    return (
        <div>
            <div className="text-lg font-bold justify-center flex">
                Full blood count
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-8">
                        <div className="flex gap-5 w-fit">
                            <FormField
                                control={form.control}
                                name="wbcCount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Total WBC count</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className="w-[200px]"
                                                type="number"
                                                value={field.value}
                                                onChange={(e) => {
                                                    const value = parseFloat(e.target.value);
                                                    field.onChange(value);
                                                    handleSetFlag(field.name, value, "wbcCountFlag");
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="wbcCountFlag"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="italic">Flag</FormLabel>
                                        <FormControl>
                                            <div className="flex gap-5 items-center">
                                                <Input
                                                    {...field}
                                                    className="w-[200px]"
                                                />

                                                <HoverCard>
                                                    <HoverCardTrigger>
                                                        <InfoCircledIcon color="blue" />
                                                    </HoverCardTrigger>
                                                    <HoverCardContent>
                                                        Total calcium value normal ranges will be displayed here
                                                    </HoverCardContent>
                                                </HoverCard>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <h2 className="font-bold">Differential count</h2>

                        <div className="flex gap-5 w-fit">
                            <FormField
                                control={form.control}
                                name="neutrophils"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Neutrophils</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className="w-[200px]"
                                                type="number"
                                                value={field.value}
                                                onChange={(e) => {
                                                    const value = parseFloat(e.target.value);
                                                    field.onChange(value);
                                                    handleSetFlag(field.name, value, "neutrophilsFlag");
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="neutrophilsFlag"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="italic">Flag</FormLabel>
                                        <FormControl>
                                            <div className="flex gap-5 items-center">
                                                <Input
                                                    {...field}
                                                    className="w-[200px]"
                                                />

                                                <HoverCard>
                                                    <HoverCardTrigger>
                                                        <InfoCircledIcon color="blue" />
                                                    </HoverCardTrigger>
                                                    <HoverCardContent>
                                                        Ionized calcium value normal ranges will be displayed here
                                                    </HoverCardContent>
                                                </HoverCard>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex gap-5 w-fit">
                            <FormField
                                control={form.control}
                                name="lymphocytes"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Lymphocytes</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className="w-[200px]"
                                                type="number"
                                                value={field.value}
                                                onChange={(e) => {
                                                    const value = parseFloat(e.target.value);
                                                    field.onChange(value);
                                                    handleSetFlag(field.name, value, "lymphocytesFlag");
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="lymphocytesFlag"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="italic">Flag</FormLabel>
                                        <FormControl>
                                            <div className="flex gap-5 items-center">
                                                <Input
                                                    {...field}
                                                    className="w-[200px]"
                                                />

                                                <HoverCard>
                                                    <HoverCardTrigger>
                                                        <InfoCircledIcon color="blue" />
                                                    </HoverCardTrigger>
                                                    <HoverCardContent>
                                                        Ionized calcium value normal ranges will be displayed here
                                                    </HoverCardContent>
                                                </HoverCard>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex gap-5 w-fit">
                            <FormField
                                control={form.control}
                                name="eosinophils"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Eosinophils</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className="w-[200px]"
                                                type="number"
                                                value={field.value}
                                                onChange={(e) => {
                                                    const value = parseFloat(e.target.value);
                                                    field.onChange(value);
                                                    handleSetFlag(field.name, value, "eosinophilsFlag");
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="eosinophilsFlag"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="italic">Flag</FormLabel>
                                        <FormControl>
                                            <div className="flex gap-5 items-center">
                                                <Input
                                                    {...field}
                                                    className="w-[200px]"
                                                />

                                                <HoverCard>
                                                    <HoverCardTrigger>
                                                        <InfoCircledIcon color="blue" />
                                                    </HoverCardTrigger>
                                                    <HoverCardContent>
                                                        Ionized calcium value normal ranges will be displayed here
                                                    </HoverCardContent>
                                                </HoverCard>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex gap-5 w-fit">
                            <FormField
                                control={form.control}
                                name="monocytes"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Monocytes</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className="w-[200px]"
                                                type="number"
                                                value={field.value}
                                                onChange={(e) => {
                                                    const value = parseFloat(e.target.value);
                                                    field.onChange(value);
                                                    handleSetFlag(field.name, value, "monocytesFlag");
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="monocytesFlag"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="italic">Flag</FormLabel>
                                        <FormControl>
                                            <div className="flex gap-5 items-center">
                                                <Input
                                                    {...field}
                                                    className="w-[200px]"
                                                />

                                                <HoverCard>
                                                    <HoverCardTrigger>
                                                        <InfoCircledIcon color="blue" />
                                                    </HoverCardTrigger>
                                                    <HoverCardContent>
                                                        Ionized calcium value normal ranges will be displayed here
                                                    </HoverCardContent>
                                                </HoverCard>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex gap-5 w-fit">
                            <FormField
                                control={form.control}
                                name="basophils"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Basophils</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className="w-[200px]"
                                                type="number"
                                                value={field.value}
                                                onChange={(e) => {
                                                    const value = parseFloat(e.target.value);
                                                    field.onChange(value);
                                                    handleSetFlag(field.name, value, "basophilsFlag");
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="basophilsFlag"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="italic">Flag</FormLabel>
                                        <FormControl>
                                            <div className="flex gap-5 items-center">
                                                <Input
                                                    {...field}
                                                    className="w-[200px]"
                                                />

                                                <HoverCard>
                                                    <HoverCardTrigger>
                                                        <InfoCircledIcon color="blue" />
                                                    </HoverCardTrigger>
                                                    <HoverCardContent>
                                                        Ionized calcium value normal ranges will be displayed here
                                                    </HoverCardContent>
                                                </HoverCard>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <h2 className="font-bold">Haemoglobin and RBC indices</h2>

                        <div className="flex gap-5 w-fit">
                            <FormField
                                control={form.control}
                                name="haemoglobin"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Haemoglobin</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className="w-[200px]"
                                                type="number"
                                                value={field.value}
                                                onChange={(e) => {
                                                    const value = parseFloat(e.target.value);
                                                    field.onChange(value);
                                                    handleSetFlag(field.name, value, "haemoglobinFlag");
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="haemoglobinFlag"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="italic">Flag</FormLabel>
                                        <FormControl>
                                            <div className="flex gap-5 items-center">
                                                <Input
                                                    {...field}
                                                    className="w-[200px]"
                                                />

                                                <HoverCard>
                                                    <HoverCardTrigger>
                                                        <InfoCircledIcon color="blue" />
                                                    </HoverCardTrigger>
                                                    <HoverCardContent>
                                                        Ionized calcium value normal ranges will be displayed here
                                                    </HoverCardContent>
                                                </HoverCard>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex gap-5 w-fit">
                            <FormField
                                control={form.control}
                                name="rbcCount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>RBC count</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className="w-[200px]"
                                                type="number"
                                                value={field.value}
                                                onChange={(e) => {
                                                    const value = parseFloat(e.target.value);
                                                    field.onChange(value);
                                                    handleSetFlag(field.name, value, "rbcCountFlag");
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="rbcCountFlag"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="italic">Flag</FormLabel>
                                        <FormControl>
                                            <div className="flex gap-5 items-center">
                                                <Input
                                                    {...field}
                                                    className="w-[200px]"
                                                />

                                                <HoverCard>
                                                    <HoverCardTrigger>
                                                        <InfoCircledIcon color="blue" />
                                                    </HoverCardTrigger>
                                                    <HoverCardContent>
                                                        Ionized calcium value normal ranges will be displayed here
                                                    </HoverCardContent>
                                                </HoverCard>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex gap-5 w-fit">
                            <FormField
                                control={form.control}
                                name="pcv"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>HCT / PCV</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className="w-[200px]"
                                                type="number"
                                                value={field.value}
                                                onChange={(e) => {
                                                    const value = parseFloat(e.target.value);
                                                    field.onChange(value);
                                                    handleSetFlag(field.name, value, "pcvFlag");
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="pcvFlag"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="italic">Flag</FormLabel>
                                        <FormControl>
                                            <div className="flex gap-5 items-center">
                                                <Input
                                                    {...field}
                                                    className="w-[200px]"
                                                />

                                                <HoverCard>
                                                    <HoverCardTrigger>
                                                        <InfoCircledIcon color="blue" />
                                                    </HoverCardTrigger>
                                                    <HoverCardContent>
                                                        Ionized calcium value normal ranges will be displayed here
                                                    </HoverCardContent>
                                                </HoverCard>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex gap-5 w-fit">
                            <FormField
                                control={form.control}
                                name="mcv"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>MCV</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className="w-[200px]"
                                                type="number"
                                                value={field.value}
                                                onChange={(e) => {
                                                    const value = parseFloat(e.target.value);
                                                    field.onChange(value);
                                                    handleSetFlag(field.name, value, "mcvFlag");
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="mcvFlag"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="italic">Flag</FormLabel>
                                        <FormControl>
                                            <div className="flex gap-5 items-center">
                                                <Input
                                                    {...field}
                                                    className="w-[200px]"
                                                />

                                                <HoverCard>
                                                    <HoverCardTrigger>
                                                        <InfoCircledIcon color="blue" />
                                                    </HoverCardTrigger>
                                                    <HoverCardContent>
                                                        Ionized calcium value normal ranges will be displayed here
                                                    </HoverCardContent>
                                                </HoverCard>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex gap-5 w-fit">
                            <FormField
                                control={form.control}
                                name="mch"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>MCH</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className="w-[200px]"
                                                type="number"
                                                value={field.value}
                                                onChange={(e) => {
                                                    const value = parseFloat(e.target.value);
                                                    field.onChange(value);
                                                    handleSetFlag(field.name, value, "mchFlag");
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="mchFlag"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="italic">Flag</FormLabel>
                                        <FormControl>
                                            <div className="flex gap-5 items-center">
                                                <Input
                                                    {...field}
                                                    className="w-[200px]"
                                                />

                                                <HoverCard>
                                                    <HoverCardTrigger>
                                                        <InfoCircledIcon color="blue" />
                                                    </HoverCardTrigger>
                                                    <HoverCardContent>
                                                        Ionized calcium value normal ranges will be displayed here
                                                    </HoverCardContent>
                                                </HoverCard>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex gap-5 w-fit">
                            <FormField
                                control={form.control}
                                name="mchc"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Neutrophils</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className="w-[200px]"
                                                type="number"
                                                value={field.value}
                                                onChange={(e) => {
                                                    const value = parseFloat(e.target.value);
                                                    field.onChange(value);
                                                    handleSetFlag(field.name, value, "mchcFlag");
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="mchcFlag"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="italic">Flag</FormLabel>
                                        <FormControl>
                                            <div className="flex gap-5 items-center">
                                                <Input
                                                    {...field}
                                                    className="w-[200px]"
                                                />

                                                <HoverCard>
                                                    <HoverCardTrigger>
                                                        <InfoCircledIcon color="blue" />
                                                    </HoverCardTrigger>
                                                    <HoverCardContent>
                                                        Ionized calcium value normal ranges will be displayed here
                                                    </HoverCardContent>
                                                </HoverCard>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex gap-5 w-fit">
                            <FormField
                                control={form.control}
                                name="plateletCount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Platelet count</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className="w-[200px]"
                                                type="number"
                                                value={field.value}
                                                onChange={(e) => {
                                                    const value = parseFloat(e.target.value);
                                                    field.onChange(value);
                                                    handleSetFlag(field.name, value, "plateletCountFlag");
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="plateletCountFlag"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="italic">Flag</FormLabel>
                                        <FormControl>
                                            <div className="flex gap-5 items-center">
                                                <Input
                                                    {...field}
                                                    className="w-[200px]"
                                                />

                                                <HoverCard>
                                                    <HoverCardTrigger>
                                                        <InfoCircledIcon color="blue" />
                                                    </HoverCardTrigger>
                                                    <HoverCardContent>
                                                        Ionized calcium value normal ranges will be displayed here
                                                    </HoverCardContent>
                                                </HoverCard>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div className="flex flex-row justify-end gap-2">
                        <Button size="sm" variant="outline" type="reset" onClick={onFormCancel}>
                            Cancel
                        </Button>
                        <Button type="submit" size="sm">
                            {saving ? "Saving" : "Save data"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}