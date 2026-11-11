import { hashPassword } from "../src/lib/auth";
import { createUser, databaseConfigured } from "../src/lib/store";
const [email] = process.argv.slice(2);
const password = process.env.ADMIN_SETUP_PASSWORD;
if (
  !email ||
  !/^\S+@\S+\.\S+$/.test(email) ||
  !password ||
  password.length < 14 ||
  !databaseConfigured()
) {
  console.error(
    "Kullanım: ADMIN_SETUP_PASSWORD ortam değişkeninde en az 14 karakter ve DATABASE_URL (veya yerel LOCAL_DATA_ENABLED=true) ayarlayın. npm run admin:create -- eposta@alanadi.com",
  );
  process.exit(1);
}
await createUser(email.toLowerCase(), hashPassword(password));
console.log("Yönetici oluşturuldu veya parolası güncellendi.");
process.exit(0);
