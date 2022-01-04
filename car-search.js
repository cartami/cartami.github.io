let recallInputs = document.querySelectorAll('button');
//extract year, make and model of the recall from input elements
let year = document.getElementById('year');
let make = document.getElementById('make');
let model = document.getElementById('model');

//use div blocks to create all the recalls from each car make appear vertically
const buttonTemplate = (desc, corrective_action, consequence, recall_number, make) => {
    return `<div><br>${make.toUpperCase()} RECALL#${recall_number}<br><br>${desc}<br><br>${corrective_action}<br><br><button type="button" id='${recall_number}' onclick="innerParagraph('${consequence}','${recall_number}')">WHAT IS THE CONSEQUENCE?</button><p id='${recall_number}'></p></div>`
}

//create new paragraph showing consequence info. from the data object in the JSON payload
const innerParagraph = (consequence, recall_number) => {
    const parentElement = document.querySelector('.container');
    let allChildren = parentElement.querySelectorAll(":scope > div > p");
    console.log(allChildren);
    allChildren.forEach(item => {
        //this logic part was the hardest to figure out for some reason 
        if (item.id === recall_number)
            item.innerHTML = consequence
    });
}

//render each oject item in the array 
const render = (data, make) => {
    data.forEach(ele => {
        document.querySelector('.container').innerHTML += buttonTemplate(ele.desc, ele.corrective_action, ele.consequence, ele.recall_number, make) //apend to the div
    });
}

//clear past div container 
const clearContainer = () => {
    document.querySelector("div").innerHTML = "";
}

//iterate through the nodelist from querySelectorAll buttons and assign an EventListener to each button
Array.from(recallInputs).forEach(recallInput => {
    recallInput.addEventListener('click', () => {

        //URL string used to make GET call using filter parameters
        const url = `http://api.carmd.com/v3.0/recall?year=${year.value}&make=${make.value}&model=${model.value}`;

        //JS has a built in method for API calls
        // which is promise based
        fetch(url, {
            //headers needed for CarMD API authentication Partner Token and Authorization Key

            headers: {
                'Content-Type': 'application/json',
                'partner-token': 'cbd65aa3193f473f81d2abefb994aad8',
                'authorization': 'Basic N2ZmNDRiNmEtMWMxOS00NzZiLWI4Y2MtYjJjNmFhYzUxNzkz'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
            .then((res) => res.json())// receives the response from the promise
            .then((data) => {

                //let jsonData = JSON.stringify(data); //parse body into string
                clearContainer(); //clear the past view whenver a refresh or GET call is made
                //console.log(data);
                console.log(data.data);
                render(data.data, make.value);

            })
            .catch((error) => {
                console.log(error)
            })
    });
});
