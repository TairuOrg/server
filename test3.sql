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
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, personal_id, password, name, phone_number, email, residence_location, is_deleted) FROM stdin;
5	55555555	15e2b0d3c33891ebb0f1ef609ec419420c20e320ce94c65fbc8c3312448eb225	Jane Doe	+588888888	jane@gmail.com	La Limpia	f
6	274444444	15e2b0d3c33891ebb0f1ef609ec419420c20e320ce94c65fbc8c3312448eb225	a	+598988787	a@gmail.com	La Sucia	f
10	554445	123	juan	+5841465555	juan@gmail.com	ZULIA	f
13	553445	123	juan	+58414645555	juan2@gmail.com	ZULIA	f
17	55323445	123	juan	+5841464545555	juan234@gmail.com	ZULIA	f
18	V355345		Juan	4121234568		amazonas	f
19	V55589789	123456789	juanprueba	4128978541	holaprubeA@gmail.com	amazonas	f
20	V254663	710d740674c57e0823793e9ca53b8377b504ab44ff3a36dd29129e4841a43dd0	ghrdhdsf	4122356234	juafirebg@gmail.com	amazonas	f
21	V12345678	ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f	Juan	4121234567	juan.manuelbarreto@hotmail.com	miranda	f
7	123456789	15e2b0d3c33891ebb0f1ef609ec419420c20e320ce94c65fbc8c3312448eb225	Pedro Pedro		hola@gmail.com	Urbe	t
1	31106376	15e2b0d3c33891ebb0f1ef609ec419420c20e320ce94c65fbc8c3312448eb225	testname	4121834568	john@gmail.com	lia2	f
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
5	jueththtshtshsththdtshtshstfhdtghdfghshsghjdfhththan	V1145111	45581367534	35644	f
6	jkhkjhlkjk	V30918825	4120000000	zulia	f
\.


--
-- Data for Name: entries; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.entries (id, admin_id, description, date) FROM stdin;
1	5	Compra de Harina Pan	2023-01-08 04:05:06
2	1	Compra de Jabones	2024-03-08 04:05:06
\.


--
-- Data for Name: items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.items (id, barcode_id, name, price, category, manufacturer, quantity) FROM stdin;
2	555555555555	Jabón Las Llaves	1.50	Higiene	Las Llaves	15000
3	4383838	Pan Francés	4.00	Alimentos	Panadería	50
4	32465	Arroz Mary 1kg	2.00	Viveres	Mary	1300
1	11111111111111	mermelada de pollo	69.69	mermelada	gianela	0
7	7590011890903	galleta	46.00	Alimentos	belvita	0
5	071169710550	Sprinkles	50.00	Alimentos	savoy	490
6	7592365109526	Galletas pegadas	23.00	Alimentos	independencia	1
\.


--
-- Data for Name: entries_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.entries_items (id, entry_id, item_id, quantity) FROM stdin;
1	1	2	50
2	2	1	600
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
4	7	4	2024-01-08 04:05:06	f
3	6	3	2024-07-01 04:05:06	t
19	6	6	2024-06-28 15:56:10	t
20	6	6	2024-06-30 16:55:23	t
21	6	6	2024-07-01 22:24:58	f
22	6	3	2024-07-03 00:58:16	f
\.


--
-- Data for Name: sales_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sales_items (id, item_id, sale_id, quantity) FROM stdin;
80	6	3	6
79	7	3	5
81	5	3	3
82	5	19	7
83	6	19	3
84	5	22	5
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

SELECT pg_catalog.setval('public.customers_id_seq', 6, true);


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

SELECT pg_catalog.setval('public.items_id_seq', 7, true);


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

SELECT pg_catalog.setval('public.sales_id_seq', 22, true);


--
-- Name: sales_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sales_items_id_seq', 84, true);


--
-- Name: sent_notifications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sent_notifications_id_seq', 4, true);


--
-- PostgreSQL database dump complete
--

