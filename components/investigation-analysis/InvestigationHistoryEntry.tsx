import { Download, Eye } from "lucide-react";

interface InvestigationHistoryEntryProps {
    patientName: string;
    date: string;
}

export default function InvestigationHistoryEntry({ patientName, date }: InvestigationHistoryEntryProps) {
    return (
        <div className="flex flex-row gap-2 text-sm justify-between ml-2 h-[40px] items-center">
            <div className="flex-1">
                {patientName}
            </div>
            <div className="flex-1 text-right">
                {date}
            </div>
            <div className="ml-5 flex gap-3 items-center">
                <Download size={17} color="green" className="cursor-pointer" />
                <Eye size={17} color="red" className="cursor-pointer" />
            </div>
        </div>
    );
}
