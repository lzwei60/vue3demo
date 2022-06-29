<template>
  <div style="text-align: left;">
    <p style="text-align: center">interface</p>
    <h1>基本概念</h1>
    <p>interface（接口）是TS设计出来用于定义对象类型的，可以对对象的形状进行描述。</p>
    <p>定义interface一般首字母大写</p>
    <p>interface Person{</p>
    <p>&nbsp;&nbsp;name: string</p>
    <p>&nbsp;&nbsp;age: number</p>
    <p>}</p>
    <p>const p1: Person = {</p>
    <p>&nbsp;&nbsp;name: 'AhWei',</p>
    <p>&nbsp;&nbsp;age: 18</p>
    <p>}</p>
    <p>属性必须和类型定义的时候完全一致，少写了属性，会报错：Property 'age' is missing in type '{ name: string; }' but required in type 'Person'.</p>
    <p>多写了属性，也会报错：Type '{ name: string; age: number; job: string; }' is not assignable to type 'Person'.Object literal may only specify known properties, and 'job' does not exist in type 'Person'.</p>
    <p>类型提示，显著提升开发效率</p>
    <p style="color: red">注意：interface不是JS中的关键字，所以TS编译成JS之后，这些interface是不会被转换过去的，都会被删除掉，interface只是在TS中用来做静态检查</p>
    <h1>可选属性</h1>
    <p>跟函数的可选参数是类似的，在属性上加个？，这个属性就是可选的，比如下面的age属性</p>
    <p>interface Person{</p>
    <p>&nbsp;&nbsp;name: string</p>
    <p>&nbsp;&nbsp;age?: number</p>
    <p>}</p>
    <p>const p1: Person = {</p>
    <p>&nbsp;&nbsp;name: 'AhWei'</p>
    <p>}</p>
    <h1>只读属性</h1>
    <p>如果希望某个属性不被改变，可以这么写</p>
    <p>interface Person {</p>
    <p>&nbsp;&nbsp;readonly id: number</p>
    <p>&nbsp;&nbsp;name: string</p>
    <p>&nbsp;&nbsp;age: number</p>
    <p>}</p>
    <p>改变这个只读属性时会报错:Cannot assign to 'id' because it is a read-only property.</p>
    <p>cosnt p1: Person = {</p>
    <p>&nbsp;&nbsp;name: 'AhWei',</p>
    <p>&nbsp;&nbsp;age: 18,</p>
    <p>&nbsp;&nbsp;id: 1</p>
    <p>}</p>
    <p>p1.id = 2</p>
    <h1>interface描述函数类型</h1>
    <p>interface也可以用来描述函数类型</p>
    <p>interface ISum {</p>
    <p>&nbsp;&nbsp;(x:number, y:number):number</p>
    <p>}</p>
    <p>const add:ISum = (num1, num2) => {</p>
    <p>&nbsp;&nbsp;return num1 + num2</p>
    <p>}</p>
    <h1>自定义属性（可索引的类型）</h1>
    <p>上文中，属性必须和类型定义的时候完全一致，如果一个对象上有多个不确定的属性，怎么办？</p>
    <p>interface RandomKey {</p>
    <p>&nbsp;&nbsp;[propName: string]: string</p>
    <p>}</p>
    <p>const obj: RandomKey = {</p>
    <p>&nbsp;&nbsp;a: "hello",</p>
    <p>&nbsp;&nbsp;b: "AhWei",</p>
    <p>&nbsp;&nbsp;c: "welcome"</p>
    <p>}</p>
    <p>如果把属性名定义为number类型，就是一个类数组，看上去和数组一模一样。但是，不是真的数组，数组上的方法它是没有的。</p>
    <p>interface LikeArray {</p>
    <p>&nbsp;&nbsp;[propName: number]: string</p>
    <p>}</p>
    <p>const arr: LikeArray = ['hello', 'AhWei']</p>
    <h1>ducy typing（鸭子类型）</h1>
    <p>看到这里，你会发现interface的写法非常灵活，它不是教条主义。用interface可以创造一系列自定义的类型。事实上，interface还有一个响亮的名称：duck typing(鸭子类型)</p>
    <p style="color: red">当你看到一只鸟走起来像鸭子，游泳起来像鸭子，叫起来也像鸭子，那么这只鸟就可以被称为鸭子。</p>
    <p>这句话完美的诠释了interface的含义，只要数据满足了interface定义的类型，TS就可以编译通过。</p>
    <p>interface FunctionWithProps {</p>
    <p>&nbsp;&nbsp;(x: number): number</p>
    <p>&nbsp;&nbsp;fnName: string</p>
    <p>}</p>
    <p>FunctionWithProps接口描述了一个函数类型，还向这个函数类型添加了name属性，着看上起完全是四不像，但是这个定义是完全可以工作的。</p>
    <p>const fn: FunctionWithProps = (x) => {</p>
    <p>&nbsp;&nbsp;return x</p>
    <p>}</p>
    <p>fn.fnName = "hello world"</p>
  </div>
</template>
<script lang="ts" setup>
import Vue from 'vue'
/**
 * 基本概念
 */
// interface（接口）是TS设计出来用于定义对象类型的，可以对对象的形状进行描述。
// 类型提示，显著提升开发效率
// 定义interface一般首字母大写
// 注意：interface不是JS中的关键字，所以TS编译成JS之后，这些interface是不会被转换过去的，都会被删除掉，interface只是在TS中用来做静态检查
interface Person {
  name: string,
  age: number
}
const p1: Person = {
  name: 'AhWei',
  age: 18
}
// 属性必须和类型定义的时候完全一致。
// 少写了属性，报错:Property 'age' is missing in type '{ name: string; }' but required in type 'Person'.
const p2: Person = {
  name: "AhWei",
  age: 18,
  job: "jishugong"
  // Type '{ name: string; age: number; job: string; }' is not assignable to type 'Person'.
  // Object literal may only specify known properties, and 'job' does not exist in type 'Person'.
}
/**
 * 可选属性
 */
// 跟函数的可选参数是类似的，在属性上加个？，这个属性就是可选的，比如下面的age属性
interface Person1 {
  name: string,
  age?: number
}
const p3: Person1 = {
  name: "AhWei"
}
/**
 * 只读属性
 */
// 如果希望某个属性不被改变，可以这么写
interface Person2 {
  readonly id: number
  name: string
  age: number
}
// 改变这个只读属性时会报错:Cannot assign to 'id' because it is a read-only property.
const p4: Person2 = {
  name: "Ahwei",
  age: 18,
  id: 1
}
p4.id = 2;
/**
 * interface描述函数类型
 */
// interface 也可以用来描述函数类型
interface ISum{
  (x:number, y:number):number
}
const addSum:ISum = (num1, num2) => {
  return num1 + num2 
}
console.log("interface描述函数类型", addSum(1,2))
/**
 * 自定义属性（可索引的类型）
 */
// 上文中，属性必须和类型定义的时候完全一致，如果一个对象上有多个不确定的属性，怎么办？
interface RandomKey {
  [propName: string]: string
}
const obj: RandomKey = {
  a: "hello",
  b: "AhWei",
  c: "welcome"
}
// 如果把属性名定义为number类型，就是一个类数组，看上去和数组一模一样。但是，不是真的数组，数组上的方法它是没有的。
interface LikeArray {
  [propName: number]: string
}
const arr: LikeArray = ['hello', 'AhWei']
/**
 * duck typing（鸭子类型）
 */
// 看到这里，你会发现interface的写法非常灵活，它不是教条主义。用interface可以创造一系列自定义的类型。事实上，interface还有一个响亮的名称：duck typing（鸭子类型）。
// 当你看到一只鸟走起来像鸭子，游泳起来像鸭子，叫起来也像鸭子，那么这只鸟就可以被称为鸭子。
// 这句话完美的诠释了interface的含义，只要数据满足了interface定义的类型，TS就可以编译通过。
interface FunctionWithProps {
  (x: number): number
  fnName: string
}
// FunctionWithProps接口描述了一个函数类型，还向这个函数类型添加了name属性，着看上起完全是四不像，但是这个定义是完全可以工作的。
const fn: FunctionWithProps = (x) => {
  return x
}
fn.fnName = "hello world";

</script>