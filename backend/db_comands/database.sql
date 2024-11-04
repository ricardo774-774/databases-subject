create database if not exists restApi;

use restApi;

create table if not exists employee (
	id int auto_increment not null primary key,
    name varchar(255) default null,
    salary int default null
);

select * from employee;