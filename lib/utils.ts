import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function calculateEGFR(creatinine: number, gender: string, isBlack: boolean, age: number) {
    let egfr = 175 * Math.pow(creatinine, -1.154) * Math.pow(age, -0.203);
    if (gender == 'female') {
        egfr = egfr * 0.742;
    }
    if (isBlack) {
        egfr = egfr * 1.212;
    }

    return egfr;
}
