import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_products_downloads_type" AS ENUM('catalogue', 'datasheet', 'test-report', 'certificate', 'other');
  CREATE TYPE "public"."enum__products_v_version_downloads_type" AS ENUM('catalogue', 'datasheet', 'test-report', 'certificate', 'other');
  CREATE TABLE "products_downloads" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"type" "enum_products_downloads_type" DEFAULT 'datasheet',
  	"file_id" integer
  );
  
  CREATE TABLE "_products_v_version_downloads" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"type" "enum__products_v_version_downloads_type" DEFAULT 'datasheet',
  	"file_id" integer,
  	"_uuid" varchar
  );
  
  ALTER TABLE "products_downloads" ADD CONSTRAINT "products_downloads_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_downloads" ADD CONSTRAINT "products_downloads_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_downloads" ADD CONSTRAINT "_products_v_version_downloads_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_version_downloads" ADD CONSTRAINT "_products_v_version_downloads_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "products_downloads_order_idx" ON "products_downloads" USING btree ("_order");
  CREATE INDEX "products_downloads_parent_id_idx" ON "products_downloads" USING btree ("_parent_id");
  CREATE INDEX "products_downloads_file_idx" ON "products_downloads" USING btree ("file_id");
  CREATE INDEX "_products_v_version_downloads_order_idx" ON "_products_v_version_downloads" USING btree ("_order");
  CREATE INDEX "_products_v_version_downloads_parent_id_idx" ON "_products_v_version_downloads" USING btree ("_parent_id");
  CREATE INDEX "_products_v_version_downloads_file_idx" ON "_products_v_version_downloads" USING btree ("file_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "products_downloads" CASCADE;
  DROP TABLE "_products_v_version_downloads" CASCADE;
  DROP TYPE "public"."enum_products_downloads_type";
  DROP TYPE "public"."enum__products_v_version_downloads_type";`)
}
