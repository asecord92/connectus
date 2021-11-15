// logout function

async function logout() {
    const response = await fetch('/api/users/logout', {
        method: 'post',
        headers: {'Content-Type' : 'application/json'}
    });

    if(response.ok) {
        document.location.replace('/');
    }else {
        alert(response.statusText);
    }
}

// add query selector for logout button and event listner

document.querySelector('#logout').addEventListener('click', logout);