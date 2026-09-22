import { Calendar, MapPin, Gift, Heart, Mail, ExternalLink, Lock } from 'lucide-react';
import { ComicStrip } from './ComicDoodles';
import { InvitationData } from '../types/invitation';

interface ComicCoverProps {
  onOpenInvitation: () => void;
  data: InvitationData;
  guestName?: string;
}

export function ComicCover({ onOpenInvitation, data, guestName }: ComicCoverProps) {
  const showMockup = data.showBrowserMockup !== false;

  return (
    <section id="comic-cover-section" className="max-w-2xl mx-auto w-full px-3 py-4 md:py-8">
      {/* Optional Browser Mockup Window as in Photo 1 */}
      {showMockup && (
        <div className="bg-[#24292e] rounded-t-xl px-4 py-2.5 flex items-center justify-between shadow-md border-2 border-b-0 border-stone-800">
          {/* Window Traffic Lights */}
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block border border-[#e0443e]"></span>
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block border border-[#dea123]"></span>
            <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block border border-[#1aab29]"></span>
          </div>

          {/* Address Bar */}
          <div className="flex items-center gap-1.5 bg-[#171b1d] text-stone-300 px-3 py-1 rounded-md text-xs font-mono max-w-xs w-full mx-2 border border-stone-700/60 justify-center">
            <Lock className="w-3 h-3 text-stone-400 shrink-0" />
            <span className="truncate">undanganku.com/{data.groomName.toLowerCase()}-{data.brideName.toLowerCase()}</span>
          </div>

          {/* Share Icon */}
          <div className="text-stone-400">
            <ExternalLink className="w-3.5 h-3.5" />
          </div>
        </div>
      )}

      {/* Comic Content Canvas */}
      <div
        className={`bg-[#f7f3ec] border-2 border-stone-800 p-4 sm:p-6 shadow-md ${
          showMockup ? 'rounded-b-xl' : 'rounded-2xl'
        }`}
      >
        {/* 4-Panel Comic Strip */}
        <ComicStrip dialogues={data.comicDialogues} />

        {/* Invitation Headline Area */}
        <div className="text-center mt-8 mb-6">
          <p className="font-hand tracking-widest text-sm sm:text-base text-stone-700 font-bold uppercase">
            THE WEDDING OF
          </p>

          <div className="relative inline-block my-2">
            {/* Doodle sunburst rays around names */}
            <span className="absolute -left-6 top-1/2 -translate-y-1/2 text-stone-700 font-mono text-xl font-bold select-none">
              `\ -
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-wide font-hand text-stone-900 px-2 uppercase">
              {data.groomName} &amp; {data.brideName}
            </h1>
            <span className="absolute -right-6 top-1/2 -translate-y-1/2 text-stone-700 font-mono text-xl font-bold select-none">
              - /`
            </span>
          </div>

          {/* Heart icon with underline */}
          <div className="flex items-center justify-center gap-3 my-2">
            <span className="h-0.5 w-12 bg-stone-800 rounded-full"></span>
            <div className="p-1">
              <svg width="22" height="18" viewBox="0 0 24 20" fill="none">
                <path
                  d="M12 18 C12 18 2 12 2 6 C2 3 4.5 1 7.5 1 C9.5 1 11.2 2 12 3.5 C12.8 2 14.5 1 16.5 1 C19.5 1 22 3 22 6 C22 12 12 18 12 18 Z"
                  fill="#d97a68"
                  stroke="#222"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="h-0.5 w-12 bg-stone-800 rounded-full"></span>
          </div>

          {/* Date */}
          <p className="font-hand font-bold text-lg sm:text-xl text-stone-800 tracking-wider">
            {data.weddingDate}
          </p>

          {/* Dedicated Personalized Guest Greeting */}
          {guestName && (
            <div className="mt-4 mb-2 inline-block bg-[#ede5d8] border-2 border-stone-800 rounded-xl px-5 py-2.5 text-center shadow-xs animate-in fade-in">
              <p className="font-hand text-xs text-stone-600 font-bold">Kepada Yth. Bapak/Ibu/Saudara/i:</p>
              <p className="font-hand font-extrabold text-base sm:text-lg text-stone-900 mt-0.5 tracking-wide">
                {guestName}
              </p>
            </div>
          )}

          <p className="font-hand text-stone-600 text-sm sm:text-base mt-2 max-w-md mx-auto">
            Kami mengundang Anda untuk hadir di hari bahagia kami
          </p>

          {/* Call to action: "Buka Undangan" */}
          <div className="mt-5">
            <button
              id="btn-lihat-undangan"
              onClick={onOpenInvitation}
              className="inline-flex items-center gap-2.5 bg-[#2d3136] hover:bg-stone-900 active:scale-95 text-[#fdfbf7] font-hand font-bold text-base sm:text-lg px-8 py-3 rounded-full border-2 border-stone-800 shadow-md transition-all cursor-pointer group"
            >
              <Mail className="w-5 h-5 text-amber-200 group-hover:scale-110 transition-transform" />
              <span>Buka Undangan</span>
            </button>
          </div>
        </div>

        {/* Bottom 4 Summary Columns in Photo 1 */}
        <div className="bg-[#fefdfb] border-2 border-stone-800 rounded-xl p-4 sm:p-5 mt-8 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-center divide-y sm:divide-y-0 sm:divide-x divide-stone-200">
            {/* 1. Hari & Tanggal */}
            <div className="pt-2 sm:pt-0 sm:px-2 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-amber-50 border border-stone-700 flex items-center justify-center mb-1.5 text-stone-800">
                <Calendar className="w-4 h-4" />
              </div>
              <p className="font-hand font-bold text-sm text-stone-900">Hari &amp; Tanggal</p>
              <p className="font-hand text-xs text-stone-600 mt-0.5">{data.weddingDateFull}</p>
              <p className="font-hand text-xs text-stone-600">{data.akadTime}</p>
            </div>

            {/* 2. Lokasi */}
            <div className="pt-4 sm:pt-0 sm:px-2 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-amber-50 border border-stone-700 flex items-center justify-center mb-1.5 text-stone-800">
                <MapPin className="w-4 h-4" />
              </div>
              <p className="font-hand font-bold text-sm text-stone-900">Lokasi</p>
              <p className="font-hand text-xs text-stone-600 mt-0.5">{data.venueName}</p>
              <p className="font-hand text-xs text-stone-600 truncate max-w-[130px]">{data.venueAddress}</p>
            </div>

            {/* 3. Konfirmasi Kehadiran */}
            <div className="pt-4 sm:pt-0 sm:px-2 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-amber-50 border border-stone-700 flex items-center justify-center mb-1.5 text-stone-800">
                <Gift className="w-4 h-4" />
              </div>
              <p className="font-hand font-bold text-sm text-stone-900">Konfirmasi Kehadiran</p>
              <p className="font-hand text-xs text-stone-600 mt-0.5">
                Mohon konfirmasi melalui form yang tersedia
              </p>
            </div>

            {/* 4. Terima Kasih */}
            <div className="pt-4 sm:pt-0 sm:px-2 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-amber-50 border border-stone-700 flex items-center justify-center mb-1.5 text-stone-800">
                <Heart className="w-4 h-4 text-[#d97a68]" />
              </div>
              <p className="font-hand font-bold text-sm text-stone-900">Terima Kasih</p>
              <p className="font-hand text-xs text-stone-600 mt-0.5">
                Atas doa dan restu yang telah diberikan
              </p>
            </div>
          </div>
        </div>

        {/* Footer note: — Andi & Sinta — */}
        <div className="text-center mt-5">
          <p className="font-hand text-stone-700 font-bold text-sm tracking-wider">
            — {data.groomName} &amp; {data.brideName} —
          </p>
        </div>
      </div>
    </section>
  );
}
