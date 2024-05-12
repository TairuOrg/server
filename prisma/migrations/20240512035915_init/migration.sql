-- CreateTable
CREATE TABLE "administrators" (
    "id" SERIAL NOT NULL,
    "personal_id" VARCHAR(10) NOT NULL,
    "password" VARCHAR(256) NOT NULL,
    "name" VARCHAR(70) NOT NULL,
    "phone_number" VARCHAR(17) NOT NULL,
    "email" VARCHAR(120) NOT NULL,
    "residence_location" VARCHAR(50) NOT NULL,

    CONSTRAINT "administrators_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cashier" (
    "id" SERIAL NOT NULL,
    "personal_id" VARCHAR(10) NOT NULL,
    "name" VARCHAR(70) NOT NULL,
    "password" VARCHAR(256) NOT NULL,
    "phone_number" VARCHAR(17) NOT NULL,
    "email" VARCHAR(120) NOT NULL,
    "residence_location" VARCHAR(50) NOT NULL,

    CONSTRAINT "cashiers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customers" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(70) NOT NULL,
    "personal_id" VARCHAR(10) NOT NULL,
    "phone_number" VARCHAR(17) NOT NULL,
    "residence_location" VARCHAR(50) NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "entries" (
    "id" SERIAL NOT NULL,
    "admin_id" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "entries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "entries_items" (
    "id" SERIAL NOT NULL,
    "entry_id" INTEGER NOT NULL,
    "item_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "entries_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "items" (
    "id" SERIAL NOT NULL,
    "barcode_id" VARCHAR(12),
    "name" VARCHAR(70) NOT NULL,
    "price" DECIMAL(4,2) NOT NULL,
    "category " VARCHAR(25) NOT NULL,
    "manufacturer" VARCHAR(70) NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "articles_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(6) NOT NULL,
    "body_message" VARCHAR NOT NULL,
    "priority_status" VARCHAR NOT NULL,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reports" (
    "id" SERIAL NOT NULL,
    "admin_id" INTEGER NOT NULL,
    "type" VARCHAR(25) NOT NULL,
    "report_url" VARCHAR NOT NULL,
    "date" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sales" (
    "id" SERIAL NOT NULL,
    "cashier_id" INTEGER NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "date" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "sales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sales_items" (
    "id" SERIAL NOT NULL,
    "item_id" INTEGER NOT NULL,
    "sale_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "sales_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sent_notifications" (
    "id" SERIAL NOT NULL,
    "notification_id" INTEGER NOT NULL,
    "admin_id" INTEGER NOT NULL,
    "is_read" BOOLEAN NOT NULL,
    "is_ignored" BOOLEAN NOT NULL,

    CONSTRAINT "sent_notifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "unique" ON "administrators"("phone_number", "email", "personal_id");

-- CreateIndex
CREATE UNIQUE INDEX "unique2" ON "cashier"("phone_number", "email", "personal_id");

-- CreateIndex
CREATE UNIQUE INDEX "unique_personal_id" ON "customers"("personal_id");

-- CreateIndex
CREATE UNIQUE INDEX "phone_number_unique" ON "customers"("phone_number");

-- CreateIndex
CREATE INDEX "fki_admin_id_entries_fk" ON "entries"("admin_id");

-- CreateIndex
CREATE INDEX "fki_e" ON "entries_items"("item_id");

-- CreateIndex
CREATE INDEX "fki_entry_id_entries_items_fk" ON "entries_items"("entry_id");

-- CreateIndex
CREATE INDEX "fki_admin_id_reports_fk" ON "reports"("admin_id");

-- CreateIndex
CREATE INDEX "fki_cashier_id_sales_fk" ON "sales"("cashier_id");

-- CreateIndex
CREATE INDEX "fki_customer_id_sales_fk" ON "sales"("customer_id");

-- CreateIndex
CREATE INDEX "fki_item_id_sales_items_fk" ON "sales_items"("item_id");

-- CreateIndex
CREATE INDEX "fki_sale_id_sales_items_fk" ON "sales_items"("sale_id");

-- CreateIndex
CREATE INDEX "fki_admin_id_sent_notifications_fk" ON "sent_notifications"("admin_id");

-- CreateIndex
CREATE INDEX "fki_notification_id_sent_notifications_fk" ON "sent_notifications"("notification_id");

-- AddForeignKey
ALTER TABLE "entries" ADD CONSTRAINT "admin_id_entries_fk" FOREIGN KEY ("admin_id") REFERENCES "administrators"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "entries_items" ADD CONSTRAINT "entry_id_entries_items_fk" FOREIGN KEY ("entry_id") REFERENCES "entries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "entries_items" ADD CONSTRAINT "item_id_entries_items_fk" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "admin_id_reports_fk" FOREIGN KEY ("admin_id") REFERENCES "administrators"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sales" ADD CONSTRAINT "cashier_id_sales_fk" FOREIGN KEY ("cashier_id") REFERENCES "cashier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sales" ADD CONSTRAINT "customer_id_sales_fk" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sales_items" ADD CONSTRAINT "item_id_sales_items_fk" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sales_items" ADD CONSTRAINT "sale_id_sales_items_fk" FOREIGN KEY ("sale_id") REFERENCES "sales"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sent_notifications" ADD CONSTRAINT "admin_id_sent_notifications_fk" FOREIGN KEY ("admin_id") REFERENCES "administrators"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sent_notifications" ADD CONSTRAINT "notification_id_sent_notifications_fk" FOREIGN KEY ("notification_id") REFERENCES "notifications"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
