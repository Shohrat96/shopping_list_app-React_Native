import React, { useState } from 'react';
import { Button, View, StyleSheet, Text, Alert } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ListsPage from '../screens/ListsPage'
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import SingleListContent from '../screens/SingleListContent';
import SingleListContentEdit from '../screens/SingleListContentEdit';
import { Ionicons } from '@expo/vector-icons' 
import { setUser } from '../../store/lists';
import { useDispatch } from 'react-redux';
import { color } from 'react-native-reanimated';


const SettingsScreen=(props)=>{
    const dispatch=useDispatch();
    const {navigation}=props;
    const [fields,setFields]=useState({
        username:'',
        avatarUri:''
    })
    React.useLayoutEffect(()=>{
        navigation.setOptions({
            
            headerRight:()=>(
                <TouchableOpacity onPress={()=>navigation.openDrawer()}>
                    <Ionicons name="md-menu" size={30} style={{marginRight:20,color:'white'}}/>
                </TouchableOpacity>
            ),
            headerStyle:{backgroundColor:'#FF7676',borderBottomWidth:0, elevation:0, shadowOpacity:0},
            headerTintColor: '#fff',
        })
    }, [navigation]);
    return (
        <View style={styles.mainWrapper}>
            <View style={styles.content}>
                <View style={styles.userNameWrap}>
                    <Text style={styles.labelName}>username</Text>
                    <TextInput style={styles.nameField} value={fields.username} placeholder="username" onChangeText={(value)=>setFields(prevState=>{
                        return {
                            ...prevState,
                            username:value
                        }
                    })}/>
                </View>
                <View style={styles.avatarWrap}>
                    <Text style={styles.labelAvatar}>avatar url</Text>
                    <TextInput style={styles.avatarField} value={fields.avatarUri} placeholder="enter url" onChangeText={(value)=>setFields(prevState=>{
                        return {
                            ...prevState,
                            avatarUri:value
                        }
                    })}/>
                </View>
                <TouchableOpacity containerStyle={styles.saveBtn} onPress={()=>{dispatch(setUser(fields)); navigation.navigate('One Time List')}}>
                    <View style={styles.saveBtnWrap}>
                        <Text style={styles.saveBtnText}>SAVE CHANGES</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}


const Settings=({navigation})=>{
    const {Navigator, Screen}=createStackNavigator();
    return (
        <Navigator screenOptions={{
            title:'User Settings', 
            headerStyle:{backgroundColor:'#FF7676'/*,borderBottomWidth:0, elevation:0, shadowOpacity:0*/}, 
            headerTintColor: '#fff',
            headerTitleAlign:'center'
        }} >
            <Screen name="Settings" component={SettingsScreen}/>
        </Navigator>
    )
}
export default Settings

const styles=StyleSheet.create({
    mainWrapper:{
        flex:1,
        backgroundColor:'#FF7676',

    },
    userNameWrap:{
        width:'100%',
        alignItems:'center'
    },
    avatarWrap:{
        width:'100%',
        alignItems:'center'
    },
    labelName:{
        marginBottom:8,
        color:'#303234',
    },
    labelAvatar:{
        marginBottom:8,
        color:'#303234',

    },
    content:{
        backgroundColor:'white',
        borderTopStartRadius:25,
        borderTopEndRadius:25,
        flex:1,
        paddingTop:10,
        paddingHorizontal:14,
        alignItems:'center'
    },
    nameField:{
        width:'100%',
        backgroundColor:'#EEEEEE',
        borderRadius:45,
        height:42,
        textAlign:'center',
        marginBottom:15
    },
    avatarField:{
        width:'100%',
        backgroundColor:'#EEEEEE',
        borderRadius:45,
        height:42,
        textAlign:'center',
        marginBottom:15
    },
    saveBtn:{
        backgroundColor:'#FF7676',
        height:42,
        borderRadius:39,
        paddingVertical:10,
        textAlign:'center',
        width:'100%'
    },
    saveBtnText:{
        color:'white',
        textAlign:'center'
    }
})