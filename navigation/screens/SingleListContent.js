import React, { useEffect } from 'react';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import { Button, Text, StyleSheet, View, Image, Alert } from 'react-native';
import ListItemContentItem from './components/ListItemContentItem';
import SingleListContentEdit from './SingleListContentEdit';
import pen from '../../../my-new-project/assets/pen.png'
import { getLists, resetListContent } from '../../store/lists';
import { connect } from 'react-redux';
import penIcon from '../../../my-new-project/assets/pen.png'


const mapStateToProps=state=>({
    lists:getLists(state),
})

const SingleListContent=connect(mapStateToProps,{resetListContent})((props)=>{
    
    const {navigation}=props;
    const {listItem}=props.route.params;
    const listContent=props.lists.find(list=>list.listId===listItem.listId).listContent;
    console.log('props in single list content',props);
    const boughtItemsArray=listItem.listContent.filter(item=>item.itemBought===true);
    const boughtItemCount=boughtItemsArray.length;
    const allListItemContentItemCount=listItem.listContent.length;


    React.useLayoutEffect(()=>{
        navigation.setOptions({
            headerRight:()=>(

                <TouchableOpacity onPress={()=>navigation.navigate('SingleListContentEdit',{listItem:listItem})}>
                    <Image style={{marginRight:20,width:15,height:15}} source={penIcon}/>
                </TouchableOpacity>
            ),
            title:`${listItem.listName}`
        })
    }, [navigation]);
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.resetAndStatusWrap}>
                    <TouchableOpacity containerStyle={styles.resetBtn} onPress={()=>props.resetListContent(listItem)}>
                        <Text style={styles.resetBtnText}>Reset</Text>
                    </TouchableOpacity>
                    <Text>{boughtItemCount}/{allListItemContentItemCount}</Text>
                </View>

                {
                    listContent.map(item=>{
                        return <ListItemContentItem editMode={false} key={item.itemId} listItemContentItem={item}/>
                    })
                }
            </View>
        </View>
    )
})
export default SingleListContent;

const styles=StyleSheet.create({
    container:{
        backgroundColor:'#FF7676',
        flex:1,
    },
    resetBtnText:{
        color:'white',
        textAlign:'center',
        textTransform:'uppercase'
    },
    resetBtn:{
        backgroundColor:'#FF7676',
        borderRadius:50,
        width:72,
        paddingVertical:2
    },
    content:{
        backgroundColor:'white',
        borderTopStartRadius:25,
        borderTopEndRadius:25,
        paddingVertical:16,
        flex:1,
        paddingHorizontal:14
    },
    resetAndStatusWrap:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:15
    },
    editBtn:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical:10,
        paddingHorizontal:10,
        backgroundColor:'pink'
    }
})