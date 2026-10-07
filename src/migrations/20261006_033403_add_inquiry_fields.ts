import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_inquiries_incoterm" AS ENUM('FOB', 'CIF', 'CFR', 'EXW');
  CREATE TYPE "public"."enum_inquiries_timing" AS ENUM('asap', '30d', '60d', 'planning');
  ALTER TABLE "inquiries" ADD COLUMN "target_market" varchar;
  ALTER TABLE "inquiries" ADD COLUMN "incoterm" "enum_inquiries_incoterm";
  ALTER TABLE "inquiries" ADD COLUMN "timing" "enum_inquiries_timing";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "inquiries" DROP COLUMN "target_market";
  ALTER TABLE "inquiries" DROP COLUMN "incoterm";
  ALTER TABLE "inquiries" DROP COLUMN "timing";
  DROP TYPE "public"."enum_inquiries_incoterm";
  DROP TYPE "public"."enum_inquiries_timing";`)
}
