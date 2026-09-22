/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ComicCover } from './components/ComicCover';
import { InvitationContent } from './components/InvitationContent';
import { HtmlCodeModal } from './components/HtmlCodeModal';
import { CustomizerModal } from './components/CustomizerModal';
import { Code, BookOpen, FileText, Layers, SlidersHorizontal, HelpCircle } from 'lucide-react';
import { InvitationData, defaultInvitationData } from './types/invitation';

export default function App() {
  const [activeTab, setActiveTab] = useState<'both' | 'cover' | 'invitation'>('both');
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [showCustomizerModal, setShowCustomizerModal] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  // Persistent Invitation Data State
  const [invitationData, setInvitationData] = useState<InvitationData>(() => {
    try {
      const saved = localStorage.getItem('wedding_invitation_data');
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return defaultInvitationData;
  });

  const handleSaveData = (newData: InvitationData) => {
    setInvitationData(newData);
    try {
      localStorage.setItem('wedding_invitation_data', JSON.stringify(newData));
    } catch {
      // Ignore storage errors
    }
  };

  const handleResetData = () => {
    setInvitationData(defaultInvitationData);
    try {
      localStorage.removeItem('wedding_invitation_data');
    } catch {
      // Ignore storage errors
    }
  };

  const handleOpenInvitation = () => {
    if (activeTab === 'cover') {
      setActiveTab('invitation');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById('invitation-article');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleBackToCover = () => {
    if (activeTab === 'invitation') {
      setActiveTab('cover');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="wedding-app" className="min-h-screen bg-[#ece6dc] text-stone-900 flex flex-col antialiased selection:bg-[#dfcdb9]">
      {/* Top Floating Control Bar */}
      <nav
        id="app-toolbar"
        className="sticky top-0 z-40 bg-[#f7f3ec]/95 backdrop-blur-md border-b-2 border-stone-800 px-3 py-2 shadow-xs"
      >
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Title & Couple Badge */}
          <div className="flex items-center gap-2">
            <span className="text-lg">💌</span>
            <span className="font-hand font-extrabold text-sm sm:text-base text-stone-900 tracking-wide">
              Undangan {invitationData.groomName} &amp; {invitationData.brideName}
            </span>
          </div>

          {/* View Mode Selector, Customizer, & HTML Code Buttons */}
          <div className="flex items-center flex-wrap gap-1.5 sm:gap-2">
            {/* View Tab Selector */}
            <div className="flex bg-stone-200/80 p-0.5 rounded-lg border border-stone-400 text-xs font-hand font-bold">
              <button
                onClick={() => setActiveTab('both')}
                className={`px-2 py-1 rounded-md transition-colors flex items-center gap-1 cursor-pointer ${
                  activeTab === 'both'
                    ? 'bg-stone-800 text-white shadow-xs'
                    : 'text-stone-700 hover:text-stone-950'
                }`}
                title="Tampilkan Keduanya Berurutan"
              >
                <Layers className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Keduanya</span>
              </button>
              <button
                onClick={() => setActiveTab('cover')}
                className={`px-2 py-1 rounded-md transition-colors flex items-center gap-1 cursor-pointer ${
                  activeTab === 'cover'
                    ? 'bg-stone-800 text-white shadow-xs'
                    : 'text-stone-700 hover:text-stone-950'
                }`}
                title="Hanya Tampilkan Sampul Komik (Foto 1)"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Foto 1 (Komik)</span>
              </button>
              <button
                onClick={() => setActiveTab('invitation')}
                className={`px-2 py-1 rounded-md transition-colors flex items-center gap-1 cursor-pointer ${
                  activeTab === 'invitation'
                    ? 'bg-stone-800 text-white shadow-xs'
                    : 'text-stone-700 hover:text-stone-950'
                }`}
                title="Hanya Tampilkan Undangan Lengkap (Foto 2)"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Foto 2 (Undangan)</span>
              </button>
            </div>

            {/* Customizer Button (Prominent) */}
            <button
              onClick={() => setShowCustomizerModal(true)}
              className="bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-hand font-bold text-xs px-2.5 py-1.5 rounded-lg border border-stone-800 shadow-xs flex items-center gap-1.5 cursor-pointer transition-all"
              title="Buka panel untuk kustomisasi data undangan"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Kustomisasi</span>
            </button>

            {/* View Standalone HTML Code Button */}
            <button
              onClick={() => setShowCodeModal(true)}
              className="bg-stone-800 hover:bg-stone-900 active:scale-95 text-amber-200 font-hand font-bold text-xs px-2.5 py-1.5 rounded-lg border border-stone-700 shadow-xs flex items-center gap-1.5 cursor-pointer transition-transform"
              title="Lihat & Salin Kode HTML Murni"
            >
              <Code className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Kode HTML</span>
            </button>

            {/* Guide Button */}
            <button
              onClick={() => setShowGuide(!showGuide)}
              className="p-1.5 rounded-lg border border-stone-400 text-stone-600 hover:text-stone-900 hover:bg-stone-200 text-xs transition-colors cursor-pointer"
              title="Panduan Cara Kustomisasi"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Customization Instruction Banner (Collapsible) */}
        {showGuide && (
          <div className="max-w-4xl mx-auto mt-2 p-3 bg-amber-50 border-2 border-stone-700 rounded-xl font-hand text-xs text-stone-800 shadow-sm animate-in fade-in">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h4 className="font-bold text-sm text-stone-900 mb-1 flex items-center gap-1.5">
                  <span>📖</span>
                  <span>Cara Melakukan Kustomisasi Undangan:</span>
                </h4>
                <ol className="list-decimal list-inside space-y-1 text-stone-700 leading-relaxed">
                  <li>
                    <strong>Melalui Tombol &ldquo;Kustomisasi&rdquo; di Atas:</strong> Klik tombol oranye <strong>&ldquo;Kustomisasi&rdquo;</strong> untuk membuka formulir interaktif. Anda dapat mengubah nama mempelai, tanggal &amp; waktu, lokasi acara, teks kutipan, kisah pertemuan, rekening bank, hingga dialog komik di Foto 1 secara instan!
                  </li>
                  <li>
                    <strong>Perubahan Otomatis:</strong> Hasil editan langsung tersimpan dan otomatis memperbarui tampilan web (Foto 1 &amp; Foto 2) serta kode HTML yang siap disalin.
                  </li>
                  <li>
                    <strong>Melalui File Kode (Developers):</strong> Anda dapat langsung mengedit file data di <code className="bg-stone-200 px-1 py-0.5 rounded font-mono text-[11px]">src/types/invitation.ts</code> pada variabel <code className="bg-stone-200 px-1 py-0.5 rounded font-mono text-[11px]">defaultInvitationData</code>.
                  </li>
                </ol>
              </div>
              <button
                onClick={() => setShowGuide(false)}
                className="text-stone-500 hover:text-stone-900 p-1 font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Container Rendering the exact components from Photo 1 and Photo 2 */}
      <main id="main-content" className="flex-1 w-full pb-10">
        {/* Render Photo 1 (Comic Cover) */}
        {(activeTab === 'both' || activeTab === 'cover') && (
          <div className="animate-in fade-in duration-300">
            <ComicCover onOpenInvitation={handleOpenInvitation} data={invitationData} />
          </div>
        )}

        {/* Visual separator when both are active */}
        {activeTab === 'both' && (
          <div className="max-w-md mx-auto my-4 flex items-center justify-center gap-3 text-stone-400">
            <span className="h-0.5 w-16 bg-stone-400 rounded-full"></span>
            <span className="font-hand text-xs font-bold text-stone-600">ISIAN LENGKAP UNDANGAN</span>
            <span className="h-0.5 w-16 bg-stone-400 rounded-full"></span>
          </div>
        )}

        {/* Render Photo 2 (Full Invitation) */}
        {(activeTab === 'both' || activeTab === 'invitation') && (
          <div className="animate-in fade-in duration-300">
            <InvitationContent onBackToCover={handleBackToCover} data={invitationData} />
          </div>
        )}
      </main>

      {/* Interactive Customization Modal */}
      <CustomizerModal
        isOpen={showCustomizerModal}
        onClose={() => setShowCustomizerModal(false)}
        currentData={invitationData}
        onSave={handleSaveData}
        onReset={handleResetData}
      />

      {/* Standalone HTML Code Preview & Copy Modal */}
      <HtmlCodeModal
        isOpen={showCodeModal}
        onClose={() => setShowCodeModal(false)}
        data={invitationData}
      />
    </div>
  );
}
