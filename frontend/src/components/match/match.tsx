"use client";

import { useState } from "react";
import { Item, ItemData } from "./item";

export interface MatchProps {
    itemOne: ItemData,
    itemTwo: ItemData
}

export function Match({itemOne, itemTwo}: MatchProps) {
    const [selectedItem, setSelectedItem] = useState("");
    return (
        <div className="grid grid-cols-3 max-w-lg mx-auto text-center place-items-center p-2 rounded bg-colour-primary">
            <Item itemData={itemOne} selected={selectedItem} setSelected={setSelectedItem}></Item>
            <div><h1 className="font-bold text-lg text-gray-100">VS</h1></div>
            <Item itemData={itemTwo} selected={selectedItem} setSelected={setSelectedItem}></Item>
        </div>
    );
}
