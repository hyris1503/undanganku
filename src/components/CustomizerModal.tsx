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
  Users,
  Download,
  FileSpreadsheet,
  ExternalLink,
  Film,
  Image as ImageIcon,
  Trash2,
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

type TabKey =
  | 'sampul'
  | 'mempelai'
  | 'acara'
  | 'lokasi'
  | 'cerita'
  | 'galeri'
  | 'komik'
  | 'hadiah'
  | 'rsvp'
  | 'musik'
  | 'animasi'
  | 'tamu';

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

  // Bulk Guest Generator state
  const [guestSubTab, setGuestSubTab] = useState<'bulk' | 'single'>('bulk');
  const [bulkNamesText, setBulkNamesText] = useState<string>(
    'Bpk. Suwandi & Keluarga\nIbu Siti Liumi\nKeluarga Besar Bpk. Sardi (alm)\nIbu Yuliani\nTeman-teman Ns. Febri\nRekan Kerja Mas Haris\nDimas & Partner'
  );
  const [copiedBulkRowIndex, setCopiedBulkRowIndex] = useState<number | null>(null);
  const [copiedAllBulk, setCopiedAllBulk] = useState(false);

  const getParsedNames = (): string[] => {
    return bulkNamesText
      .split('\n')
      .map((name) => name.replace(/^[\d\.\-\*\•\)\s]+/, '').trim())
      .filter((name) => name.length > 0);
  };

  const getWaText = (guest: string) => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const url = `${origin}?to=${encodeURIComponent(guest)}`;
    return `Kepada Yth. ${guest},\n\nTanpa mengurangi rasa hormat, perkenankan kami mengundang Anda untuk hadir di acara pernikahan kami:\n\n*${formData.groomName} & ${formData.brideName}*\n📅 ${formData.weddingDateFull}\n📍 ${formData.venueName}\n\nUntuk informasi lengkap acara dan konfirmasi kehadiran, silakan buka tautan undangan berikut:\n${url}\n\nMerupakan suatu kehormatan dan kebahagiaan bagi kami apabila Anda berkenan hadir dan memberikan doa restu.\n\nTerima kasih.`;
  };

  const handleCopyAllBulk = () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const names = getParsedNames();
    const rows = names.map((name, i) => {
      const url = `${origin}?to=${encodeURIComponent(name)}`;
      return `${i + 1}\t${name}\t${url}`;
    });
    const header = 'No\tNama Tamu\tLink Undangan';
    const tsv = [header, ...rows].join('\n');
    navigator.clipboard.writeText(tsv);
    setCopiedAllBulk(true);
    setTimeout(() => setCopiedAllBulk(false), 2500);
  };

  const handleDownloadCsv = () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const names = getParsedNames();
    const rows = names.map((name, i) => {
      const url = `${origin}?to=${encodeURIComponent(name)}`;
      const escapedName = `"${name.replace(/"/g, '""')}"`;
      const escapedUrl = `"${url.replace(/"/g, '""')}"`;
      return `${i + 1},${escapedName},${escapedUrl}`;
    });
    const header = 'No,Nama Tamu,Link Undangan';
    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [header, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `daftar-link-undangan-${formData.groomName}-${formData.brideName}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      onSave(updated);
      return updated;
    });
  };

  const handleComicChange = (panel: keyof InvitationData['comicDialogues'], value: string) => {
    setFormData((prev) => {
      const updated = {
        ...prev,
        comicDialogues: {
          ...prev.comicDialogues,
          [panel]: value,
        },
      };
      onSave(updated);
      return updated;
    });
  };

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    onSave(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 400);
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
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-stone-900 leading-tight">
                  Kustomisasi Undangan
                </h2>
                <span className="inline-flex items-center gap-1 text-[10px] text-emerald-800 bg-emerald-100/90 border border-emerald-300 px-2 py-0.5 rounded-full font-sans font-semibold">
                  <Check className="w-3 h-3 text-emerald-600" />
                  <span>Tersimpan Otomatis</span>
                </span>
              </div>
              <p className="text-xs text-stone-600">
                Ubah teks, nama, tanggal, lokasi, animasi &amp; bahan langsung tersimpan
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
            onClick={() => setActiveTab('sampul')}
            className={`px-3 py-2 rounded-t-lg transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'sampul'
                ? 'bg-[#fcfaf5] text-stone-900 border-t-2 border-x-2 border-stone-800'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Sampul</span>
          </button>

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
            onClick={() => setActiveTab('cerita')}
            className={`px-3 py-2 rounded-t-lg transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'cerita'
                ? 'bg-[#fcfaf5] text-stone-900 border-t-2 border-x-2 border-stone-800'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-stone-700" />
            <span>Cerita</span>
          </button>

          <button
            onClick={() => setActiveTab('galeri')}
            className={`px-3 py-2 rounded-t-lg transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'galeri'
                ? 'bg-[#fcfaf5] text-stone-900 border-t-2 border-x-2 border-stone-800'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5 text-blue-600" />
            <span>Galeri</span>
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
            onClick={() => setActiveTab('hadiah')}
            className={`px-3 py-2 rounded-t-lg transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'hadiah'
                ? 'bg-[#fcfaf5] text-stone-900 border-t-2 border-x-2 border-stone-800'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5 text-stone-700" />
            <span>Hadiah</span>
          </button>

          <button
            onClick={() => setActiveTab('rsvp')}
            className={`px-3 py-2 rounded-t-lg transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'rsvp'
                ? 'bg-[#fcfaf5] text-stone-900 border-t-2 border-x-2 border-stone-800'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Send className="w-3.5 h-3.5 text-teal-600" />
            <span>RSVP &amp; Penutup</span>
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
            onClick={() => setActiveTab('animasi')}
            className={`px-3 py-2 rounded-t-lg transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'animasi'
                ? 'bg-[#fcfaf5] text-stone-900 border-t-2 border-x-2 border-stone-800'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Film className="w-3.5 h-3.5 text-purple-600" />
            <span>Animasi &amp; Bahan</span>
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
          {/* TAB: SAMPUL / COVER */}
          {activeTab === 'sampul' && (
            <div className="space-y-4">
              <div className="bg-amber-50 border-2 border-stone-800 rounded-xl p-3.5 text-stone-900">
                <h4 className="font-bold text-sm flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Kustomisasi Halaman Sampul (Cover Depan)</span>
                </h4>
                <p className="text-xs text-stone-600">
                  Ubah teks judul, tanggal, tombol buka, dan catatan audio di halaman sampul komik.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Judul Utama Sampul (Atas)
                </label>
                <input
                  type="text"
                  value={formData.coverTitle || 'THE WEDDING OF'}
                  onChange={(e) => handleChange('coverTitle', e.target.value)}
                  placeholder="Contoh: THE WEDDING OF"
                  className="w-full bg-white border-2 border-stone-400 focus:border-stone-800 rounded-lg px-3 py-2 text-sm font-bold text-stone-900 outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Tanggal Singkat di Sampul
                  </label>
                  <input
                    type="text"
                    value={formData.weddingDate}
                    onChange={(e) => handleChange('weddingDate', e.target.value)}
                    placeholder="Contoh: 20 . 12 . 2026"
                    className="w-full bg-white border-2 border-stone-400 focus:border-stone-800 rounded-lg px-3 py-2 text-sm font-bold text-stone-900 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Subtitle Sampul (Pita Kuning)
                  </label>
                  <input
                    type="text"
                    value={formData.coverSubtitle || 'UNDANGAN PERNIKAHAN SPESIAL'}
                    onChange={(e) => handleChange('coverSubtitle', e.target.value)}
                    placeholder="Contoh: UNDANGAN PERNIKAHAN SPESIAL"
                    className="w-full bg-white border-2 border-stone-400 focus:border-stone-800 rounded-lg px-3 py-2 text-sm font-bold text-stone-900 outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Teks Tombol Buka Undangan
                  </label>
                  <input
                    type="text"
                    value={formData.coverButtonText || 'Buka Undangan'}
                    onChange={(e) => handleChange('coverButtonText', e.target.value)}
                    placeholder="Contoh: Buka Undangan"
                    className="w-full bg-white border-2 border-stone-400 focus:border-stone-800 rounded-lg px-3 py-2 text-sm font-bold text-stone-900 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Catatan Audio di Bawah Tombol
                  </label>
                  <input
                    type="text"
                    value={formData.coverAudioNotice || '*Sentuh tombol untuk membuka & memutar musik'}
                    onChange={(e) => handleChange('coverAudioNotice', e.target.value)}
                    placeholder="Contoh: *Sentuh tombol untuk membuka & memutar musik"
                    className="w-full bg-white border-2 border-stone-400 focus:border-stone-800 rounded-lg px-3 py-2 text-xs text-stone-900 outline-hidden"
                  />
                </div>
              </div>

              {/* Opsi Tampilan Bar Browser */}
              <div className="pt-2 border-t border-stone-300 bg-stone-50 p-3 rounded-xl">
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
                      💡 <em>Ingin tampilan bersih tanpa bar browser?</em> Cukup hilangkan tanda centang ini.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* TAB 1: MEMPELAI */}
          {activeTab === 'mempelai' && (
            <div className="space-y-5">
              {/* Salam Pembuka */}
              <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-300 space-y-3">
                <span className="font-bold text-xs text-stone-800 flex items-center gap-1.5">
                  <span>🕊️</span>
                  <span>Salam &amp; Teks Pembuka Undangan</span>
                </span>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Salam Pembuka
                  </label>
                  <input
                    type="text"
                    value={formData.greetingSalam || "Assalamu'alaikum Warahmatullahi Wabarakatuh"}
                    onChange={(e) => handleChange('greetingSalam', e.target.value)}
                    placeholder="Contoh: Assalamu'alaikum Warahmatullahi Wabarakatuh"
                    className="w-full bg-white border-2 border-stone-400 focus:border-stone-800 rounded-lg px-3 py-1.5 text-sm font-bold text-stone-900 outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Kalimat Sambutan / Pengantar
                  </label>
                  <textarea
                    rows={2}
                    value={
                      formData.greetingOpening ||
                      'Dengan memohon rahmat dan ridho Allah Subhanahu Wa Ta’ala, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri hari bahagia kami:'
                    }
                    onChange={(e) => handleChange('greetingOpening', e.target.value)}
                    placeholder="Kalimat pengantar..."
                    className="w-full bg-white border-2 border-stone-400 focus:border-stone-800 rounded-lg px-3 py-1.5 text-xs text-stone-900 outline-hidden"
                  />
                </div>
              </div>

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
            <div className="space-y-5">
              <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-300 space-y-3">
                <span className="font-bold text-xs text-stone-800 flex items-center gap-1.5">
                  <span>📌</span>
                  <span>Judul &amp; Subtitle Bagian Acara</span>
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Judul Section Acara
                    </label>
                    <input
                      type="text"
                      value={formData.eventSectionTitle || 'DETAIL ACARA'}
                      onChange={(e) => handleChange('eventSectionTitle', e.target.value)}
                      placeholder="Contoh: DETAIL ACARA"
                      className="w-full bg-white border-2 border-stone-400 focus:border-stone-800 rounded-lg px-3 py-1.5 text-sm font-bold text-stone-900 outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Subtitle Section Acara
                    </label>
                    <input
                      type="text"
                      value={formData.eventSectionSubtitle || 'Mohon hadir di hari bahagia kami'}
                      onChange={(e) => handleChange('eventSectionSubtitle', e.target.value)}
                      placeholder="Contoh: Mohon hadir di hari bahagia kami"
                      className="w-full bg-white border-2 border-stone-400 focus:border-stone-800 rounded-lg px-3 py-1.5 text-xs text-stone-900 outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Akad Nikah */}
              <div className="bg-amber-50/50 p-3.5 rounded-xl border-2 border-stone-800 space-y-3">
                <span className="font-bold text-xs text-stone-900 flex items-center gap-1.5">
                  <span>💍</span>
                  <span>Acara 1: Akad Nikah</span>
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Nama Acara 1
                    </label>
                    <input
                      type="text"
                      value={formData.akadTitle || 'Akad Nikah'}
                      onChange={(e) => handleChange('akadTitle', e.target.value)}
                      placeholder="Contoh: Akad Nikah"
                      className="w-full bg-white border border-stone-400 focus:border-stone-800 rounded-lg px-2.5 py-1.5 text-xs font-bold text-stone-900 outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Hari &amp; Tanggal
                    </label>
                    <input
                      type="text"
                      value={formData.akadDate || formData.weddingDateFull}
                      onChange={(e) => handleChange('akadDate', e.target.value)}
                      placeholder="Contoh: Minggu, 20 Desember 2026"
                      className="w-full bg-white border border-stone-400 focus:border-stone-800 rounded-lg px-2.5 py-1.5 text-xs text-stone-900 outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Waktu Pelaksanaan
                    </label>
                    <input
                      type="text"
                      value={formData.akadTime}
                      onChange={(e) => handleChange('akadTime', e.target.value)}
                      placeholder="Contoh: 08.00 - 10.00 WIB"
                      className="w-full bg-white border border-stone-400 focus:border-stone-800 rounded-lg px-2.5 py-1.5 text-xs text-stone-900 outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Tempat / Gedung Akad
                    </label>
                    <input
                      type="text"
                      value={formData.akadVenue || formData.venueName}
                      onChange={(e) => handleChange('akadVenue', e.target.value)}
                      placeholder="Contoh: Masjid Agung Al-Barkah"
                      className="w-full bg-white border border-stone-400 focus:border-stone-800 rounded-lg px-2.5 py-1.5 text-xs text-stone-900 outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Alamat Singkat Akad
                    </label>
                    <input
                      type="text"
                      value={formData.akadAddress || formData.venueAddress}
                      onChange={(e) => handleChange('akadAddress', e.target.value)}
                      placeholder="Contoh: Jl. Veteran No. 1, Bekasi"
                      className="w-full bg-white border border-stone-400 focus:border-stone-800 rounded-lg px-2.5 py-1.5 text-xs text-stone-900 outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Resepsi */}
              <div className="bg-rose-50/50 p-3.5 rounded-xl border-2 border-stone-800 space-y-3">
                <span className="font-bold text-xs text-stone-900 flex items-center gap-1.5">
                  <span>🎉</span>
                  <span>Acara 2: Resepsi Pernikahan</span>
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Nama Acara 2
                    </label>
                    <input
                      type="text"
                      value={formData.resepsiTitle || 'Resepsi Pernikahan'}
                      onChange={(e) => handleChange('resepsiTitle', e.target.value)}
                      placeholder="Contoh: Resepsi Pernikahan"
                      className="w-full bg-white border border-stone-400 focus:border-stone-800 rounded-lg px-2.5 py-1.5 text-xs font-bold text-stone-900 outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Hari &amp; Tanggal
                    </label>
                    <input
                      type="text"
                      value={formData.resepsiDate || formData.weddingDateFull}
                      onChange={(e) => handleChange('resepsiDate', e.target.value)}
                      placeholder="Contoh: Minggu, 20 Desember 2026"
                      className="w-full bg-white border border-stone-400 focus:border-stone-800 rounded-lg px-2.5 py-1.5 text-xs text-stone-900 outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Waktu Pelaksanaan
                    </label>
                    <input
                      type="text"
                      value={formData.resepsiTime}
                      onChange={(e) => handleChange('resepsiTime', e.target.value)}
                      placeholder="Contoh: 11.00 - 14.00 WIB"
                      className="w-full bg-white border border-stone-400 focus:border-stone-800 rounded-lg px-2.5 py-1.5 text-xs text-stone-900 outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Tempat / Gedung Resepsi
                    </label>
                    <input
                      type="text"
                      value={formData.resepsiVenue || formData.venueName}
                      onChange={(e) => handleChange('resepsiVenue', e.target.value)}
                      placeholder="Contoh: Gedung Serbaguna Melati"
                      className="w-full bg-white border border-stone-400 focus:border-stone-800 rounded-lg px-2.5 py-1.5 text-xs text-stone-900 outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Alamat Singkat Resepsi
                    </label>
                    <input
                      type="text"
                      value={formData.resepsiAddress || formData.venueAddress}
                      onChange={(e) => handleChange('resepsiAddress', e.target.value)}
                      placeholder="Contoh: Jl. Melati No. 12, Jakarta"
                      className="w-full bg-white border border-stone-400 focus:border-stone-800 rounded-lg px-2.5 py-1.5 text-xs text-stone-900 outline-hidden"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: LOKASI & ALAMAT */}
          {activeTab === 'lokasi' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Judul Section Lokasi
                  </label>
                  <input
                    type="text"
                    value={formData.locationSectionTitle || 'LOKASI ACARA'}
                    onChange={(e) => handleChange('locationSectionTitle', e.target.value)}
                    placeholder="Contoh: LOKASI ACARA"
                    className="w-full bg-white border-2 border-stone-400 focus:border-stone-800 rounded-lg px-3 py-1.5 text-sm font-bold text-stone-900 outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Subtitle Section Lokasi
                  </label>
                  <input
                    type="text"
                    value={formData.locationSectionSubtitle || 'Lokasi acara pernikahan'}
                    onChange={(e) => handleChange('locationSectionSubtitle', e.target.value)}
                    placeholder="Contoh: Lokasi acara pernikahan"
                    className="w-full bg-white border-2 border-stone-400 focus:border-stone-800 rounded-lg px-3 py-1.5 text-xs text-stone-900 outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Nama Tempat / Gedung Utama
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
                <textarea
                  rows={2}
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
                  Link ini akan terbuka saat tamu menekan tombol navigasi peta.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Teks Tombol Google Maps
                </label>
                <input
                  type="text"
                  value={formData.googleMapsButtonText || 'Buka Google Maps'}
                  onChange={(e) => handleChange('googleMapsButtonText', e.target.value)}
                  placeholder="Contoh: Buka Google Maps"
                  className="w-full bg-white border-2 border-stone-400 focus:border-stone-800 rounded-lg px-3 py-1.5 text-xs font-bold text-stone-900 outline-hidden"
                />
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
              <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-300 space-y-3">
                <span className="font-bold text-xs text-stone-800 flex items-center gap-1.5">
                  <span>📖</span>
                  <span>Judul &amp; Subtitle Bagian Kisah Kami</span>
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Judul Section Cerita
                    </label>
                    <input
                      type="text"
                      value={formData.storyTitle || 'OUR STORY'}
                      onChange={(e) => handleChange('storyTitle', e.target.value)}
                      placeholder="Contoh: OUR STORY"
                      className="w-full bg-white border-2 border-stone-400 focus:border-stone-800 rounded-lg px-3 py-1.5 text-sm font-bold text-stone-900 outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Subtitle Section Cerita
                    </label>
                    <input
                      type="text"
                      value={formData.storySubtitle || 'Kisah sederhana kami'}
                      onChange={(e) => handleChange('storySubtitle', e.target.value)}
                      placeholder="Contoh: Kisah sederhana kami"
                      className="w-full bg-white border-2 border-stone-400 focus:border-stone-800 rounded-lg px-3 py-1.5 text-xs text-stone-900 outline-hidden"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Kisah Pertemuan / Perjalanan Cinta (Our Story)
                </label>
                <textarea
                  rows={4}
                  value={formData.ourStory}
                  onChange={(e) => handleChange('ourStory', e.target.value)}
                  placeholder="Ceritakan kisah cinta atau pertemuan Anda berdua..."
                  className="w-full bg-white border-2 border-stone-400 focus:border-stone-800 rounded-lg px-3 py-2 text-sm text-stone-900 outline-hidden"
                />
              </div>

              <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-300 space-y-3">
                <span className="font-bold text-xs text-stone-800 flex items-center gap-1.5">
                  <span>📜</span>
                  <span>Kutipan Ayat Suci / Mutiara Kata</span>
                </span>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Teks Kutipan / Ayat
                  </label>
                  <textarea
                    rows={3}
                    value={formData.quoteText}
                    onChange={(e) => handleChange('quoteText', e.target.value)}
                    placeholder="Teks ayat atau mutiara kata..."
                    className="w-full bg-white border-2 border-stone-400 focus:border-stone-800 rounded-lg px-3 py-2 text-xs text-stone-900 outline-hidden"
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
                    className="w-full bg-white border-2 border-stone-400 focus:border-stone-800 rounded-lg px-3 py-1.5 text-xs font-bold text-stone-900 outline-hidden"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB: GALERI FOTO */}
          {activeTab === 'galeri' && (
            <div className="space-y-4">
              <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-300 space-y-3">
                <span className="font-bold text-xs text-stone-800 flex items-center gap-1.5">
                  <span>🖼️</span>
                  <span>Judul &amp; Subtitle Bagian Galeri</span>
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Judul Section Galeri
                    </label>
                    <input
                      type="text"
                      value={formData.gallerySectionTitle || 'GALERI FOTO'}
                      onChange={(e) => handleChange('gallerySectionTitle', e.target.value)}
                      placeholder="Contoh: GALERI FOTO"
                      className="w-full bg-white border-2 border-stone-400 focus:border-stone-800 rounded-lg px-3 py-1.5 text-sm font-bold text-stone-900 outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Subtitle Section Galeri
                    </label>
                    <input
                      type="text"
                      value={formData.gallerySectionSubtitle || 'Momen-momen indah kami'}
                      onChange={(e) => handleChange('gallerySectionSubtitle', e.target.value)}
                      placeholder="Contoh: Momen-momen indah kami"
                      className="w-full bg-white border-2 border-stone-400 focus:border-stone-800 rounded-lg px-3 py-1.5 text-xs text-stone-900 outline-hidden"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-blue-50/60 border border-blue-300 rounded-xl p-3 text-xs text-blue-900">
                💡 <strong>Kustomisasi Foto Polaroid:</strong> Masukkan link URL gambar foto prewedding Anda dan tulis keterangan (caption) tulisan tangan di bawahnya. Kosongkan untuk memakai foto bawaan.
              </div>

              {/* 6 Photo Slots */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {[
                  { num: 1, photoKey: 'galleryPhoto1' as const, captionKey: 'galleryCaption1' as const, defaultCaption: 'Pertama kali ketemu di kafe itu...' },
                  { num: 2, photoKey: 'galleryPhoto2' as const, captionKey: 'galleryCaption2' as const, defaultCaption: 'Jalan-jalan sore berdua' },
                  { num: 3, photoKey: 'galleryPhoto3' as const, captionKey: 'galleryCaption3' as const, defaultCaption: 'Momen lamaran bahagia' },
                  { num: 4, photoKey: 'galleryPhoto4' as const, captionKey: 'galleryCaption4' as const, defaultCaption: 'Tertawa lepas bersama' },
                  { num: 5, photoKey: 'galleryPhoto5' as const, captionKey: 'galleryCaption5' as const, defaultCaption: 'Foto pre-wedding favorit' },
                  { num: 6, photoKey: 'galleryPhoto6' as const, captionKey: 'galleryCaption6' as const, defaultCaption: 'Menuju babak baru kehidupan' },
                ].map((slot) => (
                  <div key={slot.num} className="bg-white p-3 rounded-xl border-2 border-stone-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-stone-800 flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-amber-200 border border-stone-800 flex items-center justify-center text-[10px]">
                          {slot.num}
                        </span>
                        <span>Foto Polaroid #{slot.num}</span>
                      </span>
                      {formData[slot.photoKey] && (
                        <button
                          type="button"
                          onClick={() => {
                            handleChange(slot.photoKey, '');
                            handleChange(slot.captionKey, '');
                          }}
                          className="text-[11px] text-rose-600 hover:text-rose-800 font-bold cursor-pointer"
                        >
                          Reset
                        </button>
                      )}
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-stone-600 mb-0.5">
                        Link URL Foto
                      </label>
                      <input
                        type="url"
                        value={formData[slot.photoKey] || ''}
                        onChange={(e) => handleChange(slot.photoKey, e.target.value)}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full bg-[#fcf9f2] border border-stone-400 focus:border-stone-800 rounded-lg px-2.5 py-1 text-xs font-mono text-stone-900 outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-stone-600 mb-0.5">
                        Teks Caption (Tulisan Tangan)
                      </label>
                      <input
                        type="text"
                        value={formData[slot.captionKey] || ''}
                        onChange={(e) => handleChange(slot.captionKey, e.target.value)}
                        placeholder={slot.defaultCaption}
                        className="w-full bg-white border border-stone-400 focus:border-stone-800 rounded-lg px-2.5 py-1 text-xs text-stone-900 outline-hidden"
                      />
                    </div>
                    {formData[slot.photoKey] && (
                      <div className="pt-1 text-center">
                        <img
                          src={formData[slot.photoKey]}
                          alt={`Preview ${slot.num}`}
                          className="h-20 w-auto max-w-full mx-auto object-cover rounded-md border border-stone-300"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: HADIAH & REKENING */}
          {activeTab === 'hadiah' && (
            <div className="space-y-4">
              <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-300 space-y-3">
                <span className="font-bold text-xs text-stone-800 flex items-center gap-1.5">
                  <span>🎁</span>
                  <span>Judul &amp; Pesan Hadiah (Wedding Gift)</span>
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Judul Section Hadiah
                    </label>
                    <input
                      type="text"
                      value={formData.giftSectionTitle || 'WEDDING GIFT'}
                      onChange={(e) => handleChange('giftSectionTitle', e.target.value)}
                      placeholder="Contoh: WEDDING GIFT"
                      className="w-full bg-white border-2 border-stone-400 focus:border-stone-800 rounded-lg px-3 py-1.5 text-sm font-bold text-stone-900 outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Subtitle Section Hadiah
                    </label>
                    <input
                      type="text"
                      value={formData.giftSectionSubtitle || 'Tanda kasih & doa restu'}
                      onChange={(e) => handleChange('giftSectionSubtitle', e.target.value)}
                      placeholder="Contoh: Tanda kasih & doa restu"
                      className="w-full bg-white border-2 border-stone-400 focus:border-stone-800 rounded-lg px-3 py-1.5 text-xs text-stone-900 outline-hidden"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Catatan Pesan Hadiah
                  </label>
                  <textarea
                    rows={2}
                    value={
                      formData.giftNotice ||
                      'Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika memberi adalah ungkapan tanda kasih, Anda dapat memberi kado secara digital atau fisik.'
                    }
                    onChange={(e) => handleChange('giftNotice', e.target.value)}
                    placeholder="Pesan catatan hadiah..."
                    className="w-full bg-white border-2 border-stone-400 focus:border-stone-800 rounded-lg px-3 py-1.5 text-xs text-stone-900 outline-hidden"
                  />
                </div>
              </div>

              {/* Rekening 1 */}
              <div className="bg-white p-3.5 rounded-xl border-2 border-stone-800 space-y-3">
                <span className="font-bold text-xs text-stone-900 flex items-center gap-1.5">
                  <span>💳</span>
                  <span>Rekening Utama (Bank / E-Wallet 1)</span>
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Nama Bank / E-Wallet
                    </label>
                    <input
                      type="text"
                      value={formData.bankName}
                      onChange={(e) => handleChange('bankName', e.target.value)}
                      placeholder="Contoh: Bank BCA"
                      className="w-full bg-white border border-stone-400 focus:border-stone-800 rounded-lg px-2.5 py-1.5 text-xs font-bold text-stone-900 outline-hidden"
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
                      placeholder="Contoh: 1234567890"
                      className="w-full bg-white border border-stone-400 focus:border-stone-800 rounded-lg px-2.5 py-1.5 text-xs font-mono font-bold text-stone-900 outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Atas Nama
                    </label>
                    <input
                      type="text"
                      value={formData.bankAccountHolder}
                      onChange={(e) => handleChange('bankAccountHolder', e.target.value)}
                      placeholder="Contoh: Andi Pratama"
                      className="w-full bg-white border border-stone-400 focus:border-stone-800 rounded-lg px-2.5 py-1.5 text-xs font-bold text-stone-900 outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Rekening 2 */}
              <div className="bg-white p-3.5 rounded-xl border-2 border-stone-800 space-y-3">
                <span className="font-bold text-xs text-stone-900 flex items-center gap-1.5">
                  <span>💳</span>
                  <span>Rekening Kedua (Opsional)</span>
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Nama Bank / E-Wallet 2
                    </label>
                    <input
                      type="text"
                      value={formData.bankName2 || ''}
                      onChange={(e) => handleChange('bankName2', e.target.value)}
                      placeholder="Contoh: Bank Mandiri / GoPay"
                      className="w-full bg-white border border-stone-400 focus:border-stone-800 rounded-lg px-2.5 py-1.5 text-xs font-bold text-stone-900 outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Nomor Rekening 2
                    </label>
                    <input
                      type="text"
                      value={formData.bankAccountNumber2 || ''}
                      onChange={(e) => handleChange('bankAccountNumber2', e.target.value)}
                      placeholder="Contoh: 9876543210"
                      className="w-full bg-white border border-stone-400 focus:border-stone-800 rounded-lg px-2.5 py-1.5 text-xs font-mono font-bold text-stone-900 outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Atas Nama 2
                    </label>
                    <input
                      type="text"
                      value={formData.bankAccountHolder2 || ''}
                      onChange={(e) => handleChange('bankAccountHolder2', e.target.value)}
                      placeholder="Contoh: Sinta Dewi"
                      className="w-full bg-white border border-stone-400 focus:border-stone-800 rounded-lg px-2.5 py-1.5 text-xs font-bold text-stone-900 outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Kado Fisik */}
              <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-300 space-y-3">
                <span className="font-bold text-xs text-stone-800 flex items-center gap-1.5">
                  <span>📦</span>
                  <span>Alamat Pengiriman Kado Fisik</span>
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Nama Penerima Kado
                    </label>
                    <input
                      type="text"
                      value={formData.giftAddressRecipient || `${formData.groomName} & ${formData.brideName}`}
                      onChange={(e) => handleChange('giftAddressRecipient', e.target.value)}
                      placeholder="Contoh: Andi Pratama"
                      className="w-full bg-white border border-stone-400 focus:border-stone-800 rounded-lg px-2.5 py-1.5 text-xs text-stone-900 outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Nomor Telepon / WhatsApp
                    </label>
                    <input
                      type="text"
                      value={formData.giftAddressPhone || ''}
                      onChange={(e) => handleChange('giftAddressPhone', e.target.value)}
                      placeholder="Contoh: 08123456789"
                      className="w-full bg-white border border-stone-400 focus:border-stone-800 rounded-lg px-2.5 py-1.5 text-xs text-stone-900 outline-hidden"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Alamat Lengkap Pengiriman
                  </label>
                  <textarea
                    rows={2}
                    value={formData.giftAddress || ''}
                    onChange={(e) => handleChange('giftAddress', e.target.value)}
                    placeholder="Contoh: Jl. Mawar No. 10, RT 01/RW 02, Kebayoran Baru, Jakarta Selatan 12120"
                    className="w-full bg-white border border-stone-400 focus:border-stone-800 rounded-lg px-2.5 py-1.5 text-xs text-stone-900 outline-hidden"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB: RSVP & PENUTUP */}
          {activeTab === 'rsvp' && (
            <div className="space-y-4">
              <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-300 space-y-3">
                <span className="font-bold text-xs text-stone-800 flex items-center gap-1.5">
                  <span>✉️</span>
                  <span>Pengaturan Konfirmasi Kehadiran (RSVP)</span>
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Judul Section RSVP
                    </label>
                    <input
                      type="text"
                      value={formData.rsvpSectionTitle || 'KONFIRMASI KEHADIRAN'}
                      onChange={(e) => handleChange('rsvpSectionTitle', e.target.value)}
                      placeholder="Contoh: KONFIRMASI KEHADIRAN"
                      className="w-full bg-white border-2 border-stone-400 focus:border-stone-800 rounded-lg px-3 py-1.5 text-sm font-bold text-stone-900 outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Subtitle Section RSVP
                    </label>
                    <input
                      type="text"
                      value={formData.rsvpSectionSubtitle || 'Mohon konfirmasi kehadiran Anda'}
                      onChange={(e) => handleChange('rsvpSectionSubtitle', e.target.value)}
                      placeholder="Contoh: Mohon konfirmasi kehadiran Anda"
                      className="w-full bg-white border-2 border-stone-400 focus:border-stone-800 rounded-lg px-3 py-1.5 text-xs text-stone-900 outline-hidden"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Catatan RSVP
                    </label>
                    <input
                      type="text"
                      value={formData.rsvpNotice || 'Konfirmasi paling lambat H-3 acara pernikahan'}
                      onChange={(e) => handleChange('rsvpNotice', e.target.value)}
                      placeholder="Contoh: Konfirmasi paling lambat H-3"
                      className="w-full bg-white border border-stone-400 focus:border-stone-800 rounded-lg px-2.5 py-1.5 text-xs text-stone-900 outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Nomor WhatsApp Penerima Notifikasi RSVP
                    </label>
                    <input
                      type="text"
                      value={formData.rsvpWhatsappNumber || ''}
                      onChange={(e) => handleChange('rsvpWhatsappNumber', e.target.value)}
                      placeholder="Contoh: 6281234567890"
                      className="w-full bg-white border border-stone-400 focus:border-stone-800 rounded-lg px-2.5 py-1.5 text-xs font-mono text-stone-900 outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Ucapan & Doa */}
              <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-300 space-y-3">
                <span className="font-bold text-xs text-stone-800 flex items-center gap-1.5">
                  <span>💬</span>
                  <span>Judul Bagian Ucapan &amp; Doa Tamu</span>
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Judul Section Doa
                    </label>
                    <input
                      type="text"
                      value={formData.wishesSectionTitle || 'DOA & UCAPAN'}
                      onChange={(e) => handleChange('wishesSectionTitle', e.target.value)}
                      placeholder="Contoh: DOA & UCAPAN"
                      className="w-full bg-white border-2 border-stone-400 focus:border-stone-800 rounded-lg px-3 py-1.5 text-sm font-bold text-stone-900 outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Subtitle Section Doa
                    </label>
                    <input
                      type="text"
                      value={formData.wishesSectionSubtitle || 'Tulis doa dan harapan terbaik untuk kedua mempelai'}
                      onChange={(e) => handleChange('wishesSectionSubtitle', e.target.value)}
                      placeholder="Contoh: Tulis doa dan harapan terbaik..."
                      className="w-full bg-white border-2 border-stone-400 focus:border-stone-800 rounded-lg px-3 py-1.5 text-xs text-stone-900 outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Penutup Undangan */}
              <div className="bg-amber-50/50 p-3.5 rounded-xl border-2 border-stone-800 space-y-3">
                <span className="font-bold text-xs text-stone-900 flex items-center gap-1.5">
                  <span>🌸</span>
                  <span>Teks &amp; Salam Penutup Undangan</span>
                </span>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Kalimat Penutup
                  </label>
                  <textarea
                    rows={3}
                    value={
                      formData.closingText ||
                      'Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kedua mempelai.'
                    }
                    onChange={(e) => handleChange('closingText', e.target.value)}
                    placeholder="Kalimat penutup..."
                    className="w-full bg-white border-2 border-stone-400 focus:border-stone-800 rounded-lg px-3 py-1.5 text-xs text-stone-900 outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Salam Penutup
                    </label>
                    <input
                      type="text"
                      value={formData.closingSalam || "Wassalamu'alaikum Warahmatullahi Wabarakatuh"}
                      onChange={(e) => handleChange('closingSalam', e.target.value)}
                      placeholder="Contoh: Wassalamu'alaikum Warahmatullahi Wabarakatuh"
                      className="w-full bg-white border border-stone-400 focus:border-stone-800 rounded-lg px-2.5 py-1.5 text-xs text-stone-900 outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Keluarga Besar / Hormat Kami
                    </label>
                    <input
                      type="text"
                      value={formData.closingFamily || `Keluarga Besar ${formData.groomName} & ${formData.brideName}`}
                      onChange={(e) => handleChange('closingFamily', e.target.value)}
                      placeholder="Contoh: Keluarga Besar Bpk. Bambang & Bpk. Hendra"
                      className="w-full bg-white border border-stone-400 focus:border-stone-800 rounded-lg px-2.5 py-1.5 text-xs font-bold text-stone-900 outline-hidden"
                    />
                  </div>
                </div>
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

          {/* TAB: ANIMASI & BAHAN KUSTOM */}
          {activeTab === 'animasi' && (
            <div className="space-y-6">
              {/* Highlight Intro */}
              <div className="bg-purple-50/80 border-2 border-purple-500/60 rounded-xl p-4 text-purple-950">
                <h4 className="font-bold text-sm flex items-center gap-1.5 mb-1 text-purple-900">
                  <Film className="w-4 h-4 text-purple-700" />
                  <span>Kustomisasi Animasi &amp; Bahan Undangan via Link URL</span>
                </h4>
                <p className="text-xs leading-relaxed text-purple-800">
                  Anda dapat mengganti animasi, gambar ilustrasi, GIF, atau karakter di berbagai bagian undangan cukup dengan memasukkan link URL (atau file lokal seperti <code className="bg-purple-100 px-1 py-0.5 rounded font-mono">/nama-file.gif</code>). Kosongkan kolom input jika ingin kembali ke tampilan bawaan.
                </p>
              </div>

              {/* 1. Animasi Komik di Awal */}
              <div className="bg-white border-2 border-stone-800 rounded-xl p-4 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <h5 className="font-bold text-sm text-stone-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-200 border border-stone-800 flex items-center justify-center text-xs">
                      1
                    </span>
                    <span>Animasi Komik di Awal (Cover Opening)</span>
                  </h5>
                  {formData.comicOpeningAnimationUrl && (
                    <button
                      type="button"
                      onClick={() => handleChange('comicOpeningAnimationUrl', '')}
                      className="text-xs text-rose-600 hover:text-rose-800 flex items-center gap-1 font-bold cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Hapus URL</span>
                    </button>
                  )}
                </div>
                <p className="text-xs text-stone-600">
                  Tampilkan file GIF / animasi / ilustrasi bergerak di sampul depan undangan (mengganti panel strip komik 4-kotak).
                </p>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Link URL Animasi Komik (.gif / .png / .jpg / .webp)
                  </label>
                  <input
                    type="url"
                    value={formData.comicOpeningAnimationUrl || ''}
                    onChange={(e) => handleChange('comicOpeningAnimationUrl', e.target.value)}
                    placeholder="https://.../animasi-komik-awal.gif atau /cover-animasi.gif"
                    className="w-full bg-[#fcf9f2] border-2 border-stone-400 focus:border-stone-800 rounded-lg px-3 py-2 text-xs font-mono text-stone-900 outline-hidden"
                  />
                </div>
                {formData.comicOpeningAnimationUrl && (
                  <div className="p-2 border border-dashed border-stone-400 rounded-lg bg-stone-50 text-center">
                    <p className="text-[11px] text-stone-500 mb-1.5 font-bold">Pratinjau Animasi Komik Awal:</p>
                    <img
                      src={formData.comicOpeningAnimationUrl}
                      alt="Pratinjau Komik Awal"
                      className="max-h-40 mx-auto object-contain rounded-md border border-stone-300 bg-white"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>

              {/* 2. Animasi Mempelai */}
              <div className="bg-white border-2 border-stone-800 rounded-xl p-4 space-y-4 shadow-xs">
                <h5 className="font-bold text-sm text-stone-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-200 border border-stone-800 flex items-center justify-center text-xs">
                    2
                  </span>
                  <span>Animasi / Bahan Kedua Mempelai (Avatar Karakter)</span>
                </h5>
                <p className="text-xs text-stone-600">
                  Ganti avatar lingkaran ilustrasi dengan GIF animasi bergerak, stiker animasi, atau foto avatar kedua mempelai.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Mempelai Pria */}
                  <div className="border border-stone-300 rounded-lg p-3 bg-stone-50 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-stone-800">Mempelai Pria</span>
                      {formData.groomAnimationUrl && (
                        <button
                          type="button"
                          onClick={() => handleChange('groomAnimationUrl', '')}
                          className="text-[11px] text-rose-600 hover:text-rose-800 font-bold cursor-pointer"
                        >
                          Reset Default
                        </button>
                      )}
                    </div>
                    <input
                      type="url"
                      value={formData.groomAnimationUrl || ''}
                      onChange={(e) => handleChange('groomAnimationUrl', e.target.value)}
                      placeholder="URL GIF / Gambar Mempelai Pria"
                      className="w-full bg-white border border-stone-400 focus:border-stone-800 rounded-lg px-2.5 py-1.5 text-xs font-mono text-stone-900 outline-hidden"
                    />
                    {formData.groomAnimationUrl && (
                      <div className="flex items-center justify-center pt-1">
                        <img
                          src={formData.groomAnimationUrl}
                          alt="Groom Preview"
                          className="w-16 h-16 rounded-full object-cover border-2 border-stone-800 bg-white"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Mempelai Wanita */}
                  <div className="border border-stone-300 rounded-lg p-3 bg-stone-50 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-stone-800">Mempelai Wanita</span>
                      {formData.brideAnimationUrl && (
                        <button
                          type="button"
                          onClick={() => handleChange('brideAnimationUrl', '')}
                          className="text-[11px] text-rose-600 hover:text-rose-800 font-bold cursor-pointer"
                        >
                          Reset Default
                        </button>
                      )}
                    </div>
                    <input
                      type="url"
                      value={formData.brideAnimationUrl || ''}
                      onChange={(e) => handleChange('brideAnimationUrl', e.target.value)}
                      placeholder="URL GIF / Gambar Mempelai Wanita"
                      className="w-full bg-white border border-stone-400 focus:border-stone-800 rounded-lg px-2.5 py-1.5 text-xs font-mono text-stone-900 outline-hidden"
                    />
                    {formData.brideAnimationUrl && (
                      <div className="flex items-center justify-center pt-1">
                        <img
                          src={formData.brideAnimationUrl}
                          alt="Bride Preview"
                          className="w-16 h-16 rounded-full object-cover border-2 border-stone-800 bg-white"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* 3. Animasi Seluruh Undangan (Ambient) */}
              <div className="bg-white border-2 border-stone-800 rounded-xl p-4 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <h5 className="font-bold text-sm text-stone-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-200 border border-stone-800 flex items-center justify-center text-xs">
                      3
                    </span>
                    <span>Animasi Seluruh Undangan (Efek Daun, Bunga, Partikel)</span>
                  </h5>
                </div>
                <p className="text-xs text-stone-600">
                  Efek latar belakang melayang lembut di sepanjang halaman undangan (seperti daun gugur, kelopak bunga, atau kilau emas).
                </p>

                {/* Preset Options */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                  {[
                    { id: 'none', label: '🚫 Nonaktif', desc: 'Tanpa Efek Latar' },
                    { id: 'leaves', label: '🍃 Daun Gugur', desc: 'Daun hijau gugur perlahan' },
                    { id: 'petals', label: '🌸 Kelopak Bunga', desc: 'Kelopak sakura lembut' },
                    { id: 'sparkles', label: '✨ Kilau Emas', desc: 'Bintang berkilau lembut' },
                    { id: 'hearts', label: '❤️ Hati Melayang', desc: 'Ikon hati komik romantis' },
                    { id: 'custom', label: '🌐 URL Kustom', desc: 'Pakai Link Animasi Sendiri' },
                  ].map((preset) => {
                    const isSelected = (formData.globalAmbientType || 'none') === preset.id;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => handleChange('globalAmbientType', preset.id as any)}
                        className={`p-2.5 rounded-lg border-2 text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-amber-100/80 border-stone-800 shadow-xs'
                            : 'bg-stone-50 hover:bg-stone-100 border-stone-300 text-stone-700'
                        }`}
                      >
                        <p className="font-bold text-xs text-stone-900">{preset.label}</p>
                        <p className="text-[10px] text-stone-500 mt-0.5 line-clamp-1">{preset.desc}</p>
                      </button>
                    );
                  })}
                </div>

                {/* Custom URL Input for Global Ambient */}
                {(formData.globalAmbientType === 'custom' || formData.globalAmbientAnimationUrl) && (
                  <div className="pt-2 border-t border-stone-200 space-y-2">
                    <label className="block text-xs font-bold text-stone-700">
                      Link URL Overlay Animasi Seluruh Undangan (GIF Transparan / Video MP4 Loop)
                    </label>
                    <input
                      type="url"
                      value={formData.globalAmbientAnimationUrl || ''}
                      onChange={(e) => handleChange('globalAmbientAnimationUrl', e.target.value)}
                      placeholder="https://.../falling-leaves.gif atau /overlay.gif"
                      className="w-full bg-[#fcf9f2] border-2 border-stone-400 focus:border-stone-800 rounded-lg px-3 py-2 text-xs font-mono text-stone-900 outline-hidden"
                    />
                  </div>
                )}
              </div>

              {/* 4. Animasi Our Story */}
              <div className="bg-white border-2 border-stone-800 rounded-xl p-4 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <h5 className="font-bold text-sm text-stone-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-200 border border-stone-800 flex items-center justify-center text-xs">
                      4
                    </span>
                    <span>Animasi Our Story (Kisah Perjalanan)</span>
                  </h5>
                  {formData.ourStoryAnimationUrl && (
                    <button
                      type="button"
                      onClick={() => handleChange('ourStoryAnimationUrl', '')}
                      className="text-xs text-rose-600 hover:text-rose-800 flex items-center gap-1 font-bold cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Hapus URL</span>
                    </button>
                  )}
                </div>
                <p className="text-xs text-stone-600">
                  Mengganti ilustrasi pasangan duduk di bangku taman dengan animasi GIF atau ilustrasi kustom Anda.
                </p>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Link URL Animasi Our Story (.gif / .png / .jpg / .webp)
                  </label>
                  <input
                    type="url"
                    value={formData.ourStoryAnimationUrl || ''}
                    onChange={(e) => handleChange('ourStoryAnimationUrl', e.target.value)}
                    placeholder="https://.../our-story-animation.gif atau /story.png"
                    className="w-full bg-[#fcf9f2] border-2 border-stone-400 focus:border-stone-800 rounded-lg px-3 py-2 text-xs font-mono text-stone-900 outline-hidden"
                  />
                </div>
                {formData.ourStoryAnimationUrl && (
                  <div className="p-2 border border-dashed border-stone-400 rounded-lg bg-stone-50 text-center">
                    <p className="text-[11px] text-stone-500 mb-1.5 font-bold">Pratinjau Animasi Our Story:</p>
                    <img
                      src={formData.ourStoryAnimationUrl}
                      alt="Pratinjau Our Story"
                      className="max-h-40 mx-auto object-contain rounded-md border border-stone-300 bg-white"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>

              {/* 5. Animasi Detail Acara */}
              <div className="bg-white border-2 border-stone-800 rounded-xl p-4 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <h5 className="font-bold text-sm text-stone-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-200 border border-stone-800 flex items-center justify-center text-xs">
                      5
                    </span>
                    <span>Animasi Detail Acara (Cincin &amp; Ikon Acara)</span>
                  </h5>
                  {formData.eventDetailAnimationUrl && (
                    <button
                      type="button"
                      onClick={() => handleChange('eventDetailAnimationUrl', '')}
                      className="text-xs text-rose-600 hover:text-rose-800 flex items-center gap-1 font-bold cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Hapus URL</span>
                    </button>
                  )}
                </div>
                <p className="text-xs text-stone-600">
                  Menampilkan animasi GIF cincin kawin, lonceng gereja, atau elemen selebrasi tepat di atas kartu Akad &amp; Resepsi.
                </p>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Link URL Animasi Acara (.gif / .png / .jpg / .webp)
                  </label>
                  <input
                    type="url"
                    value={formData.eventDetailAnimationUrl || ''}
                    onChange={(e) => handleChange('eventDetailAnimationUrl', e.target.value)}
                    placeholder="https://.../wedding-rings.gif atau /animasi-acara.gif"
                    className="w-full bg-[#fcf9f2] border-2 border-stone-400 focus:border-stone-800 rounded-lg px-3 py-2 text-xs font-mono text-stone-900 outline-hidden"
                  />
                </div>
                {formData.eventDetailAnimationUrl && (
                  <div className="p-2 border border-dashed border-stone-400 rounded-lg bg-stone-50 text-center">
                    <p className="text-[11px] text-stone-500 mb-1.5 font-bold">Pratinjau Animasi Detail Acara:</p>
                    <img
                      src={formData.eventDetailAnimationUrl}
                      alt="Pratinjau Detail Acara"
                      className="max-h-36 mx-auto object-contain rounded-md border border-stone-300 bg-white"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>

              {/* 6. Animasi Galeri Foto */}
              <div className="bg-white border-2 border-stone-800 rounded-xl p-4 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <h5 className="font-bold text-sm text-stone-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-200 border border-stone-800 flex items-center justify-center text-xs">
                      6
                    </span>
                    <span>Animasi Galeri Foto</span>
                  </h5>
                  {formData.galleryAnimationUrl && (
                    <button
                      type="button"
                      onClick={() => handleChange('galleryAnimationUrl', '')}
                      className="text-xs text-rose-600 hover:text-rose-800 flex items-center gap-1 font-bold cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Hapus URL</span>
                    </button>
                  )}
                </div>
                <p className="text-xs text-stone-600">
                  Tampilkan animasi banner bergerak atau GIF kompilasi foto di bagian Galeri Foto Polaroid.
                </p>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Link URL Animasi Galeri (.gif / .png / .jpg / .webp)
                  </label>
                  <input
                    type="url"
                    value={formData.galleryAnimationUrl || ''}
                    onChange={(e) => handleChange('galleryAnimationUrl', e.target.value)}
                    placeholder="https://.../animasi-galeri.gif atau /galeri-banner.gif"
                    className="w-full bg-[#fcf9f2] border-2 border-stone-400 focus:border-stone-800 rounded-lg px-3 py-2 text-xs font-mono text-stone-900 outline-hidden"
                  />
                </div>
                {formData.galleryAnimationUrl && (
                  <div className="p-2 border border-dashed border-stone-400 rounded-lg bg-stone-50 text-center">
                    <p className="text-[11px] text-stone-500 mb-1.5 font-bold">Pratinjau Animasi Galeri Foto:</p>
                    <img
                      src={formData.galleryAnimationUrl}
                      alt="Pratinjau Galeri Foto"
                      className="max-h-40 mx-auto object-contain rounded-md border border-stone-300 bg-white"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Petunjuk Penggunaan URL & Bahan */}
              <div className="bg-amber-50/70 border border-amber-300 rounded-lg p-3 text-[11px] text-stone-700 space-y-1.5 leading-relaxed">
                <p className="font-bold text-stone-900 flex items-center gap-1">
                  <span>💡</span>
                  <span>Panduan Memasukkan Bahan &amp; Animasi:</span>
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    <strong>Format yang Didukung:</strong> File GIF animasi (<code className="bg-amber-100 px-1 py-0.5 rounded font-mono">.gif</code>), gambar transparan (<code className="bg-amber-100 px-1 py-0.5 rounded font-mono">.png</code>), stiker webp, atau foto (<code className="bg-amber-100 px-1 py-0.5 rounded font-mono">.jpg</code>).
                  </li>
                  <li>
                    <strong>File Lokal di Komputer:</strong> Masukkan file gambar/GIF ke dalam folder <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">public/</code> proyek, lalu ketik link singkatnya (contoh: <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">/animasi.gif</code>).
                  </li>
                  <li>
                    <strong>Hosting Eksternal (Imgur/Giphy/Cloud):</strong> Anda dapat langsung menyalin direct image link (yang berakhiran .gif/.png) dan menempelkannya ke kotak URL.
                  </li>
                  <li>
                    <strong>Ingin Bantuan Memasangkan File?</strong> Anda juga bisa mengirimkan link atau file kepada saya, dan saya akan pasangkan secara otomatis!
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 7: KIRIM KE TAMU (GUEST MODE & LINKS) */}
          {activeTab === 'tamu' && (
            <div className="space-y-4">
              {/* Highlight Banner */}
              <div className="bg-emerald-50 border-2 border-emerald-600/70 rounded-xl p-4 text-emerald-950">
                <h4 className="font-bold text-sm flex items-center gap-1.5 mb-1 text-emerald-900">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>100% Bersih Khusus Tamu (Tanpa Menu/Tombol Edit)</span>
                </h4>
                <p className="text-xs leading-relaxed text-emerald-800">
                  Tamu yang membuka link undangan Anda <strong>tidak akan melihat menu konfigurasi atau tombol edit apa pun</strong>. Tampilan untuk tamu benar-benar murni, bersih, dan elegan dengan nama mereka tertulis indah di kartu sampul depan.
                </p>
                <div className="mt-2 pt-2 border-t border-emerald-200 text-[11px] text-emerald-800 flex items-center gap-1.5">
                  <span className="font-bold">🔑 Info Mempelai/Admin:</span>
                  <span>
                    Untuk membuka kembali toolbar edit di kemudian hari, cukup tambahkan <code className="bg-emerald-100 px-1 py-0.5 rounded font-mono font-bold text-emerald-900">?admin=true</code> di ujung link web Anda.
                  </span>
                </div>
              </div>

              {/* Sub-Tabs: Massal vs Satuan */}
              <div className="flex bg-stone-200/80 p-1 rounded-xl gap-1 border border-stone-300">
                <button
                  type="button"
                  onClick={() => setGuestSubTab('bulk')}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-hand font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    guestSubTab === 'bulk'
                      ? 'bg-stone-900 text-amber-200 shadow-xs'
                      : 'text-stone-700 hover:text-stone-900 hover:bg-stone-300/50'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>📋 Buat Link Banyak / Massal Sekaligus ({getParsedNames().length} Tamu)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setGuestSubTab('single')}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-hand font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    guestSubTab === 'single'
                      ? 'bg-stone-900 text-amber-200 shadow-xs'
                      : 'text-stone-700 hover:text-stone-900 hover:bg-stone-300/50'
                  }`}
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>👤 Buat 1 Link Satuan</span>
                </button>
              </div>

              {/* MODE 1: BULK GUEST GENERATOR (INPUT BANYAK SEKALIGUS) */}
              {guestSubTab === 'bulk' && (
                <div className="space-y-3.5">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-bold text-stone-800 flex items-center gap-1">
                        <span>Daftar Nama Tamu Undangan</span>
                        <span className="text-[11px] font-normal text-stone-500">(1 nama per baris)</span>
                      </label>
                      <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                        {getParsedNames().length} Tamu Terdeteksi
                      </span>
                    </div>
                    <textarea
                      rows={5}
                      value={bulkNamesText}
                      onChange={(e) => setBulkNamesText(e.target.value)}
                      placeholder="Tempelkan daftar nama tamu di sini, contoh:&#10;Bpk. Suwandi & Keluarga&#10;Ibu Siti Liumi&#10;dr. Hendra Pratama&#10;Dimas & Partner&#10;Keluarga Besar Bpk. Sardi&#10;Teman-teman Ns. Febri&#10;Rekan Kerja Mas Haris"
                      className="w-full bg-white border-2 border-stone-400 focus:border-stone-800 rounded-xl p-3 text-xs sm:text-sm font-sans font-medium text-stone-900 outline-hidden leading-relaxed resize-y"
                    />
                    <p className="text-[11px] text-stone-500 mt-1">
                      💡 <em>Tips: Anda bisa langsung copy satu kolom nama dari Excel/Google Sheets atau pesan WhatsApp, lalu paste di sini! Simbol nomor (1., 2., -) otomatis dibersihkan.</em>
                    </p>
                  </div>

                  {/* Bulk Actions Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-100 border border-stone-300 rounded-xl p-2.5">
                    <span className="text-xs font-bold text-stone-800 flex items-center gap-1">
                      <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
                      <span>Hasil Link Personal Tamu:</span>
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleCopyAllBulk}
                        className="px-2.5 py-1.5 bg-stone-800 hover:bg-stone-900 text-white rounded-lg text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                        title="Salin semua nama dan link (bisa langsung di-paste ke Excel / Google Sheets)"
                      >
                        {copiedAllBulk ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Semua Tersalin!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Salin Semua (Untuk Excel)</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={handleDownloadCsv}
                        className="px-2.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                        title="Download file CSV berisi nama dan link semua tamu"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download CSV</span>
                      </button>
                    </div>
                  </div>

                  {/* Bulk Generated List / Table */}
                  <div className="border border-stone-300 rounded-xl bg-white max-h-72 overflow-y-auto divide-y divide-stone-200">
                    {getParsedNames().length === 0 ? (
                      <div className="p-6 text-center text-xs text-stone-500">
                        Silakan masukkan atau tempelkan nama tamu pada kotak di atas.
                      </div>
                    ) : (
                      getParsedNames().map((name, index) => {
                        const origin = typeof window !== 'undefined' ? window.location.origin : '';
                        const guestUrl = `${origin}?to=${encodeURIComponent(name)}`;
                        const isCopied = copiedBulkRowIndex === index;

                        return (
                          <div
                            key={index}
                            className="p-2.5 sm:p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-amber-50/50 transition-colors"
                          >
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-1.5">
                                <span className="w-5 h-5 rounded-full bg-stone-200 text-stone-700 text-[10px] font-bold flex items-center justify-center shrink-0">
                                  {index + 1}
                                </span>
                                <h5 className="font-hand font-extrabold text-stone-900 text-sm truncate">
                                  {name}
                                </h5>
                              </div>
                              <p className="text-[11px] text-stone-500 font-mono truncate pl-6">
                                {guestUrl}
                              </p>
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0 pl-6 sm:pl-0">
                              <button
                                type="button"
                                onClick={() => {
                                  navigator.clipboard.writeText(guestUrl);
                                  setCopiedBulkRowIndex(index);
                                  setTimeout(() => setCopiedBulkRowIndex(null), 2000);
                                }}
                                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer border ${
                                  isCopied
                                    ? 'bg-emerald-600 text-white border-emerald-700'
                                    : 'bg-stone-100 hover:bg-stone-200 text-stone-800 border-stone-300'
                                }`}
                                title="Salin link tamu ini"
                              >
                                {isCopied ? (
                                  <>
                                    <Check className="w-3 h-3" />
                                    <span>Tersalin!</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3" />
                                    <span>Salin Link</span>
                                  </>
                                )}
                              </button>

                              <a
                                href={`https://wa.me/?text=${encodeURIComponent(getWaText(name))}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                                title="Kirim undangan langsung via WhatsApp"
                              >
                                <Send className="w-3 h-3" />
                                <span>Kirim WA</span>
                              </a>

                              {onPreviewGuestMode && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    onSave(formData);
                                    onPreviewGuestMode(name);
                                    onClose();
                                  }}
                                  className="p-1 rounded-lg hover:bg-stone-200 text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
                                  title={`Simulasi tampilan tamu untuk: ${name}`}
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              )}

              {/* MODE 2: SINGLE GUEST LINK (SATUAN) */}
              {guestSubTab === 'single' && (
                <div className="space-y-4">
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
                      {getWaText(sampleGuestName || 'Bapak/Ibu/Saudara/i')}
                    </div>

                    <div className="flex flex-wrap gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          const msg = getWaText(sampleGuestName || 'Bapak/Ibu/Saudara/i');
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
                        href={`https://wa.me/?text=${encodeURIComponent(getWaText(sampleGuestName || 'Bapak/Ibu/Saudara/i'))}`}
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
