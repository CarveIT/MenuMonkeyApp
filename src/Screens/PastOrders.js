/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';
 import {
   SafeAreaView,
   StatusBar,
   StyleSheet,
   FlatList
 } from 'react-native';
 
 import Color from '../Utilities/Color';
 import PastOrderCell from '../Components/PastOrderCell';
 import { pastOrders } from '../Data';
 
 const PastOrders = (props) => {
   renderItem = ({item}) => {
     return (
       <PastOrderCell item={item} />
     );
   }
 
   return (
     <SafeAreaView style={styles.container}>
       <StatusBar barStyle={'dark-content'} />
       <FlatList
         data={pastOrders}
         style={styles.list}
         renderItem={(item) => renderItem(item)}
         keyExtractor={(item) => item.id}
         ListHeaderComponent={this.headerView}
         // onEndReached={this.loadMore()}
         ListFooterComponent={this.footerView}
       />
     </SafeAreaView>
   );
 };
 
 const styles = StyleSheet.create({
   container: {
     flex:1,
     backgroundColor: Color.BG_GRAY
   },
   list: {
     backgroundColor: Color.BG_GRAY
   }
 });
 export default PastOrders;
 