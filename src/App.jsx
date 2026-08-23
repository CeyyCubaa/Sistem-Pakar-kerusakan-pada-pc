import React, { useState } from 'react';
import { AlertTriangle, Wrench, RefreshCcw, Monitor, ChevronRight, Activity, Cpu, Thermometer, Database, HardDrive, ShieldCheck, ArrowRight, Table } from 'lucide-react';

// --- DATA BERDASARKAN PPT ---
const gejalaData = [
  { id: 'G01', desc: 'Komputer mati total (Tidak ada indikator lampu yang menyala)' },
  { id: 'G02', desc: 'Kipas Power Supply berputar sebentar lalu mati lagi' },
  { id: 'G03', desc: 'Komputer menyala tetapi tidak ada tampilan di monitor' },
  { id: 'G04', desc: 'Terdengar bunyi beep panjang berulang-ulang' },
  { id: 'G05', desc: 'Terdengar bunyi beep panjang 1x dan pendek 2x' },
  { id: 'G06', desc: 'Terdengar bunyi beep panjang 1x dan pendek 3x' },
  { id: 'G07', desc: 'Jam dan tanggal pada BIOS selalu berubah/reset ke tahun lama' },
  { id: 'G08', desc: 'Muncul pesan "CMOS Checksum Error" saat booting' },
  { id: 'G09', desc: 'Terdengar bunyi berisik/bising dari dalam casing CPU' },
  { id: 'G10', desc: 'Komputer sering Restart sendiri secara tiba-tiba' },
  { id: 'G11', desc: 'Komputer tiba-tiba mati saat menjalankan aplikasi berat/game' },
  { id: 'G12', desc: 'Suhu prosesor sangat panas (diatas 80°C) saat dicek di BIOS' },
  { id: 'G13', desc: 'Layar monitor menampilkan garis-garis artefak atau gambar pecah' },
  { id: 'G14', desc: 'Layar monitor kedip-kedip (flickering) atau warna tidak normal' },
  { id: 'G15', desc: 'Muncul "Blue Screen of Death" dengan kode error tertentu' },
  { id: 'G16', desc: 'Proses booting Windows sangat lambat' },
  { id: 'G17', desc: 'Program sering "Not Responding" atau komputer Hang' },
  { id: 'G18', desc: 'Muncul pesan "Disk Boot Failure" atau "Insert System Disk"' },
  { id: 'G19', desc: 'Harddisk terdengar bunyi "tek.. tek.." atau bunyi kasar' },
  { id: 'G20', desc: 'Harddisk atau SSD tidak terdeteksi di BIOS' },
  { id: 'G21', desc: 'Kapasitas RAM yang terbaca tidak sesuai fisik' },
  { id: 'G22', desc: 'Keyboard tidak merespon saat tombol ditekan' },
  { id: 'G23', desc: 'Mouse kursor melompat-lompat atau tidak bergerak' },
  { id: 'G24', desc: 'USB Flashdisk tidak terdeteksi saat dicolokkan' },
  { id: 'G25', desc: 'CD/DVD ROM tidak bisa di-eject' },
  { id: 'G26', desc: 'Tidak ada suara yang keluar dari Speaker/Headset' },
  { id: 'G27', desc: 'Komputer terasa menyetrum saat casing disentuh' },
  { id: 'G28', desc: 'Monitor menjadi gelap tapi lampu power hidup' },
  { id: 'G29', desc: 'File data sering rusak (corrupt) atau hilang sendiri' },
  { id: 'G30', desc: 'Muncul iklan/pop-up aneh dan kinerja lambat' },
];

const solusiData = {
  'S01': 'Cek Kelistrikan dan Power Supply, Periksa apakah kabel power sudah tertancap rapat ke sumber listrik dan ke PSU. Coba ganti kabel power dengan yang baru. Jika masih mati total, lepaskan Power Supply Unit (PSU) dari casing dan ganti dengan PSU yang normal.',
  'S02': 'Pembersihan dan Penggantian RAM. Matikan komputer dan buka casing CPU. Lepaskan keping RAM, bersihkan pin kuningan dengan penghapus karet pensil. Pasang kembali RAM dengan kuat hingga bunyi "klik". Jika tetap tidak tampil, coba RAM baru.',
  'S03': 'Penanganan Kartu Grafis. Cabut kartu VGA dan bersihkan slot PCI-E dari debu. Pasang kembali dengan presisi. Jika artefak berlanjut, coba update driver VGA ke versi terbaru. Jika masih masalah, kemungkinan Chipset VGA rusak dan perlu diganti.',
  'S04': 'Perawatan Motherboard & Baterai CMOS. Ganti baterai CMOS di motherboard jika jam sering berubah. Lakukan Reset BIOS. Periksa fisik motherboard apakah ada kapasitor kembung/bocor. Jika rusak parah disarankan ganti motherboard.',
  'S05': 'Mengatasi Overheat. Bongkar kipas prosesor dan bersihkan debu tebal. Bersihkan sisa pasta pendingin (Thermal Paste) yang kering, lalu oleskan pasta baru. Pastikan putaran kipas kencang. Tambahkan kipas casing untuk sirkulasi lebih baik.',
  'S06': 'Penyelamatan Harddisk dan SSD. Segera lakukan backup data penting ke media lain. Lakukan Disk Defragmenter dan chkdsk untuk memperbaiki bad sector ringan. Periksa kabel SATA dan Power SATA, ganti jika longgar.',
  'S07': 'Perbaikan Sistem Operasi. Lakukan Full Scan menggunakan Antivirus terupdate. Lakukan System Restore ke tanggal sebelum kerusakan. Jika Windows sering Blue Screen, lakukan Install Ulang Windows (Re-install OS).',
  'S08': 'Pengecekan Periferal Eksternal. Cek fisik kabel monitor, keyboard, atau mouse. Pindahkan colokan USB ke port bagian belakang CPU karena arus lebih stabil. Coba perangkat di komputer lain. Jika tetap tak berfungsi, perangkat rusak fisik.'
};

const kerusakanData = [
  { id: 'K1', desc: 'Kerusakan pada Power Supply Unit (PSU)' },
  { id: 'K2', desc: 'Kerusakan pada Motherboard (Mainboard)' },
  { id: 'K3', desc: 'Kerusakan pada RAM' },
  { id: 'K4', desc: 'Kerusakan pada VGA Card / GPU (Kartu Grafis)' },
  { id: 'K5', desc: 'Baterai CMOS Habis / Error BIOS' },
  { id: 'K6', desc: 'Processor Overheat (Suhu Terlalu Panas)' },
  { id: 'K7', desc: 'Kerusakan Fisik Harddisk/SSD' },
  { id: 'K8', desc: 'Kerusakan Sistem Operasi' },
  { id: 'K9', desc: 'Virus / Malware' },
  { id: 'K10', desc: 'Kerusakan pada Monitor / Kabel Display' },
  { id: 'K11', desc: 'Kerusakan Perangkat Input (Keyboard/Mouse)' },
  { id: 'K12', desc: 'Kerusakan Sistem Audio / Sound Card' },
];

const aturanData = [
  { p: 'P01', ker: 'K1', name: 'Mati Total (Tidak ada indikator listrik/lampu yang menyala sama sekali)', s: 'S01', g: ['G01', 'G02', 'G27'] },
  { p: 'P02', ker: 'K2', name: 'Motherboard Error (Komputer menyala tapi tidak ada proses booting/BIOS)', s: 'S04', g: ['G06', 'G08', 'G24', 'G25'] },
  { p: 'P03', ker: 'K3', name: 'No Display (CPU hidup, kipas berputar, tapi layar gelap & ada bunyi beep)', s: 'S02', g: ['G03', 'G04', 'G15', 'G21'] },
  { p: 'P04', ker: 'K4', name: 'Visual Artifacts (Tampilan layar monitor pecah, bergaris, atau warna acak)', s: 'S03', g: ['G05', 'G13', 'G14'] },
  { p: 'P05', ker: 'K5', name: 'CMOS Checksum Error (Pengaturan tanggal/jam BIOS selalu kembali ke awal)', s: 'S04', g: ['G07', 'G08'] },
  { p: 'P06', ker: 'K6', name: 'Overheat Shutdown (Komputer sering mati mendadak atau Restart saat panas)', s: 'S05', g: ['G09', 'G10', 'G11', 'G12'] },
  { p: 'P07', ker: 'K7', name: 'Disk Boot Failure (Harddisk tidak terdeteksi sistem atau mengeluarkan bunyi kasar)', s: 'S06', g: ['G16', 'G18', 'G19', 'G20', 'G29'] },
  { p: 'P08', ker: 'K8', name: 'System Crash (Windows sering Blue Screen atau file sistem rusak)', s: 'S07', g: ['G15', 'G16', 'G17'] },
  { p: 'P09', ker: 'K9', name: 'Malware Infection (Kinerja komputer sangat lambat dan banyak muncul iklan)', s: 'S07', g: ['G17', 'G30'] },
  { p: 'P10', ker: 'K10', name: 'No Signal Input (Monitor tidak menampilkan gambar padahal lampu power on)', s: 'S08', g: ['G03', 'G28'] },
  { p: 'P11', ker: 'K11', name: 'Input Device Failure (Keyboard atau Mouse tidak merespon/terdeteksi)', s: 'S08', g: ['G22', 'G23'] },
  { p: 'P12', ker: 'K12', name: 'Audio Output Failure (Tidak ada suara yang keluar dari speaker/headset)', s: 'S08', g: ['G26'] },
];

const permasalahanUmum = [
  {
    title: 'Komputer Tidak Bisa Hidup (Mati Total)',
    desc: 'Hal ini sering terjadi disaat Anda menekan tombol power, namun tidak ada tanda-tanda kehidupan sama sekali, kipas tidak berputar, lampu tidak menyala, Hal ini disebabkan oleh:',
    points: [
      'Kabel power listrik belum terhubung dengan steker atau tidak terpasang dengan kuat pada Power Supply.',
      'Stop kontak listrik bermasalah.',
      'Power Supply Unit (PSU) sudah rusak atau terbakar.',
      'Tombol on/off pada casing rusak.',
      'Motherboard mengalami kerusakan fisik (korsleting).'
    ]
  },
  {
    title: 'Komputer Berbunyi Bising',
    desc: 'Sedang Menajalankan komputer tiba-tiba ada suara bising. Nah, penyebabnya biasanya:',
    points: [
      'Kipas prosesor atau kipas casing kotor penuh debu.',
      'Kabel di dalam casing menyentuh baling-baling kipas.',
      'Harddisk mekanik (HDD) mulai rusak'
    ]
  },
  {
    title: 'Komputer Hidup Tapi Tidak Tampil Gambar (No Display)',
    desc: 'Permasalahan ini sering muncul saat CPU/PC sudah menyala, kipas berputar, namun layar monitor tetap gelap atau tertulis "No Signal", Hal-hal yang menyebabkan kondisi ini adalah:',
    points: [
      'Kabel VGA/HDMI dari CPU ke Monitor belum terpasang dengan baik atau putus.',
      'RAM (Memory) kotor atau longgar posisinya.',
      'Kartu Grafis (VGA Card) mengalami kerusakan.',
      'Monitor dalam kondisi rusak atau mati.'
    ]
  },
  {
    title: 'Kinerja Komputer Sangat Lambat',
    desc: 'Komputer terasa sangat berat saat membuka aplikasi atau booting Windows memakan waktu lama, Permasalahannya adalah antara lain:',
    points: [
      'Terlalu banyak program yang berjalan di latar belakang (Startup).',
      'Harddisk sudah penuh (merah) atau kesehatannya menurun (Bad Sector).',
      'Terkena virus atau malware yang memakan memori.',
      'Kapasitas RAM terlalu kecil untuk aplikasi zaman sekarang.'
    ]
  },
  {
    title: 'Tanggal dan Jam Sering Berubah',
    desc: 'Saat kalian menyalakan komputer pas di liat bagian jam dan tanggalnya berubah, biasanya penyebabnya:',
    points: [
      'Baterai CMOS sudah habis dayanya.',
      'Motherboard tidak mampu menyimpan settingan BIOS.'
    ]
  },
  {
    title: 'Komputer Sering Restart Sendiri atau Blue Screen',
    desc: 'Komputer tiba-tiba mati dan hidup kembali saat sedang digunakan, atau muncul layar biru (Blue Screen of Death) yang berisi kode error. Penyebab utamanya adalah:',
    points: [
      'Processor mengalami Overheat (kepanasan) karena kipas mati atau pasta pendingin kering.',
      'Power Supply kekurangan daya (drop) saat beban berat.',
      'Ada kerusakan pada file sistem Windows (Corrupt).',
      'Driver hardware tidak cocok atau crash.'
    ]
  }
];

export default function App() {
  const [step, setStep] = useState(1);
  const [selectedGejala, setSelectedGejala] = useState([]);
  const [results, setResults] = useState([]);
  const [history, setHistory] = useState([]);
  const [dbTab, setDbTab] = useState('permasalahan'); // State untuk sub-menu Database

  const toggleGejala = (id) => {
    setSelectedGejala(prev => 
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    );
  };

  const handleDiagnosa = () => {
    if (selectedGejala.length === 0) {
      alert("Silakan pilih minimal 1 gejala terlebih dahulu!");
      return;
    }

    let diagnoses = [];
    
    aturanData.forEach(rule => {
      const matchCount = rule.g.filter(g => selectedGejala.includes(g)).length;
      if (matchCount > 0) {
        const percentage = Math.round((matchCount / rule.g.length) * 100);
        diagnoses.push({
          ...rule,
          matchCount,
          percentage
        });
      }
    });

    diagnoses.sort((a, b) => b.percentage - a.percentage);
    
    setResults(diagnoses);

    // Save to history
    if (diagnoses.length > 0) {
      const newHistoryItem = {
        date: new Date().toLocaleString(),
        topResult: diagnoses[0].name,
        percentage: diagnoses[0].percentage,
        diagnosesCount: diagnoses.length
      };
      setHistory(prev => [newHistoryItem, ...prev]);
    }

    setStep(3);
  };

  const resetDiagnosa = () => {
    setSelectedGejala([]);
    setResults([]);
    setStep(1);
  };

  return (
    <div className="min-h-screen bg-[#1F3823] text-gray-300 font-sans selection:bg-green-500 selection:text-black">
      
      {/* Header Ala Sistem Pakar */}
      <header className="border-b border-[#1F1F1F] bg-[#1F3823] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          
          {/* Logo Section - Diubah untuk menghilangkan border/bg hitam dan memperbesar ukuran */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center">
               <img src="/logo-unival.jpg" alt="Logo UNIVAL" className="w-full h-full object-contain mix-blend-screen" />
            </div>
            <div className="flex flex-col">
              <span className="text-base md:text-xl font-bold tracking-tight text-white flex flex-wrap items-center gap-1">
                Sistem Pakar <span className="text-[#4ADE80]">Kerusakan Pada Komputer</span>
              </span>
              <span className="text-[11px] md:text-xs uppercase tracking-[0.15em] text-gray-400 font-semibold mt-1">
                Muhammad Sahrul Ramadhan
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
            <button onClick={() => setStep(1)} className={`${step === 1 || step === 2 || step === 3 ? 'text-[#4ADE80] border-b-2 border-[#4ADE80]' : 'text-gray-400 hover:text-white'} pb-1 transition-colors`}>Diagnosis</button>
            <button onClick={() => setStep(5)} className={`${step === 5 ? 'text-[#4ADE80] border-b-2 border-[#4ADE80]' : 'text-gray-400 hover:text-white'} pb-1 transition-colors`}>Database</button>
            <button onClick={() => setStep(4)} className={`${step === 4 ? 'text-[#4ADE80] border-b-2 border-[#4ADE80]' : 'text-gray-400 hover:text-white'} pb-1 transition-colors`}>Riwayat</button>
            <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">About</span>
          </nav>

          {/* CTA Button */}
          <button 
            onClick={() => setStep(2)}
            className="hidden md:flex bg-[#4ADE80] hover:bg-[#3bca6b] text-black text-sm font-bold px-6 py-2.5 rounded transition-colors whitespace-nowrap"
          >
            Start Repair
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pb-20">
        
        {/* Tahap 1: Beranda */}
        {step === 1 && (
          <div className="animate-fade-in">
            {/* Hero Section */}
            <section className="py-24 md:py-32 flex flex-col items-center text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111] border border-[#222] text-[#4ADE80] text-xs font-semibold tracking-widest uppercase mb-8">
                <ShieldCheck size={14} />
                Diagnosa Perangkat Keras Presisi
              </div>
              
              <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-white mb-6 leading-tight max-w-4xl">
                Analisis untuk <br className="hidden md:block"/>
                <span className="text-[#4ADE80]">kerusakan pada</span> komponen.
              </h1>
              
              <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed">
                Gunakan diagnosa tingkat lanjut untuk mengidentifikasi ketidakstabilan sistem dalam hitungan detik. Dari analisis PCB hingga deteksi suhu, kami menyediakan data yang Anda perlukan.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => setStep(2)}
                  className="bg-[#4ADE80] hover:bg-[#3bca6b] text-black font-bold px-8 py-3.5 rounded transition-colors flex items-center justify-center gap-2"
                >
                  Start Diagnosis
                </button>
                <button 
                  onClick={() => setStep(5)}
                  className="bg-transparent hover:bg-[#111] border border-[#333] text-white font-medium px-8 py-3.5 rounded transition-colors flex items-center justify-center gap-2"
                >
                  <Table size={18} /> Browse Database
                </button>
                <button 
                  onClick={() => setStep(4)}
                  className="bg-transparent hover:bg-[#111] border border-[#333] text-white font-medium px-8 py-3.5 rounded transition-colors flex items-center justify-center gap-2"
                >
                  <Activity size={18} /> Lihat Riwayat
                </button>
              </div>
            </section>

            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#222] to-transparent my-12"></div>

            {/* Features/Categories Section */}
            <section className="py-16">
              <div className="text-center mb-16">
                <div className="text-[#4ADE80] text-xs font-semibold tracking-widest uppercase mb-3">
                  Diagnostic Categories
                </div>
                <h2 className="text-3xl font-bold text-white tracking-tight">Critical Failure Identifiers</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#0f0f0f] border border-[#222] p-8 rounded-lg hover:border-[#4ADE80]/50 transition-colors group">
                  <Activity className="text-[#4ADE80] mb-6 w-8 h-8" />
                  <h3 className="text-xl font-bold text-white mb-3">System Crashes</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Kernel-level analysis of dump files to identify memory corruption or controller failure causing unexpected restarts.
                  </p>
                </div>
                <div className="bg-[#0f0f0f] border border-[#222] p-8 rounded-lg hover:border-[#4ADE80]/50 transition-colors group">
                  <Thermometer className="text-[#4ADE80] mb-6 w-8 h-8" />
                  <h3 className="text-xl font-bold text-white mb-3">Thermal State</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Real-time monitoring of clock-speed reduction and heat-induced performance degradation across processing units.
                  </p>
                </div>
                <div className="bg-[#0f0f0f] border border-[#222] p-8 rounded-lg hover:border-[#4ADE80]/50 transition-colors group">
                  <Cpu className="text-[#4ADE80] mb-6 w-8 h-8" />
                  <h3 className="text-xl font-bold text-white mb-3">Memory Integrity</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Bit-level verification of DRAM modules to detect permanent hardware versus volatile software errors.
                  </p>
                </div>
              </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-24">
              <div className="bg-[#0f0f0f] border border-[#222] rounded-2xl p-12 md:p-20 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#4ADE80]/5 to-transparent pointer-events-none"></div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 relative z-10">Start Your System Audit</h2>
                <p className="text-gray-400 max-w-xl mx-auto mb-10 relative z-10">
                  Get a professional diagnosis and identify the exact component causing instability in seconds.
                </p>
                <button 
                  onClick={() => setStep(2)}
                  className="bg-[#4ADE80] hover:bg-[#3bca6b] text-black font-bold px-8 py-4 rounded transition-colors relative z-10 inline-flex items-center gap-2"
                >
                  Launch Remote Scan
                </button>
              </div>
            </section>
          </div>
        )}

        {/* Tahap 2: Pilih Gejala */}
        {step === 2 && (
          <div className="animate-fade-in mt-12 max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#222]">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Select Error Symptoms</h2>
                <p className="text-gray-500">Check all indicators that apply to your system state.</p>
              </div>
              <div className="bg-[#111] border border-[#333] text-[#4ADE80] px-4 py-2 rounded font-mono text-sm">
                {selectedGejala.length} DETECTED
              </div>
            </div>
            
            <div className="bg-[#0f0f0f] rounded-xl border border-[#222] overflow-hidden shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
                {gejalaData.map((gejala) => (
                  <div 
                    key={gejala.id}
                    onClick={() => toggleGejala(gejala.id)}
                    className={`p-5 border-b border-r border-[#1a1a1a] cursor-pointer transition-all flex items-start gap-3 hover:bg-[#151515]
                      ${selectedGejala.includes(gejala.id) ? 'bg-[#1a2e1f] border-l-2 border-l-[#4ADE80]' : 'border-l-2 border-l-transparent'}`}
                  >
                    <div className="mt-1">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors
                        ${selectedGejala.includes(gejala.id) ? 'bg-[#4ADE80] border-[#4ADE80]' : 'bg-[#111] border-[#444]'}`}>
                        {selectedGejala.includes(gejala.id) && <ShieldCheck size={14} className="text-black" />}
                      </div>
                    </div>
                    <div>
                      <span className="font-mono text-xs text-gray-500 block mb-1">ID: {gejala.id}</span>
                      <span className={`text-sm leading-snug block ${selectedGejala.includes(gejala.id) ? 'text-[#4ADE80] font-medium' : 'text-gray-300'}`}>
                        {gejala.desc}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 flex justify-between items-center sticky bottom-6 bg-[#1F3823]/90 backdrop-blur-md p-6 rounded-xl border border-[#222] shadow-2xl z-40">
              <button 
                onClick={() => setStep(1)}
                className="text-gray-400 hover:text-white px-4 py-2 transition-colors font-medium"
              >
                Cancel Process
              </button>
              <button 
                onClick={handleDiagnosa}
                disabled={selectedGejala.length === 0}
                className={`px-8 py-3 rounded font-bold transition-all flex items-center gap-2
                  ${selectedGejala.length > 0 
                    ? 'bg-[#4ADE80] hover:bg-[#3bca6b] text-black shadow-[0_0_15px_rgba(74,222,128,0.3)]' 
                    : 'bg-[#222] text-gray-500 cursor-not-allowed'}`}
              >
                 Run Analysis <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Tahap 3: Hasil Diagnosa */}
        {step === 3 && (
          <div className="animate-fade-in mt-12 max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8 pb-4 border-b border-[#222]">
              <div className="bg-[#4ADE80]/10 p-3 rounded-lg border border-[#4ADE80]/30">
                <Database className="text-[#4ADE80]" size={28} />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-1">Diagnostic Report Generated</h2>
                <p className="text-gray-500 font-mono text-sm">ANALYSIS_COMPLETE // {new Date().toISOString().split('T')[0]}</p>
              </div>
            </div>

            {results.length > 0 ? (
              <div className="space-y-6">
                {results.map((res, index) => (
                  <div key={index} className={`rounded-xl bg-[#0f0f0f] border overflow-hidden relative
                    ${index === 0 ? 'border-[#4ADE80] shadow-[0_0_20px_rgba(74,222,128,0.1)]' : 'border-[#222]'}`}>
                    
                    {index === 0 && (
                      <div className="absolute top-0 left-0 w-full h-1 bg-[#4ADE80]"></div>
                    )}

                    <div className="p-6 md:p-8 border-b border-[#222] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <span className={`font-mono text-xs font-bold px-2 py-1 rounded bg-[#111] border
                            ${index === 0 ? 'text-[#4ADE80] border-[#4ADE80]/30' : 'text-gray-400 border-[#333]'}`}>
                            ERR_CODE: {res.p}
                          </span>
                          <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                            Hardware Failure Detected
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold text-white">{res.name}</h3>
                      </div>
                      
                      <div className="flex items-center gap-4 bg-[#111] border border-[#222] px-6 py-4 rounded-lg">
                        <div className="text-right">
                          <div className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Match Rate</div>
                          <div className={`font-bold text-2xl ${index === 0 ? 'text-[#4ADE80]' : 'text-white'}`}>{res.percentage}%</div>
                        </div>
                        <div className="w-14 h-14 rounded-full flex items-center justify-center relative">
                          <svg className="absolute top-0 left-0 w-full h-full transform -rotate-90">
                            <circle cx="28" cy="28" r="24" stroke="#222" strokeWidth="4" fill="none" />
                            <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="4" fill="none" 
                              className={index === 0 ? 'text-[#4ADE80]' : 'text-gray-600'}
                              strokeDasharray={`${(res.percentage / 100) * 150} 150`}
                              strokeLinecap="round"
                            />
                          </svg>
                          <Activity size={16} className={index === 0 ? 'text-[#4ADE80]' : 'text-gray-500'} />
                        </div>
                      </div>
                    </div>

                    <div className="p-6 md:p-8 bg-[#0a0a0a]">
                      <div className="flex gap-5">
                        <div className="w-12 h-12 rounded bg-[#111] border border-[#222] flex items-center justify-center flex-shrink-0">
                          <Wrench className="text-gray-400" size={24} />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#4ADE80] mb-2 uppercase tracking-widest flex items-center gap-2">
                            Recommended Protocol 
                            <span className="font-mono bg-[#1a2e1f] px-2 py-0.5 rounded text-[#4ADE80] border border-[#4ADE80]/20">
                              {res.s}
                            </span>
                          </div>
                          <p className="text-gray-300 leading-relaxed text-lg">
                            {solusiData[res.s]}
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-8 pt-6 border-t border-[#222]">
                        <div className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-widest">Correlated Symptoms:</div>
                        <div className="flex flex-wrap gap-2">
                          {res.g.map(g => (
                            <span key={g} className={`font-mono text-xs px-3 py-1.5 rounded-sm border 
                              ${selectedGejala.includes(g) 
                                ? 'bg-[#1a2e1f] border-[#4ADE80]/30 text-[#4ADE80]' 
                                : 'bg-[#111] border-[#333] text-gray-600'}`}>
                              {g} {selectedGejala.includes(g) && '✓'}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-[#0f0f0f] p-12 rounded-xl border border-[#222] text-center">
                <div className="w-20 h-20 bg-[#111] border border-[#333] rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShieldCheck className="text-gray-600" size={32} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">No Known Anomalies Detected</h3>
                <p className="text-gray-500 max-w-md mx-auto">The combination of symptoms selected does not match our current hardware failure database. Please verify the symptoms.</p>
              </div>
            )}

            <div className="mt-12 flex justify-center">
              <button 
                onClick={resetDiagnosa}
                className="bg-transparent border border-[#333] hover:border-[#4ADE80] hover:text-[#4ADE80] text-gray-400 font-medium px-8 py-3.5 rounded transition-all flex items-center gap-2"
              >
                <RefreshCcw size={18} /> Initiate New Scan
              </button>
            </div>
          </div>
        )}

        {/* Tahap 4: Halaman Riwayat Diagnosis */}
        {step === 4 && (
          <div className="animate-fade-in mt-12 max-w-4xl mx-auto min-h-[60vh]">
            <div className="flex items-center gap-4 mb-8 pb-4 border-b border-[#222]">
              <div className="bg-[#4ADE80]/10 p-3 rounded-lg border border-[#4ADE80]/30">
                <Activity className="text-[#4ADE80]" size={28} />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-1">Diagnostic History</h2>
                <p className="text-gray-500 font-mono text-sm">ARCHIVED_REPORTS // SYSTEM_LOGS</p>
              </div>
            </div>

            {history.length > 0 ? (
              <div className="space-y-4">
                {history.map((item, index) => (
                  <div key={index} className="bg-[#0f0f0f] border border-[#222] p-6 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-[#4ADE80]/40 transition-all shadow-lg">
                    <div>
                      <div className="text-xs text-[#4ADE80] font-mono mb-2">{item.date}</div>
                      <div className="text-xl font-bold text-white">{item.topResult}</div>
                    </div>
                    <div className="flex items-center gap-6 bg-[#111] px-5 py-3 rounded-lg border border-[#333]">
                      <div className="text-right">
                         <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Match Rate</div>
                         <div className="text-[#4ADE80] font-bold text-xl">{item.percentage}%</div>
                      </div>
                      <div className="w-px h-10 bg-[#333]"></div>
                      <div className="text-right">
                         <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Anomalies</div>
                         <div className="text-white font-bold text-xl">{item.diagnosesCount} <span className="text-sm font-normal text-gray-500">detected</span></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-[#0f0f0f] p-12 rounded-xl border border-[#222] text-center mt-10 shadow-lg">
                <div className="w-20 h-20 bg-[#111] border border-[#333] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Database className="text-gray-600" size={32} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">No History Found</h3>
                <p className="text-gray-500 max-w-md mx-auto mb-8">Belum ada riwayat diagnosis yang tersimpan di sesi ini. Silakan mulai pemindaian baru.</p>
                <button 
                  onClick={() => setStep(2)}
                  className="bg-[#4ADE80] hover:bg-[#3bca6b] text-black font-bold px-6 py-3 rounded transition-colors inline-flex items-center gap-2"
                >
                  <Activity size={18} /> Start New Scan
                </button>
              </div>
            )}

            {history.length > 0 && (
              <div className="mt-12 flex justify-center">
                <button 
                  onClick={() => setStep(1)}
                  className="text-gray-400 hover:text-white font-medium px-8 py-3.5 rounded transition-all flex items-center gap-2"
                >
                  Kembali ke Beranda
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tahap 5: Halaman Database (Sekarang dengan Tab Navigation) */}
        {step === 5 && (
          <div className="animate-fade-in mt-12 max-w-6xl mx-auto min-h-[60vh] flex flex-col h-full">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 pb-4 border-b border-[#222]">
              <div className="flex items-center gap-4">
                <div className="bg-[#4ADE80]/10 p-3 rounded-lg border border-[#4ADE80]/30">
                  <Table className="text-[#4ADE80]" size={28} />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-1">Knowledge Base</h2>
                  <p className="text-gray-500 font-mono text-sm">DATABASE_REFERENCE // RULES_AND_SYMPTOMS</p>
                </div>
              </div>
            </div>

            {/* Menu Navigasi Sub-Tab untuk Database */}
            <div className="flex gap-2 sm:gap-6 border-b border-[#222] mb-8 overflow-x-auto pb-1 no-scrollbar text-sm font-medium">
               <button 
                 onClick={() => setDbTab('permasalahan')} 
                 className={`pb-3 px-1 whitespace-nowrap transition-all ${dbTab === 'permasalahan' ? 'text-[#4ADE80] border-b-2 border-[#4ADE80]' : 'text-gray-400 hover:text-white'}`}
               >
                 Permasalahan Umum
               </button>
               <button 
                 onClick={() => setDbTab('gejala')} 
                 className={`pb-3 px-1 whitespace-nowrap transition-all ${dbTab === 'gejala' ? 'text-[#4ADE80] border-b-2 border-[#4ADE80]' : 'text-gray-400 hover:text-white'}`}
               >
                 Tabel Gejala
               </button>
               <button 
                 onClick={() => setDbTab('kerusakan')} 
                 className={`pb-3 px-1 whitespace-nowrap transition-all ${dbTab === 'kerusakan' ? 'text-[#4ADE80] border-b-2 border-[#4ADE80]' : 'text-gray-400 hover:text-white'}`}
               >
                 Tabel Kerusakan
               </button>
               <button 
                 onClick={() => setDbTab('solusi')} 
                 className={`pb-3 px-1 whitespace-nowrap transition-all ${dbTab === 'solusi' ? 'text-[#4ADE80] border-b-2 border-[#4ADE80]' : 'text-gray-400 hover:text-white'}`}
               >
                 Tabel Solusi
               </button>
               <button 
                 onClick={() => setDbTab('aturan')} 
                 className={`pb-3 px-1 whitespace-nowrap transition-all ${dbTab === 'aturan' ? 'text-[#4ADE80] border-b-2 border-[#4ADE80]' : 'text-gray-400 hover:text-white'}`}
               >
                 Tabel Aturan
               </button>
            </div>

            <div className="flex-grow">
              {/* Konten 1: Permasalahan Umum */}
              {dbTab === 'permasalahan' && (
                <section className="animate-fade-in">
                  <h3 className="text-2xl font-bold text-white mb-6 border-l-4 border-[#4ADE80] pl-4">Permasalahan Yang Biasa Dialami Pada Komputer</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {permasalahanUmum.map((item, idx) => (
                      <div key={idx} className="bg-[#0f0f0f] border border-[#222] p-6 rounded-xl hover:border-[#4ADE80]/30 transition-colors">
                        <h4 className="text-lg font-bold text-[#4ADE80] mb-3">{item.title}</h4>
                        <p className="text-gray-400 text-sm mb-4 leading-relaxed">{item.desc}</p>
                        <ul className="list-disc list-inside text-gray-300 text-sm space-y-2">
                          {item.points.map((point, i) => (
                            <li key={i}>{point}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Konten 2: Tabel Gejala */}
              {dbTab === 'gejala' && (
                <section className="animate-fade-in">
                  <h3 className="text-2xl font-bold text-white mb-6 border-l-4 border-[#4ADE80] pl-4">Tabel Gejala</h3>
                  <div className="overflow-x-auto bg-[#0f0f0f] border border-[#222] rounded-xl">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[#111] border-b border-[#333]">
                          <th className="p-4 font-mono text-[#4ADE80] text-sm w-24">KODE</th>
                          <th className="p-4 font-semibold text-gray-300">GEJALA</th>
                        </tr>
                      </thead>
                      <tbody>
                        {gejalaData.map((g, i) => (
                          <tr key={g.id} className={`border-b border-[#222] hover:bg-[#151515] ${i % 2 === 0 ? 'bg-[#0f0f0f]' : 'bg-[#111]/30'}`}>
                            <td className="p-4 font-mono text-gray-400">{g.id}</td>
                            <td className="p-4 text-gray-300">{g.desc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}

              {/* Konten 3: Tabel Kerusakan */}
              {dbTab === 'kerusakan' && (
                <section className="animate-fade-in">
                  <h3 className="text-2xl font-bold text-white mb-6 border-l-4 border-[#4ADE80] pl-4">Tabel Kerusakan Pada Komputer</h3>
                  <div className="overflow-x-auto bg-[#0f0f0f] border border-[#222] rounded-xl">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[#111] border-b border-[#333]">
                          <th className="p-4 font-mono text-[#4ADE80] text-sm w-24">KODE</th>
                          <th className="p-4 font-semibold text-gray-300">KERUSAKAN</th>
                        </tr>
                      </thead>
                      <tbody>
                        {kerusakanData.map((k, i) => (
                          <tr key={k.id} className={`border-b border-[#222] hover:bg-[#151515] ${i % 2 === 0 ? 'bg-[#0f0f0f]' : 'bg-[#111]/30'}`}>
                            <td className="p-4 font-mono text-gray-400">{k.id}</td>
                            <td className="p-4 text-gray-300">{k.desc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}

              {/* Konten 4: Tabel Solusi */}
              {dbTab === 'solusi' && (
                <section className="animate-fade-in">
                  <h3 className="text-2xl font-bold text-white mb-6 border-l-4 border-[#4ADE80] pl-4">Tabel Solusi Kerusakan</h3>
                  <div className="overflow-x-auto bg-[#0f0f0f] border border-[#222] rounded-xl">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[#111] border-b border-[#333]">
                          <th className="p-4 font-mono text-[#4ADE80] text-sm w-24">KODE</th>
                          <th className="p-4 font-semibold text-gray-300">SOLUSI</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(solusiData).map(([kode, solusi], i) => (
                          <tr key={kode} className={`border-b border-[#222] hover:bg-[#151515] ${i % 2 === 0 ? 'bg-[#0f0f0f]' : 'bg-[#111]/30'}`}>
                            <td className="p-4 font-mono text-gray-400 align-top">{kode}</td>
                            <td className="p-4 text-gray-300 leading-relaxed">{solusi}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}

              {/* Konten 5: Tabel Aturan */}
              {dbTab === 'aturan' && (
                <section className="animate-fade-in">
                  <h3 className="text-2xl font-bold text-white mb-6 border-l-4 border-[#4ADE80] pl-4">Tabel Aturan</h3>
                  <div className="overflow-x-auto bg-[#0f0f0f] border border-[#222] rounded-xl">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[#111] border-b border-[#333]">
                          <th className="p-4 font-mono text-[#4ADE80] text-sm whitespace-nowrap">KODE ATURAN</th>
                          <th className="p-4 font-mono text-[#4ADE80] text-sm whitespace-nowrap">KODE KERUSAKAN</th>
                          <th className="p-4 font-semibold text-gray-300 min-w-[200px]">KERUSAKAN</th>
                          <th className="p-4 font-semibold text-gray-300">GEJALA</th>
                          <th className="p-4 font-semibold text-gray-300 whitespace-nowrap">SOLUSI</th>
                        </tr>
                      </thead>
                      <tbody>
                        {aturanData.map((a, i) => (
                          <tr key={a.p} className={`border-b border-[#222] hover:bg-[#151515] ${i % 2 === 0 ? 'bg-[#0f0f0f]' : 'bg-[#111]/30'}`}>
                            <td className="p-4 font-mono text-gray-400">{a.p}</td>
                            <td className="p-4 font-mono text-gray-400">{a.ker}</td>
                            <td className="p-4 text-gray-300">{a.name}</td>
                            <td className="p-4 text-gray-300">
                              <div className="flex flex-wrap gap-1">
                                {a.g.join(', ')}
                              </div>
                            </td>
                            <td className="p-4 font-mono text-[#4ADE80]">{a.s}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}
            </div>

            <div className="mt-12 flex justify-center pb-8 border-t border-[#1F1F1F] pt-8">
              <button 
                onClick={() => setStep(1)}
                className="text-gray-400 hover:text-white font-medium px-8 py-3 rounded transition-all flex items-center gap-2 border border-[#333] hover:border-[#4ADE80]"
              >
                Kembali ke Beranda
              </button>
            </div>
          </div>
        )}

      </main>
      
      {/* Footer Ala Sistem Pakar */}
      <footer className="border-t border-[#1F1F1F] bg-[#1F3823] py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
             <span className="text-lg font-bold tracking-tight text-white flex flex-wrap items-center gap-1 mb-4">
               Sistem Pakar <span className="text-[#4ADE80]">Kerusakan Pada Komputer</span>
             </span>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 mt-4 pt-4 flex flex-col md:flex-row items-center justify-between text-xs text-gray-600">
          <p>Sistem Pakar Diagnosis Pada Komputer.</p>
          <p className="mt-2 md:mt-0">| Developed by Muhammad Sahrul Ramadhan</p>
          <div className="flex items-center gap-2 mt-2 md:mt-0">
            <div className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]"></div>
          </div>
        </div>
      </footer>
    </div>
  );
}