'use client';

import { useState } from 'react';
import { PageContainer, PageHeader } from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Search,
  Filter,
  Mail,
  MessageSquare,
  Facebook,
  Instagram,
  Send,
  Paperclip,
  MoreVertical,
  Phone,
  Video,
  Archive,
  Tag,
  User,
  Building2,
  Clock,
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

type Channel = 'whatsapp' | 'email' | 'facebook' | 'instagram' | 'web' | 'all';
type ConversationStatus = 'open' | 'pending' | 'closed';

interface Message {
  id: string;
  content: string;
  sender: 'agent' | 'client';
  timestamp: Date;
  read: boolean;
}

interface Conversation {
  id: string;
  contact: {
    name: string;
    avatar: string;
    phone?: string;
    email?: string;
  };
  channel: Exclude<Channel, 'all'>;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  status: ConversationStatus;
  assignedTo: string;
  tags: string[];
  linkedProperty?: string;
  messages: Message[];
}

const mockConversations: Conversation[] = [
  {
    id: '1',
    contact: {
      name: 'Roberto Sánchez',
      avatar: 'RS',
      phone: '+52 55 1234-5678',
    },
    channel: 'whatsapp',
    lastMessage: '¿Cuándo podemos agendar la visita?',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 5), // 5 min ago
    unreadCount: 2,
    status: 'open',
    assignedTo: 'Ana García',
    tags: ['Premium', 'Urgente'],
    linkedProperty: 'Penthouse Roma Norte',
    messages: [
      {
        id: 'm1',
        content: 'Hola, me interesa el penthouse que vi en Inmuebles24',
        sender: 'client',
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        read: true,
      },
      {
        id: 'm2',
        content: 'Hola Roberto! Claro, con gusto te puedo mostrar el penthouse. ¿Qué día te viene mejor?',
        sender: 'agent',
        timestamp: new Date(Date.now() - 1000 * 60 * 20),
        read: true,
      },
      {
        id: 'm3',
        content: '¿Cuándo podemos agendar la visita?',
        sender: 'client',
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
        read: false,
      },
    ],
  },
  {
    id: '2',
    contact: {
      name: 'Laura Martínez',
      avatar: 'LM',
      email: 'laura.martinez@example.com',
    },
    channel: 'email',
    lastMessage: 'Gracias por la información, me gustaría conocer más detalles...',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    unreadCount: 0,
    status: 'pending',
    assignedTo: 'Carlos Ruiz',
    tags: ['Seguimiento'],
    linkedProperty: 'Casa Polanco',
    messages: [
      {
        id: 'm1',
        content: 'Me interesa la casa en Polanco. ¿Está disponible?',
        sender: 'client',
        timestamp: new Date(Date.now() - 1000 * 60 * 180),
        read: true,
      },
      {
        id: 'm2',
        content: 'Sí Laura, la casa está disponible. Te comparto la ficha técnica adjunta.',
        sender: 'agent',
        timestamp: new Date(Date.now() - 1000 * 60 * 150),
        read: true,
      },
    ],
  },
  {
    id: '3',
    contact: {
      name: 'Pedro Gómez',
      avatar: 'PG',
      phone: '+52 55 5555-1111',
    },
    channel: 'facebook',
    lastMessage: 'Me gustaría más información',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    unreadCount: 1,
    status: 'open',
    assignedTo: 'María López',
    tags: ['Calificado'],
    messages: [],
  },
  {
    id: '4',
    contact: {
      name: 'Isabel Fernández',
      avatar: 'IF',
      phone: '+52 55 2222-3333',
    },
    channel: 'instagram',
    lastMessage: '👍',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    unreadCount: 0,
    status: 'closed',
    assignedTo: 'Ana García',
    tags: [],
    messages: [],
  },
];

const channelIcons = {
  whatsapp: FaWhatsapp,
  email: Mail,
  facebook: Facebook,
  instagram: Instagram,
  web: MessageSquare,
};

const channelColors = {
  whatsapp: 'text-green-600 bg-green-50',
  email: 'text-blue-600 bg-blue-50',
  facebook: 'text-blue-700 bg-blue-50',
  instagram: 'text-pink-600 bg-pink-50',
  web: 'text-gray-600 bg-gray-50',
};

function getStatusColor(status: ConversationStatus) {
  const colors = {
    open: 'bg-green-100 text-green-700',
    pending: 'bg-amber-100 text-amber-700',
    closed: 'bg-gray-100 text-gray-700',
  };
  return colors[status];
}

export default function InboxPage() {
  const [selectedChannel, setSelectedChannel] = useState<Channel>('all');
  const [selectedConversation, setSelectedConversation] = useState<string | null>(mockConversations[0].id);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = mockConversations.filter((conv) => {
    const matchesChannel = selectedChannel === 'all' || conv.channel === selectedChannel;
    const matchesSearch =
      searchQuery === '' ||
      conv.contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesChannel && matchesSearch;
  });

  const currentConversation = mockConversations.find((c) => c.id === selectedConversation);

  const totalUnread = mockConversations.reduce((sum, conv) => sum + conv.unreadCount, 0);

  return (
    <PageContainer>
      <PageHeader
        title="Inbox Unificado"
        description={`${totalUnread} mensajes sin leer`}
        actions={
          <>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filtros
            </Button>
            <Button variant="outline">
              <Archive className="mr-2 h-4 w-4" />
              Archivar
            </Button>
          </>
        }
      />

      {/* Channel Tabs */}
      <Card className="p-4 mb-6">
        <div className="flex gap-2 overflow-x-auto">
          <Button
            variant={selectedChannel === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedChannel('all')}
          >
            Todos
            {totalUnread > 0 && (
              <Badge className="ml-2 bg-red-500 text-white">
                {totalUnread}
              </Badge>
            )}
          </Button>
          {(['whatsapp', 'email', 'facebook', 'instagram', 'web'] as const).map((channel) => {
            const Icon = channelIcons[channel];
            const channelConvs = mockConversations.filter((c) => c.channel === channel);
            const channelUnread = channelConvs.reduce((sum, c) => sum + c.unreadCount, 0);

            return (
              <Button
                key={channel}
                variant={selectedChannel === channel ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedChannel(channel)}
                className="flex items-center gap-2"
              >
                <Icon className="h-4 w-4" />
                {channel.charAt(0).toUpperCase() + channel.slice(1)}
                {channelUnread > 0 && (
                  <Badge className="ml-1 bg-red-500 text-white">
                    {channelUnread}
                  </Badge>
                )}
              </Button>
            );
          })}
        </div>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-280px)]">
        {/* Conversations List */}
        <Card className="lg:col-span-1 overflow-hidden flex flex-col">
          {/* Search */}
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-tertiary)]" />
              <Input
                placeholder="Buscar conversaciones..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conversation) => {
              const Icon = channelIcons[conversation.channel];
              const isSelected = selectedConversation === conversation.id;

              return (
                <div
                  key={conversation.id}
                  className={`p-4 border-b cursor-pointer hover:bg-[var(--bg-page)] transition-colors ${isSelected ? 'bg-[var(--bg-page)] border-l-4 border-l-blue-500' : ''
                    }`}
                  onClick={() => setSelectedConversation(conversation.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative flex-shrink-0">
                      <div className="h-12 w-12 rounded-full bg-[var(--bg-page)] flex items-center justify-center font-semibold text-[var(--text-primary)]">
                        {conversation.contact.avatar}
                      </div>
                      <div className={`absolute -bottom-1 -right-1 h-5 w-5 rounded-full flex items-center justify-center ${channelColors[conversation.channel]}`}>
                        <Icon className="h-3 w-3" />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-semibold text-sm text-[var(--text-primary)] truncate">
                          {conversation.contact.name}
                        </h4>
                        <span className="text-xs text-[var(--text-tertiary)] flex-shrink-0">
                          {format(conversation.lastMessageTime, 'HH:mm', { locale: es })}
                        </span>
                      </div>
                      <p className="text-sm text-[var(--text-secondary)] mt-1 line-clamp-2">
                        {conversation.lastMessage}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        {conversation.unreadCount > 0 && (
                          <Badge className="bg-red-500 text-white text-xs">
                            {conversation.unreadCount}
                          </Badge>
                        )}
                        <Badge className={`${getStatusColor(conversation.status)} text-xs`}>
                          {conversation.status}
                        </Badge>
                        {conversation.tags.map((tag, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredConversations.length === 0 && (
              <div className="p-12 text-center">
                <p className="text-[var(--text-secondary)]">
                  No se encontraron conversaciones
                </p>
              </div>
            )}
          </div>
        </Card>

        {/* Chat Panel */}
        <Card className="lg:col-span-2 overflow-hidden flex flex-col">
          {currentConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[var(--bg-page)] flex items-center justify-center font-semibold">
                    {currentConversation.contact.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--text-primary)]">
                      {currentConversation.contact.name}
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)]">
                      {currentConversation.contact.phone || currentConversation.contact.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Tag className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {currentConversation.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'agent' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${message.sender === 'agent'
                          ? 'bg-blue-500 text-white'
                          : 'bg-[var(--bg-page)] text-[var(--text-primary)]'
                        }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p
                        className={`text-xs mt-1 ${message.sender === 'agent' ? 'text-blue-100' : 'text-[var(--text-tertiary)]'
                          }`}
                      >
                        {format(message.timestamp, 'HH:mm', { locale: es })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Textarea
                    placeholder="Escribe un mensaje..."
                    className="flex-1 min-h-[40px] max-h-[120px] resize-none"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        // Send message logic here
                        setMessageText('');
                      }
                    }}
                  />
                  <Button>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-2 flex gap-2">
                  <Button variant="outline" size="sm">
                    📍 Enviar ubicación
                  </Button>
                  <Button variant="outline" size="sm">
                    🏠 Compartir propiedad
                  </Button>
                  <Button variant="outline" size="sm">
                    📄 Plantillas
                  </Button>
                </div>
              </div>

              {/* Side Panel - Contact Info */}
              <div className="hidden xl:block absolute right-0 top-0 w-[300px] h-full border-l bg-white p-4">
                <h4 className="font-semibold text-[var(--text-primary)] mb-4">
                  Información del Contacto
                </h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-[var(--text-tertiary)] mb-1">Asesor Asignado</p>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-[var(--text-secondary)]" />
                      <span className="text-sm text-[var(--text-primary)]">
                        {currentConversation.assignedTo}
                      </span>
                    </div>
                  </div>
                  {currentConversation.linkedProperty && (
                    <div>
                      <p className="text-xs text-[var(--text-tertiary)] mb-1">Propiedad de Interés</p>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-[var(--text-secondary)]" />
                        <span className="text-sm text-[var(--text-primary)]">
                          {currentConversation.linkedProperty}
                        </span>
                      </div>
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-[var(--text-tertiary)] mb-2">Etiquetas</p>
                    <div className="flex flex-wrap gap-1">
                      {currentConversation.tags.map((tag, idx) => (
                        <Badge key={idx} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="h-16 w-16 text-[var(--text-tertiary)] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                  Selecciona una conversación
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  Elige un contacto para comenzar a chatear
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </PageContainer>
  );
}
