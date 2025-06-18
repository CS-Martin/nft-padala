import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function generateUID() {
    const date = new Date();
    const dateString = date.toISOString().replace(/[:.]/g, ''); // Replace characters invalid for filenames/keys

    return `${crypto.randomUUID()}-${dateString}`;
}
