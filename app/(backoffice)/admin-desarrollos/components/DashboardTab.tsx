'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { developmentData } from '@/lib/data/adminDesarrollosData';
import { DollarSign, Home, TrendingUp, Users } from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from 'recharts';

export default function DashboardTab() {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const salesVelocityData = [
        { month: 'Sep', sales: 2 },
        { month: 'Oct', sales: 4 },
        { month: 'Nov', sales: 3 },
        { month: 'Dic', sales: 6 },
        { month: 'Ene', sales: 5 },
        { month: 'Feb', sales: 8 },
    ];

    return (
        <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Ventas Totales</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{formatCurrency(developmentData.soldValue)}</div>
                        <p className="text-xs text-muted-foreground">
                            +15.2% vs mes anterior
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Unidades Vendidas</CardTitle>
                        <Home className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{developmentData.soldUnits} / {developmentData.totalUnits}</div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                            <div
                                className="bg-blue-600 h-2.5 rounded-full"
                                style={{ width: `${(developmentData.soldUnits / developmentData.totalUnits) * 100}%` }}
                            ></div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {((developmentData.soldUnits / developmentData.totalUnits) * 100).toFixed(1)}% vendido
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Valor Inventario</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{formatCurrency(developmentData.inventoryValue)}</div>
                        <p className="text-xs text-muted-foreground">
                            Disponible para venta
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Leads Activos</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">142</div>
                        <p className="text-xs text-muted-foreground">
                            +12 esta semana
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts */}
            <div className="grid gap-4 md:grid-cols-2">
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Velocidad de Ventas</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={salesVelocityData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                                <YAxis tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    cursor={{ fill: '#f3f4f6' }}
                                />
                                <Bar dataKey="sales" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Recent Activity Mockup */}
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Actividad Reciente</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            <div className="flex items-center">
                                <div className="mr-4 rounded-full bg-green-100 p-2">
                                    <DollarSign className="h-4 w-4 text-green-600" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">Nueva Venta - PH 1501</p>
                                    <p className="text-xs text-muted-foreground">Hace 2 horas via Roberto Diaz</p>
                                </div>
                                <div className="ml-auto font-medium">+$18.5M</div>
                            </div>
                            <div className="flex items-center">
                                <div className="mr-4 rounded-full bg-yellow-100 p-2">
                                    <Home className="h-4 w-4 text-yellow-600" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">Reserva - Unidad 802</p>
                                    <p className="text-xs text-muted-foreground">Hace 5 horas via Ana Garcia</p>
                                </div>
                                <div className="ml-auto font-medium">Apartado</div>
                            </div>
                            <div className="flex items-center">
                                <div className="mr-4 rounded-full bg-blue-100 p-2">
                                    <Users className="h-4 w-4 text-blue-600" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">Visita Realizada - Torre A</p>
                                    <p className="text-xs text-muted-foreground">Ayer a las 4:00 PM</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
