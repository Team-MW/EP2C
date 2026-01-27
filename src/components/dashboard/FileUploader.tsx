import { Upload } from 'lucide-react';

export default function FileUploader() {
    return (
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-[#1044A9] hover:bg-blue-50 transition-colors cursor-pointer group">
            <div className="w-16 h-16 bg-blue-100 text-[#1044A9] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Upload size={32} />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Déposez vos documents ici</h3>
            <p className="text-gray-500 text-sm mb-4">ou cliquez pour sélectionner des fichiers</p>
            <p className="text-xs text-gray-400">PDF, DOCX, JPG jusqu'à 10Mo</p>
        </div>
    );
}
