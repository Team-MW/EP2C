import { useState, useRef } from 'react';
import { LayoutDashboard, Users, UserPlus, LogOut, TrendingUp, Lock, ArrowLeft, FileText, Download, Eye, CheckCircle, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import './admin.css';

interface Profile {
    id: number;
    name: string;
    email: string;
    company: string;
    status: 'Active' | 'En attente';
    date: string;
}

interface ClientDocument {
    id: number;
    name: string;
    type: string; // PDF, JPG, etc.
    size: string;
    date: string;
    status: 'Validé' | 'En attente' | 'Rejeté';
}

export default function AdminDashboard() {
    // Admin Login State
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState('');

    // OTP State
    const [digits, setDigits] = useState(['', '', '', '', '']);
    const inputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

    const handleDigitChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;

        const newDigits = [...digits];
        newDigits[index] = value;
        setDigits(newDigits);

        // Auto-focus next input
        if (value && index < 4) {
            inputRefs[index + 1].current?.focus();
        }

        // Check code if full
        if (index === 4 && value) {
            const fullCode = newDigits.slice(0, 4).join('') + value;

            if (fullCode === '00000') {
                setTimeout(() => {
                    setIsAuthenticated(true);
                    setError('');
                }, 150);
            } else {
                setError('Code incorrect');
                newDigits[index] = ''; // clear last digit
                setDigits(newDigits);
            }
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !digits[index] && index > 0) {
            inputRefs[index - 1].current?.focus();
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setDigits(['', '', '', '', '']);
        setTimeout(() => setError(''), 100);
    };

    // Dashboard State
    // 'overview' | 'profiles' | 'client-detail' (but client-detail is handled by selectedProfile !== null)
    const [activeTab, setActiveTab] = useState<'overview' | 'profiles'>('overview');
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

    // Mock Data
    const [profiles, setProfiles] = useState<Profile[]>([
        { id: 1, name: "Jean Dupont", email: "jean@societe.com", company: "Société A", status: "Active", date: "2024-01-15" },
        { id: 2, name: "Marie Martin", email: "marie@tech.co", company: "Tech Industries", status: "En attente", date: "2024-01-20" },
        { id: 3, name: "Pierre Durand", email: "pierre@construct.fr", company: "Bati France", status: "Active", date: "2024-01-22" },
    ]);

    // Mock Documents Data
    const mockDocuments: ClientDocument[] = [
        { id: 101, name: "Kbis_2024.pdf", type: "PDF", size: "1.2 MB", date: "2024-01-25", status: "Validé" },
        { id: 102, name: "Piece_Identite.jpg", type: "JPG", size: "3.5 MB", date: "2024-01-26", status: "En attente" },
        { id: 103, name: "RIB.pdf", type: "PDF", size: "0.8 MB", date: "2024-01-26", status: "En attente" },
        { id: 104, name: "Statuts_Signes.pdf", type: "PDF", size: "5.1 MB", date: "2024-01-24", status: "Rejeté" },
    ];

    const handleCreateProfile = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const newProfile: Profile = {
            id: profiles.length + 1,
            name: (formData.get('firstName') as string) + ' ' + (formData.get('lastName') as string),
            email: formData.get('email') as string,
            company: formData.get('company') as string,
            status: 'En attente',
            date: new Date().toISOString().split('T')[0]
        };

        setProfiles([newProfile, ...profiles]);
        setShowCreateForm(false);
        alert("Profil créé avec succès (Simulation)");
    };

    // Simple Admin Login Screen
    if (!isAuthenticated) {
        return (
            <div style={{
                display: 'flex',
                height: '100vh',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f8fafc',
                fontFamily: "'Outfit', sans-serif"
            }}>
                <div style={{
                    backgroundColor: 'white',
                    padding: '3rem 2rem',
                    borderRadius: '1.5rem',
                    boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.08)',
                    width: '100%',
                    maxWidth: '380px',
                    textAlign: 'center'
                }}>
                    <div style={{
                        width: '60px', height: '60px', backgroundColor: 'rgba(16, 68, 169, 0.1)',
                        borderRadius: '20px', color: '#1044A9', display: 'flex',
                        alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem'
                    }}>
                        <Lock size={28} strokeWidth={2.5} />
                    </div>

                    <h1 style={{ color: '#0f172a', fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>Accès Admin</h1>
                    <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '2rem' }}>Entrez votre code à 5 chiffres</p>

                    <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginBottom: '1rem' }}>
                        {digits.map((digit, i) => (
                            <input
                                key={i}
                                ref={inputRefs[i]}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleDigitChange(i, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(i, e)}
                                style={{
                                    width: '50px',
                                    height: '60px',
                                    fontSize: '1.5rem',
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                    borderRadius: '12px',
                                    border: error ? '2px solid #ef4444' : '2px solid #e2e8f0',
                                    backgroundColor: '#f8fafc',
                                    color: '#0f172a',
                                    outline: 'none',
                                    caretColor: 'transparent',
                                    transition: 'all 0.2s ease'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#1044A9'}
                                onBlur={(e) => e.target.style.borderColor = error ? '#ef4444' : '#e2e8f0'}
                            />
                        ))}
                    </div>

                    {error && <p style={{ color: '#ef4444', fontSize: '0.9rem', fontWeight: '500', minHeight: '1.5rem' }}>{error}</p>}

                    <div style={{ marginTop: '2rem' }}>
                        <Link to="/" style={{
                            color: '#94a3b8',
                            fontSize: '0.85rem',
                            textDecoration: 'none',
                            fontWeight: '500',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.25rem'
                        }}>
                            Retour au site
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // DETAIL VIEW RENDERER
    const renderClientDetail = () => {
        if (!selectedProfile) return null;

        return (
            <div className="animate-fade-in">
                {/* Header with Back Button */}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', gap: '1rem' }}>
                    <button
                        onClick={() => setSelectedProfile(null)}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '0.5rem',
                            padding: '0.5rem 1rem', border: '1px solid #e5e7eb',
                            borderRadius: '0.5rem', background: 'white', cursor: 'pointer',
                            color: '#6b7280', fontWeight: 500
                        }}
                    >
                        <ArrowLeft size={18} /> Retour
                    </button>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>Dossier Client</h2>
                </div>

                {/* Client Info Card */}
                <div style={{
                    background: 'white', padding: '2rem', borderRadius: '1rem',
                    border: '1px solid #e5e7eb', marginBottom: '2rem',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem'
                }}>
                    <div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1044A9', marginBottom: '0.5rem' }}>
                            {selectedProfile.name}
                        </h3>
                        <div style={{ display: 'flex', gap: '1.5rem', color: '#6b7280', fontSize: '0.9rem' }}>
                            <span>🏢 {selectedProfile.company}</span>
                            <span>📧 {selectedProfile.email}</span>
                            <span>📅 Depuis le {selectedProfile.date}</span>
                        </div>
                    </div>
                    <div>
                        <span className={`status-badge ${selectedProfile.status === 'Active' ? 'status-active' : 'status-pending'}`} style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}>
                            {selectedProfile.status}
                        </span>
                    </div>
                </div>

                {/* Documents Section */}
                <div className="profiles-section">
                    <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 className="section-title">Documents Partagés</h3>
                        <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>
                            {mockDocuments.length} fichiers disponibles
                        </span>
                    </div>

                    <div className="table-container">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Nom du fichier</th>
                                    <th>Type</th>
                                    <th>Date d'envoi</th>
                                    <th>Statut</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mockDocuments.map((doc) => (
                                    <tr key={doc.id}>
                                        <td style={{ fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <div style={{
                                                width: '32px', height: '32px', borderRadius: '6px',
                                                background: '#eff6ff', color: '#1044A9', display: 'flex',
                                                alignItems: 'center', justifyContent: 'center'
                                            }}>
                                                <FileText size={16} />
                                            </div>
                                            {doc.name}
                                        </td>
                                        <td style={{ color: '#6b7280' }}>{doc.type} • {doc.size}</td>
                                        <td>{doc.date}</td>
                                        <td>
                                            <span style={{
                                                display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
                                                padding: '0.25rem 0.75rem', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 600,
                                                backgroundColor: doc.status === 'Validé' ? '#dcfce7' : doc.status === 'Rejeté' ? '#fee2e2' : '#fef9c3',
                                                color: doc.status === 'Validé' ? '#166534' : doc.status === 'Rejeté' ? '#991b1b' : '#854d0e'
                                            }}>
                                                {doc.status === 'Validé' && <CheckCircle size={12} />}
                                                {doc.status === 'Rejeté' && <XCircle size={12} />}
                                                {doc.status === 'En attente' && <TrendingUp size={12} />}
                                                {doc.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <button title="Voir" style={{ padding: '0.4rem', borderRadius: '0.4rem', border: '1px solid #e5e7eb', background: 'white', cursor: 'pointer', color: '#6b7280' }}>
                                                    <Eye size={16} />
                                                </button>
                                                <button title="Télécharger" style={{ padding: '0.4rem', borderRadius: '0.4rem', border: '1px solid #e5e7eb', background: 'white', cursor: 'pointer', color: '#6b7280' }}>
                                                    <Download size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    };

    // Authenticated Admin Dashboard
    return (
        <div className="admin-layout">
            {/* Sidebar */}
            <aside className="admin-sidebar">
                <div className="admin-logo">
                    <h2>EP2C ADMIN</h2>
                    <span>Panel de Gestion</span>
                </div>

                <nav className="admin-nav">
                    <button
                        className={`admin-nav-item ${activeTab === 'overview' && !selectedProfile ? 'active' : ''}`}
                        onClick={() => { setActiveTab('overview'); setSelectedProfile(null); }}
                    >
                        <LayoutDashboard size={20} /> Vue d'ensemble
                    </button>
                    <button
                        className={`admin-nav-item ${activeTab === 'profiles' || selectedProfile ? 'active' : ''}`}
                        onClick={() => { setActiveTab('profiles'); setSelectedProfile(null); }}
                    >
                        <Users size={20} /> Gestion Profils
                    </button>
                    <div style={{ flex: 1 }}></div>
                    <button className="admin-nav-item" onClick={handleLogout}>
                        <LogOut size={20} /> Déconnexion
                    </button>
                </nav>

                <div className="admin-footer">
                    <div className="admin-user-info">
                        <div className="admin-user-avatar">AD</div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Super Admin</span>
                            <span style={{ fontSize: '0.7rem', color: '#6b7280' }}>Accès Total</span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="admin-main">
                {selectedProfile ? (
                    renderClientDetail()
                ) : (
                    <>
                        <header className="admin-header">
                            <h1 className="admin-title">
                                {activeTab === 'overview' ? 'Tableau de Bord' : 'Gestion des Profils'}
                            </h1>
                        </header>

                        {/* Overview Tab */}
                        {activeTab === 'overview' && (
                            <>
                                <div className="stats-grid">
                                    <div className="stat-card">
                                        <span className="stat-label">Utilisateurs Totaux</span>
                                        <div className="stat-value">{profiles.length}</div>
                                        <div className="stat-trend"><TrendingUp size={16} style={{ display: 'inline' }} /> +12% ce mois</div>
                                    </div>
                                    <div className="stat-card">
                                        <span className="stat-label">Dossiers en cours</span>
                                        <div className="stat-value">24</div>
                                        <div className="stat-trend">3 à valider</div>
                                    </div>
                                    <div className="stat-card">
                                        <span className="stat-label">Revenus (Est.)</span>
                                        <div className="stat-value">45.2k€</div>
                                        <div className="stat-trend">+5% vs N-1</div>
                                    </div>
                                </div>

                                <div className="profiles-section">
                                    <div className="section-header">
                                        <h3 className="section-title">Activité Récente</h3>
                                    </div>
                                    <div className="table-container">
                                        <table className="data-table">
                                            <thead>
                                                <tr>
                                                    <th>Utilisateur</th>
                                                    <th>Société</th>
                                                    <th>Date</th>
                                                    <th>Statut</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {profiles.slice(0, 5).map(profile => (
                                                    <tr key={profile.id} onClick={() => setSelectedProfile(profile)} style={{ cursor: 'pointer', transition: 'background-color 0.2s' }} className="hover:bg-gray-50">
                                                        <td>{profile.name}</td>
                                                        <td>{profile.company}</td>
                                                        <td>{profile.date}</td>
                                                        <td>
                                                            <span className={`status-badge ${profile.status === 'Active' ? 'status-active' : 'status-pending'}`}>
                                                                {profile.status}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Profiles Tab */}
                        {activeTab === 'profiles' && (
                            <div className="profiles-section">
                                <div className="section-header">
                                    <h3 className="section-title">Liste des Profils</h3>
                                    <button className="btn-primary" onClick={() => setShowCreateForm(!showCreateForm)}>
                                        <UserPlus size={18} />
                                        {showCreateForm ? 'Fermer' : 'Créer un profil'}
                                    </button>
                                </div>

                                {showCreateForm && (
                                    <form className="create-profile-form" onSubmit={handleCreateProfile}>
                                        <div className="form-group">
                                            <label>Prénom</label>
                                            <input name="firstName" required placeholder="Ex: Thomas" />
                                        </div>
                                        <div className="form-group">
                                            <label>Nom</label>
                                            <input name="lastName" required placeholder="Ex: Martin" />
                                        </div>
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input name="email" type="email" required placeholder="thomas@example.com" />
                                        </div>
                                        <div className="form-group">
                                            <label>Société</label>
                                            <input name="company" required placeholder="Entreprise SAS" />
                                        </div>
                                        <div className="form-group full-width">
                                            <button type="submit" className="btn-primary">Enregistrer le profil</button>
                                        </div>
                                    </form>
                                )}

                                <div className="table-container">
                                    <table className="data-table">
                                        <thead>
                                            <tr>
                                                <th>Nom</th>
                                                <th>Email</th>
                                                <th>Société</th>
                                                <th>Statut</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {profiles.map(profile => (
                                                <tr key={profile.id} onClick={() => setSelectedProfile(profile)} style={{ cursor: 'pointer', transition: 'background-color 0.2s' }} className="hover:bg-gray-50">
                                                    <td>{profile.name}</td>
                                                    <td>{profile.email}</td>
                                                    <td>{profile.company}</td>
                                                    <td>
                                                        <span className={`status-badge ${profile.status === 'Active' ? 'status-active' : 'status-pending'}`}>
                                                            {profile.status}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); setSelectedProfile(profile); }}
                                                            style={{ color: 'var(--admin-primary)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}
                                                        >
                                                            Gérer
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
}
