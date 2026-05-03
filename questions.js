// Otomatik üretildi: scripts/convert-form.js
// Kaynak: Türkiye'de Yeniden Işınlama İş Akışı Anketi (Google Forms)
// EL DEĞİŞTİRMEYİN — sorular Google Form'dan dönüştürülmüştür.

const questions = [
  {
    "id": "s1",
    "text": "S1-Yaşınız",
    "section": "BÖLÜM 1 — Katılımcı ve Kurum Profili",
    "type": "radio",
    "options": [
      "≤30",
      "31-40",
      "41-50",
      ">50"
    ],
    "required": true
  },
  {
    "id": "s2",
    "text": "S2-Cinsiyetiniz",
    "section": "BÖLÜM 1 — Katılımcı ve Kurum Profili",
    "type": "radio",
    "options": [
      "Kadın",
      "Erkek",
      "Belirtmek istemiyorum"
    ],
    "required": true
  },
  {
    "id": "s3",
    "text": "S3-Radyasyon onkolojisi alanındaki deneyiminiz ne  kadardır?",
    "section": "BÖLÜM 1 — Katılımcı ve Kurum Profili",
    "type": "radio",
    "options": [
      "0-5 yıl",
      "6-10 yıl",
      "11-15 yıl",
      "16 yıl ve üzeri"
    ],
    "required": true
  },
  {
    "id": "s4",
    "text": "S4-Çalıştığınız kurum tipi hangisidir?",
    "section": "BÖLÜM 1 — Katılımcı ve Kurum Profili",
    "type": "radio",
    "options": [
      "Üniversite Hastanesi",
      "Eğitim ve Araştırma Hastanesi",
      "Şehir Hastanesi",
      "Özel Hastane",
      "Onkoloji / Kanser Merkezi"
    ],
    "hasOther": true,
    "required": true
  },
  {
    "id": "s5",
    "text": "S5-Çalıştığınız kurumun bulunduğu coğrafi bölge hangisidir?",
    "section": "BÖLÜM 1 — Katılımcı ve Kurum Profili",
    "type": "radio",
    "options": [
      "Marmara",
      "Ege",
      "Akdeniz",
      "İç Anadolu",
      "Karadeniz",
      "Doğu Anadolu",
      "Güneydoğu Anadolu"
    ],
    "required": true
  },
  {
    "id": "s6",
    "text": "S6-Çalıştığınız kurumda re-RT uygulanıyor mu?",
    "section": "BÖLÜM 1 — Katılımcı ve Kurum Profili",
    "type": "radio",
    "options": [
      "Evet",
      "Hayır"
    ],
    "required": true
  },
  {
    "id": "s7",
    "text": "S7-Çalıştığınız kurumda yılda yaklaşık kaç hastaya re-RT uygulanmaktadır?",
    "section": "BÖLÜM 1 — Katılımcı ve Kurum Profili",
    "showIf": {
      "id": "s6",
      "equals": "Evet"
    },
    "type": "radio",
    "options": [
      "0-50",
      "50-100",
      "100-200",
      ">200"
    ],
    "required": true
  },
  {
    "id": "s8",
    "text": "S8-Çalıştığınız kurumda yılda yaklaşık kaç pediatrik hastaya re-RT uygulanmaktadır?",
    "section": "BÖLÜM 1 — Katılımcı ve Kurum Profili",
    "showIf": {
      "id": "s6",
      "equals": "Evet"
    },
    "type": "radio",
    "options": [
      "Yok",
      "<10",
      "10-20",
      ">20"
    ],
    "required": true
  },
  {
    "id": "s9",
    "text": "S9-Çalıştığınız kurumda hangi radyoterapi teknikleri / teknolojileri kullanılmaktadır?",
    "section": "BÖLÜM 1 — Katılımcı ve Kurum Profili",
    "showIf": {
      "id": "s6",
      "equals": "Evet"
    },
    "type": "checkbox",
    "options": [
      "3B-KRT",
      "IMRT",
      "VMAT",
      "SRS/SRT/SBRT – Linak tabanlı",
      "SRS/SRT/SBRT – Robotik sistem tabanlı",
      "SRS – Gamma Knife",
      "MR-Linak / MR-kılavuzlu radyoterapi",
      "Tomoterapi",
      "Online Adaptif CBCT Tabanlı RT",
      "Brakiterapi",
      "İntraoperatif RT",
      "IGRT",
      "SGRT"
    ],
    "hasOther": true,
    "required": true
  },
  {
    "id": "s10",
    "text": "S10-Çalıştığınız kurumda hangi tedavi planlama sistemi / sistemleri kullanılmaktadır?",
    "section": "BÖLÜM 1 — Katılımcı ve Kurum Profili",
    "showIf": {
      "id": "s6",
      "equals": "Evet"
    },
    "type": "checkbox",
    "options": [
      "Eclipse (Varian)",
      "RayStation (RaySearch)",
      "Monaco (Elekta)",
      "iPlan / Elements (BrainLab)",
      "MultiPlan (Accuray)",
      "Precision TPS (Accuray)"
    ],
    "hasOther": true,
    "required": true
  },
  {
    "id": "s11",
    "text": "S11-Çalıştığınız kurumda re-RT vakaları ESTRO / EORTC konsensüs tanımlarına göre sınıflandırılıyor mu?\nTip 1: Önceki ve yeni ışınlanan hacimler arasında geometrik örtüşme vardır.\nTip 2: Geometrik örtüşme yoktur; ancak kümülatif doz nedeniyle toksisite endişesi vardır.\nTekrarlayan Organ Işınlaması: Aynı organ yeniden ışınlanır; geometrik örtüşme ve belirgin kümülatif doz/toksisite endişesi yoktur.",
    "section": "BÖLÜM 2 — Sınıflandırma ve Kayıt Sistemi",
    "showIf": {
      "id": "s6",
      "equals": "Evet"
    },
    "type": "checkbox",
    "options": [
      "Evet — tüm vakalarda genişletilmiş sınıflama kullanıyoruz",
      "Kısmen — yalnızca seçili vakalarda sınıflandırıyoruz",
      "Hayır — sınıflamayı biliyoruz ama rutin kullanmıyoruz",
      "Hayır — bu sınıflamadan haberdar değildik"
    ],
    "required": true
  },
  {
    "id": "s12",
    "text": "S12-Kurumunuzda re-RT için yazılı bir klinik protokol / iş akışı var mı?",
    "section": "BÖLÜM 2 — Sınıflandırma ve Kayıt Sistemi",
    "showIf": {
      "id": "s6",
      "equals": "Evet"
    },
    "type": "checkbox",
    "options": [
      "Evet — yazılı ve kurumsal onaylı",
      "Evet — yazılı ancak resmi onay süreci tamamlanmadı",
      "Hayır — vaka bazlı ilerleniyor",
      "Hayır – hazırlık / geliştirme aşamasında"
    ],
    "hasOther": true,
    "required": true
  },
  {
    "id": "s13",
    "text": "S13-Re-RT uygulamalarında peer review (meslektaş değerlendirmesi) yapıyor musunuz?",
    "section": "BÖLÜM 2 — Sınıflandırma ve Kayıt Sistemi",
    "showIf": {
      "id": "s6",
      "equals": "Evet"
    },
    "type": "checkbox",
    "options": [
      "Evet, her vakada rutin olarak yapıyorum",
      "Evet, kompleks / yüksek riskli vakalarda yapıyorum",
      "Yapmak istiyorum ancak imkânım yok",
      "Hayır, gerek duymuyorum"
    ],
    "required": true
  },
  {
    "id": "s14",
    "text": "S14-Re-RT iş akışı ve kararlarını ayrıca dokümante ediyor musunuz?",
    "section": "BÖLÜM 2 — Sınıflandırma ve Kayıt Sistemi",
    "showIf": {
      "id": "s6",
      "equals": "Evet"
    },
    "type": "checkbox",
    "options": [
      "Evet, hasta dosyasında fiziksel (hard copy) olarak kaydediyorum",
      "Evet, tedavi planlama sistemi içinde dijital olarak kaydediyorum",
      "Evet, hastane bilgi sistemi (HBS) / elektronik hasta kaydında belgeliyorum",
      "Evet, kuruma özgü re-RT formu / şablonu kullanıyorum",
      "Hayır, rutin klinik kayıtların dışında ayrıca re-RT özelinde ayrıca bir dokümantasyon yapmıyorum"
    ],
    "hasOther": true,
    "required": true
  },
  {
    "id": "s15",
    "text": "S15-Önceki RT plan verilerine ne sıklıkla ulaşıyorsunuz?",
    "section": "BÖLÜM 3 — Veri Erişimi ve Kalitesi",
    "showIf": {
      "id": "s6",
      "equals": "Evet"
    },
    "type": "radio",
    "options": [
      "Hiçbir zaman",
      "Nadiren",
      "Bazen",
      "Çoğunlukla",
      "Her zaman"
    ],
    "required": true
  },
  {
    "id": "s16",
    "text": "S16- Re-RT planlama öncesinde hastanın önceki radyoterapiye ait planlama verilerine genellikle hangi düzeyde erişebiliyorsunuz?",
    "section": "BÖLÜM 3 — Veri Erişimi ve Kalitesi",
    "showIf": {
      "id": "s6",
      "equals": "Evet"
    },
    "type": "radio",
    "options": [
      "5 (CT + RTSTRUCT + RTPLAN + RTDOSE)",
      "4 (CT + DICOM veri)",
      "3 (Yalnızca yazılı plan özeti / epikriz)",
      "2 (Yalnızca fiziksel kayıt / ekran görüntüsü)",
      "1 (Veri yok)"
    ],
    "required": true
  },
  {
    "id": "s17",
    "text": "S17- Re-RT kararı verirken aşağıda belirtilen ilk tedavi verilerinin önemini değerlendiriniz.",
    "section": "BÖLÜM 3 — Veri Erişimi ve Kalitesi",
    "showIf": {
      "id": "s6",
      "equals": "Evet"
    },
    "type": "grid",
    "rows": [
      "Doz-Volüm Histogramı (DVH)",
      "3B Volümetrik izodoz dağılımı",
      "Uygulanan toplam doz (Gy)",
      "Fraksiyon dozu ve sayısı",
      "Hedef volüm bilgisi (GTV/CTV/PTV)",
      "Kritik organ konturları (OAR)",
      "Simülasyon görüntüleri (CT/MR)",
      "Tedavi özeti / epikriz",
      "Akut toksisite bilgisi",
      "Geç toksisite bilgisi",
      "Tedaviye yanıt bilgisi (lokal kontrol)",
      "Önceki tedavi ile re-RT arasında geçen süre"
    ],
    "columns": [
      "1",
      "2",
      "3",
      "4",
      "5"
    ],
    "required": true
  },
  {
    "id": "s18",
    "text": "S18-Önceki tedavinin plan verileri (DICOM, doz dağılımı vb.) rutin olarak sisteme entegre ediliyor mu?",
    "section": "BÖLÜM 3 — Veri Erişimi ve Kalitesi",
    "showIf": {
      "id": "s6",
      "equals": "Evet"
    },
    "type": "radio",
    "options": [
      "Gerek duymuyoruz",
      "Önceki dozu dikkate almayan kısıtlar kullanıyoruz",
      "Önceki plan verisi çoğunlukla mevcut değil",
      "Yalnızca yüksek riskli / seçili vakalarda",
      "Her vakada"
    ],
    "required": true
  },
  {
    "id": "s19",
    "text": "S19-Önceki tedavinin verileri başka bir kurumdan geldiğinde en çok hangi zorluklarla karşılaşıyorsunuz?",
    "section": "BÖLÜM 3 — Veri Erişimi ve Kalitesi",
    "showIf": {
      "id": "s6",
      "equals": "Evet"
    },
    "type": "checkbox",
    "options": [
      "DICOM uyumsuzluğu",
      "DICOM verilerine (plan, doz, görüntü) ulaşamama",
      "Farklı tedavi planlama sistemi nedeniyle dozların birleştirilememesi",
      "Eksik dose dosyası",
      "Eksik structure set",
      "Eski / pre-DICOM kayıt",
      "Fiziksel / dijital arşiv kayıpları",
      "Epikriz / tedavi özetinin yetersiz veya eksik olması",
      "İdari izin süreci",
      "Kurumlar arası veri paylaşım sisteminin olmaması",
      "Kurumun veri paylaşımından çekinmesi",
      "Sorun yaşamıyoruz"
    ],
    "hasOther": true,
    "required": true
  },
  {
    "id": "s20",
    "text": "S20-Önceki tedavi verileri başka bir kurumdan talep edildiğinde, hasta verilerinin paylaşımında KVKK kapsamında sorun/engel yaşıyor musunuz?",
    "section": "BÖLÜM 3 — Veri Erişimi ve Kalitesi",
    "showIf": {
      "id": "s6",
      "equals": "Evet"
    },
    "type": "radio",
    "options": [
      "Hayır — uygun süreçlerle sorunsuz paylaşım sağlanıyor",
      "Nadiren — ek izin/onam süreçleri nedeniyle gecikme oluyor",
      "Sık — veri paylaşımı çoğu zaman gecikiyor veya sınırlı kalıyor",
      "Evet — çoğu durumda veri paylaşımı yapılamıyor",
      "Bilmiyorum / deneyimim yok"
    ],
    "required": false
  },
  {
    "id": "s21",
    "text": "S21-Önceki tedavi planının DICOM verilerine ulaşılamıyorsa nasıl bir yol izliyorsunuz?",
    "section": "BÖLÜM 3 — Veri Erişimi ve Kalitesi",
    "showIf": {
      "id": "s6",
      "equals": "Evet"
    },
    "type": "checkbox",
    "options": [
      "Yazılı epikriz / plan özeti istiyoruz",
      "Önceki merkezle iletişim kuruyoruz",
      "Literatür bazlı maksimum doz aldığı varsayımını kullanıyoruz",
      "Kümülatif doz hesabı yapılamadığında standart OAR doz kısıtlarını referans alıyoruz",
      "Temsili (replica) plan oluşturmayı değerlendiriyoruz",
      "Bu durumda hastayı re-RT uygulamasına uygun bulmuyoruz"
    ],
    "hasOther": true,
    "required": true
  },
  {
    "id": "s22",
    "text": "S22-Re-RT planlamasında, BT simülasyona ek olarak, hangi görüntüleme modalitelerini kullanıyorsunuz?",
    "section": "BÖLÜM 4 — Simülasyon, Görüntüleme ve Pozisyonlama",
    "showIf": {
      "id": "s6",
      "equals": "Evet"
    },
    "type": "checkbox",
    "options": [
      "Kontrastlı CT",
      "MR füzyon",
      "PET-CT füzyon",
      "Fonksiyonel MR / Difüzyon MR  / Perfüzyon MR",
      "CBCT temelli ek değerlendirme"
    ],
    "hasOther": true,
    "required": true
  },
  {
    "id": "s23",
    "text": "S23-Simülasyonda önceki tedaviyle aynı immobilizasyonu / pozisyonu korumaya çalışıyor musunuz?",
    "section": "BÖLÜM 4 — Simülasyon, Görüntüleme ve Pozisyonlama",
    "showIf": {
      "id": "s6",
      "equals": "Evet"
    },
    "type": "radio",
    "options": [
      "Evet, her zaman",
      "Evet, mümkün olduğunda",
      "Hayır, yeni tedavi için en uygun setup seçilir",
      "Önceki setup sistematik olarak sorgulanmaz"
    ],
    "required": true
  },
  {
    "id": "s24",
    "text": "S24-Re-RT simülasyonunda solunum / hareket yönetimi uyguluyor musunuz?",
    "section": "BÖLÜM 4 — Simülasyon, Görüntüleme ve Pozisyonlama",
    "showIf": {
      "id": "s6",
      "equals": "Evet"
    },
    "type": "radio",
    "options": [
      "Evet, her hareketli bölge için rutin",
      "Evet, seçili toraks / abdomen vakalarında",
      "Vaka bazlı karar veriliyor",
      "Hayır, uygulanmıyor"
    ],
    "required": true
  },
  {
    "id": "s25",
    "text": "S25-Önceki tedavide kullanılan hedef hacimler ve konturlar re-RT planlamasında nasıl kullanılıyor?",
    "section": "BÖLÜM 4 — Simülasyon, Görüntüleme ve Pozisyonlama",
    "showIf": {
      "id": "s6",
      "equals": "Evet"
    },
    "type": "radio",
    "options": [
      "Doğrudan transfer edilir",
      "Referans amaçlı incelenir",
      "Sadece overlap değerlendirmesi için kullanılır",
      "Vaka bazlı kullanılır",
      "Kullanılmıyor"
    ],
    "required": true
  },
  {
    "id": "s26",
    "text": "S26-Kurumunuzda Re-RT uyguladığınız anatomik bölgeler hangileridir?",
    "section": "BÖLÜM 5 — Planlama ve Dozimetrik Değerlendirme",
    "showIf": {
      "id": "s6",
      "equals": "Evet"
    },
    "type": "checkbox",
    "options": [
      "Beyin — primer",
      "Beyin — metastazlar",
      "Baş-boyun",
      "Toraks — akciğer",
      "Toraks — özofagus / mediasten",
      "Meme / göğüs duvarı",
      "Üst abdomen — karaciğer, pankreas vb.",
      "Pelvis — prostat, rektum, serviks vb.",
      "Omurga / vertebra",
      "Ekstremite / yumuşak doku"
    ],
    "hasOther": true,
    "required": true
  },
  {
    "id": "s27",
    "text": "S27-Kurumunuzda re-RT uygulamalarında Radyasyon Onkolojisi Uzmanı – Medikal Fizik Uzmanı iletişimi hangi aşamada başlamaktadır?",
    "section": "BÖLÜM 5 — Planlama ve Dozimetrik Değerlendirme",
    "showIf": {
      "id": "s6",
      "equals": "Evet"
    },
    "type": "radio",
    "options": [
      "Endikasyon aşamasında (hasta kabulü / karar sürecinde)",
      "Simülasyon aşamasında",
      "Planlama aşamasında",
      "Standart plan onay süreci yeterli görülüyor",
      "Her vaka için görüşü alınıyor",
      "Standart bir sürecimiz yok, vaka bazlı değişkenlik gösteriyor"
    ],
    "hasOther": true,
    "required": true
  },
  {
    "id": "s28",
    "text": "S28-Re-RT planlamasında hangi tedavi modalitelerini kullanıyorsunuz?",
    "section": "BÖLÜM 5 — Planlama ve Dozimetrik Değerlendirme",
    "showIf": {
      "id": "s6",
      "equals": "Evet"
    },
    "type": "checkbox",
    "options": [
      "3B-KRT",
      "IMRT",
      "VMAT",
      "SRS / SRT / SBRT",
      "Brakiterapi",
      "İntraoperatif radyoterapi"
    ],
    "hasOther": true,
    "required": true
  },
  {
    "id": "s29",
    "text": "S29-Re-RT planlamasında önceki tedaviye ait görüntüleri mevcut görüntülerle füzyon yapıyor musunuz?",
    "section": "BÖLÜM 5 — Planlama ve Dozimetrik Değerlendirme",
    "showIf": {
      "id": "s6",
      "equals": "Evet"
    },
    "type": "checkbox",
    "options": [
      "Evet, rijit füzyon kullanıyorum",
      "Evet, deformable (elastik) füzyon kullanıyorum",
      "Evet, her ikisini de kullanıyorum (vakaya göre)",
      "Hayır, füzyon yapmıyorum",
      "Önceki görüntülere erişim olmadığı için değerlendiremiyoruz"
    ],
    "hasOther": true,
    "required": true
  },
  {
    "id": "s30",
    "text": "S30-Kümülatif doz değerlendirmesi yaparken hangi yöntemleri kullanıyorsunuz?",
    "section": "BÖLÜM 5 — Planlama ve Dozimetrik Değerlendirme",
    "showIf": {
      "id": "s6",
      "equals": "Evet"
    },
    "type": "checkbox",
    "options": [
      "Fiziksel dozların doğrudan toplanması / plan sum",
      "TPS tabanlı doz birleştirme",
      "Rijit görüntü eşleştirme ile yaklaşık doz değerlendirmesi",
      "Deformable image registration (DIR) ile doz akümülasyonu",
      "Biyolojik doz dönüşümü kullanılması (EQD2 / BED)",
      "Kritik organ dozlarının kümülatif toplam doz hesaplamadan ayrı ayrı değerlendirilmesi",
      "Doku iyileşmesi / recovery varsayımının dikkate alınması",
      "Klinik deneyime dayalı yaklaşık değerlendirme",
      "Lokalizasyon ve vaka özelliklerine göre farklı yaklaşımlar kullanılması",
      "Standart bir yaklaşımımız yok; literatür ve kılavuzlar doğrultusunda karar veriyoruz",
      "Kümülatif doz değerlendirmesi yapmıyoruz"
    ],
    "hasOther": true,
    "required": true
  },
  {
    "id": "s31",
    "text": "S31-Kümülatif doz değerlendirmesi re-RT kararında zorunlu olmalıdır.",
    "section": "BÖLÜM 5 — Planlama ve Dozimetrik Değerlendirme",
    "showIf": {
      "id": "s6",
      "equals": "Evet"
    },
    "type": "radio",
    "options": [
      "1 (Kesinlikle katılmıyorum)",
      "2 (Katılmıyorum)",
      "3 (Kararsızım)",
      "4 (Katılıyorum)",
      "5 (Kesinlikle Katılıyorum)"
    ],
    "required": true
  },
  {
    "id": "s32",
    "text": "S32-Kümülatif doz değerlendirmesi yaparken EQD2/ BED hesaplaması yapıyor musunuz?",
    "section": "BÖLÜM 5 — Planlama ve Dozimetrik Değerlendirme",
    "showIf": {
      "id": "s6",
      "equals": "Evet"
    },
    "type": "radio",
    "options": [
      "Evet, her vakada rutin olarak",
      "Evet, seçilmiş vakalarda uyguluyorum",
      "Hayır, rutin olarak yapmıyoruz",
      "Uygulanabilir değil / değerlendirmiyoruz"
    ],
    "hasOther": true,
    "required": true
  },
  {
    "id": "s33",
    "text": "S33-Kümülatif doz hesabında önceki tedavi ile yeni tedavi arasındaki süreyi (interval) dikkate alıyor musunuz?",
    "section": "BÖLÜM 5 — Planlama ve Dozimetrik Değerlendirme",
    "showIf": {
      "id": "s6",
      "equals": "Evet"
    },
    "type": "radio",
    "options": [
      "Evet, zaman düzeltmeli doz akümülasyonu (TCDA, time-corrected dose accumulation) gibi matematiksel modeller kullanıyoruz",
      "Evet, klinik değerlendirmeye dayalı yaklaşık bir doku iyileşmesi / doz azalımı varsayımı uyguluyoruz",
      "Hayır, önceki ve yeni dozu doğrudan topluyoruz; zaman etkisini dikkate almıyoruz",
      "Bu tür modellerin farkındayız ancak rutin kullanmıyoruz",
      "Bu kavramdan haberdar değiliz"
    ],
    "hasOther": true,
    "required": true
  },
  {
    "id": "s34",
    "text": "S34-Doku iyileşme (recovery) faktörü uyguladığınızda hangi yaklaşımı benimsiyorsunuz?",
    "section": "BÖLÜM 5 — Planlama ve Dozimetrik Değerlendirme",
    "showIf": {
      "id": "s6",
      "equals": "Evet"
    },
    "type": "checkbox",
    "options": [
      "Dokuya özgü sabit bir iyileşme oranı kullanıyoruz",
      "Tedaviler arası süreye bağlı değişken iyileşme modeli uyguluyoruz",
      "Yayınlanmış literatür veya kılavuz değerlerini referans alıyoruz",
      "Klinik ve vaka bazlı değerlendirme yapıyoruz",
      "Doku iyileşmesi / recovery faktörü kullanmıyoruz"
    ],
    "hasOther": true,
    "required": true
  },
  {
    "id": "s35",
    "text": "S35-DICOM-RT verisi bulunmayan olgularda, önceki radyoterapiyi temsil edecek yaklaşık/temsili bir plan (replica plan) oluşturuyor musunuz?",
    "section": "BÖLÜM 5 — Planlama ve Dozimetrik Değerlendirme",
    "showIf": {
      "id": "s6",
      "equals": "Evet"
    },
    "type": "radio",
    "options": [
      "Evet, rutin olarak oluşturuyoruz",
      "Evet, yalnızca yüksek örtüşme şüphesi olan seçili vakalarda oluşturuyoruz",
      "Hayır, bu yaklaşımı kullanmıyoruz ancak farkındayız",
      "Hayır, böyle bir yaklaşımdan haberdar değildik"
    ],
    "required": true
  },
  {
    "id": "s36",
    "text": "S36-Doz haritalama / doz akümülasyonu yapamadığınız durumlarda kümülatif dozu değerlendirmek için hangi yöntemleri kullanıyorsunuz?",
    "section": "BÖLÜM 5 — Planlama ve Dozimetrik Değerlendirme",
    "showIf": {
      "id": "s6",
      "equals": "Evet"
    },
    "type": "checkbox",
    "options": [
      "Maksimum nokta dozlarını / Dmax değerlerini referans alıyoruz",
      "Literatürde bildirilen organ doz kısıtlarını referans alıyoruz",
      "Daha konservatif / düşük doz kısıtları uyguluyoruz",
      "EQD2 / BED dönüşümü ile yaklaşık kümülatif doz tahmini yapıyoruz",
      "Klinik risk yüksek görülürse re-RT kaçınıyoruz",
      "Bu durumda standart bir yaklaşımımız yok; vaka bazlı karar veriyoruz"
    ],
    "hasOther": true,
    "required": true
  },
  {
    "id": "s37",
    "text": "S37-Kurumunuzda re-RT uygulamasına özel bir kontrol listesi (checklist) var mı?",
    "section": "BÖLÜM 5 — Planlama ve Dozimetrik Değerlendirme",
    "showIf": {
      "id": "s6",
      "equals": "Evet"
    },
    "type": "radio",
    "options": [
      "Evet, yazılı ve standartlaştırılmış",
      "Hayır"
    ],
    "required": true
  },
  {
    "id": "s38",
    "text": "S38-Re-RT vakaları sistematik veri tabanına kaydediliyor mu?",
    "section": "BÖLÜM 6 —Takip ve Raporlama",
    "showIf": {
      "id": "s6",
      "equals": "Evet"
    },
    "type": "radio",
    "options": [
      "Evet, prospektif olarak düzenli kaydediliyor",
      "Evet, retrospektif olarak arşivden derleniyor",
      "Kısmen, yalnızca bazı olgular veya sınırlı değişkenler kaydediliyor",
      "Hayır, sistematik kayıt yapılmıyor"
    ],
    "required": true
  },
  {
    "id": "s39",
    "text": "S39-Re-RT raporlamasında aşağıdakilerden hangilerinin rutin olarak yer alması gerektiğini düşünüyorsunuz?",
    "section": "BÖLÜM 6 —Takip ve Raporlama",
    "showIf": {
      "id": "s6",
      "equals": "Evet"
    },
    "type": "checkbox",
    "options": [
      "Önceki radyoterapi dozu ve fraksiyonasyonu",
      "Önceki radyoterapi ile re-RT arasındaki süre",
      "Re-RT tipi: Tip 1 / Tip 2 / tekrarlayan organ ışınlaması",
      "Kümülatif kritik organ dozları",
      "Doz birleştirme / doz akümülasyonu yöntemi",
      "Biyolojik doz dönüşümünde kullanılan α/β değeri",
      "Doku iyileşmesi / recovery faktörü veya zaman bağımlı iyileşme modeli",
      "Akut toksisite",
      "Geç toksisite",
      "Lokal kontrol",
      "Organ fonksiyonu",
      "Yaşam kalitesi"
    ],
    "hasOther": true,
    "required": true
  },
  {
    "id": "s40",
    "text": "S40-Re-RT planlaması ve uygulamasına yönelik aldığınız eğitimi yeterli buluyor musunuz?",
    "section": "BÖLÜM 6 —Takip ve Raporlama",
    "showIf": {
      "id": "s6",
      "equals": "Evet"
    },
    "type": "radio",
    "options": [
      "Evet, yeterli buluyorum",
      "Kısmen yeterli buluyorum",
      "Hayır, yetersiz buluyorum",
      "Bu konuda yapılandırılmış bir eğitim almadım",
      "Fikrim yok"
    ],
    "required": true
  },
  {
    "id": "s41",
    "text": "S41-Re-RT konusunda klinik yeterliliğinizi ne düzeyde değerlendiriyorsunuz?",
    "section": "BÖLÜM 6 —Takip ve Raporlama",
    "showIf": {
      "id": "s6",
      "equals": "Evet"
    },
    "type": "radio",
    "options": [
      "1 — Hiç yeterli değilim",
      "2 — Az düzeyde yeterliyim",
      "3 — Orta düzeyde yeterliyim",
      "4 — Yeterliyim",
      "5 — Çok yeterliyim"
    ],
    "required": true
  },
  {
    "id": "s42",
    "text": "S42-Re-RT için ulusal bir protokol/kılavuz oluşturulmasına ihtiyaç olduğunu düşünüyor musunuz?",
    "section": "BÖLÜM 6 —Takip ve Raporlama",
    "showIf": {
      "id": "s6",
      "equals": "Evet"
    },
    "type": "radio",
    "options": [
      "Evet, kesinlikle gerekli",
      "Evet, faydalı olur ancak zorunlu değil",
      "Kararsızım / fikrim yok",
      "Hayır, mevcut uluslararası kılavuzlar yeterli",
      "Hayır, re-RT çoğunlukla vaka bazlı değerlendirilmelidir"
    ],
    "required": true
  },
  {
    "id": "s43",
    "text": "S43-Re-RT kararında sizce en önemli standartlaştırılması gereken alanlar hangileridir?",
    "section": "BÖLÜM 6 —Takip ve Raporlama",
    "showIf": {
      "id": "s6",
      "equals": "Evet"
    },
    "type": "checkbox",
    "options": [
      "Hasta seçimi kriterleri",
      "Re-RT endikasyonları",
      "Normal doku / OAR doz limitleri",
      "Kümülatif doz hesaplama ve doz akümülasyonu yöntemi",
      "Görüntü eşleştirme standardı: rijit ve/veya deformable image registration",
      "Re-RT sınıflaması: Tip 1 / Tip 2 / tekrarlayan organ ışınlaması",
      "Biyolojik doz hesaplama yöntemleri: EQD2 / BED",
      "Doku iyileşmesi / recovery faktörü kullanımı",
      "Toksisite değerlendirme ve sınıflaması",
      "Tedavi sonrası takip protokolleri",
      "Raporlama standartları"
    ],
    "hasOther": true,
    "required": true
  },
  {
    "id": "s44",
    "text": "S44-Ulusal re-RT protokolü oluşturulmasının önündeki engeller sizce nelerdir?",
    "section": "BÖLÜM 6 —Takip ve Raporlama",
    "showIf": {
      "id": "s6",
      "equals": "Evet"
    },
    "type": "checkbox",
    "options": [
      "Kurumlar arası teknik altyapı ve yazılım farklılıkları",
      "Klinik deneyim ve uzmanlık düzeyindeki farklılıklar",
      "Doz hesaplama / doz akümülasyonu altyapısının sınırlı olması",
      "Veri standardizasyonu ve veri paylaşımındaki güçlükler",
      "Hukuki / etik kaygılar ve veri korumadaki zorluklar (KVKK vb.)",
      "Personel ve zaman kısıtlılığı",
      "Multidisipliner uzlaşı eksikliği",
      "Ulusal veri tabanı veya ortak kayıt sisteminin olmaması",
      "Kanıt düzeyinin sınırlı veya heterojen olması"
    ],
    "hasOther": true,
    "required": true
  },
  {
    "id": "s45",
    "text": "S45-Ulusal re-RT kılavuzunun hazırlanmasında hangi yaklaşımların kullanılmasını uygun bulursunuz?",
    "section": "BÖLÜM 6 —Takip ve Raporlama",
    "showIf": {
      "id": "s6",
      "equals": "Evet"
    },
    "type": "checkbox",
    "options": [
      "Delphi yöntemi ile uzman görüşü alınması",
      "Konsensüs çalıştayı / uzman panel toplantıları düzenlenmesi",
      "Sistematik literatür derlemesi yapılması",
      "Çok merkezli ulusal retrospektif veri analizi yapılması",
      "Uluslararası kılavuzların ulusal koşullara uyarlanması",
      "Ulusal re-RT olgu veri tabanının oluşturulması"
    ],
    "hasOther": true,
    "required": true
  },
  {
    "id": "s46",
    "text": "S46-Türkiye’de re-RT konusunda planlanacak çok merkezli prospektif bir çalışmaya katılmak ister misiniz?",
    "section": "BÖLÜM 6 —Takip ve Raporlama",
    "showIf": {
      "id": "s6",
      "equals": "Evet"
    },
    "type": "radio",
    "options": [
      "Evet, katılmak isterim",
      "Kararsızım",
      "Hayır, katılmak istemem"
    ],
    "required": true
  },
  {
    "id": "s47",
    "text": "S47-Re-RT pratiğinizde altyapı açısından en önemli eksiklikler nelerdir?",
    "section": "BÖLÜM 6 —Takip ve Raporlama",
    "showIf": {
      "id": "s6",
      "equals": "Evet"
    },
    "type": "checkbox",
    "options": [
      "Re-RT konusunda klinik deneyim ve eğitim ihtiyacı",
      "Re-RT planlamasında medikal fizik desteği için ayrılabilecek zaman ve kaynakların sınırlı olması",
      "Multidisipliner değerlendirme ve ekip iş akışının standart olmaması",
      "Re-RT özgü kurumsal protokol / kontrol listesi eksikliği",
      "Önceki radyoterapi verilerine erişim ve veri aktarım süreçlerindeki güçlükler",
      "Kurumlar arası veri paylaşım altyapısının olmaması",
      "Kritik organ doz sınırlarının bilinmemesi",
      "Kümülatif doz hesaplama / doz akümülasyonu aracının olmaması",
      "Doz haritalama / dose mapping yazılımının olmaması",
      "Deformable image registration (DIR) yazılımının olmaması",
      "Tedavi planlama sisteminde re-RT değerlendirmesine yönelik araçların sınırlı olması",
      "Stereotaktik tedavi altyapısının sınırlı olması",
      "Görüntü kılavuzlu radyoterapi / IGRT kapasitesinin sınırlı olması",
      "Yüzey kılavuzlu radyoterapi (SGRT) eksikliği",
      "Hareket yönetimi / motion management olanaklarının sınırlı olması",
      "MR-LINAC veya hibrit görüntüleme sistemlerinin olmaması"
    ],
    "hasOther": true,
    "required": true
  },
  {
    "id": "s48",
    "text": "S48-Ulusal TReTREAT görev grubundan beklentiniz nedir?",
    "section": "BÖLÜM 6 —Takip ve Raporlama",
    "showIf": {
      "id": "s6",
      "equals": "Evet"
    },
    "type": "checkbox",
    "options": [
      "Ulusal re-RT kılavuzu oluşturulması",
      "Eğitim / kurs / sertifikasyon programları düzenlenmesi",
      "Ulusal re-RT kayıt sistemi / registry kurulması",
      "Kurumlar arası veri paylaşım süreçlerinin standartlaştırılması",
      "Teknik standartların belirlenmesi: DIR, doz akümülasyonu vb.",
      "Multidisipliner konsensüs toplantıları düzenlenmesi",
      "Klinik karar destek araçları geliştirilmesi",
      "Uluslararası kılavuzların ulusal koşullara uyarlanması"
    ],
    "hasOther": true,
    "required": true
  },
  {
    "id": "s49",
    "text": "S49-Mesleğiniz nedir?",
    "section": "BÖLÜM 6 —Takip ve Raporlama",
    "showIf": {
      "id": "s6",
      "equals": "Evet"
    },
    "type": "radio",
    "options": [
      "Radyasyon Onkoloğu",
      "Medikal Fizik Uzmanı"
    ],
    "required": true
  },
  {
    "id": "s50",
    "text": "S50-Kurumunuzda re-RT kararı genellikle nasıl verilmektedir?",
    "section": "BÖLÜM 6 —Takip ve Raporlama",
    "showIf": {
      "allOf": [
        {
          "id": "s6",
          "equals": "Evet"
        },
        {
          "id": "s49",
          "equals": "Radyasyon Onkoloğu"
        }
      ]
    },
    "type": "checkbox",
    "options": [
      "Multidisipliner tümör konseyi kararıyla",
      "Radyasyon onkolojisi uzmanı tarafından bağımsız olarak",
      "Radyasyon onkolojisi uzmanı ve ilgili klinik branşın ortak değerlendirmesiyle",
      "Radyasyon onkolojisi uzmanı ve medikal fizik uzmanının ortak klinik-dozimetrik değerlendirmesiyle",
      "Vaka bazlı değişkenlik göstermektedir"
    ],
    "hasOther": true,
    "required": true
  },
  {
    "id": "s51",
    "text": "S51-Re-RT uygulamalarınızın temel amacı genellikle nedir?",
    "section": "BÖLÜM 6 —Takip ve Raporlama",
    "showIf": {
      "allOf": [
        {
          "id": "s6",
          "equals": "Evet"
        },
        {
          "id": "s49",
          "equals": "Radyasyon Onkoloğu"
        }
      ]
    },
    "type": "radio",
    "options": [
      "Ağırlıklı olarak küratif / radikal amaçlı",
      "Ağırlıklı olarak palyatif amaçlı",
      "Küratif / radikal ve palyatif amaçlı uygulamalar benzer oranda",
      "Bu dağılımı bilmiyorum / kayıt altına almıyoruz"
    ],
    "required": true
  },
  {
    "id": "s52",
    "text": "S52-Küratif / radikal amaçlı re-RT kararı verirken, önceki radyoterapi ile yeni radyoterapi arasındaki süre için kabul ettiğiniz minimum bir eşik var mı?",
    "section": "BÖLÜM 6 —Takip ve Raporlama",
    "showIf": {
      "allOf": [
        {
          "id": "s6",
          "equals": "Evet"
        },
        {
          "id": "s49",
          "equals": "Radyasyon Onkoloğu"
        }
      ]
    },
    "type": "radio",
    "options": [
      "<3 ay",
      "3–6 ay",
      "6–12 ay",
      ">12 ay",
      "Belirli bir minimum süre eşiğimiz yok; vaka bazlı değerlendiriyoruz"
    ],
    "required": true
  },
  {
    "id": "s53",
    "text": "S53-Palyatif amaçlı re-RT kararı verirken, önceki radyoterapi ile yeni radyoterapi arasındaki süre için kabul ettiğiniz minimum bir eşik var mı?",
    "section": "BÖLÜM 6 —Takip ve Raporlama",
    "showIf": {
      "allOf": [
        {
          "id": "s6",
          "equals": "Evet"
        },
        {
          "id": "s49",
          "equals": "Radyasyon Onkoloğu"
        }
      ]
    },
    "type": "radio",
    "options": [
      "<3 ay",
      "3–6 ay",
      "6–12 ay",
      ">12 ay",
      "Belirli bir minimum süre eşiğimiz yok; vaka bazlı değerlendiriyoruz"
    ],
    "required": true
  },
  {
    "id": "s54",
    "text": "S54-Küratif / radikal amaçlı re-RT uygulamaktan kaçınmanıza neden olan durumlar nelerdir?\n(Birden fazla seçenek işaretlenebilir)",
    "section": "BÖLÜM 6 —Takip ve Raporlama",
    "showIf": {
      "allOf": [
        {
          "id": "s6",
          "equals": "Evet"
        },
        {
          "id": "s49",
          "equals": "Radyasyon Onkoloğu"
        }
      ]
    },
    "type": "checkbox",
    "options": [
      "Birinci ve ikinci radyoterapi arasındaki sürenin çok kısa olması",
      "Kötü performans durumu (ECOG ≥3)",
      "Belirgin kilo kaybı / nutrisyonel yetersizlik",
      "İleri yaşla birlikte belirgin komorbidite veya frajilite",
      "Aktif otoimmün hastalık veya immünosüpresif tedavi kullanımı",
      "Bağ dokusu hastalığı öyküsü",
      "Önceki tedavide Derece 3–4 akut toksisite gelişmiş olması",
      "Önceki tedaviye bağlı ciddi geç toksisite öyküsü",
      "Kritik yapılara önceki tedavide yüksek doz verilmiş olması",
      "Kümülatif dozun güvenli kabul edilen sınırları aşması",
      "Yaygın veya kontrolsüz metastatik hastalık",
      "Re-RT alanında aktif enfeksiyon, ülserasyon veya fistül varlığı",
      "Hedef volümün güvenli tedaviyi engelleyecek kadar büyük olması"
    ],
    "hasOther": true,
    "required": true
  },
  {
    "id": "s55",
    "text": "S55-Palyatif amaçlı re-RT uygulamaktan kaçınmanıza neden olan durumlar nelerdir?\n(Birden fazla seçenek işaretlenebilir)",
    "section": "BÖLÜM 6 —Takip ve Raporlama",
    "showIf": {
      "allOf": [
        {
          "id": "s6",
          "equals": "Evet"
        },
        {
          "id": "s49",
          "equals": "Radyasyon Onkoloğu"
        }
      ]
    },
    "type": "checkbox",
    "options": [
      "Birinci ve ikinci radyoterapi arasındaki sürenin çok kısa olması",
      "Kötü performans durumu (ECOG ≥3)",
      "Belirgin kilo kaybı / nutrisyonel yetersizlik",
      "İleri yaşla birlikte belirgin komorbidite veya frajilite",
      "Aktif otoimmün hastalık veya immünosüpresif tedavi kullanımı",
      "Bağ dokusu hastalığı öyküsü",
      "Önceki tedavide Derece 3–4 akut toksisite gelişmiş olması",
      "Önceki tedaviye bağlı ciddi geç toksisite öyküsü",
      "Kritik yapılara önceki tedavide yüksek doz verilmiş olması",
      "Kümülatif dozun güvenli kabul edilen sınırları aşması",
      "Yaygın veya kontrolsüz metastatik hastalık",
      "Re-RT alanında aktif enfeksiyon, ülserasyon veya fistül varlığı",
      "Hedef volümün güvenli tedaviyi engelleyecek kadar büyük olması"
    ],
    "hasOther": true,
    "required": true
  },
  {
    "id": "s56",
    "text": "S56-Re-RT endikasyonu kararınızı etkileyen en önemli faktörler nelerdir?\nEn fazla 3 seçenek işaretleyiniz.",
    "section": "BÖLÜM 6 —Takip ve Raporlama",
    "showIf": {
      "allOf": [
        {
          "id": "s6",
          "equals": "Evet"
        },
        {
          "id": "s49",
          "equals": "Radyasyon Onkoloğu"
        }
      ]
    },
    "type": "checkbox",
    "options": [
      "Tümör boyutu / hedef hacim büyüklüğü",
      "Tümör histopatolojisi ve biyolojik davranışı",
      "Tümör yerleşimi ve kritik organlara yakınlığı",
      "Önceki radyoterapiye yanıt / lokal kontrol süresi",
      "Önceki radyoterapi dozu, fraksiyonasyonu ve uygulanan teknik",
      "Önceki tedavide gelişen akut veya geç toksisite",
      "Önceki radyoterapi ile re-RT arasındaki interval süre",
      "Eş zamanlı veya planlanan sistemik tedavi (kemoterapi, immunoterapi vb.)",
      "Hastanın performans durumu",
      "Komorbiditeler / frajilite",
      "Hastanın tercihi ve yaşam kalitesi beklentisi",
      "Tedavi amacı: küratif / palyatif"
    ],
    "hasOther": true,
    "required": true
  },
  {
    "id": "s57",
    "text": "S57-Re-RT doz /fraksiyonasyon şeması kararınızı etkileyen en önemli faktörler nelerdir?\nEn fazla 3 seçenek işaretleyiniz.",
    "section": "BÖLÜM 6 —Takip ve Raporlama",
    "showIf": {
      "allOf": [
        {
          "id": "s6",
          "equals": "Evet"
        },
        {
          "id": "s49",
          "equals": "Radyasyon Onkoloğu"
        }
      ]
    },
    "type": "checkbox",
    "options": [
      "Tümör boyutu / hedef hacim büyüklüğü",
      "Tümör histopatolojisi ve biyolojik davranışı",
      "Tümör yerleşimi ve kritik organlara yakınlığı",
      "Önceki radyoterapiye yanıt / lokal kontrol süresi",
      "Önceki radyoterapi dozu, fraksiyonasyonu ve uygulanan teknik",
      "Önceki tedavide gelişen akut veya geç toksisite",
      "Önceki radyoterapi ile re-RT arasındaki interval süre",
      "Eş zamanlı veya planlanan sistemik tedavi (kemoterapi, immunoterapi vb.)",
      "Hastanın performans durumu",
      "Komorbiditeler / frajilite",
      "Hastanın tercihi ve yaşam kalitesi beklentisi",
      "Tedavi amacı: küratif / palyatif"
    ],
    "hasOther": true,
    "required": true
  },
  {
    "id": "6a",
    "text": "6a-Re-RT uygulanmamasının nedenleri nelerdir?",
    "section": "BÖLÜM 6 —Takip ve Raporlama",
    "showIf": {
      "id": "s6",
      "equals": "Hayır"
    },
    "type": "checkbox",
    "options": [
      "Toksisite riski / normal doku toleransı konusunda endişe",
      "Yeterli klinik deneyim veya bilgi birikiminin olmaması",
      "Teknik altyapı veya planlama olanaklarının sınırlı olması",
      "Önceki radyoterapi verilerine erişimde güçlük",
      "Önceki tedavinin başka merkezde uygulanmış olması nedeniyle veri aktarımında güçlük",
      "Kurumsal protokol veya standart iş akışı eksikliği",
      "Multidisipliner değerlendirme / tümör konseyi desteğinin sınırlı olması",
      "Mediko-legal sorumlulukların ve uygulama sınırlarının yeterince tanımlanmamış olması"
    ],
    "hasOther": true,
    "required": true
  },
  {
    "id": "6b",
    "text": "6b-Re-RT uygulamalarının güvenli ve etkin biçimde yürütülebilmesi için öncelikli olarak neye ihtiyaç duyuyorsunuz?",
    "section": "BÖLÜM 6 —Takip ve Raporlama",
    "showIf": {
      "id": "s6",
      "equals": "Hayır"
    },
    "type": "checkbox",
    "options": [
      "Klinik eğitim / deneyim",
      "Teknik altyapı ve planlama olanakları",
      "Medikal fizik uzmanları ile klinik ekipler arasında iş birliği ve yapılandırılmış iş akışı",
      "Önceki RT verilerine erişim ve veri aktarım desteği",
      "Kurumsal protokol / kılavuz",
      "Ulusal / uluslararası konsensüs"
    ],
    "hasOther": true,
    "required": true
  },
  {
    "id": "6c",
    "text": "6c-Re-RT konusunda düzenlenecek ulusal / uluslararası eğitim veya kurslara katılmak ister misiniz?",
    "section": "BÖLÜM 6 —Takip ve Raporlama",
    "showIf": {
      "id": "s6",
      "equals": "Hayır"
    },
    "type": "radio",
    "options": [
      "Evet",
      "Hayır",
      "Kararsızım"
    ],
    "required": true
  },
  {
    "id": "6d",
    "text": "6d-Ulusal bir re-RT kılavuzu / protokolü olması, re-RT uygulama eğiliminizi artırır mıydı?",
    "section": "BÖLÜM 6 —Takip ve Raporlama",
    "showIf": {
      "id": "s6",
      "equals": "Hayır"
    },
    "type": "radio",
    "options": [
      "Evet, belirgin şekilde artırır",
      "Kısmen artırır",
      "Kararsızım",
      "Hayır, değiştirmez"
    ],
    "required": true
  },
  {
    "id": "6e",
    "text": "6e-Re-RT konusunda kendinizi ne kadar bilgili hissediyorsunuz?\n1- Hiç bilgi sahibi değilim\n2- Sınırlı düzeyde bilgi sahibiyim\n3- Orta düzeyde bilgi sahibiyim\n4- İyi düzeyde bilgi sahibiyim\n5- Çok iyi düzeyde bilgi sahibiyim",
    "section": "BÖLÜM 6 —Takip ve Raporlama",
    "showIf": {
      "id": "s6",
      "equals": "Hayır"
    },
    "type": "radio",
    "options": [
      "1",
      "2",
      "3",
      "4",
      "5"
    ],
    "required": true
  }
];


// Belirli bir sorunun, mevcut cevaplara göre görünür olup olmadığını döndürür.
function isQuestionVisible(q, answers) {
  if (!q || !q.showIf) return true;
  const cond = q.showIf;
  if (cond.allOf) return cond.allOf.every((c) => matchCond(c, answers));
  return matchCond(cond, answers);
}

function matchCond(cond, answers) {
  if (!cond || !cond.id) return true;
  const v = answers ? answers[cond.id] : undefined;
  if (cond.equals !== undefined) {
    if (Array.isArray(v)) return v.includes(cond.equals);
    return v === cond.equals;
  }
  if (cond.in && Array.isArray(cond.in)) {
    if (Array.isArray(v)) return v.some((x) => cond.in.includes(x));
    return cond.in.includes(v);
  }
  return true;
}

module.exports = { questions, isQuestionVisible };

