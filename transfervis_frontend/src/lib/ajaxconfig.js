import apiconfig from './apiconfig';
import $ from 'jquery';
$.support.cors = true;

export default function ajax(opts) {
    return $.ajax(Object.assign({
        url: `${apiconfig.host}${opts.path}`,
        dataType: 'json',
        data: opts.data,
        type: "GET"
    }, opts)).catch((err) => {
    	console.error(err);
        //if it's a 401 then redirect to the login.
    	throw(err);
    });
}

export function get(path, data, opts){
	return ajax(Object.assign({
        path: path,
        data: data
    }, opts))
}

export function post(path, data, opts){
	return ajax(Object.assign({
        path: path,
        data: data,
        type: "POST",
    }, opts))
}