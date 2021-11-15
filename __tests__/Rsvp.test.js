const Rsvp = require('../models/Rsvp.js')


test('RSVP', () =>{
    const myRsvp = new Rsvp('hugo123','myevent');
    
    expect(myRsvp.user_id).toBeGreaterThan(0);
    expect(myRsvp.event_id).toBeGreaterThan(0);
});
