--
-- PostgreSQL database dump
--

-- Dumped from database version 13.2
-- Dumped by pg_dump version 13.2

-- Started on 2021-03-25 14:46:00

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
-- TOC entry 200 (class 1259 OID 32771)
-- Name: list; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.list (
    id integer NOT NULL,
    text text NOT NULL,
    done boolean NOT NULL
);


ALTER TABLE public.list OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 32779)
-- Name: list_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.list ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.list_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 2983 (class 0 OID 32771)
-- Dependencies: 200
-- Data for Name: list; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.list (id, text, done) FROM stdin;
\.


--
-- TOC entry 2990 (class 0 OID 0)
-- Dependencies: 201
-- Name: list_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.list_id_seq', 7, true);


--
-- TOC entry 2852 (class 2606 OID 32778)
-- Name: list list_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.list
    ADD CONSTRAINT list_pkey PRIMARY KEY (id);


-- Completed on 2021-03-25 14:46:00

--
-- PostgreSQL database dump complete
--

