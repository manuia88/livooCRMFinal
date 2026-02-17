'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { leadsData } from '@/lib/data/adminDesarrollosData';
import { Phone, Mail, User, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LeadsTab() {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Leads Interesados</h3>
                <Button size="sm">Nuevo Lead</Button>
            </div>

            {leadsData.map((lead) => (
                <Card key={lead.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                {lead.name.substring(0, 2)}
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">{lead.name}</p>
                                <div className="flex gap-3 text-sm text-gray-500">
                                    <span className="flex items-center gap-1"><User className="h-3 w-3" /> {lead.interestedIn}</span>
                                    <span className="flex items-center gap-1 text-green-600 font-medium">{lead.budget}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-6">
                            <div>
                                <Badge variant="outline" className={
                                    lead.status === 'Nuevo' ? 'bg-blue-50 text-blue-700' :
                                        lead.status === 'Oferta' ? 'bg-green-50 text-green-700' :
                                            'bg-gray-100 text-gray-700'
                                }>
                                    {lead.status}
                                </Badge>
                                <p className="text-xs text-right text-gray-400 mt-1">{lead.lastContact}</p>
                            </div>
                            <div className="flex gap-2">
                                <Button size="icon" variant="ghost"><Phone className="h-4 w-4" /></Button>
                                <Button size="icon" variant="ghost"><Mail className="h-4 w-4" /></Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
