async function rsvp(e) {
    e.preventDefault();
    const id = window.location.toString().split('event/')[1];

    const response = await fetch(`/api/rsvp`, {
        method: 'POST',
        body: JSON.stringify({
            event_id: id,
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (response.ok) {
        window.location.href = `/events/event/${id}`;
    } else {
        alert('RSVP failed');
    }
}

document.querySelector('#rsvp-button').addEventListener('click', rsvp);