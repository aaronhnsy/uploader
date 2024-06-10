"use client";

import { clsx } from "clsx";
import React from "react";

interface FooterButtonProps {
    icon: React.ReactNode;
    label: string;
    location: string;
}

export function FooterButton({ icon, label, location }: FooterButtonProps) {
    return (
        <a type="button" aria-label={label} href={location}
            className={clsx(
            "flex", "items-center", "justify-center", "rounded",
            "px-2", "py-1", "space-x-2",
            "bg-colour-tertiary", "hover:bg-colour-tertiary-hover",
            "fill-colour-text", "hover:fill-colour-text-hover",
            "text-colour-text", "hover:text-colour-text-hover",
            "transitions",
        )}>
            {icon}
            <p>{label}</p>
        </a>
    )
}
