---
layout: post
title: 配置Mysql流程备忘
category: 游戏开发
tags: mysql
published: false
---

本文作为备忘帖，仅供已安装好Mysql的情况下做配置参考，以后有空再写成shell。

------------

该附件为配置模板：[template.cnf]({{site.url}}/assets/download/template.cnf)

配置好，并设置正确的权限。

###安装DB：

mysql_install_db --defaults-file=template.cnf

###运行Mysql：

mysqld_safe --defaults-file=template.cnf

如果启动失败，检查日志，解决问题，直到启动成功。

###导入时区配置：

mysql_tzinfo_to_sql /usr/share/zoneinfo 2>/dev/null | mysql --socket=/data/sgm/mysql/mysql.sock -uroot mysql >/dev/null 2>&1

###创建库并设置权限：

登录mysql命令行：

mysql --socket=/data/project/mysql/mysql.sock -uroot

删除默认用户、库，创建数据库：

DELETE FROM mysql.user WHERE user != 'root' OR host != 'localhost';
DELETE FROM mysql.db;
DROP DATABASE test;
CREATE DATABASE \`YourDB\` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

给项目用户增加权限：

GRANT ALL ON \`YourDB\`.* TO \`YourUser\`@\`localhost\` IDENTIFIED BY 'YourPass';

###配置完毕，修改root默认密码：

mysqladmin --socket=/data/project/mysql/mysql.sock -u root password