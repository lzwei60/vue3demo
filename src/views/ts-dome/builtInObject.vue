<template>
  <div style="text-align: left;">
    <p style="text-align: center">内置对象</p>
    <p>JavaScript中有很多内置对象，它们可以直接在TypeScript中当做定义好了的类型。</p>
    <p>内置对象是指根据标准在全局作用域global上存在的对象，这里的标准指的是ECMAScirpt和其它环境（比如DOM）的标准</p>
    <h1>JS八种内置类型</h1>
    <pre>
      <code>
        let name: string = "AhWei";
        let age: number = 18;
        let isHandsome: boolean = true;
        let u: undefined = undefined;
        let n: null = null;
        let obj: object = {name: "AhWei", age: 18};
        let big: bigint = 100n;
        let sym: symbol = Symbol("AhWei")
      </code>
    </pre>
    <h1>ECMAScript的内置对象</h1>
    <P>比如，Array、Date、Error等。</P>
    <pre>
      <code>
        const nums: Array&lt;number&gt; = [1,2,3]
        const date: Date = new Date();
        const err: Error = new Error("Error!");
        const reg: RegExp = /abc/;
        Math.pow(2,9)
      </code>
    </pre>
    <p>以Array为例，按住comand/ctrl，再鼠标左键点击一下，就能跳转到类型声明的地方。</p>
    <p>可以看到，Array这个类型使用interface定义的，有多个不同版本的.d.ts文件声明了这个类型</p>
    <p>在TS中，重复声明一个interface，会把所有的声明全部合并，这里所有的.d.ts文件合并出来的Array接口，就组合成了Array内置类型的全部属性和功能。</p>
    <h1>DOM和BOM</h1>
    <p>比如HTMLElement、NodeList、MouseEvent等</p>
    <pre>
      <code>
        let body: HTMLElement = documnet.body;
        let allDiv: NodeList = document.querySelectorAll("div");
        document.addEventListener('click', (e: MouseEvent) => {
          e.preventDefault();
          // Do something
        })
      </code>
    </pre>
    <h1>TS核心库的定义文件</h1>
    <p>TypeScript核心库的定义文件中定义了所有浏览器环境需要用到的类型，并且是预置在TypeScript中的。</p>
    <p>比如Math.pow的类型定义如下</p>
    <pre>
      <code>
        interface Math{
           /**
            * Returns the value of a base expression taken to a specified power.
            * @param x The base value of the expression.
            * @param y The exponent value of the expression.
            */
          pow(x:number, y:number):number;
        }
      </code>
    </pre>
    <p>又比如，addEventListener的类型定义如下</p>
    <pre>
      <code>
        interface Document extends Node, GlobalEventHandlers, NodeSelector, DocumentEvent{
          addEventLintener(type: string, listener: (ev: MouseEvent) => any, useCaptrue?: boolean): void;
        }
      </code>
    </pre>
    <p>浅尝辄止，知道在哪里定义就行，真要去分析一些Web Api的类型实现，是很费精力的</p>
  </div>
</template>
<script lang="ts" setup>
import Vue from 'Vue';
// JavaScript中有很多内置对象，它们可以直接在TypeScript中当做定义好了的类型。
// 内置对象是根据标准在全局作用域global上存在的对象，这里的标准指的是ECMAScript和其它环境（比如DOM）的标准
/**
 * JS八种内置类型
 */
let name: string = "AhWei";
let age: number = 18;
let isHandsome: boolean = true;
let u: undefined = undefined;
let n: null = null;
let obj: object = {name: "AhWei", age: 18};
let big: bigint = 100n;
let sym: symbol = Symbol("AhWei")
/**
 * ECMAScript的内置对象
 */
// 比如，Array、Date、Error等。
// 以Array为例，按住comand/ctrl，再鼠标左键点击一下，就能跳转到类型声明的地方。
const nums: Array<number> = [1,2,3]
const date: Date = new Date();
const err: Error = new Error('Error!');
const reg: RegExp = /abc/;
Math.pow(2,9)
// 可以看到，Array这个类型使用interface定义的，有多个不同版本的.d.ts文件声明了这个类型。
// 在TS中，重复声明一个interface，会把所有的声明全部合并，这里所有的.d.ts文件合并出来的Array接口，就组合成了Array内置类型的全部属性和功能。
/**
 * DOM和BOM
 */
// 比如HTMLElement、NodeList、MouseEvent等
let body: HTMLElement = document.body;
let allDiv: NodeList = document.querySelectorAll("div");
document.addEventListener('click', (e:MouseEvent) => {
  e.preventDefault();
  console.log("点击")
})
/**
 * TS核心库的定义文件
 */
// TypeScript核心库的定义文件中定义了所有浏览器环境需要用到的类型，并且是预置在TypeScript中的。
// 比如Math.pow的类型定义如下
interface Math{
  /**
   * Returns the value of a base expression taken to a specified power.
   * @param x The base value of the expression.
   * @param y The exponent value of the expression.
   */
  pow(x: number, y: number):number;
}
// 又比如，addEventListener的类型定义如下
interface Document extends Node, GlobalEventHandlers, NodeSelector, DocumentEvent {
  addEventLintener(type: string, listener:(ev: MouseEvent) => any, useCaptrue?:boolean): void;
}
// 浅尝辄止，知道在哪里定义就行，真要去分析一些Web Api的类型实现，是很费精力的
</script>