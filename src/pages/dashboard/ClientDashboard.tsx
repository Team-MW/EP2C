import DashboardLayout from '../../layouts/DashboardLayout';
import { useUser } from '@clerk/clerk-react';
import { FileCheck, FileText, Upload, Folder, FolderPlus, X, Check } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import '../admin/modern-dashboard.css';

// Define types for our DB data
interface DbDocument {
    id: number;
    name: string;
    type: string;
    size: string;
    status: string;
    createdAt: string;
    url: string;
}

export default function ClientDashboard() {
    const { user } = useUser();
    const [dbUser, setDbUser] = useState<any>(null);
    const [documents, setDocuments] = useState<DbDocument[]>([]);


    const fileInputRef = useRef<HTMLInputElement>(null);

    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [showSuccessNotification, setShowSuccessNotification] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [uploadedFileName, setUploadedFileName] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('Autre');
    const [isDragging, setIsDragging] = useState(false);
    
    // Folders
    const [folders, setFolders] = useState<any[]>([]);
    const [selectedFolderId, setSelectedFolderId] = useState<string>('');

    // Inline folder creation
    const [showInlineNewFolder, setShowInlineNewFolder] = useState(false);
    const [inlineFolderName, setInlineFolderName] = useState('');
    const [isCreatingFolder, setIsCreatingFolder] = useState(false);

    const handleCreateFolderInline = async () => {
        if (!inlineFolderName.trim() || !dbUser) return;
        setIsCreatingFolder(true);
        try {
            const res = await fetch('/api/folders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: inlineFolderName.trim(),
                    userId: dbUser.id,
                    parentId: null
                })
            });
            if (res.ok) {
                const newFolder = await res.json();
                setFolders(prev => [newFolder, ...prev]);
                setSelectedFolderId(String(newFolder.id));
                setInlineFolderName('');
                setShowInlineNewFolder(false);
            }
        } catch (err) {
            console.error('Erreur création dossier:', err);
        } finally {
            setIsCreatingFolder(false);
        }
    };

    // 1. Sync User with DB on Load AND Fetch Documents & Folders
    useEffect(() => {
        console.log('🔧 Initializing EmailJS with public key: 2ak1IYD1zxlcPWDx_');
        emailjs.init('2ak1IYD1zxlcPWDx_');
        console.log('✅ EmailJS initialized successfully');

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

                // Fetch Documents & Folders
                const [docsRes, foldersRes] = await Promise.all([
                    fetch(`/api/users/${user.id}/documents`),
                    fetch(`/api/users/${user.id}/folders`)
                ]);
                
                if (docsRes.ok) setDocuments(await docsRes.json());
                if (foldersRes.ok) setFolders(await foldersRes.json());
                
            } catch (err) {
                console.error("Error syncing user:", err);
                setUploadError("Erreur de connexion au serveur backend. Veuillez vérifier que le serveur est bien démarré.");
            }
        };

        syncUser();
    }, [user]);

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const processFile = async (file: File) => {
        if (!dbUser) {
            setUploadError("Utilisateur non synchronisé avec le serveur. La connexion à la base de données a échoué. Veuillez recharger la page ou redémarrer le serveur.");
            return;
        }
        
        const formData = new FormData();
        formData.append('file', file);
        formData.append('userId', dbUser.id.toString());
        formData.append('category', selectedCategory);
        if (selectedFolderId) {
            formData.append('folderId', selectedFolderId);
        }

        setIsUploading(true);
        setUploadProgress(0);
        setUploadedFileName(file.name);

        try {
            // Simulate progress (since fetch doesn't provide real upload progress easily)
            const progressInterval = setInterval(() => {
                setUploadProgress(prev => {
                    if (prev >= 90) {
                        clearInterval(progressInterval);
                        return 90;
                    }
                    return prev + 10;
                });
            }, 200);

            const res = await fetch('/api/documents', {
                method: 'POST',
                body: formData
            });

            clearInterval(progressInterval);

            if (res.ok) {
                setUploadProgress(100);
                const newDoc = await res.json();
                setDocuments([newDoc, ...documents]);

                console.log('📄 Document uploaded successfully:', newDoc);
                console.log('👤 Current user data:', dbUser);

                // Send email notification from frontend
                console.log('📧 Starting email notification...');
                try {
                    const emailParams = {
                        user_name: dbUser ? `${dbUser.firstName} ${dbUser.lastName}` : 'Client',
                        user_email: dbUser ? dbUser.email : 'email@inconnu.com',
                        time: new Date().toLocaleString('fr-FR', {
                            dateStyle: 'short',
                            timeStyle: 'short'
                        }),
                        doc_name: file.name,
                        doc_link: newDoc.url,
                        message: `Nouveau document déposé par ${dbUser?.company || 'un client'}`
                    };

                    await emailjs.send('service_rl9r1md', 'template_lqm9nad', emailParams);
                } catch (emailError: any) {
                    console.error('❌ Email notification FAILED!', emailError);
                }

                // Show success notification
                setTimeout(() => {
                    setIsUploading(false);
                    setShowSuccessNotification(true);
                    setTimeout(() => setShowSuccessNotification(false), 4000);
                }, 500);
            } else {
                const errorData = await res.json().catch(() => null);
                throw new Error(errorData?.error || 'Upload failed');
            }
        } catch (err: any) {
            console.error("Upload error:", err);
            setIsUploading(false);
            setUploadProgress(0);
            
            // On affiche une belle erreur UI au lieu d'un simple alert
            setUploadError(`Erreur lors de l'envoi du fichier. Vérifiez que le serveur backend est démarré. Détail: ${err.message}`);
        }

        // Reset input
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        try {
            await processFile(e.target.files[0]);
        } catch (err: any) {
            setUploadError(err.message || "Erreur inattendue");
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            try {
                await processFile(e.dataTransfer.files[0]);
            } catch (err: any) {
                setUploadError(err.message || "Erreur inattendue");
            }
        }
    };

    return (
        <DashboardLayout>
            {/* Upload Progress Overlay */}
            {isUploading && (
                <div className="modern-modal-backdrop fixed inset-0 z-50 flex items-center justify-center animate-in fade-in duration-200">
                    <div className="modern-modal bg-white p-8 max-w-md w-full mx-4">
                        <div className="text-center mb-6">
                            <div className="stat-icon-modern w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Upload className="text-white animate-bounce" size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Envoi en cours...</h3>
                            <p className="text-gray-500 text-sm">{uploadedFileName}</p>
                        </div>

                        {/* Progress Bar */}
                        <div className="progress-bar-modern">
                            <div
                                className="progress-bar-fill"
                                style={{ width: `${uploadProgress}%` }}
                            ></div>
                        </div>
                        <p className="text-center text-sm text-gray-600 mt-3 font-semibold">{uploadProgress}%</p>
                    </div>
                </div>
            )}

            {/* Error Notification */}
            {uploadError && (
                <div className="fixed top-8 right-8 z-50 animate-in slide-in-from-top duration-500">
                    <div className="bg-gradient-to-r from-red-500 to-rose-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-start gap-4 max-w-[400px]">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-xl font-bold">!</span>
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-lg mb-1">Échec de l'envoi</h4>
                            <p className="text-sm text-red-50">{uploadError}</p>
                        </div>
                        <button onClick={() => setUploadError(null)} className="text-white/60 hover:text-white transition-colors">
                            <span className="text-2xl">&times;</span>
                        </button>
                    </div>
                </div>
            )}

            {/* Success Notification */}
            {showSuccessNotification && (
                <div className="fixed top-8 right-8 z-50 animate-in slide-in-from-right duration-500">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-4 min-w-[320px]">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <FileCheck size={24} className="text-white" />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-lg mb-1">Document envoyé !</h4>
                            <p className="text-sm text-green-50">{uploadedFileName}</p>
                        </div>
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                            <span className="text-2xl">✓</span>
                        </div>
                    </div>
                </div>
            )}

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
                {/* Bloc 1: Documents déposés aujourd'hui */}
                <div className="stat-card-modern bg-white p-6 rounded-2xl shadow-sm border border-gray-100">

                    <div className="text-3xl font-bold text-gray-900 mb-1">
                        {documents.filter(d => {
                            const docDate = new Date(d.createdAt);
                            const today = new Date();
                            return docDate.toDateString() === today.toDateString();
                        }).length}
                    </div>
                    <div className="text-gray-500 text-sm">Documents déposés aujourd'hui</div>
                </div>

                {/* Bloc 2: Total des documents */}
                <div className="stat-card-modern bg-white p-6 rounded-2xl shadow-sm border border-gray-100">

                    <div className="text-3xl font-bold text-gray-900 mb-1">{documents.length}</div>
                    <div className="text-gray-500 text-sm">Total de documents déposés</div>
                </div>

                {/* Bloc 3: Vide pour l'instant */}
                <div className="stat-card-modern bg-white p-6 rounded-2xl shadow-sm border border-gray-100">

                    <div className="text-3xl font-bold text-gray-900 mb-1">-</div>
                    <div className="text-gray-500 text-sm">À venir</div>
                </div>
            </div>

            {/* Upload Section - PRIMARY ACTION */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100 mb-10 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-[#1044A9]"></div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">Déposer vos documents</h3>
                <p className="text-gray-500 mb-6 max-w-lg">
                    Choisissez le dossier de destination et déposez vos fichiers.
                </p>

                <div className="flex flex-col md:flex-row gap-4 mb-6 items-start">
                    {/* Folder Selection */}
                    <div className="w-full md:w-auto md:min-w-[280px]">
                        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                            <Folder size={16} className="text-blue-600" />
                            Dossier de destination
                        </label>
                        <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center w-full">
                            <select
                                className="flex-1 bg-white border-2 border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-4 py-3 font-medium shadow-sm hover:border-blue-300 transition-all cursor-pointer"
                                value={selectedFolderId}
                                onChange={(e) => setSelectedFolderId(e.target.value)}
                            >
                                <option value="">📂 Racine principale</option>
                                {folders.map(folder => (
                                    <option key={folder.id} value={folder.id}>
                                        📂 {folder.name}
                                    </option>
                                ))}
                            </select>
                            <button
                                type="button"
                                onClick={() => { setShowInlineNewFolder(!showInlineNewFolder); setInlineFolderName(''); }}
                                title="Créer un nouveau dossier"
                                className="flex-shrink-0 w-11 h-11 flex items-center justify-center bg-blue-50 text-blue-600 border-2 border-blue-200 rounded-xl hover:bg-blue-100 hover:border-blue-400 transition-all"
                            >
                                <FolderPlus size={18} />
                            </button>
                        </div>

                        {/* Inline folder creation form */}
                        {showInlineNewFolder && (
                            <div className="mt-2 flex flex-col sm:flex-row gap-2 items-stretch sm:items-center animate-in slide-in-from-top-2 duration-200">
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder="Nom du nouveau dossier..."
                                    className="flex-1 bg-white border-2 border-blue-300 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2 font-medium shadow-sm"
                                    value={inlineFolderName}
                                    onChange={(e) => setInlineFolderName(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') handleCreateFolderInline();
                                        if (e.key === 'Escape') setShowInlineNewFolder(false);
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={handleCreateFolderInline}
                                    disabled={!inlineFolderName.trim() || isCreatingFolder}
                                    className="flex-shrink-0 sm:w-9 h-11 sm:h-9 flex items-center justify-center bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all disabled:opacity-40"
                                >
                                    <Check size={16} />
                                    <span className="sm:hidden ml-2 font-medium">Valider</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowInlineNewFolder(false)}
                                    className="flex-shrink-0 sm:w-9 h-11 sm:h-9 flex items-center justify-center bg-gray-200 text-gray-600 rounded-xl hover:bg-gray-300 transition-all"
                                >
                                    <X size={16} />
                                    <span className="sm:hidden ml-2 font-medium">Annuler</span>
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Category Selection */}
                    <div className="w-full md:w-auto md:min-w-[280px]">
                        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                            <FileText size={16} className="text-blue-600" />
                            Catégorie / Tag
                        </label>
                        <select
                            className="w-full bg-white border-2 border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-4 py-3 font-medium shadow-sm hover:border-blue-300 transition-all cursor-pointer"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="Autre">🏷️ Autre (Défaut)</option>
                            <option value="Fiche de paye">💰 Fiche de paye</option>
                            <option value="Bilan">📊 Bilan Comptable</option>
                            <option value="Juridique">⚖️ Juridique / K-Bis</option>
                            <option value="Urssaf">🏛️ URSSAF / Charges</option>
                            <option value="Impôts">💼 Impôts / Fiscal</option>
                            <option value="Banque">🏦 Relevés Bancaires</option>
                            <option value="Social">🤝 Social / RH</option>
                        </select>
                    </div>
                </div>

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx"
                />

                <div
                    className={`upload-zone-modern border-3 border-dashed rounded-xl p-10 transition-all cursor-pointer ${isDragging ? 'border-[#1044A9] bg-blue-50/50 scale-[1.02]' : ''}`}
                    onClick={triggerFileInput}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-[#1044A9]">
                        <Upload size={32} />
                    </div>
                    <span className="font-semibold text-[#1044A9]">
                        Cliquez pour ajouter un document dans : <span className="underline">{selectedCategory}</span>
                    </span>
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
                                <p className="text-xs text-gray-500">24 Jan 2026 - 09:30</p>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -left-[21px] top-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white shadow-sm"></div>
                            <div className="space-y-1">
                                <h4 className="text-sm font-bold text-gray-900 leading-none">Vérification des pièces</h4>
                                <p className="text-xs text-gray-500">25 Jan 2026 - 14:15</p>
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
                                <a
                                    key={doc.id}
                                    href={doc.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center p-3 hover:bg-blue-50 rounded-lg transition-colors border border-gray-50 hover:border-blue-200 cursor-pointer group"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#1044A9] flex items-center justify-center mr-4 group-hover:bg-blue-100 transition-colors">
                                        <FileText size={20} />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-semibold text-gray-900 group-hover:text-[#1044A9] transition-colors">{doc.name}</h4>
                                        <p className="text-xs text-gray-500">{doc.size} • {doc.type} • {new Date(doc.createdAt).toLocaleDateString('fr-FR')}</p>
                                    </div>
                                    <div className="text-green-600">
                                        <FileCheck size={18} />
                                    </div>
                                </a>
                            ))}
                        </div>
                    )}

                    <a href="/dashboard/documents" className="block w-full py-3 bg-gray-50 text-gray-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors text-sm mt-auto text-center">
                        Voir l'historique complet
                    </a>
                </div>
            </div>
        </DashboardLayout>
    );
}
