import { FileText, Download, Trash2, ExternalLink, Search, Folder, FolderPlus, ChevronRight, CornerLeftUp, PenLine } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';

interface DbDocument {
    id: number;
    name: string;
    type: string;
    size: string;
    status: string;
    createdAt: string;
    url: string;
    folderId: number | null;
}

interface DbFolder {
    id: number;
    name: string;
    parentId: number | null;
    createdAt: string;
}

export default function DocumentList() {
    const { user } = useUser();
    const [documents, setDocuments] = useState<DbDocument[]>([]);
    const [folders, setFolders] = useState<DbFolder[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const [currentFolderId, setCurrentFolderId] = useState<number | null>(null);
    const [folderPath, setFolderPath] = useState<{ id: number, name: string }[]>([]);
    
    const [showNewFolderModal, setShowNewFolderModal] = useState(false);
    const [newFolderName, setNewFolderName] = useState('');
    const [isCreatingFolder, setIsCreatingFolder] = useState(false);

    // --- OS Style States ---
    const [selectedItemId, setSelectedItemId] = useState<{ id: number, type: 'document' | 'folder' } | null>(null);
    const [contextMenu, setContextMenu] = useState<{ x: number, y: number, item: any, type: 'document' | 'folder' } | null>(null);
    const [dragOverFolderId, setDragOverFolderId] = useState<number | null | 'breadcrumb'>(null);
    
    const [renameModal, setRenameModal] = useState<{ item: any, type: 'document' | 'folder' } | null>(null);
    const [newName, setNewName] = useState('');

    useEffect(() => {
        if (!user) return;

        const fetchData = async () => {
            try {
                const [docsRes, foldersRes] = await Promise.all([
                    fetch(`/api/users/${user.id}/documents`),
                    fetch(`/api/users/${user.id}/folders`)
                ]);
                
                if (docsRes.ok) setDocuments(await docsRes.json());
                if (foldersRes.ok) setFolders(await foldersRes.json());
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

    // Fermer le menu contextuel au clic ailleurs
    useEffect(() => {
        const handleClickOutside = () => setContextMenu(null);
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    // --- Drag and Drop Handlers ---
    const handleDragStart = (e: React.DragEvent, item: any, type: 'document' | 'folder') => {
        e.dataTransfer.setData('itemId', item.id.toString());
        e.dataTransfer.setData('itemType', type);
        e.currentTarget.classList.add('item-dragging');
    };

    const handleDragEnd = (e: React.DragEvent) => {
        e.currentTarget.classList.remove('item-dragging');
        setDragOverFolderId(null);
    };

    const handleDragOver = (e: React.DragEvent, targetFolderId: number | null | 'breadcrumb') => {
        e.preventDefault();
        e.stopPropagation();
        if (dragOverFolderId !== targetFolderId) {
            setDragOverFolderId(targetFolderId);
        }
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragOverFolderId(null);
    };

    const handleDrop = async (e: React.DragEvent, targetFolderId: number | null) => {
        e.preventDefault();
        e.stopPropagation();
        setDragOverFolderId(null);

        const itemId = e.dataTransfer.getData('itemId');
        const itemType = e.dataTransfer.getData('itemType');

        if (!itemId || !itemType) return;
        
        // Prevent dropping a folder into itself
        if (itemType === 'folder' && parseInt(itemId) === targetFolderId) return;

        try {
            const url = itemType === 'document' 
                ? `/api/documents/${itemId}/move` 
                : `/api/folders/${itemId}/move`;
                
            const body = itemType === 'document'
                ? { folderId: targetFolderId }
                : { parentId: targetFolderId };

            const res = await fetch(url, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            if (res.ok) {
                if (itemType === 'document') {
                    setDocuments(docs => docs.map(d => d.id === parseInt(itemId) ? { ...d, folderId: targetFolderId } : d));
                } else {
                    setFolders(flds => flds.map(f => f.id === parseInt(itemId) ? { ...f, parentId: targetFolderId } : f));
                }
            } else {
                alert('Erreur lors du déplacement. N\'oubliez pas la base de données PlanetScale.');
            }
        } catch (error) {
            alert('Erreur réseau');
        }
    };

    // --- Action Handlers ---
    const handleDelete = async (item: any, type: 'document' | 'folder') => {
        const msg = type === 'document' 
            ? 'Êtes-vous sûr de vouloir supprimer ce document ?' 
            : 'Êtes-vous sûr de vouloir supprimer ce dossier et tout son contenu ?';
            
        if (!confirm(msg)) return;

        try {
            const res = await fetch(`/api/${type}s/${item.id}`, { method: 'DELETE' });
            if (res.ok) {
                if (type === 'document') {
                    setDocuments(documents.filter(d => d.id !== item.id));
                } else {
                    setFolders(folders.filter(f => f.id !== item.id));
                    setDocuments(documents.filter(d => d.folderId !== item.id));
                }
            } else {
                alert('Erreur lors de la suppression');
            }
        } catch (error) {
            alert('Erreur réseau');
        }
    };

    const handleCreateFolder = async () => {
        if (!newFolderName.trim() || !user) return;
        setIsCreatingFolder(true);

        try {
            const dbUserRes = await fetch(`/api/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ clerkId: user.id })
            });
            const dbUser = await dbUserRes.json();

            const res = await fetch('/api/folders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: newFolderName,
                    userId: dbUser.id,
                    parentId: currentFolderId
                })
            });

            if (res.ok) {
                const newFolder = await res.json();
                setFolders([newFolder, ...folders]);
                setNewFolderName('');
                setShowNewFolderModal(false);
            }
        } catch (error) {
            alert('Erreur création dossier');
        } finally {
            setIsCreatingFolder(false);
        }
    };

    const handleRename = async () => {
        if (!renameModal || !newName.trim()) return;
        const { item, type } = renameModal;

        try {
            const res = await fetch(`/api/${type}s/${item.id}/rename`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newName })
            });

            if (res.ok) {
                if (type === 'document') {
                    setDocuments(docs => docs.map(d => d.id === item.id ? { ...d, name: newName } : d));
                } else {
                    setFolders(flds => flds.map(f => f.id === item.id ? { ...f, name: newName } : f));
                }
                setRenameModal(null);
            }
        } catch (err) {
            alert('Erreur lors du renommage');
        }
    };

    // --- Navigation ---
    const enterFolder = (folder: DbFolder) => {
        setCurrentFolderId(folder.id);
        setFolderPath([...folderPath, { id: folder.id, name: folder.name }]);
        setSearchTerm('');
        setSelectedItemId(null);
    };

    const navigateToBreadcrumb = (index: number) => {
        if (index === -1) {
            setCurrentFolderId(null);
            setFolderPath([]);
        } else {
            const newPath = folderPath.slice(0, index + 1);
            setCurrentFolderId(newPath[newPath.length - 1].id);
            setFolderPath(newPath);
        }
        setSearchTerm('');
        setSelectedItemId(null);
    };

    const goUp = () => {
        if (folderPath.length <= 1) {
            navigateToBreadcrumb(-1);
        } else {
            navigateToBreadcrumb(folderPath.length - 2);
        }
    };

    const handleContextMenu = (e: React.MouseEvent, item: any, type: 'document' | 'folder') => {
        e.preventDefault();
        e.stopPropagation();
        setContextMenu({
            x: e.clientX,
            y: e.clientY,
            item,
            type
        });
        setSelectedItemId({ id: item.id, type });
    };

    // Filters
    const visibleFolders = folders.filter(f => 
        (searchTerm ? f.name.toLowerCase().includes(searchTerm.toLowerCase()) : f.parentId === currentFolderId)
    );
    const visibleDocs = documents.filter(doc => 
        (searchTerm ? doc.name.toLowerCase().includes(searchTerm.toLowerCase()) : doc.folderId === currentFolderId)
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
        <div className="space-y-6" onClick={() => setSelectedItemId(null)}>
            {/* Context Menu */}
            {contextMenu && (
                <div 
                    className="context-menu"
                    style={{ top: contextMenu.y, left: contextMenu.x }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {contextMenu.type === 'document' && (
                        <div 
                            className="context-menu-item"
                            onClick={() => {
                                window.open(contextMenu.item.url, '_blank');
                                setContextMenu(null);
                            }}
                        >
                            <ExternalLink size={14} /> Ouvrir
                        </div>
                    )}
                    {contextMenu.type === 'folder' && (
                        <div 
                            className="context-menu-item"
                            onClick={() => {
                                enterFolder(contextMenu.item);
                                setContextMenu(null);
                            }}
                        >
                            <Folder size={14} /> Ouvrir
                        </div>
                    )}
                    <div 
                        className="context-menu-item"
                        onClick={() => {
                            setNewName(contextMenu.item.name);
                            setRenameModal({ item: contextMenu.item, type: contextMenu.type });
                            setContextMenu(null);
                        }}
                    >
                        <PenLine size={14} /> Renommer
                    </div>
                    <div className="context-menu-divider"></div>
                    <div 
                        className="context-menu-item danger"
                        onClick={() => {
                            handleDelete(contextMenu.item, contextMenu.type);
                            setContextMenu(null);
                        }}
                    >
                        <Trash2 size={14} /> Supprimer
                    </div>
                </div>
            )}

            {/* Header / Search */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h3 className="text-xl font-bold text-gray-800">Tous vos documents</h3>
                    <p className="text-gray-500 text-sm">Consultez et gérez l'ensemble de vos fichiers</p>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <div className="relative flex-grow">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Rechercher..."
                            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-full transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button 
                        onClick={(e) => { e.stopPropagation(); setShowNewFolderModal(true); }}
                        className="flex items-center gap-2 bg-[#1044A9] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
                    >
                        <FolderPlus size={18} />
                        <span className="hidden sm:inline">Nouveau dossier</span>
                    </button>
                </div>
            </div>

            {/* Breadcrumb Navigation - DROPPABLE */}
            {!searchTerm && (
                <div 
                    className={`flex items-center gap-2 text-sm text-gray-600 bg-gray-50 py-2 px-4 rounded-lg overflow-x-auto transition-colors ${dragOverFolderId === 'breadcrumb' ? 'bg-blue-100 border border-blue-300' : ''}`}
                    onDragOver={(e) => {
                        if (currentFolderId !== null) handleDragOver(e, 'breadcrumb');
                    }}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => {
                        if (currentFolderId !== null) {
                            // Drop to parent
                            const targetId = folderPath.length > 1 ? folderPath[folderPath.length - 2].id : null;
                            handleDrop(e, targetId);
                        }
                    }}
                >
                    {currentFolderId !== null && (
                        <button onClick={goUp} className="text-gray-400 hover:text-blue-600 mr-2" title="Remonter">
                            <CornerLeftUp size={16} />
                        </button>
                    )}
                    <button 
                        onClick={() => navigateToBreadcrumb(-1)}
                        className={`hover:text-blue-600 transition-colors whitespace-nowrap ${currentFolderId === null ? 'font-bold text-gray-900' : ''}`}
                    >
                        Accueil
                    </button>
                    {folderPath.map((crumb, index) => (
                        <div key={crumb.id} className="flex items-center gap-2 whitespace-nowrap">
                            <ChevronRight size={14} className="text-gray-400" />
                            <button 
                                onClick={() => navigateToBreadcrumb(index)}
                                className={`hover:text-blue-600 transition-colors ${index === folderPath.length - 1 ? 'font-bold text-gray-900' : ''}`}
                            >
                                {crumb.name}
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Content Grid */}
            {visibleFolders.length === 0 && visibleDocs.length === 0 ? (
                <div className="bg-white rounded-xl border-2 border-dashed border-gray-200 p-12 text-center">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        {searchTerm ? <Search className="text-gray-400" size={32} /> : <Folder className="text-gray-400" size={32} />}
                    </div>
                    <h4 className="text-lg font-medium text-gray-900 mb-1">
                        {searchTerm ? 'Aucun résultat' : 'Dossier vide'}
                    </h4>
                    <p className="text-gray-500">
                        {searchTerm ? `Aucun élément ne correspond à "${searchTerm}"` : "Ce dossier ne contient encore aucun fichier. Glissez des fichiers ici !"}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {/* Folders */}
                    {visibleFolders.map((folder) => {
                        const isSelected = selectedItemId?.type === 'folder' && selectedItemId.id === folder.id;
                        const isDragOver = dragOverFolderId === folder.id;
                        
                        return (
                            <div 
                                key={`folder-${folder.id}`} 
                                draggable
                                onDragStart={(e) => handleDragStart(e, folder, 'folder')}
                                onDragEnd={handleDragEnd}
                                onDragOver={(e) => handleDragOver(e, folder.id)}
                                onDragLeave={handleDragLeave}
                                onDrop={(e) => handleDrop(e, folder.id)}
                                onClick={(e) => { e.stopPropagation(); setSelectedItemId({ id: folder.id, type: 'folder' }); }}
                                onDoubleClick={(e) => { e.stopPropagation(); enterFolder(folder); }}
                                onContextMenu={(e) => handleContextMenu(e, folder, 'folder')}
                                className={`group bg-white rounded-xl p-4 border shadow-sm transition-all duration-200 cursor-pointer flex flex-col items-center text-center
                                    ${isSelected ? 'item-selected' : 'border-gray-100 hover:shadow-md hover:border-blue-200'}
                                    ${isDragOver ? 'drag-over' : ''}
                                `}
                            >
                                <div className="p-3 mb-2 rounded-lg transition-colors">
                                    <Folder size={48} className="fill-blue-200 text-blue-600" />
                                </div>
                                <h4 className="font-semibold text-gray-900 w-full truncate px-2 text-sm" title={folder.name}>
                                    {folder.name}
                                </h4>
                            </div>
                        );
                    })}

                    {/* Documents */}
                    {visibleDocs.map((doc) => {
                        const isSelected = selectedItemId?.type === 'document' && selectedItemId.id === doc.id;

                        return (
                            <div 
                                key={`doc-${doc.id}`} 
                                draggable
                                onDragStart={(e) => handleDragStart(e, doc, 'document')}
                                onDragEnd={handleDragEnd}
                                onClick={(e) => { e.stopPropagation(); setSelectedItemId({ id: doc.id, type: 'document' }); }}
                                onDoubleClick={(e) => { e.stopPropagation(); window.open(doc.url, '_blank'); }}
                                onContextMenu={(e) => handleContextMenu(e, doc, 'document')}
                                className={`group bg-white rounded-xl p-4 border shadow-sm transition-all duration-200 cursor-pointer flex flex-col items-center text-center
                                    ${isSelected ? 'item-selected' : 'border-gray-100 hover:shadow-md hover:border-blue-200'}
                                `}
                            >
                                <div className="p-3 mb-2 text-gray-600 rounded-lg">
                                    <FileText size={48} className={doc.type?.includes('pdf') ? 'text-red-500' : 'text-gray-500'} />
                                </div>
                                <h4 className="font-semibold text-gray-900 w-full truncate px-2 mb-1 text-sm" title={doc.name}>
                                    {doc.name}
                                </h4>
                                <div className="text-xs text-gray-500">
                                    {doc.size}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* New Folder Modal */}
            {showNewFolderModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-in fade-in" onClick={(e) => e.stopPropagation()}>
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 m-4">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Nouveau dossier</h3>
                        <input 
                            type="text"
                            autoFocus
                            placeholder="Nom du dossier"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-6 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            value={newFolderName}
                            onChange={(e) => setNewFolderName(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleCreateFolder()}
                        />
                        <div className="flex justify-end gap-3">
                            <button 
                                onClick={() => setShowNewFolderModal(false)}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                Annuler
                            </button>
                            <button 
                                onClick={handleCreateFolder}
                                disabled={isCreatingFolder || !newFolderName.trim()}
                                className="px-4 py-2 bg-[#1044A9] text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                            >
                                {isCreatingFolder ? 'Création...' : 'Créer'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Rename Modal */}
            {renameModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-in fade-in" onClick={(e) => e.stopPropagation()}>
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 m-4">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Renommer {renameModal.type === 'folder' ? 'le dossier' : 'le fichier'}</h3>
                        <input 
                            type="text"
                            autoFocus
                            placeholder="Nouveau nom"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-6 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleRename()}
                        />
                        <div className="flex justify-end gap-3">
                            <button 
                                onClick={() => setRenameModal(null)}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                Annuler
                            </button>
                            <button 
                                onClick={handleRename}
                                disabled={!newName.trim() || newName === renameModal.item.name}
                                className="px-4 py-2 bg-[#1044A9] text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                            >
                                Sauvegarder
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
