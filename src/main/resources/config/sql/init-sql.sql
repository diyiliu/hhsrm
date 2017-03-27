 -- 菜单初始化
 INSERT INTO sys_resource (sysres_id, parent_sysres_id, parent_sysres_ids, resource_name, resource_code, TYPE, url, icon, sort, create_time, update_time, mark, state) VALUES ('8172580576191697285', '0', '', '组织机构', '', 'menu', '', '', '10', SYSDATE, SYSDATE, '', '1');
 INSERT INTO sys_resource (sysres_id, parent_sysres_id, parent_sysres_ids, resource_name, resource_code, TYPE, url, icon, sort, create_time, update_time, mark, state) VALUES ('4903521313523772771', '0', '', '系统管理', '', 'menu', '', '', '20', SYSDATE, SYSDATE, '', '1');
 INSERT INTO sys_resource (sysres_id, parent_sysres_id, parent_sysres_ids, resource_name, resource_code, TYPE, url, icon, sort, create_time, update_time, mark, state) VALUES ('7093616926890141810', '0', '', '通知公告', '', 'menu', '', '', '30', SYSDATE, SYSDATE, '', '1');

 INSERT INTO sys_resource (sysres_id, parent_sysres_id, parent_sysres_ids, resource_name, resource_code, TYPE, url, icon, sort, create_time, update_time, mark, state) VALUES ('5994219696977348115', '8172580576191697285', '', '员工管理', '', 'menu', '', '', '10', SYSDATE, SYSDATE, '', '1');
 INSERT INTO sys_resource (sysres_id, parent_sysres_id, parent_sysres_ids, resource_name, resource_code, TYPE, url, icon, sort, create_time, update_time, mark, state) VALUES ('6234336051978605470', '8172580576191697285', '', '组织管理', '', 'menu', '', '', '20', SYSDATE, SYSDATE, '', '1');

 INSERT INTO sys_resource (sysres_id, parent_sysres_id, parent_sysres_ids, resource_name, resource_code, TYPE, url, icon, sort, create_time, update_time, mark, state) VALUES ('6589861342236524635', '4903521313523772771', '', '账户管理', '', 'menu', '', '', '10', SYSDATE, SYSDATE, '', '1');
 INSERT INTO sys_resource (sysres_id, parent_sysres_id, parent_sysres_ids, resource_name, resource_code, TYPE, url, icon, sort, create_time, update_time, mark, state) VALUES ('5446718981103351865', '4903521313523772771', '', '角色管理', '', 'menu', '', '', '20', SYSDATE, SYSDATE, '', '1');
 INSERT INTO sys_resource (sysres_id, parent_sysres_id, parent_sysres_ids, resource_name, resource_code, TYPE, url, icon, sort, create_time, update_time, mark, state) VALUES ('5105724569742861959', '4903521313523772771', '', '资源管理', '', 'menu', '', '', '30', SYSDATE, SYSDATE, '', '1');

 -- 创建组织
 INSERT INTO sys_org (syso_id, parent_syso_id, org_name, org_code, create_time, update_time, mark, state) VALUES ('8931573351052748317', '0', '宗申车辆', '', SYSDATE, SYSDATE, '', '1');
 INSERT INTO sys_org (syso_id, parent_syso_id, org_name, org_code, create_time, update_time, mark, state) VALUES ('5261893124595298522', '8931573351052748317', '宗申摩三', '', SYSDATE, SYSDATE, '', '1');
 INSERT INTO sys_org (syso_id, parent_syso_id, org_name, org_code, create_time, update_time, mark, state) VALUES ('5356141540437980235', '8931573351052748317', '宗申电三', '', SYSDATE, SYSDATE, '', '1');
 -- 创建用户
 INSERT INTO sys_user (sysu_id, username, password, salt) VALUES ('8080628615508626886', 'admin', '81e3fe846a11df3afa1c5013332197c3', '5c4717053f72908b8aa396559b46e931');