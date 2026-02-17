'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Users, Filter } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

interface AudienceSelectorProps {
    onSelectionChange: (count: number) => void;
}

export default function AudienceSelector({ onSelectionChange }: AudienceSelectorProps) {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const tags = [
        { id: 'vip', label: 'Clientes VIP', count: 45 },
        { id: 'hot', label: 'Hot Leads', count: 120 },
        { id: 'investors', label: 'Inversionistas', count: 85 },
        { id: 'polanco', label: 'Interés: Polanco', count: 210 },
        { id: 'condesa', label: 'Interés: Condesa', count: 150 },
        { id: 'buyers', label: 'Compradores Activos', count: 320 },
    ];

    const toggleTag = (id: string) => {
        const newTags = selectedTags.includes(id)
            ? selectedTags.filter(t => t !== id)
            : [...selectedTags, id];

        setSelectedTags(newTags);

        // Mock calculation of total audience size
        const totalCount = newTags.reduce((acc, tagId) => {
            const tag = tags.find(t => t.id === tagId);
            return acc + (tag ? tag.count : 0);
        }, 0);

        // Simple mock overlap reduction
        const estimatedAudience = Math.round(totalCount * 0.85);
        onSelectionChange(newTags.length > 0 ? estimatedAudience : 0);
    };

    return (
        <div className="space-y-4">
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input placeholder="Buscar contactos o etiquetas..." className="pl-9" />
                </div>
                <Button variant="outline"><Filter className="h-4 w-4 mr-2" /> Filtrar</Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {tags.map((tag) => (
                    <div
                        key={tag.id}
                        onClick={() => toggleTag(tag.id)}
                        className={`
              cursor-pointer border rounded-lg p-3 flex justify-between items-center transition-all
              ${selectedTags.includes(tag.id) ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-500' : 'hover:border-gray-400'}
            `}
                    >
                        <div>
                            <p className="font-medium text-sm">{tag.label}</p>
                            <p className="text-xs text-gray-500">{tag.count} contactos</p>
                        </div>
                        <Checkbox checked={selectedTags.includes(tag.id)} />
                    </div>
                ))}
            </div>

            {selectedTags.length > 0 && (
                <Card className="bg-gray-50 border-dashed">
                    <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-gray-500" />
                            <span className="text-sm font-medium">Audiencia Estimada:</span>
                        </div>
                        <Badge className="text-lg px-3 py-1 bg-blue-600">
                            {(() => {
                                const total = selectedTags.reduce((acc, tid) => acc + (tags.find(t => t.id === tid)?.count || 0), 0);
                                return Math.round(total * 0.85);
                            })()} contactos
                        </Badge>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
