TYPE=VIEW
query=select `grace_academy_db`.`supply`.`id` AS `id`,`p`.`name` AS `item`,`s`.`name` AS `supplier`,`u`.`name` AS `unit`,`grace_academy_db`.`supply`.`quantity` AS `quantity`,`grace_academy_db`.`supply`.`serial_number` AS `serial_number`,`grace_academy_db`.`supply`.`isbn` AS `isbn`,`grace_academy_db`.`supply`.`barcode` AS `barcode`,`grace_academy_db`.`supply`.`remark` AS `remark`,`grace_academy_db`.`supply`.`supply_date` AS `supply_date` from `grace_academy_db`.`product` `p` join `grace_academy_db`.`supply` join `grace_academy_db`.`supplier` `s` join `grace_academy_db`.`unit` `u` where `grace_academy_db`.`supply`.`product` = `p`.`id` and `grace_academy_db`.`supply`.`supplier` = `s`.`id` and `grace_academy_db`.`supply`.`unit` = `u`.`id`
md5=56fbfc0598ffb9c283fda7b998774b23
updatable=1
algorithm=0
definer_user=root
definer_host=localhost
suid=2
with_check_option=0
timestamp=2024-04-12 01:28:57
create-version=2
source=SELECT supply.id, p.name item, s.name supplier, u.name unit, supply.quantity, supply.serial_number, supply.isbn, supply.barcode, supply.remark, supply.supply_date\nfrom product p, supply, supplier s, unit u\nwhere supply.product = p.id and supply.supplier = s.id and supply.unit = u.id
client_cs_name=utf8mb4
connection_cl_name=utf8mb4_unicode_ci
view_body_utf8=select `grace_academy_db`.`supply`.`id` AS `id`,`p`.`name` AS `item`,`s`.`name` AS `supplier`,`u`.`name` AS `unit`,`grace_academy_db`.`supply`.`quantity` AS `quantity`,`grace_academy_db`.`supply`.`serial_number` AS `serial_number`,`grace_academy_db`.`supply`.`isbn` AS `isbn`,`grace_academy_db`.`supply`.`barcode` AS `barcode`,`grace_academy_db`.`supply`.`remark` AS `remark`,`grace_academy_db`.`supply`.`supply_date` AS `supply_date` from `grace_academy_db`.`product` `p` join `grace_academy_db`.`supply` join `grace_academy_db`.`supplier` `s` join `grace_academy_db`.`unit` `u` where `grace_academy_db`.`supply`.`product` = `p`.`id` and `grace_academy_db`.`supply`.`supplier` = `s`.`id` and `grace_academy_db`.`supply`.`unit` = `u`.`id`
mariadb-version=100424
