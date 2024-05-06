TYPE=VIEW
query=select `grace_academy_db`.`transfer`.`id` AS `id`,`p`.`name` AS `product`,`p`.`serial_number` AS `serial_number`,`p`.`isbn` AS `isbn`,`p`.`barcode` AS `barcode`,`cat`.`name` AS `category`,`l`.`name` AS `location`,`c`.`name` AS `custodian`,`grace_academy_db`.`transfer`.`date_moved` AS `date_moved`,`grace_academy_db`.`transfer`.`date_expected` AS `date_expected`,`u`.`name` AS `unit`,`grace_academy_db`.`transfer`.`quantity` AS `quantity` from `grace_academy_db`.`product` `p` join `grace_academy_db`.`location` `l` join `grace_academy_db`.`transfer` join `grace_academy_db`.`custodian` `c` join `grace_academy_db`.`unit` `u` join `grace_academy_db`.`category` `cat` where `p`.`id` = `grace_academy_db`.`transfer`.`product_id` and `l`.`id` = `grace_academy_db`.`transfer`.`location_id` and `c`.`id` = `grace_academy_db`.`transfer`.`custodian_id` and `u`.`id` = `grace_academy_db`.`transfer`.`user_id` and `cat`.`id` = `p`.`category`
md5=863e47097b2f68eedac352e7403a4452
updatable=1
algorithm=0
definer_user=root
definer_host=localhost
suid=2
with_check_option=0
timestamp=2024-04-12 11:40:19
create-version=2
source=SELECT transfer.id, p.name product, p.serial_number, p.isbn, p.barcode, cat.name category, l.name location, c.name custodian, transfer.date_moved, transfer.date_expected, u.name unit, transfer.quantity quantity\nfrom product p, location l, transfer, custodian c, unit u, category cat\nwhere p.id = transfer.product_id and l.id = transfer.location_id and c.id = transfer.custodian_id and u.id = transfer.user_id and cat.id = p.category
client_cs_name=utf8mb4
connection_cl_name=utf8mb4_unicode_ci
view_body_utf8=select `grace_academy_db`.`transfer`.`id` AS `id`,`p`.`name` AS `product`,`p`.`serial_number` AS `serial_number`,`p`.`isbn` AS `isbn`,`p`.`barcode` AS `barcode`,`cat`.`name` AS `category`,`l`.`name` AS `location`,`c`.`name` AS `custodian`,`grace_academy_db`.`transfer`.`date_moved` AS `date_moved`,`grace_academy_db`.`transfer`.`date_expected` AS `date_expected`,`u`.`name` AS `unit`,`grace_academy_db`.`transfer`.`quantity` AS `quantity` from `grace_academy_db`.`product` `p` join `grace_academy_db`.`location` `l` join `grace_academy_db`.`transfer` join `grace_academy_db`.`custodian` `c` join `grace_academy_db`.`unit` `u` join `grace_academy_db`.`category` `cat` where `p`.`id` = `grace_academy_db`.`transfer`.`product_id` and `l`.`id` = `grace_academy_db`.`transfer`.`location_id` and `c`.`id` = `grace_academy_db`.`transfer`.`custodian_id` and `u`.`id` = `grace_academy_db`.`transfer`.`user_id` and `cat`.`id` = `p`.`category`
mariadb-version=100424
