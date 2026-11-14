import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "products" ADD COLUMN "parent_id" integer;
  ALTER TABLE "_products_v" ADD COLUMN "version_parent_id" integer;
  ALTER TABLE "products" ADD CONSTRAINT "products_parent_id_products_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_version_parent_id_products_id_fk" FOREIGN KEY ("version_parent_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "products_parent_idx" ON "products" USING btree ("parent_id");
  CREATE INDEX "_products_v_version_version_parent_idx" ON "_products_v" USING btree ("version_parent_id");
  ALTER TABLE "media" DROP COLUMN "_objectkey";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "products" DROP CONSTRAINT "products_parent_id_products_id_fk";
  
  ALTER TABLE "_products_v" DROP CONSTRAINT "_products_v_version_parent_id_products_id_fk";
  
  DROP INDEX "products_parent_idx";
  DROP INDEX "_products_v_version_version_parent_idx";
  ALTER TABLE "media" ADD COLUMN "_objectkey" varchar;
  ALTER TABLE "products" DROP COLUMN "parent_id";
  ALTER TABLE "_products_v" DROP COLUMN "version_parent_id";`)
}
