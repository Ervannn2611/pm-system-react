# Sistem Manajemen Proyek Sederhana (Frontend)

Ini adalah proyek frontend dari aplikasi **Sistem Manajemen Proyek Sederhana**. Aplikasi ini dibangun menggunakan **React.js** dan terhubung ke backend melalui RESTful API. Tujuannya adalah membantu individu atau tim kecil dalam mengelola proyek dan tugas.



##  Teknologi yang Digunakan

- **React.js** (Frontend framework)
- **Axios** (Untuk HTTP request)
- **React Router DOM** (Untuk navigasi/route)
- **Tailwind CSS / Flowbite** *(opsional)* untuk styling UI
- **RESTful API** (berkomunikasi dengan backend FastAPI/Django/Flask)
  
---

##  Struktur Folder

src/
│
├── components/ # Komponen UI (Navbar, Sidebar, ProjectCard, etc.)
├── pages/ # Halaman aplikasi (Login, Register, Dashboard, etc.)
├── services/ # File untuk request ke API (authService, projectService, taskService)
├── App.jsx # Routing utama aplikasi
├── main.jsx # Entry point React
└── utils/ # Fungsi utilitas (misal: auth helpers)



##  Cara Menjalankan Aplikasi

1. **Clone repository ini**


git clone https://github.com/usernamInstall dependensi

bash
Copy
Edit
npm install
Jalankan aplikasi

bash
Copy
Edit
npm run dev
Frontend akan berjalan di http://localhost:5173 (atau port default Vite Anda).

 Alur Autentikasi
Register → Pengguna membuat akun baru

Login → Mendapatkan token JWT dari backend

Logout → Menghapus token dari localStorage

Semua halaman dilindungi menggunakan route guard (PrivateRoute) kecuali halaman login & register.

 Alur Navigasi Aplikasi
1.  Autentikasi Pengguna
/register → Form pendaftaran

/login → Form login

Token JWT disimpan di localStorage

2.  Dashboard Proyek
/dashboard → Menampilkan semua proyek pengguna

Tombol untuk membuat proyek baru

Klik proyek → detail dan daftar tugas

3.  Detail Proyek
/projects/:projectId

Tampilkan nama, deskripsi proyek

Daftar tugas

Tambah/edit/hapus proyek dan tugas

4.  Manajemen Tugas
Tambah tugas dalam proyek

Edit tugas (nama, deskripsi, deadline)

Ubah status (To Do, In Progress, Done)

Hapus tugas

-Fitur yang Tersedia
 Register, Login, Logout

 CRUD Proyek

 CRUD Tugas per Proyek

 Ubah status tugas

 Proteksi route berdasarkan autentikasi

 Validasi form dan feedback error dari backend

 TODO / Pengembangan Selanjutnya
 Filter dan pencarian proyek/tugas

 Upload lampiran untuk tugas

 Notifikasi deadline mendekat

 Responsif untuk mobile

 API Backend
Pastikan backend telah berjalan di http://localhost:8000 (atau URL yang sesuai).

Contoh endpoint yang digunakan:

Endpoint	Method	Deskripsi
/api/register	POST	Registrasi pengguna
/api/login	POST	Login dan token JWT
/api/projects	GET/POST	Ambil/buat proyek
/api/projects/:id	GET/PUT/DELETE	Detail/edit/hapus proyek
/api/projects/:id/tasks	GET/POST	Daftar/tambah tugas
/api/tasks/:id	GET/PUT/DELETE	Detail/edit/hapus tugas

 Kontribusi
Pull request dan saran pengembangan sangat diterima. Silakan fork repo ini dan ajukan perubahan Anda.

 Lisensi
Proyek ini dilisensikan di bawah MIT License.
frontend-sistem-manajemen-proyek.git
cd frontend-sistem-manajemen-proyek
