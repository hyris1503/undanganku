import { useState } from 'react';
import { Copy, Check, Code, X } from 'lucide-react';
import { InvitationData, defaultInvitationData } from '../types/invitation';

interface HtmlCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  data?: InvitationData;
}

export function HtmlCodeModal({ isOpen, onClose, data }: HtmlCodeModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const d = data || defaultInvitationData;

  const rawHtmlCode = `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>The Wedding of ${d.groomName} & ${d.brideName}</title>
    <!-- Google Fonts: Patrick Hand, Nunito -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Patrick+Hand&family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet">
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Nunito', sans-serif; background-color: #f7f3ec; color: #2c2c2c; line-height: 1.6; }
        h1, h2, h3, .font-hand { font-family: 'Patrick Hand', cursive, sans-serif; }
        .container { max-width: 600px; margin: 0 auto; background: #f8f5ee; border-left: 2px solid #2e2e2e; border-right: 2px solid #2e2e2e; min-height: 100vh; padding-bottom: 70px; }
        
        /* Browser Mockup Window */
        .browser-mockup { background: #24292e; border-radius: 12px 12px 0 0; padding: 10px 16px; display: flex; align-items: center; justify-content: space-between; border: 2px solid #2e2e2e; border-bottom: none; }
        .dots { display: flex; gap: 6px; }
        .dot { width: 12px; height: 12px; border-radius: 50%; }
        .dot-red { background: #ff5f56; }
        .dot-yellow { background: #ffbd2e; }
        .dot-green { background: #27c93f; }
        .url-bar { background: #171b1d; color: #bbb; padding: 4px 16px; border-radius: 6px; font-size: 12px; font-family: monospace; }

        /* Comic Panel Grid */
        .comic-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin: 16px 0; }
        .comic-panel { background: #fff; border: 2px solid #2e2e2e; border-radius: 8px; padding: 12px; min-height: 110px; position: relative; }
        .speech-bubble { background: #fff; border: 2px solid #2e2e2e; border-radius: 16px; padding: 6px 10px; font-size: 12px; font-weight: bold; font-family: 'Patrick Hand', cursive; display: inline-block; margin-bottom: 8px; }

        .card { background: #fffdfa; border: 2px solid #2e2e2e; border-radius: 12px; padding: 16px; margin: 16px 0; box-shadow: 2px 3px 0px rgba(0,0,0,0.06); }
        .btn { display: inline-block; background: #2d3136; color: #fff; padding: 10px 24px; border-radius: 9999px; text-decoration: none; font-weight: bold; font-family: 'Patrick Hand', cursive; border: 2px solid #2e2e2e; cursor: pointer; }
        .btn:hover { background: #1a1c1e; }
        
        /* Bottom Nav */
        .bottom-nav { position: fixed; bottom: 0; left: 50%; transform: translateX(-50%); width: 100%; max-width: 600px; background: rgba(250, 246, 238, 0.96); border-top: 2px solid #2e2e2e; display: flex; justify-content: space-around; padding: 10px 0; z-index: 50; }
        .nav-item { text-align: center; color: #333; text-decoration: none; font-size: 12px; font-family: 'Patrick Hand', cursive; font-weight: bold; }
    </style>
</head>
<body>

    <!-- CONTAINER UTAMA -->
    <div class="container">
        
        <!-- FOTO 1: SAMPUL KOMIK BROWSER -->
        <section style="padding: 16px 16px 0;">
            <div class="browser-mockup">
                <div class="dots">
                    <span class="dot dot-red"></span>
                    <span class="dot dot-yellow"></span>
                    <span class="dot dot-green"></span>
                </div>
                <div class="url-bar">undanganku.com/${d.groomName.toLowerCase()}-${d.brideName.toLowerCase()}</div>
                <div>🔒</div>
            </div>

            <div class="card" style="margin-top: 0; border-top: none; border-radius: 0 0 12px 12px; background: #faf6ee;">
                <!-- 4 Panel Comic -->
                <div class="comic-grid">
                    <div class="comic-panel">
                        <div class="speech-bubble">${d.comicDialogues.panel1}</div>
                    </div>
                    <div class="comic-panel">
                        <div class="speech-bubble">${d.comicDialogues.panel2}</div>
                    </div>
                    <div class="comic-panel">
                        <div class="speech-bubble">${d.comicDialogues.panel3}</div>
                    </div>
                    <div class="comic-panel">
                        <div class="speech-bubble">${d.comicDialogues.panel4}</div>
                    </div>
                </div>

                <div style="text-align: center; margin-top: 16px;">
                    <a href="#acara" class="btn">Lihat Undangan</a>
                </div>
            </div>
        </section>

        <!-- ELEMEN HEADER: The Wedding of ${d.groomName} & ${d.brideName} -->
        <header style="text-align: center; padding: 30px 20px 10px;">
            <p class="font-hand" style="font-size: 14px; font-weight: bold; letter-spacing: 2px;">THE WEDDING OF</p>
            <h1 style="font-size: 40px; margin: 6px 0;">\\ - ${d.groomName.toUpperCase()} & ${d.brideName.toUpperCase()} - //</h1>
            <p style="font-size: 20px;">❤️</p>
            <p class="font-hand" style="font-size: 18px; font-weight: bold; margin-top: 6px;">${d.weddingDate}</p>

            <!-- Ayat / Quote -->
            <div class="card" style="background: #f4ece1; margin-top: 20px; text-align: center; font-style: italic;">
                <p>&ldquo;${d.quoteText}&rdquo;</p>
                <p style="font-weight: bold; margin-top: 8px; font-style: normal;">(${d.quoteSource})</p>
            </div>
        </header>

        <!-- ELEMEN MAIN: KONTEN UTAMA UNDANGAN (FOTO 2) -->
        <main style="padding: 10px 20px;">
            
            <!-- SECTION 0: KEDUA MEMPELAI -->
            <section id="mempelai" style="margin: 24px 0; text-align: center;">
                <h2 style="font-size: 22px;">\\ - KEDUA MEMPELAI - //</h2>
                <p class="font-hand" style="color: #666; font-size: 13px; margin-bottom: 16px;">Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan pernikahan putra-putri kami:</p>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                    <!-- Mempelai Pria -->
                    <div class="card" style="text-align: center;">
                        <p style="font-size: 11px; background: #2d3136; color: #fde68a; border-radius: 9999px; padding: 2px 8px; display: inline-block; margin-bottom: 8px;">Mempelai Pria</p>
                        <h3 style="font-size: 18px; margin: 4px 0;">${d.groomFullName}</h3>
                        <p style="font-size: 12px; color: #555;">${d.groomParents}</p>
                        ${d.groomInstagram ? `<p style="margin-top: 6px; font-size: 12px;"><a href="https://instagram.com/${d.groomInstagram.replace('@', '')}" target="_blank" style="color: #333; text-decoration: none; font-weight: bold;">📷 @${d.groomInstagram.replace('@', '')}</a></p>` : ''}
                    </div>
                    <!-- Mempelai Wanita -->
                    <div class="card" style="text-align: center;">
                        <p style="font-size: 11px; background: #2d3136; color: #fde68a; border-radius: 9999px; padding: 2px 8px; display: inline-block; margin-bottom: 8px;">Mempelai Wanita</p>
                        <h3 style="font-size: 18px; margin: 4px 0;">${d.brideFullName}</h3>
                        <p style="font-size: 12px; color: #555;">${d.brideParents}</p>
                        ${d.brideInstagram ? `<p style="margin-top: 6px; font-size: 12px;"><a href="https://instagram.com/${d.brideInstagram.replace('@', '')}" target="_blank" style="color: #333; text-decoration: none; font-weight: bold;">📷 @${d.brideInstagram.replace('@', '')}</a></p>` : ''}
                    </div>
                </div>
            </section>

            <!-- SECTION 1: OUR STORY -->
            <section id="story" style="margin: 24px 0; text-align: center;">
                <h2 style="font-size: 22px;">\\ - OUR STORY - //</h2>
                <p class="font-hand" style="color: #666; font-size: 13px;">Kisah sederhana kami</p>
                <div class="card" style="text-align: center;">
                    <h3 style="font-size: 20px; margin-bottom: 8px;">${d.groomName} & ${d.brideName}</h3>
                    <p>${d.ourStory}</p>
                </div>
            </section>

            <!-- SECTION 2: DETAIL ACARA -->
            <section id="acara" style="margin: 24px 0;">
                <h2 style="text-align: center; font-size: 22px;">\\ - DETAIL ACARA - //</h2>
                <p class="font-hand" style="text-align: center; color: #666; font-size: 13px; margin-bottom: 12px;">Mohon hadir di hari bahagia kami</p>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                    <!-- Akad Nikah -->
                    <div class="card">
                        <h3 style="text-align: center; margin-bottom: 8px;">💍 Akad Nikah</h3>
                        <p><strong>Hari, Tanggal:</strong> ${d.weddingDate}</p>
                        <p><strong>Waktu:</strong> ${d.akadTime}</p>
                        <p><strong>Tempat:</strong> ${d.venueName}</p>
                    </div>
                    <!-- Resepsi -->
                    <div class="card">
                        <h3 style="text-align: center; margin-bottom: 8px;">🥂 Resepsi</h3>
                        <p><strong>Hari, Tanggal:</strong> ${d.weddingDate}</p>
                        <p><strong>Waktu:</strong> ${d.resepsiTime}</p>
                        <p><strong>Tempat:</strong> ${d.venueName}</p>
                    </div>
                </div>
            </section>

            <!-- SECTION 3: LOKASI -->
            <section id="lokasi" style="margin: 24px 0;">
                <h2 style="text-align: center; font-size: 22px;">\\ - LOKASI - //</h2>
                <div class="card" style="text-align: center;">
                    <h3 style="font-size: 18px;">${d.venueName}</h3>
                    <p style="color: #666; font-size: 14px; margin: 4px 0 14px;">${d.venueAddress}</p>
                    <a href="${d.googleMapsUrl}" target="_blank" class="btn" style="font-size: 14px; padding: 6px 18px;">📍 Buka Google Maps</a>
                </div>
            </section>

            <!-- SECTION 4: GALERI FOTO -->
            <section id="galeri" style="margin: 24px 0;">
                <h2 style="text-align: center; font-size: 22px;">\\ - GALERI FOTO - //</h2>
                <p class="font-hand" style="text-align: center; color: #666; font-size: 13px; margin-bottom: 12px;">Momen-momen indah kami</p>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                    <div class="card" style="text-align: center; padding: 30px 10px; background: #fff;">📸 Foto Kenangan 1</div>
                    <div class="card" style="text-align: center; padding: 30px 10px; background: #fff;">📸 Foto Kenangan 2</div>
                    <div class="card" style="text-align: center; padding: 30px 10px; background: #fff;">📸 Foto Kenangan 3</div>
                    <div class="card" style="text-align: center; padding: 30px 10px; background: #fff;">📸 Foto Kenangan 4</div>
                </div>
            </section>

            <!-- SECTION 5: KONFIRMASI KEHADIRAN (RSVP) -->
            <section id="rsvp" style="margin: 24px 0;">
                <h2 style="text-align: center; font-size: 22px;">\\ - KONFIRMASI KEHADIRAN - //</h2>
                <div class="card">
                    <form onsubmit="alert('Konfirmasi kehadiran terkirim!'); return false;">
                        <div style="margin-bottom: 12px;">
                            <label style="font-weight: bold; display: block; margin-bottom: 4px;">Nama Anda:</label>
                            <input type="text" required placeholder="Masukkan nama..." style="width: 100%; padding: 8px 12px; border: 2px solid #aaa; border-radius: 8px;">
                        </div>
                        <div style="margin-bottom: 12px;">
                            <label style="font-weight: bold; display: block; margin-bottom: 4px;">Konfirmasi:</label>
                            <label><input type="radio" name="hadir" value="yes" checked> Bisa hadir</label> &nbsp;&nbsp;
                            <label><input type="radio" name="hadir" value="no"> Tidak bisa</label>
                        </div>
                        <button type="submit" class="btn" style="width: 100%;">Kirim Konfirmasi</button>
                    </form>
                </div>
            </section>

            <!-- SECTION 6: UCAPAN & DOA -->
            <section id="ucapan" style="margin: 24px 0;">
                <h2 style="text-align: center; font-size: 22px;">\\ - UCAPAN & DOA - //</h2>
                <div class="card">
                    <div style="display: flex; gap: 8px; margin-bottom: 12px;">
                        <input type="text" placeholder="Tulis pesan Anda di sini..." style="flex: 1; padding: 8px 12px; border: 2px solid #aaa; border-radius: 8px;">
                        <button class="btn" style="padding: 8px 16px;">Kirim</button>
                    </div>
                    <div class="card" style="margin: 6px 0; font-size: 13px;">
                        <p>"Selamat yaa ${d.groomName} & ${d.brideName}! Semoga selalu bahagia bersama ❤️" - <strong>Rima</strong></p>
                    </div>
                </div>
            </section>

            <!-- SECTION 7: KADO PERNIKAHAN -->
            <section id="gift" style="margin: 24px 0;">
                <h2 style="text-align: center; font-size: 22px;">\\ - KADO PERNIKAHAN - //</h2>
                <div class="card" style="text-align: center;">
                    <p><strong>Transfer ${d.bankName}</strong></p>
                    <p style="font-family: monospace; font-size: 16px; margin: 8px 0;">${d.bankAccountNumber}</p>
                    <p style="font-size: 13px; color: #666;">a.n. ${d.bankAccountHolder}</p>
                </div>
            </section>

        </main>

        <!-- ELEMEN FOOTER -->
        <footer style="text-align: center; padding: 30px 20px 10px;">
            <p style="font-size: 14px; color: #555;">Terima kasih atas doa dan restu yang telah diberikan</p>
            <h3 style="font-size: 20px; margin-top: 6px;">${d.groomName} & ${d.brideName}</h3>
            <p>❤️</p>
        </footer>

    </div>

    <!-- BOTTOM NAVIGATION -->
    <nav class="bottom-nav">
        <a href="#" class="nav-item">🏠<br>Home</a>
        <a href="#mempelai" class="nav-item">💑<br>Mempelai</a>
        <a href="#acara" class="nav-item">📅<br>Acara</a>
        <a href="#lokasi" class="nav-item">📍<br>Lokasi</a>
        <a href="#rsvp" class="nav-item">✉️<br>RSVP</a>
        <a href="#gift" class="nav-item">🎁<br>Gift</a>
    </nav>

</body>
</html>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(rawHtmlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 z-50 animate-in fade-in">
      <div className="bg-stone-900 border-2 border-stone-700 rounded-2xl w-full max-w-3xl max-h-[88vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-stone-700 bg-stone-950">
          <div className="flex items-center gap-2 text-stone-200">
            <Code className="w-5 h-5 text-amber-400" />
            <h3 className="font-mono text-sm font-bold">Kode HTML Lengkap (head, body, header, main)</h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyToClipboard}
              className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Tersalin!' : 'Salin Kode HTML'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-md text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Code Content */}
        <div className="p-4 overflow-y-auto flex-1 bg-stone-950 font-mono text-xs text-stone-300 leading-relaxed">
          <pre className="overflow-x-auto whitespace-pre">
            <code>{rawHtmlCode}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
