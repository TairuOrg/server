toc.dat                                                                                             0000600 0004000 0002000 00000061456 14620007372 0014454 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        PGDMP   
    $                |            tairu_db    16.3    16.3 S    [           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false         \           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false         ]           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false         ^           1262    16399    tairu_db    DATABASE     �   CREATE DATABASE tairu_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE tairu_db;
                postgres    false         �            1259    16400    administrators    TABLE     Z  CREATE TABLE public.administrators (
    id integer NOT NULL,
    personal_id character varying(10) NOT NULL,
    password character varying(256) NOT NULL,
    name character varying(70) NOT NULL,
    phone_number character varying(17) NOT NULL,
    email character varying(120) NOT NULL,
    residence_location character varying(50) NOT NULL
);
 "   DROP TABLE public.administrators;
       public         heap    postgres    false         �            1259    16405    administrators_id_seq    SEQUENCE     �   ALTER TABLE public.administrators ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.administrators_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    215         �            1259    16406    items    TABLE     '  CREATE TABLE public.items (
    id integer NOT NULL,
    barcode_id character varying(12),
    name character varying(70) NOT NULL,
    price numeric(4,2) NOT NULL,
    "category " character varying(25) NOT NULL,
    manufacturer character varying(70) NOT NULL,
    quantity integer NOT NULL
);
    DROP TABLE public.items;
       public         heap    postgres    false         �            1259    16409    articles_id_seq    SEQUENCE     �   ALTER TABLE public.items ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.articles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    217         �            1259    16410    cashier    TABLE     S  CREATE TABLE public.cashier (
    id integer NOT NULL,
    personal_id character varying(10) NOT NULL,
    name character varying(70) NOT NULL,
    password character varying(256) NOT NULL,
    phone_number character varying(17) NOT NULL,
    email character varying(120) NOT NULL,
    residence_location character varying(50) NOT NULL
);
    DROP TABLE public.cashier;
       public         heap    postgres    false         �            1259    16415    cashier_id_seq    SEQUENCE     �   ALTER TABLE public.cashier ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.cashier_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    219         �            1259    16416 	   customers    TABLE     �   CREATE TABLE public.customers (
    id integer NOT NULL,
    name character varying(70) NOT NULL,
    personal_id character varying(10) NOT NULL,
    phone_number character varying(17) NOT NULL,
    residence_location character varying(50) NOT NULL
);
    DROP TABLE public.customers;
       public         heap    postgres    false         �            1259    16419    customers_id_seq    SEQUENCE     �   ALTER TABLE public.customers ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.customers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    221         �            1259    16420    entries    TABLE     �   CREATE TABLE public.entries (
    id integer NOT NULL,
    admin_id integer NOT NULL,
    description text NOT NULL,
    date timestamp without time zone NOT NULL
);
    DROP TABLE public.entries;
       public         heap    postgres    false         �            1259    16425    entries_id_seq    SEQUENCE     �   ALTER TABLE public.entries ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.entries_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    223         �            1259    16426    entries_items    TABLE     �   CREATE TABLE public.entries_items (
    id integer NOT NULL,
    entry_id integer NOT NULL,
    item_id integer NOT NULL,
    quantity integer NOT NULL
);
 !   DROP TABLE public.entries_items;
       public         heap    postgres    false         �            1259    16429    entries_items_id_seq    SEQUENCE     �   ALTER TABLE public.entries_items ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.entries_items_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    225         �            1259    16430    notifications    TABLE     �   CREATE TABLE public.notifications (
    id integer NOT NULL,
    date timestamp without time zone NOT NULL,
    body_message character varying NOT NULL,
    priority_status character varying NOT NULL
);
 !   DROP TABLE public.notifications;
       public         heap    postgres    false         �            1259    16435    notifications_id_seq    SEQUENCE     �   ALTER TABLE public.notifications ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.notifications_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    227         �            1259    16436    reports    TABLE     �   CREATE TABLE public.reports (
    id integer NOT NULL,
    admin_id integer NOT NULL,
    type character varying(25) NOT NULL,
    report_url character varying NOT NULL,
    date timestamp without time zone NOT NULL
);
    DROP TABLE public.reports;
       public         heap    postgres    false         �            1259    16441    reports_id_seq    SEQUENCE     �   ALTER TABLE public.reports ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.reports_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    229         �            1259    16442    sales    TABLE     �   CREATE TABLE public.sales (
    id integer NOT NULL,
    cashier_id integer NOT NULL,
    customer_id integer NOT NULL,
    date timestamp without time zone NOT NULL
);
    DROP TABLE public.sales;
       public         heap    postgres    false         �            1259    16445    sales_id_seq    SEQUENCE     �   ALTER TABLE public.sales ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.sales_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    231         �            1259    16446    sales_items    TABLE     �   CREATE TABLE public.sales_items (
    id integer NOT NULL,
    item_id integer NOT NULL,
    sale_id integer NOT NULL,
    quantity integer NOT NULL
);
    DROP TABLE public.sales_items;
       public         heap    postgres    false         �            1259    16449    sales_items_id_seq    SEQUENCE     �   ALTER TABLE public.sales_items ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.sales_items_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    233         �            1259    16450    sent_notifications    TABLE     �   CREATE TABLE public.sent_notifications (
    id integer NOT NULL,
    notification_id integer NOT NULL,
    admin_id integer NOT NULL,
    is_read boolean NOT NULL,
    is_ignored boolean NOT NULL
);
 &   DROP TABLE public.sent_notifications;
       public         heap    postgres    false         �            1259    16453    sent_notifications_id_seq    SEQUENCE     �   ALTER TABLE public.sent_notifications ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.sent_notifications_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    235         C          0    16400    administrators 
   TABLE DATA           r   COPY public.administrators (id, personal_id, password, name, phone_number, email, residence_location) FROM stdin;
    public          postgres    false    215       4931.dat G          0    16410    cashier 
   TABLE DATA           k   COPY public.cashier (id, personal_id, name, password, phone_number, email, residence_location) FROM stdin;
    public          postgres    false    219       4935.dat I          0    16416 	   customers 
   TABLE DATA           \   COPY public.customers (id, name, personal_id, phone_number, residence_location) FROM stdin;
    public          postgres    false    221       4937.dat K          0    16420    entries 
   TABLE DATA           B   COPY public.entries (id, admin_id, description, date) FROM stdin;
    public          postgres    false    223       4939.dat M          0    16426    entries_items 
   TABLE DATA           H   COPY public.entries_items (id, entry_id, item_id, quantity) FROM stdin;
    public          postgres    false    225       4941.dat E          0    16406    items 
   TABLE DATA           a   COPY public.items (id, barcode_id, name, price, "category ", manufacturer, quantity) FROM stdin;
    public          postgres    false    217       4933.dat O          0    16430    notifications 
   TABLE DATA           P   COPY public.notifications (id, date, body_message, priority_status) FROM stdin;
    public          postgres    false    227       4943.dat Q          0    16436    reports 
   TABLE DATA           G   COPY public.reports (id, admin_id, type, report_url, date) FROM stdin;
    public          postgres    false    229       4945.dat S          0    16442    sales 
   TABLE DATA           B   COPY public.sales (id, cashier_id, customer_id, date) FROM stdin;
    public          postgres    false    231       4947.dat U          0    16446    sales_items 
   TABLE DATA           E   COPY public.sales_items (id, item_id, sale_id, quantity) FROM stdin;
    public          postgres    false    233       4949.dat W          0    16450    sent_notifications 
   TABLE DATA           `   COPY public.sent_notifications (id, notification_id, admin_id, is_read, is_ignored) FROM stdin;
    public          postgres    false    235       4951.dat _           0    0    administrators_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.administrators_id_seq', 1, false);
          public          postgres    false    216         `           0    0    articles_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.articles_id_seq', 1, false);
          public          postgres    false    218         a           0    0    cashier_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.cashier_id_seq', 1, false);
          public          postgres    false    220         b           0    0    customers_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.customers_id_seq', 1, false);
          public          postgres    false    222         c           0    0    entries_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.entries_id_seq', 1, false);
          public          postgres    false    224         d           0    0    entries_items_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.entries_items_id_seq', 1, false);
          public          postgres    false    226         e           0    0    notifications_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.notifications_id_seq', 1, false);
          public          postgres    false    228         f           0    0    reports_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.reports_id_seq', 1, false);
          public          postgres    false    230         g           0    0    sales_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.sales_id_seq', 1, false);
          public          postgres    false    232         h           0    0    sales_items_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.sales_items_id_seq', 1, false);
          public          postgres    false    234         i           0    0    sent_notifications_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.sent_notifications_id_seq', 1, false);
          public          postgres    false    236         �           2606    16455 "   administrators administrators_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.administrators
    ADD CONSTRAINT administrators_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.administrators DROP CONSTRAINT administrators_pkey;
       public            postgres    false    215         �           2606    16457    items articles_pk 
   CONSTRAINT     O   ALTER TABLE ONLY public.items
    ADD CONSTRAINT articles_pk PRIMARY KEY (id);
 ;   ALTER TABLE ONLY public.items DROP CONSTRAINT articles_pk;
       public            postgres    false    217         �           2606    16459    cashier cashiers_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.cashier
    ADD CONSTRAINT cashiers_pkey PRIMARY KEY (id);
 ?   ALTER TABLE ONLY public.cashier DROP CONSTRAINT cashiers_pkey;
       public            postgres    false    219         �           2606    16461    customers customers_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.customers DROP CONSTRAINT customers_pkey;
       public            postgres    false    221         �           2606    16463     entries_items entries_items_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.entries_items
    ADD CONSTRAINT entries_items_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.entries_items DROP CONSTRAINT entries_items_pkey;
       public            postgres    false    225         �           2606    16465    entries entries_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.entries
    ADD CONSTRAINT entries_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.entries DROP CONSTRAINT entries_pkey;
       public            postgres    false    223         �           2606    16467     notifications notifications_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.notifications DROP CONSTRAINT notifications_pkey;
       public            postgres    false    227         �           2606    16543    customers phone_number_unique 
   CONSTRAINT     `   ALTER TABLE ONLY public.customers
    ADD CONSTRAINT phone_number_unique UNIQUE (phone_number);
 G   ALTER TABLE ONLY public.customers DROP CONSTRAINT phone_number_unique;
       public            postgres    false    221         �           2606    16469    reports reports_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.reports
    ADD CONSTRAINT reports_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.reports DROP CONSTRAINT reports_pkey;
       public            postgres    false    229         �           2606    16471    sales_items sales_items_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.sales_items
    ADD CONSTRAINT sales_items_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.sales_items DROP CONSTRAINT sales_items_pkey;
       public            postgres    false    233         �           2606    16473    sales sales_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.sales
    ADD CONSTRAINT sales_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.sales DROP CONSTRAINT sales_pkey;
       public            postgres    false    231         �           2606    16475 *   sent_notifications sent_notifications_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.sent_notifications
    ADD CONSTRAINT sent_notifications_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public.sent_notifications DROP CONSTRAINT sent_notifications_pkey;
       public            postgres    false    235         �           2606    16477    administrators unique 
   CONSTRAINT     n   ALTER TABLE ONLY public.administrators
    ADD CONSTRAINT "unique" UNIQUE (phone_number, email, personal_id);
 A   ALTER TABLE ONLY public.administrators DROP CONSTRAINT "unique";
       public            postgres    false    215    215    215         �           2606    16479    cashier unique2 
   CONSTRAINT     f   ALTER TABLE ONLY public.cashier
    ADD CONSTRAINT unique2 UNIQUE (phone_number, email, personal_id);
 9   ALTER TABLE ONLY public.cashier DROP CONSTRAINT unique2;
       public            postgres    false    219    219    219         �           2606    16541    customers unique_personal_id 
   CONSTRAINT     ^   ALTER TABLE ONLY public.customers
    ADD CONSTRAINT unique_personal_id UNIQUE (personal_id);
 F   ALTER TABLE ONLY public.customers DROP CONSTRAINT unique_personal_id;
       public            postgres    false    221         �           1259    16480    fki_admin_id_entries_fk    INDEX     O   CREATE INDEX fki_admin_id_entries_fk ON public.entries USING btree (admin_id);
 +   DROP INDEX public.fki_admin_id_entries_fk;
       public            postgres    false    223         �           1259    16481    fki_admin_id_reports_fk    INDEX     O   CREATE INDEX fki_admin_id_reports_fk ON public.reports USING btree (admin_id);
 +   DROP INDEX public.fki_admin_id_reports_fk;
       public            postgres    false    229         �           1259    16482 "   fki_admin_id_sent_notifications_fk    INDEX     e   CREATE INDEX fki_admin_id_sent_notifications_fk ON public.sent_notifications USING btree (admin_id);
 6   DROP INDEX public.fki_admin_id_sent_notifications_fk;
       public            postgres    false    235         �           1259    16483    fki_cashier_id_sales_fk    INDEX     O   CREATE INDEX fki_cashier_id_sales_fk ON public.sales USING btree (cashier_id);
 +   DROP INDEX public.fki_cashier_id_sales_fk;
       public            postgres    false    231         �           1259    16484    fki_customer_id_sales_fk    INDEX     Q   CREATE INDEX fki_customer_id_sales_fk ON public.sales USING btree (customer_id);
 ,   DROP INDEX public.fki_customer_id_sales_fk;
       public            postgres    false    231         �           1259    16485    fki_e    INDEX     B   CREATE INDEX fki_e ON public.entries_items USING btree (item_id);
    DROP INDEX public.fki_e;
       public            postgres    false    225         �           1259    16486    fki_entry_id_entries_items_fk    INDEX     [   CREATE INDEX fki_entry_id_entries_items_fk ON public.entries_items USING btree (entry_id);
 1   DROP INDEX public.fki_entry_id_entries_items_fk;
       public            postgres    false    225         �           1259    16487    fki_item_id_sales_items_fk    INDEX     U   CREATE INDEX fki_item_id_sales_items_fk ON public.sales_items USING btree (item_id);
 .   DROP INDEX public.fki_item_id_sales_items_fk;
       public            postgres    false    233         �           1259    16488 )   fki_notification_id_sent_notifications_fk    INDEX     s   CREATE INDEX fki_notification_id_sent_notifications_fk ON public.sent_notifications USING btree (notification_id);
 =   DROP INDEX public.fki_notification_id_sent_notifications_fk;
       public            postgres    false    235         �           1259    16489    fki_sale_id_sales_items_fk    INDEX     U   CREATE INDEX fki_sale_id_sales_items_fk ON public.sales_items USING btree (sale_id);
 .   DROP INDEX public.fki_sale_id_sales_items_fk;
       public            postgres    false    233         �           2606    16490    entries admin_id_entries_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.entries
    ADD CONSTRAINT admin_id_entries_fk FOREIGN KEY (admin_id) REFERENCES public.administrators(id);
 E   ALTER TABLE ONLY public.entries DROP CONSTRAINT admin_id_entries_fk;
       public          postgres    false    223    215    4739         �           2606    16495    reports admin_id_reports_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.reports
    ADD CONSTRAINT admin_id_reports_fk FOREIGN KEY (admin_id) REFERENCES public.administrators(id);
 E   ALTER TABLE ONLY public.reports DROP CONSTRAINT admin_id_reports_fk;
       public          postgres    false    215    229    4739         �           2606    16500 1   sent_notifications admin_id_sent_notifications_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.sent_notifications
    ADD CONSTRAINT admin_id_sent_notifications_fk FOREIGN KEY (admin_id) REFERENCES public.administrators(id);
 [   ALTER TABLE ONLY public.sent_notifications DROP CONSTRAINT admin_id_sent_notifications_fk;
       public          postgres    false    4739    215    235         �           2606    16505    sales cashier_id_sales_fk    FK CONSTRAINT     }   ALTER TABLE ONLY public.sales
    ADD CONSTRAINT cashier_id_sales_fk FOREIGN KEY (cashier_id) REFERENCES public.cashier(id);
 C   ALTER TABLE ONLY public.sales DROP CONSTRAINT cashier_id_sales_fk;
       public          postgres    false    4745    219    231         �           2606    16510    sales customer_id_sales_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.sales
    ADD CONSTRAINT customer_id_sales_fk FOREIGN KEY (customer_id) REFERENCES public.customers(id);
 D   ALTER TABLE ONLY public.sales DROP CONSTRAINT customer_id_sales_fk;
       public          postgres    false    231    4749    221         �           2606    16515 '   entries_items entry_id_entries_items_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.entries_items
    ADD CONSTRAINT entry_id_entries_items_fk FOREIGN KEY (entry_id) REFERENCES public.entries(id);
 Q   ALTER TABLE ONLY public.entries_items DROP CONSTRAINT entry_id_entries_items_fk;
       public          postgres    false    4755    225    223         �           2606    16520 &   entries_items item_id_entries_items_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.entries_items
    ADD CONSTRAINT item_id_entries_items_fk FOREIGN KEY (item_id) REFERENCES public.items(id);
 P   ALTER TABLE ONLY public.entries_items DROP CONSTRAINT item_id_entries_items_fk;
       public          postgres    false    217    4743    225         �           2606    16525 "   sales_items item_id_sales_items_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.sales_items
    ADD CONSTRAINT item_id_sales_items_fk FOREIGN KEY (item_id) REFERENCES public.items(id);
 L   ALTER TABLE ONLY public.sales_items DROP CONSTRAINT item_id_sales_items_fk;
       public          postgres    false    233    217    4743         �           2606    16530 8   sent_notifications notification_id_sent_notifications_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.sent_notifications
    ADD CONSTRAINT notification_id_sent_notifications_fk FOREIGN KEY (notification_id) REFERENCES public.notifications(id);
 b   ALTER TABLE ONLY public.sent_notifications DROP CONSTRAINT notification_id_sent_notifications_fk;
       public          postgres    false    227    235    4762         �           2606    16535 "   sales_items sale_id_sales_items_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.sales_items
    ADD CONSTRAINT sale_id_sales_items_fk FOREIGN KEY (sale_id) REFERENCES public.sales(id);
 L   ALTER TABLE ONLY public.sales_items DROP CONSTRAINT sale_id_sales_items_fk;
       public          postgres    false    231    233    4769                                                                                                                                                                                                                          4931.dat                                                                                            0000600 0004000 0002000 00000000005 14620007372 0014246 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           4935.dat                                                                                            0000600 0004000 0002000 00000000005 14620007372 0014252 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           4937.dat                                                                                            0000600 0004000 0002000 00000000005 14620007372 0014254 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           4939.dat                                                                                            0000600 0004000 0002000 00000000005 14620007372 0014256 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           4941.dat                                                                                            0000600 0004000 0002000 00000000005 14620007372 0014247 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           4933.dat                                                                                            0000600 0004000 0002000 00000000005 14620007372 0014250 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           4943.dat                                                                                            0000600 0004000 0002000 00000000005 14620007372 0014251 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           4945.dat                                                                                            0000600 0004000 0002000 00000000005 14620007372 0014253 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           4947.dat                                                                                            0000600 0004000 0002000 00000000005 14620007372 0014255 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           4949.dat                                                                                            0000600 0004000 0002000 00000000005 14620007372 0014257 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           4951.dat                                                                                            0000600 0004000 0002000 00000000005 14620007372 0014250 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           restore.sql                                                                                         0000600 0004000 0002000 00000047264 14620007372 0015402 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        --
-- NOTE:
--
-- File paths need to be edited. Search for $$PATH$$ and
-- replace it with the path to the directory containing
-- the extracted data files.
--
--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE tairu_db;
--
-- Name: tairu_db; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE tairu_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';


ALTER DATABASE tairu_db OWNER TO postgres;

\connect tairu_db

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: administrators; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.administrators (
    id integer NOT NULL,
    personal_id character varying(10) NOT NULL,
    password character varying(256) NOT NULL,
    name character varying(70) NOT NULL,
    phone_number character varying(17) NOT NULL,
    email character varying(120) NOT NULL,
    residence_location character varying(50) NOT NULL
);


ALTER TABLE public.administrators OWNER TO postgres;

--
-- Name: administrators_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.administrators ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.administrators_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.items (
    id integer NOT NULL,
    barcode_id character varying(12),
    name character varying(70) NOT NULL,
    price numeric(4,2) NOT NULL,
    "category " character varying(25) NOT NULL,
    manufacturer character varying(70) NOT NULL,
    quantity integer NOT NULL
);


ALTER TABLE public.items OWNER TO postgres;

--
-- Name: articles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.items ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.articles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: cashier; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cashier (
    id integer NOT NULL,
    personal_id character varying(10) NOT NULL,
    name character varying(70) NOT NULL,
    password character varying(256) NOT NULL,
    phone_number character varying(17) NOT NULL,
    email character varying(120) NOT NULL,
    residence_location character varying(50) NOT NULL
);


ALTER TABLE public.cashier OWNER TO postgres;

--
-- Name: cashier_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.cashier ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.cashier_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: customers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.customers (
    id integer NOT NULL,
    name character varying(70) NOT NULL,
    personal_id character varying(10) NOT NULL,
    phone_number character varying(17) NOT NULL,
    residence_location character varying(50) NOT NULL
);


ALTER TABLE public.customers OWNER TO postgres;

--
-- Name: customers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.customers ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.customers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: entries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.entries (
    id integer NOT NULL,
    admin_id integer NOT NULL,
    description text NOT NULL,
    date timestamp without time zone NOT NULL
);


ALTER TABLE public.entries OWNER TO postgres;

--
-- Name: entries_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.entries ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.entries_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: entries_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.entries_items (
    id integer NOT NULL,
    entry_id integer NOT NULL,
    item_id integer NOT NULL,
    quantity integer NOT NULL
);


ALTER TABLE public.entries_items OWNER TO postgres;

--
-- Name: entries_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.entries_items ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.entries_items_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: notifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notifications (
    id integer NOT NULL,
    date timestamp without time zone NOT NULL,
    body_message character varying NOT NULL,
    priority_status character varying NOT NULL
);


ALTER TABLE public.notifications OWNER TO postgres;

--
-- Name: notifications_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.notifications ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.notifications_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: reports; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reports (
    id integer NOT NULL,
    admin_id integer NOT NULL,
    type character varying(25) NOT NULL,
    report_url character varying NOT NULL,
    date timestamp without time zone NOT NULL
);


ALTER TABLE public.reports OWNER TO postgres;

--
-- Name: reports_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.reports ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.reports_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: sales; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sales (
    id integer NOT NULL,
    cashier_id integer NOT NULL,
    customer_id integer NOT NULL,
    date timestamp without time zone NOT NULL
);


ALTER TABLE public.sales OWNER TO postgres;

--
-- Name: sales_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.sales ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.sales_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: sales_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sales_items (
    id integer NOT NULL,
    item_id integer NOT NULL,
    sale_id integer NOT NULL,
    quantity integer NOT NULL
);


ALTER TABLE public.sales_items OWNER TO postgres;

--
-- Name: sales_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.sales_items ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.sales_items_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: sent_notifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sent_notifications (
    id integer NOT NULL,
    notification_id integer NOT NULL,
    admin_id integer NOT NULL,
    is_read boolean NOT NULL,
    is_ignored boolean NOT NULL
);


ALTER TABLE public.sent_notifications OWNER TO postgres;

--
-- Name: sent_notifications_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.sent_notifications ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.sent_notifications_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: administrators; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.administrators (id, personal_id, password, name, phone_number, email, residence_location) FROM stdin;
\.
COPY public.administrators (id, personal_id, password, name, phone_number, email, residence_location) FROM '$$PATH$$/4931.dat';

--
-- Data for Name: cashier; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cashier (id, personal_id, name, password, phone_number, email, residence_location) FROM stdin;
\.
COPY public.cashier (id, personal_id, name, password, phone_number, email, residence_location) FROM '$$PATH$$/4935.dat';

--
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.customers (id, name, personal_id, phone_number, residence_location) FROM stdin;
\.
COPY public.customers (id, name, personal_id, phone_number, residence_location) FROM '$$PATH$$/4937.dat';

--
-- Data for Name: entries; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.entries (id, admin_id, description, date) FROM stdin;
\.
COPY public.entries (id, admin_id, description, date) FROM '$$PATH$$/4939.dat';

--
-- Data for Name: entries_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.entries_items (id, entry_id, item_id, quantity) FROM stdin;
\.
COPY public.entries_items (id, entry_id, item_id, quantity) FROM '$$PATH$$/4941.dat';

--
-- Data for Name: items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.items (id, barcode_id, name, price, "category ", manufacturer, quantity) FROM stdin;
\.
COPY public.items (id, barcode_id, name, price, "category ", manufacturer, quantity) FROM '$$PATH$$/4933.dat';

--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.notifications (id, date, body_message, priority_status) FROM stdin;
\.
COPY public.notifications (id, date, body_message, priority_status) FROM '$$PATH$$/4943.dat';

--
-- Data for Name: reports; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reports (id, admin_id, type, report_url, date) FROM stdin;
\.
COPY public.reports (id, admin_id, type, report_url, date) FROM '$$PATH$$/4945.dat';

--
-- Data for Name: sales; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sales (id, cashier_id, customer_id, date) FROM stdin;
\.
COPY public.sales (id, cashier_id, customer_id, date) FROM '$$PATH$$/4947.dat';

--
-- Data for Name: sales_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sales_items (id, item_id, sale_id, quantity) FROM stdin;
\.
COPY public.sales_items (id, item_id, sale_id, quantity) FROM '$$PATH$$/4949.dat';

--
-- Data for Name: sent_notifications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sent_notifications (id, notification_id, admin_id, is_read, is_ignored) FROM stdin;
\.
COPY public.sent_notifications (id, notification_id, admin_id, is_read, is_ignored) FROM '$$PATH$$/4951.dat';

--
-- Name: administrators_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.administrators_id_seq', 1, false);


--
-- Name: articles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.articles_id_seq', 1, false);


--
-- Name: cashier_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cashier_id_seq', 1, false);


--
-- Name: customers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.customers_id_seq', 1, false);


--
-- Name: entries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.entries_id_seq', 1, false);


--
-- Name: entries_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.entries_items_id_seq', 1, false);


--
-- Name: notifications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.notifications_id_seq', 1, false);


--
-- Name: reports_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reports_id_seq', 1, false);


--
-- Name: sales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sales_id_seq', 1, false);


--
-- Name: sales_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sales_items_id_seq', 1, false);


--
-- Name: sent_notifications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sent_notifications_id_seq', 1, false);


--
-- Name: administrators administrators_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.administrators
    ADD CONSTRAINT administrators_pkey PRIMARY KEY (id);


--
-- Name: items articles_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT articles_pk PRIMARY KEY (id);


--
-- Name: cashier cashiers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cashier
    ADD CONSTRAINT cashiers_pkey PRIMARY KEY (id);


--
-- Name: customers customers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (id);


--
-- Name: entries_items entries_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.entries_items
    ADD CONSTRAINT entries_items_pkey PRIMARY KEY (id);


--
-- Name: entries entries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.entries
    ADD CONSTRAINT entries_pkey PRIMARY KEY (id);


--
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);


--
-- Name: customers phone_number_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT phone_number_unique UNIQUE (phone_number);


--
-- Name: reports reports_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reports
    ADD CONSTRAINT reports_pkey PRIMARY KEY (id);


--
-- Name: sales_items sales_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sales_items
    ADD CONSTRAINT sales_items_pkey PRIMARY KEY (id);


--
-- Name: sales sales_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sales
    ADD CONSTRAINT sales_pkey PRIMARY KEY (id);


--
-- Name: sent_notifications sent_notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sent_notifications
    ADD CONSTRAINT sent_notifications_pkey PRIMARY KEY (id);


--
-- Name: administrators unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.administrators
    ADD CONSTRAINT "unique" UNIQUE (phone_number, email, personal_id);


--
-- Name: cashier unique2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cashier
    ADD CONSTRAINT unique2 UNIQUE (phone_number, email, personal_id);


--
-- Name: customers unique_personal_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT unique_personal_id UNIQUE (personal_id);


--
-- Name: fki_admin_id_entries_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_admin_id_entries_fk ON public.entries USING btree (admin_id);


--
-- Name: fki_admin_id_reports_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_admin_id_reports_fk ON public.reports USING btree (admin_id);


--
-- Name: fki_admin_id_sent_notifications_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_admin_id_sent_notifications_fk ON public.sent_notifications USING btree (admin_id);


--
-- Name: fki_cashier_id_sales_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_cashier_id_sales_fk ON public.sales USING btree (cashier_id);


--
-- Name: fki_customer_id_sales_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_customer_id_sales_fk ON public.sales USING btree (customer_id);


--
-- Name: fki_e; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_e ON public.entries_items USING btree (item_id);


--
-- Name: fki_entry_id_entries_items_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_entry_id_entries_items_fk ON public.entries_items USING btree (entry_id);


--
-- Name: fki_item_id_sales_items_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_item_id_sales_items_fk ON public.sales_items USING btree (item_id);


--
-- Name: fki_notification_id_sent_notifications_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_notification_id_sent_notifications_fk ON public.sent_notifications USING btree (notification_id);


--
-- Name: fki_sale_id_sales_items_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_sale_id_sales_items_fk ON public.sales_items USING btree (sale_id);


--
-- Name: entries admin_id_entries_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.entries
    ADD CONSTRAINT admin_id_entries_fk FOREIGN KEY (admin_id) REFERENCES public.administrators(id);


--
-- Name: reports admin_id_reports_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reports
    ADD CONSTRAINT admin_id_reports_fk FOREIGN KEY (admin_id) REFERENCES public.administrators(id);


--
-- Name: sent_notifications admin_id_sent_notifications_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sent_notifications
    ADD CONSTRAINT admin_id_sent_notifications_fk FOREIGN KEY (admin_id) REFERENCES public.administrators(id);


--
-- Name: sales cashier_id_sales_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sales
    ADD CONSTRAINT cashier_id_sales_fk FOREIGN KEY (cashier_id) REFERENCES public.cashier(id);


--
-- Name: sales customer_id_sales_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sales
    ADD CONSTRAINT customer_id_sales_fk FOREIGN KEY (customer_id) REFERENCES public.customers(id);


--
-- Name: entries_items entry_id_entries_items_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.entries_items
    ADD CONSTRAINT entry_id_entries_items_fk FOREIGN KEY (entry_id) REFERENCES public.entries(id);


--
-- Name: entries_items item_id_entries_items_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.entries_items
    ADD CONSTRAINT item_id_entries_items_fk FOREIGN KEY (item_id) REFERENCES public.items(id);


--
-- Name: sales_items item_id_sales_items_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sales_items
    ADD CONSTRAINT item_id_sales_items_fk FOREIGN KEY (item_id) REFERENCES public.items(id);


--
-- Name: sent_notifications notification_id_sent_notifications_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sent_notifications
    ADD CONSTRAINT notification_id_sent_notifications_fk FOREIGN KEY (notification_id) REFERENCES public.notifications(id);


--
-- Name: sales_items sale_id_sales_items_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sales_items
    ADD CONSTRAINT sale_id_sales_items_fk FOREIGN KEY (sale_id) REFERENCES public.sales(id);


--
-- PostgreSQL database dump complete
--

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            