var boxId = 0;
const doneDiv = document.querySelector('#todo__closedTask')
const parentDiv = document.querySelector('#todo__openTask');    

// při načtení vytvoř button nový ukol a vlož do wrapu
window.onload = function createAddButton() {
    const parentDiv = document.querySelector('#todo__new-btn-wrap');
    const plusBtn = createElement(parentDiv, "plus", "todo__add-task", "button");
    plusBtn.innerHTML = "Nový úkol";

    //vytvořený button má funkci create box - nečeká na její načtení
    plusBtn.onclick = async function() {
        createBox() 
    }

    loadBoxes()
}

//create element
function createElement(parentElement, newElementId, classNames, tag) {
    const child = document.createElement(tag);
    child.setAttribute("id", newElementId);
    child.setAttribute("class", classNames);
    parentElement.appendChild(child);
    return child;
}
//create button
function createButton(parentElement, newElementId, classNames, tag, task) {
    const child = document.createElement(tag);
    child.setAttribute("id", newElementId);
    child.setAttribute("class", classNames);
    child.setAttribute("onclick", task)
    parentElement.appendChild(child);
    return child;
}

//create todo box -  task, smazat btn, hotovo btn, příznak, ulož do paměti - id i++
function createBox() {
    //přidej k ID +1 value, aby byly originalni ids
    boxId++;
    const singleBox = createElement(parentDiv, 'box__'+ boxId, 'todo__single-box', 'li'); //tvorba rodiče
    var listBox = document.querySelector('#box__'+ boxId) //přiřazení variable vytvořenému elementu
    const textField = createElement(singleBox, 'input__'+ boxId, 'todo__textfield', 'textarea'); //tvorba text boxu

    
    var inputFieldValue = document.querySelector('#input__'+ boxId); //přiřazení variable vytvořenému elementu
    inputFieldValue.onkeyup = function(){ //funkce na sledování změny hodnoty v poli
        var value = inputFieldValue.value;//přiřazení hodnoty
        
        localStorage.setItem("taskDescription"+ boxId, value);//uložení hodnoty do local storage -- nefunguje správně, při smazání např. #3 se v aplikaci smaže vždy poslední value
        console.log(localStorage); //2x kontrola, jestli se mi to správně ukládalo
        console.log(inputFieldValue.innerHTML)
    }
    inputFieldValue.innerHTML = localStorage.getItem('taskDescription'+ boxId) //načtení hodnoty po vykreslení boxu, ale chtěl bych spíš uložit boxy jako celek do jejich poslední hodnoty


    const buttonWrapper = createElement(singleBox,'','todo__button-wrapper','div'); //tvorba wrapu na buttony

    const buttonDelete = createButton(buttonWrapper, 'btn-del__'+ boxId, 'todo__button button__delete', 'button', ''); //tvorba buttonu
    buttonDelete.innerHTML = "Smazat"; //přiřazení hodnoty textu
    const buttonDone = createButton(buttonWrapper, 'btn-done__'+ boxId, 'todo__button button__delete', 'button', ''); //tvorba buttonu
    buttonDone.innerHTML = "Hotovo"; //přiřazení hodnoty textu

    buttonsFunction() //auto rozjetí funkce

    localStorage.setItem("singleBox" + boxId, listBox.innerHTML) //pokus uložit html boxu do paměti (slepá uličky)
}


//funkce na načtení boxu - nejde
function loadBoxes() {
    var storedBoxes = localStorage.getItem("singleBox" + boxId)
    
    
}
//funkce auto rozjetí button pravidla
function buttonsFunction() {
    var listBox = document.querySelector('#box__'+ boxId); //přiřazení vytvořeného rodiče s id
    var deleteButton = document.querySelector('#btn-del__'+ boxId);// přiřazení vytvořeného buttonu s id
    var doneButton = document.querySelector('#btn-done__'+ boxId);// přiřazení vytvořeného buttonu s id
    //funkce vymazání tasku
    deleteButton.onclick = function() { 
        listBox.remove();
        localStorage.removeItem('taskDescription'+ boxId); //pokus o vymazání tasku z local storage -- nefunguje správně, při smazání např. #3 se v aplikaci smaže vždy poslední value
        localStorage.removeItem("singleBox" + boxId, listBox.innerHTML); //pokus o vymazání tasku z local storage
    }
    //funkce přehození buttonu do hotovo
    doneButton.onclick = function() {
        doneDiv.appendChild(listBox);
        localStorage.setItem("singleBox" + boxId, listBox.outerHTML); //nefunkční pokus o načtení boxu do hotovo při refresh
    }
}
//create todo box - task - text input

//create todo box - smazat btn - smaž self

//create todo box - hotovo btn - přesun do hotovo sloupce

//create todo box - příznak - otevřeno/rozpracováno

