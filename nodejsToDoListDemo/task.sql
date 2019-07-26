/*
Navicat MySQL Data Transfer

Source Server         : remote_win_server
Source Server Version : 50720
Source Host           : 120.78.82.249:3306
Source Database       : nodejs

Target Server Type    : MYSQL
Target Server Version : 50720
File Encoding         : 65001

Date: 2019-07-26 11:57:35
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for task
-- ----------------------------
DROP TABLE IF EXISTS `task`;
CREATE TABLE `task` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(3000) NOT NULL COMMENT '任务内容',
  `status` int(1) DEFAULT '0' COMMENT '状态：0待完成；1已完成',
  `createTime` datetime DEFAULT NULL COMMENT '创建时间',
  `updateTime` datetime DEFAULT NULL COMMENT '修改时间',
  `finishTime` datetime DEFAULT NULL COMMENT '完成时间',
  `userId` int(11) DEFAULT NULL COMMENT '用户id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;
