import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";

interface NumberInputProps {
    id?: string;
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    unit?: string;
}

export const NumberInput = ({ id, value, onChange, min = 0, max = 100, step = 0.1, unit }: NumberInputProps) => {
    return (
        <div className="flex items-center gap-2">
            <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 shrink-0"
                onClick={() => onChange(Math.max(min, value - step))}
            >
                <Minus className="h-4 w-4" />
            </Button>
            <div className="relative flex-1">
                <Input
                    id={id}
                    type="number"
                    value={value.toFixed(1)}
                    readOnly
                    className="text-center font-bold h-10 pr-8"
                />
                {unit && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium pointer-events-none">
                        {unit}
                    </span>
                )}
            </div>
            <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 shrink-0"
                onClick={() => onChange(Math.min(max, value + step))}
            >
                <Plus className="h-4 w-4" />
            </Button>
        </div>
    );
};
