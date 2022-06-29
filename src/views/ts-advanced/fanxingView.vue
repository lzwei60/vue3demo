<template>
  <div style="text-align: left;">
    <p>泛型，是TS比较难理解的部分，拿下了泛型，对TS的理解就又上了一个台阶，对后续深入学习帮助很大</p>
    <h1>为什么需要泛型</h1>
    <p>如果你看过TS文档，一定看过这样两段话</p>
    <p>软件工程中，我们不仅要创建一致的定义良好的API，同时也要考虑可重用性。组件不仅能够支持当前的数据类型，同时也能支持未来的数据类型，这在创建大型系统时为你提供了十分灵活的功能。</p>
    <p>在像C#和Java这样的语言中，可以使用泛型来穿件可重用的组件，一个组件可以支持多种类型的数据。这样用户就可以以字节的数据类型来使用组件。</p>
    <p>我觉得初学者应该要先明白为什么需要泛型这个东西，它解决了什么问题？而不是看这种拗口的定义。</p>
    <p>我们还是先来看这样一个例子，体会一下泛型解决的问题吧。</p>
    <p>定义一个print函数，这个函数的功能是把传入的参数打印出来，再返回这个参数，传入参数的类型是string，函数返回类型为string。</p>
    <pre>
      <code>
        function print(arg:string):string{
          console.log(arg);
          return arg
        }
      </code>
    </pre>
    <p>现在需求变了，我还需要打印number类型，怎么办？</p>
    <p>可以使用联合类型来改造：</p>
    <pre>
      <code>
        function print(arg: string | number):string | number{
          console.log(arg);
          return arg
        }
      </code>
    </pre>
    <p>现在需求又变了，我还需要打印string数组，number数组，甚至任何类型，怎么办？</p>
    <p>有个笨方法，支持多少类型就写多少联合类型</p>
    <p>或者把参数类型改成any</p>
    <pre>
      <code>
        function print(arg:any):any{
          console.log(arg);
          return arg
        }
      </code>
    </pre>
    <p>且不说写any类型不好，毕竟在TS中尽量不要写any。</p>
    <p>而且这也不是我们想要的结果，只能说传入的值是any类型，输出的值是any类型，传入和返回并不是统一的。</p>
    <p>这么写甚至还会出现bug</p>
    <pre><code>cosnt res:string= print(123)</code></pre>
    <p>定义string类型来接收print函数的返回值，返回的是个number类型，TS并不会报错提示我们。</p>
    <p>这个时候，泛型就出现了，它可以轻松解决输入输出一致的问题。</p>
    <p>注意：泛型不是为了解决这一个问题设计出来的，泛型还解决了很多其它问题，这里是通过这个例子来引出泛型。</p>
    <h1>泛型基本使用</h1>
    <h2>处理函数参数</h2>
    <p>我们使用泛型来解决上文的问题。</p>
    <p>泛型的语法是&lt;&gt;里写类型参数，一般可以用T来表示。</p>
    <pre>
      <code>
        function print&lt;T&gt;(arg: T):T{
          console.log(arg)
          return arg  
        }
      </code>
    </pre>
    <p>这样，我们就坐到了输入和输出的类型统一，且可以输入输出任何类型。</p>
    <p>如果类型不统一，就会报错</p>
    <p>泛型中的T就像一个占位符、或者说一个变量，在使用的时候可以把定义的类型像参数一样传入，它可以原封不动地输出。</p>
    <p>泛型的写法对前端工程师来说是有些古怪，比如&lt;&gt; T，但记住就好，只要看到&lt;&gt;，就知道这是泛型。</p>
    <p>我们在使用的时候可以有两种方式指定类型。</p>
    <ul>
      <li>定义要使用的类型。</li>
      <li>TS类型推断，自动推导出类型</li>
    </ul>
    <pre>
      <code>
        print&lt;string&gt;('hello'); // 定义T为string
        print('hello') // TS类型推断，自动推导类型为string
      </code>
    </pre>
    <p>我们知道，type和interface都可以定义函数类型，也用泛型来写一下，type这么写：</p>
    <pre>
      <code>
        type Print = &lt;T&gt;(arg: T) => T
        const printFn:Print = function print(arg){
          console.log(arg);
          return arg
        }
      </code>
    </pre>
    <p>interface这么写：</p>
    <pre>
      <code>
        interface Iprint&lt;T&gt;{
          (arg: T): T
        }
        function print&lt;T&gt;(arg: T){
          console.log(arg)
          return arg
        }
        const myPrint: Iprint&lt;number&gt; = print
      </code>
    </pre>
    <h2>默认参数</h2>
    <p>如果要给泛型加默认参数，可以这么写：</p>
    <pre>
      <code>
        interface Iprint&lt;T = number&gt;{
          (arg: T): T
        }
        function print&lt;T&gt;(arg: T){
          console.log(arg);
          return arg
        }
        const myPrint: Iprint = print;
      </code>
    </pre>
    <p>这样默认就是number类型了，怎么样，是不是感觉T就如同函数参数一样呢？</p>
    <h2>处理多个函数参数</h2>
    <p>现在有这么一个函数，传入一个只有两项的元组，交换元组的第0项和第1项，返回这个元组。</p>
    <pre>
      <code>
        function swap(tuple){
          return [tuple[1], tuple[0]]
        }
      </code>
    </pre>
    <p>这么写，我们就丧失了类型，用泛型来改造一下。</p>
    <p>我们用T代表第0项的类型，用U代表第1项类型的控制</p>
    <pre>
      <code>
        function swap &lt;T, U&gt;(tuple: [T, U]):[U, T]{
          return [tuple[1], tuple[0]]
        }
      </code>
    </pre>
    <p>这样就可以实现了元组第0项和第1项类型的控制</p>
    <p>传入的参数里，第0项为string类型，第1项为number类型。</p>
    <p>在交换函数的返回值里，第0项为number类型，第1项为string类型。</p>
    <p>第0项上全是number的方法</p>
    <p>第1项上全是string的方法</p>
    <h2>函数副作用操作</h2>
    <p>泛型不仅可以很方便的约束函数的参数类型，还可以用在函数执行副作用操作的时候。</p>
    <p>比如我们有一个通用的异步请求方法，根据不同的url请求返回不同类型的数据。</p>
    <pre>
      <code>
        function request(url: string){
          return fetch(url).then(res => res.json())
        }
      </code>
    </pre>
    <p>调一个获取用户信息的接口</p>
    <pre>
      <code>
        request('user/info').then(res => {
          console.log(res)
        })
      </code>
    </pre>
    <p>这时候的返回结果res就是一个any类型，非常讨厌。</p>
    <p>我们希望调用API都清晰的知道返回类型是什么数据结构，就可以这么做：</p>
    <pre>
      <code>
        interface UserInfo{
          name: string
          age: number
        }
        function request &lt;T&gt;(url: string): Promise&lt;T&gt; {
          return fetch(url).then(res => res.json())
        }
        request&lt;UserInfo&gt;('user/info').then(res => {
          console.log(res)
        })
      </code>
    </pre>
    <p>这样就能很舒服地拿到接口返回的数据类型，开发效率大大提高</p>
    <h1>约束泛型</h1>
    <p>假设现在有这么一个函数，打印传入参数的长度，我们这么写：</p>
    <pre>
      <code>
        function printLength&lt;T&gt;(arg: T): T{
          console.log(arg.length)
          return arg
        }
      </code>
    </pre>
    <p>因为不确定T是否有length属性，会报错</p>
    <p>那么现在我想约束这个泛型，一定要有length属性，怎么办？</p>
    <p>可以和interface结合，来约束类型</p>
    <pre>
      <code>
        interface ILength{
          length: number
        }
        function printLength&lt;T extends ILength&gt;(arg: T): T{
          console.log(arg.length)
          return arg
        }
      </code>
    </pre>
    <p>这其中的关键就是&lt;T extends ILength&gt;,让这个泛型继承接口ILength，这样就能约束泛型。</p>
    <p>我们定义的变量一定要有length属性，比如下面的str、arr和obj，才可以通过TS编译</p>
    <pre>
      <code>
        const str = printLength('lin')
        const arr = printLength([1,2,3])
        const obj = printLength({length: 10})
      </code>
    </pre>
    <p>这个例子也再次印证了interface的duck typing</p>
    <p>只要你有length属性，都符合约束，那就不管你是str，arr还是obj，都没问题。</p>
    <p>当然，我们定义一个不包含length属性的变量，比如数字，就会报错</p>
    <h1>泛型的一些应用</h1>
    <p>使用泛型，可以在定义函数，接口或类的时候，不预先指定具体类型，而是在使用的时候再指定类型。</p>
    <h2>泛型约束类</h2>
    <p>定义一个栈，有入栈和出栈两个方法，如果想入栈和出栈的元素类型同意，就可以这么写：</p>
    <pre>
      <code>
        class Stack&lt;T&gt;{
          private data: T[] = []
          push(item: T){
            return this.data.push(item)
          }
          pop(): T | undefined {
            return this.data.pop()
          }
        }
      </code>
    </pre>
    <p>在定义实例的时候写类型，比如，入栈和出栈都要是number类型，就这么写：</p>
    <pre><code>const s1 = new Stack&lt;number&gt;()</code></pre>
    <p>这样，入栈一个字符串就会报错</p>
    <p>这是非常灵活的，如果需求变了，入栈和出栈都要是string类型，在定义实例的时候改一下就好了：</p>
    <pre><code>const s1 = new Stack&lt;string&gt;()</code></pre>
    <p>这样，入栈一个数字就会出错</p>
    <p>特别注意的是，泛型无法约束类的静态成员。</p>
    <p>给pop方法定义static关键字，就报错了</p>
    <h2>泛型约束接口</h2>
    <p>使用泛型，也可以对interface进行改造，让interface更灵活</p>
    <pre>
      <code>
        interface IKeyValue&lt;T, U&gt;{
          key: T
          value: U
        }
        const k1: IKeyValue&lt;number, string&gt; = { key: 18, value: 'AhWei'}
        const k2: IKeyValue&lt;string, number&gt; = { key: 'AhWei', value: 18}
      </code>
    </pre>
    <h2>泛型定义数组</h2>
    <p>定义一个数组，我们之前是这么写的：</p>
    <pre><code>cpsmt arr: number[] = [1,2,3]</code></pre>
    <p>现在这么写也可以：</p>
    <pre><code>const arr: Array&lt;number&gt; = [1,2,3]</code></pre>
    <p>数组项写错类型，报错</p>
    <h1>小结</h1>
    <p>泛型（Generics），从字面上理解，泛型就是一般的，广泛的。</p>
    <P>泛型是指在定义函数、接口或类的时候，不预先指定具体类型，而是在使用的时候再指定类型。</P>
    <p>泛型中的T就像一个占位符、或者说一个变量，在使用的时候可以把定义的类型像参数一样传入，它可以原封不动地输出。</p>
    <p>泛型在成员之间提供有意义的约束，这些成员可以是：函数参数，函数返回值，类的实例成员，类的方法等。</p>
    <p>用一张图来总结一下泛型的好处</p>
    <img src="@/assets/fanxin.png" alt="泛型的好处" title="泛型的好处">
  </div>
</template>
<script lang="ts" setup>
import Vue from 'vue'
// 泛型，是TS比较难理解的部分，拿下了泛型，对TS的理解就又上了一个台阶，对后续深入学习帮助很大
/**
 * 为什么需要泛型
 */
// 如果你看过TS文档，一定看过这样两段话
/**
 * 软件工程中，我们不仅要创建一致的定义良好的API，同时也要考虑可重用性。组件不仅能够支持当前的数据类型，同时也能支持未来的数据类型，这在创建大型系统时为你提供了十分灵活的功能。
 * 在像C#和Java这样的语言中，可以使用过泛型来创建可重用的组件，一个组件可以支持多种类型的数据。这样用户就可以以字节的数据类型来使用组件。
 */
// 我觉得初学者应该要先明白为什么需要泛型这个东西，它解决了什么问题？而不是看这种拗口的定义。
// 我们还是先来看这样一个例子，体会一下泛型解决的问题吧。
// 定义一个print函数，这个函数的功能是把传入的参数打印出来，再返回这个参数，传入参数的类型是string，函数返回类型为string。
function print(arg:string):string{
  console.log(arg);
  return arg
}
// 现在需求变了，我还需要打印number类型，怎么办？
// 可以使用联合类型来改造
function print1(arg:string | number):string | number {
  console.log(arg);
  return arg
}
// 现在需求又变了，我还需要打印string数组，number数组，甚至任何类型，怎么办？
// 有个笨办法，支持多少类型就写多少联合类型。
// 或者把参数类型改成any
function print2(arg:any):any{
  console.log(arg);
  return arg
}
// 且不说写any类型不好，毕竟在TS中尽量不要写any。
// 而且这也不是我们想要的结果，只能说传入的值是any类型，输出的值是any类型，传入和返回并不是统一的。
// 这么写甚至还会出现bug
const res:string = print2(123)
// 定义string类型来接收print函数的返回值，返回的是个number类型，TS并不会报错提示我们。
// 这个时候，泛型就出现了，它可以轻松解决输入输出一致的问题。
// 注意：泛型不是为了解决这一个问题设计出来的，泛型还解决了很多其它问题，这里是通过这个例子来引出泛型。
/**
 * 泛型基本使用
 */
// 处理函数参数
// 我们使用泛型来解决上文的问题。
// 泛型的语法是<>里写参数类型，一般可以用T来表示
function print3<T>(arg:T):T{
  console.log(arg);
  return arg
}
// 这样，我们就做到了输入和输出的类型同意，且可以输入输出任何类型
// 如果类型不同意，就会报错:Argument of type '123' is not assignable to parameter of type 'string'.
const res1:string = print(123);
// 泛型中的T就像一个占位符、或者说一个变量，在使用的时候可以把定义的类型像参数一样传入，它可以原封不动地输出。
// 泛型的写法对前端工程师来说有些古怪，比如<> T，但记住就好，只要看到<>，就知道这是泛型
// 我们在使用的时候可以有两种方式指定类型。
/**
 * 定义要使用的类型
 * TS类型推断，自动推导出类型
 */
print<string>('hello') // 定义T为stirng
print('hello') // TS类型推断，自动推导类型为string
// 我们知道，type和interface都可以定义函数类型，也用泛型来写一下，type这么写：
type Print = <T>(arg: T) => T
const printFn:Print = function print4(arg){
  console.log(arg);
  return arguments
}
// interface这么写：
interface Iprint<T>{
  (arg: T): T
}
function print5<T>(arg: T){
  console.log(arg)
  return arg
}
const myPrint: Iprint<number> = print5
/**
 * 默认参数
 */
// 如果要给泛型加默认参数，可以这么写：
interface Iprint1<T = number>{
  (arg:T): T
}
function print6<T>(arg: T){
  console.log(arg)
  return arg
}
const myPrint1: Iprint1 = print6
// 这样默认就是number类型了，怎么样，是不是感觉T就如同函数参数一样呢？
/**
 * 处理多个函数参数
 */
// 现在有这么一个函数，传入一个只有两项的元组，交换元组的第0项和第1项，返回这个元组。
function swap(tuple){
  return [tuple[1], tuple[0]]
}
// 这么写，我们就丧失了类型，用泛型来改造一下。
// 我们用T代表第.0项的类型，用U代表第一项的类型。
function swap1<T, U>(tuple: [T, U]): [U, T]{
  return [tuple[1], tuple[0]]
}
// 这样就可以实现了元组第0项和第1项类型的控制
const res2 = swap1(['AhWei', 18]);
console.log(res2)
// 传入的参数里，第0项为string类型，第1项为number类型。
// 在交换函数的返回值里，第0项为number类型，第1项为string类型。
// 第0项上全是number的方法
// 第1项上全是string的方法
/**
 * 函数副作用操作
 */
// 泛型不仅可以很方便地约束函数的参数类型，还可以用在函数执行副作用操作的时候。
// 比如我们有一个通用的异步请求方法，根据不同的url请求返回不同类型的数据。
function request(url: string){
  return fetch(url).then(res => res.json());
}
// 调用一个获取用户信息的接口：
request('user/info').then(res => {
  console.log(res)
})
// 这个时候返回结果res就是一个any类型，非常讨厌。
// 我们希望调用API都清晰的知道返回类型是什么数据结构，就可以这么做：
interface UserInfo {
  name: string
  age: number
}
function request1<T>(url: string): Promise<T>{
  return fetch(url).then(res => res.json())
}
request1<UserInfo>('user/info').then(res => {
  console.log(res);
})
// 这样就能很舒服地拿到接口返回的数据类型，开发相率大大提高
/**
 * 约束泛型
 */
// 假设现在有还在么一个函数，单元传入参数的长度，我们这么写：roperty 'length' does not exist on type 'T'
function printLength<T>(arg: T):T{
  console.log(arg.length)
  return arg
}
// 因为不确定T是否有length属性，会报错
// 那么现在我想约束好整个泛型，一定要有length属性，怎么办？
// 可以和interface结合，来约束类型。
interface ILength {
  length: number
}
function printLength1<T extends ILength>(arg: T):T{
  console.log(arg.length);
  return arg
}
// 这其中的关键就是<T extends ILength>，让这个泛型继承接口ILength，这样就能约束泛型。
// 我们定义的变量一定要有length属性，比如下面的str、arr和obj，才可以通过TS编译
const str = printLength1('lin');
const arr = printLength1([1,2,3]);
const obj = printLength1({length: 10})
console.log("长度：",str, arr, obj)
// 这个例子也再次印证了interface的duck typing。
// 只要你又length属性，都符合约束，那就不管你是str，arr还是obj，都没问题。
// 当然，我们定义一个不包含length属性的变量，比如数字，就会报错
/**
 * 泛型的一些应用
 */
// 使用泛型，可以在定义函数，接口或类的时候，不预先指定具体类型，而是在使用的时候再指定类型。
/**
 * 泛型约束类
 */
// 定义一个栈，有入栈和出栈两个方法，如果想入栈和出栈的元素类型同意，就可以这么写：
class Stack<T>{
  private data: T[] = [];
  push(item:T){
    return this.data.push(item)
  }
  pop():T | undefined{
    return this.data.pop()
  }
}
// 在定义实例的时候写类型，比如，入栈和出栈都要是number类型，就这么写：
const stack1 = new Stack<number>()
// 这样，入栈一个字符串就会报错:Argument of type '"AhWei"' is not assignable to parameter of type 'number'
stack1.push('AhWei');
stack1.push(18)
// 这是非常灵活的，如果需求变了，入栈和出栈都要是string类型，在定义实例的时候改一下就好了：
const stack2 = new Stack<string>()
// 这样，入栈一个数字就会出错
// 特别注意的是，泛型无法约束类的静态成员。
// 给pop方法定义static关键字，就报错了
/**
 * 泛型约束接口
 */
// 使用泛型，也可以对interface进行改造，让interface更灵活
interface IKeyValue<T, U>{
  key: T
  value: U
}
const k1:IKeyValue<number, string> = {key: 18, value: 'AhWei'};
const k2:IKeyValue<string, number> = {key: "AhWei", value: 18};
/**
 * 泛型定义数组
 */
// 定义一个数组，我们之前是这么写的：
const arrA: number[] = [1,2,3];
// 现在这么写也可以：
const arrF: Array<number> = [1,2,3]
// 数组项写错类型，报错
/**
 * 小结
 */
// 泛型（Generics），从字面上理解，泛型就是一般的，广泛的。
// 泛型是指在定义函数、接口或类的时候，不预先指定具体类型，而是在使用的时候再指定类型。
// 泛型中的T就像一个占位符、或者说一个变量，在使用的时候可以把定义的类型像参数一样传入，它可以原封不动地输出。
// 泛型在成员之间提供有意义的约束，这些成员可以是：函数参数，函数返回值，类的实例成员，类的方法等。
// 用一张图总结一下泛型的好处：
</script>