# TReTREAT Anket Web

Re-irradiation Workflow anketi için web uygulaması. **Vercel + Supabase** üzerinde çalışır.

## Özellikler
- Herkesin erişebildiği anket formu (ad, soyad, TC Kimlik No ile)
- TC Kimlik No algoritma doğrulaması
- Aynı TC ile sadece bir kez anket doldurulabilir
- Admin paneli (kullanıcı adı + şifre ile giriş)
- Kayıtları arama, görüntüleme ve silme
- Excel dışa aktarma: **Bireysel** (tek kayıt) ve **Toplu** (tüm kayıtlar)

---

## 1. Supabase Kurulumu

1. https://supabase.com adresinden ücretsiz bir hesap açın
2. **New Project** ile yeni bir proje oluşturun (şifreyi not alın)
3. Proje hazır olduğunda sol menüden **SQL Editor** açın
4. `supabase-schema.sql` içeriğini yapıştırıp **Run** tıklayın
5. Sol menüden **Project Settings → API** bölümüne gidin ve şunları kopyalayın:
   - `Project URL` → `SUPABASE_URL`
   - `service_role` key → `SUPABASE_SERVICE_KEY` (⚠ **anon** değil)

## 2. Lokal Geliştirme (opsiyonel)

```bash
npm install
cp .env.example .env
# .env dosyasına Supabase bilgilerinizi ve admin şifrenizi girin
npm start
```

http://localhost:3000 adresinde çalışır.

## 3. Vercel Deploy

1. https://vercel.com hesabı açın (GitHub ile)
2. Projeyi GitHub'a push edin
3. Vercel → **Import Project** → repo'yu seçin
4. **Environment Variables** kısmına şu değişkenleri ekleyin:

| Key | Value |
|---|---|
| `SUPABASE_URL` | Supabase proje URL'niz |
| `SUPABASE_SERVICE_KEY` | Supabase service_role key'iniz |
| `ADMIN_USERNAME` | `admin` |
| `ADMIN_PASSWORD` | Kendi belirlediğiniz şifre |
| `JWT_SECRET` | Rastgele uzun bir string |

5. **Deploy** tıklayın

Deploy tamamlanınca size bir URL verir (ör. `anket-web.vercel.app`).

## 4. Kullanım
- Anket: `/`
- Admin giriş: `/admin/login.html`
- Admin panel: `/admin/index.html`

## Dosya Yapısı
- `server.js` — Express uygulaması (hem lokal hem Vercel için)
- `api/index.js` — Vercel serverless handler
- `vercel.json` — routing yapılandırması
- `db.js` — Supabase bağlantısı
- `questions.js` — Anket soruları (düzenlenebilir)
- `utils/tc.js` — TC doğrulama
- `supabase-schema.sql` — Veritabanı şeması
- `public/` — Frontend (HTML/CSS/JS)
- `public/admin/` — Admin paneli
