import React from 'react';
import { Button, View, StyleSheet, Text, Alert } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ListsPage from '../screens/ListsPage'
import { TouchableOpacity } from 'react-native-gesture-handler';
import SingleListContent from '../screens/SingleListContent';
import SingleListContentEdit from '../screens/SingleListContentEdit';
import Header from '../screens/components/Header';
import { Ionicons } from '@expo/vector-icons' 

const RegularListStack=({navigation})=>{
    const {Navigator, Screen}=createStackNavigator();
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
        <Navigator screenOptions={{
            title:'One Time Lists', 
            headerStyle:{backgroundColor:'#FF7676',borderBottomWidth:0, elevation:0, shadowOpacity:0}, 
            headerTintColor: '#fff',
            headerTitleAlign:'center'
        }} >
            <Screen name="ListsPage" component={ListsPage} initialParams={{isOneTime:true}}/>
            <Screen name="SingleListContent" component={SingleListContent}/>
            <Screen name="SingleListContentEdit" component={SingleListContentEdit}/>
        </Navigator>
    )
}
export default RegularListStack