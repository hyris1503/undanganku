import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Send,
  Copy,
  Check,
  Building2,
  Volume2,
  VolumeX,
  Instagram,
  Heart,
} from 'lucide-react';
import {
  FloralSprig,
  HeartFlourish,
  SectionTitle,
  CoupleStoryIllustration,
  GroomAvatar,
  BrideAvatar,
  MapIllustration,
  PolaroidGallery,
} from './ComicDoodles';
import { InvitationData } from '../types/invitation';

interface Wish {
  id: string;
  name: string;
  message: string;
  date: string;
}

interface InvitationContentProps {
  onBackToCover: () => void;
  data: InvitationData;
}

export function InvitationContent({ onBackToCover, data }: InvitationContentProps) {
  // RSVP Form State
  const [rsvpName, setRsvpName] = useState('');
  const [attendance, setAttendance] = useState<'hadir' | 'tidak'>('hadir');
  const [guestCount, setGuestCount] = useState(1);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  // Ucapan / Wishes State
  const [wishes, setWishes] = useState<Wish[]>([
    {
      id: '1',
      name: 'Rima',
      message: 'Selamat yaa Andi & Sinta! Semoga selalu bahagia bersama ❤️',
      date: '2 jam yang lalu',
    },
    {
      id: '2',
      name: 'Dika',
      message: 'Barakallah, semoga menjadi keluarga sakinah, mawaddah, warahmah. ❤️',
      date: '4 jam yang lalu',
    },
    {
      id: '3',
      name: 'Sarah',
      message: 'Happy wedding! Semoga lancar sampai hari H. ❤️',
      date: 'Kemarin',
    },
  ]);
  const [newWishName, setNewWishName] = useState('');
  const [newWishMessage, setNewWishMessage] = useState('');
  const [copiedBank, setCopiedBank] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName.trim()) return;
    setRsvpSubmitted(true);
    setTimeout(() => {
      setRsvpSubmitted(false);
      setRsvpName('');
    }, 4000);
  };

  const handleAddWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWishMessage.trim()) return;
    const author = newWishName.trim() || 'Sahabat Bahagia';
    const newEntry: Wish = {
      id: Date.now().toString(),
      name: author,
      message: newWishMessage.trim(),
      date: 'Baru saja',
    };
    setWishes([newEntry, ...wishes]);
    setNewWishMessage('');
    setNewWishName('');
  };

  const copyAccountNumber = () => {
    navigator.clipboard.writeText(data.bankAccountNumber.replace(/\s+/g, ''));
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 3000);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <article id="invitation-article" className="relative max-w-xl mx-auto w-full bg-[#f8f5ee] border-x-2 border-stone-800 shadow-xl overflow-hidden min-h-screen pb-28">
      {/* Decorative Botanical Borders on Left and Right (matching Photo 2) */}
      <div className="absolute left-1 top-24 pointer-events-none hidden sm:block opacity-85 z-0">
        <FloralSprig className="w-8 h-32" />
      </div>
      <div className="absolute right-1 top-24 pointer-events-none hidden sm:block opacity-85 z-0">
        <FloralSprig className="w-8 h-32" flipped />
      </div>
      <div className="absolute left-1 top-[420px] pointer-events-none hidden sm:block opacity-85 z-0">
        <FloralSprig className="w-8 h-32" />
      </div>
      <div className="absolute right-1 top-[420px] pointer-events-none hidden sm:block opacity-85 z-0">
        <FloralSprig className="w-8 h-32" flipped />
      </div>
      <div className="absolute left-1 top-[950px] pointer-events-none hidden sm:block opacity-85 z-0">
        <FloralSprig className="w-8 h-32" />
      </div>
      <div className="absolute right-1 top-[950px] pointer-events-none hidden sm:block opacity-85 z-0">
        <FloralSprig className="w-8 h-32" flipped />
      </div>
      <div className="absolute left-1 top-[1500px] pointer-events-none hidden sm:block opacity-85 z-0">
        <FloralSprig className="w-8 h-32" />
      </div>
      <div className="absolute right-1 top-[1500px] pointer-events-none hidden sm:block opacity-85 z-0">
        <FloralSprig className="w-8 h-32" flipped />
      </div>

      {/* Floating Audio / Ambient Music Button */}
      <div className="fixed top-4 right-4 z-40">
        <button
          onClick={() => setIsPlayingMusic(!isPlayingMusic)}
          aria-label="Putar Musik"
          className="w-10 h-10 rounded-full bg-white/90 border-2 border-stone-800 shadow-md flex items-center justify-center text-stone-800 hover:bg-stone-100 transition-transform active:scale-95 cursor-pointer backdrop-blur-xs"
        >
          {isPlayingMusic ? (
            <Volume2 className="w-5 h-5 text-emerald-700 animate-pulse" />
          ) : (
            <VolumeX className="w-5 h-5 text-stone-600" />
          )}
        </button>
      </div>

      {/* Main Content Flow */}
      <div className="relative z-10 px-4 sm:px-8 py-8 md:py-12">
        {/* Header Element (Photo 2 Top) */}
        <header id="wedding-header" className="text-center pt-2 pb-6">
          <p className="font-hand tracking-widest text-xs sm:text-sm text-stone-700 font-bold uppercase">
            THE WEDDING OF
          </p>

          <div className="relative inline-block my-2">
            <span className="text-stone-600 font-mono text-xl font-bold select-none mr-2">
              `\ -
            </span>
            <h1 className="inline text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wide font-hand text-stone-900 uppercase">
              {data.groomName} &amp; {data.brideName}
            </h1>
            <span className="text-stone-600 font-mono text-xl font-bold select-none ml-2">
              - /`
            </span>
          </div>

          <HeartFlourish />

          <p className="font-hand font-bold text-lg text-stone-800 tracking-widest mt-1">
            {data.weddingDate}
          </p>

          {/* Ayat / Quote Box (as shown in Photo 2) */}
          <div className="mt-6 bg-[#f4ece1] rounded-2xl p-4 sm:p-5 border-2 border-stone-800/80 shadow-xs max-w-md mx-auto text-center">
            <p className="font-hand text-sm sm:text-base text-stone-800 italic leading-relaxed">
              &ldquo;{data.quoteText}&rdquo;
            </p>
            <p className="font-hand text-xs sm:text-sm font-bold text-stone-700 mt-2">
              ({data.quoteSource})
            </p>
          </div>

          <div className="mt-3">
            <HeartFlourish />
          </div>
        </header>

        {/* SECTION: DETAIL MEMPELAI */}
        <section id="section-mempelai" className="my-8 scroll-mt-6">
          <SectionTitle title="KEDUA MEMPELAI" subtitle="Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan" />

          <p className="font-hand text-xs sm:text-sm text-stone-600 text-center max-w-sm mx-auto mb-6 px-2">
            Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan pernikahan putra-putri kami:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 max-w-lg mx-auto">
            {/* Card Mempelai Pria */}
            <div className="bg-[#fefdfb] border-2 border-stone-800 rounded-2xl p-5 shadow-xs text-center flex flex-col items-center relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#2d3136] text-amber-200 border border-stone-800 font-hand font-bold text-[11px] px-3 py-0.5 rounded-full shadow-xs">
                Mempelai Pria
              </span>
              <div className="mt-2">
                <GroomAvatar />
              </div>
              <h3 className="font-hand font-extrabold text-xl sm:text-2xl text-stone-900 mt-3">
                {data.groomFullName}
              </h3>
              <p className="font-hand text-xs sm:text-sm text-stone-600 mt-1 max-w-[220px] leading-relaxed">
                {data.groomParents}
              </p>
              {data.groomInstagram && (
                <a
                  href={`https://instagram.com/${data.groomInstagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3.5 inline-flex items-center gap-1.5 text-xs font-hand font-bold text-stone-700 hover:text-stone-950 bg-stone-100 hover:bg-stone-200 border border-stone-400 px-3 py-1 rounded-full transition-colors cursor-pointer"
                >
                  <Instagram className="w-3.5 h-3.5 text-pink-600" />
                  <span>@{data.groomInstagram.replace('@', '')}</span>
                </a>
              )}
            </div>

            {/* Card Mempelai Wanita */}
            <div className="bg-[#fefdfb] border-2 border-stone-800 rounded-2xl p-5 shadow-xs text-center flex flex-col items-center relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#2d3136] text-amber-200 border border-stone-800 font-hand font-bold text-[11px] px-3 py-0.5 rounded-full shadow-xs">
                Mempelai Wanita
              </span>
              <div className="mt-2">
                <BrideAvatar />
              </div>
              <h3 className="font-hand font-extrabold text-xl sm:text-2xl text-stone-900 mt-3">
                {data.brideFullName}
              </h3>
              <p className="font-hand text-xs sm:text-sm text-stone-600 mt-1 max-w-[220px] leading-relaxed">
                {data.brideParents}
              </p>
              {data.brideInstagram && (
                <a
                  href={`https://instagram.com/${data.brideInstagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3.5 inline-flex items-center gap-1.5 text-xs font-hand font-bold text-stone-700 hover:text-stone-950 bg-stone-100 hover:bg-stone-200 border border-stone-400 px-3 py-1 rounded-full transition-colors cursor-pointer"
                >
                  <Instagram className="w-3.5 h-3.5 text-pink-600" />
                  <span>@{data.brideInstagram.replace('@', '')}</span>
                </a>
              )}
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 my-6">
            <span className="h-px w-12 bg-stone-400"></span>
            <span className="font-hand font-bold text-stone-500 text-sm">&amp;</span>
            <span className="h-px w-12 bg-stone-400"></span>
          </div>
        </section>

        {/* SECTION: OUR STORY */}
        <section id="section-story" className="my-8 scroll-mt-6">
          <SectionTitle title="OUR STORY" subtitle="Kisah sederhana kami" />

          <CoupleStoryIllustration />

          <div className="text-center mt-5 max-w-md mx-auto bg-[#fefdfb] border-2 border-stone-800 rounded-xl p-4 shadow-xs">
            <h3 className="font-hand font-bold text-xl text-stone-900 mb-1">
              {data.groomName} &amp; {data.brideName}
            </h3>
            <p className="font-hand text-sm sm:text-base text-stone-700 leading-relaxed text-justify sm:text-center">
              {data.ourStory}
            </p>
            <div className="flex items-center justify-center gap-2 mt-3">
              <span className="h-px w-8 bg-stone-400"></span>
              <HeartFlourish />
              <span className="h-px w-8 bg-stone-400"></span>
            </div>
          </div>
        </section>

        {/* SECTION: DETAIL ACARA */}
        <section id="section-acara" className="my-10 scroll-mt-6">
          <SectionTitle title="DETAIL ACARA" subtitle="Mohon hadir di hari bahagia kami" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
            {/* Card 1: Akad Nikah */}
            <div className="bg-[#fefdfb] border-2 border-stone-800 rounded-xl p-4 shadow-xs flex flex-col justify-between">
              <div>
                {/* Rings Icon */}
                <div className="flex justify-center mb-2">
                  <div className="relative w-10 h-7">
                    <div className="absolute left-0 w-6 h-6 rounded-full border-2 border-amber-600/90 bg-amber-100/40"></div>
                    <div className="absolute right-0 w-6 h-6 rounded-full border-2 border-amber-600/90 bg-amber-100/40"></div>
                  </div>
                </div>
                <h3 className="font-hand font-bold text-lg text-center text-stone-900 mb-3">
                  Akad Nikah
                </h3>

                <div className="space-y-2 text-xs sm:text-sm font-hand">
                  <div className="flex items-start gap-2 text-stone-700">
                    <Calendar className="w-4 h-4 shrink-0 mt-0.5 text-stone-800" />
                    <div>
                      <p className="font-bold text-stone-900">Hari, Tanggal</p>
                      <p>{data.weddingDate}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 text-stone-700">
                    <Clock className="w-4 h-4 shrink-0 mt-0.5 text-stone-800" />
                    <div>
                      <p className="font-bold text-stone-900">Waktu</p>
                      <p>{data.akadTime}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 text-stone-700">
                    <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-stone-800" />
                    <div>
                      <p className="font-bold text-stone-900">Tempat</p>
                      <p>{data.venueName}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Resepsi */}
            <div className="bg-[#fefdfb] border-2 border-stone-800 rounded-xl p-4 shadow-xs flex flex-col justify-between">
              <div>
                {/* Clinking Glasses Icon */}
                <div className="flex justify-center mb-2">
                  <svg width="32" height="28" viewBox="0 0 32 28" fill="none">
                    {/* Glass 1 tilted right */}
                    <g transform="rotate(15 12 12)">
                      <path d="M7 4 L17 4 L14 13 C13.5 15 10.5 15 10 13 Z" fill="#fff9e6" stroke="#222" strokeWidth="1.8" />
                      <line x1="12" y1="14" x2="12" y2="22" stroke="#222" strokeWidth="1.8" />
                      <line x1="8" y1="22" x2="16" y2="22" stroke="#222" strokeWidth="1.8" strokeLinecap="round" />
                    </g>
                    {/* Glass 2 tilted left */}
                    <g transform="rotate(-15 20 12)">
                      <path d="M15 4 L25 4 L22 13 C21.5 15 18.5 15 18 13 Z" fill="#fff9e6" stroke="#222" strokeWidth="1.8" />
                      <line x1="20" y1="14" x2="20" y2="22" stroke="#222" strokeWidth="1.8" />
                      <line x1="16" y1="22" x2="24" y2="22" stroke="#222" strokeWidth="1.8" strokeLinecap="round" />
                    </g>
                    {/* Clink sparkles */}
                    <circle cx="16" cy="6" r="1.5" fill="#d97a68" />
                  </svg>
                </div>
                <h3 className="font-hand font-bold text-lg text-center text-stone-900 mb-3">
                  Resepsi
                </h3>

                <div className="space-y-2 text-xs sm:text-sm font-hand">
                  <div className="flex items-start gap-2 text-stone-700">
                    <Calendar className="w-4 h-4 shrink-0 mt-0.5 text-stone-800" />
                    <div>
                      <p className="font-bold text-stone-900">Hari, Tanggal</p>
                      <p>{data.weddingDate}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 text-stone-700">
                    <Clock className="w-4 h-4 shrink-0 mt-0.5 text-stone-800" />
                    <div>
                      <p className="font-bold text-stone-900">Waktu</p>
                      <p>{data.resepsiTime}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 text-stone-700">
                    <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-stone-800" />
                    <div>
                      <p className="font-bold text-stone-900">Tempat</p>
                      <p>{data.venueName}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: LOKASI */}
        <section id="section-lokasi" className="my-10 scroll-mt-6">
          <SectionTitle title="LOKASI" subtitle="Lokasi acara pernikahan" />

          <div className="max-w-md mx-auto">
            <MapIllustration />

            <div className="bg-[#fefdfb] border-2 border-stone-800 rounded-xl p-4 mt-3 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <div>
                <h3 className="font-hand font-bold text-base sm:text-lg text-stone-900">
                  {data.venueName}
                </h3>
                <p className="font-hand text-xs sm:text-sm text-stone-600">
                  {data.venueAddress}
                </p>
              </div>

              <a
                href={data.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#2d3136] hover:bg-stone-900 active:scale-95 text-stone-100 font-hand font-bold text-xs sm:text-sm px-4 py-2 rounded-full border border-stone-800 shadow-xs transition-all cursor-pointer whitespace-nowrap"
              >
                <MapPin className="w-4 h-4 text-amber-200" />
                <span>Buka Google Maps</span>
              </a>
            </div>
          </div>
        </section>

        {/* SECTION: GALERI FOTO */}
        <section id="section-galeri" className="my-10 scroll-mt-6">
          <SectionTitle title="GALERI FOTO" subtitle="Momen-momen indah kami" />
          <PolaroidGallery onSelect={(idx) => setSelectedPhoto(idx)} />
        </section>

        {/* SECTION: KONFIRMASI KEHADIRAN (RSVP) */}
        <section id="section-rsvp" className="my-10 scroll-mt-6">
          <SectionTitle title="KONFIRMASI KEHADIRAN" subtitle="Mohon konfirmasi kehadiran Anda" />

          <div className="bg-[#fefdfb] border-2 border-stone-800 rounded-xl p-5 shadow-xs max-w-md mx-auto">
            {rsvpSubmitted ? (
              <div className="text-center py-6">
                <div className="w-12 h-12 rounded-full bg-emerald-100 border-2 border-emerald-600 flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6 text-emerald-700" />
                </div>
                <h3 className="font-hand font-bold text-lg text-stone-900">
                  Terima Kasih, {rsvpName}!
                </h3>
                <p className="font-hand text-sm text-stone-600 mt-1">
                  Konfirmasi kehadiran Anda telah berhasil tersimpan.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRsvpSubmit} className="space-y-4 font-hand">
                {/* Nama */}
                <div>
                  <label htmlFor="rsvp-name" className="block text-sm font-bold text-stone-800 mb-1">
                    Nama
                  </label>
                  <input
                    id="rsvp-name"
                    type="text"
                    required
                    value={rsvpName}
                    onChange={(e) => setRsvpName(e.target.value)}
                    placeholder="Contoh: Andi Pratama"
                    className="w-full bg-[#fcf9f2] border-2 border-stone-400 focus:border-stone-800 rounded-lg px-3 py-2 text-sm text-stone-900 placeholder:text-stone-400 outline-hidden transition-colors"
                  />
                </div>

                {/* Kehadiran */}
                <div>
                  <label className="block text-sm font-bold text-stone-800 mb-1.5">
                    Apakah Anda bisa hadir?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setAttendance('hadir')}
                      className={`py-2 px-3 rounded-lg border-2 font-bold text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                        attendance === 'hadir'
                          ? 'bg-[#80766a] text-white border-stone-800'
                          : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
                      }`}
                    >
                      {attendance === 'hadir' && <Check className="w-4 h-4" />}
                      <span>Bisa hadir</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setAttendance('tidak')}
                      className={`py-2 px-3 rounded-lg border-2 font-bold text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                        attendance === 'tidak'
                          ? 'bg-[#80766a] text-white border-stone-800'
                          : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
                      }`}
                    >
                      {attendance === 'tidak' && <Check className="w-4 h-4" />}
                      <span>Tidak bisa</span>
                    </button>
                  </div>
                </div>

                {/* Jumlah Tamu */}
                {attendance === 'hadir' && (
                  <div>
                    <label className="block text-sm font-bold text-stone-800 mb-1">
                      Jumlah Tamu
                    </label>
                    <div className="flex items-center border-2 border-stone-400 rounded-lg bg-[#fcf9f2] overflow-hidden w-36">
                      <button
                        type="button"
                        onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                        className="px-3 py-1.5 text-stone-700 hover:bg-stone-200 active:bg-stone-300 font-bold text-base transition-colors"
                      >
                        -
                      </button>
                      <span className="flex-1 text-center font-bold text-stone-900 text-sm">
                        {guestCount}
                      </span>
                      <button
                        type="button"
                        onClick={() => setGuestCount(guestCount + 1)}
                        className="px-3 py-1.5 text-stone-700 hover:bg-stone-200 active:bg-stone-300 font-bold text-base transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}

                {/* Submit button */}
                <div className="pt-1">
                  <button
                    type="submit"
                    className="w-full bg-[#2d3136] hover:bg-stone-900 active:scale-98 text-white font-bold text-sm py-2.5 px-4 rounded-xl border-2 border-stone-800 flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Kirim Konfirmasi</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>

        {/* SECTION: UCAPAN & DOA */}
        <section id="section-ucapan" className="my-10 scroll-mt-6">
          <SectionTitle title="UCAPAN & DOA" subtitle="Tulis doa dan harapan terbaik untuk kami" />

          <div className="max-w-md mx-auto space-y-4">
            {/* Input Form as shown in Photo 2 */}
            <form onSubmit={handleAddWish} className="bg-[#fefdfb] border-2 border-stone-800 rounded-xl p-3 shadow-xs flex flex-col gap-2">
              <input
                type="text"
                value={newWishName}
                onChange={(e) => setNewWishName(e.target.value)}
                placeholder="Nama Anda (opsional)"
                className="w-full bg-[#fcf9f2] border border-stone-300 rounded-lg px-3 py-1.5 text-xs font-hand text-stone-900 placeholder:text-stone-400 outline-hidden"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  value={newWishMessage}
                  onChange={(e) => setNewWishMessage(e.target.value)}
                  placeholder="Tulis pesan Anda di sini..."
                  className="flex-1 bg-[#fcf9f2] border border-stone-300 rounded-lg px-3 py-2 text-xs sm:text-sm font-hand text-stone-900 placeholder:text-stone-400 outline-hidden"
                />
                <button
                  type="submit"
                  className="bg-[#2d3136] hover:bg-stone-900 text-white px-4 py-2 rounded-lg font-hand font-bold text-xs flex items-center gap-1.5 border border-stone-800 transition-colors cursor-pointer shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirim</span>
                </button>
              </div>
            </form>

            {/* List of Greetings */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {wishes.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#fefdfb] border-2 border-stone-800 rounded-xl p-3 shadow-xs flex flex-col justify-between"
                >
                  <p className="font-hand text-xs text-stone-800 leading-snug">
                    {item.message}
                  </p>
                  <p className="font-hand font-bold text-right text-xs text-stone-600 mt-2">
                    - {item.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION: KADO PERNIKAHAN */}
        <section id="section-gift" className="my-10 scroll-mt-6">
          <SectionTitle title="KADO PERNIKAHAN" subtitle="Bagi yang ingin memberikan hadiah, dapat melalui:" />

          <div className="bg-[#fefdfb] border-2 border-stone-800 rounded-xl p-4 shadow-xs max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-50 border-2 border-stone-800 flex items-center justify-center shrink-0">
                  <Building2 className="w-6 h-6 text-stone-800" />
                </div>
                <div>
                  <p className="font-hand text-xs text-stone-600 font-bold">Transfer Bank</p>
                  <h3 className="font-hand font-extrabold text-base text-stone-900">
                    {data.bankName}
                  </h3>
                </div>
              </div>

              <div className="text-center sm:text-right w-full sm:w-auto">
                <p className="font-hand text-xs text-stone-500">No. Rekening</p>
                <div className="flex items-center justify-center sm:justify-end gap-2 mt-0.5">
                  <span className="font-mono font-bold text-sm sm:text-base text-stone-900 tracking-wider">
                    {data.bankAccountNumber}
                  </span>
                  <button
                    onClick={copyAccountNumber}
                    className="inline-flex items-center gap-1 bg-[#f4ece1] hover:bg-stone-200 active:scale-95 text-stone-800 font-hand font-bold text-xs px-2.5 py-1 rounded-md border border-stone-600 transition-colors cursor-pointer"
                  >
                    {copiedBank ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-700" />
                        <span className="text-emerald-800">Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-stone-700" />
                        <span>Salin</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="font-hand text-xs text-stone-600 mt-1">
                  a.n. {data.bankAccountHolder}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER & CLOSING NOTE */}
        <footer id="invitation-footer" className="text-center pt-8 pb-4">
          <p className="font-hand text-xs sm:text-sm text-stone-600 max-w-xs mx-auto leading-relaxed">
            Terima kasih atas doa dan restu yang telah diberikan
          </p>
          <h3 className="font-hand font-extrabold text-lg text-stone-900 mt-1">
            {data.groomName} &amp; {data.brideName}
          </h3>
          <div className="mt-1">
            <HeartFlourish />
          </div>

          <div className="mt-4">
            <button
              onClick={onBackToCover}
              className="font-hand text-xs text-stone-500 hover:text-stone-800 underline cursor-pointer"
            >
              Lihat Sampul Komik (Cover)
            </button>
          </div>
        </footer>
      </div>

      {/* FIXED BOTTOM NAVIGATION BAR (as shown in Photo 2) */}
      <nav
        id="wedding-bottom-nav"
        className="fixed bottom-0 left-1/2 -translate-x-1/2 max-w-xl w-full bg-[#faf6ee]/95 backdrop-blur-md border-t-2 border-stone-800 py-2.5 px-6 flex justify-around items-center z-40 shadow-lg"
      >
        <button
          onClick={() => {
            onBackToCover();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex flex-col items-center text-stone-700 hover:text-stone-950 transition-colors cursor-pointer"
        >
          <span className="text-base">🏠</span>
          <span className="font-hand font-bold text-[11px] mt-0.5">Home</span>
        </button>

        <button
          onClick={() => scrollToSection('section-mempelai')}
          className="flex flex-col items-center text-stone-700 hover:text-stone-950 transition-colors cursor-pointer"
        >
          <span className="text-base">💑</span>
          <span className="font-hand font-bold text-[11px] mt-0.5">Mempelai</span>
        </button>

        <button
          onClick={() => scrollToSection('section-acara')}
          className="flex flex-col items-center text-stone-700 hover:text-stone-950 transition-colors cursor-pointer"
        >
          <span className="text-base">📅</span>
          <span className="font-hand font-bold text-[11px] mt-0.5">Acara</span>
        </button>

        <button
          onClick={() => scrollToSection('section-lokasi')}
          className="flex flex-col items-center text-stone-700 hover:text-stone-950 transition-colors cursor-pointer"
        >
          <span className="text-base">📍</span>
          <span className="font-hand font-bold text-[11px] mt-0.5">Lokasi</span>
        </button>

        <button
          onClick={() => scrollToSection('section-rsvp')}
          className="flex flex-col items-center text-stone-700 hover:text-stone-950 transition-colors cursor-pointer"
        >
          <span className="text-base">✉️</span>
          <span className="font-hand font-bold text-[11px] mt-0.5">RSVP</span>
        </button>

        <button
          onClick={() => scrollToSection('section-gift')}
          className="flex flex-col items-center text-stone-700 hover:text-stone-950 transition-colors cursor-pointer"
        >
          <span className="text-base">🎁</span>
          <span className="font-hand font-bold text-[11px] mt-0.5">Gift</span>
        </button>
      </nav>

      {/* Photo Lightbox Modal */}
      {selectedPhoto !== null && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="bg-white p-4 rounded-xl border-2 border-stone-800 max-w-sm w-full shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-square bg-stone-100 rounded-lg overflow-hidden border border-stone-300">
              <PolaroidGallery />
            </div>
            <div className="text-center mt-3">
              <p className="font-hand font-bold text-stone-900 text-sm">
                Galeri Foto Andi &amp; Sinta
              </p>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="mt-3 bg-stone-800 text-white font-hand font-bold text-xs px-4 py-1.5 rounded-full"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
