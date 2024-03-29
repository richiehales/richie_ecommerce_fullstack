-- ******************* Create user table
-- Enable the uuid-ossp extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the user_info table with a UUID column as the primary key
CREATE TABLE user_info
(
  id          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  password    varchar(100) NOT NULL,
  email       varchar(50) NOT NULL,
  first_name  varchar(50) NOT NULL,
  last_name   varchar(50) NOT NULL
);

-- ********************* Create product table
CREATE TABLE product
(
  id            SERIAL PRIMARY KEY,
  name          varchar(50) NOT NULL,
  price         money NOT NULL,
  description   varchar(100) NOT NULL,
  category      varchar(50) NOT NULL
);

-- ******************** Create cart table
CREATE TABLE cart_user -- was cart
(
  id        SERIAL PRIMARY KEY,
  user_id   UUID REFERENCES user_info(id) ON DELETE SET NULL
);

-- ****************** Create basket table
CREATE TABLE basket -- was cart_product
(
  id          SERIAL PRIMARY KEY,
  cart_id     integer REFERENCES cart_user(id) ON DELETE SET NULL,
  product_id  integer REFERENCES product(id),
  quantity    integer NOT NULL
);

-- ****************** Create order_user table
CREATE TABLE order_user
(
  id        SERIAL PRIMARY KEY,
  user_id   UUID REFERENCES user_info(id) ON DELETE SET NULL,
  order_date timestamp DEFAULT CURRENT_TIMESTAMP
);

-- ****************** Create order table (order_items)
CREATE TABLE orders
(
  id          SERIAL PRIMARY KEY,
  order_id    integer REFERENCES order_user(id) ON DELETE SET NULL,
  product_id  integer REFERENCES product(id),
  quantity    integer NOT NULL
);


