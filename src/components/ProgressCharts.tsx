import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { TrendingDown } from "lucide-react";

const weightData = [
    { day: "Day 1", weight: 97 },
    { day: "Day 10", weight: 95.5 },
    { day: "Day 20", weight: 93.2 },
    { day: "Day 30", weight: 90.8 },
    { day: "Day 40", weight: 88.5 },
    { day: "Day 50", weight: 85.2 },
    { day: "Day 60", weight: 82.7 },
    { day: "Day 70", weight: 80.1 },
    { day: "Today", weight: 79 },
];

export const ProgressCharts = () => {
    return (
        <Card className="card-shadow col-span-1 lg:col-span-3">
            <CardHeader className="flex flex-row items-center justify-between pb-8">
                <div>
                    <CardTitle className="text-2xl flex items-center gap-2">
                        <TrendingDown className="h-6 w-6 text-emerald-400" />
                        Weight Loss Journey
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">From 97kg to 79kg — Incredible progress!</p>
                </div>
                <div className="text-right">
                    <div className="text-3xl font-black text-emerald-400">-18kg</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Total Lost</div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={weightData}>
                            <defs>
                                <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                            <XAxis
                                dataKey="day"
                                stroke="#64748b"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="#64748b"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                domain={[70, 100]}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#0f172a',
                                    border: '1px solid #1e293b',
                                    borderRadius: '12px',
                                    fontSize: '12px'
                                }}
                                itemStyle={{ color: '#10b981' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="weight"
                                stroke="#10b981"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorWeight)"
                                animationDuration={2000}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};
