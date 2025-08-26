https://nodejs.org/en/download
node -v  
npm install -g @angular/cli@17

<!-- database schema  -->
show tables
    -> ;
+--------------------------+
| Tables_in_blogs_database |
+--------------------------+
| attributes               |
| comments                 |
| permissions              |
| policies                 |
| policy_conditions        |
| posts                    |
| profiles                 |
| resource_attributes      |
| role_permissions         |
| role_policies            |
| roles                    |
| sequelizemeta            |
| user_attributes          |
| user_roles               |
| users                    |
+--------------------------+
15 rows in set (0.04 sec)

mysql> desc users;
+---------------+--------------+------+-----+-------------------+-------------------+
| Field         | Type         | Null | Key | Default           | Extra             |
+---------------+--------------+------+-----+-------------------+-------------------+
| id            | int          | NO   | PRI | NULL              | auto_increment    |
| username      | varchar(50)  | NO   |     | NULL              |                   |
| email         | varchar(255) | NO   | UNI | NULL              |                   |
| password      | varchar(255) | NO   |     | NULL              |                   |
| refresh_token | text         | YES  |     | NULL              |                   |
| created_at    | datetime     | NO   |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
| updated_at    | datetime     | NO   |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
+---------------+--------------+------+-----+-------------------+-------------------+
7 rows in set (0.01 sec)

mysql> desc roles;
+-------------+-------------+------+-----+-------------------+-------------------+
| Field       | Type        | Null | Key | Default           | Extra             |
+-------------+-------------+------+-----+-------------------+-------------------+
| id          | int         | NO   | PRI | NULL              | auto_increment    |
| name        | varchar(50) | NO   | UNI | NULL              |                   |
| description | text        | YES  |     | NULL              |                   |
| created_at  | datetime    | NO   |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
| updated_at  | datetime    | NO   |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
+-------------+-------------+------+-----+-------------------+-------------------+
5 rows in set (0.00 sec)

mysql> desc user_roles;
+-------------+------------+------+-----+-------------------+-------------------+
| Field       | Type       | Null | Key | Default           | Extra             |
+-------------+------------+------+-----+-------------------+-------------------+
| id          | int        | NO   | PRI | NULL              | auto_increment    |
| user_id     | int        | NO   | MUL | NULL              |                   |
| role_id     | int        | NO   | MUL | NULL              |                   |
| assigned_by | int        | YES  | MUL | NULL              |                   |
| assigned_at | datetime   | NO   |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
| expires_at  | datetime   | YES  |     | NULL              |                   |
| is_active   | tinyint(1) | NO   |     | 1                 |                   |
| created_at  | datetime   | NO   |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
| updated_at  | datetime   | NO   |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
+-------------+------------+------+-----+-------------------+-------------------+
9 rows in set (0.00 sec)

mysql> desc permissions;
+-------------+--------------+------+-----+-------------------+-------------------+
| Field       | Type         | Null | Key | Default           | Extra             |
+-------------+--------------+------+-----+-------------------+-------------------+
| id          | int          | NO   | PRI | NULL              | auto_increment    |
| resource    | varchar(100) | NO   | MUL | NULL              |                   |
| action      | varchar(100) | NO   |     | NULL              |                   |
| possession  | varchar(20)  | NO   |     | NULL              |                   |
| name        | varchar(100) | YES  | UNI | NULL              |                   |
| description | text         | YES  |     | NULL              |                   |
| created_at  | datetime     | NO   |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
| updated_at  | datetime     | NO   |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
+-------------+--------------+------+-----+-------------------+-------------------+
8 rows in set (0.00 sec)

mysql> desc role_permissions;
+---------------+----------+------+-----+-------------------+-------------------+
| Field         | Type     | Null | Key | Default           | Extra             |
+---------------+----------+------+-----+-------------------+-------------------+
| id            | int      | NO   | PRI | NULL              | auto_increment    |
| role_id       | int      | NO   | MUL | NULL              |                   |
| permission_id | int      | NO   | MUL | NULL              |                   |
| created_at    | datetime | NO   |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
| updated_at    | datetime | NO   |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
+---------------+----------+------+-----+-------------------+-------------------+
5 rows in set (0.00 sec)

mysql> desc profiles;
+---------------+--------------+------+-----+-------------------+-------------------+
| Field         | Type         | Null | Key | Default           | Extra             |
+---------------+--------------+------+-----+-------------------+-------------------+
| id            | int          | NO   | PRI | NULL              | auto_increment    |
| user_id       | int          | NO   | MUL | NULL              |                   |
| first_name    | varchar(50)  | YES  |     | NULL              |                   |
| last_name     | varchar(50)  | YES  |     | NULL              |                   |
| bio           | text         | YES  |     | NULL              |                   |
| avatar        | varchar(255) | YES  |     | NULL              |                   |
| date_of_birth | datetime     | YES  |     | NULL              |                   |
| location      | varchar(100) | YES  |     | NULL              |                   |
| created_at    | datetime     | NO   |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
| updated_at    | datetime     | NO   |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
+---------------+--------------+------+-----+-------------------+-------------------+
10 rows in set (0.00 sec)

mysql> desc comments;
+------------+----------+------+-----+-------------------+-------------------+
| Field      | Type     | Null | Key | Default           | Extra             |
+------------+----------+------+-----+-------------------+-------------------+
| id         | int      | NO   | PRI | NULL              | auto_increment    |
| content    | text     | NO   |     | NULL              |                   |
| user_id    | int      | NO   | MUL | NULL              |                   |
| post_id    | int      | NO   | MUL | NULL              |                   |
| created_at | datetime | NO   |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
| updated_at | datetime | NO   |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
+------------+----------+------+-----+-------------------+-------------------+
6 rows in set (0.00 sec)

mysql> desc attributes;
+-------------+------------------------------------------+------+-----+-------------------+-------------------+
| Field       | Type                                     | Null | Key | Default           | Extra             |
+-------------+------------------------------------------+------+-----+-------------------+-------------------+
| id          | int                                      | NO   | PRI | NULL              | auto_increment    |
| name        | varchar(100)                             | NO   | UNI | NULL              |                   |
| type        | enum('string','number','boolean','date') | NO   |     | string            |                   |
| description | text                                     | YES  |     | NULL              |                   |
| created_at  | datetime                                 | NO   |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
| updated_at  | datetime                                 | NO   |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
+-------------+------------------------------------------+------+-----+-------------------+-------------------+
6 rows in set (0.00 sec)

mysql> desc user_attributes;
+--------------+----------+------+-----+-------------------+-------------------+
| Field        | Type     | Null | Key | Default           | Extra             |
+--------------+----------+------+-----+-------------------+-------------------+
| id           | int      | NO   | PRI | NULL              | auto_increment    |
| user_id      | int      | NO   | MUL | NULL              |                   |
| attribute_id | int      | NO   | MUL | NULL              |                   |
| value        | text     | NO   |     | NULL              |                   |
| created_at   | datetime | NO   |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
| updated_at   | datetime | NO   |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
+--------------+----------+------+-----+-------------------+-------------------+
6 rows in set (0.00 sec)

mysql> desc resource_attributes;
+---------------+-------------+------+-----+-------------------+-------------------+
| Field         | Type        | Null | Key | Default           | Extra             |
+---------------+-------------+------+-----+-------------------+-------------------+
| id            | int         | NO   | PRI | NULL              | auto_increment    |
| resource_type | varchar(50) | NO   | MUL | NULL              |                   |
| resource_id   | int         | NO   |     | NULL              |                   |
| attribute_id  | int         | NO   | MUL | NULL              |                   |
| value         | text        | NO   |     | NULL              |                   |
| created_at    | datetime    | NO   |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
| updated_at    | datetime    | NO   |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
+---------------+-------------+------+-----+-------------------+-------------------+
7 rows in set (0.01 sec)

mysql> desc policies;
+-------------+----------------------+------+-----+-------------------+-------------------+
| Field       | Type                 | Null | Key | Default           | Extra             |
+-------------+----------------------+------+-----+-------------------+-------------------+
| id          | int                  | NO   | PRI | NULL              | auto_increment    |
| name        | varchar(100)         | NO   | UNI | NULL              |                   |
| description | text                 | YES  |     | NULL              |                   |
| effect      | enum('allow','deny') | NO   |     | allow             |                   |
| priority    | int                  | NO   | MUL | 1                 |                   |
| resource    | varchar(100)         | NO   | MUL | NULL              |                   |
| action      | varchar(100)         | NO   |     | NULL              |                   |
| possession  | varchar(100)         | NO   |     | any               |                   |
| is_active   | tinyint(1)           | NO   | MUL | 1                 |                   |
| created_at  | datetime             | NO   |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
| updated_at  | datetime             | NO   |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
+-------------+----------------------+------+-----+-------------------+-------------------+
11 rows in set (0.00 sec)

mysql> desc police_conditions;
ERROR 1146 (42S02): Table 'blogs_database.police_conditions' doesn't exist
mysql> desc policy_conditions;
+--------------+------------------------------------------------------------------------------------------------+------+-----+-------------------+-------------------+
| Field        | Type                                                                                           | Null | Key | Default           | Extra             |
+--------------+------------------------------------------------------------------------------------------------+------+-----+-------------------+-------------------+
| id           | int                                                                                            | NO   | PRI | NULL              | auto_increment    |
| policy_id    | int                                                                                            | NO   | MUL | NULL              |                   |
| attribute_id | int                                                                                            | NO   | MUL | NULL              |                   |
| operator     | enum('equals','not_equals','greater_than','less_than','contains','not_contains','in','not_in') | NO   |     | equals            |                   |
| value        | text                                                                                           | NO   |     | NULL              |                   |
| created_at   | datetime                                                                                       | NO   |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
| updated_at   | datetime                                                                                       | NO   |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
+--------------+------------------------------------------------------------------------------------------------+------+-----+-------------------+-------------------+
7 rows in set (0.00 sec)
