<template>
  <div style="text-align: left;">
    <p style="text-align: center">枚举</p>
    <p>在任何项目开发中，我们都会遇到定义常量的清空，常量就是指不会被改变的值。</p>
    <p>TS中我们使用const来声明常量，但是有些取值是在一定范围内的一系列常量，比如一周有七天，比如方向分为上下左右四个方向。</p>
    <p>这时就可以使用枚举（Enum）来定义。</p>
    <h1>基本使用</h1>
    <pre>
      <code>
        enum Direction{
          Up,
          Down,
          Left,
          Right
        }
      </code>
    </pre>
    <p>这样就定义了一个数字枚举，他有两个特点：</p>
    <ul>
      <li>数字递增</li>
      <li>反向映射</li>
    </ul>
    <p>枚举成员会被赋值从0开始递增的数字</p>
    <pre>
      <code>
        console.log(Direction.Up); // 0
        console.log(Direction.Down); // 1
        console.log(Direction.left); // 2
        console.log(Direction.Right); // 3
      </code>
    </pre>
    <p>枚举会对枚举值到枚举名进行反向映射</p>
    <pre>
      <code>
        console.log(Direction[0]); // Up
        console.log(Direction[1]); // Down
        console.log(Direction[2]); // Left
        console.log(Direction[3]); // Right
      </code>
    </pre>
    <p>如果枚举第一个元素赋有初始值，就会从初始值开始递增</p>
    <pre>
      <code>
        enum Direction {
          Up = 6,
          Down,
          Left,
          Right
        }
        console.log(Direction.Up) // 6
        console.log(Direction.Down) // 7
        console.log(Direction.Left) // 8
        console.log(Direction.Right) // 9
      </code>
    </pre>
    <h1>反向映射的原理</h1>
    <p>枚举是如何做到反向映射的呢，我们不妨来看一下被编译后的代码。</p>
    <pre>
      <code>
        var Direction;
        (function(Direction){
          Direction[Direction["Up"] = 6] = "Up";
          Direction[Direction["Down"] = 7] = "Down";
          Direction[Direction["Left"] = 8] = "Left";
          Direction[Direction["Right"] = 8] = "Right"
        })(Direction || (Direction = {}));
      </code>
    </pre>
    <p>主体代码是被包裹在一个自执行函数里，封装了自己独特的作用域。</p>
    <pre><code>Direction["Up"] = 6</code></pre>
    <p>会将Direction这个对象的Up属性赋值为6，JS的赋值运算符返回的值是被赋予的值。</p>
    <pre>Direction["Up"] = 6 返回6</pre>
    <pre>
      <code>
        执行Direction[Direction["Up"] = 6] = "Up";
        相当于执行
        Direction["Up"] = 6
        Direction[6] = "Up"
      </code>
    </pre>
    <p>这样就实现了枚举的反向映射</p>
    <h1>手动赋值</h1>
    <p>定义一个枚举来管理外卖状态，分别有已下单，配送中，已接收三个状态。</p>
    <pre>
      <code>
        enum ItemStatus {
          Buy = 1,
          Send,
          Reecive
        }
        console.log(ItemStatus["Buy"]) // 1
        console.log(ItemStatus["Send"]) // 2
        console.log(ItemStatus["Receive"]) // 3
      </code>
    </pre>
    <p>但有时候后端给你返回的数据状态是乱的，就需要我们手动赋值。</p>
    <p>比如后端说Buy是100，Send是20，Receive是1，就可以这么写</p>
    <pre>
      <code>
        enum ItemStatus {
          Buy = 100,
          Send = 20,
          Receive = 1
        }
        console.log(ItemStatus["Buy"]) // 100
        console.log(ItemStatus["Send"]) // 20
        console.log(ItemStatus["Receive"]) // 1
      </code>
    </pre>
    <h1>计算成员</h1>
    <p>枚举中的成员是可以被计算，比如经典的使用位运算合并权限，可以这么写</p>
    <pre>
      <code>
        enum FileAccess {
          Read = 1 &lt;&lt; 1,
          Write = 1 &lt;&lt; 2,
          ReadWrite = Read | Write
        }
        console.log(FileAccess.Read) // 2 -> 010
        console.log(FileAccess.Write) // 4 -> 100
        console.log(FileAccess.ReadWrite) // 6 -> 110
      </code>
    </pre>
    <p>看个实例吧，Vue3源码中的PatchFlags，用于标识节点更新的属性。</p>
    <pre>
      <code>
        // packages/shared/src/patchFlags.ts
        export const enum PatchFlags {
            TEXT = 1, // 动态文本节点
            CLASS = 1 &lt;&lt; 1, // 动态class
            STYLE = 1 &lt;&lt; 2, // 动态style
            PROPS = 1 &lt;&lt; 3, // 动态属性
            FULL_PROPS = 1 &lt;&lt; 4, // 具有动态key属性，当key改变时，需要进行完整的diff比较
            HYDRATE_EVENTS = 1 &lt;&lt; 5, // 具有监听事件的节点
            STABLE_FRAGMENT = 1 &lt;&lt; 6, // 子节点顺序不会被改变的fragment
            KEYED_FRAGMENT = 1 &lt;&lt; 7, // 带有key属或部分子节点有key的fragment
            UNKEYED_FRAGMENT = 1 &lt;&lt; 8, // 子节点没有key的fragment
            NEED_PATCH = 1 &lt;&lt; 9, // 非props的比较，比如ref或指令
            DYNAMIC_SLOTS = 1 &lt;&lt; 10, // 动态插槽
            DEV_ROOT_FRAGMENT = 1 &lt;&lt; 11, // 仅供开发时使用，表示将注释放在模板根级别的片段
            HOISTED = -1, // 静态节点
            BAIL = -2 // idff算法要退出优化模式 
        }
      </code>
    </pre>
    <h1>字符串枚举</h1>
    <p>字符串枚举的意义在于，提供有具体语义的字符串，可以更容易地理解代码和调试。</p>
    <pre>
      <code>
        enum Direction{
          Up = "UP",
          Down = "DOWN",
          Left = "LEFT",
          Right = "RIGHT"
        }
        const value = "UP";
        if(value == Direction.Up){
          // do something
        }
      </code>
    </pre>
    <h1>常量枚举</h1>
    <p>上文的例子，使用const来定义一个常量枚举</p>
    <pre>
      <code>
        const enum Direction{
          Up = "UP",
          Down = "DOWN",
          Left = "LEFT",
          Right = "RIGHT"
        }
        const value = "UP"
        if(value === Direction.Up){
          // do something
        }
      </code>
    </pre>
    <p>编译出来的JS代码会简洁很多，提高了性能。</p>
    <pre>
      <code>
        const value = 'UP';
        if(value === "UP"){
          // do something
        }
      </code>
    </pre>
    <p>不写const编译出来是这样的</p>
    <pre>
      <code>
        var Direction;
        (function(Direction){
          Direction["Up"] = "UP";
          Direction["Down"] = "DOWN";
          Direction["Left"] = "LEFT";
          Direction["Right"] = "RIGHT";
        })(Direction || (Direction = {}))
        const value = "UP";
        if(value === Direction.Up){
          // do something
        }
      </code>
    </pre>
    <p>这一堆定义枚举的逻辑会在编译阶段会被删除，常量枚举成员在使用的地方被内联进去。</p>
    <p>很显然，常量枚举不允许包含计算成员，不然怎么叫常量呢？</p>
    <p>这么写直接报错：const enum member initializers can only contain literal values and other computed enum values.</p>
    <p>总结一下，常量枚举可以避免在额外生成的代码上的开销和额外的非直接的对枚举成员的访问。</p>
    <pre>
      <code>
        cosnt enum Test{
          A = "AhWei".length
        }
      </code>
    </pre>
    <h1>小结</h1>
    <p>枚举的意义在于，可以定义一些带名字的常量集合，清晰地表达亿图和语义，更容易地理解代码和调试。</p>
    <p>常用于和后端联调时，区分后端返回的一些代表状态语义的数字或字符串，降低阅读代码时的心智负担。</p>
  </div>
</template>
<script lang="ts" setup>
import Vue from 'vue'
// 在任何项目开发中，我们都会遇到定义常量的清空，常量就是指不会被改变的值。
// TS中我们使用const来声明常量，但是有些取值是在一定范围内的一系列常量，比如一周有七天，比如方向分为上下左右四个方向。
// 这时就可以使用枚举（Enum）来定义。
/**
 * 基本使用
 **/
enum Direction{
  Up,
  Down,
  Left,
  Right
}
// 这样就定义了一个数字枚举，他有两个特点：
// 1、数字递增
// 2、反向映射
// 枚举成员会被赋值从0开始递增的数字
console.log(Direction.Up) // 0
console.log(Direction.Down) // 1
console.log(Direction.Left) // 2
console.log(Direction.Right) // 3
// 枚举会对枚举值到枚举名进行反向映射
console.log(Direction[0]) // Up
console.log(Direction[1]) // Down
console.log(Direction[2]) // Left
console.log(Direction[3]) // Right
// 如果枚举第一个元素赋有初始值，就会从初始值开始递增
enum Direction1{
  Up = 6,
  Down,
  Left,
  Right
}
console.log("赋有初始值：", Direction1.Up) // 6
console.log("赋有初始值：", Direction1.Down) // 7
console.log("赋有初始值：", Direction1.Left) // 8
console.log("赋有初始值：", Direction1.Right) // 9
/**
 * 反向映射的原理
 */
// 枚举是如何做到反向映射的呢，我们不妨来看一下被编译后的代码。
var Direction2;
(function(Direction2){
  Direction2[Direction2['Up'] = 6] = 'Up';
  Direction2[Direction2['Down'] = 7] = 'Down';
  Direction2[Direction2['Left'] = 8] = 'Left';
  Direction2[Direction2['Right'] = 9] = 'Right';
})(Direction2 || (Direction2 = {}));
// 主题代码十倍包裹在一个自执行函数里，封装了自己独特的作用域。
// Direction2['Up'] = 6
// 会将Direction这个对象的Up属性赋值为6，JS的赋值运算符返回的值是被赋予的值。
// Direction['Up'] = 6 返回6
// 执行Direction[Direction['Up'] = 6] = 'Up';
// 相当于执行了
// Direction['Up'] = 6
// Direction[6] = 'Up'
// 这样就实现了枚举的反向映射
/**
 * 手动赋值
 */
// 定义一个枚举来管理外卖状态，分别有已下单，配送中，已接收三个状态。
// 可以这么写
enum ItemStatus {
  Buy = 1,
  Send,
  Receive
}
console.log(ItemStatus["Buy"]) // 1
console.log(ItemStatus["Send"]) // 2
console.log(ItemStatus["Receive"]) // 3
// 但有时候后端给你返回的数据状态是乱的，就需要我们手动赋值。
// 比如后端说Buy是100，Send是20，Receive是1，就可以这么写
enum ItemStatus {
  Buy1 = 100,
  Send1 = 20,
  Receive1 = 1
}
console.log(ItemStatus["Buy1"]) // 100
console.log(ItemStatus["Send1"]) // 20
console.log(ItemStatus["Receive1"]) // 1
/**
 * 计算成员
 */
// 枚举中的成员是可以被计算，比如经典的使用位运算合并权限，可以这么写
enum FileAccess {
  Read = 1 << 1,
  Write = 1 << 2,
  ReadWrite = Read | Write
}
console.log(FileAccess.Read) // 2 -> 010
console.log(FileAccess.Write) // 4 -> 100
console.log(FileAccess.ReadWrite) // 6 -> 110
// 看个实例吧，Vue3源码中的PatchFlags，用于标识节点更新的属性。
// packages/shared/src/patchFlags.ts
const enum PatchFlags {
  TEXT = 1, // 动态文本节点
  CLASS = 1 << 1, // 动态class
  STYLE = 1 << 2, // 动态style
  PROPS = 1 << 3, // 动态属性
  FULL_PROPS = 1 << 4, // 具有动态key属性，当key改变时，需要进行完整的diff比较
  HYDRATE_EVENTS = 1 << 5, // 具有监听事件的节点
  STABLE_FRAGMENT = 1 << 6, // 子节点顺序不会被改变的fragment
  KEYED_FRAGMENT = 1 << 7, // 带有key属或部分子节点有key的fragment
  UNKEYED_FRAGMENT = 1 << 8, // 子节点没有key的fragment
  NEED_PATCH = 1 << 9, // 非props的比较，比如ref或指令
  DYNAMIC_SLOTS = 1 << 10, // 动态插槽
  DEV_ROOT_FRAGMENT = 1 << 11, // 仅供开发时使用，表示将注释放在模板根级别的片段
  HOISTED = -1, // 静态节点
  BAIL = -2 // idff算法要退出优化模式 
}
/**
 * 字符串枚举
 */
// 字符串枚举的意义在于，提供有具体语义的字符串，可以更容易地理解代码和调试。
enum Direction3 {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT"
}
const value = "UP"
if(value === Direction3.Up){
  console.log("字符串匹配成功")
}
/**
 * 常量枚举
 */
// 上文的例子，使用const来定义一个常量枚举
const enum Direction4{
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT"
}
const value1 = 'UP';
if(value1 === Direction4.Up){
  console.log("匹配成功")
}
// 编译出来的JS代码会简洁很多，提高了性能。
const value2 = "UP";
if(value2 === "UP"){
  console.log("编译为JS后，匹配成功")
}
// 不写const编译出来是这样子的。
var Direction5;
(function(Direction5){
  Direction5["Up"] = "UP";
  Direction5["Down"] = "DOWN";
  Direction5["Left"] = "LEFT";
  Direction5["Right"] = "RIGHT";
})(Direction5 || (Direction5 = {}));
const value3 = 'UP';
if(value3 === Direction5.Up){
  console.log("没有写const的编译后的JS，匹配成功")
}
// 这一堆定义枚举的逻辑会在编译阶段会被删除，常量枚举成员在使用的地方被内联进去。
// 很显然，常量枚举不允许包含计算成员，不然怎么叫常量呢？
// 这么写直接报错：const enum member initializers can only contain literal values and other computed enum values.
// 总结一下，常量枚举可以避免在额外生成的代码上的开销和额外的非直接的对枚举成员的访问。
const enum Test{
  A = 'AhWei'.length
}
/**
 * 小结
 */
// 枚举的意义在于，可以定义一些带名字的常量集合，清晰地表达亿图和语义，更容易地理解代码和调试。
// 常用于和后端联调时，区分后端返回的一些代表状态语义的数字或字符串，降低阅读代码时的心智负担。
</script>