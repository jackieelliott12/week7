import express from 'express'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node';

const app = express();

const defaultData = { moodTrackerData:[] };
const adapter = new JSONFile('db.json');
const db = new Low(adapter, defaultData);

app.use(express.json());

let moodTracker = [];

app.post('/moodList', (req, res) => {
    console.log(req.body);
    let currentDate = Date();
    let obj = {
        date: currentDate,
        mood: req.body.number
    }

    db.data.moodTrackerData.push(obj);
    db.write()
    .then(() => {
        res.json({task:"success"});
    })
}) 

app.use('/', express.static('public'));

app.listen(8000, () => {
    console.log('listening at localhost:8000');
})

app.get('/getMood', (req,res) => {
    db.read()
    .then(() => {
        let obj = {data: db.data.moodTrackerData}
        res.json(obj);
    })
})