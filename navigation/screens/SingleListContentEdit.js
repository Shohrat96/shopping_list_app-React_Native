import React, { useState, useEffect } from 'react';
import { TouchableOpacity} from 'react-native-gesture-handler';
import { Button, Text, StyleSheet, View, ViewPropTypes, Alert, Image, TextInput } from 'react-native';
import ListItemContentItem from './components/ListItemContentItem';
import AddNewList from './AddNewList';
import { connect, useDispatch } from 'react-redux';
import { updateListContent, addItem, getLists,deleteListContentItem } from '../../store/lists';
import saveIcon from '../../assets/save_icon.png'

const mapStateToProps=state=>({
    lists:getLists(state),
})

const SingleListContentEdit=connect(mapStateToProps)((props)=>{
    const dispatch=useDispatch();
    const {navigation}=props;
    const {listId}=props.route.params.listItem;
    const {listItem}=props.route.params;
    let listContent=[];
    props.lists.find(list=>{
        if (list.listId===listId){
            listContent= list.listContent;
        }
    })
    React.useLayoutEffect(()=>{
        navigation.setOptions({
            headerRight:()=>(

                <TouchableOpacity>
                    <Image style={{marginRight:20,width:15,height:15}} source={saveIcon}/>
                </TouchableOpacity>
            ),
            title:`${listItem.listName}`
        })
    }, [navigation]);

    const [itemPropsState, setItemPropsState]=useState({
        itemNameValue:"",
        itemCountValue:0,
        itemUnitValue:'',
        itemIdValue:'',
        listId:listId
    })
    const [isAddToListState, setCurrentState]=useState(true);
    const editBtnHandler=(item)=>{
        setCurrentState(false); 
        setItemPropsState(prevState=>{
            return {
                ...prevState,
                itemNameValue:item.itemName,
                itemCountValue:item.itemCount,
                itemUnitValue:item.itemUnit,
                itemIdValue:item.itemId
            }
        })}
    const deleteBtnHandler=(item)=>{
        dispatch(deleteListContentItem(item));
        setItemPropsState(prevState=>{
            return {
                ...prevState,
                itemNameValue:'',
                itemCountValue:0,
                itemUnitValue:'',
            }
        })
    }

    return (
        <View style={styles.contentEditWrapper}>
            <View style={styles.content}>
                <View style={styles.addItemWrapper}>
                    <View style={styles.nameAndCountWrapper}>
                        <View style={styles.nameWrapper}>
                            <Text style={{textAlign:'center'}}>Item name</Text>
                            <TextInput value={itemPropsState.itemNameValue} style={styles.itemName} onChangeText={(value)=>{setItemPropsState(prevState=>{
                                return {
                                    ...prevState,
                                    itemNameValue:value
                                }
                            })}} />
                        </View>
                        <View style={styles.countWrapper}>
                            <Text style={{textAlign:'center'}}>count</Text>
                            <View style={styles.itemCount}>
                                <TouchableOpacity onPress={()=>setItemPropsState(prevState=>{
                                    return {
                                        ...prevState,
                                        itemCountValue:itemPropsState.itemCountValue!=0 ?itemPropsState.itemCountValue-1 : 0
                                    }
                                })}>
                                    <Text style={{fontWeight:'bold'}}>-</Text>
                                </TouchableOpacity>
                                <TextInput style={{textAlign:'center', fontWeight:'bold', width:'100%'}} value={itemPropsState.itemCountValue.toString()} onChangeText={(value)=>{setItemPropsState(prevState=>{                             
                                return {
                                    ...prevState,
                                    itemCountValue:value
                                }
                                })}}/> 
                                <TouchableOpacity onPress={()=>setItemPropsState(prevState=>{
                                    return {
                                        ...prevState,
                                        itemCountValue:itemPropsState.itemCountValue+1
                                    }
                                })}>
                                   <Text style={{fontWeight:'bold'}}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                    <View style={styles.unitsWrapper}>
                        <TouchableOpacity style={styles.unitButton}  onPress={()=>setItemPropsState(prevState=>{
                                    return {
                                        ...prevState,
                                        itemUnitValue:'pkg'
                                    }
                                })}>
                            <Text style={itemPropsState.itemUnitValue==='pkg'?{fontWeight:'bold'}:{}} >PKG</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.unitButton}  onPress={()=>setItemPropsState(prevState=>{
                                    return {
                                        ...prevState,
                                        itemUnitValue:'kg'
                                    }
                                })}>
                            <Text style={itemPropsState.itemUnitValue==='kg'?{fontWeight:'bold'}:{}}>KG</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.unitButton}  onPress={()=>setItemPropsState(prevState=>{
                                    return {
                                        ...prevState,
                                        itemUnitValue:'litre'
                                    }
                                })}>
                            <Text style={itemPropsState.itemUnitValue==='litre'?{fontWeight:'bold'}:{}}>LITRE</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.unitButton}  onPress={()=>setItemPropsState(prevState=>{
                                    return {
                                        ...prevState,
                                        itemUnitValue:'Gr'
                                    }
                                })}>
                            <Text style={itemPropsState.itemUnitValue==='Gr'?{fontWeight:'bold'}:{}}>Gr</Text>
                        </TouchableOpacity>
                    </View>
                    {
                        isAddToListState===true? 
                        <View style={styles.addToListButtonWrap}>
                            <TouchableOpacity containerStyle={{width:'100%', marginBottom:15}} onPress={()=>{dispatch(addItem(itemPropsState)), setItemPropsState(prevState=>{
                                return {
                                    ...prevState,
                                    itemNameValue:"",
                                    itemCountValue:0,
                                    itemUnitValue:'',
                                }
                            })}}>
                                <Text  style={styles.addToListButton}>Add To List</Text>
                            </TouchableOpacity>
                        </View> :
                        <View style={styles.editListButtonsWrap}>
                            <TouchableOpacity onPress={()=>{ setItemPropsState(prevState=>{return {
                                ...prevState,
                                itemNameValue:'',
                                itemCountValue:0,
                                itemUnitValue:'',                            
                            } }); setCurrentState(!isAddToListState)}}>

                                <Text  style={styles.cancel}>CANCEL</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{dispatch(updateListContent(itemPropsState)), setCurrentState(true), setItemPropsState(prevState=>{
                                return {
                                    ...prevState,
                                    itemNameValue:"",
                                    itemCountValue:0,
                                    itemUnitValue:'',
                                }
                            })}}>
                                <Text  style={styles.update}>UPDATE</Text>
                            </TouchableOpacity>
                        </View>
                    }

                </View>
                {
                   listContent.map(item=>{
                        return (
                                <ListItemContentItem listId={listId} editMode={true} deleteHandler={()=>deleteBtnHandler({...item,listId:listId})} editHandler={()=>editBtnHandler(item)} style={styles.contentItem} key={item.itemId} listItemContentItem={item}/>                       
                        )
                    })
                }
             </View>
        </View>
    )
})

export default SingleListContentEdit;

const styles=StyleSheet.create({
    contentEditWrapper:{
        backgroundColor:'#FF7676',
        flex:1,
    },
    nameWrapper:{
        width:'70%',
        marginRight:10
    },
    countWrapper:{
        width:'25%',
    },
    content:{
        backgroundColor:'white',
        borderTopStartRadius:25,
        borderTopEndRadius:25,
        flex:1,
        paddingTop:10,
        paddingHorizontal:14
    },
    addItemWrapper:{

    },
    itemEdit:{
        backgroundColor:'pink'
    },
    itemDelete:{
        backgroundColor:'pink'
    },
    nameAndCountWrapper:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:10
    },
    itemName:{
        backgroundColor:'#EEEEEE',
        borderRadius:45,
        height:42,
        textAlign:'center',
        width:'100%',
    },
    itemCount:{
        backgroundColor:'#EEEEEE',
        borderRadius:45,
        height:42,
        textAlign:'center',
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        paddingHorizontal:12,
        width:'100%'
    },
    unitsWrapper:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:20
    },
    unitButton:{
        paddingVertical:10,
        paddingHorizontal:10,
        backgroundColor:'#EEEEEE',
        borderRadius:45
    },
    addToListButtonWrap:{

    },
    addToListButton:{
        backgroundColor:'#FF7676',
        height:42,
        borderWidth:0,
        borderRadius:39,
        paddingVertical:10,
        textAlign:'center',
        color:'white',
        fontWeight:'bold'
    },
    editListButtonsWrap:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:15
    },
    cancel:{
        backgroundColor:'#FF7676',
        width:150,
        height:42,
        borderWidth:1,
        borderRadius:39,
        paddingHorizontal:10,
        paddingVertical:10,
        textAlign:'center',
        color:'white',
        borderColor:'transparent'
    },
    update:{
        backgroundColor:'#FF7676',
        width:150,
        height:42,
        borderWidth:1,
        borderRadius:39,
        paddingHorizontal:10,
        paddingVertical:10,
        textAlign:'center',
        color:'white',
        borderColor:'transparent'
    }
})