let g_users = [];
let g_user;
const usersKey = 'registered_users';
const userKey = 'current_user';

class Person{
    name;
    pass;
    constructor(fname, lname, pw){
        if(!(typeof(fname)=='string' & typeof(lname)=='string' &
             typeof(pw)=='string')){
                throw new TypeError('parameters must be strings');
        }
        this.name = fname + '/' + lname;
        this.pass = pw;
    }
}

function SetUser(form){
    if(!(form instanceof HTMLFormElement))
        throw new TypeError('not a form element')
    let name1 = null, name2 = null, pw = null;
    for(let i of form.elements){
        switch(i.name){
            case 'name1': name1 = i.value; break;
            case 'name2': name2 = i.value; break;
            case 'pw': pw = i.value; break;
            default: break;
        }
    }

    if(name1 == '' || name2 == '' || pw == '')
        throw EvalError('missing info');
    let user = new Person(name1, name2, pw);

    console.log(`current: ${user.key}`);

    if( g_users.find(x => x.name == user.name) !== undefined )
        return false;

    g_users.push(user);
    return true;
}

function GetUsers(){
    let eUsers = localStorage.getItem(usersKey);
    if(eUsers != null)
        g_users = JSON.parse(eUsers);
}

function LogInUser(form){
    if(!(form instanceof HTMLFormElement))
        throw new TypeError('not a form element')
    let name1 = null, name2 = null, pw = null;
    for(let i of form.elements){
        switch(i.name){
            case 'name1': name1 = i.value; break;
            case 'name2': name2 = i.value; break;
            case 'pw': pw = i.value; break;
            default: break;
        }
    }

    if(name1 == '' || name2 == '' || pw == '')
        throw EvalError('missing info');
    g_user = new Person(name1, name2, pw);
}

export {SetUser, GetUsers, LogInUser, usersKey, userKey, g_users, g_user};