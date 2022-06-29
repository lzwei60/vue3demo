<template>
<div style="text-align: left;">
  <p style="text-align: center">函数类型</p>
  <p>TS定义函数类型需要定义输入参数类型和输出类型</p>
  <p>输出类型也可以忽略，因为TS能够根据返回语句自动推断出返回值类型。</p>
  <p>function add(x:number, y:number):number{</p>
  <p>&nbsp;&nbsp;return x + y</p>
  <p>}</p>
  <p>add(1,2)</p>
  <p>函数没有明确返回值的，默认返回void类型</p>
  <p>function welcome():void{</p>
  <p>&nbsp;&nbsp;console.log('hello')</p>
  <p>}</p>
  <h1>函数表达式写法</h1>
  <p>let add2 = (x:number, y:number):number => {</p>
  <p>&nbsp;&nbsp;return x + y</p>
  <p>}</p>
  <h1>可选参数</h1>
  <p>参数后加个问号，代表这个参数是可选的</p>
  <p>注意可选参数要放在函数入参的最后面，不然会导致编译错误。</p>
  <p>function add(x:number, y:number, z?:number):number{</p>
  <p>&nbsp;&nbsp;return x + y</p>
  <p>}</p>
  <p>add(1,2,3);add(1,2)</p>
  <h1>默认参数</h1>
  <p>function add(x:number, y:number = 100):number{</p>
  <p>&nbsp;&nbsp; return x + y</p>
  <p>}</p>
  <p>add(100)</p>
  <p>跟JS的写法一样，在入参里定义初始值</p>
  <p>和可选参数不同的是，默认参数可以不放在函数入参的最后面</p>
  <p>function add(x:number = 100, y:number):number{</p>
  <p>&nbsp;&nbsp; return x + y </p>
  <p>}</p>
  <p>add(100)</p>
  <p>add4函数只传了一个参数，如果理所当然地觉得x有默认值，只传一个就传的是y的话，就会报错：Expected 2 arguments, but got 1.</p>
  <p>编译器会判定你只传了x，没传y</p>
  <p>如果带默认值的参数不是最后一个参数的话，用户必须明确的传入undefined值来获得默认参数值。</p>
  <p>add(undefined, 100)</p>
  <h1>函数赋值</h1>
  <p>JS中变量随便赋值没问题</p>
  <p>但在TS中函数不能随便赋值，会报错的:Type '"123"' is not assignable to type '(x: number, y: number) => number'.</p>
  <p>let add2 = (x:number, y:number):number => {</p>
  <p>&nbsp;&nbsp; return x + y </p>
  <p>}</p>
  <p>add2 = "123"</p>
  <p>也可以用下面这种方式定义一个函数add3，把add2赋值给add3</p>
  <p>let add2  = (x:number, y:number):number =>{</p>
  <p>&nbsp;&nbsp; return x + y</p>
  <p>}</p>
  <p>const add3:(x:number, y:number) => number = add2</p>
  <p>有点像es6中的箭头函数，但不是箭头函数，TS遇到：就知道后面的代码是写类型用的。</p>
  <p>当然，不用定义add7类型直接赋值也可以，TS会在变量赋值的过程中，自动推断类型:const add8: (x: number, y: number) => number</p>
  <p>const add3 = add2; </p>
  <h1>函数重载</h1>
  <p>函数重载是指两个函数名称相同，但是参数个数或参数类型不同，他的好处显而易见，不需要把相似功能的函数拆分成多个函数名称不同的函数</p>
  <br />
  <p>不同的参数类型</p>
  <p>比如我们实现一个add函数，如果传入的参数是数字，就返回数字相加，如果传入参数都是字符串，就返回字符串拼接</p>
  <p>function add(x:number[]):number</p>
  <p>function add(x:string[]):string</p>
  <p>function add(x:any[]):any{</p>
  <p>&nbsp;&nbsp;if(typeof x[0] === 'string'){</p>
  <p>&nbsp;&nbsp;&nbsp;&nbsp;return x.join()</p>
  <p>&nbsp;&nbsp;}</p>
  <p>&nbsp;&nbsp;if(typeof x[0] === 'number'){</p>
  <p>&nbsp;&nbsp;&nbsp;&nbsp;return x.reduce((acc, cur) => acc + cur)</p>
  <p>&nbsp;&nbsp;}</p>
  <p>}</p>
  <p>在TS中，实现函数重载，需要多次声明这个函数，前几次是函数定义，列出所有的情况，最后一次是函数实现，需要比较宽泛的类型，比如例子就用到了any。</p>
  <br />
  <p>不同参数个数</p>
  <p>假设这个add函数接受更多的参数个数，比如还可以传入一个参数y，如果传了y，就把y也加上或者拼接上，就可以这么写</p>
  <p>function add(x:number[]):number</p>
  <p>function add(x:string[]):string</p>
  <p>function add(x:number[], y:number[]):number</p>
  <p>function add(x:string[], y:string[]):string</p>
  <p>function add(x:any[], y?:any[]):any{</p>
  <p>&nbsp;&nbsp;if(Array.isArray(y) && typeof y[0] === 'number'){</p>
  <p>&nbsp;&nbsp;&nbsp;&nbsp;return x.reduce((acc, cur) => acc + cur) + y.reduce((acc, cur) => acc + cur)</p>
  <p>&nbsp;&nbsp;}</p>
  <p>&nbsp;&nbsp;if(Array.isArray(y) && typeof y[0] === 'string'){</p>
  <p>&nbsp;&nbsp;&nbsp;&nbsp;return x.join() + ',' + y.join()</p>
  <p>&nbsp;&nbsp;}</p>
  <p>&nbsp;&nbsp;if(typeof x[0] === 'string'){</p>
  <p>&nbsp;&nbsp;&nbsp;&nbsp;return x.join()</p>
  <p>&nbsp;&nbsp;}</p>
  <p>&nbsp;&nbsp;if(typeof x[0] === 'number'){</p>
  <p>&nbsp;&nbsp;&nbsp;&nbsp;return x.reduce((acc, cur) => acc + cur)</p>
  <p>&nbsp;&nbsp;}</p>
  <p>}</p>
</div>
</template>
<script lang="ts" setup>
import Vue from 'vue'
// TS定义函数类型需要定义输入参数类型和输出类型
// 输出类型也可以忽略，因为TS能够根据返回语句自动推断出返回值类型。
function add(x:number, y:number):number{
  return x + y;
}
console.log("函数类型：",add(1,2));
//函数没有明确返回值，默认返回void类型
function welcome():void{
  console.log('hello');
}
welcome();
/**
 * 函数表达式写法
 */
let add2 = (x:number, y:number):number =>{
  return x + y
}
console.log("函数表达式写法：",add2(1,2));
/**
 * 可选参数
 */
// 参数后加个问号，代表这个参数是可选的
// 注意可选参数要放在函数入参的最后面，不然会导致编译错误
function add3(x:number, y:number, z?:number):number{
  return x + y + (z || 0) 
}
console.log("可选参数：",add3(1,2,3),add3(1,3))
/**
 * 默认参数
 */
// 跟JS的写法一样，在入参里定义初始值
// 和可选参数不同的是，默认参数可以不放在函数入参的最后面
function add4(x:number, y:number = 100):number{
  return x + y
}
console.log("默认参数：",add4(100))
// add4函数只传了一个参数，如果理所当然地觉得x有默认值，只传一个就传的是y的话，就会报错
function add5(x:number = 100, y:number):number{
  return x + y
}
console.log("默认传值错误的方式：",add5(100)) // Expected 2 arguments, but got 1.
// 编译器会判定你只传了x，没传y
// 如果带默认值的参数不是最后一个参数的话，用户必须明确的传入undefined值来获得默认参数值。
console.log("正确的默认参数传值：", add5(undefined, 100));
/**
 * 函数赋值
 */
// JS中变量随便赋值没问题
// 当时在TS中函数不能随便赋值，会报错：Type '"123"' is not assignable to type '(x: number, y: number) => number'.
let add6 = (x:number, y:number):number => {
  return x + y;
}
add6 = "123";
console.log("函数赋值：", add6);
// 也可以用下面这种方式定义一个函数add7函数，把add6赋值给add7
const add7:(x:number, y:number) => number = add6;
console.log("函数赋值只能函数：", add7);
// 有点像es6中的箭头函数，但不是箭头函数，TS遇到：就知道后面的代码是写类型用的。
// 当然，不用定义add7类型直接赋值也可以，TS会在变量赋值的过程中，自动推断类型:const add8: (x: number, y: number) => number
const add8 = add6;
console.log("函数赋值类型自动推断：", add8)
/**
 * 函数重载
 */
// 函数重载是指两个函数名称相同，但是参数个数或参数类型不同，他的好处显而易见，不需要把相似功能的函数拆分成多个函数名称不同的函数
// 不同参数类型
// 在TS中，实现函数重载，需要多次声明这个函数，前几次是函数定义，列出所有的情况，最后一次是函数实现，需要比较宽泛的类型，比如例子就用到了any。
function add9(x:number[]):number
function add9(x:string[]):string
function add9(x:any[]): any{
  if(typeof x[0] === 'string'){
    return x.join()
  }
  if(typeof x[0] === 'number'){
    return x.reduce((acc, cur) => acc + cur);
  }
}
console.log("不同的参数类型：",add9([1,2,3]), add9(["AhWei","是", "帅哥"]))
// 不同的参数个数
// 假设这个add函数接受更多的参数个数，比如还可以传入一个参数y，如果传了y，就把y也加上或者拼接上，就可以这么写
function add10(x:number[]):number
function add10(x:string[]):string
function add10(x:number[], y:number[]):number
function add10(x:string[], y:string[]):string
function add10(x:any[], y?:any[]): any{
  if(Array.isArray(y) && typeof y[0] === 'number'){
    return x.reduce((acc, cur) => acc + cur) + y.reduce((acc, cur) => acc + cur)
  }
  if(Array.isArray(y) && typeof y[0] === 'string'){
    return x.join() + ',' + y.join()
  }
  if(typeof x[0] === 'string'){
    return x.join()
  }
  if(typeof x[0] === 'number'){
    return x.reduce((acc, cur) => acc + cur)
  }
}
console.log("不同的参数个数：", add10([1,2,3]), add10(["AhWei","是", "帅哥"]), add10([1,2,3],[3,4,5]), add10(["AhWei","是", "帅哥"], ["happy", "new", "year"]))

</script>