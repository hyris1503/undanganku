import { Calendar, MapPin, Gift, Heart, Mail, ExternalLink, Lock } from 'lucide-react';
import { ComicStrip } from './ComicDoodles';
import { InvitationData } from '../types/invitation';

interface ComicCoverProps {
  onOpenInvitation: () => void;
  data: InvitationData;
  guestName?: string;
}

export function ComicCover({ onOpenInvitation, data, guestName }: ComicCoverProps) {
  return (
    <section id="comic-cover-section" className="max-w-2xl mx-auto w-full px-3 py-4 md:py-8">
      {/* Comic Content Canvas */}
      <div className="relative bg-[#f7f3ec] border-2 border-stone-800 p-4 sm:p-6 shadow-[5px_6px_0px_#231f1d] rounded-2xl">
        {/* Washi tape accent on top */}
        <div className="washi-tape-strip" />

        {/* 1. Animasi / Bahan Komik di Awal (Jika diisi URL kustom) */}
        {data.comicOpeningAnimationUrl ? (
          <div className="mb-6 rounded-2xl overflow-hidden border-2 border-stone-800 shadow-[3px_4px_0px_#231f1d] bg-white p-2 text-center relative group">
            <img
              src={data.comicOpeningAnimationUrl}
              alt="Animasi Komik Pembuka"
              className="w-full max-h-80 object-contain mx-auto rounded-xl"
            />
          </div>
        ) : (
          /* 4-Panel Comic Strip with customizable materials and placements */
          <ComicStrip
            dialogues={data.comicDialogues}
            panel1={{
              imageUrl: data.panel1Image,
              text: data.panel1Text,
              bubblePos: data.panel1BubblePos,
            }}
            panel2={{
              imageUrl: data.panel2Image,
              text: data.panel2Text,
              bubblePos: data.panel2BubblePos,
            }}
            panel3={{
              imageUrl: data.panel3Image,
              text: data.panel3Text,
              bubblePos: data.panel3BubblePos,
            }}
            panel4={{
              imageUrl: data.panel4Image,
              text: data.panel4Text,
              bubblePos: data.panel4BubblePos,
            }}
            extraPanels={data.coverPanels && data.coverPanels.length > 4 ? data.coverPanels.slice(4) : []}
          />
        )}

        {/* Invitation Headline Area */}
        <div className="text-center mt-8 mb-6">
          <p className="font-hand tracking-widest text-sm sm:text-base text-stone-700 font-bold uppercase">
            {data.coverTitle || 'THE WEDDING OF'}
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

          {/* Dedicated Personalized Guest Greeting Card with 3D Depth */}
          <div className="mt-4 mb-2 inline-block bg-[#f3ebe0] border-2 border-stone-800 rounded-2xl px-6 py-3.5 text-center shadow-[3px_4px_0px_#231f1d] animate-in fade-in max-w-xs w-full relative">
            <p className="font-hand text-xs text-stone-600 font-bold uppercase tracking-wider">
              Kepada Yth. Bapak/Ibu/Saudara/i:
            </p>
            <p className="font-hand font-extrabold text-lg sm:text-xl text-stone-900 mt-1 tracking-wide">
              {guestName || 'Tamu Undangan'}
            </p>
            <p className="font-hand text-[11px] text-stone-500 mt-0.5">
              di Tempat
            </p>
          </div>

          <p className="font-hand text-stone-600 text-sm sm:text-base mt-2 max-w-md mx-auto">
            {data.coverSubtitle || 'Kami mengundang Anda untuk hadir di hari bahagia kami'}
          </p>

          {/* Call to action: "Buka Undangan" with Tactile 3D Button */}
          <div className="mt-5">
            <button
              id="btn-lihat-undangan"
              onClick={onOpenInvitation}
              className="inline-flex items-center gap-3 bg-[#24292e] hover:bg-stone-900 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none text-amber-200 hover:text-white font-hand font-extrabold text-base sm:text-lg px-9 py-3.5 rounded-full border-2 border-stone-800 shadow-[4px_5px_0px_#181514] transition-all cursor-pointer group hover:scale-[1.02]"
            >
              <Mail className="w-5 h-5 text-amber-300 group-hover:scale-110 transition-transform" />
              <span>{data.coverButtonText || 'Buka Undangan'}</span>
            </button>
            {data.coverAudioNotice && (
              <p className="font-hand text-xs text-stone-500 mt-2 italic">
                {data.coverAudioNotice}
              </p>
            )}
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
