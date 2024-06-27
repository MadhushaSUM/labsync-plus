import { Download, Eye } from "lucide-react";

interface PatientHistoryEntryProps {
    date: string;
}

export default function PatientHistoryEntry({ date }: PatientHistoryEntryProps) {
    return (
        <div className="flex flex-row gap-2 text-sm justify-between ml-2">
            {date}
            <div className="flex gap-3 items-center">
                <Download size={17} color="green" className="cursor-pointer"/>
                <Eye size={17} color="red" className="cursor-pointer"/>
            </div>
        </div>
    );
}