"use client";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Command, CommandGroup, CommandItem, CommandList } from "../ui/command";
import { FormControl } from "../ui/form";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { CheckIcon, PlusCircleIcon } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";

interface ComboBoxProps {
    form: any;
    field: any;
    choices: string[];
}

export default function ComboBox({ form, field, choices }: ComboBoxProps) {
    const [open, setOpen] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<string | undefined>();

    const setFormField = (value?: string) => {
        form.setValue(field.name, value);
    }

    const addToList = () => {
        if (selectedOption && !choices.find(choice => choice === selectedOption)) {
            choices.push(selectedOption);
            form.setValue(field.name, selectedOption);
            setOpen(false);
        }
    }

    return (
        <Popover open={open}>
            <PopoverTrigger asChild>
                <FormControl>
                    <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground"
                        )}
                        onClick={() => setOpen(!open)}
                    >
                        {field.value ? field.value : "Select"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <div className="flex">
                        <Input
                            placeholder="Type custom..."
                            className="h-9 rounded-none border-none outline-none"
                            value={selectedOption}
                            onChange={e => {
                                setSelectedOption(e.target.value)
                            }}
                        />
                        <div className={cn("absolute right-3 top-3 cursor-pointer", selectedOption ? "opacity-80" : "opacity-0")}>
                            <PlusCircleIcon size={15} onClick={addToList} />
                        </div>
                    </div>
                    <CommandList>
                        <CommandGroup>
                            {choices.map((choice) => (
                                <CommandItem
                                    value={choice}
                                    key={choice}
                                    onSelect={() => {
                                        setFormField(choice);
                                        setOpen(false);
                                    }}
                                >
                                    {choice}
                                    <CheckIcon
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            choice === field.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}