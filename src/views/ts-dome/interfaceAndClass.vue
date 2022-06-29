<template>
  <div style="text-align: left;">
    <p style="text-align: center">interface 和 class 的关系</p>
    <p>上文中我们说过，interface是TS设计出来用于定义对象类型的，可以对对象的形状进行描述。</p>
    <p>interface同样可以用来约束class，要实现约束，需要用到implements关键字</p>
    <h1>implements</h1>
    <p>implements是实现的意思，class实现interface。比如手机有播放音乐的功能，可以这么写：</p>
    <pre>
      <code class="hljs">
        interface MusicInterface{
          playMusic():void
        }
        class Cellphone implements MusicInterface{
          playMusic(){}
        }
      </code>
    </pre>
    <p>定义了约束后，class必须要满足接口上的所有条件。如果Cellphone类上不写playMusic方法，会报错。</p>
    <h1>处理公共的属性和方法</h1>
    <p>不同的类有一些共同的属性和方法，使用继承很难完成</p>
    <p>比如汽车（Car类）也有播放音乐的功能，你可以这么做：</p>
    <ul>
      <li>用Car类继承Cellphone类</li>
      <li>找一个Car类和Cellphone类的父类，父类有播放音乐的方法，他们俩继承这个父类</li>
    </ul>
    <p>很显然这两种方法都不合常理。实际上，使用implements，问题就会迎刃而解。</p>
    <pre>
      <code>
        interface MusicInterface{
          playMusic():void
        }
        class Car implements MusicInterface{
          playMusic(){}
        }
        class Cellphone implements MusicInterface{
          playMusic(){}
        }
      </code>
    </pre>
    <p>这样Car类和Cellphone类都约束了播放音乐的功能。</p>
    <p>再比如，手机还有打电话的功能，就可以这么做，Cellphone类implements两个interface。</p>
    <pre>
      <code>
        interface MusicInterface{
          playMusic():void
        }
        interface CallInterface{
          makePhoneCall():void
        }
        class Cellphone implements MusicInterface, CallInterface{
          playMusic(){}
          makePhoneCall(){}
        }
      </code>
    </pre>
    <p>这个Callinterface也可以用于ipad类、手表类上面，毕竟他们也能打电话。</p>
    <p>interface来约束class，只要class实现了interface规定的属性和方法，就行了。没有继承那么多条条框框，非常灵活。</p>
    <h1>约束构造函数和静态属性</h1>
    <p>使用implements只能约束类实例上的属性和方法，要约束构造函数和静态属性，需要这么写。</p>
    <p>未定义静态属性pi，会报错：Property 'pi' is missing in type 'typeof Circle' but required in type 'CircleStatic'.</p>
    <p>constructor入参类型不对，会报错：Type 'string' is not assignable to type 'number'.</p>
    <pre>
      <code>
        interface CircleStatic{
          new (radius: number):void
          pi: number
        }
        const Circle:CircleStatic = class Circle{
          static pi: 3.14
          public radius: number
          public constructor(radius:number){
            this.radius = radius
          }
        }
      </code>
    </pre>
  </div>
</template>
<script lang="ts" setup>
import Vue from 'vue'
// 上文中我们说过，interface是TS设计出来用于定义对象类型的，可以对对象的形状进行描述
// interface同样可以用来约束class，要实现约束，需要用到implements关键字
/**
 * implements
 */
// implements是实现的意思，class实现interface、
// 比如手机有播放音乐的功能，可以这么写：
interface MusicInterface{
  playMusic():void
}
class Cellphone implements MusicInterface{
  playMusic(){}
}
// 定义了约束后，class必须要满足接口上的所有条件。
// 如果Cellphone类上不写playMusic方法，会报错。
/**
 * 处理公共的属性和方法
 */
// 不同的类有一些共同的属性和方法，使用继承很难完成
// 比如骑车(Car类)也有播放音乐的功能，你可以这么做：
// 1、用Car类继承Cellphone类
// 2、找一个Car类和Cellphone类的父类，父类也有播放音乐的方法，他们两继承这个父类
// 很显然这两种方法都不合常理。实际上，使用implements，问题就会迎刃而解。
interface MusicInterface1 {
  playMusic():void
}
class Car implements MusicInterface1{
  playMusic(){}
}
class Cellphone1 implements MusicInterface1{
  playMusic(){}
}
// 这样Car类和Cellphone类都约束了播放音乐的功能。
// 再比如，手机还有打电话的功能，就可以这么做,Cellphone类implements两个interface。
interface MusicInterface2{
  playMusic():void
}
interface CallInterface{
  makePhoneCall():void
}
class Cellphone2 implements MusicInterface2, CallInterface{
  playMusic(){}
  makePhoneCall(){}
}
// 这个Callinterface也可以用于ipad类、手表类上面，毕竟他们也能打电话。
// interface来约束class，只要class实现了interface规定的属性和方法，就行了。没有继承那么多条条框框，非常灵活。
/**
 * 约束构造函数和静态属性
 */
// 使用implements只能约束类实例上的属性和方法，要约束构造函数和静态属性，需要这么写。
// 未定义静态属性pi，会报错:Property 'pi' is missing in type 'typeof Circle' but required in type 'CircleStatic'.
// constructor入参类型不对，会报错:Type 'string' is not assignable to type 'number'.
interface CircleStatic {
  new (radius: number): void
  pi: number
}
const Circle:CircleStatic = class Circle{
  static pi: 3.14
  public radius: number
  public constructor(radius: number) {
      this.radius = radius
  }
}
</script>