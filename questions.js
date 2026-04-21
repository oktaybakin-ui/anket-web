// TReTREAT - Turkish Re-irradiation Workflow Survey (Turkiye)
// Gruplandirilmis anket sorulari.
// type: "radio" (tek secim) | "checkbox" (coklu secim) | "textarea" (uzun metin)
// hasOther: true ise "Diger" secildiginde kullaniciya serbest metin alani gosterilir.
// required: true ise zorunludur.

module.exports = [
  // ============================================================
  // BOLUM 1 — Katilimci ve Kurum Profili
  // ============================================================
  {
    id: "yas",
    section: "BOLUM 1 — Katilimci ve Kurum Profili",
    text: "Yasiniz",
    type: "radio",
    options: ["18-24", "25-34", "35-44", "45-54", "55-64", "65 ve ustu"],
    required: true
  },
  {
    id: "cinsiyet",
    section: "BOLUM 1 — Katilimci ve Kurum Profili",
    text: "Cinsiyetiniz",
    type: "radio",
    options: ["Kadin", "Erkek"],
    required: true
  },
  {
    id: "meslek",
    section: "BOLUM 1 — Katilimci ve Kurum Profili",
    text: "Mesleginiz nedir?",
    type: "radio",
    options: [
      "Radyasyon Onkologu",
      "Medikal Fizik Uzmani",
      "Dozimetrist",
      "Radyoterapi Teknikeri / RTT"
    ],
    hasOther: true,
    required: true
  },
  {
    id: "deneyim",
    section: "BOLUM 1 — Katilimci ve Kurum Profili",
    text: "Radyasyon onkolojisi alanindaki deneyiminiz ne kadar suredir?",
    type: "radio",
    options: ["1-3 yil", "3-6 yil", "6-10 yil", "10-15 yil", "16 yildan fazla"],
    required: true
  },
  {
    id: "kurum_tipi",
    section: "BOLUM 1 — Katilimci ve Kurum Profili",
    text: "Calistiginiz kurum tipi hangisidir?",
    type: "radio",
    options: [
      "Universite Hastanesi",
      "Egitim ve Arastirma Hastanesi",
      "Sehir Hastanesi",
      "Ozel Hastane",
      "Onkoloji / Kanser Merkezi"
    ],
    hasOther: true,
    required: true
  },
  {
    id: "yillik_rt_hasta",
    section: "BOLUM 1 — Katilimci ve Kurum Profili",
    text: "Kurumunuzun yillik yaklasik radyoterapi hasta sayisi kactir?",
    type: "radio",
    options: ["< 500", "500-1000", "1000-2000", "> 2000"],
    required: true
  },
  {
    id: "yillik_reirr",
    section: "BOLUM 1 — Katilimci ve Kurum Profili",
    text: "Kurumunuzun yillik yaklasik re-irradiation vaka sayisi kactir?",
    type: "radio",
    options: ["< 5", "5-15", "16-30", "31-50", "> 50"],
    required: true
  },
  {
    id: "rt_teknikleri",
    section: "BOLUM 1 — Katilimci ve Kurum Profili",
    text: "Kurumunuzda hangi radyoterapi teknikleri mevcuttur? (Birden fazla secilebilir)",
    type: "checkbox",
    options: [
      "3D-KRT",
      "IMRT",
      "VMAT",
      "SBRT / SABR",
      "IGRT",
      "MR Linak",
      "Brakiterapi",
      "Online Adaptif CBCT Tabanli RT"
    ],
    required: true
  },

  // ============================================================
  // BOLUM 2 — Siniflandirma ve Kayit Sistemi
  // ============================================================
  {
    id: "estro_siniflandirma",
    section: "BOLUM 2 — Siniflandirma ve Kayit Sistemi",
    text:
      "Kurumunuzda yeniden isinlama vakalari ESTRO/EORTC konsensusune gore siniflandiriliyor mu? " +
      "(Type 1: onceki ve yeni RT hacimleri geometrik olarak ortusur. " +
      "Type 2: geometrik ortusme yok ancak kumulatif OAR/toksisite endisesi var. " +
      "Type 3: Repeat irradiation / repeat organ irradiation.)",
    type: "radio",
    options: [
      "Evet — tum vakalarda Type 1 / Type 2 olarak siniflandiriyoruz",
      "Evet — Type 1 / Type 2 ve ek retreatment alt siniflarini da kullaniyoruz",
      "Kismen — yalnizca secili vakalarda siniflandiriyoruz",
      "Hayir — siniflamayi biliyoruz ama rutin kullanmiyoruz",
      "Hayir — bu siniflamadan haberdar degildik"
    ],
    required: true
  },
  {
    id: "yazili_protokol",
    section: "BOLUM 2 — Siniflandirma ve Kayit Sistemi",
    text: "Kurumunuzda re-irradiation icin yazili bir klinik protokol / is akisi var mi?",
    type: "radio",
    options: [
      "Evet — yazili ve kurumsal onayli",
      "Evet — yazili ancak resmi onay sureci tamamlanmadi",
      "Hayir — vaka bazli ilerleniyor",
      "Hazirlik / gelistirme asamasinda"
    ],
    hasOther: true,
    required: true
  },

  // ============================================================
  // BOLUM 3 — Hasta Secimi ve Karar Sureci
  // ============================================================
  {
    id: "karar_faktorleri",
    section: "BOLUM 3 — Hasta Secimi ve Karar Sureci",
    text: "Re-irradiation kararinda etkili faktorler nelerdir? (Birden fazla secilebilir)",
    type: "checkbox",
    options: [
      "ECOG / KPS",
      "Beklenen yasam suresi",
      "Tumor histolojisi",
      "Onceki RT dozu",
      "Onceki RT alani / overlap",
      "RT kurslari arasindaki interval",
      "Kritik organ toleransi (OAR kumulatif doz tahmini)",
      "Semptom yuku",
      "Kuratif potansiyel",
      "Sistemik / alternatif tedavi secenekleri",
      "Cerrahi uygunluk",
      "Multidisipliner tumor konseyi karari",
      "Hastanin tercihi / QoL beklentisi"
    ],
    hasOther: true,
    required: true
  },
  {
    id: "minimum_sure",
    section: "BOLUM 3 — Hasta Secimi ve Karar Sureci",
    text: "Re-irradiation icin minimum sure kriteriniz nedir?",
    type: "radio",
    options: ["< 6 ay", "6-12 ay", "12-24 ay", "24 ay", "Sabit kriter yok"],
    required: true
  },
  {
    id: "performans_durumu",
    section: "BOLUM 3 — Hasta Secimi ve Karar Sureci",
    text: "Hastanin performans durumu karar surecine nasil dahil edilir?",
    type: "radio",
    options: [
      "Her vakada resmi ECOG/KPS kayit edilir",
      "Klinik degerlendirme yapilir, resmi skor her zaman kaydedilmez",
      "Yalnizca palyatif - kuratif ayriminda kullanilir",
      "Belirleyici degildir"
    ],
    hasOther: true,
    required: true
  },
  {
    id: "karar_verme_sureci",
    section: "BOLUM 3 — Hasta Secimi ve Karar Sureci",
    text: "Hastayla paylasilan karar verme sureci nasil yurutulur?",
    type: "radio",
    options: [
      "Re-irradiation'a ozgu bilgilendirme + yazili onam",
      "Standart RT onami kullanilir",
      "Sozlu bilgilendirme yapilir, not dusulur",
      "Re-irradiation'a ozgu yapilandirilmis surec yok"
    ],
    required: true
  },
  {
    id: "tedavi_amaci",
    section: "BOLUM 3 — Hasta Secimi ve Karar Sureci",
    text: "Tedavi amacini nasil siniflandiriyorsunuz?",
    type: "radio",
    options: [
      "Kuratif / ablatif",
      "Palyatif",
      "Lokal kontrol / semptom onleme",
      "Bridging / sistemik tedaviye destek",
      "Vaka bazli, yazili siniflama yok"
    ],
    required: true
  },
  {
    id: "en_sik_bolgeler",
    section: "BOLUM 3 — Hasta Secimi ve Karar Sureci",
    text: "En sik re-irradiation uyguladiginiz bolge hangileridir? (Birden fazla secilebilir)",
    type: "checkbox",
    options: [
      "Beyin - Primer Tumor (Glioma, Meningiom vb.)",
      "Beyin - Metastaz",
      "Bas-boyun",
      "Akciger",
      "Meme",
      "Ozefagus / Mediasten",
      "Pelvis (Prostat, Rektum, Serviks vb.)",
      "Karaciger / Abdominal",
      "Omurga"
    ],
    hasOther: true,
    required: true
  },
  {
    id: "fizikci_konsultasyon",
    section: "BOLUM 3 — Hasta Secimi ve Karar Sureci",
    text: "Her re-irradiation vakasi icin medikal fizikci ile konsultasyon sureci uygulaniyor mu?",
    type: "radio",
    options: [
      "Evet — her vaka icin yazili konsultasyon formu dolduruluyor",
      "Evet — ama yazili degil, sozlu / e-posta uzerinden",
      "Hayir — standart plan onay sureci yeterli goruluyor",
      "Hayir — boyle bir surec tanimli degil"
    ],
    required: true
  },

  // ============================================================
  // BOLUM 4 — Veri Erisimi ve Kalitesi
  // ============================================================
  {
    id: "onceki_rt_erisim",
    section: "BOLUM 4 — Veri Erisimi ve Kalitesi",
    text: "Onceki RT plan verilerine erisebilme duzeyiniz nedir?",
    type: "radio",
    options: [
      "Tam DICOM RT seti (CT + RTSTRUCT + RTPLAN + RTDOSE)",
      "Kismi DICOM veri",
      "Yalnizca yazili plan ozeti / epikriz",
      "Yalnizca fiziksel kayit / ekran goruntusu",
      "Veri yok"
    ],
    required: true
  },
  {
    id: "onceki_plan_entegrasyon",
    section: "BOLUM 4 — Veri Erisimi ve Kalitesi",
    text:
      "Onceki plan verileri (DICOM, doz dagilimi vb.) rutin olarak sisteme entegre ediliyor mu? " +
      "(1: asla dahil edilmiyor – 5: kesinlikle dahil ediliyor)",
    type: "radio",
    options: [
      "1 (gerek duymuyoruz)",
      "2 (onceki dozu dikkate almayan kisitlar kullaniyoruz)",
      "3 (onceki plan verisi cogunlukla mevcut degil)",
      "4 (yalnizca yuksek riskli / secili vakalarda)",
      "5 (her vakada)"
    ],
    required: true
  },
  {
    id: "baska_kurum_zorluklar",
    section: "BOLUM 4 — Veri Erisimi ve Kalitesi",
    text: "Onceki veri baska bir kurumdan geldiginde en cok hangi zorluklarla karsilasiyorsunuz? (Birden fazla secilebilir)",
    type: "checkbox",
    options: [
      "DICOM uyumsuzlugu",
      "TPS uyumsuzlugu",
      "Eksik dose dosyasi",
      "Eksik structure set",
      "Eski / pre-DICOM kayit",
      "Idari izin sureci",
      "Zaman kaybi",
      "Sorun yasamiyoruz"
    ],
    hasOther: true,
    required: true
  },
  {
    id: "dicom_yoksa",
    section: "BOLUM 4 — Veri Erisimi ve Kalitesi",
    text: "Onceki plan DICOM verisi yoksa nasil bir yol izliyorsunuz? (Birden fazla secilebilir)",
    type: "checkbox",
    options: [
      "Yazili epikriz / plan ozeti istiyoruz",
      "Onceki merkezle iletisim kuruyoruz",
      "Literatur bazli tipik doz varsayimi kullaniyoruz",
      "Flat constraint ile ilerliyoruz",
      "Taklit plan olusturmayi degerlendiriyoruz",
      "Bu durumda hastayi reRT'ye uygun bulmuyoruz"
    ],
    hasOther: true,
    required: true
  },

  // ============================================================
  // BOLUM 5 — Simulasyon, Goruntuleme ve Pozisyonlama
  // ============================================================
  {
    id: "goruntuleme_modaliteleri",
    section: "BOLUM 5 — Simulasyon, Goruntuleme ve Pozisyonlama",
    text: "Re-irradiation simulasyonunda hangi goruntuleme modalitelerini kullaniyorsunuz? (Birden fazla secilebilir)",
    type: "checkbox",
    options: [
      "CT simulasyon",
      "Kontrastli CT",
      "MR fuzyon",
      "PET-CT fuzyon",
      "Fonksiyonel MR / difuzyon / perfuzyon",
      "CBCT temelli ek degerlendirme"
    ],
    hasOther: true,
    required: true
  },
  {
    id: "immobilizasyon",
    section: "BOLUM 5 — Simulasyon, Goruntuleme ve Pozisyonlama",
    text: "Onceki tedaviyle ayni immobilizasyonu / pozisyonu korumaya calisiyor musunuz?",
    type: "radio",
    options: [
      "Evet — her zaman",
      "Evet — mumkun oldugunda",
      "Hayir — yeni tedavi icin en uygun setup secilir",
      "Onceki setup sistematik olarak sorgulanmaz"
    ],
    required: true
  },
  {
    id: "solunum_hareket",
    section: "BOLUM 5 — Simulasyon, Goruntuleme ve Pozisyonlama",
    text: "Re-irradiation simulasyonunda solunum / hareket yonetimi uygulaniyor mu?",
    type: "radio",
    options: [
      "Evet — her hareketli bolge icin rutin",
      "Evet — secili toraks / abdomen vakalarinda",
      "Hayir — uygulanmiyor",
      "Vaka bazli karar veriliyor"
    ],
    required: true
  },
  {
    id: "onceki_hedef_hacimler",
    section: "BOLUM 5 — Simulasyon, Goruntuleme ve Pozisyonlama",
    text: "Onceki RT'de kullanilan hedef hacimler ve konturlar re-irradiation planlamasinda nasil kullaniliyor?",
    type: "radio",
    options: [
      "Dogrudan transfer edilir",
      "Referans amacli incelenir",
      "Sadece overlap degerlendirmesi icin kullanilir",
      "Kullanilmiyor",
      "Vaka bazli"
    ],
    required: true
  },

  // ============================================================
  // BOLUM 6 — Planlama ve Dozimetrik Degerlendirme
  // ============================================================
  {
    id: "kumulatif_doz_yontem",
    section: "BOLUM 6 — Planlama ve Dozimetrik Degerlendirme",
    text: "Kumulatif doz degerlendirmesi yaparken kullandiginiz yontem hangisidir?",
    type: "radio",
    options: [
      "Fiziksel dozlarin dogrudan toplanmasi (Plan sum)",
      "Biyolojik doz donusumu yaparak (Orn. EQD2 / BED hesaplamasi)",
      "Deformable image registration (DIR) ile doz akumulasyonu",
      "Rijit goruntu eslestirme sonrasi yaklasik degerlendirme",
      "Kritik organlar icin doz kisitlamasina gore ayri ayri degerlendirme (formal doz toplama yapmadan)",
      "Tedavi planlama sistemi (TPS) otomatik doz birlestirme araclari",
      "Klinik / tecrubeye dayali yaklasik karar (kantitatif analiz olmadan)"
    ],
    hasOther: true,
    required: true
  },
  {
    id: "eqd2_bed",
    section: "BOLUM 6 — Planlama ve Dozimetrik Degerlendirme",
    text: "EQD2 / BED hesaplamasi yapiyor musunuz?",
    type: "radio",
    options: ["Evet (Rutin)", "Bazen", "Hayir"],
    required: true
  },
  {
    id: "trf_tcda",
    section: "BOLUM 6 — Planlama ve Dozimetrik Degerlendirme",
    text: "Re-irradiationda onceki tedavilerinden sonra gecen sureyi (interval) goz onune alip doku iyilesme faktoru (TRF) veya zaman faktorunu (TCDA) hesaplamalara dahil ediyor musunuz?",
    type: "radio",
    options: [
      "Evet (Rutin - TRF / TCDA degerleriyle sistematik olarak)",
      "Bazen (yazili protokol olmadan, sadece klinisyen karari ile)",
      "Hayir (TRF / TCDA kullanilmiyor, bu konuda bilgimiz sinirli)"
    ],
    required: true
  },
  {
    id: "kumulatif_oar_yaklasim",
    section: "BOLUM 6 — Planlama ve Dozimetrik Degerlendirme",
    text: "Kumulatif OAR kisitlari icin hangi yaklasimi benimsiyorsunuz?",
    type: "radio",
    options: [
      "Onceki dozu dikkate almayan kisitlar (flat constraints) sadece re-RT planina uygulaniyor",
      "Kumulatif kisitlar — TRF / TCDA kullanmadan",
      "Kumulatif kisitlar — TRF / TCDA ile birlikte",
      "Lokalizasyona ve vakaya gore farkli yaklasimlar",
      "Standart bir yaklasimimiz yok, literatur kilavuzlugunda karar veriyoruz"
    ],
    required: true
  },
  {
    id: "replica_plan",
    section: "BOLUM 6 — Planlama ve Dozimetrik Degerlendirme",
    text: "DICOM verisi olmayan vakalarda onceki tedaviyi temsil eden replica (taklit) plan olusturuyor musunuz?",
    type: "radio",
    options: [
      "Evet (Rutin)",
      "Bazen (sadece ortusmenin yuksek oldugu supheli vakalarda)",
      "Hayir (boyle bir yaklasimdan haberdar degildik / gerek duymuyoruz)"
    ],
    required: true
  },
  {
    id: "ptv_marjin",
    section: "BOLUM 6 — Planlama ve Dozimetrik Degerlendirme",
    text: "Re-irradiation'da PTV marjin yaklasiminiz nasildir?",
    type: "radio",
    options: [
      "De novo RT'ye gore daha dar marjin",
      "Lokalizasyona gore modifiye marjin",
      "Standart marjin",
      "Vaka bazli",
      "Yazili marjin yaklasimi yok"
    ],
    required: true
  },
  {
    id: "guvenlik_checklist",
    section: "BOLUM 6 — Planlama ve Dozimetrik Degerlendirme",
    text: "Kurumunuzda re-irradiation'a ozel bir guvenlik checklist'i var mi?",
    type: "radio",
    options: ["Evet", "Hayir"],
    required: true
  },
  {
    id: "oar_tolerans_kaynak",
    section: "BOLUM 6 — Planlama ve Dozimetrik Degerlendirme",
    text: "OAR toleranslarini belirlerken hangi ana kaynagi kullaniyorsunuz? (Birden fazla secilebilir)",
    type: "checkbox",
    options: [
      "QUANTEC",
      "ESTRO / EANO Klavuzlari",
      "AAPM TG raporlari",
      "Guncel Konsensus Raporlari",
      "EPTN Konsensusu",
      "Merkezin kendi belirledigi limitler",
      "Vaka bazli literatur taramasi",
      "Herhangi bir kilavuzu sistematik takip etmiyoruz"
    ],
    hasOther: true,
    required: true
  },
  {
    id: "paralel_seri_organ",
    section: "BOLUM 6 — Planlama ve Dozimetrik Degerlendirme",
    text: "Re-irradiation icin OAR dozlarina bakarken paralel ve seri organ olmasina gore degerlendiriyor musunuz?",
    type: "radio",
    options: ["Evet", "Hayir"],
    required: true
  },

  // ============================================================
  // BOLUM 7 — Klinik Takip, Toksisite ve Raporlama
  // ============================================================
  {
    id: "toksisite_skorlama",
    section: "BOLUM 7 — Klinik Takip, Toksisite ve Raporlama",
    text: "Re-irradiation sonrasi toksite takibinde hangi skorlama sistemini kullaniyorsunuz?",
    type: "radio",
    options: [
      "CTCAE v5.0",
      "CTCAE v4.0",
      "RTOG",
      "LENT-SOMA",
      "Standardize sistem yok"
    ],
    hasOther: true,
    required: true
  },
  {
    id: "gec_toksiteler",
    section: "BOLUM 7 — Klinik Takip, Toksisite ve Raporlama",
    text: "En sik gozlemlediginiz gec toksiteler nelerdir? (Birden fazla secilebilir)",
    type: "checkbox",
    options: ["Nekroz", "Fibrozis", "Myelopati", "Mukozit", "Organ yetmezligi"],
    hasOther: true,
    required: true
  },
  {
    id: "sistematik_kayit",
    section: "BOLUM 7 — Klinik Takip, Toksisite ve Raporlama",
    text: "Re-irradiation vakalari sistematik veri tabanina kaydediliyor mu?",
    type: "radio",
    options: [
      "Evet — prospektif",
      "Evet — retrospektif",
      "Kismen",
      "Hayir"
    ],
    required: true
  },
  {
    id: "raporlama_icerik",
    section: "BOLUM 7 — Klinik Takip, Toksisite ve Raporlama",
    text: "Re-irradiation raporlamasinda asagidakilerden hangileri rutin yer almalidir? (Birden fazla secilebilir)",
    type: "checkbox",
    options: [
      "Onceki RT dozu ve fraksiyonasyonu",
      "RT1-RT2 intervali",
      "ReRT tipi (Type 1/2)",
      "Kumulatif OAR dozlari",
      "Doz toplama yontemi",
      "Kullanilan alfa/beta",
      "Kullanilan TRF",
      "Akut toksisite",
      "Gec toksisite",
      "Lokal kontrol",
      "QoL",
      "Organ fonksiyonu"
    ],
    required: true
  },

  // ============================================================
  // BOLUM 8 — Ulusal Perspektif ve Gelecek
  // ============================================================
  {
    id: "ulusal_protokol_ihtiyac",
    section: "BOLUM 8 — Ulusal Perspektif ve Gelecek",
    text: "Ulusal re-irradiation protokolu ihtiyaci oldugunu dusunuyor musunuz?",
    type: "radio",
    options: ["Evet - kesinlikle", "Kararsizim", "Hayir"],
    required: true
  },
  {
    id: "standartlastirma_alan",
    section: "BOLUM 8 — Ulusal Perspektif ve Gelecek",
    text: "En onemli standartlastirilmasi gereken alan sizce hangileridir? (Birden fazla secilebilir)",
    type: "checkbox",
    options: [
      "Hasta secimi kriterleri",
      "Doz limitleri (OAR)",
      "Planlama teknikleri",
      "Takip protokolu",
      "Toksisite siniflamasi"
    ],
    required: true
  },
  {
    id: "ulusal_engeller",
    section: "BOLUM 8 — Ulusal Perspektif ve Gelecek",
    text: "Ulusal protokol onundeki engeller sizce hangileridir? (Birden fazla secilebilir)",
    type: "checkbox",
    options: [
      "Kurumlar arasi teknik farkliliklar",
      "Deneyim eksikligi",
      "Doz hesaplama alt yapisi eksikligi",
      "Hukuki / etik kaygilar",
      "Personel eksikligi",
      "Veri paylasim zorlugu"
    ],
    required: true
  },
  {
    id: "rehber_yaklasim",
    section: "BOLUM 8 — Ulusal Perspektif ve Gelecek",
    text: "Ulusal rehberin hazirlanmasi icin en uygun yaklasim sizce hangisi / hangileridir? (Birden fazla secilebilir)",
    type: "checkbox",
    options: [
      "Delphi yontemi",
      "Calistay + konsensus toplantisi",
      "Retrospektif veri analizi",
      "Uluslararasi guideline adaptasyonu"
    ],
    required: true
  },
  {
    id: "protokol_hedef",
    section: "BOLUM 8 — Ulusal Perspektif ve Gelecek",
    text: "Sizce ulusal protokolun oncelikli hedefi ne / neler olmalidir? (Birden fazla secilebilir)",
    type: "checkbox",
    options: [
      "Toksisiteyi azaltmak",
      "Tedavi standardizasyonu",
      "Hasta secimini netlestirmek",
      "Teknik standardizasyon",
      "Hepsi"
    ],
    required: true
  },
  {
    id: "beklenti",
    section: "BOLUM 8 — Ulusal Perspektif ve Gelecek",
    text: "Bu calismadan beklentiniz nedir?",
    type: "textarea",
    required: false
  }
];
