import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

console.log(window.userID);

const appSetting = {
    databaseURL: "https://shoppinglist-53232-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSetting);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");

const myInput = document.getElementById("myInput");
const myButton = document.getElementById("myButton");
const myList = document.getElementById("myList");

myButton.addEventListener("click", () => {
    let text = myInput.value;
    push(shoppingListInDB, text);
    clearingInput();
});

onValue(shoppingListInDB, function(snapshot){
    if(snapshot.exists()){
        clearingHTML(myList);
        let myArray = Object.entries(snapshot.val());
        myArray.forEach(value => {
            addToList(value);
        });
    }else{
        myList.innerHTML = "No items here... yet";
    }
});

function addToList(value){
    let myElement = document.createElement("li");
    let key = value[0];
    let item = value[1];
    myElement.textContent = `${item}`;

    myElement.addEventListener("click", function(){
        let pathOfElement = ref(database, `shoppingList/${key}`);
        remove(pathOfElement);
    });

    myList.append(myElement);
}

function clearingInput(){
    myInput.value = '';
}

function clearingHTML(item){
    item.innerHTML = '';
}
