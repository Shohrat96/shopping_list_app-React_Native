import React from 'react';
import { Button, View, StyleSheet, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ListsPage from '../screens/ListsPage'
import { TouchableOpacity } from 'react-native-gesture-handler';
import SingleListContent from '../screens/SingleListContent';
import SingleListContentEdit from '../screens/SingleListContentEdit';
import { Ionicons } from '@expo/vector-icons' 

const RegularListStack=({navigation})=>{
    const {Navigator, Screen}=createStackNavigator();
    React.useLayoutEffect(()=>{
        navigation.setOptions({
            headerRight:()=>(
                <TouchableOpacity onPress={()=>navigation.openDrawer()}>
                    <Ionicons name="md-menu" size={30} style={{marginRight:20,color:'#fff'}}/>
                </TouchableOpacity>
            ),
        })
    }, [navigation]);
    return (
        <Navigator screenOptions={{
            headerStyle:{backgroundColor:'#FF7676',borderBottomWidth:0, shadowOpacity:0, elevation:0}, 
            headerTintColor: '#fff',
            headerTitleAlign:'center'
        }}>
            <Screen options={{title:'Regular Lists'}} name="ListsPage" component={ListsPage} initialParams={{isOneTime:false}}/>
            <Screen name="SingleListContent" component={SingleListContent}/>
            <Screen name="SingleListContentEdit" component={SingleListContentEdit}/>
        </Navigator>
    )
}
export default RegularListStack