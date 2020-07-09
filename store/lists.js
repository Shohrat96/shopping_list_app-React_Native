import { Alert } from "react-native";

//acion types
const GET_AS_DATA='SET_AS_DATA_TO_REDUX';
const ADD_LIST='ADD_LIST';
const DELETE_LIST='DELETE_LIST'
const ADD_CONTENT_ITEM='ADD_LIST_CONTENT_ITEM';
const UPDATE_LIST_CONTENT='UPDATE_LIST_CONTENT';
const DELETE_LIST_CONTENT_ITEM='DELETE_LIST_CONTENT_ITEM';
const TOGGLE_IS_BOUGHT='TOGGLE_IS_BOUGHT';
const SET_USER='SET_USER';
const CREATE_USER='CREATE_USER';
const RESET_LIST_CONTENT='RESET_LIST_CONTENT';

//selectors
const MODULE_NAME='lists';
export const getLists=state=>state[MODULE_NAME].lists;
//reducer
const  initialState={
    currentUser:{
        username:"John Smith",
        avatarURL:'./assets/defaultUserAvatar.png'
    },
    lists:[
            {
                listName:'Everything for breakfast',
                isOneTime:false,
                listId:1,
                listContent:[
                    {
                        itemName:'Pasta',
                        itemCount:2,
                        itemUnit:'pkg',
                        itemBought:false,
                        itemId:11
                    },
                    {
                        itemName:'Salt',
                        itemCount:1,
                        itemUnit:'kg',
                        itemBought:false,
                        itemId:12
                    },
                    {
                        itemName:'Sugar',
                        itemCount:1,
                        itemUnit:'kg',
                        itemBought:true,
                        itemId:13
                    }
                ]
            },
            {
                listName:'Everything for one time',
                isOneTime:true,
                listId:2,
                listContent:[
                    {
                        itemName:'Banana',
                        itemCount:2,
                        itemUnit:'kg',
                        itemBought:false,
                        itemId:21
                    },
                    {
                        itemName:'Cherry',
                        itemCount:1,
                        itemUnit:'kg',
                        itemBought:false,
                        itemId:22
                    },
                    {
                        itemName:'Burry',
                        itemCount:1,
                        itemUnit:'kg',
                        itemBought:true,
                        itemId:23
                    }
                ]
            }
        ]
}

export function listsReducer (state=initialState, {type,payload}){
    switch (type){
        
        case SET_USER:
            console.log('set user fired');
            return {
                ...state,
                currentUser:{
                    username:payload.username,
                    avatarURL:payload.avatarUri
                }
            }

        case ADD_LIST: 
        
            return {
                ...state,
                lists:[...state.lists, {
                    listId:`${Math.random()}${Date.now()}`,
                    listName:payload.newListName,
                    isOneTime:payload.newListTypeOneTime,
                    listContent:[],
                }]
            }
        case DELETE_LIST:
            return {
                ...state,
                lists:state.lists.filter(list=>list.listId!==payload.listId)
            }
        case GET_AS_DATA:
            return {
                ...state,
                ...payload
            }

        case ADD_CONTENT_ITEM:
            
            return {
                ...state,
                lists:state.lists.map(list=>{
                    if (list.listId===payload.listId){
                        return {
                            ...list,
                            listContent:[...list.listContent, {
                                itemName:payload.itemNameValue,
                                itemCount:payload.itemCountValue,
                                itemUnit:payload.itemUnitValue,
                                itemBought:false,
                                itemId:`${Date.now()}${Math.random()}`
                            }]
                        }
                    } else {
                        return list
                    }
                })
            }
        case RESET_LIST_CONTENT:
            
            return {
                ...state,
                    lists:state.lists.map(list=>{
                        if (list.listId===payload.listId){
                            return {
                                ...list,
                                listContent:list.listContent.map(item=>{
                                    return {
                                        ...item,
                                        itemCount:0,
                                        itemUnit:'',
                                        itemBought:false,
                                    }
                                    
                                })
                            }
                        } else {
                            return list
                        }
                    })

            }
        case UPDATE_LIST_CONTENT:
            let listsCopy=state.lists;
            let targetList=listsCopy.find(list=>{if(list.listId===payload.listId){return list}});
            let listContentCopy=targetList.listContent;
            listContentCopy=listContentCopy.map(item=>{if(item.itemId===payload.itemIdValue){return { 
                ...item,
                itemName:payload.itemNameValue,
                itemCount:payload.itemCountValue,
                itemUnit:payload.itemUnitValue
            
            }} else {return item}
        
        });
            targetList.listContent=listContentCopy;
            state.lists.map(list=>{if (list.listId===payload.listId){
                return {
                    ...state,
                    list:targetList
                }
            } else {return list}
        }
        )
            
        case DELETE_LIST_CONTENT_ITEM:
            console.log('delete list content item fired. Payload: ',payload);
            return {
                ...state,
                lists:state.lists.map(list=>{
                    if (list.listId===payload.listId){
                        return {
                            ...list,
                            listContent:list.listContent.filter(item=>item.itemId!==payload.itemId)
                        }
                    }else{
                        return list
                    } 
                })
            }
            case TOGGLE_IS_BOUGHT :
                console.log('toggle bought fired',payload);
                return {
                    ...state,
                    lists:state.lists.map(list=>{
                        if (list.listId===payload.listId){
                            return {
                                ...list,
                                listContent:list.listContent.map(item=>{
                                    if (item.itemId===payload.itemId){
                                        return {
                                            ...item,
                                            itemBought:!item.itemBought,
                                        }
                                    }else {return item}
                                })
                            }
                        } else {
                            return list
                        }
                    })

                }

        default:
            return state
    }
}


//action creators

export  const addList=(payload)=>({
    type:ADD_LIST,
    payload
})
export  const addItem=(payload)=>({
    type:ADD_CONTENT_ITEM,
    payload //contains: target listId, listContent. new Id and isBought should be added
})

export const updateListContent=(payload)=>({
    type:UPDATE_LIST_CONTENT,
    payload //contains: target listId, listContent
})
export const deleteListContentItem=(payload)=>({
    type:DELETE_LIST_CONTENT_ITEM,
    payload //contains: target listId, listContentItem properties
})

export const toggleContentItemBought=(payload)=>({
    type:TOGGLE_IS_BOUGHT,
    payload //contains: target listId, listContentItem properties
})

export const setUser=(payload)=>({
    type:SET_USER,
    payload 
})

export const createUser=(payload)=>({
    type:CREATE_USER,
    payload //contains: target listId, listContentItem properties
})

export const deleteList=(payload)=>({
    type:DELETE_LIST,
    payload //contains: target listId
})

export const resetListContent=(payload)=>({
    type:RESET_LIST_CONTENT,
    payload //contains: target listId
})