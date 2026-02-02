import { FileText, Download, Trash2, ExternalLink, Search } from 'lucide-react';
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
    const [searchTerm, setSearchTerm] = useState('');

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

    const filteredDocs = documents.filter(doc =>
        doc.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-8 text-center">
                <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-500">Chargement de vos documents...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header / Search */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h3 className="text-xl font-bold text-gray-800">Tous vos documents</h3>
                    <p className="text-gray-500 text-sm">Consultez et gérez l'ensemble de vos fichiers</p>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Rechercher un document..."
                        className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-full md:w-64 transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Documents Grid */}
            {filteredDocs.length === 0 ? (
                <div className="bg-white rounded-xl border-2 border-dashed border-gray-200 p-12 text-center">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        {searchTerm ? <Search className="text-gray-400" size={32} /> : <FileText className="text-gray-400" size={32} />}
                    </div>
                    <h4 className="text-lg font-medium text-gray-900 mb-1">
                        {searchTerm ? 'Aucun résultat trouvé' : 'Aucun document'}
                    </h4>
                    <p className="text-gray-500">
                        {searchTerm ? `Aucun document ne correspond à "${searchTerm}"` : "Vous n'avez pas encore de documents disponibles."}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredDocs.map((doc) => (
                        <div key={doc.id} className="group bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:border-blue-100">
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                    <FileText size={24} />
                                </div>
                                <div className="flex gap-1">
                                    <a
                                        href={doc.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                        title="Voir"
                                    >
                                        <ExternalLink size={18} />
                                    </a>
                                    <button
                                        onClick={() => handleDelete(doc.id)}
                                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Supprimer"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>

                            <h4 className="font-semibold text-gray-900 mb-1 truncate" title={doc.name}>
                                {doc.name}
                            </h4>

                            <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                                <span className="uppercase font-medium bg-gray-100 px-2 py-0.5 rounded">{doc.type || 'DOC'}</span>
                                <span>{doc.size}</span>
                                <span>•</span>
                                <span>{new Date(doc.createdAt).toLocaleDateString('fr-FR')}</span>
                            </div>

                            <a
                                href={doc.url}
                                download
                                className="flex items-center justify-center gap-2 w-full py-2 bg-gray-50 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors group-hover:bg-blue-50 group-hover:text-blue-700"
                            >
                                <Download size={16} />
                                Télécharger
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
