Raden Pandji Mohammad Dimaz Bagus Hayyii Dausti Surya - 2406439343 - PBP C

# README.md for Tugas 2

## TAUTAN: https://raden-pandji-radkicks.pbp.cs.ui.ac.id

## JAWABAN DARI PERTANYAAN TUGAS 2
### 1) Jelaskan bagaimana cara kamu mengimplementasikan checklist di atas secara step-by-step (bukan hanya sekadar mengikuti tutorial).
Saya membuat folder baru dengan nama radkicks. Lalu, saya membuat dan menjalankan virtual environment di dalam folder tersebut dengan perintah _python -m venv env_ dan saya mengaktifkannya menggunakan _env\Scripts\activate_. Setelah itu, saya membuat file requirements.txt dan saya mengisi dependencies yang dibutuhkan. Kemudian, saya menginstall dependencies tersebut dengan menjalankan perintah _pip install -r requirements.txt_. Selanjutnya, saya membuat proyek Django baru dengan perintah _django-admin startproject radkicks_. 

Saya membuat file .env untuk konfigurasi deployment lokal (menggunakan database SQLite sederhana untuk testing) dan saya membuat file .env.prod untuk deployment production (menggunakan database PostgreSQL). Saya memodifikasi file settings.py agar dapat menggunakan environment variables dari file .env yang sudah saya buat. Lalu, saya menambahkan "localhost" dan "127.0.0.1" pada list ALLOWED_HOSTS. Saya juga menambahkan konfigurasi PRODUCTION serta saya memodifikasi kode DATABASES di settings.py agar bisa beralih antara SQLite untuk pengembangan lokal dan PostgreSQL untuk production. Setelah itu, saya menjalankan migrasi database dengan perintah _python manage.py migrate_, lalu saya menjalankan server Django menggunakan _python manage.py runserver_.

Selanjutnya, saya membuat repository Git baru dengan nama radkicks, kemudian saya membuat file .gitignore untuk menyimpan daftar file yang perlu diabaikan Git. Saya menghubungkan repository lokal ke GitHub, saya membuat branch utama master, lalu saya melakukan commit dan push. Setelah itu, saya membuat project baru di website PWS dan saya mengganti environment project tersebut sesuai dengan isi dari file .env.prod yang sudah saya buat di directory lokal. Saya menambahkan domain "raden-pandji-radkicks.pbp.cs.ui.ac.id" ke dalam ALLOWED_HOSTS di settings.py untuk konfigurasi URL deployment website. Saya menyimpan perubahan tersebut dengan melakukan add, commit, dan push.

Kemudian, saya menjalankan perintah dari Project Command yaitu _git remote add pws_, _git branch -M master_, dan _git push pws master_ untuk melakukan deployment ke PWS. Karena saya sempat gagal autentikasi, saya menjalankan git remote set-url pws https://pbp.cs.ui.ac.id/raden.pandji/radkicks (sesuai saran teman). Setelah itu, saya menjalankan kembali perintah Project Command dan saya memasukkan credentials username serta password dari website PWS untuk menyelesaikan deployment.

Saya membuat aplikasi baru dengan nama main menggunakan perintah python manage.py startapp main pada terminal. Setelah itu, saya menambahkan aplikasi main tersebut ke dalam proyek radkicks dengan menambahkan elemen 'main' pada daftar INSTALLED_APPS di file konfigurasi settings.py. Selanjutnya, saya membuat directory templates di dalam aplikasi main dan membuat berkas main.html di dalamnya. Pada file HTML tersebut, saya mengisi konten dengan nama RADKICKS, nama pribadi, NPM, dan kelas PBP.

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
###### source: Praseesh P. (2024) Django Request-Response Cycle Explained. [Article]. Medium. https://medium.com/@praseeshprasee/django-request-response-cycle-explained-e3d707eed99c

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



# README.md for Tugas 3

## JAWABAN DARI PERTANYAAN TUGAS 3
### 1) Jelaskan mengapa kita memerlukan data delivery dalam pengimplementasian sebuah platform?
Data delivery diperlukan dalam pengimplementasian sebuah platform karena berfungsi sebagai proses pengiriman, distribusi, dan penyajian data dari sumber ke tujuan secara tepat waktu, akurat, dan aman. Tanpa mekanisme ini, platform tidak akan mampu menyediakan informasi _real-time_, menjaga konsistensi antar modul sistem, mendukung pengambilan keputusan berbasis data, serta menyajikan pengalaman pengguna yang responsif. Data delivery juga menjadi jembatan utama untuk integrasi dengan layanan eksternal, seperti _payment gateway_ dan API pihak ketiga. Dengan demikian, implementasinya bukan hanya sekadar proses teknis, melainkan komponen esensial yang menjamin platform dapat berfungsi secara optimal.

### 2) Menurutmu, mana yang lebih baik antara XML dan JSON? Mengapa JSON lebih populer dibandingkan XML?
Saya pribadi merasa JSON lebih baik dibandingkan XML karena _readability_-nya. Strukturnya menyimpan data dalam bentuk _key-value pairs_ dan data-data dipisahkan oleh tanda koma. Struktur tersebutlah mengapa _readability_-nya baik sehingga mudah dibaca oleh manusia, karena sintaksnya minimalis. Berbeda dengan XML yang _syntax_-nya cukup sulit dibaca. JSON bisa menjadi lebih populer dibandingkan XML karena JSON cenderung lebih mudah digunakan dibanding XML, serta untuk AJAX applications, JSON lebih cepat dan ringan dibanding XML. Selain itu, seperti alasan saya memilih JSON, JSON lebih populer karena lebih mudah dibaca oleh manusia.

### 3) Jelaskan fungsi dari method is_valid() pada form Django dan mengapa kita membutuhkan method tersebut?
Fungsi utama method is_valid() pada form Django adalah untuk menjalankan semua proses validasi dan pembersihan data yang dikirim oleh pengguna. Ketika is_valid() dipanggil pada sebuah objek form yang sudah diisi data, misalnya dari request.POST, method ini akan melakukan beberapa langkah, di antaranya sebagai berikut:
- Menjalankan validasi data form (_default_ maupun yang di-_custom_) = Method ini memeriksa setiap field pada form terhadap aturan validasi yang sudah ditentukan dalam definisi form tersebut. Setelah validasi _default_ lolos, is_valid() akan menjalankan metode validasi _custom_ yang didefinisikan.
- Membersihkan dan menormalkan data = Jika data valid, is_valid() akan mengubah data tersebut ke dalam format Python yang bersih.
- Menyimpan Data Bersih ke cleaned_data = Jika seluruh proses validasi berhasil, is_valid() akan mengembalikan nilai True dan menyimpan data yang sudah bersih dan ternormalisasi ke dalam sebuah dictionary bernama form.cleaned_data.
- Menyimpan Pesan Kesalahan ke errors = Jika ada satu saja validasi yang gagal, is_valid() akan mengembalikan nilai False dan menyimpan semua pesan kesalahan ke dalam dictionary bernama form.errors. Pesan-pesan ini kemudian bisa ditampilkan kembali kepada pengguna di template HTML untuk memberitahu apa yang salah dengan input mereka.
###### (sumber: stackoverflow.com)

Kita membutuhkan is_valid() karena method ini berperan penting di form Django. Dengan adanya validasi, data yang tidak sesuai aturan tidak akan masuk ke database, misalnya field yang kosong padahal wajib diisi, atau angka yang _out of range_. Selain itu, is_valid() juga memberikan feedback kepada pengguna dengan menampilkan alasan mengapa form gagal dikirim. Dari sisi keamanan, method ini memastikan bahwa data yang masuk sudah difilter dan dibersihkan sebelum diproses lebih lanjut, sehingga dapat mencegah ancaman seperti SQL injection atau input berbahaya lainnya.

### 4) Mengapa kita membutuhkan csrf_token saat membuat form di Django? Apa yang dapat terjadi jika kita tidak menambahkan csrf_token pada form Django? Bagaimana hal tersebut dapat dimanfaatkan oleh penyerang?
csrf_token adalah token keamanan unik yang ditambahkan ke setiap form pada template Django. Token ini digunakan untuk mencegah serangan siber Cross-Site Request Forgery (CSRF). Setiap kali _user_ mengirim form (POST request), Django akan memeriksa apakah request tersebut memiliki csrf_token yang valid dan cocok dengan yang ada di server. Tanpa csrf_token, form akan rentan terhadap serangan siber CSRF. Jika tidak menyertakan {% csrf_token %} di dalam form Django, middleware CSRF Django akan menolak setiap permintaan POST, PUT, atau DELETE yang masuk ke view tersebut secara _default_, dan pengguna akan melihat halaman **403 Forbidden** (mekanisme pengamanan bawaan Django). Jika perlindungan CSRF dinonaktifkan dan csrf_token tidak digunakan, penyerang bisa mengeksploitasi sesi login pengguna dengan berbagai cara. Mereka dapat membuat form palsu di situs berbahaya yang ketika diakses oleh korban secara otomatis memicu aksi di situs yang rentan. Misalnya, penyerang bisa merekayasa pengambilalihan akun dengan membuat form yang mengubah email atau kata sandi korban. Lebih jauh lagi, kerentanan ini memungkinkan penyerang untuk melakukan transaksi ilegal seperti mentransfer dana atau melakukan pembelian atas nama korban. Di platform lain seperti media sosial, mereka dapat mengubah data penting dengan memposting status, mengirim pesan, atau menghapus konten tanpa sepengetahuan korban, pada dasarnya memberikan kemampuan kepada penyerang untuk melakukan aksi apa pun yang bisa dilakukan oleh pengguna asli melalui sebuah form.

### 5) Jelaskan bagaimana cara kamu mengimplementasikan checklist di atas secara step-by-step (bukan hanya sekadar mengikuti tutorial).
Dalam project radkicks, saya membuat berkas base.html pada root folder sebagai template dasar untuk seluruh kode HTML yang saya gunakan selanjutnya. Saya memperbarui bagian DIRS pada settings.py agar Django dapat mendeteksi base.html, lalu saya menyesuaikan berkas main.html di direktori main supaya mengikuti struktur template tersebut. Setelah itu, saya membuat berkas forms.py pada direktori main untuk membangun struktur form yang menerima data produk baru. Di dalamnya, saya mengimpor ModelForm dari django.forms dan model Product dari main.models, kemudian saya mendefinisikan kelas ProductForm yang mewarisi ModelForm dengan subkelas Meta berisi atribut model = Products serta daftar fields sesuai dengan field pada model.

Saya menambahkan fungsi add_product dengan parameter request yang membuat variabel form baru menggunakan NewsForm(request.POST or None). Fungsi ini memvalidasi data yang masuk dan mengarahkan pengguna ke fungsi show_main jika data valid. Jika tidak, fungsi merender tampilan add_product.html dengan context berisi form. Selanjutnya, saya menambahkan fungsi show_product dengan parameter request dan id. Di dalamnya, saya mengambil data produk menggunakan get_object_or_404(Product, pk=id) lalu merender tampilan product_detail.html dengan context produk tersebut. Saya mengimpor kedua fungsi ini pada urls.py dan menambahkan path baru pada urlpatterns agar pengguna dapat mengaksesnya melalui URL.

Saya juga memodifikasi main.html dengan menambahkan tombol Add Product untuk mempermudah pengguna menambahkan produk baru. Saya menambahkan conditional untuk mengecek apakah product_list tersedia atau tidak. Jika tidak ada produk, halaman menampilkan pesan “Belum ada data produk pada katalog RADKICKS.”. Jika tersedia, halaman menampilkan daftar produk lengkap dengan nama, kategori, status featured, thumbnail, brand, harga, ukuran, stok, dan rating. Untuk tampilan form, saya membuat file add_product.html dengan menambahkan {% csrf_token %} sebagai lapisan keamanan dan {{ form.as_table }} untuk menampilkan field form dalam tabel. Saya juga membuat file product_detail.html yang menampilkan detail produk meliputi nama, kategori, status featured, thumbnail, brand, harga, ukuran, stok, rating, dan deskripsi.

Saya memodifikasi settings.py pada root project dengan menambahkan daftar CSRF_TRUSTED_ORIGINS berisi alamat https://raden-pandji-radkicks.pbp.cs.ui.ac.id/. Pada views.py di direktori main, saya mengimpor HttpResponse dan serializers, lalu menambahkan fungsi show_xml yang menyerialisasi objek model menjadi format XML dan mengembalikannya melalui HttpResponse dengan content_type="application/xml". Saya juga membuat fungsi show_json yang menyerialisasi objek menjadi format JSON. Saya mengimpor kedua fungsi ini ke main.views dan menambahkan path baru pada urlpatterns agar dapat diakses. Selain itu, saya menambahkan fungsi show_xml_by_id dan show_json_by_id yang memfilter produk berdasarkan product_id, lalu menyerialisasinya ke format XML atau JSON dan mengembalikannya sebagai HttpResponse. Saya melengkapi kedua fungsi ini dengan blok try-except agar aplikasi mengembalikan respons 404 jika data tidak ditemukan. Terakhir, saya mengimpor fungsi show_json_by_id dan show_xml_by_id pada urls.py serta menambahkan path URL baru pada urlpatterns untuk menampilkan data produk berdasarkan ID.

### 6) Apakah ada feedback untuk asdos di tutorial 2 yang sudah kalian kerjakan?
Seperti yang disebut minggu lalu, saya rasa, asisten dosen sangat membantu mahasiswa yang membutuhkan bantuan mereka. Dengan mereka standby di discord atau kelas saat jam lab, mahasiswa tidak perlu khawatir jika mereka melakukan kesalahan atau kebingungan. Dari itu, saya sangat mengapresiasi asisten dosen yang senantiasa membantu mahasiswa yang kesulitan. Akan tetapi, saya rasa belajar dari tutorial saja atau sumber eksternal masih kurang. Maka, alangkah baiknya jika diadakan asistensi tambahan dari asdos untuk menjelaskan _syntax-syntax_ web development supaya dapat melancarkan keberlangsungan pengerjaan tugas.

## SCREENSHOT HASIL AKSES URL PADA POSTMAN
### 1) SCREENSHOT AKSES URL XML
<img width="1919" height="1016" alt="image" src="https://github.com/user-attachments/assets/16cfbefa-46da-4ef1-a896-cfbbb356dc65" />

### 2) SCREENSHOT AKSES URL JSON
<img width="1919" height="1017" alt="image" src="https://github.com/user-attachments/assets/1ddc0a13-6835-4576-9ebc-97f7b97e608e" />

### 3) SCREENSHOT AKSES URL XML BY ID
<img width="1919" height="1021" alt="image" src="https://github.com/user-attachments/assets/2d8dd919-796f-4bd3-a31a-fc576a3e1f0a" />

### 4) SCREENSHOT AKSES URL JSON BY ID
<img width="1919" height="1018" alt="image" src="https://github.com/user-attachments/assets/67e6b10a-9b8a-4f9d-935a-ae9f6238def2" />
