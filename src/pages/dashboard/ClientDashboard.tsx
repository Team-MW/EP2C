import DashboardLayout from '../../layouts/DashboardLayout';
import { useUser } from '@clerk/clerk-react';
import { FileCheck, Clock, AlertCircle, FileText, Upload } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

// Define types for our DB data
interface DbDocument {
    id: number;
    name: string;
    type: string;
    size: string;
    status: string;
    createdAt: string;
}

export default function ClientDashboard() {
    const { user } = useUser();
    const [dbUser, setDbUser] = useState<any>(null);
    const [documents, setDocuments] = useState<DbDocument[]>([]);


    // 1. Sync User with DB on Load AND Fetch Documents
    useEffect(() => {
        if (!user) return;

        const syncUser = async () => {
            try {
                // Sync User
                const res = await fetch('/api/users', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        clerkId: user.id,
                        email: user.primaryEmailAddress?.emailAddress,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        role: 'client'
                    })
                });
                const userData = await res.json();
                setDbUser(userData);

                // Fetch Documents
                const docsRes = await fetch(`/api/users/${user.id}/documents`);
                if (docsRes.ok) {
                    const docs = await docsRes.json();
                    setDocuments(docs);
                }
            } catch (err) {
                console.error("Error syncing user:", err);
            }
        };

        syncUser();
    }, [user]);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!dbUser || !e.target.files || e.target.files.length === 0) return;

        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('userId', dbUser.id.toString());

        try {
            const res = await fetch('/api/documents', {
                method: 'POST',
                body: formData // No Content-Type header needed, browser sets it for FormData
            });

            if (res.ok) {
                const newDoc = await res.json();
                setDocuments([newDoc, ...documents]);
                alert(`Document "${file.name}" téléversé avec succès !`);
            } else {
                throw new Error('Upload failed');
            }
        } catch (err) {
            console.error("Upload error:", err);
            alert("Erreur lors de l'envoi du fichier.");
        }

        // Reset input
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <DashboardLayout>
            <div className="mb-10">
                <h2 className="text-3xl font-bold text-gray-900">
                    Bonjour, {user?.firstName ? user.firstName : 'Cher Client'} ! 👋
                </h2>
                <p className="text-gray-500 mt-2 text-lg">
                    Voici un aperçu de l'avancement de votre dossier et de vos documents.
                </p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-gradient-to-br from-[#1044A9] to-[#2563eb] p-6 rounded-2xl shadow-lg text-white transform hover:scale-[1.02] transition-transform cursor-pointer">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-white/20 rounded-xl">
                            <Clock size={24} className="text-white" />
                        </div>
                        <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold">Prioritaire</span>
                    </div>
                    <div className="text-3xl font-bold mb-1">En cours</div>
                    <div className="text-blue-100 text-sm">Votre dossier est en traitement</div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-indigo-50 rounded-xl">
                            <FileCheck size={24} className="text-indigo-600" />
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">{documents.filter(d => d.status === 'Validé').length}</div>
                    <div className="text-gray-500 text-sm">Documents validés</div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-orange-50 rounded-xl">
                            <AlertCircle size={24} className="text-orange-600" />
                        </div>
                        <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-semibold">Action requise</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">1</div>
                    <div className="text-gray-500 text-sm">Document manquant (KBIS)</div>
                </div>
            </div>

            {/* Upload Section - PRIMARY ACTION */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100 mb-10 text-center relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-[#1044A9]"></div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">Déposer vos documents</h3>
                <p className="text-gray-500 mb-8 max-w-lg mx-auto">
                    Glissez-déposez vos fichiers ici (PDF, JPG) ou cliquez pour parcourir.
                    <br /><span className="text-sm text-gray-400">Pour tout dossier de création ou de modification.</span>
                </p>

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                />

                <div
                    className="border-3 border-dashed border-blue-100 rounded-xl p-10 bg-blue-50/50 hover:bg-blue-50 hover:border-blue-300 transition-all cursor-pointer group-hover:scale-[1.01]"
                    onClick={triggerFileInput}
                >
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-[#1044A9]">
                        <Upload size={32} />
                    </div>
                    <span className="font-semibold text-[#1044A9]">Cliquez pour ajouter des fichiers</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Timeline / Progress */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        Avancement du dossier
                        <span className="text-sm font-normal text-gray-400 ml-auto">Mis à jour il y a 2h</span>
                    </h3>

                    <div className="relative space-y-8 pl-4 border-l-2 border-gray-100">
                        <div className="relative">
                            <div className="absolute -left-[21px] top-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white shadow-sm"></div>
                            <div className="space-y-1">
                                <h4 className="text-sm font-bold text-gray-900 leading-none">Dossier Initialisé</h4>
                                <p className="text-xs text-gray-500">24 Jan 2024 - 09:30</p>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -left-[21px] top-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white shadow-sm"></div>
                            <div className="space-y-1">
                                <h4 className="text-sm font-bold text-gray-900 leading-none">Vérification des pièces</h4>
                                <p className="text-xs text-gray-500">25 Jan 2024 - 14:15</p>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -left-[21px] top-1 w-4 h-4 rounded-full bg-[#1044A9] ring-4 ring-blue-50 border-2 border-white"></div>
                            <div className="space-y-1">
                                <h4 className="text-sm font-bold text-[#1044A9] leading-none">Instruction en cours</h4>
                                <p className="text-xs text-blue-600 font-medium">L'équipe analyse votre demande</p>
                            </div>
                        </div>

                        <div className="relative opacity-50">
                            <div className="absolute -left-[21px] top-1 w-4 h-4 rounded-full bg-gray-200 border-2 border-white"></div>
                            <div className="space-y-1">
                                <h4 className="text-sm font-bold text-gray-400 leading-none">Validation Finale</h4>
                                <p className="text-xs text-gray-400">En attente</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Documents */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Documents Transmis</h3>

                    {documents.length === 0 ? (
                        <div className="text-center py-10 text-gray-400 bg-gray-50 rounded-lg">
                            <FileText size={48} className="mx-auto mb-2 opacity-50" />
                            <p>Aucun document transmis pour le moment</p>
                        </div>
                    ) : (
                        <div className="space-y-4 mb-6 flex-1 overflow-y-auto max-h-[300px]">
                            {documents.map((doc) => (
                                <div key={doc.id} className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors border border-gray-50 hover:border-gray-200">
                                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#1044A9] flex items-center justify-center mr-4">
                                        <FileText size={20} />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-semibold text-gray-900">{doc.name}</h4>
                                        <p className="text-xs text-gray-500">{doc.size} • {doc.type}</p>
                                    </div>
                                    <div className="text-green-600">
                                        <FileCheck size={18} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <button className="w-full py-3 bg-gray-50 text-gray-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors text-sm mt-auto">
                        Voir l'historique complet
                    </button>
                </div>
            </div>
        </DashboardLayout>
    );
}
