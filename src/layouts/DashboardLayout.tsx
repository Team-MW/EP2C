import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, FileText, Settings, LogOut } from 'lucide-react';

interface DashboardLayoutProps {
    children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md flex flex-col">
                <div className="p-6 border-b">
                    <h1 className="text-xl font-bold text-[#1044A9]">Efficience EP2C</h1>
                    <p className="text-xs text-gray-500">Espace Client</p>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <Link to="/panel" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#1044A9] rounded-lg transition-colors">
                        <LayoutDashboard size={20} />
                        <span>Vue d'ensemble</span>
                    </Link>
                    <Link to="/panel/documents" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#1044A9] rounded-lg transition-colors">
                        <FileText size={20} />
                        <span>Mes Documents</span>
                    </Link>
                    <Link to="/panel/settings" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#1044A9] rounded-lg transition-colors">
                        <Settings size={20} />
                        <span>Paramètres</span>
                    </Link>
                </nav>

                <div className="p-4 border-t">
                    <button className="flex items-center gap-3 px-4 py-3 w-full text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <LogOut size={20} />
                        <span>Déconnexion</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                {/* Header could go here */}
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
