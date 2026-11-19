import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_about_page_markets_country" AS ENUM('004', '008', '012', '024', '032', '051', '036', '040', '031', '044', '050', '112', '056', '084', '204', '064', '068', '070', '072', '076', '096', '100', '854', '108', '116', '120', '124', '140', '148', '152', '170', '188', '384', '191', '192', '196', '203', '180', '208', '262', '214', '218', '818', '222', '226', '232', '233', '748', '231', '238', '242', '246', '250', '260', '266', '268', '276', '288', '300', '304', '320', '324', '624', '328', '332', '340', '348', '352', '356', '360', '368', '372', '364', '376', '380', '388', '392', '400', '398', '404', '414', '417', '418', '428', '422', '426', '430', '434', '440', '442', '450', '454', '458', '466', '478', '484', '498', '496', '499', '504', '508', '104', '516', '524', '528', '540', '554', '558', '562', '566', '408', '578', '512', '586', '591', '598', '600', '156', '604', '608', '616', '620', '630', '634', '178', '270', '642', '643', '646', '682', '686', '688', '694', '703', '705', '090', '706', '710', '410', '728', '724', '144', '275', '729', '740', '752', '756', '760', '158', '762', '764', '807', '626', '768', '780', '788', '792', '795', '800', '804', '784', '826', '834', '840', '858', '860', '548', '862', '732', '887', '894', '716');
  CREATE TABLE "home_hero" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_hero_locales" (
  	"kicker" varchar,
  	"title_line1" varchar,
  	"title_line2" varchar,
  	"cta_quote" varchar,
  	"cta_products" varchar,
  	"about_kicker" varchar,
  	"about_title" varchar,
  	"about_intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "home_core_values" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_core_values_locales" (
  	"kicker" varchar,
  	"intro_title" varchar,
  	"intro_text" varchar,
  	"value1_name" varchar,
  	"value1_description" varchar,
  	"value2_name" varchar,
  	"value2_description" varchar,
  	"value3_name" varchar,
  	"value3_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "about_page_markets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"country" "enum_about_page_markets_country" NOT NULL
  );
  
  CREATE TABLE "about_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "about_page_locales" (
  	"who_title" varchar,
  	"who_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "home_hero_locales" ADD CONSTRAINT "home_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_core_values_locales" ADD CONSTRAINT "home_core_values_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_core_values"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_markets" ADD CONSTRAINT "about_page_markets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_locales" ADD CONSTRAINT "about_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "home_hero_locales_locale_parent_id_unique" ON "home_hero_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "home_core_values_locales_locale_parent_id_unique" ON "home_core_values_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "about_page_markets_order_idx" ON "about_page_markets" USING btree ("_order");
  CREATE INDEX "about_page_markets_parent_id_idx" ON "about_page_markets" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "about_page_locales_locale_parent_id_unique" ON "about_page_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "home_hero" CASCADE;
  DROP TABLE "home_hero_locales" CASCADE;
  DROP TABLE "home_core_values" CASCADE;
  DROP TABLE "home_core_values_locales" CASCADE;
  DROP TABLE "about_page_markets" CASCADE;
  DROP TABLE "about_page" CASCADE;
  DROP TABLE "about_page_locales" CASCADE;
  DROP TYPE "public"."enum_about_page_markets_country";`)
}
