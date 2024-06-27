"use client";

import useAddInvestigationData from "@/hooks/api/investigationData/useAddInvestigationData";
import useGetInvestigationData from "@/hooks/api/investigationData/useGetInvestigationData";
import useUpdateInvestigationData from "@/hooks/api/investigationData/useUpdateInvestigationData";
import { InvestigationFormProps } from "@/types/commonTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Button } from "../ui/button";
import { UrineFullReportFormSchema } from "@/schema/InvestigationDataSchema";
import { albuminOptions, appearanceOptions, bileOptions, castsOptions, crystalsOptions, epithelialCellsOptions, organismsOptions, pusCellsOptions, reactionOptions, redCellsOptions, reducingSubstancesOptions, urineColours, urobilinogenOptions } from "./UFRChoices";
import ComboBox from "../custom-ui/combo-box";
import { AddInvestigationDataRequestDto, UpdateInvestigationDataRequestDto } from "@/types/Dto/InvestigationData";
import { Separator } from "../ui/separator";

export default function SerumCalciumForm({ patient, investigationRegisterId, investigationId }: InvestigationFormProps) {
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const [investigationDataId, setInvestigationDataId] = useState(undefined);

    const form = useForm<z.infer<typeof UrineFullReportFormSchema>>({
        resolver: zodResolver(UrineFullReportFormSchema),
        defaultValues:
        {
            colour: "Pale yellow",
            appearance: "Clear",
            reaction: "Acidic",
            albumin: "Nil",
            reducingSubs: "Nil",
            bile: "Nil",
            urobilinogen: "Normal amounts",
            pusCells: "Occational",
            redCells: "Nil",
            epithelialCells: "+",
            casts: "Not seen",
            crystals: "Not seen",
            organisms: "Not seen"
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
                colour: data[0].colour,
                appearance: data[0].appearance,
                reaction: data[0].reaction,
                albumin: data[0].albumin,
                reducingSubs: data[0].reducingSubs,
                bile: data[0].bile,
                urobilinogen: data[0].urobilinogen,
                pusCells: data[0].pusCells,
                redCells: data[0].redCells,
                epithelialCells: data[0].epithelialCells,
                casts: data[0].casts,
                crystals: data[0].crystals,
                organisms: data[0].organisms
            });
        }
    }, [data, form]);

    const { saveInvestigationData, errorAdd } = useAddInvestigationData();
    if (errorAdd) {
        toast.error(errorAdd.message);
    }

    function onSubmit(values: z.infer<typeof UrineFullReportFormSchema>) {
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
                Urine full report
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-8">
                        <h2 className="font-bold">Macroscopy</h2>
                        <FormField
                            control={form.control}
                            name="colour"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Colour</FormLabel>
                                    <ComboBox
                                        form={form}
                                        field={field}
                                        choices={urineColours}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="appearance"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Appearance</FormLabel>
                                    <ComboBox
                                        form={form}
                                        field={field}
                                        choices={appearanceOptions}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Separator />
                        <h2 className="font-bold">Clinical chemistry</h2>

                        <FormField
                            control={form.control}
                            name="reaction"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Reaction (pH)</FormLabel>
                                    <ComboBox
                                        form={form}
                                        field={field}
                                        choices={reactionOptions}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="albumin"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Albumin (protein)</FormLabel>
                                    <ComboBox
                                        form={form}
                                        field={field}
                                        choices={albuminOptions}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="reducingSubs"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Reducing substances (sugar)</FormLabel>
                                    <ComboBox
                                        form={form}
                                        field={field}
                                        choices={reducingSubstancesOptions}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="bile"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Bile (Bilirubin)</FormLabel>
                                    <ComboBox
                                        form={form}
                                        field={field}
                                        choices={bileOptions}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="urobilinogen"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Urobilinogen</FormLabel>
                                    <ComboBox
                                        form={form}
                                        field={field}
                                        choices={urobilinogenOptions}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Separator />
                        <h2 className="font-bold">Centrifuged deposits</h2>

                        <FormField
                            control={form.control}
                            name="pusCells"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Pus cells</FormLabel>
                                    <ComboBox
                                        form={form}
                                        field={field}
                                        choices={pusCellsOptions}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="redCells"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Red cells</FormLabel>
                                    <ComboBox
                                        form={form}
                                        field={field}
                                        choices={redCellsOptions}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="epithelialCells"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Epithelial cells</FormLabel>
                                    <ComboBox
                                        form={form}
                                        field={field}
                                        choices={epithelialCellsOptions}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="casts"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Casts</FormLabel>
                                    <ComboBox
                                        form={form}
                                        field={field}
                                        choices={castsOptions}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="crystals"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Crystals</FormLabel>
                                    <ComboBox
                                        form={form}
                                        field={field}
                                        choices={crystalsOptions}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="organisms"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Organisms</FormLabel>
                                    <ComboBox
                                        form={form}
                                        field={field}
                                        choices={organismsOptions}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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