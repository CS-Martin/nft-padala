import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Home, SlashIcon } from 'lucide-react';
import React from 'react';

interface BreadcrumbsProps {
    items: {
        label: string;
        href: string;
    }[];
    className?: string;
}

export const Breadcrumbs = ({ items, className }: BreadcrumbsProps) => {
    return (
        <Breadcrumb className={`${className} hidden md:flex`}>
            <BreadcrumbList>
                {items?.map((item, index) => (
                    <React.Fragment key={item.href || item.label}>
                        <BreadcrumbItem>
                            {index === items.length - 1 ? (
                                <BreadcrumbPage>{item.label === 'Home' ? <Home className='w-6 h-6' /> : item.label}</BreadcrumbPage>
                            ) : (
                                <BreadcrumbLink href={item.href}>{item.label === 'Home' ? <Home className='w-[14px]' /> : item.label}</BreadcrumbLink>
                            )}
                        </BreadcrumbItem>

                        {index !== items.length - 1 && (
                            <BreadcrumbSeparator>
                                <SlashIcon />
                            </BreadcrumbSeparator>
                        )}
                    </React.Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
};
