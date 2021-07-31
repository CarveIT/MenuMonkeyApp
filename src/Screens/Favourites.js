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
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   View,
   FlatList
 } from 'react-native';
 
 import Color from '../Utilities/Color';
 import { favourites } from '../Data';
 import FavouriteCell from '../Components/FavouriteCell';
 import HomeHeader from '../Components/HomeHeader';
 
 const Favourites = (props) => {
 
   renderItem = ({item}) => {
     return (
       <FavouriteCell item={item} />
     );
   }
 
   return (
     <SafeAreaView style={styles.container}>
       <StatusBar barStyle={'dark-content'} />
       <FlatList
         data={favourites}
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
     backgroundColor: Color.BG_ORANGE
   },
   list: {
     backgroundColor: Color.BG_ORANGE
   }
 });
 export default Favourites;
 