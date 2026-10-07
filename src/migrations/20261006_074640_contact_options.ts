import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "contact_options_product_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label_en" varchar NOT NULL,
  	"label_fr" varchar NOT NULL,
  	"label_es" varchar NOT NULL,
  	"active" boolean DEFAULT true
  );
  
  CREATE TABLE "contact_options_quantity_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label_en" varchar NOT NULL,
  	"label_fr" varchar NOT NULL,
  	"label_es" varchar NOT NULL,
  	"active" boolean DEFAULT true
  );
  
  CREATE TABLE "contact_options_incoterm_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label_en" varchar NOT NULL,
  	"label_fr" varchar NOT NULL,
  	"label_es" varchar NOT NULL,
  	"active" boolean DEFAULT true
  );
  
  CREATE TABLE "contact_options_timing_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label_en" varchar NOT NULL,
  	"label_fr" varchar NOT NULL,
  	"label_es" varchar NOT NULL,
  	"active" boolean DEFAULT true
  );
  
  CREATE TABLE "contact_options" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "inquiries" ALTER COLUMN "product" SET DATA TYPE varchar;
  ALTER TABLE "inquiries" ALTER COLUMN "quantity" SET DATA TYPE varchar;
  ALTER TABLE "inquiries" ALTER COLUMN "incoterm" SET DATA TYPE varchar;
  ALTER TABLE "inquiries" ALTER COLUMN "timing" SET DATA TYPE varchar;
  ALTER TABLE "contact_options_product_options" ADD CONSTRAINT "contact_options_product_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_options"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_options_quantity_options" ADD CONSTRAINT "contact_options_quantity_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_options"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_options_incoterm_options" ADD CONSTRAINT "contact_options_incoterm_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_options"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_options_timing_options" ADD CONSTRAINT "contact_options_timing_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_options"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "contact_options_product_options_order_idx" ON "contact_options_product_options" USING btree ("_order");
  CREATE INDEX "contact_options_product_options_parent_id_idx" ON "contact_options_product_options" USING btree ("_parent_id");
  CREATE INDEX "contact_options_quantity_options_order_idx" ON "contact_options_quantity_options" USING btree ("_order");
  CREATE INDEX "contact_options_quantity_options_parent_id_idx" ON "contact_options_quantity_options" USING btree ("_parent_id");
  CREATE INDEX "contact_options_incoterm_options_order_idx" ON "contact_options_incoterm_options" USING btree ("_order");
  CREATE INDEX "contact_options_incoterm_options_parent_id_idx" ON "contact_options_incoterm_options" USING btree ("_parent_id");
  CREATE INDEX "contact_options_timing_options_order_idx" ON "contact_options_timing_options" USING btree ("_order");
  CREATE INDEX "contact_options_timing_options_parent_id_idx" ON "contact_options_timing_options" USING btree ("_parent_id");
  DROP TYPE "public"."enum_inquiries_product";
  DROP TYPE "public"."enum_inquiries_quantity";
  DROP TYPE "public"."enum_inquiries_incoterm";
  DROP TYPE "public"."enum_inquiries_timing";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_inquiries_product" AS ENUM('film-faced', 'anti-slip', 'raw', 'lvl', 'other');
  CREATE TYPE "public"."enum_inquiries_quantity" AS ENUM('lt1', '1-3', '3-10', 'gt10');
  CREATE TYPE "public"."enum_inquiries_incoterm" AS ENUM('FOB', 'CIF', 'CFR', 'EXW');
  CREATE TYPE "public"."enum_inquiries_timing" AS ENUM('asap', '30d', '60d', 'planning');
  ALTER TABLE "contact_options_product_options" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_options_quantity_options" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_options_incoterm_options" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_options_timing_options" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_options" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "contact_options_product_options" CASCADE;
  DROP TABLE "contact_options_quantity_options" CASCADE;
  DROP TABLE "contact_options_incoterm_options" CASCADE;
  DROP TABLE "contact_options_timing_options" CASCADE;
  DROP TABLE "contact_options" CASCADE;
  ALTER TABLE "inquiries" ALTER COLUMN "product" SET DATA TYPE "public"."enum_inquiries_product" USING "product"::"public"."enum_inquiries_product";
  ALTER TABLE "inquiries" ALTER COLUMN "quantity" SET DATA TYPE "public"."enum_inquiries_quantity" USING "quantity"::"public"."enum_inquiries_quantity";
  ALTER TABLE "inquiries" ALTER COLUMN "incoterm" SET DATA TYPE "public"."enum_inquiries_incoterm" USING "incoterm"::"public"."enum_inquiries_incoterm";
  ALTER TABLE "inquiries" ALTER COLUMN "timing" SET DATA TYPE "public"."enum_inquiries_timing" USING "timing"::"public"."enum_inquiries_timing";`)
}
