import { useState, useEffect, useRef } from 'react';
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
  Share2,
  Send,
  Eye,
  Music,
  Play,
  Pause,
  Volume2,
} from 'lucide-react';
import { InvitationData, defaultInvitationData } from '../types/invitation';
import { PRESET_SONGS, SongPreset } from '../utils/audio';

interface CustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentData: InvitationData;
  onSave: (newData: InvitationData) => void;
  onReset: () => void;
  onPreviewGuestMode?: (name?: string) => void;
}

type TabKey = 'mempelai' | 'acara' | 'lokasi' | 'cerita' | 'komik' | 'hadiah' | 'musik' | 'tamu';

export function CustomizerModal({
  isOpen,
  onClose,
  currentData,
  onSave,
  onReset,
  onPreviewGuestMode,
}: CustomizerModalProps) {
  const [formData, setFormData] = useState<InvitationData>(currentData);
  const [activeTab, setActiveTab] = useState<TabKey>('mempelai');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);
  const [sampleGuestName, setSampleGuestName] = useState('Bapak Budi & Keluarga');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedWaMessage, setCopiedWaMessage] = useState(false);

  // Audio preview state
  const [previewingSongId, setPreviewingSongId] = useState<string | null>(null);
  const previewAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (previewAudioRef.current) {
        previewAudioRef.current.pause();
        previewAudioRef.current = null;
      }
    };
  }, []);

  const handleTogglePreview = (songId: string, url: string) => {
    if (previewingSongId === songId) {
      if (previewAudioRef.current) {
        previewAudioRef.current.pause();
      }
      setPreviewingSongId(null);
      return;
    }

    if (previewAudioRef.current) {
      previewAudioRef.current.pause();
      previewAudioRef.current = null;
    }

    if (!url) {
      setPreviewingSongId(null);
      return;
    }

    try {
      const audio = new Audio(url);
      previewAudioRef.current = audio;
      setPreviewingSongId(songId);
      audio.play().catch(() => {
        setPreviewingSongId(null);
      });
      audio.onended = () => {
        setPreviewingSongId(null);
      };
    } catch {
      setPreviewingSongId(null);
    }
  };

  const handleSelectPreset = (song: SongPreset) => {
    setFormData((prev) => ({
      ...prev,
      musicUrl: song.url,
      musicTitle: `${song.title} - ${song.artist}`,
    }));
  };

  useEffect(() => {
    setFormData(currentData);
  }, [currentData, isOpen]);

  if (!isOpen) return null;

  const handleChange = <K extends keyof InvitationData>(field: K, value: InvitationData[K]) => {
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

          <button
            onClick={() => setActiveTab('musik')}
            className={`px-3 py-2 rounded-t-lg transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'musik'
                ? 'bg-[#fcfaf5] text-stone-900 border-t-2 border-x-2 border-stone-800'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Music className="w-3.5 h-3.5 text-rose-600" />
            <span>Musik Latar</span>
          </button>

          <button
            onClick={() => setActiveTab('tamu')}
            className={`px-3 py-2 rounded-t-lg transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'tamu'
                ? 'bg-[#fcfaf5] text-stone-900 border-t-2 border-x-2 border-stone-800'
                : 'text-emerald-700 hover:text-emerald-900 font-extrabold'
            }`}
          >
            <Share2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Kirim ke Tamu</span>
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

              {/* Opsi Tampilan Bar Browser */}
              <div className="pt-3.5 mt-3.5 border-t border-stone-300 bg-stone-50 p-3 rounded-xl">
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formData.showBrowserMockup !== false}
                    onChange={(e) => handleChange('showBrowserMockup', e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded-sm border-stone-400 text-stone-900 focus:ring-0 cursor-pointer"
                  />
                  <div>
                    <span className="font-bold text-xs text-stone-900">
                      Tampilkan Bingkai Bar Browser Hitam di Sampul (<code className="text-[11px] font-mono">undanganku.com/...</code>)
                    </span>
                    <p className="text-[11px] text-stone-500 mt-0.5 leading-relaxed">
                      💡 <em>Ingin tampilan bersih tanpa bar browser?</em> Cukup hilangkan tanda centang ini, maka kartu sampul komik akan tampil bersih dan elegan dengan sudut membulat.
                    </p>
                  </div>
                </label>
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

          {/* TAB: MUSIK LATAR UNDANGAN */}
          {activeTab === 'musik' && (
            <div className="space-y-5">
              {/* Info banner */}
              <div className="bg-rose-50 border-2 border-rose-300 rounded-xl p-4 text-rose-950">
                <h4 className="font-bold text-sm flex items-center gap-1.5 mb-1 text-rose-900">
                  <Music className="w-4 h-4 text-rose-600" />
                  <span>Pengaturan Lagu &amp; Musik Latar</span>
                </h4>
                <p className="text-xs leading-relaxed text-rose-800">
                  Musik latar akan otomatis berputar ketika tamu menekan tombol <strong>&ldquo;Buka Undangan&rdquo;</strong>. Tamu juga dapat menjeda atau melanjutkan musik menggunakan tombol mengambang di pojok kanan atas.
                </p>
              </div>

              {/* Current Active Song Status */}
              <div className="bg-white border-2 border-stone-800 rounded-xl p-3.5 flex items-center justify-between gap-3 shadow-xs">
                <div className="min-w-0">
                  <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
                    Lagu Aktif Saat Ini
                  </span>
                  <p className="font-hand font-extrabold text-stone-900 text-sm sm:text-base truncate">
                    {formData.musicTitle || 'Canon in D Major - Johann Pachelbel'}
                  </p>
                  <p className="text-[11px] text-stone-600 truncate font-mono">
                    {formData.musicUrl ? formData.musicUrl : '(Melodi Akustik Sintesis Ringan)'}
                  </p>
                </div>
                {formData.musicUrl && (
                  <button
                    type="button"
                    onClick={() => handleTogglePreview('current', formData.musicUrl || '')}
                    className={`px-3 py-1.5 rounded-lg border-2 border-stone-800 text-xs font-hand font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 ${
                      previewingSongId === 'current'
                        ? 'bg-rose-600 text-white'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-800'
                    }`}
                  >
                    {previewingSongId === 'current' ? (
                      <>
                        <Pause className="w-3.5 h-3.5" />
                        <span>Hentikan</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5" />
                        <span>Tes Putar</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Preset Songs Selection */}
              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
                  Pilih Lagu Romantis Pilihan (Siap Pakai)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {PRESET_SONGS.map((song) => {
                    const isSelected =
                      formData.musicUrl === song.url ||
                      (!formData.musicUrl && song.id === 'synth-bell');
                    const isAudioPlaying = previewingSongId === song.id;

                    return (
                      <div
                        key={song.id}
                        className={`p-3 rounded-xl border-2 transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'bg-amber-50/80 border-amber-600 shadow-xs'
                            : 'bg-white border-stone-300 hover:border-stone-500'
                        }`}
                      >
                        <div>
                          <div className="flex items-start justify-between gap-1.5">
                            <h5 className="font-hand font-bold text-stone-900 text-sm leading-tight">
                              {song.title}
                            </h5>
                            {isSelected && (
                              <span className="bg-amber-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0">
                                Terpilih
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-stone-500 font-bold mt-0.5">{song.artist}</p>
                          <p className="text-[11px] text-stone-600 mt-1 leading-snug line-clamp-2">
                            {song.description}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 mt-3 pt-2 border-t border-stone-200">
                          {song.url ? (
                            <button
                              type="button"
                              onClick={() => handleTogglePreview(song.id, song.url)}
                              className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 cursor-pointer transition-colors ${
                                isAudioPlaying
                                  ? 'bg-rose-600 text-white border-rose-700'
                                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border-stone-400'
                              }`}
                              title="Dengarkan Contoh"
                            >
                              {isAudioPlaying ? (
                                <Pause className="w-3.5 h-3.5" />
                              ) : (
                                <Play className="w-3.5 h-3.5" />
                              )}
                              <span className="text-[11px] font-bold">
                                {isAudioPlaying ? 'Jeda' : 'Dengar'}
                              </span>
                            </button>
                          ) : (
                            <span className="text-[11px] text-stone-500 italic">Bawaan</span>
                          )}

                          <button
                            type="button"
                            onClick={() => handleSelectPreset(song)}
                            className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-hand font-bold cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-stone-800 text-white border border-stone-800'
                                : 'bg-stone-200 hover:bg-stone-300 text-stone-800 border border-stone-400'
                            }`}
                          >
                            {isSelected ? '✓ Terpilih' : 'Gunakan Lagu Ini'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Custom MP3 URL Input Section */}
              <div className="bg-stone-50 border-2 border-stone-400 rounded-xl p-4 space-y-3">
                <h5 className="font-bold text-xs text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🎵</span>
                  <span>Gunakan Lagu / File MP3 Sendiri</span>
                </h5>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Judul Lagu &amp; Penyanyi (Teks yang Tampil)
                  </label>
                  <input
                    type="text"
                    value={formData.musicTitle || ''}
                    onChange={(e) => handleChange('musicTitle', e.target.value)}
                    placeholder="Contoh: Banda Neira - Sampai Jadi Debu / A Thousand Years"
                    className="w-full bg-white border-2 border-stone-400 focus:border-stone-800 rounded-lg px-3 py-2 text-sm font-bold text-stone-900 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Link URL File Audio (.mp3 / .ogg / file lokal)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={formData.musicUrl || ''}
                      onChange={(e) => handleChange('musicUrl', e.target.value)}
                      placeholder="https://.../lagu.mp3 atau /lagu.mp3"
                      className="flex-1 bg-white border-2 border-stone-400 focus:border-stone-800 rounded-lg px-3 py-2 text-xs font-mono text-stone-900 outline-hidden"
                    />
                    {formData.musicUrl && (
                      <button
                        type="button"
                        onClick={() => handleTogglePreview('custom', formData.musicUrl || '')}
                        className="px-3 py-2 bg-stone-800 hover:bg-stone-900 text-white rounded-lg text-xs font-hand font-bold cursor-pointer shrink-0 flex items-center gap-1"
                      >
                        {previewingSongId === 'custom' ? (
                          <>
                            <Pause className="w-3.5 h-3.5" />
                            <span>Stop</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5" />
                            <span>Tes</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {/* Helpful Guide for Custom Songs */}
                <div className="bg-amber-50/70 border border-amber-300 rounded-lg p-3 text-[11px] text-stone-700 space-y-1.5 leading-relaxed">
                  <p className="font-bold text-stone-900 flex items-center gap-1">
                    <span>💡</span>
                    <span>Cara Memasang Lagu Sendiri:</span>
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>
                      <strong>Cara 1 (File Lokal Proyek):</strong> Masukkan file lagu berformat MP3 ke dalam folder <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">public/lagu.mp3</code>, lalu di kolom link cukup ketik <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">/lagu.mp3</code>.
                    </li>
                    <li>
                      <strong>Cara 2 (Dropbox / Hosting Luar):</strong> Jika mengunggah ke Dropbox, salin link bagikan dan ubah bagian akhir link dari <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">dl=0</code> menjadi <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">dl=1</code> agar menjadi link langsung.
                    </li>
                    <li>
                      <strong>Cara 3 (Kirimkan ke AI Studio):</strong> Anda juga bisa langsung menyebutkan judul lagu yang diinginkan (misal: <em>&ldquo;Tolong ganti lagunya ke lagu X&rdquo;</em>), dan kami akan membantu menyiapkannya!
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: KIRIM KE TAMU (GUEST MODE & LINKS) */}
          {activeTab === 'tamu' && (
            <div className="space-y-4">
              <div className="bg-emerald-50 border-2 border-emerald-600/60 rounded-xl p-4 text-emerald-950">
                <h4 className="font-bold text-sm flex items-center gap-1.5 mb-1 text-emerald-900">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>Fitur Undangan Bersih Khusus Tamu</span>
                </h4>
                <p className="text-xs leading-relaxed text-emerald-800">
                  Saat tamu membuka undangan Anda, mereka akan disuguhkan <strong>tampilan bersih tanpa bilah menu edit atau tombol admin</strong>. Anda juga bisa menyematkan nama tamu secara dinamis di sampul depan!
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Nama Tamu yang Dituju
                </label>
                <input
                  type="text"
                  value={sampleGuestName}
                  onChange={(e) => setSampleGuestName(e.target.value)}
                  placeholder="Contoh: Bapak Budi & Keluarga"
                  className="w-full bg-white border-2 border-stone-400 focus:border-stone-800 rounded-lg px-3 py-2 text-sm font-bold text-stone-900 outline-hidden"
                />
                <p className="text-[11px] text-stone-500 mt-1">
                  Nama ini otomatis dicantumkan di kartu sampul komik (&ldquo;Kepada Yth. Bapak/Ibu/Saudara/i&rdquo;).
                </p>
              </div>

              {/* Generated URL Box */}
              <div className="bg-stone-50 border border-stone-300 rounded-xl p-3.5 space-y-2">
                <span className="text-xs font-bold text-stone-800 block">
                  🔗 Link Undangan Tamu (Siap Dibagikan):
                </span>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={`${typeof window !== 'undefined' ? window.location.origin : ''}?to=${encodeURIComponent(sampleGuestName)}`}
                    className="flex-1 bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs font-mono text-stone-800 select-all outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const url = `${typeof window !== 'undefined' ? window.location.origin : ''}?to=${encodeURIComponent(sampleGuestName)}`;
                      navigator.clipboard.writeText(url);
                      setCopiedLink(true);
                      setTimeout(() => setCopiedLink(false), 2000);
                    }}
                    className="bg-stone-800 hover:bg-stone-900 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 shrink-0 cursor-pointer"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? 'Tersalin!' : 'Salin'}</span>
                  </button>
                </div>
              </div>

              {/* WhatsApp Share Template */}
              <div className="bg-stone-50 border border-stone-300 rounded-xl p-3.5 space-y-2">
                <span className="text-xs font-bold text-stone-800 block">
                  💬 Contoh Pesan WhatsApp Siap Kirim:
                </span>
                <div className="bg-white border border-stone-200 rounded-lg p-2.5 text-xs font-sans text-stone-800 leading-relaxed max-h-28 overflow-y-auto whitespace-pre-line">
                  {`Kepada Yth. ${sampleGuestName || 'Bapak/Ibu/Saudara/i'},\n\nTanpa mengurangi rasa hormat, perkenankan kami mengundang Anda untuk hadir di acara pernikahan kami:\n\n*${formData.groomName} & ${formData.brideName}*\n📅 ${formData.weddingDateFull}\n📍 ${formData.venueName}\n\nUntuk informasi lengkap acara dan konfirmasi kehadiran, silakan kunjungi tautan undangan berikut:\n${typeof window !== 'undefined' ? window.location.origin : ''}?to=${encodeURIComponent(sampleGuestName || 'Tamu')}\n\nMerupakan suatu kehormatan dan kebahagiaan bagi kami apabila Anda berkenan hadir dan memberikan doa restu.\n\nTerima kasih.`}
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      const msg = `Kepada Yth. ${sampleGuestName || 'Bapak/Ibu/Saudara/i'},\n\nTanpa mengurangi rasa hormat, perkenankan kami mengundang Anda untuk hadir di acara pernikahan kami:\n\n*${formData.groomName} & ${formData.brideName}*\n📅 ${formData.weddingDateFull}\n📍 ${formData.venueName}\n\nUntuk informasi lengkap acara dan konfirmasi kehadiran, silakan kunjungi tautan undangan berikut:\n${typeof window !== 'undefined' ? window.location.origin : ''}?to=${encodeURIComponent(sampleGuestName || 'Tamu')}\n\nMerupakan suatu kehormatan dan kebahagiaan bagi kami apabila Anda berkenan hadir dan memberikan doa restu.\n\nTerima kasih.`;
                      navigator.clipboard.writeText(msg);
                      setCopiedWaMessage(true);
                      setTimeout(() => setCopiedWaMessage(false), 2000);
                    }}
                    className="bg-stone-200 hover:bg-stone-300 text-stone-800 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedWaMessage ? 'Pesan Tersalin!' : 'Salin Teks WhatsApp'}</span>
                  </button>

                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`Kepada Yth. ${sampleGuestName || 'Bapak/Ibu/Saudara/i'},\n\nTanpa mengurangi rasa hormat, perkenankan kami mengundang Anda untuk hadir di acara pernikahan kami:\n\n*${formData.groomName} & ${formData.brideName}*\n📅 ${formData.weddingDateFull}\n📍 ${formData.venueName}\n\nUntuk informasi lengkap acara dan konfirmasi kehadiran, silakan kunjungi tautan undangan berikut:\n${typeof window !== 'undefined' ? window.location.origin : ''}?to=${encodeURIComponent(sampleGuestName || 'Tamu')}\n\nMerupakan suatu kehormatan dan kebahagiaan bagi kami apabila Anda berkenan hadir dan memberikan doa restu.\n\nTerima kasih.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Buka WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Action: Preview in Guest Mode right now */}
              {onPreviewGuestMode && (
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      onSave(formData);
                      onPreviewGuestMode(sampleGuestName);
                      onClose();
                    }}
                    className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Lihat Langsung Versi Tamu Ini (Simulasi Tampilan Tamu)</span>
                  </button>
                </div>
              )}
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
