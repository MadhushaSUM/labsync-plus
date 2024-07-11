"use client";

import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export function DatePicker() {
    const [stringDate, setStringDate] = useState<string>("")
    const [date, setDate] = useState<Date>()
    const [errorMessage, setErrorMessage] = useState<string>("")

    return (
        <Popover>
            <div className="relative w-[280px]">
                <Input
                    type="string"
                    value={stringDate}
                    onChange={(e) => {
                        setStringDate(e.target.value)
                        const parsedDate = new Date(e.target.value)
                        if (parsedDate.toString() === "Invalid Date") {
                            setErrorMessage("Invalid Date")
                            setDate(undefined)
                        } else {
                            setErrorMessage("")
                            setDate(parsedDate)
                        }
                    }}
                />
                {errorMessage !== "" && (
                    <div className="absolute bottom-[-1.75rem] left-0 text-red-400 text-sm">
                        {errorMessage}
                    </div>
                )}
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "font-normal absolute right-0 translate-y-[-50%] top-[50%] rounded-l-none",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="w-4 h-4" />
                    </Button>
                </PopoverTrigger>
            </div>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(selectedDate) => {
                        if (!selectedDate) return
                        setDate(selectedDate)
                        setStringDate(format(selectedDate, "MM/dd/yyyy"))
                        setErrorMessage("")
                    }}
                    defaultMonth={date}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}