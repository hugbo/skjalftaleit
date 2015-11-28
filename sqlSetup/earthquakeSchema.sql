-- Table: earthquakes

-- DROP TABLE earthquakes;

CREATE TABLE earthquakes
(
  "timestamp" text NOT NULL,
  results json,
  CONSTRAINT earthquakes_pkey PRIMARY KEY ("timestamp")
)
