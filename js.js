window.addEventListener('load', () => {

    const dataForm = document.querySelector('form');
    dataForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let fio = document.querySelectorAll("[type='text']"),
            skills = document.querySelectorAll("[name='skill']");
        fio.forEach(function (val, key) {
            document.cookie = `${val.name}=${val.value}`;   // запись в Cookie
            localStorage.setItem(val.name, val.value);      // запись в Local Storage    
        });
        let arr = [];
        skills.forEach(function (val, key) {
            if (val.checked) arr.push(val.value);
        });
        localStorage.setItem('Навыки', arr);           // запись в Local Storage
        document.cookie = `Навыки=${arr.toString()}`;  // запись в Cookie
    });

    // запись значений в поля формы
    let fio = document.querySelectorAll("[type='text']"),
        skills = document.querySelectorAll("[name='skill']");
    let records = {};
    document.cookie.split('; ').forEach((v, i) => {
        let array = v.split('=');
        records[array[0]] = array[1];
    })

    fio.forEach( (v, i) => {
        let name = v.getAttribute('name');
        if (records.hasOwnProperty(name)) {
            v.value = records[name];
        }
    
        // Запись значений в инпуты из Local Storage
        // if (localStorage.getItem(name)) {
        //     v.value = localStorage.getItem(name);
        // }
    
    } );
    let skillArr;
    if (records['Навыки']) {
        skillArr = records['Навыки'].split(','); 
    }

    // Данные для чекбоксов из Local Storage
    // if (localStorage.getItem('Навыки')) {
    //     skillArr = localStorage.getItem('Навыки').split(',');
    // }
    
    skills.forEach( (v, i) => {
        if ( skillArr && skillArr.includes( v.getAttribute('value') ) ) {
            v.checked = 1;
        }
    } );
    
});