const Event = require('../models/Event');

test('Creates a new event', () =>{
    const myEvent = new Event('Lets Jam', 'Concert Date Night', '11/22/2021', 'San Diego','sammyj');
    
    expect(myEvent.name).toMatch('Lets Jam');
    expect(myEvent.description).toMatch('Concert Date Night');
    expect(myEvent.date).toMatch('11/22/2021');
    expect(myEvent.location).toMatch('San Diego');
    expect(myEvent.creator_id).toMatch('sammyj');
});
