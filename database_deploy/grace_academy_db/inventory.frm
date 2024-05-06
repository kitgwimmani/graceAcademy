TYPE=VIEW
query=select `grace_academy_db`.`supply`.`id` AS `id`,`p`.`id` AS `product_id`,`grace_academy_db`.`supply`.`supply_date` AS `date`,`p`.`name` AS `item`,`c`.`name` AS `category`,`s`.`name` AS `supplier`,`u`.`name` AS `unit`,`grace_academy_db`.`supply`.`quantity` AS `quantity`,`grace_academy_db`.`supply`.`expiry_date` AS `expiry_date`,`grace_academy_db`.`supply`.`isbn` AS `isbn`,`grace_academy_db`.`supply`.`serial_number` AS `serial_number`,`grace_academy_db`.`supply`.`barcode` AS `barcode`,`grace_academy_db`.`supply`.`remark` AS `remark` from ((((`grace_academy_db`.`product` `p` join `grace_academy_db`.`category` `c`) join `grace_academy_db`.`supplier` `s`) join `grace_academy_db`.`unit` `u`) join `grace_academy_db`.`supply`) where `grace_academy_db`.`supply`.`product` = `p`.`id` and `grace_academy_db`.`supply`.`supplier` = `s`.`id` and `grace_academy_db`.`supply`.`unit` = `u`.`id` and `p`.`category` = `c`.`id`
md5=c4be274764df2c4da6cdff8d79ebea12
updatable=1
algorithm=0
definer_user=root
definer_host=localhost
suid=1
with_check_option=0
timestamp=2024-03-18 19:52:18
create-version=2
source=select `grace_academy_db`.`supply`.`id` AS `id`, `grace_academy_db`.`p`.`id` AS `product_id`,`grace_academy_db`.`supply`.`supply_date` AS `date`,`p`.`name` AS `item`,`c`.`name` AS `category`,`s`.`name` AS `supplier`,`u`.`name` AS `unit`,`grace_academy_db`.`supply`.`quantity` AS `quantity`,`grace_academy_db`.`supply`.`expiry_date` AS `expiry_date`,`grace_academy_db`.`supply`.`isbn` AS `isbn`,`grace_academy_db`.`supply`.`serial_number` AS `serial_number`,`grace_academy_db`.`supply`.`barcode` AS `barcode`,`grace_academy_db`.`supply`.`remark` AS `remark` from `grace_academy_db`.`product` `p` join `grace_academy_db`.`category` `c` join `grace_academy_db`.`supplier` `s` join `grace_academy_db`.`unit` `u` join `grace_academy_db`.`supply` where `grace_academy_db`.`supply`.`product` = `p`.`id` and `grace_academy_db`.`supply`.`supplier` = `s`.`id` and `grace_academy_db`.`supply`.`unit` = `u`.`id` and `p`.`category` = `c`.`id`
client_cs_name=utf8mb4
connection_cl_name=utf8mb4_unicode_ci
view_body_utf8=select `grace_academy_db`.`supply`.`id` AS `id`,`p`.`id` AS `product_id`,`grace_academy_db`.`supply`.`supply_date` AS `date`,`p`.`name` AS `item`,`c`.`name` AS `category`,`s`.`name` AS `supplier`,`u`.`name` AS `unit`,`grace_academy_db`.`supply`.`quantity` AS `quantity`,`grace_academy_db`.`supply`.`expiry_date` AS `expiry_date`,`grace_academy_db`.`supply`.`isbn` AS `isbn`,`grace_academy_db`.`supply`.`serial_number` AS `serial_number`,`grace_academy_db`.`supply`.`barcode` AS `barcode`,`grace_academy_db`.`supply`.`remark` AS `remark` from ((((`grace_academy_db`.`product` `p` join `grace_academy_db`.`category` `c`) join `grace_academy_db`.`supplier` `s`) join `grace_academy_db`.`unit` `u`) join `grace_academy_db`.`supply`) where `grace_academy_db`.`supply`.`product` = `p`.`id` and `grace_academy_db`.`supply`.`supplier` = `s`.`id` and `grace_academy_db`.`supply`.`unit` = `u`.`id` and `p`.`category` = `c`.`id`
mariadb-version=100424
