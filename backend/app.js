const express = require('express');
const app = express();
const port = 8080;
const cors = require('cors');
const knex = require('knex')(require('./knexfile.js')['development']);
const passport = require('passport');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const bcrypt = require('bcrypt');
const authRoutes = require('./authRoutes.js');

app.use(express.json());
app.use('/auth', authRoutes);
app.use(cors());
app.use(passport.initialize());

passport.use(
    new JWTStrategy(
        {
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'secretkeyelephant',
        },
        async (jwtPayload, done) => {
            try {
                const user = await knex('users').where('id', jwtPayload.sub).first();
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            } catch (error) {
                return done(error, false);
            }
        }
    )
);

const authenticateJWT = passport.authenticate('jwt', { session: false });

// everyone
app.get('/items', async (req, res) => {
    try {
        const items = await knex('store_table').select('*');
        res.json(items);
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// authenticated users
app.post('/items', (req, res) => {
    const itemData = req.body;

    knex('store_table')
        .insert({
            name: itemData.name,
            desc: itemData.desc,
            price: itemData.price,
            count: itemData.count,
        })
        .returning('*') 
        .into('store_table')
        .then((insertedItems) => {
            const insertedItem = insertedItems[0];
            res.json({ message: 'Item added successfully', item: insertedItem });
        })
        .catch((error) => {
            console.error('Error adding item:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

app.listen(port, () => {
    console.log(`Your application is running on port ${port}`);
});

app.get('/', (req, res) => {
    res.send(`Your application is running`)
});

app.get('/items', (req, res) => {
    knex('store_table')
        .select('*')
        .then(items => {
            res.json(items);
        })
})

app.get('/items/:id', (req, res) => {
    var { id } = req.params;
    knex('store_table')
        .select('*')
        .where('id', id)
        .then(data => {
            res.json(data);
        })

})

app.delete('/items/:id', (req, res) => {
    let itemID = req.params.id;

    knex('store_table')
        .where('id', itemID)
        .del()
        .then(() => res.json({ message: 'Item deleted successfully' }))
});

app.patch('/items/:id', (req, res) => {
    let itemID = req.params.id;
    let newItem = req.body

    knex('store_table')
        .where('id', itemID)
        .update({
            'name': newItem.name,
            'price': newItem.price,
            'desc': newItem.desc,
            'count': newItem.count
        })
        // .then(() => {
        //     return knex('store_table').where('id', itemId).first();
        // })
        .then(() => res.json(newItem))
});