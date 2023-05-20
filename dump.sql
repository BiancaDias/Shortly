--
-- PostgreSQL database dump
--

-- Dumped from database version 12.14 (Ubuntu 12.14-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.14 (Ubuntu 12.14-0ubuntu0.20.04.1)

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
-- Name: registered; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.registered (
    id integer NOT NULL,
    "idUser" integer NOT NULL,
    token text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: registered_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.registered_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: registered_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.registered_id_seq OWNED BY public.registered.id;


--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "userId" integer NOT NULL,
    url_original text NOT NULL,
    url_shortly text NOT NULL
);


--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: registered id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.registered ALTER COLUMN id SET DEFAULT nextval('public.registered_id_seq'::regclass);


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: registered; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.registered VALUES (1, 1, '5142e63f-b403-4f6a-9132-b80eaffb4dd9', '2023-05-19 12:35:47.708305');
INSERT INTO public.registered VALUES (2, 1, 'b7c58676-4cea-4843-bb9f-ab0efbae100f', '2023-05-19 12:35:50.183165');
INSERT INTO public.registered VALUES (3, 1, '0406a230-3269-415c-8b4d-9df141b925a5', '2023-05-19 12:35:51.752074');
INSERT INTO public.registered VALUES (4, 1, 'a5bacf71-a825-42d3-b44c-aba07aca6d81', '2023-05-19 12:35:53.146029');
INSERT INTO public.registered VALUES (5, 5, '008b7a09-dff5-4c25-b262-adacd883c7aa', '2023-05-19 12:37:27.439568');


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES (1, '2023-05-19 15:45:18.267551', 1, 'https://driven.com', 'BF-dbr4f');
INSERT INTO public.urls VALUES (2, '2023-05-19 15:47:18.596263', 1, 'https://driven.com', 'TvEW76_b');
INSERT INTO public.urls VALUES (3, '2023-05-19 18:45:32.798854', 1, 'https://driven.com', 'QesjBPQb');
INSERT INTO public.urls VALUES (4, '2023-05-19 18:45:43.883324', 1, 'https://driven.com', 'bGMq2Su2');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'Bianca', 'bianca@driven.com.br', '$2b$10$5qSCAVoKqPt/EZ7qu1VMs.dHusIVarr/aqa4EW.q7B/REXezT.JCW', '2023-05-19 11:53:25.138931');
INSERT INTO public.users VALUES (4, 'Bianca', 'bianca1@driven.com.br', '$2b$10$91VN4VFBHHH9kY7gB.xOj.5rEguXOTbtE6zrwX7wb55av7KC1Ko5.', '2023-05-19 12:06:16.233311');
INSERT INTO public.users VALUES (5, 'João', 'joao@driven.com.br', '$2b$10$7garkit2hkgmjQr5lEK4feO3qk76jcFxkTtJkc8gXTn9U.PSIELNq', '2023-05-19 12:36:52.969368');


--
-- Name: registered_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.registered_id_seq', 5, true);


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 4, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 5, true);


--
-- Name: registered registered_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.registered
    ADD CONSTRAINT registered_pk PRIMARY KEY (id);


--
-- Name: urls urls_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pk PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY (id);


--
-- Name: registered registered_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.registered
    ADD CONSTRAINT registered_fk0 FOREIGN KEY ("idUser") REFERENCES public.users(id);


--
-- Name: urls urls_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_fk0 FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

