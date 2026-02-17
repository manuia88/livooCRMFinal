'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { socialPosts } from '@/lib/data/marketingData';
import { Calendar as CalendarIcon, Plus, Instagram, Facebook, Linkedin, Video } from 'lucide-react';
import { addDays, format, startOfWeek, addWeeks, subDays, isSameDay } from 'date-fns';
import { es } from 'date-fns/locale';

export default function SocialPlannerPage() {
  const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'instagram': return <Instagram className="h-4 w-4 text-pink-600" />;
      case 'facebook': return <Facebook className="h-4 w-4 text-blue-600" />;
      case 'tiktok': return <Video className="h-4 w-4 text-black" />; // Using Video icon for TikTok
      case 'linkedin': return <Linkedin className="h-4 w-4 text-blue-700" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Social Planner</h1>
          <p className="text-gray-500">Calendario de contenido para redes sociales</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Conectar Cuenta</Button>
          <Button className="bg-pink-600 hover:bg-pink-700">
            <Plus className="h-4 w-4 mr-2" /> Crear Post
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar View */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex justify-between items-center bg-white p-4 rounded-lg border shadow-sm">
            <h2 className="font-bold text-lg capitalize">
              {format(new Date(), 'MMMM yyyy', { locale: es })}
            </h2>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm">Semana</Button>
              <Button variant="ghost" size="sm">Mes</Button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-px bg-gray-200 border rounded-lg overflow-hidden">
            {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map(d => (
              <div key={d} className="bg-gray-50 p-2 text-center text-sm font-medium text-gray-500">
                {d}
              </div>
            ))}

            {weekDays.map((day) => {
              const postsForDay = socialPosts.filter(p => isSameDay(new Date(p.scheduledFor), day));
              const isToday = isSameDay(new Date(), day);

              return (
                <div key={day.toString()} className={`bg-white min-h-[150px] p-2 relative ${isToday ? 'bg-blue-50/30' : ''}`}>
                  <p className={`text-sm font-medium mb-2 ${isToday ? 'text-blue-600' : 'text-gray-700'}`}>
                    {format(day, 'd')}
                  </p>

                  <div className="space-y-2">
                    {postsForDay.map(post => (
                      <div key={post.id} className="text-xs p-2 rounded border bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                        <div className="flex gap-1 mb-1">
                          {post.channels.map(c => (
                            <span key={c}>{getChannelIcon(c)}</span>
                          ))}
                        </div>
                        <p className="line-clamp-2 text-gray-600">{post.content}</p>
                        <Badge variant="secondary" className="mt-1 text-[10px] h-4">
                          {format(new Date(post.scheduledFor), 'HH:mm')}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar / Queue */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Próximos Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {socialPosts.filter(p => p.status === 'scheduled').map(post => (
                  <div key={post.id} className="flex gap-3 items-start">
                    <div className="h-10 w-10 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                      <CalendarIcon className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium line-clamp-1">{post.content}</p>
                      <p className="text-xs text-gray-500">
                        {format(new Date(post.scheduledFor), "d 'de' MMM, HH:mm", { locale: es })}
                      </p>
                      <div className="flex gap-1 mt-1">
                        {post.channels.map(c => <span key={c}>{getChannelIcon(c)}</span>)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Cuentas Conectadas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Instagram className="h-5 w-5 text-pink-600" />
                  <span className="text-sm font-medium">@livoo.mx</span>
                </div>
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Facebook className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium">Livoo Real Estate</span>
                </div>
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
