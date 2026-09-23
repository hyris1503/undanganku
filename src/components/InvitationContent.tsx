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
  Package,
  Layers,
  Sparkles,
  BookOpen,
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
  onBackToCover?: () => void;
  data: InvitationData;
}

export function InvitationContent({ data }: InvitationContentProps) {
  // Countdown Timer Hook
  const targetDateStr = data.weddingTargetDate || '2026-12-21T08:00:00';
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date(targetDateStr).getTime() || new Date('2026-12-21T08:00:00').getTime();

    function update() {
      const now = Date.now();
      const diff = Math.max(0, target - now);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft({ days, hours, minutes, seconds });
    }

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [targetDateStr]);

  // Bab 7: Stacked to Spread Photo Gallery State
  // Initial condition: stacked (menumpuk). When clicked: spreads out (menyebar).
  const [isGalleryStacked, setIsGalleryStacked] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  // Bab 8: Harapan & Doa State
  const [wishes, setWishes] = useState<Wish[]>([
    {
      id: '1',
      name: 'Rima & Keluarga',
      message: 'Selamat yaa Haris & Febri! Semoga selalu sakinah, mawaddah, warahmah ❤️ Lancar sampai pelaminan.',
      date: 'Baru saja',
    },
    {
      id: '2',
      name: 'Dika Pratama',
      message: 'Barakallah, selamat menempuh hidup baru bro! Bahagia selamanya.',
      date: '1 jam yang lalu',
    },
    {
      id: '3',
      name: 'Sarah N.',
      message: 'Happy wedding! Semoga menjadi keluarga yang penuh berkah, kasih sayang, dan dikaruniai keturunan soleh/solehah. ❤️',
      date: '3 jam yang lalu',
    },
  ]);
  const [newWishName, setNewWishName] = useState('');
  const [newWishMessage, setNewWishMessage] = useState('');
  const [wishSentSuccess, setWishSentSuccess] = useState(false);

  // Copy States
  const [copiedBank, setCopiedBank] = useState(false);
  const [copiedBank2, setCopiedBank2] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  // Music State
  const [isPlayingMusic, setIsPlayingMusic] = useState(() => weddingAudio.getStatus());

  useEffect(() => {
    setIsPlayingMusic(weddingAudio.getStatus());
  }, []);

  const handleToggleMusic = () => {
    const active = weddingAudio.toggle();
    setIsPlayingMusic(active);
  };

  const handleWishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWishName.trim() || !newWishMessage.trim()) return;

    const newEntry: Wish = {
      id: Date.now().toString(),
      name: newWishName.trim(),
      message: newWishMessage.trim(),
      date: 'Baru saja',
    };

    setWishes([newEntry, ...wishes]);
    setNewWishName('');
    setNewWishMessage('');
    setWishSentSuccess(true);
    setTimeout(() => setWishSentSuccess(false), 3500);
  };

  const copyToClipboard = (text: string, type: 'bank' | 'bank2' | 'address') => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    if (type === 'bank') {
      setCopiedBank(true);
      setTimeout(() => setCopiedBank(false), 2000);
    } else if (type === 'bank2') {
      setCopiedBank2(true);
      setTimeout(() => setCopiedBank2(false), 2000);
    } else {
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2000);
    }
  };

  // Gallery Photos Compilation
  const galleryList = [
    { imageUrl: data.galleryPhoto1, caption: data.galleryCaption1 || 'Pertemuan Pertama' },
    { imageUrl: data.galleryPhoto2, caption: data.galleryCaption2 || 'Kencan Pertama' },
    { imageUrl: data.galleryPhoto3, caption: data.galleryCaption3 || 'Lamaran Bahagia' },
    { imageUrl: data.galleryPhoto4, caption: data.galleryCaption4 || 'Senja Bersama' },
    { imageUrl: data.galleryPhoto5, caption: data.galleryCaption5 || 'Tawa Ceria' },
    { imageUrl: data.galleryPhoto6, caption: data.galleryCaption6 || 'Penuh Kasih' },
  ];

  // Stack rotation angles for organic tactile look
  const stackRotations = ['-rotate-3', 'rotate-2', '-rotate-6', 'rotate-4', '-rotate-1', 'rotate-5'];

  return (
    <article
      id="invitation-main-content"
      className="relative z-10 max-w-2xl mx-auto w-full px-3 py-6 md:py-10 transition-all"
    >
      {/* Sleek Floating Music Controller Button (Clear & un-obtrusive) */}
      <aside aria-label="Music control" className="fixed top-5 right-5 z-40">
        <button
          onClick={handleToggleMusic}
          title={isPlayingMusic ? 'Matikan Musik' : 'Putar Musik'}
          className={`w-12 h-12 rounded-full border-2 border-stone-800 shadow-[3px_4px_0px_#231f1d] flex items-center justify-center transition-all cursor-pointer ${
            isPlayingMusic
              ? 'bg-amber-300 text-stone-900 animate-spin-slow'
              : 'bg-stone-800 text-amber-200'
          }`}
        >
          {isPlayingMusic ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </button>
      </aside>

      {/* Main Comic Invitation Sheet */}
      <div className="relative bg-[#fdfbf7] border-2 border-stone-800 p-4 sm:p-7 md:p-8 rounded-2xl shadow-[6px_8px_0px_#231f1d] space-y-12">
        <div className="washi-tape-strip" />

        {/* ========================================================================= */}
        {/* BAB 1: UCAPAN SALAM                                                       */}
        {/* ========================================================================= */}
        <section id="bab-1-salam" className="pt-2 text-center">
          <ScrollReveal>
            <div className="inline-block bg-[#eef3f7] border-2 border-stone-800 px-3.5 py-1 rounded-full text-xs font-hand font-extrabold text-stone-700 shadow-[2px_2px_0px_#231f1d] mb-4">
              BAB 1 • UCAPAN SALAM
            </div>

            <h2 className="font-hand font-extrabold text-xl sm:text-2xl text-stone-900 mb-3 tracking-wide">
              {data.greetingSalam || "Assalamu'alaikum Warahmatullahi Wabarakatuh"}
            </h2>

            <div className="max-w-md mx-auto bg-[#faf6ee] border-2 border-stone-800 rounded-2xl p-4 sm:p-5 shadow-[3px_4px_0px_#231f1d]">
              <p className="font-hand text-sm sm:text-base text-stone-700 leading-relaxed">
                {data.greetingOpening ||
                  "Dengan memohon rahmat dan ridho Allah Subhanahu Wa Ta'ala, kami bermaksud menyelenggarakan syukuran pernikahan putra-putri kami tercinta:"}
              </p>
            </div>
          </ScrollReveal>
        </section>

        {/* ========================================================================= */}
        {/* BAB 2: AYAT-AYAT AL-QUR'AN                                                */}
        {/* ========================================================================= */}
        <section id="bab-2-ayat" className="text-center">
          <ScrollReveal delay={100}>
            <div className="inline-block bg-[#fcf5e5] border-2 border-stone-800 px-3.5 py-1 rounded-full text-xs font-hand font-extrabold text-stone-700 shadow-[2px_2px_0px_#231f1d] mb-4">
              BAB 2 • AYAT-AYAT AL-QUR'AN
            </div>

            <div className="max-w-lg mx-auto bg-gradient-to-b from-[#fbf8f0] to-[#f4ebe1] border-2 border-stone-800 rounded-2xl p-5 sm:p-7 shadow-[4px_5px_0px_#231f1d] relative">
              <div className="washi-tape-strip" />

              {/* Arabic Verse */}
              <p className="font-serif text-lg sm:text-xl md:text-2xl text-stone-900 leading-loose sm:leading-loose text-center dir-rtl mb-4 font-normal px-2">
                {data.quranArabic ||
                  'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ'}
              </p>

              <div className="w-16 h-0.5 bg-stone-300 mx-auto my-3" />

              {/* Indonesian Meaning */}
              <p className="font-hand text-xs sm:text-sm text-stone-700 italic leading-relaxed px-2">
                &ldquo;
                {data.quoteText ||
                  'Dan di antara tanda-tanda kekuasaan-Nya, Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, agar kamu merasa tenteram kepadanya, dan Dia menjadikan di antara kalian rasa kasih dan sayang.'}
                &rdquo;
              </p>

              {/* Surah Reference */}
              <p className="font-hand font-bold text-xs sm:text-sm text-amber-900 mt-3 uppercase tracking-wider">
                — {data.quoteSource || 'QS. Ar-Rum : 21'} —
              </p>
            </div>
          </ScrollReveal>
        </section>

        {/* ========================================================================= */}
        {/* BAB 3: PERKENALAN MEMPELAI                                               */}
        {/* ========================================================================= */}
        <section id="bab-3-mempelai">
          <ScrollReveal delay={150}>
            <div className="text-center mb-6">
              <div className="inline-block bg-[#eef3f7] border-2 border-stone-800 px-3.5 py-1 rounded-full text-xs font-hand font-extrabold text-stone-700 shadow-[2px_2px_0px_#231f1d] mb-2">
                BAB 3 • PERKENALAN MEMPELAI
              </div>
              <h2 className="font-hand font-extrabold text-2xl text-stone-900">
                KEDUA MEMPELAI
              </h2>
            </div>

            <div className="space-y-6">
              {/* Mempelai Pria */}
              <div className="relative bg-[#ffffff] border-2 border-stone-800 rounded-2xl p-5 shadow-[4px_5px_0px_#231f1d] flex flex-col sm:flex-row items-center gap-5">
                <div className="w-28 h-28 sm:w-32 sm:h-32 shrink-0 rounded-2xl border-2 border-stone-800 overflow-hidden bg-amber-50 shadow-[2px_3px_0px_#231f1d] flex items-center justify-center">
                  {data.groomAnimationUrl ? (
                    <img
                      src={data.groomAnimationUrl}
                      alt={data.groomName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <GroomAvatar />
                  )}
                </div>
                <div className="text-center sm:text-left flex-1">
                  <span className="font-hand text-xs font-bold bg-sky-100 text-sky-800 border border-stone-800 px-2.5 py-0.5 rounded-full inline-block mb-1">
                    Mempelai Pria
                  </span>
                  <h3 className="font-hand font-extrabold text-xl sm:text-2xl text-stone-900">
                    {data.groomFullName || data.groomName}
                  </h3>
                  <p className="font-hand text-xs sm:text-sm text-stone-600 mt-1">
                    {data.groomParents}
                  </p>
                  {data.groomInstagram && (
                    <a
                      href={`https://instagram.com/${data.groomInstagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-hand text-xs text-stone-700 hover:text-stone-900 mt-2 bg-stone-100 border border-stone-800 px-3 py-1 rounded-full shadow-2xs hover:scale-105 transition-transform"
                    >
                      <Instagram className="w-3.5 h-3.5 text-pink-600" />
                      <span>@{data.groomInstagram.replace('@', '')}</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Heart Comic Flourish Divider */}
              <div className="flex items-center justify-center gap-3">
                <span className="h-0.5 w-16 bg-stone-800"></span>
                <div className="w-10 h-10 rounded-full bg-rose-100 border-2 border-stone-800 flex items-center justify-center shadow-[2px_2px_0px_#231f1d]">
                  <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                </div>
                <span className="h-0.5 w-16 bg-stone-800"></span>
              </div>

              {/* Mempelai Wanita */}
              <div className="relative bg-[#ffffff] border-2 border-stone-800 rounded-2xl p-5 shadow-[4px_5px_0px_#231f1d] flex flex-col sm:flex-row-reverse items-center gap-5">
                <div className="w-28 h-28 sm:w-32 sm:h-32 shrink-0 rounded-2xl border-2 border-stone-800 overflow-hidden bg-rose-50 shadow-[2px_3px_0px_#231f1d] flex items-center justify-center">
                  {data.brideAnimationUrl ? (
                    <img
                      src={data.brideAnimationUrl}
                      alt={data.brideName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <BrideAvatar />
                  )}
                </div>
                <div className="text-center sm:text-right flex-1">
                  <span className="font-hand text-xs font-bold bg-rose-100 text-rose-800 border border-stone-800 px-2.5 py-0.5 rounded-full inline-block mb-1">
                    Mempelai Wanita
                  </span>
                  <h3 className="font-hand font-extrabold text-xl sm:text-2xl text-stone-900">
                    {data.brideFullName || data.brideName}
                  </h3>
                  <p className="font-hand text-xs sm:text-sm text-stone-600 mt-1">
                    {data.brideParents}
                  </p>
                  {data.brideInstagram && (
                    <a
                      href={`https://instagram.com/${data.brideInstagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-hand text-xs text-stone-700 hover:text-stone-900 mt-2 bg-stone-100 border border-stone-800 px-3 py-1 rounded-full shadow-2xs hover:scale-105 transition-transform"
                    >
                      <Instagram className="w-3.5 h-3.5 text-pink-600" />
                      <span>@{data.brideInstagram.replace('@', '')}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* ========================================================================= */}
        {/* BAB 4: CERITA KAMI (OUR STORY)                                            */}
        {/* ========================================================================= */}
        <section id="bab-4-cerita">
          <ScrollReveal delay={150}>
            <div className="text-center mb-5">
              <div className="inline-block bg-[#fcf5e5] border-2 border-stone-800 px-3.5 py-1 rounded-full text-xs font-hand font-extrabold text-stone-700 shadow-[2px_2px_0px_#231f1d] mb-2">
                BAB 4 • CERITA KAMI
              </div>
              <h2 className="font-hand font-extrabold text-2xl text-stone-900">
                {data.storyTitle || 'OUR STORY'}
              </h2>
              {data.storySubtitle && (
                <p className="font-hand text-xs text-stone-600">{data.storySubtitle}</p>
              )}
            </div>

            <div className="bg-[#faf6ee] border-2 border-stone-800 rounded-2xl p-5 sm:p-6 shadow-[4px_5px_0px_#231f1d]">
              {data.ourStoryAnimationUrl ? (
                <div className="mb-4 rounded-xl overflow-hidden border-2 border-stone-800 shadow-xs">
                  <img
                    src={data.ourStoryAnimationUrl}
                    alt="Our Story Illustration"
                    className="w-full max-h-60 object-contain mx-auto bg-white p-2"
                  />
                </div>
              ) : (
                <div className="max-w-xs mx-auto mb-4">
                  <CoupleStoryIllustration />
                </div>
              )}

              <div className="relative bg-white border-2 border-stone-800 rounded-2xl p-4 sm:p-5 shadow-[2px_3px_0px_#231f1d]">
                <p className="font-hand text-sm sm:text-base text-stone-800 leading-relaxed text-center sm:text-left whitespace-pre-line">
                  {data.ourStory ||
                    'Kami bertemu secara tidak sengaja, namun takdir mempertemukan kami di waktu yang tepat. Dari pertemuan sederhana, tumbuhlah rasa yang semakin kuat hingga akhirnya kami memutuskan untuk melangkah bersama ke jenjang pernikahan.'}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* ========================================================================= */}
        {/* BAB 5: ACARA PERNIKAHAN, HITUNGAN MUNDUR, AKAD, RESEPSI WANITA & PRIA    */}
        {/* ========================================================================= */}
        <section id="bab-5-acara">
          <ScrollReveal delay={150}>
            <div className="text-center mb-6">
              <div className="inline-block bg-[#eef3f7] border-2 border-stone-800 px-3.5 py-1 rounded-full text-xs font-hand font-extrabold text-stone-700 shadow-[2px_2px_0px_#231f1d] mb-2">
                BAB 5 • RANGKAIAN ACARA
              </div>
              <h2 className="font-hand font-extrabold text-2xl text-stone-900">
                {data.eventSectionTitle || 'DETAIL ACARA PERNIKAHAN'}
              </h2>
              <p className="font-hand text-xs text-stone-600">
                {data.eventSectionSubtitle || 'Rangkaian momen bahagia kami'}
              </p>
            </div>

            {/* Hitungan Mundur (Countdown Timer) */}
            <div className="mb-8 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-stone-800 rounded-2xl p-5 text-center shadow-[4px_5px_0px_#231f1d]">
              <p className="font-hand font-extrabold text-sm sm:text-base text-stone-800 mb-3 flex items-center justify-center gap-2">
                <Clock className="w-4 h-4 text-amber-700" />
                <span>{data.countdownTitle || 'HITUNGAN MUNDUR HARI BAHAGIA'}</span>
              </p>

              <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-sm mx-auto">
                <div className="bg-white border-2 border-stone-800 rounded-xl p-2.5 shadow-[2px_3px_0px_#231f1d]">
                  <span className="font-hand font-extrabold text-xl sm:text-3xl text-stone-900 block">
                    {timeLeft.days}
                  </span>
                  <span className="font-hand text-[10px] sm:text-xs text-stone-600 uppercase font-bold">
                    Hari
                  </span>
                </div>
                <div className="bg-white border-2 border-stone-800 rounded-xl p-2.5 shadow-[2px_3px_0px_#231f1d]">
                  <span className="font-hand font-extrabold text-xl sm:text-3xl text-stone-900 block">
                    {timeLeft.hours}
                  </span>
                  <span className="font-hand text-[10px] sm:text-xs text-stone-600 uppercase font-bold">
                    Jam
                  </span>
                </div>
                <div className="bg-white border-2 border-stone-800 rounded-xl p-2.5 shadow-[2px_3px_0px_#231f1d]">
                  <span className="font-hand font-extrabold text-xl sm:text-3xl text-stone-900 block">
                    {timeLeft.minutes}
                  </span>
                  <span className="font-hand text-[10px] sm:text-xs text-stone-600 uppercase font-bold">
                    Menit
                  </span>
                </div>
                <div className="bg-white border-2 border-stone-800 rounded-xl p-2.5 shadow-[2px_3px_0px_#231f1d]">
                  <span className="font-hand font-extrabold text-xl sm:text-3xl text-stone-900 block text-rose-600">
                    {timeLeft.seconds}
                  </span>
                  <span className="font-hand text-[10px] sm:text-xs text-stone-600 uppercase font-bold">
                    Detik
                  </span>
                </div>
              </div>

              {/* Add to Google Calendar Button */}
              <div className="mt-4">
                <a
                  href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                    `Pernikahan ${data.groomName} & ${data.brideName}`
                  )}&dates=20261221T010000Z/20261221T070000Z&details=${encodeURIComponent(
                    `Undangan pernikahan ${data.groomFullName} & ${data.brideFullName}`
                  )}&location=${encodeURIComponent(data.venueWanitaAddress || data.venueAddress)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#24292e] text-amber-200 hover:text-white px-4 py-2 rounded-xl text-xs font-hand font-bold border-2 border-stone-800 shadow-[2px_3px_0px_#231f1d] hover:scale-102 transition-transform"
                >
                  <Calendar className="w-4 h-4 text-amber-300" />
                  <span>Simpan ke Google Calendar</span>
                </a>
              </div>
            </div>

            {/* 3 Distinct Events: Akad, Resepsi Wanita, Resepsi Pria */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Event 1: Akad Nikah */}
              <div className="bg-white border-2 border-stone-800 rounded-2xl p-5 shadow-[4px_5px_0px_#231f1d] flex flex-col justify-between">
                <div>
                  <span className="bg-amber-100 text-amber-900 border border-stone-800 text-[11px] font-hand font-bold px-3 py-0.5 rounded-full inline-block mb-2">
                    Acara 1
                  </span>
                  <h3 className="font-hand font-extrabold text-lg text-stone-900">
                    {data.akadTitle || 'Akad Nikah'}
                  </h3>
                  <div className="mt-3 space-y-2 text-xs font-hand text-stone-700">
                    <p className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                      <span>{data.akadDate}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                      <span>{data.akadTime}</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <Building2 className="w-3.5 h-3.5 text-stone-500 shrink-0 mt-0.5" />
                      <span className="font-bold">{data.akadVenue}</span>
                    </p>
                    <p className="text-[11px] text-stone-500 pl-5">{data.akadAddress}</p>
                  </div>
                </div>
              </div>

              {/* Event 2: Resepsi di Mempelai Wanita */}
              <div className="bg-white border-2 border-stone-800 rounded-2xl p-5 shadow-[4px_5px_0px_#231f1d] flex flex-col justify-between">
                <div>
                  <span className="bg-rose-100 text-rose-900 border border-stone-800 text-[11px] font-hand font-bold px-3 py-0.5 rounded-full inline-block mb-2">
                    Acara 2
                  </span>
                  <h3 className="font-hand font-extrabold text-lg text-stone-900">
                    {data.resepsiWanitaTitle || 'Resepsi di Mempelai Wanita'}
                  </h3>
                  <div className="mt-3 space-y-2 text-xs font-hand text-stone-700">
                    <p className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                      <span>{data.resepsiWanitaDate || data.resepsiDate}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                      <span>{data.resepsiWanitaTime || data.resepsiTime}</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <Building2 className="w-3.5 h-3.5 text-stone-500 shrink-0 mt-0.5" />
                      <span className="font-bold">
                        {data.resepsiWanitaVenue || data.resepsiVenue}
                      </span>
                    </p>
                    <p className="text-[11px] text-stone-500 pl-5">
                      {data.resepsiWanitaAddress || data.resepsiAddress}
                    </p>
                  </div>
                </div>
              </div>

              {/* Event 3: Resepsi di Mempelai Pria (Ngunduh Mantu) */}
              <div className="bg-white border-2 border-stone-800 rounded-2xl p-5 shadow-[4px_5px_0px_#231f1d] flex flex-col justify-between">
                <div>
                  <span className="bg-sky-100 text-sky-900 border border-stone-800 text-[11px] font-hand font-bold px-3 py-0.5 rounded-full inline-block mb-2">
                    Acara 3
                  </span>
                  <h3 className="font-hand font-extrabold text-lg text-stone-900">
                    {data.resepsiPriaTitle || 'Resepsi di Mempelai Pria'}
                  </h3>
                  <div className="mt-3 space-y-2 text-xs font-hand text-stone-700">
                    <p className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                      <span>{data.resepsiPriaDate || 'Sabtu, 26 Desember 2026'}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                      <span>{data.resepsiPriaTime || '10.00 WIB - Selesai'}</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <Building2 className="w-3.5 h-3.5 text-stone-500 shrink-0 mt-0.5" />
                      <span className="font-bold">
                        {data.resepsiPriaVenue || 'Kediaman Mempelai Pria'}
                      </span>
                    </p>
                    <p className="text-[11px] text-stone-500 pl-5">
                      {data.resepsiPriaAddress || 'Jl. Cendrawasih No. 45, Jakarta'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* ========================================================================= */}
        {/* BAB 6: ALAMAT KEDUANYA (LOKASI MEMPELAI WANITA & PRIA)                   */}
        {/* ========================================================================= */}
        <section id="bab-6-alamat">
          <ScrollReveal delay={150}>
            <div className="text-center mb-6">
              <div className="inline-block bg-[#fcf5e5] border-2 border-stone-800 px-3.5 py-1 rounded-full text-xs font-hand font-extrabold text-stone-700 shadow-[2px_2px_0px_#231f1d] mb-2">
                BAB 6 • ALAMAT KEDUANYA
              </div>
              <h2 className="font-hand font-extrabold text-2xl text-stone-900">
                {data.locationSectionTitle || 'LOKASI & PETUNJUK ARAH'}
              </h2>
              <p className="font-hand text-xs text-stone-600">
                {data.locationSectionSubtitle || 'Alamat lokasi acara untuk kedua mempelai'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Lokasi Mempelai Wanita */}
              <div className="bg-[#faf6ee] border-2 border-stone-800 rounded-2xl p-5 shadow-[4px_5px_0px_#231f1d] flex flex-col justify-between">
                <div>
                  <span className="bg-rose-100 text-rose-800 border border-stone-800 text-[11px] font-hand font-bold px-3 py-0.5 rounded-full inline-block mb-2">
                    Lokasi Pihak Wanita
                  </span>
                  <h3 className="font-hand font-extrabold text-lg text-stone-900">
                    {data.venueWanitaName || data.venueName}
                  </h3>
                  <p className="font-hand text-xs text-stone-600 mt-2 leading-relaxed flex items-start gap-1.5">
                    <MapPin className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>{data.venueWanitaAddress || data.venueAddress}</span>
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-dashed border-stone-300">
                  <a
                    href={data.mapsWanitaUrl || data.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full bg-[#24292e] hover:bg-stone-900 text-amber-200 hover:text-white px-4 py-2.5 rounded-xl font-hand font-bold text-xs border-2 border-stone-800 shadow-[2px_3px_0px_#231f1d] transition-all cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Buka Google Maps Wanita</span>
                  </a>
                </div>
              </div>

              {/* Lokasi Mempelai Pria */}
              <div className="bg-[#faf6ee] border-2 border-stone-800 rounded-2xl p-5 shadow-[4px_5px_0px_#231f1d] flex flex-col justify-between">
                <div>
                  <span className="bg-sky-100 text-sky-800 border border-stone-800 text-[11px] font-hand font-bold px-3 py-0.5 rounded-full inline-block mb-2">
                    Lokasi Pihak Pria
                  </span>
                  <h3 className="font-hand font-extrabold text-lg text-stone-900">
                    {data.venuePriaName || 'Kediaman Mempelai Pria'}
                  </h3>
                  <p className="font-hand text-xs text-stone-600 mt-2 leading-relaxed flex items-start gap-1.5">
                    <MapPin className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    <span>
                      {data.venuePriaAddress || 'Jl. Cendrawasih No. 45, Jakarta Timur'}
                    </span>
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-dashed border-stone-300">
                  <a
                    href={data.mapsPriaUrl || data.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full bg-[#24292e] hover:bg-stone-900 text-amber-200 hover:text-white px-4 py-2.5 rounded-xl font-hand font-bold text-xs border-2 border-stone-800 shadow-[2px_3px_0px_#231f1d] transition-all cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Buka Google Maps Pria</span>
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* ========================================================================= */}
        {/* BAB 7: GALERI FOTO (MENUMPUK -> MENYEBAR & LIHAT DETAIL)                 */}
        {/* ========================================================================= */}
        <section id="bab-7-galeri">
          <ScrollReveal delay={150}>
            <div className="text-center mb-5">
              <div className="inline-block bg-[#eef3f7] border-2 border-stone-800 px-3.5 py-1 rounded-full text-xs font-hand font-extrabold text-stone-700 shadow-[2px_2px_0px_#231f1d] mb-2">
                BAB 7 • GALERI FOTO
              </div>
              <h2 className="font-hand font-extrabold text-2xl text-stone-900">
                {data.gallerySectionTitle || 'GALERI FOTO'}
              </h2>
              <p className="font-hand text-xs text-stone-600">
                {data.gallerySectionSubtitle || 'Momen-momen indah perjalanan cinta kami'}
              </p>
            </div>

            {/* Interactive Toggle for Guest: Tumpuk / Sebar */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <button
                onClick={() => setIsGalleryStacked(!isGalleryStacked)}
                className="inline-flex items-center gap-2 bg-white hover:bg-amber-50 text-stone-900 px-4 py-2 rounded-full border-2 border-stone-800 font-hand font-extrabold text-xs shadow-[3px_3px_0px_#231f1d] hover:scale-105 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
              >
                <Layers className="w-4 h-4 text-amber-600" />
                <span>
                  {isGalleryStacked ? '✨ Klik untuk Menyebarkan Galeri' : '🗂️ Tumpuk Kembali Foto'}
                </span>
              </button>
            </div>

            {/* KONDISI AWAL: FOTO MENUMPUK */}
            {isGalleryStacked ? (
              <div
                onClick={() => setIsGalleryStacked(false)}
                title="Klik untuk membuka dan menyebarkan foto!"
                className="relative max-w-xs mx-auto py-10 cursor-pointer group select-none"
              >
                {/* Visual hint tag */}
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 z-30 bg-amber-300 text-stone-900 border-2 border-stone-800 px-3.5 py-1 rounded-full text-xs font-hand font-extrabold shadow-[2px_2px_0px_#231f1d] animate-bounce">
                  📸 Sentuh untuk Membuka &amp; Menyebar!
                </div>

                {/* Stack of Polaroids with organic rotation offsets */}
                <div className="relative w-64 h-72 mx-auto">
                  {galleryList.slice(0, 4).map((item, idx) => {
                    const rotations = ['rotate-3', '-rotate-4', 'rotate-2', '-rotate-2'];
                    const zIndices = [10, 20, 25, 30];
                    return (
                      <div
                        key={idx}
                        className={`absolute inset-0 bg-white border-2 border-stone-800 rounded-xl p-3 pb-8 shadow-[4px_6px_0px_#231f1d] transition-transform duration-300 group-hover:scale-105 ${rotations[idx]}`}
                        style={{ zIndex: zIndices[idx] }}
                      >
                        <div className="w-full h-48 bg-stone-100 rounded-lg overflow-hidden border border-stone-300 relative flex items-center justify-center">
                          {item.imageUrl ? (
                            <img
                              src={item.imageUrl}
                              alt={item.caption}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="text-center p-3 text-stone-400 font-hand text-xs">
                              Foto #{idx + 1}
                            </div>
                          )}
                        </div>
                        <p className="font-hand font-bold text-center text-stone-800 text-xs mt-2 truncate">
                          {item.caption}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* KONDISI MENYEBAR: GRID FOTO & BISA DILIHAT DETAIL */
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 animate-in fade-in zoom-in-95 duration-300">
                {galleryList.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedPhoto(idx)}
                    className="bg-white border-2 border-stone-800 rounded-xl p-2.5 pb-3 shadow-[3px_4px_0px_#231f1d] hover:shadow-[5px_6px_0px_#231f1d] hover:-translate-y-1 transition-all cursor-pointer group"
                  >
                    <div className="aspect-square bg-stone-100 rounded-lg overflow-hidden border border-stone-300 relative flex items-center justify-center">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.caption}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="p-2 text-center">
                          <span className="font-hand text-stone-400 text-xs">
                            Momen #{idx + 1}
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-stone-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-hand text-xs font-bold">
                        🔍 Lihat Detail
                      </div>
                    </div>
                    <p className="font-hand font-bold text-center text-xs text-stone-800 mt-2 truncate">
                      {item.caption}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </ScrollReveal>
        </section>

        {/* ========================================================================= */}
        {/* BAB 8: HARAPAN DAN DOA (TEKS ISIAN TANPA KONFIRMASI KEHADIRAN)            */}
        {/* ========================================================================= */}
        <section id="bab-8-doa">
          <ScrollReveal delay={150}>
            <div className="text-center mb-6">
              <div className="inline-block bg-[#fcf5e5] border-2 border-stone-800 px-3.5 py-1 rounded-full text-xs font-hand font-extrabold text-stone-700 shadow-[2px_2px_0px_#231f1d] mb-2">
                BAB 8 • HARAPAN &amp; DOA
              </div>
              <h2 className="font-hand font-extrabold text-2xl text-stone-900">
                {data.wishesSectionTitle || 'HARAPAN & DOA RESTU'}
              </h2>
              <p className="font-hand text-xs text-stone-600">
                {data.wishesSectionSubtitle ||
                  'Tuliskan doa serta harapan terbaik Anda untuk kedua mempelai'}
              </p>
            </div>

            {/* Form Pengisian Harapan dan Doa */}
            <div className="bg-[#faf6ee] border-2 border-stone-800 rounded-2xl p-5 sm:p-6 shadow-[4px_5px_0px_#231f1d] mb-6">
              <form onSubmit={handleWishSubmit} className="space-y-4">
                <div>
                  <label className="block font-hand font-bold text-xs sm:text-sm text-stone-800 mb-1">
                    Nama Anda / Keluarga:
                  </label>
                  <input
                    type="text"
                    required
                    value={newWishName}
                    onChange={(e) => setNewWishName(e.target.value)}
                    placeholder="Contoh: Budi Santoso &amp; Keluarga"
                    className="w-full bg-white border-2 border-stone-800 rounded-xl px-3.5 py-2 font-hand text-sm text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-400 shadow-2xs"
                  />
                </div>

                <div>
                  <label className="block font-hand font-bold text-xs sm:text-sm text-stone-800 mb-1">
                    Harapan &amp; Doa Terbaik:
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={newWishMessage}
                    onChange={(e) => setNewWishMessage(e.target.value)}
                    placeholder="Tuliskan ucapan dan doa tulus untuk Haris &amp; Febri..."
                    className="w-full bg-white border-2 border-stone-800 rounded-xl px-3.5 py-2 font-hand text-sm text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-400 shadow-2xs"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#24292e] hover:bg-stone-900 text-amber-200 hover:text-white py-3 rounded-xl font-hand font-extrabold text-sm border-2 border-stone-800 shadow-[3px_4px_0px_#231f1d] flex items-center justify-center gap-2 cursor-pointer active:translate-x-0.5 active:translate-y-0.5 transition-all"
                >
                  <Send className="w-4 h-4 text-amber-300" />
                  <span>Kirim Harapan &amp; Doa Restu</span>
                </button>

                {wishSentSuccess && (
                  <div className="bg-emerald-100 border border-emerald-500 text-emerald-900 rounded-xl p-2.5 text-center font-hand text-xs font-bold animate-in fade-in">
                    ✓ Terima kasih! Harapan dan doa Anda telah tersampaikan.
                  </div>
                )}
              </form>
            </div>

            {/* Daftar Ucapan & Doa dari Tamu dalam Balon Komik */}
            <div className="space-y-3">
              {wishes.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border-2 border-stone-800 rounded-2xl p-4 shadow-[3px_4px_0px_#231f1d] relative"
                >
                  <div className="flex items-center justify-between mb-1 border-b border-dashed border-stone-200 pb-1">
                    <span className="font-hand font-extrabold text-sm text-stone-900">
                      {item.name}
                    </span>
                    <span className="font-hand text-[10px] text-stone-400">{item.date}</span>
                  </div>
                  <p className="font-hand text-xs sm:text-sm text-stone-700 leading-relaxed mt-1">
                    &ldquo;{item.message}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </section>

        {/* ========================================================================= */}
        {/* BAB 9: WEDDING GIFT (TANDA KASIH & REKENING / KADO)                        */}
        {/* ========================================================================= */}
        <section id="bab-9-gift">
          <ScrollReveal delay={150}>
            <div className="text-center mb-6">
              <div className="inline-block bg-[#eef3f7] border-2 border-stone-800 px-3.5 py-1 rounded-full text-xs font-hand font-extrabold text-stone-700 shadow-[2px_2px_0px_#231f1d] mb-2">
                BAB 9 • WEDDING GIFT
              </div>
              <h2 className="font-hand font-extrabold text-2xl text-stone-900">
                {data.giftSectionTitle || 'WEDDING GIFT'}
              </h2>
              <p className="font-hand text-xs text-stone-600 max-w-md mx-auto">
                {data.giftNotice ||
                  'Doa restu Anda merupakan karunia terindah bagi kami. Namun jika Anda ingin memberikan tanda kasih, dapat melalui transfer atau kado fisik:'}
              </p>
            </div>

            <div className="space-y-4">
              {/* Rekening 1 */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-stone-800 rounded-2xl p-5 shadow-[4px_5px_0px_#231f1d]">
                <div className="flex items-center justify-between">
                  <span className="font-hand font-extrabold text-sm text-stone-900">
                    {data.bankName || 'Bank BCA'}
                  </span>
                  <span className="font-mono text-xs text-stone-500">Amplop Digital</span>
                </div>
                <p className="font-mono font-extrabold text-lg sm:text-xl text-stone-900 tracking-wider my-2">
                  {data.bankAccountNumber}
                </p>
                <div className="flex items-center justify-between">
                  <p className="font-hand text-xs text-stone-700">
                    a.n {data.bankAccountHolder}
                  </p>
                  <button
                    onClick={() => copyToClipboard(data.bankAccountNumber, 'bank')}
                    className="inline-flex items-center gap-1.5 bg-white border border-stone-800 hover:bg-stone-100 px-3 py-1 rounded-lg text-xs font-hand font-bold shadow-2xs cursor-pointer active:scale-95"
                  >
                    {copiedBank ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-stone-600" />
                        <span>Salin Rekening</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Rekening 2 (jika diisi) */}
              {data.bankAccountNumber2 && (
                <div className="bg-gradient-to-r from-sky-50 to-blue-50 border-2 border-stone-800 rounded-2xl p-5 shadow-[4px_5px_0px_#231f1d]">
                  <div className="flex items-center justify-between">
                    <span className="font-hand font-extrabold text-sm text-stone-900">
                      {data.bankName2 || 'Bank Mandiri'}
                    </span>
                    <span className="font-mono text-xs text-stone-500">Amplop Digital</span>
                  </div>
                  <p className="font-mono font-extrabold text-lg sm:text-xl text-stone-900 tracking-wider my-2">
                    {data.bankAccountNumber2}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="font-hand text-xs text-stone-700">
                      a.n {data.bankAccountHolder2}
                    </p>
                    <button
                      onClick={() => copyToClipboard(data.bankAccountNumber2 || '', 'bank2')}
                      className="inline-flex items-center gap-1.5 bg-white border border-stone-800 hover:bg-stone-100 px-3 py-1 rounded-lg text-xs font-hand font-bold shadow-2xs cursor-pointer active:scale-95"
                    >
                      {copiedBank2 ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-stone-600" />
                          <span>Salin Rekening</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Kado Fisik (Alamat) */}
              {data.giftAddress && (
                <div className="bg-[#faf6ee] border-2 border-stone-800 rounded-2xl p-5 shadow-[4px_5px_0px_#231f1d]">
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="w-4 h-4 text-amber-700" />
                    <span className="font-hand font-extrabold text-sm text-stone-900">
                      Kirim Kado Fisik
                    </span>
                  </div>
                  <p className="font-hand text-xs font-bold text-stone-800">
                    Penerima: {data.giftAddressRecipient || `${data.groomName} & ${data.brideName}`}
                    {data.giftAddressPhone && ` (${data.giftAddressPhone})`}
                  </p>
                  <p className="font-hand text-xs text-stone-600 mt-1 leading-relaxed">
                    {data.giftAddress}
                  </p>
                  <div className="mt-3 text-right">
                    <button
                      onClick={() => copyToClipboard(data.giftAddress || '', 'address')}
                      className="inline-flex items-center gap-1.5 bg-white border border-stone-800 hover:bg-stone-100 px-3 py-1 rounded-lg text-xs font-hand font-bold shadow-2xs cursor-pointer active:scale-95"
                    >
                      {copiedAddress ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Alamat Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-stone-600" />
                          <span>Salin Alamat</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </ScrollReveal>
        </section>

        {/* ========================================================================= */}
        {/* BAB 10: UCAPAN DAN DOA DARI MEMPELAI (CLOSING PENUTUP)                    */}
        {/* ========================================================================= */}
        <section id="bab-10-penutup" className="text-center pt-4">
          <ScrollReveal delay={150}>
            <div className="inline-block bg-[#fcf5e5] border-2 border-stone-800 px-3.5 py-1 rounded-full text-xs font-hand font-extrabold text-stone-700 shadow-[2px_2px_0px_#231f1d] mb-4">
              BAB 10 • UCAPAN &amp; DOA DARI MEMPELAI
            </div>

            <div className="max-w-md mx-auto bg-gradient-to-b from-[#faf6ee] to-[#f3ebe0] border-2 border-stone-800 rounded-2xl p-6 shadow-[5px_6px_0px_#231f1d] relative">
              <div className="washi-tape-strip" />

              <p className="font-hand text-xs sm:text-sm text-stone-700 leading-relaxed max-w-sm mx-auto">
                {data.closingText ||
                  'Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kedua mempelai.'}
              </p>

              {/* Heartfelt prayer from couple */}
              <p className="font-hand text-xs sm:text-sm text-amber-900 mt-4 leading-relaxed font-bold italic">
                {data.closingPrayer ||
                  "Semoga Allah Subhanahu Wa Ta'ala membalas segala kebaikan serta keikhlasan doa restu yang telah diberikan, dan melimpahkan keberkahan bagi kita semua. Aamiin ya Rabbal 'Alamin."}
              </p>

              {data.closingSalam && (
                <p className="font-hand font-extrabold text-sm text-stone-800 mt-4">
                  {data.closingSalam}
                </p>
              )}

              <h3 className="font-hand font-extrabold text-2xl sm:text-3xl text-stone-900 mt-3 tracking-wide">
                {data.groomName} &amp; {data.brideName}
              </h3>

              {data.closingFamily && (
                <p className="font-hand text-xs text-stone-600 mt-2">
                  {data.closingFamily}
                </p>
              )}

              <div className="mt-4">
                <HeartFlourish />
              </div>
            </div>
          </ScrollReveal>
        </section>
      </div>

      {/* Lightbox Modal for Detail Photo View (Bab 7) */}
      {selectedPhoto !== null && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="bg-white p-4 rounded-2xl border-2 border-stone-800 max-w-md w-full shadow-[6px_8px_0px_#1c1917] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-square bg-stone-100 rounded-xl overflow-hidden border-2 border-stone-800 flex items-center justify-center relative">
              {galleryList[selectedPhoto]?.imageUrl ? (
                <img
                  src={galleryList[selectedPhoto]!.imageUrl}
                  alt={galleryList[selectedPhoto]?.caption || 'Detail Foto'}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full p-4 flex items-center justify-center">
                  <span className="font-hand text-stone-500 text-sm">
                    {galleryList[selectedPhoto]?.caption || `Foto #${selectedPhoto + 1}`}
                  </span>
                </div>
              )}
            </div>
            <div className="text-center mt-3">
              <p className="font-hand font-extrabold text-stone-900 text-base">
                {galleryList[selectedPhoto]?.caption || `Momen #${selectedPhoto + 1}`}
              </p>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="mt-3 bg-[#24292e] text-amber-200 hover:text-white font-hand font-bold text-xs px-6 py-2 rounded-full border border-stone-800 shadow-xs cursor-pointer hover:scale-105 transition-transform"
              >
                Tutup Foto
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
