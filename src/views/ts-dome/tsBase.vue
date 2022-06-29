<template>
<div style="text-align: left;">
  <p style="text-align: center">ts基础类型</p>
  <div>
    <h1>boolean</h1>
    <p>let isHandsome:boolean = true;</p>
    <p>赋值与定义的不一致，会报错，这就是静态类型的优势，可以提前发现代码中的错误</p>
    <p>let isBoolean:boolean = "string"; // 会报错： Type '"123"' is not assignable to type 'boolean'.</p>
  </div>
  <div>
    <h1>number</h1>
    <p>let age:number = 18;</p>
  </div>
  <div>
    <h1>String</h1>
    <p>let realName:string = "wei";</p>
    <p>let fullName:string = `Ah${realName}`; // 支持模板字符串</p>
  </div>
  <div>
    <h1>nudefined 和 null</h1>
    <p>let u:undefined = undefined; // nudefined类型</p>
    <p>let n:null = null; // null类型</p>
    <p>默认情况下null和undefined是所有类型的子类型。就是说可以把null和nudefined赋值给number类型的变量</p>
    <p>如果指定了--strictNullChecks标记，则null和undefined只能赋值给void和他们自己，否则会报错</p>
    <p>let age1:number = null;</p>
    <p>let realName1:string = undefined;</p>
  </div>
  <div>
    <h1>any</h1>
    <p>不清楚用什么类型，可以使用any类型，这些值可能来自于动态的内容，比如用户输入或者第三方代码库</p>
    <p>不建议使用any，不然就丧失了TS的意义</p>
    <p>let notSure:any = 4;</p>
    <p>notSure = "maybe a string"; // 可以是string类型</p>
    <p>notSure = false; // 可以是boolean类型</p>
    <p>notSure.name; notSure.getName(); 可以随便调用属性和方法</p>
  </div>
  <div>
    <h1>unknown</h1>
    <p>不建议使用 any，当我不知道一个类型具体是什么时，该怎么办？可以使用 unknown 类型</p>
    <p>unknown 类型代表任何类型，它的定义和 any 定义很像，但是它是一个安全类型，使用 unknown 做任何事情都是不合法的。</p>
    <p>function divide(param: any) {<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;return param / 2; <br />
      }
    </p>
    <p>把 param 定义为 any 类型，TS 就能编译通过，没有把潜在的风险暴露出来，万一传的不是 number 类型，不就没有达到预期了吗</p>
    <p>把 param 定义为 unknown 类型 ，TS 编译器就能拦住潜在风险，如下图，</p>
    <p>function divide(param: unknown) { <br />
        &nbsp;&nbsp;&nbsp;&nbsp;return param / 2; // 因为不知道 param 的类型，使用运算符 /，导致报错。<br /> 
        &nbsp;&nbsp;&nbsp;&nbsp;// 再配合类型断言，即可解决这个问题，<br />
        &nbsp;&nbsp;&nbsp;&nbsp;return param as number / 2; <br />
      }
    </p>
  </div>
  <div>
    <h1>void</h1>
    <p>void类型与 any 类型相反，它表示没有任何类型。比如函数没有明确返回值，默认返回 Void 类型</p>
    <p>
      function welcome(): void { <br />
        &nbsp;&nbsp;&nbsp;&nbsp;console.log('hello') <br />
      }
    </p>
  </div>
  <div>
    <h1>never</h1>
    <p>never类型表示的是那些永不存在的值的类型。</p>
    <p>有些情况下值会永不存在，比如，</p>
    <p>如果一个函数执行时抛出了异常，那么这个函数永远不存在返回值，因为抛出异常会直接中断程序运行。</p>
    <p>函数中执行无限循环的代码，使得程序永远无法运行到函数返回值那一步。</p>
    <p>
      // 异常 <br />
      function fn(msg: string): never { <br />
        &nbsp;&nbsp;&nbsp;&nbsp; throw new Error(msg) <br />
      } <br />
      // 死循环 千万别这么写，会内存溢出 <br />
      function fn(): never { <br />
        &nbsp;&nbsp;&nbsp;&nbsp;  while (true) {} <br />
      }
    </p>
  </div>
  <div>
    <h1>数组类型</h1>
    <p>let list: number[] = [1, 2, 3]</p>
    <p>list.push(4); // 可以调用数组上的方法</p>
    <p>数组里的项写错类型会报错 Type 'string' is not assignable to type 'number'</p>
    <p>let list1: number[] = [1,2,'3'];</p>
    <p>push时类型对不上也会报错  Argument of type '"str"' is not assignable to parameter of type 'number'.</p>
    <p>list1.push('str');</p>
  </div>
  <div>
    <h1>元组类型</h1>
    <p>元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。</p>
    <p>let tuple: [number, string] = [18, 'wei'];</p>
    <p>写错类型会报错 Type 'string' is not assignable to type 'number'</p>
    <p>let tuple1: [number, string] = ['18','wei'];</p>
    <p>越界也会报错 Type '[number, string, number]' is not assignable to type '[number, string]'.Types of property 'length' are incompatible. Type '3' is not assignable to type '2'.</p>
    <p>let tuple2: [number, string] = [18, 'wei', 100];</p>
    <p>可以对元组使用数组的方法，比如使用push时，不会有越界报错</p>
    <p>let tuple3: [number, string] = [18, "wei"];</p>
    <p>tuple3.push(100);</p>
    <p>push一个没有定义的类型，会报错 Argument of type 'true' is not assignable to parameter of type 'string | number'.</p>
    <p>let tuple4: [number, string] = [18, 'wei'];</p>
    <p>tuple4.push(true);</p>
  </div>
</div>
</template>
<script lang="ts" setup>
import Vue from 'vue'
  // boolean
  let isHandsome: boolean = true;
  let isBoolean: boolean = "123";
  console.log("boolean：",isHandsome, isBoolean);
  // number
  let age:number = 18;
  console.log("number：",age);
  // string
  let realName:string = "wei";
  let fullName:string = `Ah${realName}`; // 支持模板字符串
  console.log("string：",fullName);
  // nudefined 和 null 类型
  let u:undefined = undefined; // nudefined类型
  let n:null = null; // null类型
  console.log("undefined,null：",u,n)
  // 默认情况下null和undefined是所有类型的子类型。
  // 就是说可以把null和nudefined赋值给number类型的变量
  // 如果指定了--strictNullChecks标记，则null和undefined只能赋值给void和他们自己，否则会报错
  let age1:number = null;
  let realName1:string = undefined;
  console.log("赋值给其它类型的undefined和null：", age1, realName1);
  // 不清楚用什么类型，可以使用any类型，这些值可能来自于动态的内容，比如用户输入或者第三方代码库
  // 不建议使用any，不然就丧失了TS的意义
  let notSure:any = 4;
  notSure = "maybe a string"; // 可以是string类型
  notSure = false; // 可以是boolean类型
  // notSure.name; notSure.getName(); 可以随便调用属性和方法
  console.log("any：", notSure)
  // 不建议使用any，当我不知道一个类型具体是什么时，改怎么办？
  // 可以使用unknown类型
  // unknown类型代表任何类型，它的定义和any定义很像，但是它是一个安全类型，使用unknown做任何事都是不合法的，比如:这样子一个divide函数
  function divide(param: any){
    return param / 2;
  }
  // 把param定义为any类型，TS就能编译通过，没有把潜在的风险暴露出来，万一传的不是number类型，不就没有达到预期了吗。
  // 把param定义为unknown类型，TS编译器就能拦住潜在风险，如：
  function divide1(param: unknown){
    // 因为不知道param类型，使用运算符/，导致报错。
    // The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.
    // return param / 2;
    // 在配合类型断言，即可解决这个问题
    return param as number / 2;
  }
  console.log("unknown：",divide(2), divide1(4))
  // void类型与 any 类型相反，它表示没有任何类型。
  // 比如函数没有明确返回值，默认返回 Void 类型
  function welcome(): void{
    console.log('hello');
  }
  welcome()
  // never类型表示的是那些永不存在的值的类型。
  // 有些情况下值会永不存在，比如：
  // 如果一个函数执行时抛出了异常，那么这个函数永远不存在返回值，因为抛出异常会直接中断程序运行。
  // 函数中执行无限循环的代码，使得程序永远无法运行到函数返回值那一步。
  // 异常
  function fn(msg: string): never{
    //throw new Error(msg);
    console.log(msg)
  }
  // 死循环
  function fn1(msg: string): never{
    // while(true) {}
    console.log(msg)
  }
  console.log("never：", fn("1"), fn1("2"));
  // 没有类型是 never 的子类型，没有类型可以赋值给 never 类型（除了 never 本身之外）。 即使 any也不可以赋值给 never 。
  let test1:never;
  test1 = "lin"; // 报错，Type 'string' is not assignable to type 'never'
  let test2:any;
  let test3:never;
  test3 = test2; // 报错，Type 'any' is not assignable to type 'never'
  console.log(test1, test2, test3)
  let list: number[] = [1,2,3];
  list.push(4); // 可以调用数组的方法
  console.log(list);
  // 数组里的项目写错类型会报错 Type 'string' is not assignable to type 'number'
  let list1: number[] = [1,2,'3'];
  // push时类型对不上也会报错  Argument of type '"str"' is not assignable to parameter of type 'number'.
  list1.push('str');
  console.log(list1)
  // 如果数组想每一项放入不同的数据怎么办？用元组类型
  // 元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同
  let tuple: [number, string] = [18, 'wei'];
  // 写错类型会报错 Type 'string' is not assignable to type 'number'
  let tuple1: [number, string] = ['18','wei'];
  // 越界也会报错 Type '[number, string, number]' is not assignable to type '[number, string]'.Types of property 'length' are incompatible. Type '3' is not assignable to type '2'.
  let tuple2: [number, string] = [18, 'wei', 100];
  console.log(tuple, tuple1, tuple2);
  // 可以对元组使用数组的方法，比如使用push时，不会有越界报错
  let tuple3: [number, string] = [18, "wei"];
  tuple3.push(100);
  console.log(tuple3); // 但是只能够push定义的number或者string类型
  // push一个没有定义的类型，会报错 Argument of type 'true' is not assignable to parameter of type 'string | number'.
  let tuple4: [number, string] = [18, 'wei'];
  tuple4.push(true); 
</script>