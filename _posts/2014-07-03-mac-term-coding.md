---
layout: post
title: 解决mac终端下的命令不换行和中文乱码等问题
category: 生活体验
tags: mac term
published: false
---

之前设置过mac终端的命令提示符颜色，还胡乱修改过一些配置，一开始也没觉得什么，可是后来发现命令行在输入很长的命令时，比如一个很长的路径，超出一行的部分竟然折回来覆盖了本行的开头部分。另外在vim下，输入中文都是一些乱七八糟的字符，本来以为是字符编码的问题，但是vim的encoding、fileencoding、termencoding都设置成utf-8了，还是不行。这两个问题在网上大概搜了下，都是相对简单的其他类似问题，跟我遇到的情况还不太一样，因为也不太影响正常使用，所以一直拖着没去解决，可是今天我实在是觉得受不了了，定位了下问题原因，针对原因再去搜索解决方案，那就容易多了，下面简单说下问题解决方案。

------------

## 问题现象
* 终端命令行输入长于一行的字符时，没有换到下一行，而是从本行的开头进行覆盖，症状如下：

<img alt="命令提示符输入长字符串不换行" src="{{site.url}}/assets/img/20140703.1.png" class="img-thumbnail" />

* 在终端命令行下输入中文没问题，但在vim中输入中文会变成乱码，无论是本地vim还是ssh到远程服务器的vim都会乱码，但是用Command+C/Command+V复制粘贴的中文并不是乱码，症状如下：

<img alt="终端vim下输入中文变乱码" src="{{site.url}}/assets/img/20140703.2.png" class="img-thumbnail" />

<img alt="终端命令行下输入中文正常" src="{{site.url}}/assets/img/20140703.3.png" class="img-thumbnail" />

## 解决方法
我是先解决的终端下vim中文乱码问题，打开终端的配置界面，在“设置”选项卡中有一堆打钩的选项，当我去掉“对使用Control-V来输入的非ASCII内容进行转移”的勾时，发现输入的中文就变正常了，此问题解决：

<img alt="终端配置选项" src="{{site.url}}/assets/img/20140703.4.png" class="img-thumbnail" />

然后定位了下长字符串不换行的问题，先打开之前配置过命令行颜色的 ~/.bash_profile 文件，找到设置PS1的那行，注释掉先，再打开新的终端，发现没有颜色的命令提示符后边输入长字符串是正常换行的，那么问题肯定就是PS1的问题了，网上搜了下，说是需要将加颜色的非显示字符用"\\\["和"\\\]"括住即可，于是，我把原本的PS1改了下，保存后再打开新的终端就好了：
{% highlight bash %}
# PS1='[\e[32m\u\e[0m@\e[34m\W\e[0m]\$ ' # 不换行问题
# PS1='\[[\e[32m\u\e[0m@\e[34m\W\e[0m]\$\] ' # 上下切换历史记录时会清空
PS1='[\[\e[32m\]\u\[\e[0m\]@\[\e[34m\]\W\[\e[0m\]]$ '
{% endhighlight %}

注意最后那个空格，一开始我把空格也包在了\\\[和\\\]之间，但是发现有问题，命令提示符后先输入空格再退格，会将整个命令提示符都删掉，后来把空格挪到外边就好了，再后来又发现上下切换命令历史记录时也有清空命令提示符的现象，深入测试了下，发现是因为\\\[和\\\]之间只能包含*非显示字符*，把要显示出来的字符从里边提了出来，目前使用一切正常啦！