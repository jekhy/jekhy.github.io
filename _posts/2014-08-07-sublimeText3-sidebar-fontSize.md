---
layout: post
title: 修改Sublime Text 3的侧边栏字体大小
category: 游戏开发
tags: sublime
published: false
---

自从换了iMac，屏幕是大了，但分辨率也高了，各种软件的文字尺寸都感觉太小，我习惯使用sublime text 3写代码，主窗体中的代码文字很好改大小，按⌘(command)和+-符号即可修改文字大小，但其实侧边栏中的文件列表反而用的更多，找了半天却没找到修改方法，google了半天，大部分都是sublime text2的修改方法，可是以前ST2的修改方式在ST3里已经不能用啦，费了好大力气才摸索出来ST3的侧边栏修改方法，赶紧写个日志记录一下！

------------

###首先需要确保安装了Package Control
Package Control作为ST必备插件，这里就不多介绍了，没装的话，google一下，各种介绍以及安装教程贴，当然，使用其官网的安装命令是最靠谱的了：[https://sublime.wbond.net/installation](https://sublime.wbond.net/installation)

{% highlight python %}
import urllib.request,os,hashlib; h = '7183a2d3e96f11eeadd761d777e62404' + 'e330c659d4bb41d3bdf022e94cab3cd0'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); by = urllib.request.urlopen( 'http://sublime.wbond.net/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); print('Error validating download (got %s instead of %s), please try manual install' % (dh, h)) if dh != h else open(os.path.join( ipp, pf), 'wb' ).write(by)`
{% endhighlight %}

###然后安装PackageResourceViewer
* 快捷键 `⌘(command)+⇧(shift)+P` 打开 Command Palette
* 输入 `Package Control:Install` 回车，等待加载package列表
* 搜索并安装 `PackageResourceViewer` 包

###最后，使用PackageResourceViewer打开Theme文件进行编辑
* 快捷键 `⌘(command)+⇧(shift)+P` 打开 Command Palette
* 输入 `PackageResourceViewer: Open Resource` 回车，打开包列表
* 选择 `Theme - Default`，再选择 `Default.sublimt-theme`
* 搜索 `sidebar_label`，在 `"class": "sidebar_label"` 后边加一行：`"font.size": 18`，将字体大小设置为18，保存。


###好啦，大功告成！
如果觉得行间距太小，可以往上找下，有个class:"sidebar_tree"，调一下里边的`row_padding`配置即可。以下为截图：

<img alt="sublime修改侧边栏字体大小截图" src="{{site.url}}/assets/img/sublime-sidebar-fontsize.png" class="img-thumbnail" />