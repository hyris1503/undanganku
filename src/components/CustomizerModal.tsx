import { useState, useEffect } from 'react';
import {
  X,
  RotateCcw,
  Check,
  Sparkles,
  Heart,
  Calendar,
  MapPin,
  MessageSquare,
  CreditCard,
  BookOpen,
  Copy,
} from 'lucide-react';
import { InvitationData, defaultInvitationData } from '../types/invitation';

interface CustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentData: InvitationData;
  onSave: (newData: InvitationData) => void;
  onReset: () => void;
}

type TabKey = 'mempelai' | 'acara' | 'lokasi' | 'cerita' | 'komik' | 'hadiah';

export function CustomizerModal({
  isOpen,
  onClose,
  currentData,
  onSave,
  onReset,
}: CustomizerModalProps) {
  const [formData, setFormData] = useState<InvitationData>(currentData);
  const [activeTab, setActiveTab] = useState<TabKey>('mempelai');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);

  useEffect(() => {
    setFormData(currentData);
  }, [currentData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (field: keyof InvitationData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleComicChange = (panel: keyof InvitationData['comicDialogues'], value: string) => {
    setFormData((prev) => ({
      ...prev,
      comicDialogues: {
        ...prev.comicDialogues,
        [panel]: value,
      },
    }));
  };

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    onSave(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 600);
  };

  const handleResetToDefault = () => {
    if (confirm('Apakah Anda yakin ingin mengembalikan semua data ke pengaturan awal Andi & Sinta?')) {
      setFormData(defaultInvitationData);
      onReset();
    }
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(formData, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 z-50 animate-in fade-in">
      <div className="bg-[#fcfaf5] border-2 border-stone-800 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden font-hand">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b-2 border-stone-800 bg-[#f4ece1]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-stone-800 text-amber-300 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-stone-900 leading-tight">
                Kustomisasi Undangan
              </h2>
              <p className="text-xs text-stone-600">
                Ubah teks, nama, tanggal, lokasi, dan dialog komik secara instan
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-md text-stone-500 hover:text-stone-900 hover:bg-stone-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-stone-300 bg-[#ece4d6] px-3 pt-2 gap-1 overflow-x-auto text-xs sm:text-sm font-bold">
          <button
            onClick={() => setActiveTab('mempelai')}
            className={`px-3 py-2 rounded-t-lg transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'mempelai'
                ? 'bg-[#fcfaf5] text-stone-900 border-t-2 border-x-2 border-stone-800'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Heart className="w-3.5 h-3.5 text-[#d97a68]" />
            <span>Mempelai</span>
          </button>

          <button
            onClick={() => setActiveTab('acara')}
            className={`px-3 py-2 rounded-t-lg transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'acara'
                ? 'bg-[#fcfaf5] text-stone-900 border-t-2 border-x-2 border-stone-800'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-stone-700" />
            <span>Acara</span>
          </button>

          <button
            onClick={() => setActiveTab('lokasi')}
            className={`px-3 py-2 rounded-t-lg transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'lokasi'
                ? 'bg-[#fcfaf5] text-stone-900 border-t-2 border-x-2 border-stone-800'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <MapPin className="w-3.5 h-3.5 text-stone-700" />
            <span>Lokasi</span>
          </button>

          <button
            onClick={() => setActiveTab('komik')}
            className={`px-3 py-2 rounded-t-lg transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'komik'
                ? 'bg-[#fcfaf5] text-stone-900 border-t-2 border-x-2 border-stone-800'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-stone-700" />
            <span>Komik</span>
          </button>

          <button
            onClick={() => setActiveTab('cerita')}
            className={`px-3 py-2 rounded-t-lg transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'cerita'
                ? 'bg-[#fcfaf5] text-stone-900 border-t-2 border-x-2 border-stone-800'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-stone-700" />
            <span>Kutipan</span>
          </button>

          <button
            onClick={() => setActiveTab('hadiah')}
            className={`px-3 py-2 rounded-t-lg transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'hadiah'
                ? 'bg-[#fcfaf5] text-stone-900 border-t-2 border-x-2 border-stone-800'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5 text-stone-700" />
            <span>Rekening</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {/* TAB 1: MEMPELAI */}
          {activeTab === 'mempelai' && (
            <div className="space-y-5">
              {/* Short Names */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Nama Panggilan Pengantin Pria
                  </label>
                  <input
                    type="text"
                    value={formData.groomName}
                    onChange={(e) => handleChange('groomName', e.target.value)}
                    placeholder="Contoh: Andi"
                    className="w-full bg-white border-2 border-stone-400 focus:border-stone-800 rounded-lg px-3 py-2 text-sm font-bold text-stone-900 outline-hidden"
                  />
                  <p className="text-[11px] text-stone-500 mt-1">Muncul di cover, cerita, dan footer.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Nama Panggilan Pengantin Wanita
                  </label>
                  <input
                    type="text"
                    value={formData.brideName}
                    onChange={(e) => handleChange('brideName', e.target.value)}
                    placeholder="Contoh: Sinta"
                    className="w-full bg-white border-2 border-stone-400 focus:border-stone-800 rounded-lg px-3 py-2 text-sm font-bold text-stone-900 outline-hidden"
                  />
                  <p className="text-[11px] text-stone-500 mt-1">Muncul berdampingan dengan pengantin pria.</p>
                </div>
              </div>

              {/* Detail Mempelai Pria */}
              <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-300 space-y-3">
                <span className="font-bold text-xs text-stone-800 flex items-center gap-1.5">
                  <span>🤵</span>
                  <span>Detail Lengkap Mempelai Pria</span>
                </span>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Nama Lengkap &amp; Gelar Pria
                  </label>
                  <input
                    type="text"
                    value={formData.groomFullName || ''}
                    onChange={(e) => handleChange('groomFullName', e.target.value)}
                    placeholder="Contoh: Andi Pratama, S.Kom"
                    className="w-full bg-white border-2 border-stone-400 focus:border-stone-800 rounded-lg px-3 py-1.5 text-sm font-bold text-stone-900 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Keterangan Orang Tua Pria
                  </label>
                  <input
                    type="text"
                    value={formData.groomParents || ''}
                    onChange={(e) => handleChange('groomParents', e.target.value)}
                    placeholder="Contoh: Putra pertama dari Bpk. Bambang Wijaya & Ibu Siti Aminah"
                    className="w-full bg-white border-2 border-stone-400 focus:border-stone-800 rounded-lg px-3 py-1.5 text-xs text-stone-900 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Username Instagram Pria (opsional)
                  </label>
                  <div className="flex items-center">
                    <span className="bg-stone-200 border-2 border-r-0 border-stone-400 rounded-l-lg px-2.5 py-1.5 text-xs text-stone-600 font-bold select-none">
                      @
                    </span>
                    <input
                      type="text"
                      value={formData.groomInstagram || ''}
                      onChange={(e) => handleChange('groomInstagram', e.target.value)}
                      placeholder="andipratama"
                      className="w-full bg-white border-2 border-stone-400 focus:border-stone-800 rounded-r-lg px-3 py-1.5 text-xs text-stone-900 outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Detail Mempelai Wanita */}
              <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-300 space-y-3">
                <span className="font-bold text-xs text-stone-800 flex items-center gap-1.5">
                  <span>👰</span>
                  <span>Detail Lengkap Mempelai Wanita</span>
                </span>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Nama Lengkap &amp; Gelar Wanita
                  </label>
                  <input
                    type="text"
                    value={formData.brideFullName || ''}
                    onChange={(e) => handleChange('brideFullName', e.target.value)}
                    placeholder="Contoh: Sinta Dewi, S.E"
                    className="w-full bg-white border-2 border-stone-400 focus:border-stone-800 rounded-lg px-3 py-1.5 text-sm font-bold text-stone-900 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Keterangan Orang Tua Wanita
                  </label>
                  <input
                    type="text"
                    value={formData.brideParents || ''}
                    onChange={(e) => handleChange('brideParents', e.target.value)}
                    placeholder="Contoh: Putri kedua dari Bpk. Hendra Gunawan & Ibu Ratna Sari"
                    className="w-full bg-white border-2 border-stone-400 focus:border-stone-800 rounded-lg px-3 py-1.5 text-xs text-stone-900 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Username Instagram Wanita (opsional)
                  </label>
                  <div className="flex items-center">
                    <span className="bg-stone-200 border-2 border-r-0 border-stone-400 rounded-l-lg px-2.5 py-1.5 text-xs text-stone-600 font-bold select-none">
                      @
                    </span>
                    <input
                      type="text"
                      value={formData.brideInstagram || ''}
                      onChange={(e) => handleChange('brideInstagram', e.target.value)}
                      placeholder="sintadewi"
                      className="w-full bg-white border-2 border-stone-400 focus:border-stone-800 rounded-r-lg px-3 py-1.5 text-xs text-stone-900 outline-hidden"
                    />
                  </div>
                </div>
              </div>

              <div className="p-3 bg-amber-50/70 border border-stone-300 rounded-lg text-xs text-stone-700 leading-relaxed">
                💡 <strong>Tips:</strong> Data mempelai yang diisi di sini akan tampil di bagian kartu profil kedua mempelai di halaman isi (Foto 2), lengkap dengan ilustrasi doodle karakter!
              </div>
            </div>
          )}

          {/* TAB 2: ACARA & TANGGAL */}
          {activeTab === 'acara' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Tanggal Singkat (Titik)
                  </label>
                  <input
                    type="text"
                    value={formData.weddingDate}
                    onChange={(e) => handleChange('weddingDate', e.target.value)}
                    placeholder="Contoh: 20 . 12 . 2026"
                    className="w-full bg-white border-2 border-stone-400 focus:border-stone-800 rounded-lg px-3 py-2 text-sm font-bold text-stone-900 outline-hidden"
                  />
                  <p className="text-[11px] text-stone-500 mt-1">Ditampilkan di bawah judul cover dan kartu acara.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Tanggal Lengkap
                  </label>
                  <input
                    type="text"
                    value={formData.weddingDateFull}
                    onChange={(e) => handleChange('weddingDateFull', e.target.value)}
                    placeholder="Contoh: Minggu, 20 Desember 2026"
                    className="w-full bg-white border-2 border-stone-400 focus:border-stone-800 rounded-lg px-3 py-2 text-sm font-bold text-stone-900 outline-hidden"
                  />
                  <p className="text-[11px] text-stone-500 mt-1">Ditampilkan di kolom ringkasan bawah cover.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Waktu Akad Nikah
                  </label>
                  <input
                    type="text"
                    value={formData.akadTime}
                    onChange={(e) => handleChange('akadTime', e.target.value)}
                    placeholder="Contoh: 08.00 WIB"
                    className="w-full bg-white border-2 border-stone-400 focus:border-stone-800 rounded-lg px-3 py-2 text-sm font-bold text-stone-900 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Waktu Resepsi
                  </label>
                  <input
                    type="text"
                    value={formData.resepsiTime}
                    onChange={(e) => handleChange('resepsiTime', e.target.value)}
                    placeholder="Contoh: 11.00 WIB"
                    className="w-full bg-white border-2 border-stone-400 focus:border-stone-800 rounded-lg px-3 py-2 text-sm font-bold text-stone-900 outline-hidden"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: LOKASI & ALAMAT */}
          {activeTab === 'lokasi' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Nama Tempat / Gedung
                </label>
                <input
                  type="text"
                  value={formData.venueName}
                  onChange={(e) => handleChange('venueName', e.target.value)}
                  placeholder="Contoh: Gedung Serbaguna Melati"
                  className="w-full bg-white border-2 border-stone-400 focus:border-stone-800 rounded-lg px-3 py-2 text-sm font-bold text-stone-900 outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Alamat Lengkap
                </label>
                <input
                  type="text"
                  value={formData.venueAddress}
                  onChange={(e) => handleChange('venueAddress', e.target.value)}
                  placeholder="Contoh: Jl. Melati No. 12, Jakarta"
                  className="w-full bg-white border-2 border-stone-400 focus:border-stone-800 rounded-lg px-3 py-2 text-sm font-bold text-stone-900 outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Tautan Google Maps
                </label>
                <input
                  type="url"
                  value={formData.googleMapsUrl}
                  onChange={(e) => handleChange('googleMapsUrl', e.target.value)}
                  placeholder="https://maps.google.com/..."
                  className="w-full bg-white border-2 border-stone-400 focus:border-stone-800 rounded-lg px-3 py-2 text-xs font-mono text-stone-900 outline-hidden"
                />
                <p className="text-[11px] text-stone-500 mt-1">
                  Link ini akan terbuka saat tamu menekan tombol &ldquo;Buka Google Maps&rdquo;.
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: DIALOG KOMIK */}
          {activeTab === 'komik' && (
            <div className="space-y-3">
              <p className="text-xs text-stone-600 mb-2">
                Sesuaikan percakapan 4 panel komik di sampul depan (Foto 1):
              </p>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Panel 1 (Andi bertanya tanggal):
                </label>
                <input
                  type="text"
                  value={formData.comicDialogues.panel1}
                  onChange={(e) => handleComicChange('panel1', e.target.value)}
                  placeholder="Eh, kamu tanggal 20 kosong nggak?"
                  className="w-full bg-white border-2 border-stone-400 focus:border-stone-800 rounded-lg px-3 py-1.5 text-sm font-bold text-stone-900 outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Panel 2 (Sinta penasaran):
                </label>
                <input
                  type="text"
                  value={formData.comicDialogues.panel2}
                  onChange={(e) => handleComicChange('panel2', e.target.value)}
                  placeholder="Kosong sih. Kenapa?"
                  className="w-full bg-white border-2 border-stone-400 focus:border-stone-800 rounded-lg px-3 py-1.5 text-sm font-bold text-stone-900 outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Panel 3 (Andi misterius):
                </label>
                <input
                  type="text"
                  value={formData.comicDialogues.panel3}
                  onChange={(e) => handleComicChange('panel3', e.target.value)}
                  placeholder="Ada acara penting."
                  className="w-full bg-white border-2 border-stone-400 focus:border-stone-800 rounded-lg px-3 py-1.5 text-sm font-bold text-stone-900 outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Panel 4 (Punchline / Pengumuman):
                </label>
                <input
                  type="text"
                  value={formData.comicDialogues.panel4}
                  onChange={(e) => handleComicChange('panel4', e.target.value)}
                  placeholder="Nikahan gue."
                  className="w-full bg-white border-2 border-stone-400 focus:border-stone-800 rounded-lg px-3 py-1.5 text-sm font-bold text-stone-900 outline-hidden"
                />
              </div>
            </div>
          )}

          {/* TAB 5: KUTIPAN & CERITA */}
          {activeTab === 'cerita' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Teks Kutipan / Ayat Suci
                </label>
                <textarea
                  rows={3}
                  value={formData.quoteText}
                  onChange={(e) => handleChange('quoteText', e.target.value)}
                  placeholder="Teks ayat atau mutiara kata..."
                  className="w-full bg-white border-2 border-stone-400 focus:border-stone-800 rounded-lg px-3 py-2 text-sm text-stone-900 outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Sumber Kutipan
                </label>
                <input
                  type="text"
                  value={formData.quoteSource}
                  onChange={(e) => handleChange('quoteSource', e.target.value)}
                  placeholder="Contoh: QS. Ar-Rum : 21"
                  className="w-full bg-white border-2 border-stone-400 focus:border-stone-800 rounded-lg px-3 py-2 text-sm font-bold text-stone-900 outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Kisah Pertemuan (Our Story)
                </label>
                <textarea
                  rows={4}
                  value={formData.ourStory}
                  onChange={(e) => handleChange('ourStory', e.target.value)}
                  placeholder="Ceritakan kisah cinta atau pertemuan Anda berdua..."
                  className="w-full bg-white border-2 border-stone-400 focus:border-stone-800 rounded-lg px-3 py-2 text-sm text-stone-900 outline-hidden"
                />
              </div>
            </div>
          )}

          {/* TAB 6: AMPLUP DIGITAL / REKENING */}
          {activeTab === 'hadiah' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Nama Bank / E-Wallet
                </label>
                <input
                  type="text"
                  value={formData.bankName}
                  onChange={(e) => handleChange('bankName', e.target.value)}
                  placeholder="Contoh: Bank BCA / Mandiri / GoPay"
                  className="w-full bg-white border-2 border-stone-400 focus:border-stone-800 rounded-lg px-3 py-2 text-sm font-bold text-stone-900 outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Nomor Rekening
                </label>
                <input
                  type="text"
                  value={formData.bankAccountNumber}
                  onChange={(e) => handleChange('bankAccountNumber', e.target.value)}
                  placeholder="Contoh: 1234 5678 9012"
                  className="w-full bg-white border-2 border-stone-400 focus:border-stone-800 rounded-lg px-3 py-2 text-sm font-mono font-bold text-stone-900 outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Atas Nama Pemilik Rekening
                </label>
                <input
                  type="text"
                  value={formData.bankAccountHolder}
                  onChange={(e) => handleChange('bankAccountHolder', e.target.value)}
                  placeholder="Contoh: Andi & Sinta"
                  className="w-full bg-white border-2 border-stone-400 focus:border-stone-800 rounded-lg px-3 py-2 text-sm font-bold text-stone-900 outline-hidden"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="border-t-2 border-stone-800 bg-[#f4ece1] px-5 py-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={handleResetToDefault}
              className="inline-flex items-center gap-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-200 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer"
              title="Kembalikan semua ke default Andi & Sinta"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Default</span>
            </button>

            <button
              onClick={handleCopyJson}
              className="inline-flex items-center gap-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-200 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer"
              title="Salin data konfigurasi dalam format JSON"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedJson ? 'JSON Tersalin!' : 'Salin JSON'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg border border-stone-400 text-stone-700 hover:bg-stone-200 text-xs font-bold transition-colors cursor-pointer"
            >
              Batal
            </button>

            <button
              onClick={() => handleSave()}
              className="inline-flex items-center gap-1.5 bg-[#2d3136] hover:bg-stone-900 active:scale-95 text-amber-200 px-5 py-1.5 rounded-lg border border-stone-800 text-xs font-bold shadow-xs transition-all cursor-pointer"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-white">Tersimpan!</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>Terapkan Perubahan</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
