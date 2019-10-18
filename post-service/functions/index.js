const functions = require('firebase-functions');

const admin = require('firebase-admin');
const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');

admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

const app = express();
const main = express();

main.use(cors());
main.use('/api/v1', app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));

// View all posts
app.get('/feeds', (req, res) => {
    return db.collection('posts').get()
        .then(snapshot => {
            if (snapshot.empty) {
                return res.send([]);
            }

            const data = [];
            snapshot.forEach(doc => {
                const obj = doc.data();
                obj.id = doc.id;
                data.push(obj);
            });

            return res.send(data);
        })
        .catch(err => {
            return res.send('Error getting documents' + err);
        });
});

// Add new post
app.post('/feeds', (req, res) => {
    return res.send(
        db.collection('posts').add({
            name: req.body.name,
            text: req.body.text,
            createdOn: new Date().getTime(),
            upvotes: 0
        })
    );
});

// Update new post
app.put('/feeds/upvote/:id', (req, res) => {
    const docRef = db.collection('posts').doc(req.params.id);
    return res.send(docRef.update({ upvotes: req.body.upvotes }));
});

// webApi is your functions name, and you will pass main as a parameter
exports.webApi = functions.https.onRequest(main);