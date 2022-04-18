db.createUser(
    {
        user: "george",
        pwd: "secret",
        roles: [
            {
                role: "readWrite",
                db: "weather"
            }
        ]
    }
);