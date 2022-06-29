<template>
  <div style="text-align: left;">
    <h1>declare</h1>
    <p>当使用第三方库时，很多三方库不是用TS写的，我们需要引用它的声明文件，才能获得对应的代码不全、接口提示等功能。</p>
    <p>比如，在TS中直接使用Vue，就会报错</p>
    <pre>
      <code>
        const app = new Vue({
          el: "#app",
          data: {
            message: "Hello Vue!"
          }
        })
      </code>
    </pre>
    <p>这时，我们可以使用declare关键字来定义Vue的类型，简单写一个模拟一下</p>
    <pre>
      <code>
        interface VueOption{
          el: string,
          data: any
        }
        declare class Vue{
          options: VueOption
          constructor(options: VueOption)
        }
        const app = new Vue({
          el: "#app",
          data: {
            message: "Hello Vue!"
          }
        })
      </code>
    </pre>
    <p>这样就不会报错了，使用declare关键字，相当于告诉TS编译器，这个变量（Vue）的类型已经在其他地方定义了，你直接拿去用，别报错。</p>
    <p>需要注意的是，declare class Vue并没有真的定义一个类，只是定义了类Vue的类型，仅仅会用于编译时的检查，在编译结果中会被删除。它编译结果的是：</p>
    <pre>
      <code>
        const app = new Vue({
          el: "#app",
          data: {
            message: "Hello Vue!"
          }
        })
      </code>
    </pre>
    <h1>.d.ts</h1>
    <p>通常我们会把声明语句放到一个单独的文件（Vue.d.ts）中，这就是声明文件，以.d.ts为后缀。</p>
    <pre>
      <code>
        // src/Vue.d.ts
        interface VueOption {
          el: string,
          data: any
        }
        declare class Vue {
          options: VueOption
          constructor(options: VueOption)
        }
        // src/index.ts
        const app = new Vue({
          el: "#app",
          data: {
            message: "Hello Vue!"
          }
        })
      </code>
    </pre>
    <p>一般来说，ts会解析项目中所有的*.ts文件，当然也包含以.d.ts结尾的文件。所以当我们将Vue.d.ts放到项目中时，其它所有*.ts文件就都可以获得Vue的类型定义了。</p>
    <pre>
      <code>
        /path/to/project
        ├── src
        |  ├── index.ts
        |  └── Vue.d.ts
        └── tsconfig.json
      </code>
    </pre>
    <h1>使用三方库</h1>
    <p>那么当我们使用三方库的时候，是不是所有的三方库都要写一大堆decare的文件呢？</p>
    <p>答案是不一定，要看社区里有没有这个三方库的TS类型包（一般都有）。</p>
    <p>社区使用@types统一管理第三方库的声明文件，是由DefinitelyTyped这个组织统一管理的。</p>
    <p>比如安装lodash的类型包</p>
    <pre><code>npm install @types/lodash -D</code></pre>
    <p>只需要安装了，就可以在TS里正常使用lodash了，别的啥也不用做。</p>
    <p>当然，如果一个库本来就是TS写的，就不用担心类型文件的问题了，比如Vue3</p>
    <h1>自己写声明文件</h1>
    <p>比如你以前写了一个请求小木块myFetch，代码如下</p>
    <pre>
      <code>
        function myFetch(url, method, data){
          return fetch(url, {
            body: data? JSON.stringify(data) : "",
            method
          }).then(res => res.json())
        }
        myFetch.get = (url) => {
          return myFetch(url, "GET")
        }
        myFetch.post = (url, data) => {
          return myFetch(url, 'POST', data)
        }
        export defalut myFetch
      </code>
    </pre>
    <p>现在新项目用了TS了，要在新项目中继续用这个myFetch，你又两个选择：</p>
    <ul>
      <li>用TS重写myFetch，新项目引重写的myFetch</li>
      <li>直接引myFetch，给它写声明文件</li>
    </ul>
    <p>如果选择第二种方案，就可以这么做</p>
    <pre>
      <code>
        type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'
        delcare function myFetch&lt;T = any>(url: string, method: HTTPMethod, data?: any):Promise&lt;T>
        declare namespace myFetch{ // 使用namespace来声明对象的属性和方法
          const get: &lt;T = any>(url: string) => Promise&lt;T>
          const post: &lt;T = any>(url: string, data: any) => Promise&lt;T>
        }
      </code>
    </pre>
    <p>比较麻烦的是需要配置才行，可以有两种选择，</p>
    <ul>
      <li>1、创建一个node_modules/@types/myFetch/index.d.ts文件，存放myFetch模块的声明文件。这种方式不需要额外的配置，但是node_modules目录不稳定，代码也没有被保存到仓库中，无法回溯版本，有不小心被删除的风险，故不太建议用这种方案，一般只用作临时测试。</li>
      <li>2、创建一个types目录，专门用来管理自己写的声明文件，讲myFetch的声明文件放到types/myFetch/index.d.ts中。这种方式需要配置下tsconfig.json中的paths和baseUrl字段。</li>
    </ul>
    <pre>
      <code>
        // tsconfig.json
        {
          "compilerOptions": {
            "module": "commonjs",
            "baseUrl": "./",
            "paths": {
              "*": ["types/*"]
            }
          }
        }
      </code>
    </pre>
    <p>感觉直接使用TS重写比给老项目写声明文件更好，这样就不用专门维护类型模块了。</p>
    <p>平时开发中用到的很多库，现在基本上都用TS重写了。</p>
    <p>本文只是介绍了TS声明文件冰山一角的知识，更多的就去啃官方文档吧。</p>
    <p>觉得官方文档难啃也可以看这篇，但是知识点也很多，也难啃。</p>
    <p>学习了本文的知识，上手项目肯定没问题，能干活急性，学太多头发会掉光的！</p>
  </div>
</template>
<script lang="ts" setup>
import Vue from 'vue'
/**
 * declare
 * 当使用第三方库时，很多三方库不是用TS写的，我们需要引用它的声明文件，才能获得对应的代码不全、接口提示等功能。
 * 比如，在TS中直接使用Vue，就会报错
 */
/*
const app = new Vue({
  el: '#app',
  data: {
    message: "Hello Vue!"
  }
})
*/
// 这时，我们可以使用declare关键字来定义Vue的类型，简单写一个模拟一下
/*
interface VueOption {
  el: string
  data: any
}
declare class Vue {
  options: VueOption
  constructor(options: VueOption)
}
const app = new Vue({
  el: "#app",
  data: {
    message: "Hello Vue!"
  }
})
*/
// 这样就不会报错了，使用declare关键字，相当于告诉TS编译器，这个变量（Vue）的类型已经在其他地方定义了，你直接拿去用，别报错。
// 需要注意的是，declare class Vue 并没有真的定义一个类，只是定义了类Vue的类型，仅仅会用于编译时的检查，在编译结果中会被删除。它的编译结果是：
/**
 * const app = new Vue({
 *   el: "#app",
 *   data: {
 *      message: "Hello Vue!"
 *   }
 * })
 */
/**
 * .d.ts
 * 通常我们会把声明语句放到一个单独的文件（Vue.d.ts）中，这就是声明文件，以d.ts为后缀
 */
// src/Vue.d.ts
/*
interface VueOption{
  el: string,
  data: any
}
declare class Vue {
  options: VueOption
  constructor(options: VueOption)
}
*/
// src/index.ts
/**
const app = new Vue({
  el: "#app",
  data: {
    message: "Hello Vue!"
  }
}) 
 */
//一般来说，ts会解析项目中所有的*.ts文件，当然也包含以.d.ts结尾的文件。所以当我们将Vue.d.ts放到项目中时，其它所有*.ts文件就可以获得Vue的类型定义了。
/**
/path/to/project
├── src
|  ├── index.ts
|  └── Vue.d.ts
└── tsconfig.json
 */
/**
 * 使用三方库
 */
/**
 * 那么当我们使用三方库的时候，是不是所有的三方库都要写一大堆decare的文件呢？
 * 答案是不一定，要看社区里有没有这个三方库的TS类型包（一般都有）。
 * 社区使用@types统一管理第三方库的声明文件，是由DefinitelyTyped这个组织统一管理的。
 * 比如安装lodash的类型包
 * npm install @types/lodash -D
 * 只需要安装了，就可以在TS里正常使用lodash了，别的啥也不用做。
 * 当然，如果一个库本来就是TS写的，就不用担心类型文件的问题了，比如Vue3.
 */
/**
 * 自己写声明文件
 * 比如你以前写了一个请求小木块myFetch，代码如下
 */
/**
fucntion myFetch(url, method, data){
  return fetch(url, {
    body: data? JSON.stringify(data) : "",
    method
  }).then(res => res.json())
}
myFetch.get = (url) => {
  return myFetch(url, 'GET')
}
myFetch.post = (url, data) => {
  return myFetch(url, 'POST', data)
}
export defalut myFetch
 */
/**
 * 现在新项目用了TS了，要在新项目中继续用这个myFetch，你又两个选择：
 * 用TS重写myFetch，新项目引重写的myFetch
 * 直接引myFetch，给它写声明文件
 * 如果选择第二种方案，就可以这么做
 */
/**
type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'
declare function myFetch<T = any>(url: string, method: HTTPMethod, data?:any):Promise<T>
declare namespace myFetch{ // 使用namespace来声明对象下的属性和方法
  const get: <T = any>(url: string) => Promise<T>
  const post: <T = any>(url: string, data: any) => Promise<T>
}
 */
/**
 * 比较麻烦的是需要配置才行，可以有两种选择，
 * 1、创建一个node_modules/@types/myFetch/index.d.ts文件，存放myFetch模块的声明文件。这种方式不需要额外的配置，但是node_modules目录不稳定，代码也没有被保存到仓库中，无法回溯版本，有不小心被删除的风险，故不太建议用这种方案，一般只用作临时测试。
 * 2、创建一个types目录，专门用来管理自己写的声明文件，讲myFetch的声明文件放到types/myFetch/index.d.ts中。这种方式需要配置下tsconfig.json中paths和baseUrl字段。
 */
/**
// tsconfig.json
{
  "compilerOptions": {
    "module": "commonjs",
    "baseUrl": "./",
    "paths": {
      "*": ["types/*"]
    }
  }
}
 */
/**
 * 感觉直接用TS重写比给老项目写声明文件更好，这样就不用专门维护类型模块了。
 * 平时开发中用到的很多库，现在基本上都用TS重写了。
 * 本文只是介绍了TS声明文件冰山一角的知识，更多的就去啃官方文档吧。
 * 觉得官方文档难啃也可以看这篇，但是知识点也很多，也难啃。
 * 学习了本文的知识，上手项目肯定没问题，能干活急性，学太多头发会掉光的！
 */
</script>