CREATE TABLE public."user" (
     todouserid BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
     todousernm VARCHAR(25) 
);

CREATE TABLE public."todo" (
     todokey UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     todouserid VARCHAR(25),
     tododesc VARCHAR(250),
     done BOOLEAN
);
