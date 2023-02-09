import * as caching from './js/caching.js'
import GetText from './js/loader.js';

document.register = function (e){
    e.preventDefault();
    let registered = caching.SetUser(e.target);
    if(!registered){
        alert('User already exists!');
    } else {
        alert('Registered!');
    }
};

document.LogIn = function (e){
    e.preventDefault();
    let currUser = caching.g_user;
    let name1 = document.getElementById('name1');
    let name2 = document.getElementById('name2');
    if(currUser == undefined){
        caching.LogInUser(e.target.parentElement);
        sessionStorage.setItem(caching.userKey, JSON.stringify(caching.g_user));
        name1.setAttribute('disabled','true');
        name2.setAttribute('disabled', 'true');
        e.target.innerText = 'Log Out';
    } else {
        sessionStorage.removeItem(caching.userKey);
        caching.g_user = undefined;
        name1.setAttribute('disabled','false');
        name2.setAttribute('disabled', 'false');
        e.target.innerText = 'Log In';
    }
};

caching.GetUsers();
window.onbeforeunload = () =>
    localStorage.setItem(caching.usersKey, JSON.stringify(caching.g_users))
;

// set dynamic text
const introArticle = document.getElementById('intro');
const introText = GetText('article','intro');
let tmp = introArticle.firstChild;
tmp.after(introText);

const pSize = document.querySelector('footer > p:first-child');
const showSize = () => {
    const dpi = window.devicePixelRatio;
    const w = window.innerWidth;
    const h = window.innerHeight;
    pSize.innerText = `${Math.round(w)} x ${Math.round(h)}, ${dpi}`;
}
showSize();
window.onresize = showSize;

const h1s = document.getElementsByTagName('h1');
const h2s = document.getElementsByTagName('h2');
for(let i=0; i < h1s.length; i++){
    let h = h1s[i];
    h.after(document.createElement('hr'));
}
for(let i=0; i < h2s.length; i++){
    let h = h2s[i];
    h.after(document.createElement('hr'));
}

const pwElem = document.getElementById('pw');
pwElem.setAttribute('pattern','[\w0-9@$_]+');