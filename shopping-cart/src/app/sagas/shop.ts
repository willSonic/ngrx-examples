import {Http} from '@angular/http';
import {createSaga, Saga, whenAction, toPayload} from 'store-saga';
import {REQUEST_PRODUCTS, RECEIVED_PRODUCTS} from '../reducers/products';
import {CHECKOUT_REQUEST, CHECKOUT_FAILURE, CHECKOUT_SUCCESS} from '../reducers/cart';
import {REQUEST_AUDIODATA, RECEIVED_AUDIODATA} from '../reducers/audioData';
import * as shop from '../../api/shop';
import * as audioRemote from '../../api/audioRemotes';
import { Observable } from 'rxjs/Observable';


const load = () => {
    return saga$ => saga$
        .filter(whenAction(REQUEST_PRODUCTS))
        .mergeMap(() => shop.default.getProducts(300))
        .map(res => {
            return {
                type: RECEIVED_PRODUCTS,
                payload: res
            };
        });
};


const fetchAudio = () => {
    return saga$ => saga$
        .filter(whenAction(REQUEST_AUDIODATA))
        .mergeMap(() => audioRemote.default.getTrack("https://upload.wikimedia.org/wikipedia/en/d/db/Rapper%27s_Delight_sample.ogg"))
        .map(res => {
                return {
                    type: RECEIVED_AUDIODATA,
                    payload: res
                };
        });
};

const checkout = () => {
    return saga$ => saga$
        .filter(whenAction(CHECKOUT_REQUEST))
        .map(toPayload)
        .mergeMap(payload => shop.default.buyProducts(payload, 300))
        .map(res => {
            return {
                type: CHECKOUT_SUCCESS,
                payload: res
            };
        });
};


export default [
    load,
    fetchAudio,
    checkout
].map(effect => createSaga(effect));