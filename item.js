const { db, meta } = require('./db')
!(async () => {
    await db(meta, {
        _id: 1,
        name: 'test',
        description: 'this is test',
        image: 'http://localhost:3000/static/1.jpg'
    })
})()