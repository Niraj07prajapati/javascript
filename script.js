// fullName = "Niraj Prajapati";
// console.log(fullName);
// alert("Hello EveryOne "+fullName)

// const Student={
//     fullName: "Niraj Prajapati",
//     age: 22,
//     cgpa: 8.5,
//     isPass: true
// };
// console.log(Student["age"]);
// Student["name"] = "Niraj";

// console.log(Student["name"]);
// console.log(Student)

// let age = prompt("Enter your age");

// if(age>18){
//     console.log("You can vote");
// }
// if(age<18){
//     console.log("You can not vote");
// }

// let mode = "dark";
// let color;
// if(mode === "dark"){
//     color ="black";
// } 
// if(mode === "light"){
//     color = "white";
// }
// console.log(color);

let modeBtn = document.querySelector("#mode");
let body = document.querySelector("body");
let currMode = "light";

modeBtn.addEventListener("click",() =>{
    if(currMode =="light"){
        currMode = "dark";
        body.classList.add("dark");
        body.classList.remove("light");
    }
    else{
        currMode = "light";
        body.classList.add("light");
        body.classList.remove("dark");
    }
    console.log(currMode);
});