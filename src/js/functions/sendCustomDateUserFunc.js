import {CustomDateUser} from '../classes/CustomDateUser.js';

document.getElementById('btn-js').onclick = function(e) {
   	e.preventDefault()
    let dateUser = new CustomDateUser();
	dateUser.sendRequest()
};
