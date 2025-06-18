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

export function shortenedItemId(id: string, startLength = 10, endLength = 6): string {
    if (typeof id !== 'string') id = String(id);
    if (!id || id.length <= startLength + endLength) return id;
    return `${id.slice(0, startLength)}...${id.slice(-endLength)}`;
}
