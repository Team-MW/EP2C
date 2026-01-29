import React, { useState, useEffect } from 'react';
import { useUser, useClerk } from '@clerk/clerk-react';
import { Users, Search, Bell, LogOut, ChevronRight, ExternalLink, UserPlus, X, CheckCircle, Loader, FileText, Trash2, Lock, Unlock, Folder, FolderOpen, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './admin.css';

// Admin is hardcoded or determined by metadata in a real app
// For this demo, we assume any logged in user on /admin is admin or we trust the route protection
// Ideally, check user.publicMetadata.role === 'admin'

interface Document {
    id: number;
    name: string;
    type: string;
    size: string;
    url: string;
    createdAt: string;
    status: string;
    userId: number;
}

interface User {
    id: number;
    clerkId: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    company: string | null;
    status: string;
    createdAt: string;
    documents: Document[];
    role: string;
}

const DocumentManager = ({ documents, onDelete }: { documents: Document[], onDelete: (id: number, name: string) => void }) => {
    const [view, setView] = useState<'folders' | 'files'>('folders');
    const [currentFolder, setCurrentFolder] = useState<string | null>(null);

    // Group documents by category
    const groupedDocs = React.useMemo(() => {
        const groups: Record<string, Document[]> = {};

        documents.forEach(doc => {
            const match = doc.name.match(/^\[(.*?)\]\s*(.*)/);
            let category = 'Autre';
            let cleanName = doc.name;

            if (match) {
                category = match[1];
                cleanName = match[2];
            }

            if (!groups[category]) {
                groups[category] = [];
            }
            groups[category].push({ ...doc, name: cleanName }); // Use clean name for display? Or keep original? Let's use clean name for display but keep ID.
        });

        // Ensure default folders exist if empty? No, only show what exists + maybe standard ones if we want to encourage structure.
        // Let's stick to what exists for now.
        return groups;
    }, [documents]);

    const folders = Object.keys(groupedDocs).sort();

    if (view === 'folders') {
        return (
            <div className="p-6">
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Dossiers</h4>
                {folders.length === 0 ? (
                    <div className="text-center py-10 text-gray-400">
                        <Folder size={48} className="mx-auto mb-3 opacity-20" />
                        <p>Aucun dossier pour le moment.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {folders.map(folder => (
                            <button
                                key={folder}
                                onClick={() => { setCurrentFolder(folder); setView('files'); }}
                                className="flex flex-col items-center justify-center p-6 bg-blue-50/50 hover:bg-blue-100 border border-blue-100 rounded-xl transition-all group"
                            >
                                <Folder size={40} className="text-blue-400 group-hover:text-blue-600 mb-2 transition-colors" />
                                <span className="font-medium text-gray-700 group-hover:text-blue-800">{folder}</span>
                                <span className="text-xs text-gray-400 mt-1">{groupedDocs[folder].length} fichier(s)</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center gap-2 p-4 border-b border-gray-100 bg-gray-50/50">
                <button
                    onClick={() => { setView('folders'); setCurrentFolder(null); }}
                    className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                >
                    <ArrowLeft size={18} className="text-gray-600" />
                </button>
                <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-500 flex items-center gap-1"><Folder size={14} /> Dossiers</span>
                    <ChevronRight size={14} className="text-gray-400" />
                    <span className="font-semibold text-gray-900 flex items-center gap-1"><FolderOpen size={14} /> {currentFolder}</span>
                </div>
            </div>

            <div className="flex-1 overflow-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 sticky top-0">
                        <tr>
                            <th className="px-6 py-3 font-medium">Nom du fichier</th>
                            <th className="px-6 py-3 font-medium">Type</th>
                            <th className="px-6 py-3 font-medium">Taille</th>
                            <th className="px-6 py-3 font-medium">Date</th>
                            <th className="px-6 py-3 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {groupedDocs[currentFolder!]?.map(doc => (
                            <tr key={doc.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-3">
                                    <FileText size={16} className="text-indigo-500" />
                                    {doc.name}
                                </td>
                                <td className="px-6 py-4 text-gray-500 uppercase text-xs font-semibold">{doc.type}</td>
                                <td className="px-6 py-4 text-gray-500 tabular-nums">{doc.size}</td>
                                <td className="px-6 py-4 text-gray-500 tabular-nums">{new Date(doc.createdAt).toLocaleDateString()}</td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <a
                                            href={doc.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium text-xs border border-blue-200 hover:border-blue-300 bg-blue-50 px-3 py-1.5 rounded-md transition-all"
                                        >
                                            Voir <ExternalLink size={12} />
                                        </a>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onDelete(doc.id, `[${currentFolder}] ${doc.name}`); // Reconstruct full name for delete confirmation message or just pass ID
                                            }}
                                            className="inline-flex items-center gap-1 text-red-600 hover:text-red-800 font-medium text-xs border border-red-200 hover:border-red-300 bg-red-50 px-3 py-1.5 rounded-md transition-all"
                                        >
                                            <Trash2 size={12} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default function AdminDashboard() {
    const { isLoaded } = useUser();
    const { signOut } = useClerk();
    const navigate = useNavigate();

    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Auth State
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [pinCode, setPinCode] = useState('');
    const [error, setError] = useState('');

    const handlePinSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Code PIN codé en dur pour la démo - À changer pour une variable d'env en prod
        if (pinCode === '00000') {
            setIsAuthenticated(true);
            setError('');
        } else {
            setError('Code incorrect');
            setPinCode('');
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await fetch('/api/users');
            if (res.ok) {
                const data = await res.json();
                setUsers(data);
            } else {
                console.warn('Failed to fetch users:', res.status);
            }
        } catch (error) {
            console.warn("Failed to fetch users - backend may not be running", error);
        }
    };

    const handleSignOut = async () => {
        await signOut();
        navigate('/');
    };

    const handleCreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        setIsLoading(true);

        try {
            const res = await fetch('/api/users/manual', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: formData.get('firstName'),
                    lastName: formData.get('lastName'),
                    email: formData.get('email'),
                    company: formData.get('company')
                })
            });

            if (res.ok) {
                const newUser = await res.json();
                setUsers([...users, newUser]);
                setIsLoading(false);
                setShowCreateForm(false);
                setShowSuccess(true);

                setTimeout(() => {
                    setShowSuccess(false);
                }, 3000);
            } else {
                const err = await res.json();
                setIsLoading(false);
                alert("Erreur: " + err.error);
            }
        } catch (error) {
            setIsLoading(false);
            alert("Erreur réseau");
        }
    };

    const handleDeleteUser = async (userId: number, userName: string) => {
        if (!confirm(`Êtes-vous sûr de vouloir supprimer le client "${userName}" ?\n\nCette action supprimera également tous ses documents et est irréversible.`)) {
            return;
        }

        try {
            const res = await fetch(`/api/users/${userId}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                setUsers(users.filter(u => u.id !== userId));
                if (selectedUser?.id === userId) {
                    setSelectedUser(null);
                }
                alert("Client supprimé avec succès !");
            } else {
                const err = await res.json();
                alert("Erreur: " + err.error);
            }
        } catch (error) {
            alert("Erreur réseau lors de la suppression");
        }
    };

    const handleDeleteDocument = async (docId: number, docName: string) => {
        if (!confirm(`Êtes-vous sûr de vouloir supprimer le document "${docName}" ?\n\nCette action est irréversible.`)) {
            return;
        }

        try {
            const res = await fetch(`/api/documents/${docId}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                if (selectedUser) {
                    setSelectedUser({
                        ...selectedUser,
                        documents: selectedUser.documents.filter(d => d.id !== docId)
                    });
                }
                setUsers(users.map(u => {
                    if (u.id === selectedUser?.id) {
                        return {
                            ...u,
                            documents: u.documents.filter(d => d.id !== docId)
                        };
                    }
                    return u;
                }));
                alert("Document supprimé avec succès !");
            } else {
                const err = await res.json();
                alert("Erreur: " + err.error);
            }
        } catch (error) {
            alert("Erreur réseau lors de la suppression");
        }
    };

    const filteredUsers = users.filter(u =>
        (u.firstName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (u.lastName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (u.email?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    );

    if (!isLoaded) return <div className="flex items-center justify-center h-screen">Chargement...</div>;

    // PIN Protection Screen
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Lock className="text-[#1044A9]" size={40} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Accès Administrateur</h2>
                    <p className="text-gray-500 mb-8">Veuillez entrer le code de sécurité pour accéder au tableau de bord.</p>

                    <form onSubmit={handlePinSubmit} className="space-y-4">
                        <div>
                            <input
                                type="password"
                                value={pinCode}
                                onChange={(e) => setPinCode(e.target.value)}
                                className="w-full text-center text-2xl tracking-widest font-bold py-3 border-2 border-gray-200 rounded-xl focus:border-[#1044A9] focus:ring-0 outline-none transition-colors"
                                placeholder="•••••"
                                autoFocus
                                maxLength={5}
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm font-medium animate-pulse">{error}</p>}

                        <button
                            type="submit"
                            className="w-full group relative flex items-center justify-center gap-2 py-4 bg-black text-white font-bold text-lg rounded-xl hover:bg-gray-900 transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            <span>Déverrouiller</span>
                            <Unlock size={20} className="opacity-70 group-hover:opacity-100 transition-opacity" />
                        </button>
                    </form>

                    <button onClick={() => navigate('/')} className="mt-6 text-sm text-gray-400 hover:text-gray-600">
                        Retour à l'accueil
                    </button>
                </div>
            </div>
        );
    }

    // Modification du return pour inclure la sidebar responsive
    return (
        <div className="admin-layout flex h-screen bg-gray-50 text-gray-800 font-sans overflow-hidden">
            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden animate-in fade-in duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed md:static inset-y-0 left-0 bg-white border-r border-gray-200 flex flex-col shrink-0 z-40 w-64 transform transition-transform duration-300 ease-in-out
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
                <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100">
                    <span className="text-xl font-bold text-[#1044A9]">EP2C Admin</span>
                    <button className="md:hidden text-gray-500" onClick={() => setIsMobileMenuOpen(false)}>
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    <div className="px-2 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Menu Principal</div>
                    <button onClick={() => { setSelectedUser(null); setIsMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${!selectedUser ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                        <Users size={18} />
                        Gestion Clients
                    </button>
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <button onClick={handleSignOut} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors w-full">
                        <LogOut size={18} />
                        Déconnexion
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden relative">
                {/* Header */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-8 shrink-0">
                    <div className="flex items-center gap-3">
                        <button className="md:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg" onClick={() => setIsMobileMenuOpen(true)}>
                            <div className="space-y-1.5">
                                <span className="block w-6 h-0.5 bg-current"></span>
                                <span className="block w-6 h-0.5 bg-current"></span>
                                <span className="block w-6 h-0.5 bg-current"></span>
                            </div>
                        </button>
                        <div className="text-lg font-semibold text-gray-800 truncate max-w-[200px] md:max-w-none">
                            {selectedUser ? `Dossier : ${selectedUser.firstName} ${selectedUser.lastName}` : 'Vue d\'ensemble'}
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="relative p-2 text-gray-500 hover:bg-gray-50 rounded-full transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                        </button>
                        <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold text-xs">
                            AD
                        </div>
                    </div>
                </header>

                {/* Content Body */}
                <div className="flex-1 overflow-auto p-8">
                    {selectedUser ? (
                        // USER DETAIL VIEW
                        <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <button onClick={() => setSelectedUser(null)} className="mb-6 text-sm text-gray-500 hover:text-blue-600 flex items-center gap-1 font-medium">← Retour à la liste</button>

                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
                                <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-start">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-sm">
                                            {selectedUser.firstName?.charAt(0) || selectedUser.email.charAt(0)}
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-900">{selectedUser.firstName} {selectedUser.lastName}</h2>
                                            <p className="text-gray-500 text-sm flex items-center gap-2">
                                                {selectedUser.email}
                                                <span className="px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-600 font-mono select-all" title="Clerk ID">{selectedUser.clerkId}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 shadow-sm shadow-blue-200">
                                            Contacter
                                        </button>
                                        <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50">
                                            Éditer
                                        </button>
                                    </div>
                                </div>
                                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Société</label>
                                        <p className="text-gray-900 font-medium">{selectedUser.company || 'Non renseigné'}</p>
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Statut Dossier</label>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${selectedUser.status === 'Validé' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {selectedUser.status || 'En attente'}
                                        </span>
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Inscription</label>
                                        <p className="text-gray-900 font-medium">{new Date(selectedUser.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                Documents fournis
                                <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">{selectedUser.documents?.length || 0}</span>
                            </h3>

                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden min-h-[400px]">
                                <DocumentManager
                                    documents={selectedUser.documents || []}
                                    onDelete={(id, name) => handleDeleteDocument(id, name)}
                                />
                            </div>
                        </div>
                    ) : (
                        // USER LIST VIEW
                        <>
                            <div className="mb-8">
                                <div className="flex flex-col md:flex-row md:items-start justify-between mb-6 gap-4">
                                    <div>
                                        <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
                                        <p className="text-gray-500 mt-1">Gérez vos clients et accédez à leurs dossiers.</p>
                                    </div>
                                    <button
                                        onClick={() => setShowCreateForm(true)}
                                        className="flex items-center gap-2 px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200 text-sm font-semibold shadow-md"
                                        style={{
                                            backgroundColor: '#1044A9',
                                            color: '#FFFFFF',
                                            border: 'none'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0d3685'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1044A9'}
                                    >
                                        <UserPlus size={18} />
                                        Nouveau Client
                                    </button>
                                </div>

                                {/* Barre de recherche visible */}
                                <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                                    <div className="flex-1 relative">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                        <input
                                            type="text"
                                            placeholder="Rechercher un client par nom, prénom ou email..."
                                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all outline-none"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                    <div className="text-sm text-gray-500 whitespace-nowrap">
                                        {filteredUsers.length} / <strong className="text-gray-900">{users.length}</strong> clients
                                    </div>
                                </div>
                            </div>

                            {/* CREATE MODAL */}
                            {showCreateForm && (
                                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                                    <div className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden">
                                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                                            <h3 className="text-lg font-bold text-gray-900">Nouveau Client</h3>
                                            <button onClick={() => setShowCreateForm(false)} className="text-gray-400 hover:text-gray-600">
                                                <X size={20} />
                                            </button>
                                        </div>
                                        <form onSubmit={handleCreateUser} className="p-6 space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-1">
                                                    <label className="text-sm font-medium text-gray-700">Prénom</label>
                                                    <input required name="firstName" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 outline-none" placeholder="Thomas" />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-sm font-medium text-gray-700">Nom</label>
                                                    <input required name="lastName" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 outline-none" placeholder="Martin" />
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-sm font-medium text-gray-700">Email (Identifiant)</label>
                                                <input required type="email" name="email" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 outline-none" placeholder="client@exemple.com" />
                                                <p className="text-xs text-gray-500">Le client devra utiliser cet email pour s'inscrire/se connecter.</p>
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-sm font-medium text-gray-700">Société</label>
                                                <input name="company" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 outline-none" placeholder="Ex: Société SAS" />
                                            </div>
                                            <div className="pt-4 flex gap-3">
                                                <button type="button" onClick={() => setShowCreateForm(false)} className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 font-medium">Annuler</button>
                                                <button type="submit" className="flex-1 px-4 py-2 rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transition-all" style={{ backgroundColor: '#1044A9', color: '#FFFFFF', border: 'none' }}>Créer</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            )}

                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead className="bg-gray-50/80 text-gray-500 text-xs uppercase tracking-wider font-semibold border-b border-gray-200">
                                            <tr>
                                                <th className="px-6 py-4">Client</th>
                                                <th className="px-6 py-4">ID Clerk / Email</th>
                                                <th className="px-6 py-4">Statut</th>
                                                <th className="px-6 py-4 text-center">Docs</th>
                                                <th className="px-6 py-4 text-right">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {filteredUsers.length > 0 ? filteredUsers.map(u => (
                                                <tr
                                                    key={u.id}
                                                    onClick={() => setSelectedUser(u)}
                                                    className="hover:bg-blue-50/30 transition-colors cursor-pointer group"
                                                >
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold text-sm group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                                                                {u.firstName?.charAt(0) || u.email.charAt(0)}
                                                            </div>
                                                            <div>
                                                                <div className="font-semibold text-gray-900">{u.firstName} {u.lastName || ''}</div>
                                                                <div className="text-xs text-gray-400">{u.company}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-sm text-gray-600">{u.email}</div>
                                                        <div className="text-[10px] text-gray-400 font-mono mt-0.5" title={u.clerkId}>{u.clerkId.substring(0, 15)}...</div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${u.status === 'Validé' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
                                                            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${u.status === 'Validé' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                                                            {u.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <span className={`inline-flex items-center justify-center min-w-[2rem] h-6 rounded px-1.5 text-xs font-bold ${u.documents?.length > 0 ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>
                                                            {u.documents?.length || 0}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <button
                                                                onClick={() => setSelectedUser(u)}
                                                                className="text-gray-400 hover:text-blue-600 p-1 rounded-md hover:bg-blue-50 transition-all"
                                                            >
                                                                <ChevronRight size={20} />
                                                            </button>
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleDeleteUser(u.id, `${u.firstName} ${u.lastName}`);
                                                                }}
                                                                className="text-red-400 hover:text-red-600 p-1 rounded-md hover:bg-red-50 transition-all"
                                                                title="Supprimer le client"
                                                            >
                                                                <Trash2 size={18} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )) : (
                                                <tr>
                                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                                        Aucun client trouvé.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </main>

            {/* LOADING POPUP */}
            {isLoading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center">
                        <div className="flex justify-center mb-4">
                            <Loader className="animate-spin text-blue-600" size={48} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Création en cours...</h3>
                        <p className="text-gray-500 text-sm">Veuillez patienter</p>
                    </div>
                </div>
            )}

            {/* SUCCESS POPUP */}
            {showSuccess && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center animate-in zoom-in duration-300">
                        <div className="flex justify-center mb-4">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                <CheckCircle className="text-green-600" size={40} />
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Client créé avec succès !</h3>
                        <p className="text-gray-600 text-sm">Le client pourra se connecter avec son email.</p>
                    </div>
                </div>
            )}
        </div>
    );
}
