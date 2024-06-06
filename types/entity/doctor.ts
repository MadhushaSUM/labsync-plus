import { SearchBoxItem } from "../commonTypes";

export interface DoctorType extends SearchBoxItem {
    id?: number;
    name: string;
    post: string;
}