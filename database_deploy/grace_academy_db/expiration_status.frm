TYPE=VIEW
query=select `s`.`id` AS `id`,`p`.`name` AS `product`,`u`.`name` AS `unit`,`s`.`quantity` AS `quantity`,`s`.`expiry_date` AS `expiry_date` from `grace_academy_db`.`product` `p` join `grace_academy_db`.`unit` `u` join `grace_academy_db`.`supply` `s` where `s`.`expiry_date` < curdate() and `p`.`id` = `s`.`product` and `u`.`id` = `s`.`unit`
md5=5cf02610321b7f32efb9d40325d56ae6
updatable=1
algorithm=0
definer_user=root
definer_host=localhost
suid=2
with_check_option=0
timestamp=2024-03-25 15:04:38
create-version=2
source=SELECT s.id, p.name product, u.name unit, s.quantity, s.expiry_date FROM product p, unit u, supply s \nWHERE s.expiry_date < CURDATE()\nAND\np.id = s.product\nAND\nu.id = s.unit
client_cs_name=utf8mb4
connection_cl_name=utf8mb4_unicode_ci
view_body_utf8=select `s`.`id` AS `id`,`p`.`name` AS `product`,`u`.`name` AS `unit`,`s`.`quantity` AS `quantity`,`s`.`expiry_date` AS `expiry_date` from `grace_academy_db`.`product` `p` join `grace_academy_db`.`unit` `u` join `grace_academy_db`.`supply` `s` where `s`.`expiry_date` < curdate() and `p`.`id` = `s`.`product` and `u`.`id` = `s`.`unit`
mariadb-version=100424
