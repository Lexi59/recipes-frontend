var urlVars = {}; 
var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) { 
    urlVars[key] = value; 
});
const API_URL = "https://recipes-backend7.herokuapp.com/";

getRecipe();

function getRecipe(){
    if(urlVars['r']){
        fetch(API_URL+'recipes/'+urlVars['r'],{
            headers: {
                'content-type':'application/json',
            }
        }).then(res => res.json()).then(records=>{
            console.log(records);
            document.querySelector('#recipeTitle').textContent = records[0].recipeTitle;
            document.querySelector('#error').textContent = "";
            document.querySelector('#ingredHeader').textContent = "Ingredients";
            document.querySelector('#ingredients').textContent = records[0].recipeIngredients;
            document.querySelector('#stepHeader').textContent = "Directions";
            document.querySelector('#steps').textContent = records[0].steps;
            document.title = records[0].recipeTitle;

        }).catch((error)=>{
            error.text().then(msg =>{
                logErrorMessage(JSON.parse(msg).message);
                console.error(JSON.parse(msg).message);
            });
        });
    }
}