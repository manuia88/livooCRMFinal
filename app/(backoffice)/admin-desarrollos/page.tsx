'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { developmentData } from '@/lib/data/adminDesarrollosData';
import { Building2, MapPin } from 'lucide-react';
import DashboardTab from './components/DashboardTab';
import InventoryMatrix from './components/InventoryMatrix';
import LeadsTab from './components/LeadsTab';
import SalesTab from './components/SalesTab';
import HandoversTab from './components/HandoversTab';
import DocumentsTab from './components/DocumentsTab';
import TimelineTab from './components/TimelineTab';

export default function AdminDesarrollosPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Gestión de Desarrollos</h1>
          <div className="flex items-center gap-2 text-gray-500 mt-1">
            <Building2 className="h-4 w-4" />
            <span>{developmentData.name}</span>
            <span className="mx-1">•</span>
            <MapPin className="h-4 w-4" />
            <span>{developmentData.location}</span>
          </div>
        </div>

        <Select defaultValue={developmentData.id}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Seleccionar Desarrollo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={developmentData.id}>{developmentData.name}</SelectItem>
            <SelectItem value="dev-002">Parque Interlomas</SelectItem>
            <SelectItem value="dev-003">Aura Condesa</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="dashboard" className="space-y-4">
        <div className="overflow-x-auto pb-2">
          <TabsList className="w-full justify-start h-auto p-1 bg-gray-100/50">
            <TabsTrigger value="dashboard" className="px-4 py-2">Dashboard</TabsTrigger>
            <TabsTrigger value="inventory" className="px-4 py-2">Inventario</TabsTrigger>
            <TabsTrigger value="leads" className="px-4 py-2">Leads</TabsTrigger>
            <TabsTrigger value="sales" className="px-4 py-2">Ventas</TabsTrigger>
            <TabsTrigger value="handovers" className="px-4 py-2">Entregas</TabsTrigger>
            <TabsTrigger value="documents" className="px-4 py-2">Documentos</TabsTrigger>
            <TabsTrigger value="timeline" className="px-4 py-2">Avance</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="dashboard" className="space-y-4">
          <DashboardTab />
        </TabsContent>

        <TabsContent value="inventory" className="space-y-4">
          <InventoryMatrix />
        </TabsContent>

        <TabsContent value="leads" className="space-y-4">
          <LeadsTab />
        </TabsContent>

        <TabsContent value="sales" className="space-y-4">
          <SalesTab />
        </TabsContent>

        <TabsContent value="handovers" className="space-y-4">
          <HandoversTab />
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <DocumentsTab />
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          <TimelineTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
