-- Align existing Pilot Households with the approved four-week programme.
-- Messages, sessions, partner links and member assignments are retained.
UPDATE households SET duration = 4, week = MIN(week, 4) WHERE duration = 6;
