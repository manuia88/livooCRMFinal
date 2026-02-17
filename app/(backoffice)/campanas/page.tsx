'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { adCampaigns } from '@/lib/data/marketingData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Target, TrendingUp, DollarSign, MousePointer } from 'lucide-react';

export default function AdsPage() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Campañas Ads</h1>
          <p className="text-gray-500">Métricas unificadas de Facebook y Google Ads</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Inversión Total</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$42,400</div>
            <p className="text-xs text-gray-500">Últimos 30 días</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">ROAS Global</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">3.8x</div>
            <p className="text-xs text-green-600">Excelente retorno</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Leads Generados</CardTitle>
            <Target className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">177</div>
            <p className="text-xs text-gray-500">Cost per Lead: $239</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Clicks</CardTitle>
            <MousePointer className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,350</div>
            <p className="text-xs text-gray-500">CTR: 1.8%</p>
          </CardContent>
        </Card>
      </div>

      {/* Campaigns Table */}
      <Card>
        <CardHeader>
          <CardTitle>Rendimiento por Campaña</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-500 font-medium">
                <tr>
                  <th className="p-4">Campaña</th>
                  <th className="p-4">Plataforma</th>
                  <th className="p-4 text-right">Inversión</th>
                  <th className="p-4 text-right">Leads</th>
                  <th className="p-4 text-right">Cost/Lead</th>
                  <th className="p-4 text-right">ROAS</th>
                  <th className="p-4 text-center">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {adCampaigns.map((camp) => (
                  <tr key={camp.id} className="hover:bg-gray-50">
                    <td className="p-4 font-medium">{camp.name}</td>
                    <td className="p-4">
                      <Badge variant="outline" className={
                        camp.platform === 'facebook' ? 'border-blue-200 text-blue-700 bg-blue-50' : 'border-green-200 text-green-700 bg-green-50'
                      }>
                        {camp.platform}
                      </Badge>
                    </td>
                    <td className="p-4 text-right">{formatCurrency(camp.spend)}</td>
                    <td className="p-4 text-right font-bold">{camp.leads}</td>
                    <td className="p-4 text-right">{formatCurrency(camp.cpl)}</td>
                    <td className="p-4 text-right font-bold text-green-600">{camp.roas}x</td>
                    <td className="p-4 text-center">
                      <div className={`h-2.5 w-2.5 rounded-full mx-auto ${camp.status === 'active' ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Simple Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Leads vs Inversión (Últimos 30 días)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={adCampaigns}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={false} />
                <YAxis />
                <Tooltip cursor={{ fill: '#f3f4f6' }} />
                <Bar dataKey="spend" name="Inversión" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="leads" name="Leads Generados" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
