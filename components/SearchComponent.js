import React, { Component } from 'react';
import { Card } from 'react-native-elements';
import { CAMPSITES } from '../shared/campsites';
import { PROMOTIONS } from '../shared/promotions';
import { PARTNERS } from '../shared/partners';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';
import { View, Image, StyleSheet } from 'react-native';
import { Tile } from 'react-native-elements';
import { SearchBar } from 'react-native-elements';



const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        promotions: state.promotions,
        partners: state.partners
    };
};




class Search extends Component {

    static navigationOptions = {
        title: 'Search'
    }

    render() {
        return (
            <View>
              <SearchBar
                  placeholder="Type Here..."

                  />

          </View>
        );
    }
}

const styles = StyleSheet.create({
    stretch: {
    
      resizeMode: 'contain'
    },
    title: {
        color: 'red',
        backgroundColor: 'black'
    }
  });

export default connect(mapStateToProps)(Search);