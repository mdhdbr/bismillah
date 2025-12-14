
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface DriverChecklistProps {
    title: string;
    items: string[];
    onChecklistChange: (isComplete: boolean) => void;
    tripId: string; // Used to reset state when the trip changes
}

export function DriverChecklist({ title, items, onChecklistChange, tripId }: DriverChecklistProps) {
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

    // Reset checklist when tripId changes
    useEffect(() => {
        setCheckedItems({});
        onChecklistChange(false);
    }, [tripId, onChecklistChange]);

    const handleCheckedChange = (item: string, isChecked: boolean) => {
        const newCheckedItems = {
            ...checkedItems,
            [item]: isChecked,
        };
        setCheckedItems(newCheckedItems);

        const allChecked = items.every(i => newCheckedItems[i]);
        onChecklistChange(allChecked);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {items.map((item, index) => {
                    const id = `${title.replace(/\s+/g, '-')}-${index}`;
                    return (
                        <div key={id} className="flex items-center space-x-3">
                            <Checkbox 
                                id={id} 
                                checked={checkedItems[item] || false}
                                onCheckedChange={(isChecked) => handleCheckedChange(item, !!isChecked)}
                            />
                            <Label htmlFor={id} className="font-normal text-sm">
                                {item}
                            </Label>
                        </div>
                    );
                })}
            </CardContent>
        </Card>
    );
}
