# Yarn Mates — Landing Page

Landing page untuk **Yarn Mates**, komunitas crochet di Semarang, Jawa Tengah
yang merajut bareng satu Sabtu setiap bulan.

Dibangun dengan **Vue 3 + Vite**, tanpa dependensi UI tambahan, dan siap
di-hosting di **GitHub Pages**.

---

## Jalankan di komputer sendiri

```bash
npm install
npm run dev      # http://localhost:5173
```

Perintah lain:

```bash
npm run build    # hasil build masuk ke dist/
npm run preview  # cek hasil build secara lokal
```

---

## Mengubah isi halaman

Semua teks, tanggal, dan tautan ada di satu file:

**`src/data/content.js`**

| Yang diubah | Bagian di file |
| --- | --- |
| Nama, kota, tahun berdiri | `community` |
| Link WhatsApp / Instagram / email / form RSVP | `links` |
| Angka di hero (jumlah mate, dll) | `stats` |
| Empat poin "kenapa ikut" | `pillars` |
| Jadwal meetup bulanan | `meetups` |
| Langkah "cara ikut" | `flow` |
| Testimoni | `testimonials` |
| Pertanyaan & jawaban | `faqs` |

### Hal yang perlu diganti sebelum publish

Isi berikut masih **contoh** dan harus disesuaikan dengan data komunitas asli:

- Semua nilai di `links` (masih berisi URL placeholder).
- Tanggal, tema, dan lokasi di `meetups`.
- Angka di `stats`.
- Nama dan kutipan di `testimonials`.
- Alamat email di teks `JoinSection.vue` (`hello@yarnmates.id`).

### Menambah meetup bulan berikutnya

Tambahkan satu objek di awal array `meetups` — entri pertama otomatis jadi
kartu besar "Meetup berikutnya" di halaman, sisanya jadi kartu kecil.

```js
{
  theme: 'Nama tema bulan ini',
  date: '2027-02-27',                   // YYYY-MM-DD, dipakai untuk badge tanggal
  dateLabel: 'Sabtu, 27 Februari 2027', // teks yang tampil
  time: '15.00 – 18.00 WIB',
  venue: 'Nama tempat',
  area: 'Kecamatan',
  level: 'Semua level',
  blurb: 'Satu-dua kalimat soal apa yang dikerjakan bulan ini.',
  bring: ['Hook 4 mm', 'Benang katun'],
  status: 'next',
  accent: 'pink',                       // pink | mauve | plum | blush
}
```

### Mengganti warna

Palet ada di `:root` dalam **`src/style.css`**. Temanya pink + krem:

| Token | Dipakai untuk |
| --- | --- |
| `--cream`, `--cream-deep`, `--shell`, `--linen` | latar krem (`--cream-deep` untuk seksi bergaris) |
| `--ink`, `--ink-soft`, `--ink-faint` | teks (cokelat-plum hangat, bukan hitam) |
| `--pink` | pink rose, aksen kartu & ilustrasi |
| `--pink-deep` | tombol utama |
| `--pink-dark` | teks kecil & label di atas krem |
| `--blush` | pink pucat, sorotan dan teks di panel gelap |
| `--mauve`, `--plum` | aksen pink yang lebih kalem / paling gelap |

Garis tepi dan gradasi memakai `rgb(var(--ink-rgb) / 0.1)` dan sejenisnya, jadi
kalau mengganti warna dasar, ubah juga triplet `--ink-rgb`, `--cream-rgb`,
`--cream-deep-rgb`, `--pink-rgb`, dan `--blush-rgb` agar ikut berubah.

Warna ilustrasi crochet ada terpisah di `palettes` dalam
`src/components/YarnMotif.vue` (`blossom`, `petal`, `dusk`, `rosewood`).

### Foto, bukan ilustrasi

Gambar di halaman ini adalah ilustrasi SVG (`src/components/YarnMotif.vue`) —
granny square, bola benang, swatch, dan doily — supaya tidak ada gambar
placeholder yang rusak. Kalau sudah punya foto meetup asli, taruh di `public/`
dan ganti pemakaian `<YarnMotif />` dengan `<img>` di komponen terkait.

---

## Hosting di GitHub Pages

### 1. Push ke GitHub

```bash
git init
git add .
git commit -m "Yarn Mates landing page"
git branch -M main
git remote add origin https://github.com/<username>/yarnmates-landing.git
git push -u origin main
```

### 2. Aktifkan Pages

Di repo GitHub: **Settings → Pages → Build and deployment → Source** pilih
**GitHub Actions**.

### 3. Selesai

Workflow `.github/workflows/deploy.yml` otomatis build dan deploy setiap kali
ada push ke `main`. Bisa juga dijalankan manual dari tab **Actions**.

Situs akan tampil di:

```
https://<username>.github.io/yarnmates-landing/
```

### Kalau nama repo berbeda

Tidak perlu mengubah apa pun. Workflow mengambil nama repo otomatis lewat
`BASE_PATH=/${{ github.event.repository.name }}/`, jadi path aset tetap benar
meski repo di-rename.

Nilai default `/yarnmates-landing/` di `vite.config.js` hanya dipakai saat
build lokal.

### Kalau pakai domain sendiri atau `<username>.github.io`

Base path harus `/`:

1. Di `.github/workflows/deploy.yml`, ganti nilai `BASE_PATH` menjadi `/`.
2. Untuk domain sendiri, tambahkan file `public/CNAME` berisi nama domain
   (satu baris, misal `yarnmates.id`), lalu set domain di **Settings → Pages**.

---

## Struktur proyek

```
.github/workflows/deploy.yml   Workflow build + deploy ke GitHub Pages
public/
  favicon.svg                  Ikon situs
  .nojekyll                    Mencegah GitHub memproses output lewat Jekyll
src/
  components/
    SiteNav.vue                Header sticky + menu seluler
    HeroSection.vue            Bagian pembuka
    AboutSection.vue           Tentang komunitas + empat poin
    MeetupsSection.vue         Agenda meetup bulanan
    FlowSection.vue            Empat langkah cara ikut
    VoicesSection.vue          Testimoni mates
    FaqSection.vue             Akordeon tanya-jawab
    JoinSection.vue            Ajakan gabung
    SiteFooter.vue             Footer
    AppIcon.vue                Ikon garis (SVG inline)
    YarnMotif.vue              Ilustrasi crochet (SVG inline)
  data/content.js              SEMUA teks & data halaman
  directives/reveal.js         Animasi muncul saat di-scroll
  style.css                    Token desain & gaya global
  App.vue                      Susunan bagian halaman
  main.js                      Entry point
vite.config.js                 Konfigurasi Vite + base path Pages
```

---

## Catatan aksesibilitas

- Navigasi lengkap lewat keyboard, dengan skip link ke konten utama.
- Akordeon FAQ memakai `aria-expanded` / `aria-controls`.
- Semua animasi dimatikan otomatis bila pengunjung mengaktifkan
  *prefers-reduced-motion*.
- Layout dirancang turun rapi sampai lebar ~360px (satu kolom di ponsel).
