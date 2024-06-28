"use client";

import { clsx } from "clsx";
import React from "react";

interface FooterLinkProps {
    icon: React.ReactNode;
    label: string;
    location: string;
}

export function FooterLink({ icon, label, location }: FooterLinkProps) {
    return (
        <a href={location}
           className={clsx(
               "flex", "items-center", "justify-between", "rounded",
               "px-2", "py-1", "space-x-2",
               "bg-colour-main-300", "hover:bg-colour-main-400",
               "fill-colour-text", "hover:fill-colour-text-hover",
               "text-colour-text", "hover:text-colour-text-hover",
               "transitions",
           )}>
            {icon}
            <p>{label}</p>
        </a>
    );
}
