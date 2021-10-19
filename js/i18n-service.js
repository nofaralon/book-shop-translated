'use strict'

var gTrans = {
    title: {
        en: 'Welcome to my Bookshop!',
        he: 'ברוכים הבאים לחנות הספרים שלי!'
    },
    'add-book': {
        en: 'ADD a Book',
        he: 'הוסף ספר'
    },
    name: {
        en: 'Book name',
        he: 'שם הספר'
    },
    price: {
        en: 'Price',
        he: 'מחיר'
    },
    update: {
        en: 'Update',
        he: 'עדכן'
    },
    actions: {
        en: 'Actions',
        he: 'פעולות',
    },
    'next-page': {
        en: 'Next-Page',
        he: 'עמוד הבא',
    },
    rate: {
        en: 'Book rate:',
        he: 'דירוג הספר: ',
    },
    close: {
        en: 'Close',
        he: 'סגור'
    },
    read: {
        en: 'Read',
        he: 'מידע'
    },
    delete: {
        en: 'Delete',
        he: 'מחק'
    },
    id: {
        en: 'Id',
        he: 'מספר סידורי'
    }
}

var gCurrLang = 'en';

function getTrans(transKey) {

    var keyTrans = gTrans[transKey]
    // TODO: if key is unknown return 'UNKNOWN'
    if(!keyTrans) return 'UNKNOWN';
    // TODO: get from gTrans
    var txt = keyTrans[gCurrLang]
    // TODO: If translation not found - use english
    if(!txt) txt = keyTrans.en;
    return txt;
}

function doTrans() {
    // TODO: 
    // for each el:
    //    get the data-trans and use getTrans to replace the innerText 
    var els = document.querySelectorAll('[data-trans]')
    els.forEach((el) => {
        var elTrans = el.dataset.trans
    //  ITP: support placeholder    
        if(el.nodeName === 'INPUT'){
            el.placeholder = getTrans(elTrans)
        } else {
            el.innerText = getTrans(elTrans)
        }
    })

}

function setLang(lang) {
    gCurrLang = lang;
}
