const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit',(e)=>{
    // This line of code prevents the default behaviour of
    // browser to refresh the page on form submit.
    e.preventDefault();
    messageOne.textContent='Loading...';
    messageTwo.textContent = '';
    fetch('http://localhost:3000/weather?address='+search.value)
            .then((response)=>{
                response.json().then((data)=>{
                    messageOne.textContent='';
                    if(data.err){
                        messageOne.textContent = data.err;
                    } else {
                        messageOne.textContent = data.location;
                        messageTwo.textContent = data.forecast;
                    }
                })
            });
})