"use client";

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { SearchBoxItem } from "@/types/commonTypes";

interface SearchBoxProps<TData extends SearchBoxItem> {
    fieldOnChange: (data: TData | null) => void;
    generalFieldName: string;
    selectedValue: TData | null;
    setSelectedValue: Dispatch<SetStateAction<TData | null>>
    searchQuery: string;
    searchData: TData[];
    setSearchQuery: Dispatch<SetStateAction<string>>;
    loadingSearchData: boolean;
}

export default function SearchBox<TData extends SearchBoxItem>({
    fieldOnChange,
    generalFieldName,
    selectedValue,
    setSelectedValue,
    searchQuery,
    searchData,
    setSearchQuery,
    loadingSearchData
}: Readonly<SearchBoxProps<TData>>) {

    const [openCombo, setOpenCombo] = useState<boolean>(false);

    return (
        <Popover open={openCombo} onOpenChange={setOpenCombo}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openCombo}
                    className="w-[200px] justify-between"
                >
                    {selectedValue
                        ? selectedValue.name
                        : `Select ${generalFieldName}...`}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput
                        placeholder={`Search ${generalFieldName}...`}
                        className="h-9"
                        value={searchQuery}
                        onValueChange={(e) => setSearchQuery(e)}
                    />
                    <CommandList>
                        {loadingSearchData && <CommandEmpty>Loading...</CommandEmpty>}
                        {!loadingSearchData && searchData.length === 0 && <CommandEmpty>No {generalFieldName} found</CommandEmpty>}
                        <CommandGroup>
                            {searchData.map((item) => (
                                <CommandItem
                                    key={item.id}
                                    value={item.name}
                                    onSelect={(currentValue) => {
                                        setSelectedValue(currentValue === selectedValue?.name ? null : item)
                                        fieldOnChange(item)
                                        setOpenCombo(false)
                                    }}
                                >
                                    {item.name}
                                    <CheckIcon
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            selectedValue?.name === item.name ? "opacity-100" : "opacity-0"
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