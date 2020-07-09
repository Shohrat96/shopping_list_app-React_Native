import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';

const ListItem=({listItem})=>{
    const boughtItemsArray=listItem.listContent.filter(item=>item.itemBought===true);
    console.log('listContent in here',listItem.listContent);
    const boughtItemCount=boughtItemsArray.length;
    const allListItemContentItemCount=listItem.listContent.length;
    const statusPercentage=boughtItemCount/allListItemContentItemCount*100;
    
    return (
        <View style={styles.listItem}>
            <View style={styles.nameAndCountWrapper}>
                <Text style={styles.listItemName}>{listItem.listName}</Text>
                <Text style={styles.listItemStatus}>{boughtItemCount}/{allListItemContentItemCount}</Text>
            </View>
            <View style={styles.statusBarContainer}>
                <View style={[styles.statusBarContent, {width:allListItemContentItemCount!==0?  `${statusPercentage}%`: 0}]}></View>
            </View>
        </View>
    )
}
const styles=StyleSheet.create({
    listItem:{
        borderWidth:2,
        borderColor:'#FFE194',
        paddingVertical:10,
        borderRadius:10,
        paddingHorizontal:10,
        marginBottom:10
    },
    nameAndCountWrapper:{
        flexDirection:"row",
        justifyContent:'space-between'
    },
    listItemName:{
        color:'black'
    },
    listItemStatus:{
        color:'black'
    },
    statusBarContainer:{
        width:'100%',
        backgroundColor:'#EEEEEE',
        borderRadius:10,
        marginTop:8,
    },
    statusBarContent:{
        height:15,
        backgroundColor:'#FFD976',
        borderRadius:10

    }
})
export default ListItem;