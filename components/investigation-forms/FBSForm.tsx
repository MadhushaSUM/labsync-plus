"use client"

import { FBSFormSchema } from "@/schema/InvestigationDataSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AddInvestigationDataRequestDto } from "@/types/Dto/InvestigationData";
import useAddInvestigationData from "@/hooks/api/investigationData/useAddInvestigationData";
import { toast } from "sonner";

interface InvestigationFormProps {
    defaultValues: { [key: string]: any } | null;
    investigationRegisterId: number;
    investigationId: number;
}

export default function FBSForm({ defaultValues, investigationRegisterId, investigationId }: InvestigationFormProps) {
    const router = useRouter();
    const [saving, setSaving] = useState(false);

    const form = useForm<z.infer<typeof FBSFormSchema>>({
        resolver: zodResolver(FBSFormSchema),
        defaultValues:
        {
            fbsValue: 0
        }
    });

    if (defaultValues && defaultValues.length !== 0) {
        form.reset({
            fbsValue: defaultValues.fbsValue,
        });
    }

    const { saveInvestigationData, errorAdd } = useAddInvestigationData();
    if (errorAdd) {
        toast.error(errorAdd.message);
    }

    function onSubmit(values: z.infer<typeof FBSFormSchema>) {
        setSaving(true);
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


        setSaving(false);
        router.push("/investigation_registration");
    }

    function onFormCancel() {
        router.push("/investigation_registration");
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-8 w-96">
                        <FormField
                            control={form.control}
                            name="fbsValue"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>FBS value</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className="w-[200px]"
                                            type="number"
                                            value={field.value}
                                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                        />
                                    </FormControl>
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