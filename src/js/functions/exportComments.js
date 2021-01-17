import {Export} from '../classes/Export.js';

document.getElementById('export-btn-js').onclick = function(e) {
   	e.preventDefault()
    let export_inst = new Export();
	export_inst.exprot()
};
