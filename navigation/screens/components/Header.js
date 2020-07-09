import React from 'react';
import { Button, View, StyleSheet, Text, Image, SafeAreaView, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';



const HeaderComponent=(props)=>{
    console.log(props)
    return (
        <SafeAreaView>
            <View style={styles.customHeader}>
                <Text>this is header</Text>
            </View>
            <ScrollView>
                
            </ScrollView>
        </SafeAreaView>
    )
}
export default HeaderComponent

const styles=StyleSheet.create({
    customHeader:{
        backgroundColor:'red',
        height:60,
    },
    openDrawerBtn:{

    }
})