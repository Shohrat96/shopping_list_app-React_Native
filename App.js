import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Alert } from 'react-native';
import RootNavigation from './navigation/RootNavigation';
import Home from './navigation/stackNavigation/RegularListStack';
import {createDrawerNavigator, DrawerItemList, DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native'
import {Provider, connect} from 'react-redux';
import store from './store';
import RegularListStack from './navigation/stackNavigation/RegularListStack';
import AddNewList from './navigation/screens/AddNewList';
import OneTimeList from './navigation/stackNavigation/OneTimeList';
import UserSettings from './navigation/screens/UserSettings';
import HeaderComponent from './navigation/screens/components/Header';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import Settings from './navigation/stackNavigation/Settings';
const avatarImg=require('./assets/defaultUserAvatar.png')




const CustomDrawerContent=(props)=>{
  const reduxState=props.store.getState();
  return (
    <View style={{flex:1}}>
      <View style={styles.drawerHeadWrap}>
        <Image style={{width:50, height:50, marginLeft:16}} source={avatarImg}/>
        <Text style={styles.userName}>{reduxState.lists.currentUser.username}</Text>
      </View>
      <View style={styles.content}>
        {props.state.routes.map((item)=>{
          return (
            <TouchableOpacity onPress={()=>props.navigation.navigate(item.name)}>
              <Item item={item}/>
            </TouchableOpacity>
          )
        })}
      </View>

    </View>
  );
}

//item
function Item(props) {
  const {item}=props;

  return (
    <TouchableOpacity style={styles.listItem} onPress={props.onPress}>
      <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
  );
}

const App=()=>{
  const {Navigator, Screen}=createDrawerNavigator()
    
    return (
      <Provider store={store}>
          <NavigationContainer>
              <Navigator 
                initialRouteName={'One Time List'}
                drawerPosition={'left'}
                drawerContent={CustomDrawerContent}
                drawerContentOptions={{store:store}}
              >
                  <Screen name="Add New List" component={AddNewList} />
                  <Screen name="One Time List" component={OneTimeList} />
                  <Screen name="Regular Lists" component={RegularListStack} />
                  <Screen name="User Settings" component={Settings} />
                  
              </Navigator>
          </NavigationContainer>
      </Provider>
    )
}
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItem:{
    width:250,
    height:34,
    backgroundColor:'white',
    borderRadius:38,
    alignItems:'center',
    justifyContent:'center',
    marginBottom:30
  },
  title:{
      fontSize:14,
      textTransform:'uppercase',
      textAlign:'center',
      fontWeight:'bold',
      color:'#FF7676'
  },
  userName:{
    marginLeft:22,
    fontSize:24,
    color:'#303234',
    opacity:0.65
  },

  drawerHeadWrap:{
    flexDirection:'row',
    //height:64,
    alignItems:'center',
    paddingTop:25,
    marginVertical:15
  },
  content:{
    borderTopStartRadius:25,
    borderTopEndRadius:25,
    paddingVertical:16,
    flex:1,
    backgroundColor:'#FF7676',
    alignItems:'center',
  }
});
