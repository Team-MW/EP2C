import { FileText, Download, Trash2, ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';

interface DbDocument {
    id: number;
    name: string;
    type: string;
    size: string;
    status: string;
    createdAt: string;
    url: string;
}

export default function DocumentList() {
    const { user } = useUser();
    const [documents, setDocuments] = useState<DbDocument[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        const fetchDocuments = async () => {
            try {
                const res = await fetch(`/api/users/${user.id}/documents`);
                if (res.ok) {
                    const docs = await res.json();
                    setDocuments(docs);
                }
            } catch (error) {
                console.error('Error fetching documents:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDocuments();
    }, [user]);

    const handleDelete = async (docId: number) => {
        if (!confirm('Êtes-vous sûr de vouloir supprimer ce document ?')) {
            return;
        }

        try {
            const res = await fetch(`/api/documents/${docId}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                setDocuments(documents.filter(d => d.id !== docId));
                alert('Document supprimé avec succès !');
            } else {
                alert('Erreur lors de la suppression');
            }
        } catch (error) {
            alert('Erreur réseau');
        }
    };

    if (loading) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-800">Documents Récents</h3>
                </div>
                <div className="px-6 py-8 text-center text-gray-400">
                    Chargement...
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-semibold text-gray-800">Documents Récents</h3>
                <span className="text-sm text-gray-500">{documents.length} document{documents.length > 1 ? 's' : ''}</span>
            </div>
            {documents.length === 0 ? (
                <div className="px-6 py-8 text-center text-gray-400">
                    <FileText size={48} className="mx-auto mb-2 opacity-50" />
                    <p>Aucun document pour le moment</p>
                </div>
            ) : (
                <ul>
                    {documents.map((doc) => (
                        <li key={doc.id} className="px-6 py-4 border-b border-gray-50 hover:bg-gray-50 transition-colors flex items-center justify-between last:border-0">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-blue-50 rounded-lg text-[#1044A9]">
                                    <FileText size={24} />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">{doc.name}</p>
                                    <p className="text-xs text-gray-500">
                                        {new Date(doc.createdAt).toLocaleDateString('fr-FR')} • {doc.size} • {doc.type}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <a
                                    href={doc.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 text-gray-400 hover:text-[#1044A9] transition-colors"
                                    title="Voir le document"
                                >
                                    <ExternalLink size={18} />
                                </a>
                                <a
                                    href={doc.url}
                                    download
                                    className="p-2 text-gray-400 hover:text-[#1044A9] transition-colors"
                                    title="Télécharger"
                                >
                                    <Download size={18} />
                                </a>
                                <button
                                    onClick={() => handleDelete(doc.id)}
                                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                                    title="Supprimer"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
