import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "products_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "products_tags_locales" (
  	"tag" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_products_v_version_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_version_tags_locales" (
  	"tag" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "products" ADD COLUMN "show_on_home" boolean DEFAULT false;
  ALTER TABLE "products" ADD COLUMN "order" numeric DEFAULT 100;
  ALTER TABLE "_products_v" ADD COLUMN "version_show_on_home" boolean DEFAULT false;
  ALTER TABLE "_products_v" ADD COLUMN "version_order" numeric DEFAULT 100;
  ALTER TABLE "products_tags" ADD CONSTRAINT "products_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_tags_locales" ADD CONSTRAINT "products_tags_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_tags" ADD CONSTRAINT "_products_v_version_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_tags_locales" ADD CONSTRAINT "_products_v_version_tags_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_version_tags"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "products_tags_order_idx" ON "products_tags" USING btree ("_order");
  CREATE INDEX "products_tags_parent_id_idx" ON "products_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "products_tags_locales_locale_parent_id_unique" ON "products_tags_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_products_v_version_tags_order_idx" ON "_products_v_version_tags" USING btree ("_order");
  CREATE INDEX "_products_v_version_tags_parent_id_idx" ON "_products_v_version_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_products_v_version_tags_locales_locale_parent_id_unique" ON "_products_v_version_tags_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "products_tags" CASCADE;
  DROP TABLE "products_tags_locales" CASCADE;
  DROP TABLE "_products_v_version_tags" CASCADE;
  DROP TABLE "_products_v_version_tags_locales" CASCADE;
  ALTER TABLE "products" DROP COLUMN "show_on_home";
  ALTER TABLE "products" DROP COLUMN "order";
  ALTER TABLE "_products_v" DROP COLUMN "version_show_on_home";
  ALTER TABLE "_products_v" DROP COLUMN "version_order";`)
}
