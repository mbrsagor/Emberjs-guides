# Java OOP

> Java OOP concepts.

There are four main OOP concepts in Java. OOP concepts in Java are the main ideas behind Java’s Object Oriented Programming.

### Table of contents:

- OOP
- Class
- Object
- Constructor
- Inheritance
- Encapsulation
- Polymorphism
- Abstraction
- Interface

###### What is Class?

> Ans: `Class` is a blueprint for creating objects.

```java
class Sagor{
    public static void main(String[] args){
        System.out.println("Hello Sagor");
    }
  }
```

###### What is Object?

> Ans: `Object` is a real data in class or `Object` is an instance of a class.

```java
Sagor ReferenceVariable = new Sagor();
```

###### What is Inheritance?

> Inheritance is a mechanism in which one class acquires the property of another class. For example, a child inherits the traits of his/her parents. With inheritance, we can reuse the fields and methods of the existing class. Hence, inheritance facilitates Reusability and is an important concept of OOPs.

```java
class MbrSagor extends Sagor {
  // body of the class
}
```

###### What is Polymorphism?

> The word polymorphism means having many forms. In simple words, we can define polymorphism as the ability of a message to be displayed in more than one form.
