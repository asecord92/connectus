// function to edit event details

async function editEvent(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const date = document.getElementById('date').value;
    const location = document.getElementById('location').value;
    const id = window.location.toString().split('event/')[1];

    console.log(name);
    console.log(description);
    console.log(date);
    console.log(location);
    console.log(id);

    const response = await fetch(`/api/events/${id}`, {
        method: 'put',
        body: JSON.stringify({
            name,
            description,
            date,
            location
        }),
        headers: {
            'Content-type': 'application/json'
        }
    });

    if(response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

async function deleteEvent(e) {
    e.preventDefault();

    const id = window.location.toString().split('event/')[1];

    const response = await fetch(`/api/events/${id}`, {
        method: 'delete'
    });

    if(response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

// TODO: add selector for edit form add event listener to implemenent function
document.querySelector('#edit-event-btn').addEventListener('click', editEvent);
document.querySelector('#delete-event-btn').addEventListener('click', deleteEvent);