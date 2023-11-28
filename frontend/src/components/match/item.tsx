"use client";

import { clsx } from "clsx";
import Image from "next/image";
import React from "react";

export interface ItemData {
    id: string;
    name: string;
    imageUrl: string;
}

export interface ItemProps {
    itemData: ItemData;
    selected: string;
    setSelected: React.Dispatch<React.SetStateAction<string>>;
}

export function Item({itemData, selected, setSelected}: ItemProps) {
    return (
        <div onClick={() => setSelected(selected === itemData.id ? "" : itemData.id)}
             className={clsx(
                 "h-full", "w-full",
                 "p-2", "rounded",
                 "bg-secondary",
                 (selected === itemData.id) ? "ring ring-accent" : "")
             }>
            <Image className="mb-2 rounded"
                   src={itemData.imageUrl}
                   alt="Comparison Item 1"
                   width={0} height={0} sizes="100vw"
                   style={{width: "100%", height: "auto"}}>
            </Image>
            <h1 className="font-medium text-sm text-gray-100">{itemData.name}</h1>
        </div>
    );
}
