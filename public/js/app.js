
let form = document.querySelector('form');
let msg1 = document.querySelector('#massage-1');
let msg2 = document.querySelector('#massage-2');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let address = document.querySelector('input').value;
    msg1.textContent = 'Loading...';
    msg2.textContent = '';
    fetch(`http://localhost:3000/weather?address=${address}`)
        .then(data => data.json())
        .then(data => {
            console.log(data);
            if (data.error) {
                return msg1.textContent = data.error;
            }
            msg1.textContent = data.location;
            msg2.textContent = data.forecast;
        })
})