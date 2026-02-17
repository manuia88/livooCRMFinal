'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Mail, BarChart2, MousePointer, Send, MoreVertical, LayoutTemplate } from 'lucide-react';
import { emailCampaigns } from '@/lib/data/marketingData';

export default function EmailPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Email Marketing</h1>
          <p className="text-gray-500">Gestiona tus campañas de correo y newsletters</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" /> Crear Campaña
        </Button>
      </div>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-blue-600">Emails Enviados</p>
            <div className="text-3xl font-bold text-blue-900 mt-2">12,450</div>
            <p className="text-xs text-blue-600/80 mt-1">Últimos 30 días</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <Mail className="h-4 w-4 text-gray-500" />
              <p className="text-sm font-medium text-gray-600">Open Rate</p>
            </div>
            <div className="text-2xl font-bold text-gray-900">32.4%</div>
            <p className="text-xs text-green-600 mt-1">↑ 2.1% vs prom.</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <MousePointer className="h-4 w-4 text-gray-500" />
              <p className="text-sm font-medium text-gray-600">Click Rate</p>
            </div>
            <div className="text-2xl font-bold text-gray-900">5.8%</div>
            <p className="text-xs text-green-600 mt-1">↑ 0.4% vs prom.</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <BarChart2 className="h-4 w-4 text-gray-500" />
              <p className="text-sm font-medium text-gray-600">Bounce Rate</p>
            </div>
            <div className="text-2xl font-bold text-gray-900">0.8%</div>
            <p className="text-xs text-green-600 mt-1">Excelente salud</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Campaign List */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Campañas Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {emailCampaigns.map((camp) => (
                <div key={camp.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex items-start gap-4 mb-4 sm:mb-0">
                    <div className="p-3 bg-gray-100 rounded-lg">
                      <LayoutTemplate className="h-6 w-6 text-gray-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{camp.name}</h4>
                      <p className="text-sm text-gray-500">{camp.subject}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant={camp.status === 'sent' ? 'default' : 'outline'}>
                          {camp.status === 'sent' ? 'Enviado' : 'Programado'}
                        </Badge>
                        <span className="text-xs text-gray-400">
                          {new Date(camp.sentAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {camp.status === 'sent' && (
                    <div className="flex gap-6 text-center">
                      <div>
                        <p className="text-lg font-bold">{camp.openRate}%</p>
                        <p className="text-xs text-gray-500">Opens</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold">{camp.clickRate}%</p>
                        <p className="text-xs text-gray-500">Clicks</p>
                      </div>
                    </div>
                  )}

                  {camp.status === 'scheduled' && (
                    <Button variant="outline" size="sm">Editar</Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions / Templates */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Plantillas Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start h-auto py-3">
                <div className="bg-orange-100 p-2 rounded mr-3">
                  <Home className="h-4 w-4 text-orange-600" /> {/* Fixed import below */}
                </div>
                <div className="text-left">
                  <p className="font-medium">Nuevo Listing</p>
                  <p className="text-xs text-gray-500">Destaca una propiedad</p>
                </div>
              </Button>
              <Button variant="outline" className="w-full justify-start h-auto py-3">
                <div className="bg-blue-100 p-2 rounded mr-3">
                  <LayoutTemplate className="h-4 w-4 text-blue-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Newsletter Mensual</p>
                  <p className="text-xs text-gray-500">Resumen y noticias</p>
                </div>
              </Button>
              <Button variant="outline" className="w-full justify-start h-auto py-3">
                <div className="bg-purple-100 p-2 rounded mr-3">
                  <Send className="h-4 w-4 text-purple-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Seguimiento Lead</p>
                  <p className="text-xs text-gray-500">Texto simple personal</p>
                </div>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Home(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}
