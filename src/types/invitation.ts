export interface ComicDialogues {
  panel1: string;
  panel2: string;
  panel3: string;
  panel4: string;
}

export interface InvitationData {
  // 1. Cover & Header
  coverTitle: string;
  coverSubtitle: string;
  coverButtonText: string;
  coverAudioNotice: string;

  // 2. Salam & Pembuka
  greetingSalam: string;
  greetingOpening: string;

  // 3. Kutipan / Ayat
  quoteText: string;
  quoteSource: string;

  // 4. Mempelai Pria
  groomName: string;
  groomFullName: string;
  groomParents: string;
  groomInstagram?: string;
  groomAnimationUrl?: string;

  // 5. Mempelai Wanita
  brideName: string;
  brideFullName: string;
  brideParents: string;
  brideInstagram?: string;
  brideAnimationUrl?: string;

  // 6. Tanggal Utama
  weddingDate: string;
  weddingDateFull: string;

  // 7. Our Story
  storyTitle: string;
  storySubtitle: string;
  ourStory: string;
  ourStoryAnimationUrl?: string;

  // 8. Detail Acara (Akad & Resepsi)
  eventSectionTitle: string;
  eventSectionSubtitle: string;
  akadTitle: string;
  akadDate: string;
  akadTime: string;
  akadVenue: string;
  akadAddress: string;
  resepsiTitle: string;
  resepsiDate: string;
  resepsiTime: string;
  resepsiVenue: string;
  resepsiAddress: string;
  eventDetailAnimationUrl?: string;

  // 9. Lokasi & Google Maps
  locationSectionTitle: string;
  locationSectionSubtitle: string;
  venueName: string;
  venueAddress: string;
  googleMapsUrl: string;
  googleMapsButtonText: string;

  // 10. Galeri Foto (Foto 1 - 6 & Caption)
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

  // 11. RSVP & Konfirmasi
  rsvpSectionTitle: string;
  rsvpSectionSubtitle: string;
  rsvpNotice: string;
  rsvpWhatsappNumber?: string;

  // 12. Hadiah Pernikahan (Wedding Gift)
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

  // 13. Ucapan & Doa
  wishesSectionTitle: string;
  wishesSectionSubtitle: string;

  // 14. Penutup (Closing)
  closingText: string;
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

  // 2. Salam & Pembuka
  greetingSalam: "Assalamu'alaikum Warahmatullahi Wabarakatuh",
  greetingOpening: "Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan syukuran pernikahan putra-putri kami:",

  // 3. Kutipan
  quoteText: "Dan di antara tanda-tanda kekuasaan-Nya, Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, agar kamu merasa tenteram kepadanya, dan Dia menjadikan di antara kalian rasa kasih dan sayang.",
  quoteSource: "QS. Ar-Rum : 21",

  // 4. Mempelai Pria
  groomName: "Haris",
  groomFullName: "Muhammad Haris Hariri",
  groomParents: "Putra pertama dari Bpk. Suwandi & Ibu Siti Liumi",
  groomInstagram: "",
  groomAnimationUrl: "",

  // 5. Mempelai Wanita
  brideName: "Febri",
  brideFullName: "Ns. Febriana Nur Ardiani, S. Kep",
  brideParents: "Putri kedua dari Bpk. Sardi (alm) & Ibu Yuliani",
  brideInstagram: "",
  brideAnimationUrl: "",

  // 6. Tanggal Utama
  weddingDate: "21 . 12 . 2026",
  weddingDateFull: "Senin, 21 Desember 2026",

  // 7. Our Story
  storyTitle: "OUR STORY",
  storySubtitle: "Kisah sederhana kami",
  ourStory: "Kami bertemu secara tidak sengaja, namun takdir mempertemukan kami di waktu yang tepat. Dari pertemuan sederhana, tumbuhlah rasa yang semakin kuat hingga akhirnya kami memutuskan untuk melangkah bersama ke jenjang pernikahan.",
  ourStoryAnimationUrl: "",

  // 8. Detail Acara
  eventSectionTitle: "DETAIL ACARA",
  eventSectionSubtitle: "Mohon hadir di hari bahagia kami",
  akadTitle: "Akad Nikah",
  akadDate: "Senin, 21 Desember 2026",
  akadTime: "08.00 WIB",
  akadVenue: "Kediaman Mempelai Wanita",
  akadAddress: "Jl. Melati No. 12, Jakarta",
  resepsiTitle: "Resepsi Pernikahan",
  resepsiDate: "Senin, 21 Desember 2026",
  resepsiTime: "11.00 WIB - Selesai",
  resepsiVenue: "Gedung Serbaguna Melati",
  resepsiAddress: "Jl. Melati No. 12, Jakarta",
  eventDetailAnimationUrl: "",

  // 9. Lokasi
  locationSectionTitle: "LOKASI",
  locationSectionSubtitle: "Lokasi acara pernikahan",
  venueName: "Gedung Serbaguna Melati",
  venueAddress: "Jl. Melati No. 12, Jakarta",
  googleMapsUrl: "https://maps.google.com/?q=Gedung+Serbaguna+Melati+Jakarta",
  googleMapsButtonText: "Buka Google Maps",

  // 10. Galeri Foto
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

  // 11. RSVP
  rsvpSectionTitle: "KONFIRMASI KEHADIRAN",
  rsvpSectionSubtitle: "Mohon konfirmasi kehadiran Anda",
  rsvpNotice: "Kehadiran dan doa restu Anda merupakan kehormatan dan kebahagiaan terbesar bagi kami sekeluarga.",
  rsvpWhatsappNumber: "",

  // 12. Hadiah
  giftSectionTitle: "WEDDING GIFT",
  giftSectionSubtitle: "Tanda kasih & doa restu",
  giftNotice: "Doa restu Anda merupakan karunia terindah bagi kami. Namun jika Anda ingin memberikan tanda kasih, dapat melalui transfer atau kado:",
  bankName: "Bank BCA",
  bankAccountNumber: "1234 5678 9012",
  bankAccountHolder: "Muhammad Haris Hariri",
  bankName2: "Bank Mandiri",
  bankAccountNumber2: "",
  bankAccountHolder2: "",
  giftAddressRecipient: "Haris & Febri",
  giftAddressPhone: "",
  giftAddress: "Jl. Melati No. 12, Jakarta (Gedung Serbaguna Melati)",

  // 13. Ucapan
  wishesSectionTitle: "DOA & UCAPAN",
  wishesSectionSubtitle: "Tulis ucapan dan doa terbaik Anda",

  // 14. Penutup
  closingText: "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kami berdua.",
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
