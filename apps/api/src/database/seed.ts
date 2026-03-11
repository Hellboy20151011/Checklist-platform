/**
 * Datenbank-Seed-Skript
 *
 * Legt einen initialen Admin-Benutzer an, falls noch keiner vorhanden ist.
 *
 * Verwendung:
 *   npm run seed
 *
 * Optionale Umgebungsvariablen (überschreiben die Standardwerte):
 *   SEED_ADMIN_EMAIL    – E-Mail des Admins (Standard: admin@checklist.local)
 *   SEED_ADMIN_PASSWORD – Passwort des Admins (Standard: Admin1234!)
 *   SEED_ADMIN_NAME     – Anzeigename des Admins (Standard: Administrator)
 */
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { typeOrmConfig } from '../config/typeorm.config';
import { User } from '../modules/users/entities/user.entity';
import { Role } from '../common/enums/role.enum';

async function seed(): Promise<void> {
  const dataSource = new DataSource({
    ...typeOrmConfig,
    entities: [User],
    synchronize: true,
  });

  await dataSource.initialize();
  console.log('Datenbankverbindung hergestellt.');

  const usersRepository = dataSource.getRepository(User);

  const adminEmail =
    process.env.SEED_ADMIN_EMAIL ?? 'admin@checklist.local';
  const adminPassword =
    process.env.SEED_ADMIN_PASSWORD ?? 'Admin1234!';
  const adminName = process.env.SEED_ADMIN_NAME ?? 'Administrator';

  const existing = await usersRepository.findOneBy({ email: adminEmail });

  if (existing) {
    console.log(`Admin-Benutzer existiert bereits: ${adminEmail}`);
  } else {
    const passwordHash = await bcrypt.hash(adminPassword, 10);
    const admin = usersRepository.create({
      email: adminEmail,
      passwordHash,
      name: adminName,
      role: Role.ADMIN,
      active: true,
    });
    await usersRepository.save(admin);
    console.log(`Admin-Benutzer erstellt: ${adminEmail}`);
    if (process.env.NODE_ENV !== 'production') {
      console.log(`Passwort: ${adminPassword}`);
    }
    console.log(
      'HINWEIS: Bitte das Passwort nach dem ersten Login ändern!',
    );
  }

  await dataSource.destroy();
  console.log('Seeding abgeschlossen.');
}

seed().catch((error: unknown) => {
  console.error('Seeding fehlgeschlagen:', error);
  process.exit(1);
});
