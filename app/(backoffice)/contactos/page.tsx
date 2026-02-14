'use client';

import { useState } from 'react';
import { PageContainer, PageHeader } from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Mail,
  Phone,
  MessageSquare,
  MoreVertical,
  Tag,
  Star,
} from 'lucide-react';
import { Input } from '@/components/ui/input';

// Mock Contactos Data
const mockContacts = [
  {
    id: '1',
    name: 'Roberto Sánchez',
    email: 'roberto.sanchez@example.com',
    phone: '+52 55 1234-5678',
    leadScore: 85,
    tags: ['Premium', 'Polanco'],
    source: 'Inmuebles24',
    budget: '$5-8M',
    status: 'Calificado',
    lastContact: '2 horas',
    assignedTo: 'Ana García',
    avatar: 'RS',
  },
  {
    id: '2',
    name: 'Laura Martínez',
    email: 'laura.martinez@example.com',
    phone: '+52 55 9876-5432',
    leadScore: 72,
    tags: ['Roma Norte', 'Urgente'],
    source: 'Web',
    budget: '$3-5M',
    status: 'Contactado',
    lastContact: '1 día',
    assignedTo: 'Carlos Ruiz',
    avatar: 'LM',
  },
  {
    id: '3',
    name: 'Pedro Gómez',
    email: 'pedro.gomez@example.com',
    phone: '+52 55 5555-1111',
    leadScore: 45,
    tags: ['Condesa'],
    source: 'Facebook',
    budget: '$2-3M',
    status: 'Nuevo',
    lastContact: '15 min',
    assignedTo: 'María López',
    avatar: 'PG',
  },
  {
    id: '4',
    name: 'Isabel Fernández',
    email: 'isabel.fernandez@example.com',
    phone: '+52 55 2222-3333',
    leadScore: 91,
    tags: ['Premium', 'Loft', 'Inversionista'],
    source: 'Referido',
    budget: '$10M+',
    status: 'Propuesta Enviada',
    lastContact: '3 días',
    assignedTo: 'Ana García',
    avatar: 'IF',
  },
  {
    id: '5',
    name: 'Miguel Torres',
    email: 'miguel.torres@example.com',
    phone: '+52 55 7777-8888',
    leadScore: 58,
    tags: ['Del Valle'],
    source: 'Google Ads',
    budget: '$4-6M',
    status: 'Seguimiento',
    lastContact: '1 semana',
    assignedTo: 'Juan Pérez',
    avatar: 'MT',
  },
];

function getScoreColor(score: number) {
  if (score >= 80) return 'bg-green-500';
  if (score >= 60) return 'bg-blue-500';
  if (score >= 40) return 'bg-amber-500';
  return 'bg-red-500';
}

function getStatusColor(status: string) {
  const colors: Record<string, string> = {
    'Nuevo': 'bg-blue-100 text-blue-700',
    'Contactado': 'bg-purple-100 text-purple-700',
    'Calificado': 'bg-green-100 text-green-700',
    'Propuesta Enviada': 'bg-amber-100 text-amber-700',
    'Seguimiento': 'bg-gray-100 text-gray-700',
  };
  return colors[status] || 'bg-gray-100 text-gray-700';
}

export default function ContactosPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContact, setSelectedContact] = useState<string | null>(null);

  const filteredContacts = mockContacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageContainer>
      <PageHeader
        title="Contactos 2.0"
        description={`${mockContacts.length} contactos en tu base de datos`}
        actions={
          <>
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Importar CSV
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Contacto
            </Button>
          </>
        }
      />

      {/* Search and Filters Bar */}
      <Card className="p-4 mb-6">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-tertiary)]" />
            <Input
              placeholder="Buscar por nombre, email, teléfono..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filtros
          </Button>
          <Button variant="outline">
            <Tag className="mr-2 h-4 w-4" />
            Etiquetas
          </Button>
        </div>
      </Card>

      {/* Contacts Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-[var(--bg-page)]">
              <tr>
                <th className="text-left p-4 text-sm font-semibold text-[var(--text-primary)]">
                  Contacto
                </th>
                <th className="text-left p-4 text-sm font-semibold text-[var(--text-primary)]">
                  Lead Score
                </th>
                <th className="text-left p-4 text-sm font-semibold text-[var(--text-primary)]">
                  Estado
                </th>
                <th className="text-left p-4 text-sm font-semibold text-[var(--text-primary)]">
                  Etiquetas
                </th>
                <th className="text-left p-4 text-sm font-semibold text-[var(--text-primary)]">
                  Presupuesto
                </th>
                <th className="text-left p-4 text-sm font-semibold text-[var(--text-primary)]">
                  Último Contacto
                </th>
                <th className="text-left p-4 text-sm font-semibold text-[var(--text-primary)]">
                  Asesor
                </th>
                <th className="text-right p-4 text-sm font-semibold text-[var(--text-primary)]">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map((contact) => (
                <tr
                  key={contact.id}
                  className="border-b hover:bg-[var(--bg-page)] transition-colors cursor-pointer"
                  onClick={() => setSelectedContact(contact.id)}
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-[var(--bg-page)] flex items-center justify-center font-semibold text-sm text-[var(--text-primary)]">
                        {contact.avatar}
                      </div>
                      <div>
                        <p className="font-medium text-[var(--text-primary)]">
                          {contact.name}
                        </p>
                        <p className="text-sm text-[var(--text-secondary)]">
                          {contact.email}
                        </p>
                        <p className="text-xs text-[var(--text-tertiary)]">
                          {contact.phone}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2 w-16">
                          <div
                            className={`h-2 rounded-full ${getScoreColor(contact.leadScore)}`}
                            style={{ width: `${contact.leadScore}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-[var(--text-primary)]">
                          {contact.leadScore}
                        </span>
                      </div>
                      {contact.leadScore >= 80 && (
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge className={getStatusColor(contact.status)}>
                      {contact.status}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {contact.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-[var(--text-primary)] font-medium">
                      {contact.budget}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-[var(--text-secondary)]">
                      {contact.lastContact}
                    </span>
                    <p className="text-xs text-[var(--text-tertiary)] mt-0.5">
                      via {contact.source}
                    </p>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-[var(--text-primary)]">
                      {contact.assignedTo}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredContacts.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-[var(--text-secondary)]">
              No se encontraron contactos con "{searchQuery}"
            </p>
          </div>
        )}
      </Card>

      {/* Contact Details Drawer - appears when contact is selected */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black/20 z-50" onClick={() => setSelectedContact(null)}>
          <div
            className="absolute right-0 top-0 h-full w-[500px] bg-white shadow-2xl p-6 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              size="sm"
              className="mb-4"
              onClick={() => setSelectedContact(null)}
            >
              ← Cerrar
            </Button>
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                Perfil 360° de Contacto
              </h3>
              <p className="text-sm text-[var(--text-secondary)]">
                Timeline de actividad, propiedades de interés, notas y tareas próximamente
              </p>
            </div>
          </div>
        </div>
      )}
    </PageContainer>
  );
}
