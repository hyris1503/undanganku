export interface ComicDialogues {
  panel1: string;
  panel2: string;
  panel3: string;
  panel4: string;
}

export interface CoverPanel {
  id: string;
  imageUrl?: string;
  dialogueText: string;
  bubblePosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export interface InvitationData {
  // 1. Cover & Header
  coverTitle: string;
  coverSubtitle: string;
  coverButtonText: string;
  coverAudioNotice: string;
  coverPanels?: CoverPanel[];
  panel1Image?: string;
  panel1Text?: string;
  panel1BubblePos?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  panel2Image?: string;
  panel2Text?: string;
  panel2BubblePos?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  panel3Image?: string;
  panel3Text?: string;
  panel3BubblePos?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  panel4Image?: string;
  panel4Text?: string;
  panel4BubblePos?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

  // Bab 1: Salam & Pembuka
  greetingTitle?: string;
  greetingSalam: string;
  greetingOpening: string;

  // Bab 2: Ayat Al-Qur'an
  quranSectionTitle?: string;
  quranArabic?: string;
  quoteText: string;
  quoteSource: string;

  // Bab 3: Mempelai Pria
  groomName: string;
  groomFullName: string;
  groomParents: string;
  groomInstagram?: string;
  groomAnimationUrl?: string;

  // Bab 3: Mempelai Wanita
  brideName: string;
  brideFullName: string;
  brideParents: string;
  brideInstagram?: string;
  brideAnimationUrl?: string;

  // Tanggal Utama
  weddingDate: string;
  weddingDateFull: string;
  weddingTargetDate?: string;

  // Bab 4: Our Story
  storyTitle: string;
  storySubtitle: string;
  ourStory: string;
  ourStoryAnimationUrl?: string;

  // Bab 5: Detail Acara (Hitungan Mundur, Akad, Resepsi Wanita, Resepsi Pria)
  eventSectionTitle: string;
  eventSectionSubtitle: string;
  countdownTitle?: string;
  
  // Acara 1: Akad Nikah
  akadTitle: string;
  akadDate: string;
  akadTime: string;
  akadVenue: string;
  akadAddress: string;

  // Acara 2: Resepsi Mempelai Wanita
  resepsiWanitaTitle?: string;
  resepsiWanitaDate?: string;
  resepsiWanitaTime?: string;
  resepsiWanitaVenue?: string;
  resepsiWanitaAddress?: string;

  // Acara 3: Resepsi Mempelai Pria
  resepsiPriaTitle?: string;
  resepsiPriaDate?: string;
  resepsiPriaTime?: string;
  resepsiPriaVenue?: string;
  resepsiPriaAddress?: string;

  // Backwards compatibility for single resepsi
  resepsiTitle: string;
  resepsiDate: string;
  resepsiTime: string;
  resepsiVenue: string;
  resepsiAddress: string;
  eventDetailAnimationUrl?: string;

  // Bab 6: Alamat Keduanya (Wanita & Pria)
  locationSectionTitle: string;
  locationSectionSubtitle: string;

  // Lokasi Wanita
  locationWanitaTitle?: string;
  venueWanitaName?: string;
  venueWanitaAddress?: string;
  mapsWanitaUrl?: string;

  // Lokasi Pria
  locationPriaTitle?: string;
  venuePriaName?: string;
  venuePriaAddress?: string;
  mapsPriaUrl?: string;

  // Backwards compatibility single venue
  venueName: string;
  venueAddress: string;
  googleMapsUrl: string;
  googleMapsButtonText: string;

  // Bab 7: Galeri Foto (Foto 1 - 6 & Caption)
  gallerySectionTitle: string;
  gallerySectionSubtitle: string;
  galleryAnimationUrl?: string;
  galleryPhoto1?: string;
  galleryCaption1?: string;
  galleryPhoto2?: string;
  galleryCaption2?: string;
  galleryPhoto3?: string;
  galleryCaption3?: string;
  galleryPhoto4?: string;
  galleryCaption4?: string;
  galleryPhoto5?: string;
  galleryCaption5?: string;
  galleryPhoto6?: string;
  galleryCaption6?: string;

  // Bab 8: Harapan & Doa Tamu
  wishesSectionTitle: string;
  wishesSectionSubtitle: string;

  // Legacy fields
  rsvpSectionTitle?: string;
  rsvpSectionSubtitle?: string;
  rsvpNotice?: string;
  rsvpWhatsappNumber?: string;

  // Bab 9: Hadiah Pernikahan (Wedding Gift)
  giftSectionTitle: string;
  giftSectionSubtitle: string;
  giftNotice: string;
  bankName: string;
  bankAccountNumber: string;
  bankAccountHolder: string;
  bankName2?: string;
  bankAccountNumber2?: string;
  bankAccountHolder2?: string;
  giftAddressRecipient?: string;
  giftAddressPhone?: string;
  giftAddress?: string;

  // Bab 10: Ucapan & Doa dari Mempelai (Closing)
  closingText: string;
  closingPrayer?: string;
  closingSalam: string;
  closingFamily: string;

  // 15. Dialog Komik Sampul
  comicDialogues: ComicDialogues;
  comicOpeningAnimationUrl?: string;

  // 16. Musik Latar
  musicUrl?: string;
  musicTitle?: string;

  // 17. Animasi Seluruh Undangan (Ambient)
  globalAmbientType?: 'none' | 'leaves' | 'petals' | 'sparkles' | 'hearts' | 'custom';
  globalAmbientAnimationUrl?: string;

  // Internal flags
  showBrowserMockup?: boolean;
}

export const defaultInvitationData: InvitationData = {
  // 1. Cover
  coverTitle: "THE WEDDING OF",
  coverSubtitle: "Kami mengundang Anda untuk merayakan hari bahagia kami",
  coverButtonText: "Buka Undangan",
  coverAudioNotice: "*Nyalakan audio untuk pengalaman terbaik",
  panel1Image: "",
  panel1Text: "munduran dikit bisa mba?",
  panel1BubblePos: "top-left",
  panel2Image: "",
  panel2Text: "iya Kenapa mas?",
  panel2BubblePos: "top-right",
  panel3Image: "",
  panel3Text: "cantik e kelewatan.",
  panel3BubblePos: "top-left",
  panel4Image: "",
  panel4Text: "Nikah yuk mas.",
  panel4BubblePos: "top-right",
  coverPanels: [
    { id: '1', imageUrl: '', dialogueText: 'munduran dikit bisa mba?', bubblePosition: 'top-left' },
    { id: '2', imageUrl: '', dialogueText: 'iya Kenapa mas?', bubblePosition: 'top-right' },
    { id: '3', imageUrl: '', dialogueText: 'cantik e kelewatan.', bubblePosition: 'top-left' },
    { id: '4', imageUrl: '', dialogueText: 'Nikah yuk mas.', bubblePosition: 'top-right' },
  ],

  // Bab 1: Salam & Pembuka
  greetingTitle: "KATA PENGANTAR",
  greetingSalam: "Assalamu'alaikum Warahmatullahi Wabarakatuh",
  greetingOpening: "Dengan memohon rahmat dan ridho Allah Subhanahu Wa Ta'ala, kami bermaksud menyelenggarakan syukuran pernikahan putra-putri kami:",

  // Bab 2: Ayat Al-Qur'an
  quranSectionTitle: "AYAT AL-QUR'AN",
  quranArabic: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ",
  quoteText: "Dan di antara tanda-tanda kekuasaan-Nya, Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, agar kamu merasa tenteram kepadanya, dan Dia menjadikan di antara kalian rasa kasih dan sayang.",
  quoteSource: "QS. Ar-Rum : 21",

  // Bab 3: Mempelai Pria
  groomName: "Haris",
  groomFullName: "Muhammad Haris Hariri",
  groomParents: "Putra pertama dari Bpk. Suwandi & Ibu Siti Liumi",
  groomInstagram: "",
  groomAnimationUrl: "",

  // Bab 3: Mempelai Wanita
  brideName: "Febri",
  brideFullName: "Ns. Febriana Nur Ardiani, S. Kep",
  brideParents: "Putri kedua dari Bpk. Sardi (alm) & Ibu Yuliani",
  brideInstagram: "",
  brideAnimationUrl: "",

  // Tanggal Utama & Hitungan Mundur
  weddingDate: "21 . 12 . 2026",
  weddingDateFull: "Senin, 21 Desember 2026",
  weddingTargetDate: "2026-12-21T08:00:00",

  // Bab 4: Our Story
  storyTitle: "OUR STORY",
  storySubtitle: "Kisah sederhana kami",
  ourStory: "Kami bertemu secara tidak sengaja, namun takdir mempertemukan kami di waktu yang tepat. Dari pertemuan sederhana, tumbuhlah rasa yang semakin kuat hingga akhirnya kami memutuskan untuk melangkah bersama ke jenjang pernikahan.",
  ourStoryAnimationUrl: "",

  // Bab 5: Detail Acara (Countdown, Akad, Resepsi Wanita, Resepsi Pria)
  eventSectionTitle: "DETAIL ACARA",
  eventSectionSubtitle: "Rangkaian hari bahagia kami",
  countdownTitle: "HITUNGAN MUNDUR",
  
  // Acara 1: Akad Nikah
  akadTitle: "Akad Nikah",
  akadDate: "Senin, 21 Desember 2026",
  akadTime: "08.00 WIB",
  akadVenue: "Kediaman Mempelai Wanita",
  akadAddress: "Jl. Melati No. 12, Jakarta",

  // Acara 2: Resepsi di Mempelai Wanita
  resepsiWanitaTitle: "Resepsi Mempelai Wanita",
  resepsiWanitaDate: "Senin, 21 Desember 2026",
  resepsiWanitaTime: "11.00 WIB - 14.00 WIB",
  resepsiWanitaVenue: "Gedung Serbaguna Melati",
  resepsiWanitaAddress: "Jl. Melati No. 12, Jakarta",

  // Acara 3: Resepsi di Mempelai Pria (Ngunduh Mantu)
  resepsiPriaTitle: "Resepsi Mempelai Pria (Ngunduh Mantu)",
  resepsiPriaDate: "Sabtu, 26 Desember 2026",
  resepsiPriaTime: "10.00 WIB - Selesai",
  resepsiPriaVenue: "Kediaman Mempelai Pria",
  resepsiPriaAddress: "Jl. Cendrawasih No. 45, Jakarta",

  // Backwards compatible
  resepsiTitle: "Resepsi Pernikahan",
  resepsiDate: "Senin, 21 Desember 2026",
  resepsiTime: "11.00 WIB - Selesai",
  resepsiVenue: "Gedung Serbaguna Melati",
  resepsiAddress: "Jl. Melati No. 12, Jakarta",
  eventDetailAnimationUrl: "",

  // Bab 6: Alamat Keduanya
  locationSectionTitle: "ALAMAT ACARA",
  locationSectionSubtitle: "Lokasi acara kedua mempelai",

  locationWanitaTitle: "Lokasi Acara Mempelai Wanita",
  venueWanitaName: "Gedung Serbaguna Melati",
  venueWanitaAddress: "Jl. Melati No. 12, Jakarta Barat",
  mapsWanitaUrl: "https://maps.google.com/?q=Gedung+Serbaguna+Melati+Jakarta",

  locationPriaTitle: "Lokasi Acara Mempelai Pria",
  venuePriaName: "Kediaman Mempelai Pria",
  venuePriaAddress: "Jl. Cendrawasih No. 45, Jakarta Timur",
  mapsPriaUrl: "https://maps.google.com/?q=Jakarta",

  venueName: "Gedung Serbaguna Melati",
  venueAddress: "Jl. Melati No. 12, Jakarta",
  googleMapsUrl: "https://maps.google.com/?q=Gedung+Serbaguna+Melati+Jakarta",
  googleMapsButtonText: "Buka Google Maps",

  // Bab 7: Galeri Foto
  gallerySectionTitle: "GALERI FOTO",
  gallerySectionSubtitle: "Momen-momen indah kami",
  galleryAnimationUrl: "",
  galleryPhoto1: "",
  galleryCaption1: "Pertemuan Pertama",
  galleryPhoto2: "",
  galleryCaption2: "Kencan Pertama",
  galleryPhoto3: "",
  galleryCaption3: "Lamaran Bahagia",
  galleryPhoto4: "",
  galleryCaption4: "Senja di Pantai",
  galleryPhoto5: "",
  galleryCaption5: "Ceria Bersama",
  galleryPhoto6: "",
  galleryCaption6: "Hangat & Penuh Kasih",

  // Bab 8: Harapan & Doa Tamu
  wishesSectionTitle: "HARAPAN & DOA",
  wishesSectionSubtitle: "Kirimkan doa dan ucapan hangat untuk kedua mempelai",

  // Legacy
  rsvpSectionTitle: "KONFIRMASI KEHADIRAN",
  rsvpSectionSubtitle: "Mohon konfirmasi kehadiran Anda",
  rsvpNotice: "Kehadiran dan doa restu Anda merupakan kehormatan terbesar bagi kami.",
  rsvpWhatsappNumber: "",

  // Bab 9: Hadiah
  giftSectionTitle: "WEDDING GIFT",
  giftSectionSubtitle: "Tanda kasih & doa restu",
  giftNotice: "Doa restu Anda merupakan karunia terindah bagi kami. Namun jika Anda ingin memberikan tanda kasih, dapat melalui transfer atau kado fisik:",
  bankName: "Bank BCA",
  bankAccountNumber: "1234 5678 9012",
  bankAccountHolder: "Muhammad Haris Hariri",
  bankName2: "Bank Mandiri",
  bankAccountNumber2: "9876 5432 1098",
  bankAccountHolder2: "Ns. Febriana Nur Ardiani",
  giftAddressRecipient: "Haris & Febri",
  giftAddressPhone: "0812-3456-7890",
  giftAddress: "Jl. Melati No. 12, RT 03/RW 05, Jakarta Barat",

  // Bab 10: Ucapan & Doa dari Mempelai
  closingText: "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kami berdua.",
  closingPrayer: "Semoga Allah Subhanahu Wa Ta'ala membalas segala kebaikan serta keikhlasan doa restu yang telah diberikan, dan melimpahkan keberkahan bagi kita semua. Aamiin ya Rabbal 'Alamin.",
  closingSalam: "Wassalamu'alaikum Warahmatullahi Wabarakatuh",
  closingFamily: "Keluarga Besar Bpk. Suwandi & Bpk. Sardi (alm)",

  // 15. Dialog Komik
  comicDialogues: {
    panel1: "munduran dikit bisa mba?",
    panel2: "iya Kenapa mas?",
    panel3: "cantik e kelewatan.",
    panel4: "Nikah yuk mas.",
  },
  comicOpeningAnimationUrl: "",

  // 16. Musik
  musicUrl: "/until-i-found-you.mp3",
  musicTitle: "Until I Found You - Stephen Sanchez",

  // 17. Ambient
  globalAmbientType: "none",
  globalAmbientAnimationUrl: "",
};
