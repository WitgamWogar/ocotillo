import axios from 'axios';
import app from '../main.js';
import util from './util';

export default function setup() {
    // Request Interception
    axios.interceptors.request.use(config => {
        app.$network.busy = true;
        if (!config.params) {
            config.params = {};
        }
        app.$validator.clear();

        return config;
    });

    // Response Interception
    axios.interceptors.response.use(
        response => {
            app.$network.busy = false;
            return response;
        },
        error => {
            app.$validator.clear();

            if (!error.response) {
                app.notify(
                    'An error occurred on the server. If the issue persists, contact an administrator.',
                    'red',
                    7000
                );
                app.$network.busy = false;
                
                return;
            }

            if (error.response.status === 401) {
                console.log('Forbidden');
            } else if (error.response.status === 422) {
                if (error.response.data.message) {
                    // I do not like that class-validator calls this array message instead of messages
                    // I do not like that class-validator makes me parse strings insted of creating -
                    // an object keyed with the targets
                    for (let idx in error.response.data.message) {
                        let original = error.response.data.message[idx];
                        let key = original.replace(/ .*/,'');
                        let name = util.ucwords(key.replace(/_/g, ' '));
                        let errorMsg = original.substring(original.indexOf(" ") + 1);
                        
                        app.$validator.add({field: key, msg: `${name} ${errorMsg}`});
                        
                        let errorTexts = document.getElementsByClassName('error--text');
                        setTimeout(() => {
                            if (errorTexts.length) {
                                util.scrollToElement(errorTexts[0]);
                            }
                        }, 1);
                    }
                } else {
                    app.notify(
                        'An error occurred on the server. If the issue persists, contact an administrator.',
                        'red',
                        7000
                    );    
                }
            } else if (error.response.status === 403) {
                app.notify('You do not have permission to perform this action.', 'red');
            } else if (error.response.status === 500) {
                app.notify(
                    'An error occurred on the server. If the issue persists, contact an administrator.',
                    'red',
                    7000
                );
            } else {
                console.log(error);
            }

            app.$network.busy = false;

            return Promise.reject(error);
        }
    );
}
