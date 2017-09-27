---
layout: post
published: false
title: 树莓派上搭建jekyll日志服务器过程记录
category: 生活体验
tags: 树莓派 rpi vim jekyll
---

一直想培养写日志的习惯，但往往因为各种原因，终究还是放弃了，这次即将放弃的借口是“jekyll只在Mac上装了，公司Windows上没有！”好吧，想能上网就能写日志是吧？为了终结另一个自己那些懒惰的借口，那我就在树莓派上搭建一个jekyll服务，并通过极路由的动态域名解析插件建立了外网访问环境。
* 远程写博客的好处
* jekyll和树莓派简介

--------

## 树莓派的远程访问
### 动态DNS：极路由的插件
### 远程SSH测试
## 安装jekyll
### 安装ruby
[https://www.ruby-lang.org/zh_cn/downloads/](https://www.ruby-lang.org/zh_cn/downloads/)
解决openssl问题：failed to configure openssl
查看编译配置参数：./configure --help
    Some influential environment variables:
      LDFLAGS     linker flags, e.g. -L<lib dir> if you have libraries in a
                  nonstandard directory <lib dir>
      CPPFLAGS    (Objective) C/C++ preprocessor flags, e.g. -I<include dir> if
                  you have headers in a nonstandard directory <include dir>

[http://www.openssl.org/source/]

### 安装jekyll
### 安装vim的markdown插件
[https://github.com/plasticboy/vim-markdown]
ln -s /data/download/vim-markdown/ftdetect ~/.vim/
ln -s /data/download/vim-markdown/syntax/ ~/.vim/

## 写一篇日志

## 发布到 github pages

## 参考资料：
[http://calefy.org/2012/03/01/set-vim-markdown-syntax-highlight.html]
