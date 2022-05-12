const API_URL = "http://localhost:5000/";
const client_URL = 'http://127.0.0.1:8887/';
document.querySelector('#recipeForm').addEventListener('submit', (e)=>{
  e.preventDefault();
  var recipeTitle = document.querySelector('#recipeName').value.trim();
  var recipeIngredients = document.querySelector('#ingredients').value.trim();
  var steps = (document.querySelector('#steps').value.trim()).replace(/\n/g, '\n\n');
  fetch(API_URL+'recipes',{
    method: 'POST',
    body: JSON.stringify({recipeTitle, recipeIngredients, steps}),
    headers: {
        'content-type':'application/json',
        authorization: 'Bearer ' + localStorage.token
    }
  }).then((response) => {
    if(response.ok){return response.json();}
        throw response;
  }).then((result)=>{
    console.log(result.recipeTitle + ': ' + result._id);
    copyToClipboard(client_URL + '?r='+result._id);
  }).catch((error)=>{
        error.text().then(msg =>{
            logErrorMessage(JSON.parse(msg).message);
            console.error(JSON.parse(msg).message);
        });
    });
});


function copyToClipboard(text) {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}
