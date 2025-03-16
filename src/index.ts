// ** =====================================================
// ** Type annotation" you as developer" VS inference "TS Job"

// // Type annotation
// let usrename: string = "usrename";
// // Type inference
// let age = 20;

// ** =====================================================
// **String, Number, Null, and undefined
//  The value null indicates thse intentional absence of any object value.
//  Undefined is the default value for uninitialized variables

// const age: number = 3;

// let title: undefined;
// console.log(title);

// // ** =====================================================
// // ** Object, Array, or Tuple and void
// const userProfile: {
//   name: string;
//   age: number;
//   isMarried: boolean;
//   hobbies?: string[];
// } = {
//   name: "John",
//   age: 30,
//   isMarried: false,
//   hobbies: ["reading", "painting"],
// };
// const arr: number[] = [1, 2, 3, 4, 5];
// const list: [number, string, boolean, { username: string }] = [
//   1,
//   "John",
//   false,
//   { username: "John" },
// ]; // tuple

// function display(message: string): void {
//   console.log(`Hello ${message}`);
// }

// display(userProfile.name);

// ** =====================================================
// ** Object Spread Operators and destructors **

// const userProfile: {
//   username: string;
//   age: number;
//   isMarried: boolean;
//   hobbies?: string[];
// } = {
//   username: "John",
//   age: 30,
//   isMarried: false,
//   hobbies: ["reading", "painting"],
// };

// const newUser: {
//   username: string;
//   age: number;
//   isMarried: boolean;
//   hobbies?: string[];
//   address: string;
// } = {
//   ...userProfile,
//   hobbies: ["reading", "painting", "swimming"],
//   address: "Mansoura",
// };

// const { username } = newUser;
// console.log(username);

// const {
//   userName,
//   age,
//   isMarried,
// }: { userName: string; age: number; isMarried: boolean } = {
//   userName: "Jane",
//   age: 25,
//   isMarried: true,
// };

// ** =================================================
// ** intface

// interface IUser {
//   username: string;
//   age: number;
//   isMarried: boolean;
// }

// interface INewUser extends IUser {
//   address: string;
// }

// const userProfile: IUser = {
//   username: "John",
//   age: 30,
//   isMarried: false,
// };

// const newUser: INewUser = {
//   ...userProfile,
//   address: "Mansoura",
// };

// ** =====================================================
// ** types

// ** Aliases
// type PI = number;
// const PI: PI = 3.14;

// // ** Union types
// type Gender = "male" | "female";
// const gender: Gender = "male";

// // ** Intersection types
// type User = {
//   username: string;
//   age: number;
//   isMarried: boolean;
// };

/**
 * General Recommendations:

- Use interface when defining object contracts, especially in object-oriented programming
- Use type when you need unions, intersections, or mapped types
- Use interface if you need declaration merging
- Use type for complex type operations or when you need more flexibility
Both can be used interchangeably in many cases, but each has its specific strengths in certain scenarios.
 */

// ** =================================================
// ** Record types

// interface IUser {
//   username: string;
//   readonly age: number;
//   isMarried: boolean;
// }

// const userProfile: IUser = {
//   username: "John",
//   age: 30,
//   isMarried: false,
// };

// next line get error message Property 'address' does not exist on type 'IUser'.
// userProfile["address"] = "Mansoura";

// Record is
/**
 * Record<Keys, Type> is a utility type that constructs an object type whose property keys are Keys and whose property values are Type . It's particularly useful when you want to create an object type with a specific set of properties where all values share the same type, or when you want to create an object that can have any string key with specific value types.
 * - First parameter defines the key type (usually string, number, or union of literal types)
- Second parameter defines the value type
- All properties must conform to these types
- Useful for creating dictionaries or maps with type safety
- Properties can be accessed using both dot notation and bracket notation
 */

// Basic Record type
// const person: Record<string, string | number | boolean> = {
//     username: "John",
//     age: 30,
//     isMarried: false,
//     address: "Mansoura",
// };

// // Record with specific keys
// type UserKeys = "name" | "email" | "age";
// const userInfo: Record<UserKeys, string | number> = {
//     name: "John",
//     email: "john@example.com",
//     age: 30
// };

// // Record with enum
// enum Role {
//     ADMIN = "ADMIN",
//     USER = "USER",
//     GUEST = "GUEST"
// }

// const permissions: Record<Role, boolean> = {
//     [Role.ADMIN]: true,
//     [Role.USER]: true,
//     [Role.GUEST]: false
// };

// person["isPlaying"] = true;

// ** =================================================
// ** Keyof
/**
 * The keyof operator in TypeScript is used to create a union type of all the keys of an object type. It's particularly useful when you want to work with the keys of an object as if they were a set of literals.
 * 1. Creates a union type of all property names in an object type
2. Provides type safety when accessing object properties
3. Often used with generics for creating flexible, type-safe functions
4. Useful in mapped types to transform existing types
5. Helps prevent runtime errors by catching invalid property access at compile time
The keyof operator is fundamental for creating type-safe operations on objects in TypeScript.
 */
// interface IUser {
//   username: string;
//   age: number;
//   address: string;
// }

// type IUserKey = keyof IUser;

// const user: IUser = { username: "username", age: 20, address: "address" };

// function getProperty(obj: IUser, key: IUserKey): string | number {
//   return obj[key];
// }

// console.log(getProperty(user, "username")); // Output: "username"

// ** =================================================
// ** Functions With Array Desturturing

// function printLanguages([firstLanguage, secondLanguage]: string[]): string {
//   return `${firstLanguage} ${secondLanguage}`;
// }

// console.log(printLanguages(["TypeScript", "JavaScript"])); // Output: TypeScript JavaScript

// ** =================================================
// ** Function Reset Parameters

// Reset parameters must be last pram send to function
// function sumNumbers(...numbers: number[]): number {
//   return numbers.reduce((acc, current) => acc + current, 0);
// }

// console.log(sumNumbers(1, 2, 3, 4, 5)); // Output: 15

// ** =================================================
// ** Enums
/**
 * Enums in TypeScript are a way to define a set of named constants. They provide a way to make your code more readable and maintainable by using symbolic names instead of raw values. Enums are useful when you have a fixed set of values that you want to represent in your code.
 * For example
 */

// Basic Enum
// enum Directions {
//   UP, // ** 0
//   DOWN, // ** 1
//   LEFT, // ** 2
//   RIGHT, // ** 3
// }
// const playerDirection: Directions = Directions.UP;
// console.log(playerDirection);

// // ** Enum with string values
// enum statusCode {
//   SUCCESS = "200",
//   NOT_FOUND = "404",
//   FORBIDDEN = "403",
// }

// function handleResponse(status: statusCode) {
//   switch (status) {
//     case statusCode.SUCCESS:
//       console.log("Request successful");
//       break;
//     case statusCode.NOT_FOUND:
//       console.log("Not Found");
//       break;
//     case statusCode.FORBIDDEN:
//       console.log("Forbidden");
//       break;
//     default:
//       console.log("Unknown status code");
//   }
// }

// handleResponse(statusCode.SUCCESS); // Output: Request successful

// ** =================================================================
// ** Genrics **
/**
 * Generics in TypeScript are a way to create reusable components that can work with different types. They allow you to write code that is flexible and type-safe, making it easier to write generic algorithms and data structures. Generics are particularly useful when you want to write code that can work with a variety of types without sacrificing type safety.
 */

// Basic Generics
// function logArg<T>(arg: T) {
//   return arg;
// }

// logArg("Hello"); // Output: Hello
// logArg(10); // Output: 10

// function swap<T>(arg1: T, arg2: T) {
//   return [arg2, arg1];
// }

// console.log(swap(10, 20)); // Output: [20, 10]

// ** =================================================
// ** Partial
/**
 * Partial in TypeScript is a utility type that creates a new type by making all properties of an existing type optional. It's useful when you want to create a new type based on an existing one, but you want to allow some properties to be optional.
 */

// interface IUser {
//   username: string;
//   address: string;
//   age: number;
// }

// function updateUser(user: IUser, updates: Partial<IUser>) {
//   return { ...user, ...updates };
// }

// const user: IUser = {
//   username: "username",
//   address: "address",
//   age: 20,
// };

// console.log(updateUser(user, {}));
// console.log(updateUser(user, { username: "hamido" }));

// ** =================================================
// Index Signature
/**
 * Index Signatures in TypeScript are a way to define an object type where the keys are of a specific type and the values are of a specific type. They are useful when you want to create an object type that can have any number of properties with specific types.
 */

// interface IcCityDeictionary {
//   [key: string]: string;
// }

// const cityDictionary: IcCityDeictionary = {
//   cairo: "Egypt",
//   Baghdad: "Iraq",
//   London: "United Kingdom",
// };

// ** =================================================
// ** var => "current execution context"
// ** let => Block scope
// ** const => Block scope and constant
/*
 * var in TypeScript is a variable declaration that can be declared globally, locally within a function, or inside an if-else statement. It has function scope and hoisting behavior. Variables declared with var have global scope by default.
 * Hositing behavior means that the variable can be accessed before it's declared.
 */

// function displayFunction() {
//   if (true) {
//     var username = "username"; // the global scope of variable now is the function
//   }
// }

// console.log(username); // username is not define

// const person = {
//   walk() {
//     return "walk";
//   },
//   eat() {
//     return "Eating...";
//   },
// };

// const hamid = { ...person, username: "hamid", age: 23 };
// console.log(hamid);

// const { eat, walk, ...restPerson } = hamid;

// *** =================================================================
// ** Higher order functions

// const numbers = [1, 2, 3, 4, 5];

// // ** Map return new Array
// const squerdNumber = numbers.map((number) => number * number);
// console.log(squerdNumber);

// // ** Filter return new Array
// const evenNumber = numbers.filter((number) => number % 2 === 0);
// console.log(evenNumber);

// // ** Find Returns the value of the first element in the array where predicate is true, and undefined otherwise.
// const value = numbers.find((number) => number === 3);
// console.log(value);

// // ** findIndex returns the index of the first element
// const index = numbers.findIndex((number) => number === 3);
// console.log(index);

// // ** some Determines whether the specified callback function returns true for any element of an array. return boolean
// const hasNegitveNumber = numbers.some((number) => number < 0);
// console.log(hasNegitveNumber);

// // ** every Returns true if all elements in the array pass the test implemented by the provided function. return boolean
// const allPostive = numbers.every((number) => number >= 0);
// console.log(allPostive);

// // ** reduce applies a function against an accumulator and each element in the array (from left to right) to reduce it to a single output value.
// const sum = numbers.reduce((sum, element) => sum + element, 0);
// console.log(sum);

// ** =================================================
// ** this keyword
/**
 * In TypeScript, the this keyword refers to the current execution context. It's used to access properties and methods of an object within its own scope. The value of this depends on how the function is called, and it can be explicitly set using the this parameter.
 
 * In global context ===> window object
 * Inside function ===> window object
 * Inside Method ===> Owner object
 */

// const person = {
//   name: "John Doe",
//   age: 30,
//   greet() {
//     console.log(
//       `Hello, my name is ${this.name} and I am ${this.age} years old.`
//     );
//   },
// };

// person.greet();

// const person = {
//   name: "John Doe",
//   age: 30,
//   greet() {
//     console.log(
//       `Hello, my name is ${this.name} and I am ${this.age} years old.`
//     );
//   },
// };

// ** =================================================
// ** binding
/** 
 * Binding in TypeScript is a process of converting a function call from a regular function call to a method call on a specific object. It allows you to explicitly set the value of this within the function.

 * There are three ways to bind a function:

 * 1. Call the bind() method on a function and pass the this value as the first argument.
 * 2. Use arrow function syntax (=>) with the this keyword.
 * 3. Use the bind() method on an object.
 */

// function printThis() {
//   return this;
// }

// const hamid = {
//   name: "Hamid",
//   age: 23,
//   printUser() {
//     // For a given function, creates a bound function that has the same body as the original function. The this object of the bound function is associated with the specified object, and has the specified initial parameters

//     // made the value of this refer to the owner object of this function

//     // return printThis.bind(this)().name;
//     // return printThis.call(this).name;
//     return printThis.apply(this).name;
//   },
// };

// console.log(hamid.printUser());

// ** =================================================
// ** Implicit and Explicit type bindings
// ** Implicit type bindings are inferred by TypeScript based on the initial value assigned to a variable or property.

// function printUser(welcomeMsg: string) {
//   return `Hello ${this.name}, ${welcomeMsg}`;
// }

// const person = {
//   name: "John Doe",
//   age: 30,
// };

// const naga = {
//   name: "Naga",
//   age: 25,
// };

// // Explicit
// console.log(printUser.bind(person, "welcome back")());
// console.log(printUser.call(person, "welcome back"));

// // Implicit
// const hamid = {
//   name: "Hamid",
//   age: 23,
//   printAge() {
//     return `Hello ${this.name}, you are ${this.age} years old`;
//   },
// };

// console.log(hamid.printAge());

// ** =================================================
// ** New Binding (this with clases)
/**
 * In TypeScript, the new binding refers to the behavior of the this keyword when used with the new keyword to create an instance of a class. When the new keyword is used to create an instance of a class, the this keyword inside the constructor function refers to the newly created object.
 */

// class Person {
//   username: string;
//   constructor(username: string) {
//     this.username = username;
//   }
// }

// const hamid = new Person("modo");
// console.log(hamid.username);

// ** =================================================
// ** `this` keyword binding with arrow functions
/*
 * Arrow functions do not have their own this binding. Instead, the this keyword inside an arrow function is bound to the enclosing scope's this.

 * Arrow functions do not have their own this binding, so if you use the this keyword inside an arrow function, it will always refer to the enclosing scope's this.
 */

// const fullName = function () {
//   return `Hi, ${this.firstName}, ${this.lastName}`;
// };

// const hamido = {
//   firstName: "Hamid",
//   lastName: "Modo",
// };

// console.log(fullName.call(hamido)); // Hi, Hamid, Modo
// // in arrow function this not have access to the out scope

//
