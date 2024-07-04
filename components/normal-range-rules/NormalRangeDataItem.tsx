"use client";

import { useForm } from "react-hook-form";
import { Card, CardContent } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { genderEnum } from "@/schema/PatientSchema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Button } from "../ui/button";
import { NormalRangeType } from "@/types/commonTypes";
import { Dispatch, SetStateAction, useState } from "react";

interface NormalRangeDataItemProps {
    data: NormalRangeType;
    removeData: (id: string) => void;
    updateData: (id: string, updatedRule: NormalRangeType) => void;
}

export default function NormalRangeDataItem({ data, removeData, updateData }: NormalRangeDataItemProps) {
    const [editMode, setEditMode] = useState(false);
    // const [currentData, setCurrentData] = useState(data);


    const NormalRangeDataFormSchema = z.object({
        genders: z.array(genderEnum).min(1, {
            message: "Select at least one gender"
        }),
        ageLowerBound: z.number(),
        ageUpperBound: z.number(),
        valueLowerBound: z.number(),
        valueUpperBound: z.number(),
    }).refine((data) => data.ageUpperBound > data.ageLowerBound, {
        message: "must be greater than the lower bound",
        path: ["ageLowerBound"]
    }).refine((data) => data.valueUpperBound > data.valueLowerBound, {
        message: "must be greater than the lower bound",
        path: ["valueLowerBound"]
    });

    const form = useForm<z.infer<typeof NormalRangeDataFormSchema>>({
        resolver: zodResolver(NormalRangeDataFormSchema),
        defaultValues: data
    });

    function onSubmit(values: z.infer<typeof NormalRangeDataFormSchema>) {
        const updatedData: NormalRangeType = {
            ...data,
            genders: values.genders,
            ageLowerBound: values.ageLowerBound,
            ageUpperBound: values.ageUpperBound,
            valueLowerBound: values.valueLowerBound,
            valueUpperBound: values.valueUpperBound
        };

        // setCurrentData(newData);
        updateData(data.id!, updatedData);
        setEditMode(false);
    }

    return (
        <div className="w-[40rem]">
            <Card>
                <CardContent>
                    {
                        editMode ?
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                    <div className="flex flex-col gap-5 mt-5">
                                        <div className="flex items-center">
                                            <div className="w-[10rem]">
                                                <p className="font-bold">Applied genders</p>
                                            </div>
                                            <div className="flex gap-10">
                                                <FormField
                                                    control={form.control}
                                                    name="genders"
                                                    render={() => (
                                                        <FormItem>
                                                            <div className="grid grid-cols-4 gap-4">
                                                                <FormField
                                                                    control={form.control}
                                                                    name="genders"
                                                                    render={({ field }) => {
                                                                        return (
                                                                            <FormItem
                                                                                className="flex flex-row items-start space-x-3 space-y-0"
                                                                            >
                                                                                <FormControl>
                                                                                    <Checkbox
                                                                                        checked={field.value?.includes("Male")}
                                                                                        onCheckedChange={(checked) => {
                                                                                            return checked
                                                                                                ? field.onChange([...field.value, "Male"])
                                                                                                : field.onChange(
                                                                                                    field.value?.filter(
                                                                                                        (gender) => gender !== "Male"
                                                                                                    )
                                                                                                )
                                                                                        }}
                                                                                    />
                                                                                </FormControl>
                                                                                <FormLabel className="text-sm font-normal">
                                                                                    Male
                                                                                </FormLabel>
                                                                            </FormItem>
                                                                        )
                                                                    }}
                                                                />
                                                                <FormField
                                                                    control={form.control}
                                                                    name="genders"
                                                                    render={({ field }) => {
                                                                        return (
                                                                            <FormItem
                                                                                className="flex flex-row items-start space-x-3 space-y-0"
                                                                            >
                                                                                <FormControl>
                                                                                    <Checkbox
                                                                                        checked={field.value?.includes("Female")}
                                                                                        onCheckedChange={(checked) => {
                                                                                            return checked
                                                                                                ? field.onChange([...field.value, "Female"])
                                                                                                : field.onChange(
                                                                                                    field.value?.filter(
                                                                                                        (gender) => gender !== "Female"
                                                                                                    )
                                                                                                )
                                                                                        }}
                                                                                    />
                                                                                </FormControl>
                                                                                <FormLabel className="text-sm font-normal">
                                                                                    Female
                                                                                </FormLabel>
                                                                            </FormItem>
                                                                        )
                                                                    }}
                                                                />
                                                                <FormField
                                                                    control={form.control}
                                                                    name="genders"
                                                                    render={({ field }) => {
                                                                        return (
                                                                            <FormItem
                                                                                className="flex flex-row items-start space-x-3 space-y-0"
                                                                            >
                                                                                <FormControl>
                                                                                    <Checkbox
                                                                                        checked={field.value?.includes("Other")}
                                                                                        onCheckedChange={(checked) => {
                                                                                            return checked
                                                                                                ? field.onChange([...field.value, "Other"])
                                                                                                : field.onChange(
                                                                                                    field.value?.filter(
                                                                                                        (gender) => gender !== "Other"
                                                                                                    )
                                                                                                )
                                                                                        }}
                                                                                    />
                                                                                </FormControl>
                                                                                <FormLabel className="text-sm font-normal">
                                                                                    Other
                                                                                </FormLabel>
                                                                            </FormItem>
                                                                        )
                                                                    }}
                                                                />
                                                            </div>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex">
                                            <div className="w-[10rem]">
                                                <p className="font-bold">Age</p>
                                            </div>
                                            <div className="flex gap-10">
                                                <FormField
                                                    control={form.control}
                                                    name="ageLowerBound"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Lower bound</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    {...field}
                                                                    className="w-[10rem]"
                                                                    type="number"
                                                                    value={field.value}
                                                                    onChange={(e) => {
                                                                        const value = parseFloat(e.target.value);
                                                                        field.onChange(value);
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="ageUpperBound"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Upper bound</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    {...field}
                                                                    className="w-[10rem]"
                                                                    type="number"
                                                                    value={field.value}
                                                                    onChange={(e) => {
                                                                        const value = parseFloat(e.target.value);
                                                                        field.onChange(value);
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex">
                                            <div className="w-[10rem]">
                                                <p className="font-bold">Value</p>
                                            </div>
                                            <div className="flex gap-10">
                                                <FormField
                                                    control={form.control}
                                                    name="valueLowerBound"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Lower bound</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    {...field}
                                                                    className="w-[10rem]"
                                                                    type="number"
                                                                    value={field.value}
                                                                    onChange={(e) => {
                                                                        const value = parseFloat(e.target.value);
                                                                        field.onChange(value);
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="valueUpperBound"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Upper bound</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    {...field}
                                                                    className="w-[10rem]"
                                                                    type="number"
                                                                    value={field.value}
                                                                    onChange={(e) => {
                                                                        const value = parseFloat(e.target.value);
                                                                        field.onChange(value);
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex gap-2 justify-end">
                                            <Button size="sm" type="submit" variant="outline">Save</Button>
                                            <Button
                                                size="sm" 
                                                type="button"
                                                variant="destructive"
                                                onClick={e => {
                                                    e.preventDefault();
                                                    removeData(data.id!);
                                                }}
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            </Form>
                            :
                            <div>
                                <div className="flex flex-col gap-5 mt-5">
                                    <div className="flex items-center">
                                        <div className="w-[10rem]">
                                            <p className="font-bold">Applied genders</p>
                                        </div>
                                        <div className="flex gap-10">
                                            {
                                                data.genders.map(gender => {
                                                    return (
                                                        <div key={gender}>{gender}</div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>

                                    <div className="flex">
                                        <div className="w-[10rem]">
                                            <p className="font-bold">Age</p>
                                        </div>
                                        <div className="flex gap-10">
                                            <div className="flex gap-5">
                                                <p>Lower bound</p>
                                                <p>{data.ageLowerBound}</p>
                                            </div>
                                            <div className="flex gap-5">
                                                <p>Upper bound</p>
                                                <p>{data.ageUpperBound}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex">
                                        <div className="w-[10rem]">
                                            <p className="font-bold">Value</p>
                                        </div>
                                        <div className="flex gap-10">
                                            <div className="flex gap-5">
                                                <p>Lower bound</p>
                                                <p>{data.valueLowerBound}</p>
                                            </div>
                                            <div className="flex gap-5">
                                                <p>Upper bound</p>
                                                <p>{data.valueUpperBound}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 justify-end">
                                        <Button size="sm" variant="outline" onClick={e => setEditMode(true)}>Edit</Button>
                                        <Button
                                            size="sm"
                                            type="button"
                                            variant="destructive"
                                            onClick={e => {
                                                e.preventDefault();
                                                removeData(data.id!);
                                            }}
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                </div>
                            </div>
                    }
                </CardContent>
            </Card>
        </div>
    );
}