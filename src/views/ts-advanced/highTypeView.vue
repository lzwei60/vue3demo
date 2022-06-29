<template>
  <div style="text-align: left;">
    <p>高级类型分一和二两部分，一的部分不需要理解泛型也能理解，二的部分需要理解泛型之后才能理解，所以二被拆分到后面去了。</p>
    <h1>联合类型</h1>
    <p>如果希望一个变量可以支持多种类型，就可以用联合类型（union types）来定义。</p>
    <p>例如，一个变量既支持number类型，又支持string类型，就可以这么写：</p>
    <pre>
      <code>
        let num: number | string
        num = 8
        num = "eight"
      </code>
    </pre>
    <p>联合类型大大提高了类型的可扩展性，但当TS不确定一个联合联系的变量到底是哪个类型的时候，只能访问他们共有的属性和方法。</p>
    <p>比如这里就只能访问number类型和string类型共有的方法</p>
    <p>如果直接访问length属性，string类型上有，number类型上没有，就报错。</p>
    <h1>交叉类型</h1>
    <p>如果要对对象的形状进行扩展，可以使用交叉类型&</p>
    <p>比如Person有name和age的属性，而Student在name和age的基础上还有grade属性，就可以这么写。</p>
    <pre>
      <code>
        interface Person{
          name: string
          age: number
        }
        type Studetn = Person & {grade: number}
      </code>
    </pre>
    <p>这和类的继承是一模一样的，这样Student就继承了Person上的属性</p>
    <p>联合类型|是指可以取几种类型中的任意一种，而交叉类型&是指把几种类型合并起来</p>
    <h1>类型别名（type）</h1>
    <p>类型别名（type aliase），听名字就很好理解，就是给类型起个别名。</p>
    <p>就像我们项目中配置alias，不用谢相对路径就能很方便地引入文件</p>
    <pre>
      <code>
        import componentA from '../../../../components/componentA/index.vue'
        变成
        import componentA from '@/components/componentA/index.vue
      </code>
    </pre>
    <p>类型别名用type关键字来书协，有了类型别名，我们书写TS的时候可以更加方便简洁。</p>
    <p>比如下面这个例子，getName这个函数接收的参数可能是字符串，可能是函数，就可以这么写</p>
    <pre>
      <code>
        type Name = string
        type NameResolver = () => string
        type NameOrResolver = Name | NameResolver // 联合类型
        function getName(n : NameOrResolver): Name {
          if(typeof n === 'string'){
            return n
          }else{
            return n()
          }
        }
      </code>
    </pre>
    <p>这样调用时传字符串和函数都可以</p>
    <pre>
      <code>
        getName('AhWei');
        getName(()=> 'AhWei')
      </code>
    </pre>
    <p>如果传的格式有问题，就会提示</p>
    <p>类型别名会给一个类型起个新名字。类型别名有时和接口很像，但是可以作用于原始值，联合类型，元组以及其它任何你需要手写的类型————TS文档</p>
    <p>类型别名的用法如下：</p>
    <pre>
      <code>
        type Name = string // 基本类型
        type arrItem = number | string // 联合类型
        const arr: arrItem[] = [1,'2',3]
        type Person = {
          name: Name
        }
        type Student = Person & { grade: number } // 交叉类型
        type Teacher = Person & { major: string }
        type StudentAndTeacherList = [Student, Teacher] // 元组类型
        const list:StudentAndTeacherList = [
          {name: 'AhWei', grede: 100},
          {naem: 'AhWei', major: "chinses"}
        ]
      </code>
    </pre>
    <h1>type和interface的区别</h1>
    <p>比如下面这个例子，可以用type，也可以用interface</p>
    <pre>
      <code>
        interface Person {
          name: string
          age: number 
        }
        const person: Person = {
          name: 'AhWei',
          age: 18
        }
      </code>
    </pre>
    <pre>
      <code>
        type Person = {
          name: string
          age: number
        }
        const person: Person = {
          name: 'AhWei'
          age: 18
        }
      </code>
    </pre>
    <p>那type和interface难道都可以随便用，总得有区别把。</p>
    <p>两者相同点</p>
    <ul>
      <li>都可以定义一个对象或函数</li>
      <li>都允许继承</li>
    </ul>
    <h2>都可以定义一个对象或函数</h2>
    <p>定义对象上文已经说了，我们来看一下如何定义函数。</p>
    <pre>
      <code>
        type addType = (num1:number, num2:number) => number
        interface addType {
          (num1: number, num2: number):number
        }
        // 这两中写法都可以定义函数类型
        const add:addType = (num1, num2) => {
          return num1 + num2
        }
      </code>
    </pre>
    <h2>都允许继承</h2>
    <p>我们定义一个Person类型和Student类型，Student继承自Person，可以有下面四种方式</p>
    <pre>
      <code>
        // interface继承interface
        interface Person {
          name: string
        }
        interface Student extends Person {
          grade: number
        }
        const person: Student = {
          name: "AhWei",
          grade: 100
        }

        // type继承type
        type Person = {
          name: string
        }
        type Student = Person & {grade: number } // 用交叉类型

        //interface继承type
        type Person = {
          name: string
        }
        interface Student extends Person {
          grade: number
        }

        // type继承interface
        interface Person {
          name: string
        }
        type Student = Person & { grade: number } // 用交叉类型
      </code>
    </pre>
    <p>interface使用extends实现继承，type使用交叉类型实现继承</p>
    <p>两者不同点</p>
    <ul>
      <li>interface（接口）是TS涉及出来用于定义对象类型的，可以对对象的形状进行描述。</li>
      <li>type是类型别名，用于给各种类型定义别名，让TS写起来更简洁、清晰。</li>
      <li>type可以声明基本类型、联合类型、交叉类型、元组，interface不行</li>
      <li>interface可以合并重复声明，type不行</li>
    </ul>
    <h2>合并重复声明</h2>
    <pre>
      <code>
        interface Person {
          name: string
        }
        interface Person { // 重复声明interface，就合并了
          age: number
        }
        const person: Person = {
          name: "AhWei",
          age: 18
        }
      </code>
    </pre>
    <p>重复声明type，就报错了</p>
    <pre>
      <code>
        type Person = {
          name: string
        }
        type Person = { // Duplicate identifier 'Person'
          age: number
        }
        const person: Person = {
          name: 'AhWei',
          age: 18
        }
      </code>
    </pre>
    <p>这两者的区别说了这么多，其实本不该把这两个东西哪来做对比，他们两个是完全不同的概念。</p>
    <p>interface是接口，用于描述一个对象</p>
    <p>type是类型别名，用于给各种类型定义别名，让TS写起来更简洁、清晰。</p>
    <p>只是有时候两者都能实现同样的功能，才会经常被混淆</p>
    <p>平时开发中，一般使用组合或者交叉类型的时候，用type</p>
    <p>一般要用类的extends或implements时，用interface</p>
    <p>其它清空，比如定义一个对象或者函数，就看你心情了</p>
    <h1>类型保护</h1>
    <p>如果有一个getLength函数，入参是联合类型number | string，返回入参的length</p>
    <pre>
      <code>
        function getLength(arg: number | string): number{
          return arg.length
        }
      </code>
    </pre>
    <p>从上文可知，这么写会报错，因为number类型上没有length属性：roperty类型上没有length属性。</p>
    <p>这个时候，类型保护（Type Guards）出现了，可以使用typeof关键字判断变量的类型。</p>
    <p>我们把getLength方法改造一下，就可以精准的获取到string类型的length属性了。</p>
    <pre>
      <code>
        function getLength(arg: number | string): number {
          if(typeof arg === 'string'){
            return arg.length
          }else{
            return arg.toString().length
          }
        }
      </code>
    </pre>
    <p>之所以叫类型保护，就是为了能够在不同的分支条件中缩小范围，这样我们代码出错的几率就大大降低了。</p>
    <h1>类型断言</h1>
    <p>上文的例子也可以使用类型断言来解决</p>
    <p>类型断言语法：</p>
    <pre><code>值 as 类型</code></pre>
    <p>使用类型断言来告诉TS，我（开发者）比你（编译器）更清楚这个参数是什么类型，你别给我报错了。</p>
    <pre>
      <code>
        function getLength(arg: number | string): number {
          const str = arg as string
          if(str.length){
            return str.length
          } else {
            const number = arg as number
            return number.toString().length
          }
        }
      </code>
    </pre>
    <p>注意，类型断言不是类型转换，把一个类型断言成联合类型中不存在的类型会报错</p>
    <pre>
      <code>
        function getLength(arg: number | string): number{
          return (arg as number[]).length
        }
      </code>
    </pre>
    <h1>字面量类型</h1>
    <p>有时候，我们需要定义一些常量，就需要用到字面量类型，比如</p>
    <pre>
      <code>
        type ButtonSize = 'mini' | 'small' | 'normal' | 'large'
        type Sex = '男' | '女'
      </code>
    </pre>
    <p>这样就只能从这些定义的常量中取值，乱取值会报错</p>
  </div>
</template>
<script lang="ts" setup>
import Vue from 'vue'
// 高级类型分一和二两部分，一的部分不需要理解泛型也能理解，二的部分需要理解泛型之后才能理解，所以二被拆分到后面去了。
/**
 * 联系类型
 */
// 如果希望一个变量可以支持多种类型，就可以用联合类型（union types）来定义。
// 例如，一个变量既支持number类型，又支持string类型，就可以这么写：
let num:number | string;
num = 8;
num = "eight"
// 联合类型大大提高了类型的可扩展性，但当TS不确定一个联合联系的变量到底是哪个类型的时候，只能访问他们共有的属性和方法。
// 比如这里只能访问number类型和string类型共有的方法，如下图：
num.toString();num.valueOf();
// 如果直接访问length属性，string类型上有，number类型上没有，就报错。
// Property 'length' does not exist on type 'string | number'.Property 'length' does not exist on type 'number'
num.length;
/**
 * 交叉类型
 */
// 如果要对对象形状进行扩展，可以使用交叉类型&。
// 比如Person有name和age的属性，而Student在name和age的基础上还有grade属性，就可以这么写。
interface Person{
  name: string
  age: number
}
type Student = Person & {grade: number}
// 这和类的继承是一模一样的，这样Student就继承了Person上的属性
const s1: Student = {
  name: "AhWei",
  grade: 8,
  age: 18
}
console.log(s1.name, s1.grade, s1.age);
// 联合类型 | 是指可以取几种类型中的任意一种，而交叉类型&是指把几种类型合并起来。
// 交叉类型和interface的extends飞车类似，都是为了实现对象形状的组合和扩展。
/**
 * 类型别名
 */
// 类型别名（type aliase），听名字就很好理解，就是给类型起个别名。
// 就像我们项目中配置alias，不用谢相对路径就能很方便地引入文件
/**
 * import componentA from '../../../../components/componentA/index.vue'
 * 变成
 * import componentA from '@/components/componentA/index.vue'
 */
// 类型别名用type关键字来书协，有了类型别名，我们书写TS的时候可以更加方便简介。
// 比如这个例子，getName这个函数接收的参数可能是字符串，可能是函数，就可以这么写。
type Name = string
type NameResolver = () => string
type NameOrResolver = Name | NameResolver // 联合类型
function getName(n: NameOrResolver): Name{
  if(typeof n === "string"){
    return n
  }else{
    return n()
  }
}
// 这样调用时传字符串和函数都可以
console.log("字符串：",getName('AhWei'))
console.log("函数：",getName(()=> "AhWei"))
// 如果传的格式有问题，就会提示
/**
 * 类型别名规格一个类型起个新名字。类型别名有时和接口很像，但是可以作用于原始值，联合类型，元组以及其它任何你需要手写的类型。
 */
// 类型别名的用法如下
type Name1 = string // 基本类型
type arrItem = number | string // 联合类型
const arr: arrItem[] = [1, '2', 3]
type Person1 = {
  name: Name1
}
type Student1 = Person1 & { grade: number } // 交叉类型
type Teacher1 = Person1 & { major: string }
type SudentAndTeacherList = [Student1, Teacher1] // 元组类型
const list: SudentAndTeacherList = [
  { name: 'lin', grade: 100 }, 
  { name: 'liu', major: 'Chinese' }
]
console.log("Promise处理")
const promise = new Promise((resolve, reject) =>{
  resolve();
})
function taskA():void{
  console.log("Task A")
}
function taskB():void{
  console.log("Task B")
}
function taskC():void{
  console.log("Task C")
}
promise.then(taskA).then(taskB).then(taskC).catch((error)=>{console.log(error)})
const getJSON = function(ms, param){
 return new Promise((resolve, reject) =>{
    setTimeout(()=>{
      resolve(param)
    },ms)
  })
}
getJSON(100, "first").then(res=>{
  console.log(res)
  return getJSON(300, "second")
}).then(res =>{
  console.log(res);
  return getJSON(100, "third")
}).then(res => {
  console.log(res)
}).catch(error => console.log(error))
/**
 * type和interface的区别
 */
// 比如下面这个例子，可以用type，也可以用interface
interface Person{
  name: string
  age: number
}
const person:Person = {
  name: "AhWei",
  age: 18
}
type Person2 = {
  name: string
  age: number
}
const person2: Person2 = {
  name: "AhWei",
  age: 18
}
// 那type和interface难道都可以随便用，总得有区别把。
// 两者相同点：
// 1、都可以定义一个对象或函数
// 2、都允许继承
/** 
 * 都可以定义一个对象或函数 
 */
// 定义对象上文已经说了，我们来看一下如何定义函数。
type addType = (num1:number, num2:number) => number
interface addType1{
  (num1:number,num2:number):number
}
// 这两种写法都可以定义函数类型
const add:addType = (num1, num2) => {
  return num1 + num2
}
/**
 * 都允许继承
 */
// 我们定义一个Person类型和Student类型，Student继承自Person，可以有下面四种方式
// interface继承interface
interface Person3 {
  name: string
}
interface Student3 extends Person3{
  grade: number
}
const person3:Student3 = {
  name: "AhWei",
  grade: 100
}
// type继承type
type Person4 = {
  name: string
}
type Student4 = Person4 & { grade: number } // 用交叉类型
// interface继承type
type Person5 = {
  name: string
}
interface Student5 extends Person {
  grade: number
}
// type继承interface
interface Person6 {
  name: string
}
type Student6 = Person6 & { grade: number } // 用交叉类型
// interface使用extends实现继承，type使用交叉类型实现继承
// 两者不同点：
// interface（接口）是TS涉及出来用于定义对象类型的，可以对对象的形状进行描述。
// type是类型别名，用于给各种类型定义别名，让TS写起来更简洁、清晰。
// type可以声明基本类型、联合类型、交叉类型、元组，interface不行
// interface可以合并重复声明，type不行
/**
 * 合并重复声明
 */
interface Person7 {
  name: string
}
interface Person7 { // 重复声明interface，就合并了
  age: number
}
const person7: Person7 = {
  name: "AhWei",
  age: 18
}
// 重复声明type，就报错了:Duplicate identifier 'Person8'
type Person8 = {
  name: string
}
// type Person8 = {age: number}
/**
 * 类型保护
 */
// 如果有一个getLength函数，入参是联合类型number | strubg，返回入参的length
function getLength(arg: number | string): number{
  // return arg.length // 报错
  if(typeof arg === "string"){
    return arg.length
  }else{
    return arg.toString().length
  }
}
// 从上文可知，这么写会报错，因为number类型上没有length属性：roperty 'length' does not exist on type 'string | number'.Property 'length' does not exist on type 'number'.
// 这个时候，类型保护（Type Guards）出现了，可以使用typeof关键字判断变量的类型。
// 我们把getLength方法改造一下，就可以精准的获取到string类型的length属性了。
// 之所以叫类型保护，就是为了能够在不同的分支条件中缩小范围，这样我们代码出错的几率就大大降低了。
/**
 * 类型断言
 */
// 上文的例子也可以使用类型断言来解决
// 类型断言语法： 值 as 类型
// 使用类型断言来告诉TS，我（开发者）比你（编译器）更清楚这个参数是什么类型，你别给我报错了。
function getLength1(arg: number | string): number{
  const str = arg as string
  if(str.length){
    return str.length
  }else{
    const number = arg as number
    return number.toString().length
  }
}
// 注意，类型断言不是类型转换，把一个类型断言成联合类型中不存在的类型会报错
// 比如:Type 'number' is not comparable to type 'number[]
function getLength2(arg: number | string):number{
  return (arg as number[]).length
}
/**
 * 字面量类型
 */
// 有时候，我们需要定义一些常量，就需要用到字面量类型，比如
type ButtonSize = 'mini' | 'small' | 'normal' | 'large'
type Sex = '男' | '女'
// 这样就只能从这些定义的常量中取值，乱取值会报错:Type '"不男不女"' is not assignable to type 'Sex'.
const sex: Sex = "不男不女"
</script>
