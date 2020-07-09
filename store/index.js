import {createStore, combineReducers} from 'redux';
import { listsReducer, updateListContent } from './lists';
import { AsyncStorage } from 'react-native';
const rootReducer=combineReducers({
    lists: listsReducer,
})

const store = createStore(rootReducer);

async function updateAS(){
    const state=store.getState();
    await AsyncStorage.setItem('shop-list-data',JSON.stringify(state));
}

export const GET_AS_DATA='SET_AS_DATA_TO_REDUX';
const setAsData=(payload)=>({
    type:GET_AS_DATA,
    payload 
});
 


async function getDataAs(){
    const data=await AsyncStorage.getItem('shop-list-data');
    if (data){
        console.log('data in storage ',data);
        const dataJson=JSON.parse(data);
        store.dispatch(setAsData(dataJson.lists));
    }
}
getDataAs()
store.subscribe(updateAS);
export default store;
