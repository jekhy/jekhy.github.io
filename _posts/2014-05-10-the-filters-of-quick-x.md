---
layout: post
title: 使用quick-x中的filters滤镜效果
category: 游戏开发
tags: quick-x cocos2d-x
published: false
---

滤镜（filter）是photoshop中用于制作一些图像效果的工具，在css和flash开发中，类似的特殊图像效果也以filter命名，在游戏开发中常用的有模糊（blur）、褪色（saturation）等效果，最近几天一直在研究quick-x中的特殊效果实现方式，写一篇日志记录一下。

--------

按照美工同学Lyson给的设计稿，游戏暂停时的背景需要有模糊效果，在关卡失败的结果界面还需要有褪色（降低色彩饱和度）效果。因为之前一直做后端开发，前端的一些技术名词以及开发技巧接触的很少，而且quick-x的文档不是很全面，只能一边看源码一边摸索着使用，为了实现这两个效果，近期着实花了不少时间。

先贴一下目前已做好的实际效果图：

* 单纯的模糊效果<br />
<img alt="渲染混合模式效果图" src="{{site.url}}/assets/img/the-filters-of-quick-x_blur.png" class="img-thumbnail" />
* 模糊 + 褪色效果<br />
<img alt="渲染混合模式效果图" src="{{site.url}}/assets/img/the-filters-of-quick-x_saturation.png" class="img-thumbnail" />


---------

##分步记录下整个制作过程
###首先，理清实现思路
一开始不懂如何实现，所以先是问同事以及搜索引擎，了解到了两个关键词：`filter`和`shader`。
查了下quick-x目前的文档，很遗憾，没有相关的内容。
查了下cocos2d-x的文档，有shader，没发现filter，继续搜关键词、读文档、QQ群提问，对shader大概有了些基本了解，是一个针对图像渲染的着色器，可以通过定制openGL的program来实现各种特殊效果，模糊和褪色都可以实现，于是乎，跑了一下cocos2d-x 3.0的cpptest项目，终于看到了Shader的模糊效果，要的就是这个，Good！
但是要在quick-x上实现比较复杂，貌似还没有转换shader的相关c++类，需要自己用tolua去转c++代码。
此时，发现了最新版本的quick-x中的filter接口，是牛人__@zrong__写的，<a href="http://zengrong.net/" target="_blank">__他的博客在这里__</a>，写了很多quick-x相关的文章，对学习quick-x有很大帮助，期间还咨询了他使用filter时player报错的问题，感谢他一针见血的回答对我巨大的帮助！
然后再次遇到问题，filter只能对某个sprite类添加滤镜效果，如何模糊整个背景呢？
搜了下，好多人说是截屏实现的，也就是用截屏的图像创建一个sprite，然后给它加滤镜。
继续研究quick-x的截屏功能，又发现了__@zrong__大侠写的一个display.printscreen功能，甚至连滤镜接口都留好了！OK，就是它了！思路已畅通！
###然后，用lua实现功能效果
{% highlight lua %}

    -- 要截屏的CCNode对象，我这里就是当前的游戏场景对象
    local scene = self
    -- 滤镜效果和滤镜参数们（高斯模糊水平，高斯模糊垂直，色彩饱和度）
    local maskArgs = {
        filters = {"GAUSSIAN_VBLUR", "GAUSSIAN_HBLUR", "SATURATION"},
        filterParams = { {3}, {3}, {0.25} }
    }
    -- 执行截屏并返回截屏创建的对象（由于加了滤镜，这里返回的是CCFilteredSprite）
    local mask = display.printscreen(scene, maskArgs)
        :pos(display.cx, display.cy)
        :addTo(self)

{% endhighlight %}
###最后，贴几点注意事项

1. 因为使用的是quick-x的develop版本的原因（还未发布2.2.3版本），需要编译quick-x的player，才能在player上看到滤镜效果，否则会报错的
2. 截屏Node中如果包含了 CCClippingRegionNode 对象，截屏内容有可能不完整，我是通过调用 setClippingEnabled(false) 方法临时解决的，以后有空查下c++代码的问题，可能是 CCClippingRegionNode::visit()方法的bug造成的

