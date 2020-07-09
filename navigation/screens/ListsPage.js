import React, { useEffect } from 'react';
import {Button, Text, StyleSheet, View, AsyncStorage, Alert} from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { getLists, deleteList } from '../../store/lists';
import ListItem from './components/ListItem';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons' 


const mapStateToProps=state=>({
    lists:getLists(state),
})
const ListsPage=connect(mapStateToProps,{deleteList})((props)=>{
    
    console.log(props);
    const {lists}=props;
    const {navigation}=props;
    const {isOneTime}=props.route.params;
    React.useLayoutEffect(()=>{
        navigation.setOptions({
            headerRight:()=>(
                <TouchableOpacity onPress={()=>navigation.openDrawer()}>
                    <Ionicons name="md-menu" size={30} style={{marginRight:20,color:'white'}}/>
                </TouchableOpacity>
            ),
        })
    }, [navigation]);
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {   
                    lists.map(list=>{
                        if (list.isOneTime===isOneTime){
                            return (
                                <TouchableOpacity 
                                key={list.listId} 
                                onPress={()=>navigation.navigate('SingleListContent',{listItem:list})}
                                onLongPress={()=>props.deleteList(list)}
                                >
                                    <ListItem listItem={list}/>
                                </TouchableOpacity>
                            )
                        }
                    })
                }
            </View>
        </View>
    )
})
export default ListsPage

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FF7676',
    },
    content:{
        backgroundColor:'white',
        borderTopStartRadius:25,
        borderTopEndRadius:25,
        paddingVertical:16,
        flex:1,
        paddingHorizontal:16
    }
})