<template>
  <div style="text-align: left;">
    <p style="text-align: center">类</p>
    <h1>基本写法</h1>
    <p>定义一个Person类，有属性name和方法speak</p>
    <p>class Person {</p>
    <p>&nbsp;&nbsp;name: string</p>
    <p>&nbsp;&nbsp;constructor(name: string) {</p>
    <p>&nbsp;&nbsp;&nbsp;&nbsp;this.name = name</p>
    <p>&nbsp;&nbsp;}</p>
    <p>&nbsp;&nbsp;speak(){</p>
    <p>&nbsp;&nbsp;&nbsp;&nbsp;console.log(`${this.name} is speaking`)</p>
    <p>&nbsp;&nbsp;}</p>
    <p>}</p>
    <p>const p1 = new Person('AhWei') // 新建实例</p>
    <p>p1.name                        // 访问属性和方法</p>
    <p>p1.speak()</p>
    <h1>继承</h1>
    <p>使用extends关键字实现继承，定义一个Student类继承Person类。</p>
    <p>继承之后，Student类上的实例可以访问Person类上的属性和方法。</p>
    <p>class Student extends Person{</p>
    <p>&nbsp;&nbsp;study(){</p>
    <p>&nbsp;&nbsp;&nbsp;&nbsp;console.log(`${this.name} needs study`)</p>
    <p>&nbsp;&nbsp;}</p>
    <p>}</p>
    <p>cosnt s1 = new Student('AhWei')</p>
    <p>s1.study()</p>
    <h1>super关键字</h1>
    <p>注意，上例中Student类没有定义自己的属性，可以不写super，但是如果Student类有自己的属性，就要用到super关键字来把父类的属性继承过来。</p>
    <p>比如，Student类新增一个grade（成绩）属性，就要这么写：</p>
    <p>不写super会报错：Constructors for derived classes must contain a 'super' call.</p>
    <p>class Student extends Person{</p>
    <p>&nbsp;&nbsp;grade: number</p>
    <p>&nbsp;&nbsp;constructor(name: string, grade: number){</p>
    <p>&nbsp;&nbsp;&nbsp;&nbsp;super(name)</p>
    <p>&nbsp;&nbsp;&nbsp;&nbsp;this.grade = grade</p>
    <p>&nbsp;&nbsp;}</p>
    <p>}</p>
    <p>const s1 = new Student('AhWei', 100)</p>
    <h1>多态</h1>
    <p>子类对父类的方法进行了重写，子类和父类调用同一个方法时会不一样</p>
    <p>TS中一般对抽象方法实现多态，详细见后文抽象类</p>
    <p>class Student extends Person{</p>
    <p>&nbsp;&nbsp;speak(){</p>
    <p>&nbsp;&nbsp;&nbsp;&nbsp;return `Student ${super.speak()}`</p>
    <p>&nbsp;&nbsp;}</p>
    <p>}</p>
    <h1>public</h1>
    <p>public，公有的，一个类里默认所有的方法和属性都是public</p>
    <p>比如上文中定义的Person类，其实是这样子的：</p>
    <p>pulic可写可不写，不写默认也是public</p>
    <p>class Person {</p>
    <p>&nbsp;&nbsp;public name: string</p>
    <p>&nbsp;&nbsp;public constructor(name: string) </p>
    <p>&nbsp;&nbsp;&nbsp;&nbsp;this.name = name</p>
    <p>&nbsp;&nbsp;}</p>
    <p>&nbsp;&nbsp;public speak(){</p>
    <p>&nbsp;&nbsp;&nbsp;&nbsp;console.log(`${this.name} is speaking`)</p>
    <p>&nbsp;&nbsp;}</p>
    <p>}</p>
    <h1>private</h1>
    <p>private，私有的，只属于这个类自己，它的实例和继承它的子类都访问不到。</p>
    <p>将Person类的name属性改为private</p>
    <p>class Person {</p>
    <p>&nbsp;&nbsp;private name: string</p>
    <p>&nbsp;&nbsp;public constructor(name: string){</p>
    <p>&nbsp;&nbsp;&nbsp;&nbsp;this.name = name</p>
    <p>&nbsp;&nbsp;}</p>
    <p>&nbsp;&nbsp;public speak(){</p>
    <p>&nbsp;&nbsp;&nbsp;&nbsp;console.log(`${this.name} is speaking`)</p>
    <p>&nbsp;&nbsp;}</p>
    <p>}</p>
    <p>实例访问name属性，会报错：Property 'name' is private and only accessible within class 'Person'.</p>
    <p>继承它的子类，访问name属性，会报错：Property 'name' is private and only accessible within class 'Person'</p>
    <p>class Student extends Person {</p>
    <p>&nbsp;&nbsp;study(){</p>
    <p>&nbsp;&nbsp;&nbsp;&nbsp;console.log(`${this.name} needs study`)</p>
    <p>&nbsp;&nbsp;}</p>
    <p>}</p>
    <h1>protected</h1>
    <p>protected 受保护的，基层它的子类可以访问，实例不能访问</p>
    <p>将Person类的name属性改为protected</p>
    <p>class Person {</p>
    <p>&nbsp;&nbsp;protected name: string</p>
    <p>&nbsp;&nbsp;public cunstructor(name: string){</p>
    <p>&nbsp;&nbsp;&nbsp;&nbsp;this.name = name</p>
    <p>&nbsp;&nbsp;}</p>
    <p>&nbsp;&nbsp;public speak(){</p>
    <p>&nbsp;&nbsp;&nbsp;&nbsp;console.log(`${this.name} needs speaking`)</p>
    <p>&nbsp;&nbsp;}</p>
    <p>}</p>
    <p>实例访问name属性，会报错：Property 'name' is protected and only accessible within class 'Person' and its subclasses.</p>
    <p>const p1 = new Person('AhWei')</p>
    <p>p1.name</p>
    <p>子类可以访问</p>
    <p>class Student extends Person {</p>
    <p>&nbsp;&nbsp;study(){</p>
    <p>&nbsp;&nbsp;&nbsp;&nbsp;console.log(`${this.name} needs study`)</p>
    <p>&nbsp;&nbsp;}</p>
    <p>}</p>
    <h1>static</h1>
    <p>static 是静态属性，可以理解为是类上的一些常量，实例不能访问</p>
    <p>比如一个Circle类，圆周率是3.14，可以直接定义一个静态属性</p>
    <p>class Circle{</p>
    <p>&nbsp;&nbsp;static pi = 3.14</p>
    <p>&nbsp;&nbsp;public radius: number</p>
    <p>&nbsp;&nbsp;public constructor(radius:number){</p>
    <p>&nbsp;&nbsp;&nbsp;&nbsp;this.radius = radius</p>
    <p>&nbsp;&nbsp;}</p>
    <p>&nbsp;&nbsp;public calcLength(){</p>
    <p>&nbsp;&nbsp;&nbsp;&nbsp;return CirCle.pi * this.radius * 2</p>
    <p>&nbsp;&nbsp;}</p>
    <p>}</p>
    <p>实例访问，会报错：Property 'pi' is a static member of type 'Circle'</p>
    <p>const c1 = new Circle(10)</p>
    <p>c1.pi</p>
    <h1>抽象类</h1>
    <p>抽象类，听名字似乎是飞车难理解的概念，但其实非常简单。</p>
    <p>TS通过public、private、protected 三个修饰符来增强了JS中的类。</p>
    <p>其实TS还对JS扩展了一个新概念————抽象类。</p>
    <p>所谓抽象类，是指只能被继承，但是不能被实例化的类，就这么简单。</p>
    <p>抽象类有两个特点：</p>
    <ul>
      <li>抽象类不允许被实例化</li>
      <li>抽象类的抽象方法必须被子类实现</li>
    </ul>
    <p>抽象类用一个abstract关键字来定义，我们通过两个例子来感受一下抽象类的两个特点。</p>
    <h2>抽象类不允许被实例化</h2>
    <p>定义一个抽象类Animal，初始化一个Animal的实例，直接报错：Cannot create an instance of an abstract class.</p>
    <p>abstract class Animal{}</p>
    <p>const a = new Animal()</p>
    <h2>抽象类中的抽象方法必须被子类实现</h2>
    <p>定义一个Dog类，继承自Animal类，但是却没有实现Animal类上的抽象方法sayHi，报错：Non-abstract class 'Dog' does not implement inherited abstract member 'sayHi' from class 'Animal1</p>
    <p>abstract class Animal{</p>
    <p>&nbsp;&nbsp;constructor(name:string){</p>
    <p>&nbsp;&nbsp;&nbsp;&nbsp;this.name = name</p>
    <p>&nbsp;&nbsp;}</p>
    <p>&nbsp;&nbsp;public name: string</p>
    <p>&nbsp;&nbsp;public abstract sayHi():void</p>
    <p>}</p>
    <p>class Dog extends Animal{</p>
    <p>&nbsp;&nbsp;constructor(name:string){</p>
    <p>&nbsp;&nbsp;&nbsp;&nbsp;super(name)</p>
    <p>&nbsp;&nbsp;}</p>
    <p>}</p>
    <p>正确的用法如下</p>
    <p>abstract class Animal{</p>
    <p>&nbsp;&nbsp;constructor(name:string){</p>
    <p>&nbsp;&nbsp;&nbsp;&nbsp;this.name = name</p>
    <p>&nbsp;&nbsp;}</p>
    <p>&nbsp;&nbsp;public name:string</p>
    <p>&nbsp;&nbsp;public abstract sayHi():void</p>
    <p>}</p>
    <p>class Dog extends Animal {</p>
    <p>&nbsp;&nbsp;constructor(name:string){</p>
    <p>&nbsp;&nbsp;&nbsp;&nbsp;super(name)</p>
    <p>&nbsp;&nbsp;}</p>
    <p>&nbsp;&nbsp;public sayHi(){</p>
    <p>&nbsp;&nbsp;&nbsp;&nbsp;console.log("wang")</p>
    <p>&nbsp;&nbsp;}</p>
    <p>}</p>
    <h2>为什么叫抽象类</h2>
    <p>很显然，抽象类是一个广泛和抽象的概念，不是一个实体，就比如上文的例子，动物这个概念很广泛，猫、狗、狮子都是动物，但是动物却不好是一个实例，实例只能是猫、狗或者狮子。</p>
    <p>官方一点的说法是，在面向对象的概念中，所有的对象都是通过类来描绘的，但是反过来，不是所有的类都是用来描绘对象的，如果一个类中没有包含足够的信息来描绘一个具体的对象，这样的类就是抽象类。</p>
    <p>比如ANIMAL类只是具有动物都有的一些属性和方法，但不会具体到包含猫或者狗的属性和方法。</p>
    <p>所以抽象类的用法是用来定义一个基类，声明共有属性和方法，拿去被继承。</p>
    <p>抽象类的好处是可以抽离出事物的共性，有利于代码的复用。</p>
    <h2>抽象方法和多态</h2>
    <p>多态是面向对象的三大基本特征之一。</p>
    <p>多态指的是，父类定义一个抽象方法，在多个子类中有不同的实现，运行的时候不同的子类就会对应不同的操作，比如。</p>
    <p>abstract class Animal{</p>
    <p>&nbsp;&nbsp;constructor(name:string){</p>
    <p>&nbsp;&nbsp;&nbsp;&nbsp;this.name = name</p>
    <p>&nbsp;&nbsp;}</p>
    <p>&nbsp;&nbsp;public name: string</p>
    <p>&nbsp;&nbsp;public abstract sayHi():void</p>
    <p>}</p>
    <p>class Dog extends Animal{</p>
    <p>&nbsp;&nbsp;constructor(name:string){</p>
    <p>&nbsp;&nbsp;&nbsp;&nbsp;super(name)</p>
    <p>&nbsp;&nbsp;}</p>
    <p>&nbsp;&nbsp;public sayHi(){</p>
    <p>&nbsp;&nbsp;&nbsp;&nbsp;console.log("wang")</p>
    <p>&nbsp;&nbsp;}</p>
    <p>}</p>
    <p>class Cat extends Animal{</p>
    <p>&nbsp;&nbsp;constructor(name:string){</p>
    <p>&nbsp;&nbsp;&nbsp;&nbsp;super(name)</p>
    <p>&nbsp;&nbsp;}</p>
    <p>&nbsp;&nbsp;public sayHi(){</p>
    <p>&nbsp;&nbsp;&nbsp;&nbsp;console.log('miao')</p>
    <p>&nbsp;&nbsp;}</p>
    <p>}</p>
    <p>Dog类和Cat类都继承自Animal类，Dog类和Cat类都不同的实现了sayHi这个方法</p>
    <h1>this类型</h1>
    <p>接下来，我们介绍一种特殊的类型，this类型。</p>
    <p>类的成员方法可以直接返回一个this，这样就可以很方便地实现链式调用。</p>
    <h2>链式调用</h2>
    <p>class StudyStep{</p>
    <p>&nbsp;&nbsp;step1(){</p>
    <p>&nbsp;&nbsp;&nbsp;&nbsp;console.log('listen')</p>
    <p>&nbsp;&nbsp;&nbsp;&nbsp;return this</p>
    <p>&nbsp;&nbsp;}</p>
    <p>&nbsp;&nbsp;step2(){</p>
    <p>&nbsp;&nbsp;&nbsp;&nbsp;console.log('write')</p>
    <p>&nbsp;&nbsp;&nbsp;&nbsp;return this</p>
    <p>&nbsp;&nbsp;}</p>
    <p>}</p>
    <p>const s = new StudyStep()</p>
    <p>s.step1().step2() // 链式调用</p>
    <h2>灵活调用子类父类方法</h2>
    <p>在继承的时候，this可以表示父类型，也可以表示子类型</p>
    <p>class StudyStep{</p>
    <p>&nbsp;&nbsp;step1(){</p>
    <p>&nbsp;&nbsp;&nbsp;&nbsp;console.log('listen')</p>
    <p>&nbsp;&nbsp;&nbsp;&nbsp;return this</p>
    <p>&nbsp;&nbsp;}</p>
    <p>&nbsp;&nbsp;step2(){</p>
    <p>&nbsp;&nbsp;&nbsp;&nbsp;console.log('write')</p>
    <p>&nbsp;&nbsp;&nbsp;&nbsp;return this</p>
    <p>&nbsp;&nbsp;}</p>
    <p>}</p>
    <p>class MyStudyStep extends StudyStep{</p>
    <p>&nbsp;&nbsp;next(){</p>
    <p>&nbsp;&nbsp;&nbsp;&nbsp;console.log('before done, study next!')</p>
    <p>&nbsp;&nbsp;&nbsp;&nbsp;return this</p>
    <p>&nbsp;&nbsp;}</p>
    <p>}</p>
    <p>const m = new MyStudyStep()</p>
    <p>m.step1().next().step2().next() // 父类型和子类型上的方法都可以随意调用</p>
    <p>这样就保持了父类和子类之间接口调用的连贯性</p>
  </div>
</template>
<script lang="ts" setup>
import Vue from 'vue'
/**
 * 基本写法
 */
// 定义一个Person类，有属性name和方法speak
class Person {
  name: string
  constructor(name: string){
    this.name = name;
  }
  speak(){
    console.log(`${this.name} is speaking`)
  }
}
let person1 = new Person('AhWei');
person1.speak();
console.log(person1.name);
/**
 * 继承
 */
// 使用extends 关键字实现继承，定义一个Student类继承自Person类。
// 继承之后，Student类上的实例可以访问Person类上的属性和方法。
class Student extends Person {
  study(){
    console.log(`${this.name} needs study`)
  }
}
const student = new Student('AhWei')
student.study();
/**
 * super关键字
 */
// 注意，上例中Student类没有定义自己的属性，可以不写super，但是如果Student类有自己的属性，就要用到super关键字来把父类的属性继承过来。
// 比如 Student类新增一个grade（成绩）属性，就要这么写：
// 不写super会报错：Constructors for derived classes must contain a 'super' call.
class Student1 extends Person{
  grade: number
  constructor(name: string, grade:number){
    super(name)
    this.grade = grade
  }
  study(){
    console.log(`${this.name} 的成绩是 ${this.grade}`)
  }
}
const student1 = new Student1('AhWei', 100);
student1.study()
/**
 * 多态
 */
// 子类对父类的方法进行了重写，子类和父类调用同一个方法时会不一样
// TS中一般对抽象方法实现多态，详细见后文抽象类
class Student2 extends Person{
  speak(){
    return `Student ${super.speak()}`
  }
}
const student2 = new Student2('AhWei')
console.log(student2.speak())
/**
 * public
 */
// public，公有的，一个类里默认所有的方法和属性都是public
// public 
// 比如上文中定义的Person类，其实是这样子的：
// public可写可不写，不写默认也是public
class Person1{
  public name: string
  public constructor(name: string){
    this.name = name
  }
  public speak(){
    console.log(`${this.name} is speaking`)
  }
}
/**
 * private
 */
// private，私有的，只属于这个类自己，它的实例和继承它的子类都访问不到。
// 将Person类的name属性改为private
class Person2 {
  private name1: string
  public constructor(name:string){
    this.name1 = name
  }
  public speak(){
    console.log(`${this.name} is speaking`)
  }
}
// 实例访问name属性，会报错:Property 'name1' is private and only accessible within class 'Person2'.
const person2 = new Person2('AhWei');
person2.name1;
// 继承它的子类，访问name属性，会报错:Property 'name1' is private and only accessible within class 'Person2'
class Student3 extends Person2 {
  study(){
    console.log(`${this.name1} needs study`)
  }
}
/**
 * protected
 */
// protected 受保护的，基层它的子类可以访问，实例不能访问
// 将Person类的name属性改为protected
class Person3 {
  protected name: string
  public constructor(name: string){
    this.name = name
  }
  public speak(){
    console.log(`${this.name} is speaking`)
  }
}
// 实例访问name属性，会报错:Property 'name' is protected and only accessible within class 'Person3' and its subclasses.
const person3 = new Person3('AhWei');
person3.name;
// 子类可以访问
class Student4 extends Person3{
  study(){
    console.log(`${this.name} needs study`)
  }
}
/**
 * static
 */
// static 是静态属性，可以理解为是类上的一些常量，实例不能访问
// 比如一个Circle类，圆周率是3.14，可以直接定义一个静态属性
class Circle {
  static pi = 3.14
  public radius: number
  public constructor(radius: number){
    this.radius = radius
  }
  public calcLength(){
    return Circle.pi * this.radius * 2 // 计算周长，直接访问Circle.pi
  }
}
// 实例访问，会报错:Property 'pi' is a static member of type 'Circle'
const circle = new Circle(10);
circle.pi
/** 
 * 抽象类
 */
// 抽象类，听名字似乎是非常难理解的概念，但其实非常简单。
// TS 通过 public、private、 protected 三个修饰符来增强了JS中的类。
// 其实TS还对JS扩展了一个新概念————抽象类。
// 所谓抽象类，是指只能被继承，但不能被实例化的类，就这么简单。
// 抽象类有两个特点：
// 1、抽象类不允许被实例化
// 2、抽象类中的抽象方法必须被子类实现
// 抽象类用一个abstract关键字来定义，我们通过两个例子来感受一下抽象类的两个特点。
/**
 * 抽象类不允许被实例化
 */
// 定义一个抽象类 Animal，初始化一个Animal的实例，直接报错：Cannot create an instance of an abstract class.
abstract class Animal{}
const animal = new Animal()
/**
 * 抽象类中的抽象方法必须被子类实现
 */
// 定义一个Dog类，继承自Animal类，但是却没有实现Animal类上的抽象方法sayHi，报错：Non-abstract class 'Dog' does not implement inherited abstract member 'sayHi' from class 'Animal1
abstract class Animal1{
  constructor(name: string){
    this.name = name
  }
  public name: string
  public abstract sayHi():void
}
class Dog extends Animal1{
  constructor(name:string){
    super(name)
  }
}
// 正确用法如下
abstract class Animal2 {
  constructor(name:string){
    this.name = name
  }
  public name: string
  public abstract sayHi():void
}
class Dog1 extends Animal2 {
  constructor(name:string){
    super(name)
  }
  public sayHi(){
    console.log('wang')
  }
}
/**
 * 为什么叫抽象类
 */
// 很显然，抽象类是一个广泛和抽象的概念，不是一个实体，就比如上文的例子，动物这个概念很广泛，猫、狗、狮子都是动物，但是动物却不好是一个实例，实例只能是猫、狗或者狮子。
// 官方一点的说法是，在面向对象的概念中，所有的对象都是通过类来描绘的，但是反过来，不是所有的类都是用来描绘对象的，如果一个类中没有包含足够的信息来描绘一个具体的对象，这样的类就是抽象类。
// 比如ANIMAL类只是具有动物都有的一些属性和方法，但不会具体到包含猫或者狗的属性和方法。
// 所以抽象类的用法是用来定义一个基类，声明共有属性和方法，拿去被继承。
// 抽象类的好处是可以抽离出事物的共性，有利于代码的复用。
/**
 * 抽象方法和多态
 */
// 多态是面向对象的三大基本特征之一。
// 多态指的是，父类定义一个抽象方法，在多个子类中有不同的实现，运行的时候不同的子类就会对应不同的操作，比如。
abstract class Animal3 {
  constructor(name: string){
    this.name = name
  }
  public name: string
  public abstract sayHi():void
}
class Dog2 extends Animal3 {
  constructor(name:string){
    super(name)
  }
  public sayHi(){
    console.log("wang")
  }
}
class Cat extends Animal3 {
  constructor(name:string){
    super(name)
  }
  public sayHi(){
    console.log("miao")
  }
}
// Dog类和Cat类都继承自Animal类，Dog类和Cat类都不同的实现了sayHi这个方法
/**
 * this类型
 */
// 接下来，我们介绍一种特殊的类型，this类型。
// 类的成员方法可以直接返回一个this，这样就可以很方便地实现链式调用
/**
 * 链式调用
 */
class StudyStep{
  step1(){
    console.log("listen")
    return this
  }
  step2(){
    console.log("write")
    return this
  }
}
const studystep = new StudyStep()
studystep.step1().step2(); // 链式调用
/**
 * 灵活调用子类父类方法
 */
// 在继承的时候，this可以表示父类型，也可以表示子类型
class StudyStep1 {
  step1(){
    console.log('listen')
    return this
  }
  step2(){
    console.log('write')
    return this
  }
}
class MyStudyStep extends StudyStep1 {
  next(){
    console.log('before done, study next!')
    return this
  }
}
const mys = new MyStudyStep()
mys.step1().next().step2().next(); // 父类型和子类型上的方法都可以随意调用
// 这样子就保持了父类和子类之间接口的连贯性
</script>