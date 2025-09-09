# README.md for Tugas 2
Raden Pandji Mohammad Dimaz Bagus Hayyii Dausti Surya - 2406439343 - PBP C

## TAUTAN: https://raden-pandji-radkicks.pbp.cs.ui.ac.id

## JAWABAN DARI PERTANYAAN TUGAS 2
### 1) Jelaskan bagaimana cara kamu mengimplementasikan checklist di atas secara step-by-step (bukan hanya sekadar mengikuti tutorial).
Saya membuat folder baru dengan nama radkicks. Lalu, saya membuat dan menjalankan virtual environment di dalam folder tersebut dengan perintah _python -m venv env_ dan saya mengaktifkannya menggunakan _env\Scripts\activate_. Setelah itu, saya membuat file requirements.txt dan saya mengisi dependencies yang dibutuhkan. Kemudian, saya menginstall dependencies tersebut dengan menjalankan perintah _pip install -r requirements.txt_. Selanjutnya, saya membuat proyek Django baru dengan perintah _django-admin startproject radkicks_. 

Saya membuat file .env untuk konfigurasi deployment lokal (menggunakan database SQLite sederhana untuk testing) dan saya membuat file .env.prod untuk deployment production (menggunakan database PostgreSQL). Saya memodifikasi file settings.py agar dapat menggunakan environment variables dari file .env yang sudah saya buat. Lalu, saya menambahkan "localhost" dan "127.0.0.1" pada list ALLOWED_HOSTS. Saya juga menambahkan konfigurasi PRODUCTION serta saya memodifikasi kode DATABASES di settings.py agar bisa beralih antara SQLite untuk pengembangan lokal dan PostgreSQL untuk production. Setelah itu, saya menjalankan migrasi database dengan perintah _python manage.py migrate_, lalu saya menjalankan server Django menggunakan _python manage.py runserver_.

Selanjutnya, saya membuat repository Git baru dengan nama radkicks, kemudian saya membuat file .gitignore untuk menyimpan daftar file yang perlu diabaikan Git. Saya menghubungkan repository lokal ke GitHub, saya membuat branch utama master, lalu saya melakukan commit dan push. Setelah itu, saya membuat project baru di website PWS dan saya mengganti environment project tersebut sesuai dengan isi dari file .env.prod yang sudah saya buat di directory lokal. Saya menambahkan domain "raden-pandji-radkicks.pbp.cs.ui.ac.id" ke dalam ALLOWED_HOSTS di settings.py untuk konfigurasi URL deployment website. Saya menyimpan perubahan tersebut dengan melakukan add, commit, dan push.

Kemudian, saya menjalankan perintah dari Project Command yaitu _git remote add pws_, _git branch -M master_, dan _git push pws master_ untuk melakukan deployment ke PWS. Karena saya sempat gagal autentikasi, saya menjalankan git remote set-url pws https://pbp.cs.ui.ac.id/raden.pandji/radkicks (sesuai saran teman). Setelah itu, saya menjalankan kembali perintah Project Command dan saya memasukkan credentials username serta password dari website PWS untuk menyelesaikan deployment.

Saya membuat aplikasi baru dengan nama main menggunakan perintah python manage.py startapp main pada terminal. Setelah itu, saya menambahkan aplikasi main tersebut ke dalam proyek onif-sportswear dengan menambahkan elemen 'main' pada daftar INSTALLED_APPS di file konfigurasi settings.py. Selanjutnya, saya membuat directory templates di dalam aplikasi main dan membuat berkas main.html di dalamnya. Pada file HTML tersebut, saya mengisi konten dengan nama RADKICKS, nama pribadi, NPM, dan kelas PBP.

Kemudian, saya mengubah file models.py pada aplikasi main dengan membuat class Product yang memiliki atribut-atribut seperti name (CharField), brand (CharField), description (TextField), category (CharField), thumbnail (URLField), price (PositiveIntegerField), is_featured (BooleanField), stock (IntegerField) rating (FloatField), brand (CharField), dan size (CharField). Setelah itu, saya melakukan migrasi model dengan menjalankan perintah python manage.py makemigrations dan python manage.py migrate.

Saya juga menghubungkan file views.py dengan template main.html. Pertama, saya mengimpor fungsi render dari django.shortcuts. Lalu, saya menambahkan fungsi show_main dengan parameter request dan sebuah dictionary berisi NPM, nama, dan kelas. Fungsi tersebut saya atur agar me-return render(request, "main.html", context) sehingga dapat menampilkan halaman main.html sesuai context. Pada bagian template, saya memodifikasi file main.html dengan menambahkan {{ npm }}, {{ name }}, dan {{ class }} untuk menampilkan data dari context.

Setelah itu, saya mengkonfigurasi routing URL aplikasi dengan membuat file urls.py di dalam aplikasi main. Di dalamnya, saya menambahkan import path dari django.urls, import fungsi show_main dari main.views, membuat variabel app_name dengan string 'main', dan membuat list urlpatterns yang berisi path('', show_main, name='show_main'). Selanjutnya, saya mengkonfigurasi routing URL proyek dengan memodifikasi file urls.py di directory project. Di sana saya mengimpor fungsi include dari django.urls menggunakan from django.urls import path, include, lalu saya menambahkan rute URL path('', include('main.urls')) pada urlpatterns untuk memetakan rute aplikasi main.

Terakhir, saya melakukan git add, commit, dan push kode ke GitHub, kemudian saya melakukan push ke PWS kembali untuk memperbarui kode pada website PWS.

### 2) Buatlah bagan yang berisi request client ke web aplikasi berbasis Django beserta responnya dan jelaskan pada bagan tersebut kaitan antara urls.py, views.py, models.py, dan berkas html.
<img width="798" height="935" alt="image" src="https://github.com/user-attachments/assets/7dc5dda9-b71a-42d6-b783-578a06c7eae5" />
Alur request–response pada Django dimulai ketika seorang pengguna melakukan request dari browser, lalu request tersebut diteruskan ke web server seperti Nginx atau Apache. Selanjutnya, web server akan meneruskan request ke WSGI (Web Server Gateway Interface), misalnya Gunicorn atau wsgi.py, yang berfungsi sebagai jembatan antara web server dengan aplikasi Django. Setelah itu, request masuk ke middleware pada sisi Django, yaitu serangkaian komponen yang bertugas memproses request sebelum mencapai view atau memproses response sebelum dikembalikan ke client.

Tahap berikutnya adalah URL resolution, di mana Django akan mencocokkan URL yang diminta melalui urls.py untuk menemukan fungsi view yang sesuai. Setelah URL ditemukan, fungsi pada views.py akan dieksekusi. Pada tahap ini, middleware juga dapat ikut memproses response dari view sebelum diteruskan. Jika view membutuhkan data, maka view akan berinteraksi dengan models.py dan melalui managers akan mengakses database (misalnya PostgreSQL).

Setelah data diperoleh, view akan menyiapkan response, yang biasanya berupa rendering file template HTML atau data lain seperti JSON dalam kasus API. Kemudian, response dapat kembali diproses oleh template middleware, sebelum diteruskan lagi. Apabila terjadi error, maka request akan ditangani oleh exception middleware untuk menampilkan pesan error yang sesuai.

Akhirnya, response akan melalui response middleware, lalu dikirim kembali ke WSGI, diteruskan ke web server, dan sampai pada browser client untuk ditampilkan kepada pengguna.
##### Praseesh P. (2024) Django Request-Response Cycle Explained. [Article]. Medium. https://medium.com/@praseeshprasee/django-request-response-cycle-explained-e3d707eed99c

### 3) Jelaskan peran settings.py dalam proyek Django!
settings.py berperan sebagai file utama untuk melakukan konfigurasi proyek Django yang ingin kita buat. Beberapa jenis konfigurasi yang dapat dilakukan adalah sebagai berikut.
- Security: SECRET_KEY, DEBUG, ALLOWED_HOSTS, CSRF_TRUSTED_ORIGINS.
- Aplikasi: INSTALLED_APPS.
- Middleware : MIDDLEWARE.
- Template & static files: TEMPLATES['DIRS'], STATIC_URL, STATICFILES_DIRS, STATIC_ROOT, MEDIA_URL, MEDIA_ROOT.
- Database: DATABASES (SQLite/PostgreSQL/MySQL)
- Internasionalisasi: LANGUAGE_CODE, TIME_ZONE, USE_TZ.
- Validasi password: AUTH_PASSWORD_VALIDATORS

Sebagai contoh, beberapa konfigurasi yang dilakukan pada pembuatan Django project football shop ini adalah dengan menambahkan string-string domain seperti 'localhost' pada ALLOWED_HOSTS ataupun menambahkan aplikasi yang dibuat seperti 'main' pada INSTALLED_APPS.

### 4) Bagaimana cara kerja migrasi database di Django?
Migrasi adalah proses atau instruksi yang digunakan untuk mengubah struktur database sesuai dengan perubahan yang dibuat pada model di dalam kode terbaru. Proses ini dimulai dengan memodifikasi file models.py untuk menambahkan, mengubah, atau menghapus atribut pada model. Setelah itu, dijalankan perintah _python manage.py makemigrations_ pada terminal. Perintah ini akan membuat file migrasi yang berisi instruksi perubahan, namun belum langsung diterapkan pada database. Langkah terakhir adalah menjalankan perintah _python manage.py migrate_, yang berfungsi untuk benar-benar menerapkan migrasi tersebut sehingga perubahan pada model dapat tercermin di dalam database.

### 5) Menurut Anda, dari semua framework yang ada, mengapa framework Django dijadikan permulaan pembelajaran pengembangan perangkat lunak?
Menurut pendapat saya, Django merupakan framework yang tepat untuk memulai pembelajaran pengembangan perangkat lunak karena menggunakan struktur yang mudah dipahami, yakni konsep MVT (Model, View, Template). Bagi saya, pola ini memudahkan dalam menulis kode yang lebih mudah dibaca, terstruktur, serta dapat dikembangkan lebih lanjut untuk proyek atau aplikasi di masa depan. Selain itu, alasan lainnya adalah karena Django berbasis pada bahasa pemrograman Python yang sintaksnya sederhana dan sudah cukup familiar, mengetahui kita menggunakannya pada mata kuliah DDP 1 saat semester satu kemarin.

### 6) Apakah ada feedback untuk asisten dosen tutorial 1 yang telah kamu kerjakan sebelumnya?
Saya rasa, asisten dosen sangat membantu mahasiswa yang membutuhkan bantuan mereka. Dengan mereka standby di discord atau kelas saat jam lab, mahasiswa tidak perlu khawatir jika mereka melakukan kesalahan atau kebingungan.
