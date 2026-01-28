import { useState } from 'react';
import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, LogOut, Menu, X } from 'lucide-react';
import { useUser, useClerk, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';

interface DashboardLayoutProps {
    children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const { user } = useUser();
    const { signOut } = useClerk();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const isActive = (path: string) => {
        return location.pathname === path ? 'bg-blue-50 text-[#1044A9]' : 'text-gray-600 hover:bg-gray-50';
    };

    return (
        <>
            <SignedOut>
                <RedirectToSignIn />
            </SignedOut>
            <SignedIn>
                <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">

                    {/* Mobile Sidebar Overlay */}
                    {isMobileMenuOpen && (
                        <div
                            className="fixed inset-0 bg-black/50 z-30 md:hidden animate-in fade-in duration-200"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />
                    )}

                    {/* Sidebar */}
                    <aside className={`
                        fixed md:static inset-y-0 left-0 w-72 min-w-[18rem] shrink-0 bg-white border-r border-gray-200 flex flex-col z-40 transition-transform duration-300 ease-in-out
                        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                    `}>
                        <div className="p-8 border-b border-gray-100 flex-shrink-0 flex justify-between items-center">
                            <div>
                                <h1 className="text-2xl font-bold text-[#1044A9]">Efficience EP2C</h1>
                                <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider font-semibold">Espace Client</p>
                            </div>
                            {/* Close button for mobile */}
                            <button className="md:hidden text-gray-500" onClick={() => setIsMobileMenuOpen(false)}>
                                <X size={24} />
                            </button>
                        </div>

                        <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
                            <Link
                                to="/panel"
                                className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 font-medium group ${isActive('/panel')}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <LayoutDashboard size={22} className="group-hover:scale-105 transition-transform" />
                                <span>Vue d'ensemble</span>
                            </Link>
                            <Link
                                to="/panel/documents"
                                className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 font-medium group ${isActive('/panel/documents')}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <FileText size={22} className="group-hover:scale-105 transition-transform" />
                                <span>Mes Documents</span>
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
                    <main className="flex-1 flex flex-col overflow-hidden relative">
                        {/* Mobile Header with Burger */}
                        <div className="md:hidden h-16 bg-white border-b border-gray-200 flex items-center px-4 shrink-0 justify-between">
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setIsMobileMenuOpen(true)}
                                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                                >
                                    <Menu size={24} />
                                </button>
                                <span className="font-bold text-[#1044A9]">Efficience EP2C</span>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-[#1044A9] text-white flex items-center justify-center font-bold text-xs">
                                {user?.firstName?.charAt(0) || 'C'}
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 md:p-10">
                            <div className="max-w-7xl mx-auto">
                                {children}
                            </div>
                        </div>
                    </main>
                </div>
            </SignedIn>
        </>
    );
}
