import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, FileText, Settings, LogOut } from 'lucide-react';
import { useUser, useClerk, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';

interface DashboardLayoutProps {
    children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const { user } = useUser();
    const { signOut } = useClerk();

    return (
        <>
            <SignedOut>
                <RedirectToSignIn />
            </SignedOut>
            <SignedIn>
                <div className="flex h-screen bg-gray-50 font-sans">
                    {/* Sidebar */}
                    <aside className="w-72 bg-white border-r border-gray-200 flex flex-col">
                        <div className="p-8 border-b border-gray-100">
                            <h1 className="text-2xl font-bold text-[#1044A9]">Efficience EP2C</h1>
                            <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider font-semibold">Espace Client</p>
                        </div>

                        <nav className="flex-1 p-6 space-y-2">
                            <Link to="/panel" className="flex items-center gap-4 px-4 py-3.5 text-gray-600 hover:bg-blue-50 hover:text-[#1044A9] rounded-xl transition-all duration-200 font-medium group">
                                <LayoutDashboard size={22} className="group-hover:scale-105 transition-transform" />
                                <span>Vue d'ensemble</span>
                            </Link>
                            <Link to="/panel/documents" className="flex items-center gap-4 px-4 py-3.5 text-gray-600 hover:bg-blue-50 hover:text-[#1044A9] rounded-xl transition-all duration-200 font-medium group">
                                <FileText size={22} className="group-hover:scale-105 transition-transform" />
                                <span>Mes Documents</span>
                            </Link>
                            <Link to="/panel/settings" className="flex items-center gap-4 px-4 py-3.5 text-gray-600 hover:bg-blue-50 hover:text-[#1044A9] rounded-xl transition-all duration-200 font-medium group">
                                <Settings size={22} className="group-hover:scale-105 transition-transform" />
                                <span>Paramètres</span>
                            </Link>
                        </nav>

                        <div className="p-6 border-t border-gray-100">
                            <div className="flex items-center gap-3 mb-6 px-2">
                                <div className="w-10 h-10 rounded-full bg-[#1044A9] text-white flex items-center justify-center font-bold text-lg">
                                    {user?.firstName?.charAt(0) || user?.emailAddresses[0]?.emailAddress?.charAt(0) || 'C'}
                                </div>
                                <div className="flex flex-col overflow-hidden">
                                    <span className="font-bold text-sm text-gray-900 truncate">
                                        {user?.firstName ? `${user.firstName} ${user.lastName || ''}` : 'Client'}
                                    </span>
                                    <span className="text-xs text-gray-500 truncate">
                                        {user?.emailAddresses[0]?.emailAddress}
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={() => signOut()}
                                className="flex items-center gap-3 px-4 py-3 w-full text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium"
                            >
                                <LogOut size={20} />
                                <span>Déconnexion</span>
                            </button>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 overflow-y-auto">
                        <div className="p-10 max-w-7xl mx-auto">
                            {children}
                        </div>
                    </main>
                </div>
            </SignedIn>
        </>
    );
}
