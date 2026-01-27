import { FileText, Download, Trash2 } from 'lucide-react';

export default function DocumentList() {
    // Placeholder data
    const docs = [
        { id: 1, name: 'Bulletin_Paie_Janvier.pdf', date: '27/01/2026', size: '1.2 Mo' },
        { id: 2, name: 'Contrat_Travail_CDI.pdf', date: '15/01/2026', size: '2.4 Mo' },
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-semibold text-gray-800">Documents Récents</h3>
            </div>
            <ul>
                {docs.map((doc) => (
                    <li key={doc.id} className="px-6 py-4 border-b border-gray-50 hover:bg-gray-50 transition-colors flex items-center justify-between last:border-0">
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
                                <FileText size={24} />
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">{doc.name}</p>
                                <p className="text-xs text-gray-500">{doc.date} • {doc.size}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="p-2 text-gray-400 hover:text-[#1044A9] transition-colors"><Download size={18} /></button>
                            <button className="p-2 text-gray-400 hover:text-red-600 transition-colors"><Trash2 size={18} /></button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
