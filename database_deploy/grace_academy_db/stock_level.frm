TYPE=VIEW
query=select `p`.`id` AS `id`,`p`.`name` AS `name`,`p`.`serial_number` AS `serial_number`,`p`.`isbn` AS `isbn`,sum(`s`.`quantity`) AS `quantity`,`p`.`threshold` AS `threshold`,sum(`s`.`quantity`) - `p`.`threshold` AS `above`,`p`.`url` AS `reorder_url`,`p`.`reorder_status` AS `reorder_status` from (`grace_academy_db`.`supply` `s` join `grace_academy_db`.`product` `p`) where `p`.`id` = `s`.`product` group by `p`.`id`
md5=adf6c37d507d90e63f7e67f33bca89a5
updatable=0
algorithm=0
definer_user=root
definer_host=localhost
suid=1
with_check_option=0
timestamp=2024-04-26 09:54:46
create-version=2
source=select `p`.`id` AS `id`,`p`.`name` AS `name`,`p`.`serial_number` AS `serial_number`,`p`.`isbn` AS `isbn`,sum(`s`.`quantity`) AS `quantity`,`p`.`threshold` AS `threshold`,sum(`s`.`quantity`) - `p`.`threshold` AS `above`,`p`.`url` AS `reorder_url`, `p`.`reorder_status` from (`grace_academy_db`.`supply` `s` join `grace_academy_db`.`product` `p`) where `p`.`id` = `s`.`product` group by `p`.`id`
client_cs_name=utf8mb4
connection_cl_name=utf8mb4_unicode_ci
view_body_utf8=select `p`.`id` AS `id`,`p`.`name` AS `name`,`p`.`serial_number` AS `serial_number`,`p`.`isbn` AS `isbn`,sum(`s`.`quantity`) AS `quantity`,`p`.`threshold` AS `threshold`,sum(`s`.`quantity`) - `p`.`threshold` AS `above`,`p`.`url` AS `reorder_url`,`p`.`reorder_status` AS `reorder_status` from (`grace_academy_db`.`supply` `s` join `grace_academy_db`.`product` `p`) where `p`.`id` = `s`.`product` group by `p`.`id`
mariadb-version=100424
