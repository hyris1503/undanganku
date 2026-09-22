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
  showBrowserMockup?: boolean;
}

export const defaultInvitationData: InvitationData = {
  groomName: "Haris",
  groomFullName: "Muhammad Haris Hariri",
  groomParents: "Putra pertama dari Bpk. Suwandi & Ibu Siti Liumi",
  groomInstagram: "--",
  brideName: "Febri",
  brideFullName: "Ns.Febriana Nur Ardiani, S. Kep",
  brideParents: "Putri kedua dari Bpk. Sardi (alm) & Ibu yuliani",
  brideInstagram: "",
  weddingDate: "21 . 12 . 2026",
  weddingDateFull: "senin, 21 Desember 2026",
  akadTime: "08.00 WIB",
  resepsiTime: "until die",
  venueName: "Gedung Serbaguna Melati",
  venueAddress: "Jl. Melati No. 12, Jakarta",
  googleMapsUrl: "https://maps.google.com/?q=Gedung+Serbaguna+Melati+Jakarta",
  quoteText:
    "Dan di antara tanda-tanda kekuasaan-Nya, Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, agar kamu merasa tenteram kepadanya, dan Dia menjadikan di antara kalian rasa kasih dan sayang.",
  quoteSource: "QS. Ar-Rum : 21",
  ourStory:
    "Kami bertemu secara tidak sengaja, namun takdir mempertemukan kami di waktu yang tepat. Dari pertemuan sederhana, tumbuhlah rasa yang semakin kuat hingga akhirnya kami memutuskan untuk melangkah bersama ke jenjang pernikahan.",
  comicDialogues: {
    panel1: "munduran dikit bisa mba?",
    panel2: "iya Kenapa mas?",
    panel3: "cantik e kelewatan.",
    panel4: "Nikah yuk mas.",
  },
  bankName: "Bank BCA",
  bankAccountNumber: "1234 5678 9012",
  bankAccountHolder: "Andi & Sinta",
};
