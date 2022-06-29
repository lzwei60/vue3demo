<template>
  <div style="text-align: left;">
    <p style="text-align: center">类型推论</p>
    <p>TypeScript里，在有些没有明确指出类型的地方，类型推论会帮助提供类型。</p>
    <p>这种推断发生在初始化变量和成员，设置默认参数值和决定函数返回值时。</p>
    <h1>定义时不赋值</h1>
    <pre>
      <code>
        let a; // let a: any
        a = 18;
        a = "lin"
      </code>
    </pre>
    <p>定义时不赋值，就会被TS自动推导成any类型，之后随便怎么赋值都不会报错。</p>
    <h1>初始化变量</h1>
    <pre>
      <code>
        let userName ="AhWei"; // let userName:string
      </code>
    </pre>
    <p>因为赋值的时候赋的是一个字符串类型，所以TS自动推导出userName是string类型。</p>
    <p>这个时候，再更改userName时，就必须是string类型，是其它类型就报错:Type '() => string' is not assignable to type 'string'</p>
    <pre>
      <code>
        let userName = "AhWei"
        userName = function(){ // 
          return "AhWei"
        }
      </code>
    </pre>
    <h1>设置默认参数值</h1>
    <p>函数设置默认参数时，也会自动推导</p>
    <p>比如，定义一个打印年龄的函数，默认值是18</p>
    <pre>
      <code>
        function printAge(num = 18){
          console.log(num);
          return num
        }
      </code>
    </pre>
    <p>那么TS会自动推导出printAge的入参类型，传错了类型会报错:Argument of type '"18"' is not assignable to parameter of type 'number'.</p>
    <pre><code>printAge('18')</code></pre>
    <h1>决定函数返回值</h1>
    <p>决定函数返回值时，TS也会自动推导出返回值类型</p>
    <p>比如一个函数不写返回值</p>
    <pre>
      <code>
        function welcome(){ // function welcome():void
          console.log('hello')
        }
      </code>
    </pre>
    <p>TS自动推导出返回值是void类型</p>
    <p>再比如上文的printAge函数，TS会自动推导出返回值是number类型。</p>
    <p>如果我们给printAge函数的返回值定义为string类型，看看会发生什么。</p>
    <p>很显然，定义的类型和TS自动推导出的类型冲突，报错：Type '(num?: number) => number' is not assignable to type 'PrintAge1'.Type 'number' is not assignable to type 'string'.</p>
    <pre>
      <code>
        function printAge(num = 18){
          console.log(num);
          return num
        }
        interface PrintAge{
          (num: number): string
        }
        const printAge1:PrintAge = printAge
      </code>
    </pre>
    <h1>最佳通用类型</h1>
    <p>当需要从几个表达式中推断类型的时候，会使用这些表达式的类型来推断出一个最合适的通用类型，例如</p>
    <pre>
      <code>
        let arr = [0,1,null,"AhWei"]; // let arr: (string | number | null)[]
      </code>
    </pre>
    <p>又比如</p>
    <pre>
      <code>
        let pets = [new Dog(), new Cat()]; // let pets:(Dog | Cat)[]
      </code>
    </pre>
    <p>虽然TS可以推导出最合适的类型，但最好还是在写的时候就定义好类型，上文的例子，我们可以这么写：</p>
    <pre>
      <code>
        type arrItem = number | string | null;
        let arr: arrItem[] = [0,1,null,"AhWei"];
        let pets: Pets[] = [new Dog(), new Cat()]
      </code>
    </pre>
    <h1>小结</h1>
    <p>类型推论虽然能为我们提供帮助，但既然写了TS，除非是函数默认返回类型void这种大家都知道的，其它的最好每个地方都定义好类型</p>
  </div>
</template>
<script lang="ts" setup>
import Vue from 'vue'
// TypeScript里，在有些没有明确指出类型的地方，类型推论会帮助提供类型。
// 这种推断发生在初始化变量和成员，设置默认参数值和决定函数返回值时。
/**
 * 定义时不赋值
 */
let a; // let a: any
a = 18;
a = "AhWei"
// 定义时不赋值，就会被TS自动推导成any类型，之后随便怎么赋值都不会报错。
/**
 * 初始化变量 
 */
let userName = "AhWei" // let userName: string
// 因为赋值的时候赋的是一个字符串类型，所以TS自动推导出userName是string类型。
// 这个时候，再更改userName时，就必须是string类型，是其它类型就报错:Type '() => string' is not assignable to type 'string'
userName = function(){
  return "AhWei"
}
/**
 * 设置默认参数值
 */
// 函数设置默认参数时，也会自动推导
// 比如，定义一个打印年龄的函数，默认值是18
function printAge(num = 18){
  console.log(num);
  return num
}
// 那么TS会自动推导出printAge的入参类型，传错了类型会报错:Argument of type '"18"' is not assignable to parameter of type 'number'.
printAge("18");
/**
 * 决定函数返回值
 */
// 决定函数返回值时，TS也会自动推导出返回值类型
// 比如一个函数不写返回值
function welcome(){
  console.log("hello")
}
// TS自动推导出返回值是void类型
// 再比如上文的printAge函数，TS会自动推导出返回值是number类型。
// 如果我们给printAge函数的返回值定义为string类型，看看会发生什么。
function printAge1(num = 18){
  console.log(num)
  return num
}
interface PrintAge1{
  (num: number): string
}
const printAge2: PrintAge1 = printAge1
// 很显然，定义的类型和TS自动推导出的类型冲突，报错：Type '(num?: number) => number' is not assignable to type 'PrintAge1'.Type 'number' is not assignable to type 'string'.
/**
 * 最佳通用类型
 */
// 当需要从几个表达式中推断类型时候，会使用这些表达式的类型来推断出一个最合适的通用类型。比如
let Tarr = [0, 1, null, 'AhWei']; //let Tarr: (string | number)[]
// 又比如
//let pets = [new Dog(), new Cat()] // let pets: (Dog | Cat)[]
// 虽然TS可以推导出最合适的类型，但最好还是在写的时候就定义好类型，上文的例子，我们可以这么写：
type arrItem = number | string | null;
let Tarr1: arrItem[] = [0, 1, null, 'AhWei']
/**
 * 小结
 */
// 类型推论虽然能为我们提供帮助，但既然写了TS，除非是函数默认返回类型void这种大家都知道的，其它的最好每个地方都定义好类型
</script>