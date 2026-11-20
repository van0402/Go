import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "factory_page_photos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "factory_page_photos_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "factory_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer,
  	"badge_value" varchar,
  	"video_id" integer,
  	"video_poster_id" integer,
  	"video_duration" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "factory_page_locales" (
  	"hero_title" varchar,
  	"hero_text" varchar,
  	"overview_title" varchar,
  	"overview_text1" varchar,
  	"overview_text2" varchar,
  	"badge_label" varchar,
  	"flow_title" varchar,
  	"process_text" varchar,
  	"video_label" varchar,
  	"video_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "factory_page_photos" ADD CONSTRAINT "factory_page_photos_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "factory_page_photos" ADD CONSTRAINT "factory_page_photos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."factory_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "factory_page_photos_locales" ADD CONSTRAINT "factory_page_photos_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."factory_page_photos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "factory_page" ADD CONSTRAINT "factory_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "factory_page" ADD CONSTRAINT "factory_page_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "factory_page" ADD CONSTRAINT "factory_page_video_poster_id_media_id_fk" FOREIGN KEY ("video_poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "factory_page_locales" ADD CONSTRAINT "factory_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."factory_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "factory_page_photos_order_idx" ON "factory_page_photos" USING btree ("_order");
  CREATE INDEX "factory_page_photos_parent_id_idx" ON "factory_page_photos" USING btree ("_parent_id");
  CREATE INDEX "factory_page_photos_image_idx" ON "factory_page_photos" USING btree ("image_id");
  CREATE UNIQUE INDEX "factory_page_photos_locales_locale_parent_id_unique" ON "factory_page_photos_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "factory_page_hero_image_idx" ON "factory_page" USING btree ("hero_image_id");
  CREATE INDEX "factory_page_video_idx" ON "factory_page" USING btree ("video_id");
  CREATE INDEX "factory_page_video_poster_idx" ON "factory_page" USING btree ("video_poster_id");
  CREATE UNIQUE INDEX "factory_page_locales_locale_parent_id_unique" ON "factory_page_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "factory_page_photos" CASCADE;
  DROP TABLE "factory_page_photos_locales" CASCADE;
  DROP TABLE "factory_page" CASCADE;
  DROP TABLE "factory_page_locales" CASCADE;`)
}
