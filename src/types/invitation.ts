export interface ComicDialogues {
  panel1: string;
  panel2: string;
  panel3: string;
  panel4: string;
}

export interface InvitationData {
  groomName: string;
  groomFullName: string;
  groomParents: string;
  groomInstagram?: string;
  brideName: string;
  brideFullName: string;
  brideParents: string;
  brideInstagram?: string;
  weddingDate: string;
  weddingDateFull: string;
  akadTime: string;
  resepsiTime: string;
  venueName: string;
  venueAddress: string;
  googleMapsUrl: string;
  quoteText: string;
  quoteSource: string;
  ourStory: string;
  comicDialogues: ComicDialogues;
  bankName: string;
  bankAccountNumber: string;
  bankAccountHolder: string;
}

export const defaultInvitationData: InvitationData = {
  groomName: "Andi",
  groomFullName: "Andi Pratama, S.Kom",
  groomParents: "Putra pertama dari Bpk. Bambang Wijaya & Ibu Siti Aminah",
  groomInstagram: "andipratama",
  brideName: "Sinta",
  brideFullName: "Sinta Dewi, S.E",
  brideParents: "Putri kedua dari Bpk. Hendra Gunawan & Ibu Ratna Sari",
  brideInstagram: "sintadewi",
  weddingDate: "20 . 12 . 2026",
  weddingDateFull: "Minggu, 20 Desember 2026",
  akadTime: "08.00 WIB",
  resepsiTime: "11.00 WIB",
  venueName: "Gedung Serbaguna Melati",
  venueAddress: "Jl. Melati No. 12, Jakarta",
  googleMapsUrl: "https://maps.google.com/?q=Gedung+Serbaguna+Melati+Jakarta",
  quoteText:
    "Dan di antara tanda-tanda kekuasaan-Nya, Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, agar kamu merasa tenteram kepadanya, dan Dia menjadikan di antara kalian rasa kasih dan sayang.",
  quoteSource: "QS. Ar-Rum : 21",
  ourStory:
    "Kami bertemu secara tidak sengaja, namun takdir mempertemukan kami di waktu yang tepat. Dari pertemuan sederhana, tumbuhlah rasa yang semakin kuat hingga akhirnya kami memutuskan untuk melangkah bersama ke jenjang pernikahan.",
  comicDialogues: {
    panel1: "Eh, kamu tanggal 20 kosong nggak?",
    panel2: "Kosong sih. Kenapa?",
    panel3: "Ada acara penting.",
    panel4: "Nikahan gue.",
  },
  bankName: "Bank BCA",
  bankAccountNumber: "1234 5678 9012",
  bankAccountHolder: "Andi & Sinta",
};
