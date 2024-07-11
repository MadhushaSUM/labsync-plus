import { formatDistanceToNowStrict } from "date-fns";

export function calculateAge(dateStr: string): string {
    try {
        const date = new Date(dateStr);
        return formatDistanceToNowStrict(date);        
    } catch {
        return "";
    }
    
}