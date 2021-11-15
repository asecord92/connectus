async function deleteRsvp(e) {
    e.preventDefault();

    const id = window.location.toString().split('event/')[1];

    const response = await fetch(`/api/rsvp/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (response.ok) {
        window.location.href = `/events/event/${id}`;
    } else {
        alert('RSVP cancel failed');
    }
}

document.querySelector('#cancel-rsvp-button').addEventListener('click', deleteRsvp);