import React, { useState, useEffect } from 'react';
import {Button, Text, StyleSheet, View, AsyncStorage} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { addList } from '../../store/lists';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons' 


const mapStateToProps=(state)=>{
    const {lists}=state;
    return {
        lists:lists
    }
}
const {Navigator, Screen}=createStackNavigator();

const AddNewListStack=(props)=>{
    return (
        <Navigator  screenOptions={{
            headerStyle:{backgroundColor:'#FF7676',borderBottomWidth:0,elevation:0, shadowOpacity:0}, 
            
            headerTintColor: '#fff',
            headerTitleAlign:'center'
        }} >
            <Screen name="Add New List" component={AddNewList}/>
        </Navigator>
    )
}

const AddNewList=connect(mapStateToProps, {addList})((props)=>{

    const {navigation}=props;
    const [newListParams, setNewListParams]=useState({newListName:'', newListTypeOneTime:true});
    const createNewList=()=>{
        props.addList(newListParams);
        const redirectTo=newListParams.newListTypeOneTime===true ? 'One Time List' : 'Regular Lists';
        navigation.navigate(redirectTo);
        AsyncStorage.setItem('state',JSON.stringify(props.lists))
    }
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
        <View style={styles.newListWrapper}>
            <View style={styles.newListContent}>
                <Text style={styles.lstName}>List name</Text>
                <TextInput style={styles.listName} defaultValue="Something for me" value={newListParams.newListName} onChangeText={(value)=>{setNewListParams(prevState=>{
                    return {
                        ...prevState,
                        newListName:value
                    }
                })}} />
                <View style={styles.chooseListType}>
                    <TouchableOpacity onPress={()=>setNewListParams(prevState=>{
                        return {
                            ...prevState,
                            newListTypeOneTime:true
                        }
                    })} containerStyle={{width:'45%'}} style={[styles.btnChooseType, newListParams.newListTypeOneTime===true? {backgroundColor:'grey'}:{backgroundColor:'#EEEEEE'}]}>
                        <Text>One Time</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>setNewListParams(prevState=>{
                        return {
                            ...prevState,
                            newListTypeOneTime:false
                        }
                    })}containerStyle={{width:'45%'}} style={[styles.btnChooseType, newListParams.newListTypeOneTime===false? {backgroundColor:'grey'}:{backgroundColor:'#EEEEEE'}]}>
                        <Text >Regular</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.createBtnWrapper}>
                    <TouchableOpacity containerStyle={{width:'100%'}} style={styles.createListBtn} onPress={()=>{createNewList()}}>
                        <Text style={styles.crtBtnText}>CREATE LIST</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
})
export default AddNewListStack;

const styles=StyleSheet.create({
    newListWrapper:{
        textAlign:'center',
        backgroundColor:'#FF7676',
        flex:1,
    },
    lstName:{
        textAlign:'center'
    },
    newListContent:{
        backgroundColor:'white',
        borderTopStartRadius:25,
        borderTopEndRadius:25,
        paddingVertical:16,
        flex:1,
        paddingHorizontal:16
    },
    listName:{
        textAlign:'center',
        backgroundColor:'#EEEEEE',
        borderWidth:1,
        borderColor:'transparent',
        height:42,
        borderRadius:45,
        marginBottom:14
        

    },
    chooseListType:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:14
    },
    btnChooseType:{
        paddingHorizontal:40,
        backgroundColor:'#EEEEEE',
        justifyContent:'center',
        height:42,
        borderRadius:45
    },
    createListBtn:{
        backgroundColor:'#FF7676',
        height:42,
        borderWidth:1,
        borderRadius:39,
        paddingHorizontal:10,
        paddingVertical:10,
        textAlign:'center',
        borderColor:'transparent'
    },
    crtBtnText:{
        textAlign:'center',
        color:'white'
    }
})