/**
* Mocking client-server processing
*/
import {jsonProducts} from './productsJSON';
import {Subject, BehaviorSubject, Observable} from 'rxjs';
import "rxjs/Rx";
import {Http} from "@angular/http";
const TIMEOUT = 100;

export default {
    getTrack(URL:string): Observable<any[]> {

        return Observable.create(observer=> {
            let req = new XMLHttpRequest();
            console.log('AudioMachineRemote URL =' + URL)
            req.open('get', URL);
            req.responseType = "arraybuffer";
            req.onreadystatechange = function () {
                if (req.readyState == 4 && req.status == 200) {
                    var audioData= [{"id": 1, "audiobuffer":req.response}];
                    observer.next(audioData);
                    console.log("audioData", audioData);
                    observer.complete();
                }
            };
            req. send();
        });

    }
}