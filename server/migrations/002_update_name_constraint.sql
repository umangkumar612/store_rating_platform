ALTER TABLE users
DROP CONSTRAINT users_name_check;

ALTER TABLE users
    ADD CONSTRAINT users_name_check
        CHECK (
            char_length(name) >= 3
                AND char_length(name) <= 50
            );