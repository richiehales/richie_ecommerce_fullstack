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
  price         NUMERIC(4,2) NOT NULL,
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



-- ******************** Add data to user_info
-- Add from user_info.sql if rquired

  -- ******************** Add data to products
INSERT INTO product (name, price, description, category) VALUES
  ('Running Shoes 1', 79.99, 'High-performance running shoes', 'running shoes'),
  ('Running Shoes 2', 89.99, 'Lightweight and breathable running shoes', 'running shoes'),
  ('Running Shoes 3', 99.99, 'Cushioned running shoes for long distances', 'running shoes'),
  ('Running Shoes 4', 69.99, 'Trail running shoes for rugged terrain', 'running shoes'),
  ('Running Shoes 5', 79.99, 'Stylish and comfortable running shoes', 'running shoes'),

  ('Shorts 1', 29.99, 'Quick-dry and comfortable shorts', 'shorts'),
  ('Shorts 2', 39.99, 'Athletic shorts with moisture-wicking fabric', 'shorts'),
  ('Shorts 3', 34.99, 'Running shorts with built-in compression', 'shorts'),
  ('Shorts 4', 24.99, 'Casual shorts for everyday wear', 'shorts'),
  ('Shorts 5', 29.99, 'Performance shorts for various activities', 'shorts'),

  ('T-Shirt 1', 19.99, 'Basic cotton t-shirt for casual wear', 't-shirts'),
  ('T-Shirt 2', 24.99, 'Moisture-wicking t-shirt for sports activities', 't-shirts'),
  ('T-Shirt 3', 29.99, 'Graphic tee with a stylish design', 't-shirts'),
  ('T-Shirt 4', 21.99, 'Comfortable and breathable t-shirt', 't-shirts'),
  ('T-Shirt 5', 26.99, 'Long-sleeve t-shirt for cooler weather', 't-shirts'),

  ('Socks 1', 9.99, 'Ankle socks for everyday use', 'socks'),
  ('Socks 2', 12.99, 'Cushioned socks for running and sports', 'socks'),
  ('Socks 3', 8.99, 'Athletic socks with arch support', 'socks'),
  ('Socks 4', 10.99, 'Compression socks for improved circulation', 'socks'),
  ('Socks 5', 7.99, 'Lightweight and breathable socks', 'socks');
