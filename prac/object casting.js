class MyClass{
    name = 'Name';
    #id = -1;
    constructor(name){
        this.name = name;
    }
    Indtroduce(){
        console.log(`Hello, I'm ${this.name}. : My id priv number is ${this.#id} while pub number is ${this.id}`);
    }
    SetId(id){
        this.id = id;
    }
}

let myObject = new MyClass(); // creates undefined, only one constructor is allowed
let myObject2 = new MyClass('tobol');
//let myObject3 = MyClass('tae'); // not allowed
let myObject4 = {name: 'O4 Name', id: 69};
let myObject5 = new MyClass();
Object.assign(myObject5,myObject4);
let myObject6 = new MyClass();
Object.assign(myObject6,myObject5);

myObject.SetId(10); myObject2.SetId(20);
myObject.Indtroduce();
myObject2.Indtroduce();
myObject5.Indtroduce();
myObject6.Indtroduce();

myObject.size = 100;
console.log('id' in myObject); // CHECK IF prop/methos is in object
console.log(`${'size' in myObject} - ${myObject.size}`);
console.log(`myObject is MyClass - ${myObject instanceof MyClass}`);
console.log(`myObject4 is MyClass - ${myObject4 instanceof MyClass}`);
console.log(`myObject5 is MyClass - ${myObject5 instanceof MyClass}`);
console.log(`myObject4 == myObject5 - ${myObject4 == myObject5}`);
console.log(`myObject5 == myObject6 - ${myObject6 == myObject5}`);

console.log(myObject);
console.log(myObject2);
console.log(myObject4);
console.log(myObject6);

console.log(`myObject4 - ${myObject4}`); //no auto formatting for objects
console.log(`myObject6 - ${myObject6}`);