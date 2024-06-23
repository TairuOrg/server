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

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    personal_id character varying(10) NOT NULL,
    password character varying(255) NOT NULL,
    name character varying(70) NOT NULL,
    phone_number character varying(17) NOT NULL,
    email character varying(70) NOT NULL,
    residence_location character varying(50) NOT NULL,
    is_deleted boolean DEFAULT false NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."User_id_seq" OWNER TO postgres;

--
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: administrators; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.administrators (
    id integer NOT NULL
);


ALTER TABLE public.administrators OWNER TO postgres;

--
-- Name: cashier; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cashier (
    id integer NOT NULL,
    is_online boolean DEFAULT false NOT NULL
);


ALTER TABLE public.cashier OWNER TO postgres;

--
-- Name: customers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.customers (
    id integer NOT NULL,
    name character varying(70) NOT NULL,
    personal_id character varying(10) NOT NULL,
    phone_number character varying(17) NOT NULL,
    residence_location character varying(50) NOT NULL,
    is_deleted boolean DEFAULT false NOT NULL
);


ALTER TABLE public.customers OWNER TO postgres;

--
-- Name: customers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.customers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.customers_id_seq OWNER TO postgres;

--
-- Name: customers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.customers_id_seq OWNED BY public.customers.id;


--
-- Name: entries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.entries (
    id integer NOT NULL,
    admin_id integer NOT NULL,
    description text NOT NULL,
    date timestamp(0) without time zone DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'::text) NOT NULL
);


ALTER TABLE public.entries OWNER TO postgres;

--
-- Name: entries_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.entries_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.entries_id_seq OWNER TO postgres;

--
-- Name: entries_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.entries_id_seq OWNED BY public.entries.id;


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

CREATE SEQUENCE public.entries_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.entries_items_id_seq OWNER TO postgres;

--
-- Name: entries_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.entries_items_id_seq OWNED BY public.entries_items.id;


--
-- Name: items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.items (
    id integer NOT NULL,
    barcode_id character varying(12),
    name character varying(70) NOT NULL,
    price numeric(4,2) NOT NULL,
    category character varying(25) NOT NULL,
    manufacturer character varying(70) NOT NULL,
    quantity integer NOT NULL
);


ALTER TABLE public.items OWNER TO postgres;

--
-- Name: items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.items_id_seq OWNER TO postgres;

--
-- Name: items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.items_id_seq OWNED BY public.items.id;


--
-- Name: notifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notifications (
    id integer NOT NULL,
    body_message character varying NOT NULL,
    priority_status character varying NOT NULL,
    date timestamp(0) without time zone DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'::text) NOT NULL
);


ALTER TABLE public.notifications OWNER TO postgres;

--
-- Name: notifications_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.notifications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.notifications_id_seq OWNER TO postgres;

--
-- Name: notifications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.notifications_id_seq OWNED BY public.notifications.id;


--
-- Name: reports; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reports (
    id integer NOT NULL,
    admin_id integer NOT NULL,
    type character varying(25) NOT NULL,
    report_url character varying NOT NULL,
    date timestamp(0) without time zone DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'::text) NOT NULL
);


ALTER TABLE public.reports OWNER TO postgres;

--
-- Name: reports_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reports_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reports_id_seq OWNER TO postgres;

--
-- Name: reports_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reports_id_seq OWNED BY public.reports.id;


--
-- Name: sales; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sales (
    id integer NOT NULL,
    cashier_id integer NOT NULL,
    customer_id integer NOT NULL,
    date timestamp(0) without time zone DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'::text),
    is_completed boolean DEFAULT true NOT NULL
);


ALTER TABLE public.sales OWNER TO postgres;

--
-- Name: sales_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sales_id_seq OWNER TO postgres;

--
-- Name: sales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sales_id_seq OWNED BY public.sales.id;


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

CREATE SEQUENCE public.sales_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sales_items_id_seq OWNER TO postgres;

--
-- Name: sales_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sales_items_id_seq OWNED BY public.sales_items.id;


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

CREATE SEQUENCE public.sent_notifications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sent_notifications_id_seq OWNER TO postgres;

--
-- Name: sent_notifications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sent_notifications_id_seq OWNED BY public.sent_notifications.id;


--
-- Name: User id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- Name: customers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers ALTER COLUMN id SET DEFAULT nextval('public.customers_id_seq'::regclass);


--
-- Name: entries id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.entries ALTER COLUMN id SET DEFAULT nextval('public.entries_id_seq'::regclass);


--
-- Name: entries_items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.entries_items ALTER COLUMN id SET DEFAULT nextval('public.entries_items_id_seq'::regclass);


--
-- Name: items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items ALTER COLUMN id SET DEFAULT nextval('public.items_id_seq'::regclass);


--
-- Name: notifications id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications ALTER COLUMN id SET DEFAULT nextval('public.notifications_id_seq'::regclass);


--
-- Name: reports id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reports ALTER COLUMN id SET DEFAULT nextval('public.reports_id_seq'::regclass);


--
-- Name: sales id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sales ALTER COLUMN id SET DEFAULT nextval('public.sales_id_seq'::regclass);


--
-- Name: sales_items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sales_items ALTER COLUMN id SET DEFAULT nextval('public.sales_items_id_seq'::regclass);


--
-- Name: sent_notifications id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sent_notifications ALTER COLUMN id SET DEFAULT nextval('public.sent_notifications_id_seq'::regclass);


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, personal_id, password, name, phone_number, email, residence_location, is_deleted) FROM stdin;
1	31106376	15e2b0d3c33891ebb0f1ef609ec419420c20e320ce94c65fbc8c3312448eb225	John Doe	+584146555555	john@gmail.com	La Victoria	f
5	55555555	15e2b0d3c33891ebb0f1ef609ec419420c20e320ce94c65fbc8c3312448eb225	Jane Doe	+588888888	jane@gmail.com	La Limpia	f
6	274444444	15e2b0d3c33891ebb0f1ef609ec419420c20e320ce94c65fbc8c3312448eb225	a	+598988787	a@gmail.com	La Sucia	f
7	123456789	15e2b0d3c33891ebb0f1ef609ec419420c20e320ce94c65fbc8c3312448eb225	Pedro Pedro	+5789894545	hola@gmail.com	Urbe	f
10	554445	123	juan	+5841465555	juan@gmail.com	ZULIA	f
13	553445	123	juan	+58414645555	juan2@gmail.com	ZULIA	f
17	55323445	123	juan	+5841464545555	juan234@gmail.com	ZULIA	f
18	V355345		Juan	4121234568		amazonas	f
19	V55589789	123456789	juanprueba	4128978541	holaprubeA@gmail.com	amazonas	f
20	V254663	710d740674c57e0823793e9ca53b8377b504ab44ff3a36dd29129e4841a43dd0	ghrdhdsf	4122356234	juafirebg@gmail.com	amazonas	f
21	V12345678	ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f	Juan	4121234567	juan.manuelbarreto@hotmail.com	miranda	f
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
6cb5bbc7-b5fc-4fc3-85ff-3043d1355c19	8ad0d00c2c6505d23dca3c7d57f0cee362d8db89377abd9d6600c420410aec5e	2024-05-17 15:19:00.235447-03	20240516041200_add_user_entity	\N	\N	2024-05-17 15:19:00.117495-03	1
\.


--
-- Data for Name: administrators; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.administrators (id) FROM stdin;
1
5
10
13
17
18
19
20
21
\.


--
-- Data for Name: cashier; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cashier (id, is_online) FROM stdin;
7	f
6	t
\.


--
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.customers (id, name, personal_id, phone_number, residence_location, is_deleted) FROM stdin;
3	José Pérez	V1111111	+58123456	Fuerzas Armadas	f
4	pepeww'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwyyww-wfyyfwwwww	V1112111	4144812914	MARACAIBO	f
\.


--
-- Data for Name: entries; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.entries (id, admin_id, description, date) FROM stdin;
1	5	Compra de Harina Pan	2023-01-08 04:05:06
2	1	Compra de Jabones	2024-03-08 04:05:06
\.


--
-- Data for Name: entries_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.entries_items (id, entry_id, item_id, quantity) FROM stdin;
1	1	2	50
2	2	1	600
\.


--
-- Data for Name: items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.items (id, barcode_id, name, price, category, manufacturer, quantity) FROM stdin;
1	123456875555	Harina Pan	5.50	Viveres	Polar	500
2	555555555555	Jabón Las Llaves	1.50	Higiene	Las Llaves	15000
3	4383838	Pan Francés	4.00	Alimentos	Panadería	50
4	32465	Arroz Mary 1kg	2.00	Viveres	Mary	1300
\.


--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.notifications (id, body_message, priority_status, date) FROM stdin;
1	Se compraron 50 harina pan	Baja	2024-05-20 01:59:35
2	El stock de jabones bajó de 5 unidades	Alta	2024-05-20 01:59:35
\.


--
-- Data for Name: reports; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reports (id, admin_id, type, report_url, date) FROM stdin;
1	1	Reporte de ventas	https://monkeytype.com/	2023-01-31 04:05:06
\.


--
-- Data for Name: sales; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sales (id, cashier_id, customer_id, date, is_completed) FROM stdin;
3	6	3	1999-01-08 04:05:06	t
4	7	4	2024-01-08 04:05:06	t
5	6	3	2024-05-18 03:03:06	t
6	7	3	2024-05-19 05:05:03	t
11	6	3	2024-05-19 19:28:33	t
12	6	3	2024-05-19 19:56:41	t
13	6	3	2024-05-19 19:57:15	t
14	6	3	2024-05-19 20:12:53	t
15	6	3	2024-05-19 20:17:06	t
16	7	3	2024-05-19 20:21:58	t
17	6	3	2024-05-19 23:28:01	t
18	6	3	2024-06-20 01:36:48	t
\.


--
-- Data for Name: sales_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sales_items (id, item_id, sale_id, quantity) FROM stdin;
2	1	3	50
3	2	4	5
7	1	6	10
8	2	6	5
\.


--
-- Data for Name: sent_notifications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sent_notifications (id, notification_id, admin_id, is_read, is_ignored) FROM stdin;
1	1	1	t	f
2	1	1	f	t
3	2	5	f	f
4	2	5	t	t
\.


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."User_id_seq"', 21, true);


--
-- Name: customers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.customers_id_seq', 4, true);


--
-- Name: entries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.entries_id_seq', 2, true);


--
-- Name: entries_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.entries_items_id_seq', 2, true);


--
-- Name: items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.items_id_seq', 4, true);


--
-- Name: notifications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.notifications_id_seq', 2, true);


--
-- Name: reports_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reports_id_seq', 1, true);


--
-- Name: sales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sales_id_seq', 18, true);


--
-- Name: sales_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sales_items_id_seq', 8, true);


--
-- Name: sent_notifications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sent_notifications_id_seq', 4, true);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: items articles_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT articles_pk PRIMARY KEY (id);


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
-- Name: email_unique_user; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX email_unique_user ON public."User" USING btree (email);


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
-- Name: fki_administrator_id_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_administrator_id_fk ON public.administrators USING btree (id);


--
-- Name: fki_cashier_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_cashier_fk ON public.cashier USING btree (id);


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
-- Name: id_admin_unique_constraint; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX id_admin_unique_constraint ON public.administrators USING btree (id);


--
-- Name: id_cashier_unique_constraint; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX id_cashier_unique_constraint ON public.cashier USING btree (id);


--
-- Name: phone_number_unique; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX phone_number_unique ON public.customers USING btree (phone_number);


--
-- Name: unique_personal_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX unique_personal_id ON public.customers USING btree (personal_id);


--
-- Name: unique_personal_id_constraint; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX unique_personal_id_constraint ON public."User" USING btree (personal_id);


--
-- Name: user_phone_number_unique; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX user_phone_number_unique ON public."User" USING btree (phone_number);


--
-- Name: administrators administrator_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.administrators
    ADD CONSTRAINT administrator_id_fk FOREIGN KEY (id) REFERENCES public."User"(id);


--
-- Name: cashier cashier_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cashier
    ADD CONSTRAINT cashier_fk FOREIGN KEY (id) REFERENCES public."User"(id);


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
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

