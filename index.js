// Mengimpor library jsonfile untuk membaca dan menulis file JSON
import jsonfile from "jsonfile";

// Mengimpor moment untuk manipulasi tanggal dan waktu
import moment from "moment";

// Mengimpor simple-git untuk menjalankan perintah Git melalui JavaScript
import simpleGit from "simple-git";

// Mengimpor random untuk menghasilkan angka acak
import random from "random";

// Menentukan lokasi file JSON yang akan diubah dan dikomit
const path = "./data.json";

// Fungsi rekursif untuk membuat commit Git sebanyak n kali
const makeCommits = (n) => {
  // Kondisi berhenti:
  // Jika n sudah 0, hentikan proses commit dan langsung push ke repository remote
  if (n === 0) return simpleGit().push();

  // Menghasilkan angka acak antara 0–54 sebagai jumlah minggu
  const x = random.int(0, 54);

  // Menghasilkan angka acak antara 0–6 sebagai jumlah hari
  const y = random.int(0, 6);

  // Membuat tanggal commit secara acak dalam rentang 1 tahun terakhir
  const commitDate = moment() // Mengambil tanggal dan waktu saat ini
    .subtract(1, "y") // Mundur 1 tahun ke belakang
    .add(1, "d") // Menambahkan 1 hari
    .add(x, "w") // Menambahkan minggu secara acak
    .add(y, "d") // Menambahkan hari secara acak
    .format(); // Mengubah ke format string yang valid untuk Git

  // Membuat objek data yang akan ditulis ke file JSON
  const data = { date: commitDate };

  // Menampilkan log progress commit ke terminal
  console.log(`Commit ke ${151 - n} tanggal: ${commitDate}`);

  // Menulis data ke file data.json
  jsonfile.writeFile(path, data, () => {
    // Menginisialisasi Git
    simpleGit()
      // Menambahkan file data.json ke staging area
      .add([path])

      // Melakukan commit dengan:
      // - pesan commit berupa tanggal
      // - tanggal commit dipalsukan menggunakan opsi --date
      .commit(
        commitDate,
        { "--date": commitDate },

        // Setelah commit selesai, fungsi dipanggil kembali (rekursif)
        () => makeCommits(n - 1)
      );
  });
};

// Memulai proses dengan membuat 150 commit
makeCommits(150);