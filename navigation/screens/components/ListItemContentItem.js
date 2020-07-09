import React from 'react';
import { StyleSheet, Text, View, Alert, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import {toggleContentItemBought} from '../../../store/lists'
import crossIcon from '../../../assets/cross.png';
import penIcon from '../../../assets/pen.png';

const ListItemContentItem=({listItemContentItem,style,editHandler,editMode, deleteHandler,listId})=>{
    const dispatch=useDispatch();
    const boughtToggleHandler=(payload)=>{
        dispatch(toggleContentItemBought(payload));
    }
    return (
        <TouchableOpacity onLongPress={()=>{boughtToggleHandler({...listItemContentItem,listId})}}>
            <View>
                <View style={[styles.listItemContentItem,style, listItemContentItem.itemBought ? {opacity:0.5}: null]}>
                {editMode? <TouchableOpacity containerStyle={styles.editBtn} onPress={editHandler}>
                    <Image source={penIcon} style={{width:15,height:15}} />
                </TouchableOpacity>:null}
                    <Text style={styles.itemName}>{listItemContentItem.itemName}</Text>
                    <Text style={styles.itemAmount}>{listItemContentItem.itemCount}{listItemContentItem.itemUnit}</Text>
                    {editMode ? <TouchableOpacity   containerStyle={styles.delBtn} onPress={deleteHandler}> 
                        <Image source={crossIcon} style={{width:15,height:15}} />
                    </TouchableOpacity>:null}
                </View>
            </View>
        </TouchableOpacity>

    )
}
const styles=StyleSheet.create({
    listItemContentItem:{
        borderWidth:2,
        borderRadius:27,
        flexDirection:"row",
        justifyContent:'space-between',
        marginBottom:14,
        borderColor:'#FFE194',
        alignItems:'center',
        height:40,
        paddingHorizontal:10
    },
    itemName:{
        color:'black',
        marginRight:'auto'
    },
    itemAmount:{
        color:'black'
    },
    editBtn:{
        width:40,
        height:40,
        borderRadius:35,
        backgroundColor:'#FFD976',
        alignItems:'center',
        justifyContent:'center',
        marginLeft:-10,
        marginRight:10
    },
    delBtn:{
        width:40,
        height:40,
        borderRadius:35,
        backgroundColor:'#FF7676',
        alignItems:'center',
        justifyContent:'center',
        marginRight:-10,
        marginLeft:10
    }
})
export default ListItemContentItem