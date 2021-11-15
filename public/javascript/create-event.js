// function for new event

async function createNewEvent(e) {
    e.preventDefault();
    console.log('click')

    const name = document.querySelector('#event-name').value.trim();
    const description = document.querySelector('#event-description').value.trim();
    const date = document.querySelector('#event-date').value.trim();
    console.log(date)
    const location = document.querySelector('#event-location').value.trim();

    const response = await fetch('/api/events', {
        method: 'post',
        body: JSON.stringify({
            name,
            description,
            date,
            location
        }),
        headers: {
            'Content-Type' : 'application/json'
        }
    });
    console.log(response);
    if(response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}
// TODO: add selector for create event form add event listener to implemenent function
document.querySelector('.create-form').addEventListener('submit', createNewEvent);