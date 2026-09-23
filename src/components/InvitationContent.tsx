import React, { useState, useEffect } from 'react';
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
  ExternalLink,
  MessageCircle,
  Package,
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
import { ScrollReveal } from './ScrollReveal';
import { InvitationData } from '../types/invitation';
import { weddingAudio } from '../utils/audio';

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
      name: 'Rima & Keluarga',
      message: 'Selamat yaa Haris & Febri! Semoga selalu sakinah, mawaddah, warahmah ❤️',
      date: '2 jam yang lalu',
    },
    {
      id: '2',
      name: 'Dika Pratama',
      message: 'Barakallah, lancar sampai hari H bro! Bahagia selamanya.',
      date: '4 jam yang lalu',
    },
    {
      id: '3',
      name: 'Sarah N.',
      message: 'Happy wedding! Semoga menjadi keluarga yang penuh berkah dan cinta. ❤️',
      date: 'Kemarin',
    },
  ]);
  const [newWishName, setNewWishName] = useState('');
  const [newWishMessage, setNewWishMessage] = useState('');
  const [copiedBank, setCopiedBank] = useState(false);
  const [copiedBank2, setCopiedBank2] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [isPlayingMusic, setIsPlayingMusic] = useState(() => weddingAudio.getStatus());

  useEffect(() => {
    setIsPlayingMusic(weddingAudio.getStatus());
  }, []);

  const handleToggleMusic = () => {
    const active = weddingAudio.toggle();
    setIsPlayingMusic(active);
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName.trim()) return;

    // Optional WhatsApp forward
    if (data.rsvpWhatsappNumber) {
      const cleanWa = data.rsvpWhatsappNumber.replace(/[^0-9]/g, '');
      if (cleanWa) {
        const text = `Halo, saya *${rsvpName}* mengonfirmasi bahwa saya *${
          attendance === 'hadir' ? `akan HADIR (${guestCount} orang)` : 'TIDAK DAPAT HADIR'
        }* pada pernikahan ${data.groomName} & ${data.brideName}. Terima kasih!`;
        window.open(`https://wa.me/${cleanWa}?text=${encodeURIComponent(text)}`, '_blank');
      }
    }

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

  const copyAccountNumber = (accNumber: string, isSecond = false) => {
    navigator.clipboard.writeText(accNumber.replace(/\s+/g, ''));
    if (isSecond) {
      setCopiedBank2(true);
      setTimeout(() => setCopiedBank2(false), 3000);
    } else {
      setCopiedBank(true);
      setTimeout(() => setCopiedBank(false), 3000);
    }
  };

  const copyAddress = () => {
    if (!data.giftAddress) return;
    navigator.clipboard.writeText(data.giftAddress);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 3000);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Custom photos array for PolaroidGallery
  const customGalleryList = [
    { imageUrl: data.galleryPhoto1, caption: data.galleryCaption1 },
    { imageUrl: data.galleryPhoto2, caption: data.galleryCaption2 },
    { imageUrl: data.galleryPhoto3, caption: data.galleryCaption3 },
    { imageUrl: data.galleryPhoto4, caption: data.galleryCaption4 },
    { imageUrl: data.galleryPhoto5, caption: data.galleryCaption5 },
    { imageUrl: data.galleryPhoto6, caption: data.galleryCaption6 },
  ];

  return (
    <article
      id="invitation-article"
      className="relative max-w-xl mx-auto w-full bg-[#f7f2ea] border-x-2 border-stone-800 shadow-2xl overflow-hidden min-h-screen pb-28"
    >
      {/* Decorative Botanical Borders on Left and Right */}
      <div className="absolute left-1 top-24 pointer-events-none hidden sm:block opacity-75 z-0">
        <FloralSprig className="w-8 h-32" />
      </div>
      <div className="absolute right-1 top-24 pointer-events-none hidden sm:block opacity-75 z-0">
        <FloralSprig className="w-8 h-32" flipped />
      </div>
      <div className="absolute left-1 top-[460px] pointer-events-none hidden sm:block opacity-75 z-0">
        <FloralSprig className="w-8 h-32" />
      </div>
      <div className="absolute right-1 top-[460px] pointer-events-none hidden sm:block opacity-75 z-0">
        <FloralSprig className="w-8 h-32" flipped />
      </div>
      <div className="absolute left-1 top-[1020px] pointer-events-none hidden sm:block opacity-75 z-0">
        <FloralSprig className="w-8 h-32" />
      </div>
      <div className="absolute right-1 top-[1020px] pointer-events-none hidden sm:block opacity-75 z-0">
        <FloralSprig className="w-8 h-32" flipped />
      </div>
      <div className="absolute left-1 top-[1620px] pointer-events-none hidden sm:block opacity-75 z-0">
        <FloralSprig className="w-8 h-32" />
      </div>
      <div className="absolute right-1 top-[1620px] pointer-events-none hidden sm:block opacity-75 z-0">
        <FloralSprig className="w-8 h-32" flipped />
      </div>

      {/* Floating Audio / Ambient Music Button */}
      <div className="fixed top-4 right-4 z-40 flex items-center gap-2">
        {data.musicTitle && isPlayingMusic && (
          <div className="hidden sm:flex items-center gap-1.5 bg-stone-900/90 text-amber-200 text-[11px] font-hand font-bold px-3 py-1 rounded-full border border-stone-700 shadow-md backdrop-blur-xs animate-in fade-in">
            <span className="text-xs">🎵</span>
            <span className="max-w-[150px] truncate">{data.musicTitle}</span>
          </div>
        )}
        <button
          onClick={handleToggleMusic}
          aria-label="Putar Musik"
          title={isPlayingMusic ? `Matikan Musik (${data.musicTitle || 'Musik'})` : 'Nyalakan Musik'}
          className="w-11 h-11 rounded-full bg-white/95 border-2 border-stone-800 shadow-[3px_4px_0px_#231f1d] flex items-center justify-center text-stone-800 hover:bg-amber-50 transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer backdrop-blur-xs"
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
        {/* HEADER SECTION (Photo 2 Top) */}
        <header id="wedding-header" className="text-center pt-2 pb-6">
          <ScrollReveal delay={0}>
            <p className="font-hand tracking-widest text-xs sm:text-sm text-stone-700 font-bold uppercase">
              {data.coverTitle || 'THE WEDDING OF'}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={120}>
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
          </ScrollReveal>

          <ScrollReveal delay={220}>
            <HeartFlourish />
            <p className="font-hand font-bold text-lg text-stone-800 tracking-widest mt-1">
              {data.weddingDate}
            </p>
          </ScrollReveal>

          {/* Ayat / Quote Box with 3D Depth & Washi Tape */}
          {data.quoteText && (
            <ScrollReveal delay={340}>
              <div className="mt-6 relative bg-gradient-to-b from-[#fbf5eb] to-[#f4ebe0] rounded-2xl p-4 sm:p-6 border-2 border-stone-800 shadow-[4px_5px_0px_#231f1d] max-w-md mx-auto text-center">
                {/* Cute washi tape accent */}
                <div className="washi-tape-strip" />
                <p className="font-hand text-sm sm:text-base text-stone-800 italic leading-relaxed">
                  &ldquo;{data.quoteText}&rdquo;
                </p>
                {data.quoteSource && (
                  <p className="font-hand text-xs sm:text-sm font-bold text-stone-700 mt-2.5">
                    ({data.quoteSource})
                  </p>
                )}
              </div>
            </ScrollReveal>
          )}

          <div className="mt-4">
            <HeartFlourish />
          </div>
        </header>

        {/* SECTION: DETAIL MEMPELAI */}
        <section id="section-mempelai" className="my-10 scroll-mt-6">
          <ScrollReveal delay={0}>
            <SectionTitle
              title="KEDUA MEMPELAI"
              subtitle="Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan"
            />
          </ScrollReveal>

          {/* Salam & Kalimat Pembuka */}
          <ScrollReveal delay={120}>
            <div className="text-center max-w-md mx-auto mb-6 px-2 space-y-1.5">
              {data.greetingSalam && (
                <p className="font-hand font-extrabold text-stone-900 text-sm sm:text-base">
                  {data.greetingSalam}
                </p>
              )}
              {data.greetingOpening && (
                <p className="font-hand text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {data.greetingOpening}
                </p>
              )}
            </div>
          </ScrollReveal>

          {/* Staggered Couple Cards (Groom then Bride) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-lg mx-auto">
            {/* Card Mempelai Pria */}
            <ScrollReveal delay={240} direction="left">
              <div className="relative bg-gradient-to-b from-[#ffffff] to-[#fdfbf6] border-2 border-stone-800 rounded-2xl p-5 shadow-[4px_5px_0px_#231f1d] hover:shadow-[6px_7px_0px_#231f1d] transition-all hover:-translate-y-1 text-center flex flex-col items-center group">
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#2d3136] text-amber-200 border-2 border-stone-800 font-hand font-bold text-[11px] px-3.5 py-0.5 rounded-full shadow-[2px_2px_0px_#141110]">
                  Mempelai Pria
                </span>
                <div className="mt-3 flex items-center justify-center">
                  {data.groomAnimationUrl ? (
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-stone-800 overflow-hidden bg-white shadow-[2px_3px_0px_#231f1d] p-1">
                      <img
                        src={data.groomAnimationUrl}
                        alt={data.groomFullName}
                        className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform"
                      />
                    </div>
                  ) : (
                    <GroomAvatar />
                  )}
                </div>
                <h3 className="font-hand font-extrabold text-xl sm:text-2xl text-stone-900 mt-3.5">
                  {data.groomFullName || data.groomName}
                </h3>
                <p className="font-hand text-xs sm:text-sm text-stone-600 mt-1 max-w-[220px] leading-relaxed">
                  {data.groomParents}
                </p>
                {data.groomInstagram && data.groomInstagram !== '--' && (
                  <a
                    href={`https://instagram.com/${data.groomInstagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3.5 inline-flex items-center gap-1.5 text-xs font-hand font-bold text-stone-800 hover:text-stone-950 bg-stone-100 hover:bg-amber-100 border-2 border-stone-800 px-3.5 py-1 rounded-full shadow-[2px_2px_0px_#231f1d] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
                  >
                    <Instagram className="w-3.5 h-3.5 text-pink-600" />
                    <span>@{data.groomInstagram.replace('@', '')}</span>
                  </a>
                )}
              </div>
            </ScrollReveal>

            {/* Card Mempelai Wanita */}
            <ScrollReveal delay={380} direction="right">
              <div className="relative bg-gradient-to-b from-[#ffffff] to-[#fdfbf6] border-2 border-stone-800 rounded-2xl p-5 shadow-[4px_5px_0px_#231f1d] hover:shadow-[6px_7px_0px_#231f1d] transition-all hover:-translate-y-1 text-center flex flex-col items-center group">
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#2d3136] text-amber-200 border-2 border-stone-800 font-hand font-bold text-[11px] px-3.5 py-0.5 rounded-full shadow-[2px_2px_0px_#141110]">
                  Mempelai Wanita
                </span>
                <div className="mt-3 flex items-center justify-center">
                  {data.brideAnimationUrl ? (
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-stone-800 overflow-hidden bg-white shadow-[2px_3px_0px_#231f1d] p-1">
                      <img
                        src={data.brideAnimationUrl}
                        alt={data.brideFullName}
                        className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform"
                      />
                    </div>
                  ) : (
                    <BrideAvatar />
                  )}
                </div>
                <h3 className="font-hand font-extrabold text-xl sm:text-2xl text-stone-900 mt-3.5">
                  {data.brideFullName || data.brideName}
                </h3>
                <p className="font-hand text-xs sm:text-sm text-stone-600 mt-1 max-w-[220px] leading-relaxed">
                  {data.brideParents}
                </p>
                {data.brideInstagram && data.brideInstagram !== '--' && (
                  <a
                    href={`https://instagram.com/${data.brideInstagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3.5 inline-flex items-center gap-1.5 text-xs font-hand font-bold text-stone-800 hover:text-stone-950 bg-stone-100 hover:bg-amber-100 border-2 border-stone-800 px-3.5 py-1 rounded-full shadow-[2px_2px_0px_#231f1d] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
                  >
                    <Instagram className="w-3.5 h-3.5 text-pink-600" />
                    <span>@{data.brideInstagram.replace('@', '')}</span>
                  </a>
                )}
              </div>
            </ScrollReveal>
          </div>

          <div className="flex items-center justify-center gap-3 my-6">
            <span className="h-0.5 w-12 bg-stone-400 rounded-full"></span>
            <span className="font-hand font-bold text-stone-600 text-base">&amp;</span>
            <span className="h-0.5 w-12 bg-stone-400 rounded-full"></span>
          </div>
        </section>

        {/* SECTION: OUR STORY */}
        <section id="section-story" className="my-10 scroll-mt-6">
          <ScrollReveal delay={0}>
            <SectionTitle
              title={data.storyTitle || 'OUR STORY'}
              subtitle={data.storySubtitle || 'Kisah sederhana kami'}
            />
          </ScrollReveal>

          {/* Animasi / Ilustrasi Our Story */}
          <ScrollReveal delay={140}>
            {data.ourStoryAnimationUrl ? (
              <div className="max-w-md mx-auto rounded-2xl border-2 border-stone-800 overflow-hidden shadow-[4px_5px_0px_#231f1d] bg-white p-2">
                <img
                  src={data.ourStoryAnimationUrl}
                  alt="Animasi Our Story"
                  className="w-full max-h-72 object-contain mx-auto rounded-xl"
                />
              </div>
            ) : (
              <div className="max-w-md mx-auto">
                <CoupleStoryIllustration />
              </div>
            )}
          </ScrollReveal>

          {/* Story Narrative Box */}
          <ScrollReveal delay={280}>
            <div className="relative text-center mt-5 max-w-md mx-auto bg-gradient-to-b from-[#ffffff] to-[#faf5ec] border-2 border-stone-800 rounded-2xl p-5 sm:p-6 shadow-[4px_5px_0px_#231f1d]">
              <div className="washi-tape-strip" />
              <h3 className="font-hand font-extrabold text-xl text-stone-900 mb-2">
                {data.groomName} &amp; {data.brideName}
              </h3>
              <p className="font-hand text-sm sm:text-base text-stone-700 leading-relaxed text-justify sm:text-center">
                {data.ourStory}
              </p>
              <div className="flex items-center justify-center gap-2 mt-4">
                <span className="h-px w-8 bg-stone-400"></span>
                <HeartFlourish />
                <span className="h-px w-8 bg-stone-400"></span>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* SECTION: DETAIL ACARA */}
        <section id="section-acara" className="my-10 scroll-mt-6">
          <ScrollReveal delay={0}>
            <SectionTitle
              title={data.eventSectionTitle || 'DETAIL ACARA'}
              subtitle={data.eventSectionSubtitle || 'Mohon hadir di hari bahagia kami'}
            />
          </ScrollReveal>

          {/* Animasi Detail Acara jika diisi */}
          {data.eventDetailAnimationUrl && (
            <ScrollReveal delay={120}>
              <div className="flex justify-center mb-4">
                <div className="max-w-xs rounded-2xl border-2 border-stone-800 overflow-hidden shadow-[3px_4px_0px_#231f1d] bg-white p-2">
                  <img
                    src={data.eventDetailAnimationUrl}
                    alt="Animasi Detail Acara"
                    className="w-full max-h-48 object-contain mx-auto rounded-xl"
                  />
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* Staggered Event Cards (Akad then Resepsi) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-lg mx-auto">
            {/* Card 1: Akad Nikah */}
            <ScrollReveal delay={200} direction="up">
              <div className="relative bg-gradient-to-b from-[#ffffff] to-[#fbf8f2] border-2 border-stone-800 rounded-2xl p-5 shadow-[4px_5px_0px_#231f1d] hover:shadow-[6px_7px_0px_#231f1d] transition-all hover:-translate-y-1 flex flex-col justify-between h-full">
                <div>
                  {/* Rings Icon with Badge */}
                  <div className="flex justify-center mb-2">
                    <div className="relative w-11 h-8">
                      <div className="absolute left-0 w-6 h-6 rounded-full border-2 border-amber-600 bg-amber-100 shadow-xs"></div>
                      <div className="absolute right-0 w-6 h-6 rounded-full border-2 border-amber-600 bg-amber-100 shadow-xs"></div>
                    </div>
                  </div>
                  <h3 className="font-hand font-extrabold text-xl text-center text-stone-900 mb-3 border-b-2 border-dashed border-stone-300 pb-2">
                    {data.akadTitle || 'Akad Nikah'}
                  </h3>

                  <div className="space-y-2.5 text-xs sm:text-sm font-hand">
                    <div className="flex items-start gap-2.5 text-stone-700">
                      <div className="p-1 rounded-md bg-amber-100 border border-stone-700 shrink-0 mt-0.5">
                        <Calendar className="w-3.5 h-3.5 text-stone-800" />
                      </div>
                      <div>
                        <p className="font-bold text-stone-900">Hari &amp; Tanggal</p>
                        <p>{data.akadDate || data.weddingDateFull}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5 text-stone-700">
                      <div className="p-1 rounded-md bg-amber-100 border border-stone-700 shrink-0 mt-0.5">
                        <Clock className="w-3.5 h-3.5 text-stone-800" />
                      </div>
                      <div>
                        <p className="font-bold text-stone-900">Waktu</p>
                        <p>{data.akadTime}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5 text-stone-700">
                      <div className="p-1 rounded-md bg-amber-100 border border-stone-700 shrink-0 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-stone-800" />
                      </div>
                      <div>
                        <p className="font-bold text-stone-900">{data.akadVenue || 'Tempat'}</p>
                        <p className="text-stone-600 text-xs">{data.akadAddress || data.venueAddress}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Card 2: Resepsi */}
            <ScrollReveal delay={360} direction="up">
              <div className="relative bg-gradient-to-b from-[#ffffff] to-[#fbf8f2] border-2 border-stone-800 rounded-2xl p-5 shadow-[4px_5px_0px_#231f1d] hover:shadow-[6px_7px_0px_#231f1d] transition-all hover:-translate-y-1 flex flex-col justify-between h-full">
                <div>
                  {/* Clinking Glasses Icon */}
                  <div className="flex justify-center mb-2">
                    <svg width="32" height="28" viewBox="0 0 32 28" fill="none">
                      <g transform="rotate(15 12 12)">
                        <path d="M7 4 L17 4 L14 13 C13.5 15 10.5 15 10 13 Z" fill="#fff9e6" stroke="#222" strokeWidth="1.8" />
                        <line x1="12" y1="14" x2="12" y2="22" stroke="#222" strokeWidth="1.8" />
                        <line x1="8" y1="22" x2="16" y2="22" stroke="#222" strokeWidth="1.8" strokeLinecap="round" />
                      </g>
                      <g transform="rotate(-15 20 12)">
                        <path d="M15 4 L25 4 L22 13 C21.5 15 18.5 15 18 13 Z" fill="#fff9e6" stroke="#222" strokeWidth="1.8" />
                        <line x1="20" y1="14" x2="20" y2="22" stroke="#222" strokeWidth="1.8" />
                        <line x1="16" y1="22" x2="24" y2="22" stroke="#222" strokeWidth="1.8" strokeLinecap="round" />
                      </g>
                      <circle cx="16" cy="6" r="1.5" fill="#d97a68" />
                    </svg>
                  </div>
                  <h3 className="font-hand font-extrabold text-xl text-center text-stone-900 mb-3 border-b-2 border-dashed border-stone-300 pb-2">
                    {data.resepsiTitle || 'Resepsi'}
                  </h3>

                  <div className="space-y-2.5 text-xs sm:text-sm font-hand">
                    <div className="flex items-start gap-2.5 text-stone-700">
                      <div className="p-1 rounded-md bg-amber-100 border border-stone-700 shrink-0 mt-0.5">
                        <Calendar className="w-3.5 h-3.5 text-stone-800" />
                      </div>
                      <div>
                        <p className="font-bold text-stone-900">Hari &amp; Tanggal</p>
                        <p>{data.resepsiDate || data.weddingDateFull}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5 text-stone-700">
                      <div className="p-1 rounded-md bg-amber-100 border border-stone-700 shrink-0 mt-0.5">
                        <Clock className="w-3.5 h-3.5 text-stone-800" />
                      </div>
                      <div>
                        <p className="font-bold text-stone-900">Waktu</p>
                        <p>{data.resepsiTime}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5 text-stone-700">
                      <div className="p-1 rounded-md bg-amber-100 border border-stone-700 shrink-0 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-stone-800" />
                      </div>
                      <div>
                        <p className="font-bold text-stone-900">{data.resepsiVenue || data.venueName}</p>
                        <p className="text-stone-600 text-xs">{data.resepsiAddress || data.venueAddress}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* SECTION: LOKASI */}
        <section id="section-lokasi" className="my-10 scroll-mt-6">
          <ScrollReveal delay={0}>
            <SectionTitle
              title={data.locationSectionTitle || 'LOKASI'}
              subtitle={data.locationSectionSubtitle || 'Lokasi acara pernikahan'}
            />
          </ScrollReveal>

          <div className="max-w-md mx-auto space-y-4">
            <ScrollReveal delay={150}>
              <div className="rounded-2xl border-2 border-stone-800 overflow-hidden shadow-[4px_5px_0px_#231f1d]">
                <MapIllustration />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="bg-gradient-to-b from-[#ffffff] to-[#faf6ef] border-2 border-stone-800 rounded-2xl p-5 shadow-[4px_5px_0px_#231f1d] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                <div>
                  <h3 className="font-hand font-extrabold text-lg sm:text-xl text-stone-900">
                    {data.venueName}
                  </h3>
                  <p className="font-hand text-xs sm:text-sm text-stone-600 mt-0.5">
                    {data.venueAddress}
                  </p>
                </div>

                <a
                  href={data.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#2d3136] hover:bg-stone-900 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none text-stone-100 font-hand font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full border-2 border-stone-800 shadow-[3px_3px_0px_#141110] transition-all cursor-pointer whitespace-nowrap"
                >
                  <MapPin className="w-4 h-4 text-amber-200" />
                  <span>{data.googleMapsButtonText || 'Buka Google Maps'}</span>
                </a>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* SECTION: GALERI FOTO */}
        <section id="section-galeri" className="my-10 scroll-mt-6">
          <ScrollReveal delay={0}>
            <SectionTitle
              title={data.gallerySectionTitle || 'GALERI FOTO'}
              subtitle={data.gallerySectionSubtitle || 'Momen-momen indah kami'}
            />
          </ScrollReveal>

          {/* Animasi Galeri Foto jika diisi */}
          {data.galleryAnimationUrl && (
            <ScrollReveal delay={120}>
              <div className="mb-5 max-w-sm mx-auto rounded-2xl border-2 border-stone-800 overflow-hidden shadow-[4px_5px_0px_#231f1d] bg-white p-2">
                <img
                  src={data.galleryAnimationUrl}
                  alt="Animasi Galeri Foto"
                  className="w-full max-h-60 object-contain mx-auto rounded-xl"
                />
              </div>
            </ScrollReveal>
          )}

          {/* Polaroid Photos Grid */}
          <ScrollReveal delay={240}>
            <PolaroidGallery
              customPhotos={customGalleryList}
              onSelect={(idx) => setSelectedPhoto(idx)}
            />
          </ScrollReveal>
        </section>

        {/* SECTION: KONFIRMASI KEHADIRAN (RSVP) */}
        <section id="section-rsvp" className="my-10 scroll-mt-6">
          <ScrollReveal delay={0}>
            <SectionTitle
              title={data.rsvpSectionTitle || 'KONFIRMASI KEHADIRAN'}
              subtitle={data.rsvpSectionSubtitle || 'Mohon konfirmasi kehadiran Anda'}
            />
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="relative bg-gradient-to-b from-[#ffffff] to-[#faf6ee] border-2 border-stone-800 rounded-2xl p-5 sm:p-6 shadow-[4px_5px_0px_#231f1d] max-w-md mx-auto">
              <div className="washi-tape-strip" />

              {data.rsvpNotice && (
                <p className="font-hand text-xs text-stone-600 text-center mb-4 italic">
                  {data.rsvpNotice}
                </p>
              )}

              {rsvpSubmitted ? (
                <div className="text-center py-6">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 border-2 border-emerald-600 flex items-center justify-center mx-auto mb-3 shadow-xs">
                    <Check className="w-6 h-6 text-emerald-700" />
                  </div>
                  <h3 className="font-hand font-extrabold text-xl text-stone-900">
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
                      Nama Lengkap
                    </label>
                    <input
                      id="rsvp-name"
                      type="text"
                      required
                      value={rsvpName}
                      onChange={(e) => setRsvpName(e.target.value)}
                      placeholder="Contoh: Andi Pratama"
                      className="w-full bg-[#fcf9f2] border-2 border-stone-400 focus:border-stone-800 rounded-xl px-3.5 py-2 text-sm text-stone-900 placeholder:text-stone-400 outline-hidden transition-colors shadow-inner"
                    />
                  </div>

                  {/* Kehadiran */}
                  <div>
                    <label className="block text-sm font-bold text-stone-800 mb-1.5">
                      Apakah Anda bisa hadir?
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setAttendance('hadir')}
                        className={`py-2.5 px-3 rounded-xl border-2 font-bold text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          attendance === 'hadir'
                            ? 'bg-[#2d3136] text-amber-200 border-stone-800 shadow-[2px_3px_0px_#141110]'
                            : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
                        }`}
                      >
                        {attendance === 'hadir' && <Check className="w-4 h-4" />}
                        <span>Bisa hadir</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setAttendance('tidak')}
                        className={`py-2.5 px-3 rounded-xl border-2 font-bold text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          attendance === 'tidak'
                            ? 'bg-[#2d3136] text-amber-200 border-stone-800 shadow-[2px_3px_0px_#141110]'
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
                      <div className="flex items-center border-2 border-stone-400 rounded-xl bg-[#fcf9f2] overflow-hidden w-36 shadow-xs">
                        <button
                          type="button"
                          onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                          className="px-3.5 py-1.5 text-stone-700 hover:bg-stone-200 active:bg-stone-300 font-bold text-base transition-colors cursor-pointer"
                        >
                          -
                        </button>
                        <span className="flex-1 text-center font-extrabold text-stone-900 text-sm">
                          {guestCount}
                        </span>
                        <button
                          type="button"
                          onClick={() => setGuestCount(guestCount + 1)}
                          className="px-3.5 py-1.5 text-stone-700 hover:bg-stone-200 active:bg-stone-300 font-bold text-base transition-colors cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Submit button with 3D Depth */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-[#24292e] hover:bg-stone-900 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none text-amber-200 hover:text-white font-extrabold text-base py-3 px-4 rounded-xl border-2 border-stone-800 flex items-center justify-center gap-2 shadow-[3px_4px_0px_#141110] transition-all cursor-pointer"
                    >
                      <Send className="w-4 h-4 text-amber-300" />
                      <span>Kirim Konfirmasi</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </ScrollReveal>
        </section>

        {/* SECTION: HADIAH PERNIKAHAN (WEDDING GIFT) */}
        <section id="section-gift" className="my-10 scroll-mt-6">
          <ScrollReveal delay={0}>
            <SectionTitle
              title={data.giftSectionTitle || 'WEDDING GIFT'}
              subtitle={data.giftSectionSubtitle || 'Tanda kasih & doa restu'}
            />
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <p className="font-hand text-xs sm:text-sm text-stone-600 text-center max-w-md mx-auto mb-4 px-2">
              {data.giftNotice ||
                'Doa restu Anda merupakan karunia terindah bagi kami. Namun jika Anda ingin memberikan tanda kasih, dapat melalui:'}
            </p>
          </ScrollReveal>

          <div className="max-w-md mx-auto space-y-4">
            {/* Card Rekening 1 */}
            <ScrollReveal delay={220}>
              <div className="relative bg-gradient-to-b from-[#ffffff] to-[#faf6ef] border-2 border-stone-800 rounded-2xl p-5 shadow-[4px_5px_0px_#231f1d]">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-amber-100 border-2 border-stone-800 flex items-center justify-center shrink-0 shadow-xs">
                      <Building2 className="w-6 h-6 text-stone-800" />
                    </div>
                    <div>
                      <p className="font-hand text-xs text-stone-600 font-bold">Transfer Bank / E-Wallet</p>
                      <h3 className="font-hand font-extrabold text-lg text-stone-900">
                        {data.bankName}
                      </h3>
                    </div>
                  </div>

                  <div className="text-center sm:text-right w-full sm:w-auto">
                    <p className="font-hand text-xs text-stone-500 font-bold">No. Rekening</p>
                    <div className="flex items-center justify-center sm:justify-end gap-2 mt-0.5">
                      <span className="font-mono font-bold text-sm sm:text-base text-stone-900 tracking-wider">
                        {data.bankAccountNumber}
                      </span>
                      <button
                        onClick={() => copyAccountNumber(data.bankAccountNumber, false)}
                        className="inline-flex items-center gap-1 bg-[#f4ece1] hover:bg-stone-200 active:translate-x-0.5 active:translate-y-0.5 text-stone-800 font-hand font-bold text-xs px-2.5 py-1 rounded-md border border-stone-700 shadow-xs transition-all cursor-pointer"
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
            </ScrollReveal>

            {/* Card Rekening 2 (Jika diisi) */}
            {data.bankName2 && data.bankAccountNumber2 && (
              <ScrollReveal delay={340}>
                <div className="relative bg-gradient-to-b from-[#ffffff] to-[#faf6ef] border-2 border-stone-800 rounded-2xl p-5 shadow-[4px_5px_0px_#231f1d]">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-amber-100 border-2 border-stone-800 flex items-center justify-center shrink-0 shadow-xs">
                        <Building2 className="w-6 h-6 text-stone-800" />
                      </div>
                      <div>
                        <p className="font-hand text-xs text-stone-600 font-bold">Transfer Bank / E-Wallet</p>
                        <h3 className="font-hand font-extrabold text-lg text-stone-900">
                          {data.bankName2}
                        </h3>
                      </div>
                    </div>

                    <div className="text-center sm:text-right w-full sm:w-auto">
                      <p className="font-hand text-xs text-stone-500 font-bold">No. Rekening</p>
                      <div className="flex items-center justify-center sm:justify-end gap-2 mt-0.5">
                        <span className="font-mono font-bold text-sm sm:text-base text-stone-900 tracking-wider">
                          {data.bankAccountNumber2}
                        </span>
                        <button
                          onClick={() => copyAccountNumber(data.bankAccountNumber2!, true)}
                          className="inline-flex items-center gap-1 bg-[#f4ece1] hover:bg-stone-200 active:translate-x-0.5 active:translate-y-0.5 text-stone-800 font-hand font-bold text-xs px-2.5 py-1 rounded-md border border-stone-700 shadow-xs transition-all cursor-pointer"
                        >
                          {copiedBank2 ? (
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
                        a.n. {data.bankAccountHolder2 || data.bankAccountHolder}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* Kirim Kado Fisik (Jika diisi alamat) */}
            {data.giftAddress && (
              <ScrollReveal delay={440}>
                <div className="relative bg-gradient-to-b from-[#ffffff] to-[#faf6ef] border-2 border-stone-800 rounded-2xl p-5 shadow-[4px_5px_0px_#231f1d]">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 border-2 border-stone-800 flex items-center justify-center shrink-0 mt-0.5">
                      <Package className="w-5 h-5 text-stone-800" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-hand font-bold text-stone-900 text-sm">
                          Kirim Kado / Bingkisan Fisik
                        </p>
                        <button
                          onClick={copyAddress}
                          className="inline-flex items-center gap-1 bg-[#f4ece1] hover:bg-stone-200 text-stone-800 font-hand font-bold text-xs px-2.5 py-1 rounded-md border border-stone-700 shadow-xs cursor-pointer transition-colors"
                        >
                          {copiedAddress ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-700" />
                              <span className="text-emerald-800">Tersalin!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3 text-stone-700" />
                              <span>Salin Alamat</span>
                            </>
                          )}
                        </button>
                      </div>
                      <p className="font-hand text-xs text-stone-600 mt-1 leading-relaxed">
                        {data.giftAddress}
                      </p>
                      {data.giftAddressRecipient && (
                        <p className="font-hand text-xs text-stone-500 mt-0.5 font-bold">
                          Penerima: {data.giftAddressRecipient}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            )}
          </div>
        </section>

        {/* SECTION: UCAPAN & DOA */}
        <section id="section-ucapan" className="my-10 scroll-mt-6">
          <ScrollReveal delay={0}>
            <SectionTitle
              title={data.wishesSectionTitle || 'DOA & UCAPAN'}
              subtitle={data.wishesSectionSubtitle || 'Tulis doa dan harapan terbaik untuk kami'}
            />
          </ScrollReveal>

          <div className="max-w-md mx-auto space-y-4">
            {/* Input Form with 3D Depth */}
            <ScrollReveal delay={140}>
              <form
                onSubmit={handleAddWish}
                className="bg-gradient-to-b from-[#ffffff] to-[#faf6ee] border-2 border-stone-800 rounded-2xl p-4 shadow-[4px_5px_0px_#231f1d] flex flex-col gap-2.5"
              >
                <input
                  type="text"
                  value={newWishName}
                  onChange={(e) => setNewWishName(e.target.value)}
                  placeholder="Nama Anda (opsional)"
                  className="w-full bg-[#fcf9f2] border-2 border-stone-300 focus:border-stone-800 rounded-xl px-3 py-2 text-xs font-hand text-stone-900 placeholder:text-stone-400 outline-hidden transition-colors"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={newWishMessage}
                    onChange={(e) => setNewWishMessage(e.target.value)}
                    placeholder="Tulis ucapan dan doa Anda di sini..."
                    className="flex-1 bg-[#fcf9f2] border-2 border-stone-300 focus:border-stone-800 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-hand text-stone-900 placeholder:text-stone-400 outline-hidden transition-colors"
                  />
                  <button
                    type="submit"
                    className="bg-[#24292e] hover:bg-stone-900 active:translate-x-0.5 active:translate-y-0.5 text-white px-4 py-2 rounded-xl font-hand font-extrabold text-xs flex items-center gap-1.5 border-2 border-stone-800 shadow-[2px_3px_0px_#141110] transition-all cursor-pointer shrink-0"
                  >
                    <Send className="w-3.5 h-3.5 text-amber-300" />
                    <span>Kirim</span>
                  </button>
                </div>
              </form>
            </ScrollReveal>

            {/* List of Greetings Staggered One by One */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {wishes.map((item, idx) => (
                <ScrollReveal key={item.id} delay={220 + idx * 90}>
                  <div className="bg-gradient-to-b from-[#ffffff] to-[#fcfaf4] border-2 border-stone-800 rounded-2xl p-3.5 shadow-[3px_4px_0px_#231f1d] hover:shadow-[4px_5px_0px_#231f1d] transition-all flex flex-col justify-between h-full">
                    <p className="font-hand text-xs text-stone-800 leading-snug">
                      &ldquo;{item.message}&rdquo;
                    </p>
                    <p className="font-hand font-bold text-right text-xs text-stone-600 mt-2 border-t border-dashed border-stone-200 pt-1">
                      - {item.name}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER & CLOSING NOTE */}
        <footer id="invitation-footer" className="text-center pt-8 pb-4">
          <ScrollReveal delay={150}>
            <div className="relative max-w-md mx-auto bg-gradient-to-b from-[#faf6ee] to-[#f3ebe0] border-2 border-stone-800 rounded-2xl p-6 shadow-[4px_5px_0px_#231f1d] mb-6">
              <div className="washi-tape-strip" />
              <p className="font-hand text-xs sm:text-sm text-stone-700 leading-relaxed max-w-xs mx-auto">
                {data.closingText ||
                  'Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kedua mempelai.'}
              </p>

              {data.closingSalam && (
                <p className="font-hand font-extrabold text-sm text-stone-800 mt-3">
                  {data.closingSalam}
                </p>
              )}

              <h3 className="font-hand font-extrabold text-2xl text-stone-900 mt-3">
                {data.groomName} &amp; {data.brideName}
              </h3>

              {data.closingFamily && (
                <p className="font-hand text-xs text-stone-600 mt-1">
                  {data.closingFamily}
                </p>
              )}

              <div className="mt-3">
                <HeartFlourish />
              </div>
            </div>
          </ScrollReveal>

          <div className="mt-4">
            <button
              onClick={onBackToCover}
              className="inline-flex items-center gap-1.5 font-hand text-xs text-stone-600 hover:text-stone-900 underline cursor-pointer"
            >
              <span>← Kembali ke Sampul Komik (Cover)</span>
            </button>
          </div>
        </footer>
      </div>

      {/* FIXED BOTTOM NAVIGATION BAR */}
      <nav
        id="wedding-bottom-nav"
        className="fixed bottom-0 left-1/2 -translate-x-1/2 max-w-xl w-full bg-[#faf6ee]/95 backdrop-blur-md border-t-2 border-stone-800 py-2 px-6 flex justify-around items-center z-40 shadow-[0_-4px_10px_rgba(0,0,0,0.06)]"
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
          onClick={() => scrollToSection('section-galeri')}
          className="flex flex-col items-center text-stone-700 hover:text-stone-950 transition-colors cursor-pointer"
        >
          <span className="text-base">🖼️</span>
          <span className="font-hand font-bold text-[11px] mt-0.5">Galeri</span>
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
          className="fixed inset-0 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="bg-white p-4 rounded-2xl border-2 border-stone-800 max-w-sm w-full shadow-[6px_8px_0px_#1c1917] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-square bg-stone-100 rounded-xl overflow-hidden border-2 border-stone-800 flex items-center justify-center relative">
              {customGalleryList[selectedPhoto]?.imageUrl ? (
                <img
                  src={customGalleryList[selectedPhoto]!.imageUrl}
                  alt={customGalleryList[selectedPhoto]?.caption || 'Foto Galeri'}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full p-4 flex items-center justify-center">
                  <PolaroidGallery customPhotos={customGalleryList} />
                </div>
              )}
            </div>
            <div className="text-center mt-3">
              <p className="font-hand font-extrabold text-stone-900 text-base">
                {customGalleryList[selectedPhoto]?.caption || `Foto #${selectedPhoto + 1}`}
              </p>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="mt-3 bg-[#24292e] text-amber-200 hover:text-white font-hand font-bold text-xs px-5 py-2 rounded-full border border-stone-800 shadow-xs cursor-pointer"
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
