// Welcome to the TypeScript Playground, this is a website
// which gives you a chance to write, share and learn TypeScript.

// You could think of it in three ways:
//
//  - A location to learn TypeScript where nothing can break
//  - A place to experiment with TypeScript syntax, and share the URLs with others
//  - A sandbox to experiment with different compiler features of TypeScript

import * as React from "react";

const anExampleVariable = "Hello World";
console.log(anExampleVariable);

// To learn more about the language, click above in "Examples" or "What's New".
// Otherwise, get started by removing these comments and the world is your playground.
const color: string = "red";
const isRed: boolean = color === "red";
const age: number = 25;

const colors: string[] = ["red", "green", "blue"];
const areColorsRed: boolean[] = [true, false, false];
const ages: number[] = [20, 30, 40];

function add(a: number, b: number): number {
  return a + b;
}

function printColors(colors: string[]) {
  console.log(colors);
}

printColors(["yellow", "blue"]);

function printAge(age: number) {
  console.log(age);
}

printAge(55);

/*
function formatCar(car: { year: number, model: string, make: string}){
    return `Year: ${car.year}, model: ${car.model}, make ${car.make}`;
}*/

interface Car {
  model: string;
  year: number;
  setYear: (nextYear: number) => void;
  setModel: (nextModel: string) => void;
  getDescription: () => string;
}

const mustang: Car = {
  model: "Mustang",
  year: 2015,
  setYear(nextYear: number) {
    this.year = nextYear;
  },
  setModel(nextModel: string) {
    this.model = nextModel;
  },
  getDescription() {
    return `Year: ${this.year}, Model: ${this.model}`;
  },
};

interface TaskShowProps {
  title: string;
  completed: boolean;
}

function TaskShow({ title, completed }: TaskShowProps) {
  return (
    <div>
      {title} = {completed ? "Done" : "Need to complete"}
    </div>
  );
}

<TaskShow title="Write an interface" completed={true} />;

interface ColorPickerProps {
  colors: string[];
  handleColorSelect: (color: string) => void;
}

function ColorPicker({ colors, handleColorSelect }: ColorPickerProps) {
  const renderedColors = colors.map((color) => {
    return (
      <button key={color} onClick={() => handleColorSelect(color)}>
        {color}
      </button>
    );
  });

  return <div>{renderedColors}</div>;
}

<ColorPicker
  colors={["red", "green", "blue"]}
  handleColorSelect={(color: string) => console.log(color)}
/>;

interface ButtonProps {
  label: string;
  onClick: () => void;
}

function Button({ label, onClick }: ButtonProps) {
  return <button onClick={() => onClick()}>{label}</button>;
}
interface IconButtonProps extends ButtonProps {
  //label: string;
  //onClick: () => void;
  icon: string;
}
function IconButton({ label, onClick, icon }: IconButtonProps) {
  return (
    <button onClick={() => onClick()}>
      {icon}
      {label}
    </button>
  );
}

interface Image {
  src: string;
}

interface User {
  username: string;
}

function isUser(value: Image | User): value is User {
  return "username" in value;
}

function logOutput(value: Image | User) {
  if ("username" in value) {
    console.log(value.username);
  } else {
    console.log(value.src);
  }
}
logOutput({ src: "img.jpg" });
logOutput({ username: "adgsd" });

interface UserProfile {
  likes: string[];
}

interface User {
  id: string;
  username: string;
  profile?: UserProfile; //? means User might or might not have a profile
}

const user: User = {
  id: "abc",
  username: "me",
  profile: {
    likes: ["cats"],
  },
};
if (user.profile) {
  user.profile.likes;
}

user.profile?.likes;

function logValue(value: string, message?: string) {
  if (message) {
    console.log(message, value);
  } else {
    console.log(value);
  }
}

logValue("adfsadgs");
logValue("asfadfs", "aiohgfios");

interface Book {
  title: "string";
}

async function fetchBook(): Promise<Book> {
  const res = await fetch("/book");
  const data: unknown = await res.json();

  if (
    data &&
    typeof data === "object" &&
    "title" in data &&
    typeof data.title === "string"
  ) {
    return data as Book;
  }
  throw new Error("expected to get a book but didn't");

  // return data as Book; //type assertion for type any
}

async function run() {
  const book = await fetchBook();
}

type LoggableValue = string | number | string[] | Image;

function logValue2(value: LoggableValue) {}

function wrapInArray<TypeOfValue>(value: TypeOfValue): TypeOfValue[] {
  return [value];
}

const result = wrapInArray("asidhf");
const result2 = wrapInArray(10);

function toRecord<TypeOfId, TypeOfValue>(id: TypeOfId, value: TypeOfValue) {
  return {
    id,
    value,
  };
}

const result3 = toRecord<number, string>(123, "my@email.com");
const result4 = toRecord<string, number[]>("asdfas", [1, 2, 3]);

function randomElement<T>(arr: T[]) {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

const result5 = randomElement<number>([1, 2, 3]);
const result6 = randomElement<string>(["a", "b", "c"]);

interface User {
  username: string;
}

interface Message {
  content: string;
}

interface Image {
  url: string;
}

async function fetchData<T>(path: string): Promise<T> {
  const res = await fetch(path);
  const json = await res.json();

  return json as T;
}

const run2 = async () => {
  const user = await fetchData<User>("/users");
  const message = await fetchData<Message>("/message");
  const image = await fetchData<Image>("/images");
};

function callAndReturn<T>(fn: () => T): T {
  return fn();
}

const result7 = callAndReturn(() => 5);

import { useState } from "react";

function ColorPicker2() {
  const [colors, setColors] = useState<string[]>([]);
  const handleClick = () => {
    setColors([...colors, "red"]);
  };
  return <button onClick={handleClick}>Click</button>;
}

function merge<T extends object, U extends object>(objA: T, objB: U) {
  return { ...objA, ...objB };
}

const result8 = merge({ id: "asdf" }, { color: "red" });

interface Product {
  name: string;
  count: number;
}

type ProductKeys = keyof Product;

const key: ProductKeys = "name";

function collect<T extends keyof U, U extends object>(key: T, arr: U[]) {
  return arr.map((el) => el[key]);
}

const result9 = collect("name", [
  { count: 1, name: "agsssdf" },
  { count: 20, name: "apple" },
]);
