
async function searchByName(e) {
    e.preventDefault();

    const name = document.querySelector("#search-input").value.trim();
    console.log(name);

    if (name) {
        const response = await fetch(`/api/eventname/${name}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const event = await response.json();
        document.location.replace(`/events/event/${event.id}`);
    }





}

document.querySelector('#search-form').addEventListener('submit', searchByName);