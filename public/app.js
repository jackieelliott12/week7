window.addEventListener('load', ()=> {
    document.getElementById('button-mood').addEventListener('click', ()=> {
        let moodList = document.getElementById('mood-list').value;
        console.log(moodList);

        let obj = {"number" : moodList};
        let jsonData = JSON.stringify(obj);

        fetch('/moodList', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: jsonData
        })
         .then(response => response.json())
         .then(data => {console.log(data)})

    })

    document.getElementById('get-tracker').addEventListener('click', ()=> {
        fetch('/getMood')
        .then(resp=> resp.json())
        .then(data => {
            document.getElementById('mood-info').innerHTML = '';
            console.log(data.data);
            for(let i=0; i<data.data.length;i++) {
                let string = data.data[i].date + " : " + data.data[i].mood;
                let elt = document.createElement('p');
                elt.innerHTML = string;
                document.getElementById('mood-info').appendChild(elt);
            }
        })
    })
})