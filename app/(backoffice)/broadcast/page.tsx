'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageSquare, Plus, Send, Clock, Users, CheckCircle, FileText } from 'lucide-react';
import { broadcastHistory, whatsappTemplates } from '@/lib/data/marketingData';
import AudienceSelector from '@/components/marketing/AudienceSelector';
import { useState } from 'react';

export default function BroadcastPage() {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [audienceCount, setAudienceCount] = useState(0);

  const handleSendBroadcast = () => {
    setIsWizardOpen(false);
    setWizardStep(1);
    // Logic to add to history would go here
    alert("¡Broadcast programado exitosamente!");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Broadcast (WhatsApp)</h1>
          <p className="text-gray-500">Envío masivo de mensajes a través de WhatsApp Business API</p>
        </div>
        <Dialog open={isWizardOpen} onOpenChange={setIsWizardOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" /> Nuevo Broadcast
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>Crear Nuevo Broadcast</DialogTitle>
              <DialogDescription>Paso {wizardStep} de 3</DialogDescription>
            </DialogHeader>

            {wizardStep === 1 && (
              <div className="space-y-4 py-4">
                <h3 className="font-medium">1. Selecciona tu Audiencia</h3>
                <AudienceSelector onSelectionChange={setAudienceCount} />
              </div>
            )}

            {wizardStep === 2 && (
              <div className="space-y-4 py-4">
                <h3 className="font-medium">2. Selecciona Plantilla</h3>
                <div className="grid grid-cols-1 gap-3 max-h-[300px] overflow-y-auto">
                  {whatsappTemplates.map(tpl => (
                    <div
                      key={tpl.id}
                      onClick={() => setSelectedTemplate(tpl.id)}
                      className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${selectedTemplate === tpl.id ? 'border-green-500 bg-green-50 ring-1 ring-green-500' : ''}`}
                    >
                      <div className="flex justify-between mb-2">
                        <span className="font-bold">{tpl.name}</span>
                        <Badge variant="outline">{tpl.category}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 bg-white p-2 rounded border border-gray-100 italic">
                        {tpl.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {wizardStep === 3 && (
              <div className="space-y-6 py-4">
                <div className="bg-green-50 p-6 rounded-lg border border-green-100 text-center">
                  <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-green-900">¡Listo para enviar!</h3>
                  <p className="text-green-700 mt-2">
                    Se enviará la plantilla <strong>{whatsappTemplates.find(t => t.id === selectedTemplate)?.name}</strong> a <strong>{audienceCount} destinatarios</strong>.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Programar envío</label>
                    <Input type="datetime-local" />
                  </div>
                </div>
              </div>
            )}

            <DialogFooter>
              {wizardStep > 1 && (
                <Button variant="outline" onClick={() => setWizardStep(wizardStep - 1)}>Atrás</Button>
              )}
              {wizardStep < 3 ? (
                <Button
                  onClick={() => setWizardStep(wizardStep + 1)}
                  disabled={wizardStep === 1 && audienceCount === 0 || wizardStep === 2 && !selectedTemplate}
                >
                  Siguiente
                </Button>
              ) : (
                <Button className="bg-green-600 hover:bg-green-700" onClick={handleSendBroadcast}>
                  <Send className="h-4 w-4 mr-2" /> Enviar Broadcast
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Mensajes Enviados (Mes)</CardTitle>
            <MessageSquare className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5,420</div>
            <p className="text-xs text-gray-500">+12% vs mes anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Tasa de Lectura</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">88.5%</div>
            <p className="text-xs text-gray-500">Alta particiación</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Respuestas</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">412</div>
            <p className="text-xs text-gray-500">Leads generados</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="history">
        <TabsList>
          <TabsTrigger value="history">Historial de Envíos</TabsTrigger>
          <TabsTrigger value="templates">Plantillas</TabsTrigger>
        </TabsList>

        <TabsContent value="history" className="mt-4">
          <div className="grid gap-4">
            {broadcastHistory.map((bc) => (
              <Card key={bc.id}>
                <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-100 rounded-full text-green-600">
                      <Send className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{bc.name}</h3>
                      <div className="flex gap-2 text-sm text-gray-500">
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {new Date(bc.sentAt).toLocaleDateString()}</span>
                        <span className="flex items-center gap-1"><FileText className="h-3 w-3" /> {whatsappTemplates.find(t => t.id === bc.templateId)?.name}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-6 text-center">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{bc.recipients}</p>
                      <p className="text-xs text-gray-500">Enviados</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-600">{Math.round((bc.read / bc.delivered) * 100)}%</p>
                      <p className="text-xs text-gray-500">Leídos</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-blue-600">{bc.replied}</p>
                      <p className="text-xs text-gray-500">Respuestas</p>
                    </div>
                  </div>

                  <div>
                    <Button variant="outline">Ver Reporte</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {whatsappTemplates.map((tpl) => (
              <Card key={tpl.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base">{tpl.name}</CardTitle>
                    <Badge className={
                      tpl.status === 'approved' ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-yellow-100 text-yellow-800'
                    }>{tpl.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-100 p-3 rounded-md text-sm text-gray-700 mb-3 relative">
                    <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-white rounded-full p-1 shadow-sm">
                      <MessageSquare className="h-3 w-3 text-green-600" />
                    </div>
                    {tpl.content}
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span className="uppercase">{tpl.language}</span>
                    <span className="capitalize">{tpl.category}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Card className="border-dashed flex items-center justify-center h-[200px] cursor-pointer hover:bg-gray-50">
              <div className="text-center text-gray-500">
                <Plus className="h-8 w-8 mx-auto mb-2" />
                <p className="font-medium">Nueva Plantilla</p>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
