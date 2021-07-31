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
import { connect } from 'react-redux';
import Color from '../Utilities/Color';
import { categories } from '../Data';
import CategoryCell from '../Components/CategoryCell';
import HomeHeader from '../Components/HomeHeader';

// const arr = [
//   {"sec0": ["td0", "td1", "td2", "td3", "td4", "td5"]},
//   {"sec1": ["td0", "td1", "td2", "td3", "td4", "td5"]},
//   {"sec2": ["td0", "td1", "td2", "td3", "td4", "td5"]}
// ]

const arr = [
  ["td0", "td1", "td2", "td3", "td4", "td5"],
  ["td0", "td1", "td2", "td3", "td4", "td5"],
  ["td0", "td1", "td2", "td3", "td4", "td5"]
]

const Home = (props) => {

  renderItem = ({ item }) => {
    return (
      <CategoryCell item={item} {...props} />
    );
  }

  getRandomColor = () => { return 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')'; }

  guidGenerator = () => {
    var S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
  }

  renderTR = (trData) => {
    return (
      <View key={guidGenerator()} style={{ flexDirection: 'row', flex: 1, height: 50, marginTop: 10, backgroundColor: getRandomColor() }}>
        {/* {trData.map(td => {
          return renderTD(td)
        })} */}
      </View>
    )
  }

  renderTD = (tdData) => {
    return (
      <View key={guidGenerator()} style={{ flex: 1, backgroundColor: getRandomColor() }}></View>
    )
  }

  const SquareView = (props) => {
    return (
      <View
        style={{
          height: props.size,
          width: props.size,
          backgroundColor: props.color,
        }}
      />
    );
  };

  // return (
  //   <ScrollView horizontal={true} >
  //     <SquareView size={100} color="red" />
  //     <SquareView size={100} color="blue" />
  //     <SquareView size={100} color="green" />
  //     <SquareView size={100} color="yellow" />
  //     <SquareView size={100} color="gray" />
  //     <SquareView size={100} color="cyan" />
  //     <SquareView size={100} color="black" />
  //   </ScrollView>
  // )

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      {/* <ScrollView horizontal>
        <View style={{flex: 1, flexDirection: 'row', alignSelf: 'stretch',alignItems: 'flex-start',backgroundColor:'red'}}>
          {arr.map((tr) => {
           renderTR(tr)
          })}
        </View>
      </ScrollView> */}


      {/* <ScrollView horizontal>
        {arr.map((tr) => {
          return <View key={guidGenerator()} style={{ width: 200, height: 200, backgroundColor: getRandomColor() }}></View>
        })}
      </ScrollView> */}


      <HomeHeader title={'Ibadan Fresh'} subTitle={'520 W kennedy Blvd, Tampa, FL33606'} />
      <FlatList
        data={categories}
        style={styles.list}
        columnWrapperStyle={{ justifyContent: 'space-around' }}
        renderItem={(item) => renderItem(item)}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ListHeaderComponent={this.headerView}
        // onEndReached={this.loadMore()}
        ListFooterComponent={this.footerView}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.WHITE
  },
  list: {
    backgroundColor: Color.BG_BLUE
  }
});

const mapStateToProps = (state) => {
  return {
    'myName': state.name
  }
}

export default connect(mapStateToProps)(Home);
