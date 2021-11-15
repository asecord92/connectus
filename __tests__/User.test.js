const User = require("../models/User.js");


test('Creates a user object', () =>{
    const myUser = new User('Hugo', 'Williams', 'hugo123', 'hugo@mail.com', 'jshagdf23*&*');
    
    expect(myUser.first_name).toBe('Hugo');
    expect(myUser.last_name).toMatch('Williams');
    expect(myUser.username).toBe('hugo123');
    expect(myUser.email).toMatch('hugo@mail.com');
    expect(myUser.password).toBeGreaterThan(4);
});