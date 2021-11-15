//async function for sign up

//TODO add classes to html forms for signup and login to capture data below

async function signupHandler(e){
    e.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const first_name = document.querySelector('#first_name-signup').value.trim();
    const last_name = document.querySelector('#last_name-signup').value.trim();

    if(username && email && password && first_name && last_name) {
        const response = await fetch('/api/users/signup', {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password,
                first_name,
                last_name
            }),
            headers: {'Content-Type' : 'application/json'}
        });
        if(response.ok){
            console.log('success');
            document.location.replace('/dashboard');

        }else {
            alert(response.statusText);
        }
    }
};

// TODO: add selector for signup form add event listener to implemenent function

document.querySelector('.signup-form').addEventListener('submit', signupHandler);