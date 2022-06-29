<template>
  <div style="text-align: left;">
    <h1>索引类型</h1>
    <p>从对象中抽取一些属性的值，然后拼接成数组，可以这么写</p>
    <pre>
      <code>
        const userInfo = {
          name: "AhWei",
          age: "18"
        }
        function getValues(userInfo: any, keys: string[]){
          return keys.map(key => userInfo[key])
        }
        // 抽取指定属性的值
        console.log(getValues(userInfo, ['name','age'])) // ["AhWei", '18']
        // 抽取obj中没有的属性
        console.log(getValues(userInfo, ['sex', 'outlook'])) // [undefined, undefined]
      </code>
    </pre>
    <p>虽然obj中并不包含sex和outlook属性，但TS编译器并未报错</p>
    <p>此时使用TS索引类型，对这种情况做类型约束，实现动态属性的检查</p>
    <p>理解索引类型，需先理解keyof（索引查询）、T[K]（索引访问）和extends（泛型约束）。</p>
    <h2>keyof（索引查询）</h2>
    <p>keyof操作符可以用于获取某种类型的所有键，其返回类型是联合类型</p>
    <pre>
      <code>
        interface IPerson {
          name: string
          age: number
        }
        type Test = keyof IPerson; // 'name' | 'age'
      </code>
    </pre>
    <p>上面的例子，Test类型变成了一个字符串字面量</p>
    <h2>T[K]（索引访问）</h2>
    <p>T[K]，表示接口T的属性K所代表的类型</p>
    <pre>
      <code>
        interface IPerson {
          name: string;
          age: number
        }
        let type1: IPerson['name'] // string
        let type2: IPerson['age'] // number
      </code>
    </pre>
    <h2>extends（泛型约束）</h2>
    <p>T extends U，表示泛型变量可以通过继承某个类型，获得某些属性，之前讲过，复习一下</p>
    <pre>
      <code>
        interface ILength {
          length: number
        }
        function printLength&lt;T extends ILength&gt;(arg: T): T{
          console.log(arg.length)
          return arg
        }
      </code>
    </pre>
    <p>这样入参就一定要有length属性，比如str、arr、obj都可以，num就不行</p>
    <pre>
      <code>
        const str = printLength("AhWei");
        const arr = printLength([1,2,3]);
        const obj = printLength({length: 10})
        const num = printLength(10) // 报错：Argument of type 'number' is not assignable to parameter of type 'ILength'
      </code>
    </pre>
    <h2>检查动态属性</h2>
    <p>对索引类型的几个概念了解后，对getValue函数进行改造，实现对象上动态属性的检查。</p>
    <p>改造前</p>
    <pre>
      <code>
        const userInfo = {
          name: "AhWei",
          age: "18"
        }
        function getValues(userInfo: any, keys: string[]){
          return keys.map(key => userInfo[key])
        }
      </code>
    </pre>
    <ul>
      <li>定义泛型T、K，用于约束userInfo和keys</li>
      <li>为K增加一个泛型约束，使K继承userInfo的所有属性的联合类型，既K extends keyof T</li>
    </ul>
    <p>改造后</p>
    <pre>
      <code>
        function getValues&lt;T, K extends keyof T&gt;(userInfo: T, keys:K[]):T[K][]{
          return keys.map(key => userInfo[key])
        }
      </code>
    </pre>
    <p>这样当我们指定不在对象里的属性时，就会报错</p>
    <h1>映射类型</h1>
    <p>TS允许将一个类型映射成另一个类型。</p>
    <h2>in</h2>
    <p>介绍映射类型之前，先介绍一下in操作符，用来对联合类型进行遍历。</p>
    <pre>
      <code>
        type Person = "name" | "school" | "major"
        type Obj = {
          [p in Person]: string
        }
      </code>
    </pre>
    <h2>Partial</h2>
    <p>Partial&lt;T&gt;将T的所有属性映射为可选的，例如</p>
    <pre>
      <code>
        interface IPerson {
          name: string
          age: number
        }
        let p1: IPerson = {
          name: "AhWei",
          age: 18
        }
      </code>
    </pre>
    <p>使用了IPerson接口，就一定要传name和age属性</p>
    <p>使用Partial改造一下，就可以变成可选属性</p>
    <pre>
      <code>
        interface IPerson {
          name: string
          age: number
        }
        type IPartial = Partial&lt;IPerson^gt;
        let p1: IPartial = {} 
      </code>
    </pre>
    <h2>Partial原理</h2>
    <p>Parital的实现用到了in和keyof</p>
    <pre>
      <code>
        /**
         * Make all properties in T optional
         */
        type Partial&lt;T&gt; = {
          [P in keyof T]?: T[P]
        }
      </code>
    </pre>
    <ul>
      <li>[P in keyof T]遍历T上的所有属性</li>
      <li>?:设置属性为可选的</li>
      <li>T[P]设置类型为原来的类型</li>
    </ul>
    <h2>Readonly</h2>
    <p>Readonly&lt;T&gt;将T的所有属性映射为只读的，例如</p>
    <pre>
      <code>
        interface IPerson {
          name: string
          age: number
        }
        type IReadOnly = Readonly&lt;IPerson&gt;
        let p1: IReadOnly = {
          name: "AhWei",
          age: 18
        }
      </code>
    </pre>
    <h2>Readonly原理</h2>
    <p>和Partial几乎完全一样</p>
    <pre>
      <code>
        /**
         * Make all properties in T readonly       
         */
        type Readonly&lt;T&gt; = {
          readonly [P in keyof T]: T[P]
        }
      </code>
    </pre>
    <ul>
      <li>[P in keyof T]遍历T上的所有属性</li>
      <li>readonly设置属性为只读的</li>
      <li>T[P]设置类型为原来的类型</li>
    </ul>
    <h2>Pick</h2>
    <p>Pick用于抽取对象子集，挑选一组属性并组成一个新的类型，例如</p>
    <pre>
      <code>
        interface IPerson {
          name: string
          age: number
          sex: string
        }
        type IPick = Pick&lt;IPerson, 'name' | 'age'&gt;
        let p1: IPick = {
          name: 'AhWei',
          age: 18
        }
      </code>
    </pre>
    <p>这样就把name和age从IPerson中抽取出来</p>
    <h2>Pick原理</h2>
    <pre>
      <code>
        /**
         * From T, pick a set of properties whose keys are in the union K
         */
        type Pick&lt;T, K extends keyof T&gt; = {
          [P in K]: T[P]
        }
      </code>
    </pre>
    <p>Pick映射类型有两个参数：</p>
    <ul>
      <li>第一个参数T，表示要抽取的目标对象</li>
      <li>第二个参数K，具有一个约束：K一定要来自T所有属性自变量的联合类型</li>
    </ul>
    <h2>Record</h2>
    <p>上面三种映射类型官方称为同态，意思是只作用于obj属性而不会引入新的属性</p>
    <p>Record是会创建新属性的非同态映射类型。</p>
    <pre>
      <code>
        interface IPerson {
          name: string
          age: number
        }
        type IRecord = Record&lt;string, IPerson&gt;
        let personMap: IRecord = {
          person1: {
            name: "AhWei",
            age: 18
          },
          person2: {
            name: "liu",
            age: 25
          }
        }
      </code>
    </pre>
    <h2>Record原理</h2>
    <pre>
      <code>
        /**
         * Construct a type with a set of properties K of type T
         */
        type Record&lt;K extends keyof any, T&gt; = {
          [P in K]: T
        }
      </code>
    </pre>
    <p>Record映射类型有两个参数</p>
    <ul>
      <li>第一个参数可以传入继承于any的任何值</li>
      <li>第二个参数，作为新创建对象的值，被传入</li>
    </ul>
    <h1>条件类型</h1>
    <pre>
      <code>
        T extends U ? X : Y
        // 若类型T可被赋值给类型U，那么结果类型就是X类型，否则就是Y类型
      </code>
    </pre>
    <p>Exclude和Extract的实现就用到了条件类型。</p>
    <h2>Exclude</h2>
    <p>Exclude意思是不包含，Exclude&lt;T, U&GT;会返回联合类型T中不包含联合类型U的部分。</p>
    <pre><code>type Test = Exclude&lt;'a' | 'b' | 'c' | 'a'&gt;</code></pre>
    <h2>Exclude原理</h2>
    <pre>
      <code>
        /**
         * Exclude from T those types that are assignable to U
         */
        type Exclude&lt;T, U&GT; = T extends U ? never : T
      </code>
    </pre>
    <ul>
      <li>never表示一个不存在的类型</li>
      <li>never与其它类型的联合后，为其它类型</li>
    </ul>
    <pre><code>type Test = string | number | never</code></pre>
    <h2>Extarct</h2>
    <p>Extarct &lt;T, U&gt;提取联合类型T和联合类型U的所有交集</p>
    <pre><code>type Test = Extarct&lt;'key1' | 'key2'. 'key1'&gt;</code></pre>
    <h2>Extract原理</h2>
    <pre>
      <code>
        /**
         * Extarct from T those types that are assignable to U
         */
        type Extract &lt;T, U&gt; = T extends U ? T : never
      </code>
    </pre>
    <p>懂了Exclude，也就懂了Extract</p>
    <h1>工具类型（Utility Types）</h1>
    <p>为了方便开发者使用，TypeScript内置了一些常用的工具类型</p>
    <p>上文介绍的索引类型、映射类型和条件类型都是工具类型</p>
    <p>除了上文介绍的，再介绍一些常用的，毕竟工具函数遇到了去查就行，死记硬背就太枯燥了，熟能生巧，写多了自然就熟悉了</p>
    <h2>Omit</h2>
    <p>Omit&lt;T, U&gt;从类型T中剔除U中的所有属性</p>
    <pre>
      <code>
        interface IPerson {
          name: string
          age: number
        }
        type IOmit = Omit&lt;IPerson , 'age'&gt;
      </code>
    </pre>
    <p>这样就剔除了IPserson上的age属性。</p>
    <h2>Omit原理</h2>
    <pre>
      <code>
        /**
         * Construct a type with the properties of T except for those in type K
         */
        type Omit&lt;T,K extends keyof any&gt; = 
        Pick&lt;T, Exclude&lt;keyof T, K&gt;&gt;
      </code>
    </pre>
    <p>Pick用于挑选一组属性并组成一个新的类型，Omit是剔除一些属性，留下剩余的，他们俩有点相反的感觉</p>
    <p>那么就可以用Pick和Exclude实现Omit</p>
    <p>当然也可以不用Pick实现</p>
    <pre>
      <code>
        type Omit2&lt;T, K extends keyof any&gt; = {
          [P in Exclude&lt;keyof T, K&gt;]: T[P]
        }
      </code>
    </pre>
    <h2>NonNullable</h2>
    <p>NonNullable&lt;T&gt;用来过滤类型中的null及undefined类型</p>
    <pre>
      <code>
        type T0 = NonNullable&lt;string | number | undefined&gt; // string | number
        type T1 = NonNullable&lt;stringp[] | null | undefined&gt; // string[]
      </code>
    </pre>
    <h2>NonNullable原理</h2>
    <pre>
      <code>
        /**
         * Exclude null and undefined from T
         */
        type NonNullable&lt;T&gt; = 
        T extends null | undefined ? never : T
      </code>
    </pre>
    <ul>
      <li>never表示一个不存在的类型</li>
      <li>never与其它类型的联合后，为其它类型</li>
    </ul>
    <h2>Parameters</h2>
    <p>Parameters获取函数的参数类型，将每个参数类型放在一个元组中</p>
    <pre>
      <code>
        type T1 = Parameters&lt;()=> string&gt; // []
        type T2 = Parameters&lt;(arg: string) => void&gt; // [string]
        type T3 = Parameters&lt;(arg1: string, arg2: string) => void&gt; // [arg1: string, arg2: string]
      </code>
    </pre>
    <h2>Parameters原理</h2>
    <pre>
      <code>
        /**
         * Obtain the parameters of a function type in a tuple
         */
        type Parameters&lt;T extends (...args: any) => any > =
        T extends (...args: infer P) => any ? P : never
      </code>
    </pre>
    <p>在条件类型语句中，可以用infer声明一个类型变量并且对它进行使用。</p>
    <ul>
      <li>Parameters首先约束参数T必须是个函数类型</li>
      <li>判断T是否是函数类型，如果是则使用infer P暂时存一下函数的参数类型，后面的语句直接用P即可得到这个类型并返回，否则就会返回never</li>
    </ul>
    <h2>ReturnType</h2>
    <p>ReturnType获取函数的返回值类型。</p>
    <pre>
      <code>
        type T0 = ReturnType&lt;() => string> // string;
        type T1 = ReturnType&lt;(s: string) => void> // void
      </code>
    </pre>
    <h2>ReturnType原理</h2>
    <pre>
      <code>
        /**
         * Obtain the return type of a function type
         */
        type ReturnType&lt;T extends(...args: any) => any> = 
        T extends (...args: any) => infer R ? R : any
      </code>
    </pre>
    <p>懂了Parameters，也就懂了ReturnType</p>
    <ul>
      <li>ReturnType首先约束参数T必须是个函数类型</li>
      <li>判断T是否是函数类型，如果是则使用infer R暂时存一下函数的返回值类型，后面的语句直接用R即可得到这个类型并返回，否则就返回any</li>
    </ul>
    <h1>类型体操是什么？</h1>
    <p>在本节中，我们熟悉了很多工具类想的作用和原理，其实已经在不知不觉中做了一些类型体操了。</p>
    <p>TypeScript高级类型会根据类型参数求出新的类型，这个过程会涉及一系列的类型计算逻辑，这些类型计算逻辑就叫做类型体操。当然，这并不是一个正式的概念，只是社区的戏称，因为有的类型计算逻辑是比较复杂的。</p>
    <p>想一想我们之前研究的这些工具类型，都是在对类型做计算返回新的类型啊。</p>
    <p>TS是一门图灵完备的编程语言，即类型的可编码化，可以通过代码逻辑生成指定的各种类型，基于这点，才会有各种类型体操。</p>
    <p>个人觉得TS类型体操这种东西，我们这些搬砖人不必像刷算法一样刻意去训练，浅尝辄止，了解即可。</p>
  </div>
</template>
<script lang="ts" setup>
import Vue from 'vue'
/**
 * 索引类型
 */
// 从对象中抽取一些属性的值，然后拼接成数组，可以这么写
const userInfo = {
  name: 'AhWei',
  age: '18'
}
function getValues(userInfo: any, keys: string[]){
  return keys.map(key => userInfo[key])
}
// 抽取指定属性的值
console.log(getValues(userInfo, ['name', 'age'])); // ['AhWei', '18']
// 抽取obj中没有的属性
console.log(getValues(userInfo, ['sex', 'outlook'])) // [undefined, undefined]
// 虽然obj中并不包含sex和outlook属性，但TS编译器并未报错
// 此时使用TS索引类型，对这种情况做类型约束，实现动态属性的检查
// 理解索引类型，需先理解keyof（索引查询）、T[K]（索引访问）和extends（泛型约束）。
/**
 * keyof（索引查询）
 */
// keyof操作符可以用于获取某种类型的所有键，其返回类型是联合类型
interface IPerson {
  name: string;
  age: number;
}
type Test = keyof IPerson; // 'name' | 'age'
// 上面的例子，Test类型变成了一个字符串字面量
/**
 * T[K]（索引访问）
 */
// T[K]，表示接口T的属性K所代表的类型
interface IPerson1 {
  name: string;
  age: number;
}
let type1: IPerson['name'] // string
let type2: IPerson['age'] // number
/**
 * extends（泛型约束）
 */
// T extends U，表示泛型变量可以通过继承某个类型，获得某些属性，之前讲过，复习一下
interface ILength {
  length: number
}
function printLength<T extends ILength>(arg: T): T{
  console.log(arg.length);
  return arg
}
// 这样入参就一定要有length属性，比如str， arr，obj都可以，num就不行。
const str = printLength('AhWei')
const arr = printLength([1,2,3])
const obj = printLength({ length: 10 })
const num = printLength(10) // 报错：Argument of type '10' is not assignable to parameter of type 'ILength'
/**
 * 检查动态属性
 */
// 对所以类型的几个概念了解后，对getValue函数进行改造，实现对象上动态熟悉的检查。
// 改造前
const userInfo1 = {
  name: 'AhWei',
  age: '18'
}
function getValues1(userInfo1: any, keys: string[]){
  return keys.map(key => userInfo1[key])
}
/**
 * 定义泛型T、K，用于约束userInfo和keys
 * 为K增加一个泛型约束，使K继承userInfo的所有属性的联合类型，既K extends keyof T
 */
// 改造后
function getValues2<T, K extends keyof T>(userInfo: T, keys: K[]): T[K][]{
  return keys.map(key => userInfo[key])
}
// 这样当我们指定不在对象里的属性时，就会报错:ype 'string' is not assignable to type '"name" | "age"'
getValues2(userInfo, ['sex', 'outlook']);
/**
 * 映射类型
 */
// TS允许将一个类型映射成另一个类型。
/**
 * in
 */
// 介绍映射类型之前，先介绍一下in操作符，用来对联合类型进行遍历。
type Person = 'name' | 'school' | 'major';
type Obj = {
  [p in Person]: string
}
/**
 * Partial
 */
// Partial<T>将T的所有属性映射为可选的，例如
interface IPerson2 {
  name: string
  age: number
}
let p2: IPerson2 = {
  name: 'AhWei',
  age: 18
} 
// 使用了IPerson接口，就一定要传name和age属性
// 使用Partial改造一下，就可以变成可选属性
interface IPerson3 {
  name: string
  age: number
}
type IPartial = Partial<IPerson3>
let p3: IPartial = {}
/**
 * Parital原理
 */
// Parital的实现用到了in和keyof
/**
 * Makk all properties in T optional
 */
type Partial<T> = {
  [P in keyof T]?: T[P]
}
/**
 * [P in keyof T]遍历T上的所有属性
 * ?:设置属性为可选的
 * T[P]设置类型为原来的类型
 */
/**
 * Readonly
 */
// Readonly<T>将T的所有属性映射为只读的，例如
interface IPerson4 {
  name: string
  age: number
}
type IReadOnly = Readonly<IPerson4>
let p4: IReadOnly = {
  name: 'AhWei',
  age: 18
}
p4.name = "xxx"; // Cannot assign to 'name' because it is a read-only property.
console.log(p4.name, p4.age)
/**
 * Readonly原理
 */
// 和Partial几乎完全一样
/**
 * Make all properties in T readonly
 */
// type Readonly<T> = {
//   readonly [P in keyof T]: T[P]
// }
/**
 * [P in keyof T]遍历T上的所有属性
 * readonly设置属性为只读的
 * T[P]设置类型为原来的类型
 */
/**
 * Pick
 */
// Pick用于抽取对向集，挑选一组属性并组成一个新的类型，例如
interface IPerson5 {
  name: string
  age: number
  sex: string
}
type IPick = Pick<IPerson5, 'name' | 'age'>
let p5: IPick = {
  name: 'AhWei',
  age: 18
}
// 这样就把name和age从IPerson中抽取出来
/**
 * Pick原理
 */
/**
 * Form T, pick a set of properties whose keys are in the union K
 */
// type Pick<T, K extends keyof T> = {
//   [P in K]: T[P]
// }
/**
 * Pick映射类型有两个参数：
 * 第一个参数T，表示要抽取的目标对象
 * 第二个参数K，具有一个约束：K一定要来自T所有属性自变量的联合类型
 */
/**
 * Record
 */
// 上面三种映射类型官方称为同态，意思是只作用于obj属性而不会引入新的属性
// Record是会创建新属性的非同态映射类型。
interface IPerson6 {
  name: string
  age: number
}
type IRecord = Record<string, IPerson6>
let PersonMap: IRecord = {
  person1: {
    name: "AhWei",
    age: 18
  },
  person2: {
    name: "Bei",
    age: 18
  }
}
/**
 * Record原理
 * Construct a type with a set of properties K of type T
 */
// type Record<k extends keyof any, T> = {
//   [P in K]: T
// }
/**
 * Record映射类型有两个参数：
 * 第一个参数可以传入继承于any的任何职
 * 第二个参数，作为新创建对象的值，被传入
 */
/**
 * 条件类型
 */
// T extends U ? X : Y
// 若类型T可悲赋值给类型U，那么结果类型就是X类型，否则就是Y类型
// Exclude和Rxtract的实现就用到了条件类型
/**
 * Exclude
 */
// Exclude意思是不包含，Exclude<T,U>，会返回联合类型T中不包含联合类型U的部分。
type Test1 = Exclude<"a" | "b" | "c" , "a">
let t: Test1
/**
 * Exclude原理
 * Exclude from T those types that are assignable to U
 * type Exclude<T, U> = T extends U ? never : T
 */
/**
 * never表示一个不存在的类型
 * never与其他类型的联合后，为其它类型
 */
type Test2 = string | number | never
/**
 * Extract
 * Extract<T, U>提取联合类型T和联合类型U的所有交集
 */
type Test3 = Extract<"key1" | "key2", "key1">
let t1: Test3;
/**
 * Exrtact原理
 * Extract from T those types  that are assignable to U
 * type Extract<T, U> = T extends U ? T: never
 * 懂了Exclude，也就懂了Extract
 */
/**
 * 工具类型（Utility Types）
 * 为了方便开发者使用，TypeScript内置了一些常用的工具类型
 * 上文介绍的索引类型、映射类型和条件类型都是工具类型
 * 除了上文介绍的，再介绍一些常用的，毕竟工具函数遇到了去查就行，死记硬背就太枯燥了，熟能生巧，写多了自然就熟悉了
 */
/**
 * Omit
 * Omit<T, U>从类型T中剔除U中的所有属性
 */
interface IPerson7 {
  name: string
  age: number
}
type IOmit = Omit<IPerson7, "age">
// 这样就剔除了IPserson上的age属性。
/**
 * Omit原理
 * Construct a type with the properties of T except for those in type K
 * type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>
 * Pick用于挑选一组属性并组成一个新的类型，Omit是剔除一些属性，留下剩余的，他们俩有点相反的感觉
 * 那么就可以用Pick和Exclude实现Omit
 * 当然也可以不用Pick实现
 * type Omit2<T, K extends keyof any> ={
 *  [P in Exclude<keyof T,K>]: T[P]
 * }
 */
/**
 * NonNullable
 * NonNullable<T>用来过滤类型中的null及undefined类型
 */
type T0 = NonNullable<string | number | undefined>; // string | number
type T1 = NonNullable<string[] | null | undefined>; // string[]
/**
 * NonNullable原理
 * Exclude null and undefined from T
 * type NonNullable<T> = 
 * T extends null | undefined ? never : T
 * never表示一个不存在的类型
 * never与其他类型的联合后，为其它类型
 */
/**
 * Parameters
 * Parameters
 * 获取函数的参数类型，将每个参数类型放在一个元组中
 */
type T2 = Parameters<()=> string> // []
type T3 = Parameters<(arg: string) => void> // [string]
type T4 = Parameters<(arg1: string, arg2: number) => void> // [arg1: string, arg2: number]
/**
 * Parameters原理
 * Obtain the parameters of a function type in a tuple
 * type Parameters<T extends (...args: any) => any> =
 * T extends (...args: infer P) => any ? P: never
 * 在条件类型语句中，可以用infer声明一个类型变量并且对它进行使用。
 * Parameters首先约束参数T必须是个函数类型
 * 判断T是否是函数类型，如果是则使用infer P 暂时存一下函数的参数类型，后面的语句直接用P即可得到这个类型并返回，否则就返回never
 */
/**
 * ReturnType
 * ReturnType 获取函数的返回值类型
 */
type T5 = ReturnType<() => string> // string
type T6 = ReturnType<(s: string) => void> // void
/**
 * ReturnType原理
 * Obtain the return type of a function type
 * type ReturnType<T extends (...args: any) => any> =
 * T extends (...args: any) => infer R ? R : any
 * 懂了Parameters，也就懂了ReturnType
 * ReturnType首先约束参数T必须是个函数类型
 * 判断T是否是函数类型，如果是则使用infer R暂时存一下函数的返回值类型，后面的语句直接用R即可得到这个类型并返回，否则就返回any
 */
/**
 * 类型体操是什么
 * 在本节中，我们熟悉了很多工具类想的作用和原理，其实已经在不知不觉中做了一些类型体操了。
 * TypeScript高级类型会根据类型参数求出新的类型，这个过程会涉及一系列的类型计算逻辑，这些类型计算逻辑就叫做类型体操。当然，这并不是一个正式的概念，只是社区的戏称，因为有的类型计算逻辑是比较复杂的。
 * 想一想我们之前研究的这些工具类型，都是在对类型做计算返回新的类型啊。
 * TS是一门图灵完备的编程语言，即类型的可编码化，可以通过代码逻辑生成指定的各种类型，基于这点，才会有各种类型体操。
 * 个人觉得TS类型体操这种东西，我们这些搬砖人不必像刷算法一样刻意去训练，浅尝辄止，了解即可。
 */
</script>