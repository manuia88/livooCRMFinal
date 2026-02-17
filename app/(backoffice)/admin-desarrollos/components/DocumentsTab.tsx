'use client';

import { Card, CardContent } from '@/components/ui/card';
import { fileCategories } from '@/lib/data/adminDesarrollosData';
import { Folder, FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DocumentsTab() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Documentación del Proyecto</h3>
                <Button>Subir Archivo</Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {fileCategories.map((cat, idx) => (
                    <Card key={idx} className="cursor-pointer hover:bg-gray-50 hover:border-blue-300 transition-all">
                        <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                            <Folder className="h-10 w-10 text-yellow-500" />
                            <div>
                                <h4 className="font-bold text-gray-900">{cat.name}</h4>
                                <p className="text-sm text-gray-500">{cat.count} archivos</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div>
                <h4 className="font-semibold text-gray-900 mb-4">Archivos Recientes</h4>
                <div className="bg-white rounded-lg border divide-y">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50">
                            <div className="flex items-center gap-3">
                                <FileText className="h-5 w-5 text-blue-500" />
                                <div>
                                    <p className="font-medium text-sm text-gray-900">Plano_Arquitectonico_v{i}.pdf</p>
                                    <p className="text-xs text-gray-500">Subido por Arq. Mendiola • 2.4 MB</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon">
                                <Download className="h-4 w-4 text-gray-500" />
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
