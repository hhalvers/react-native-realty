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




const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        promotions: state.promotions,
        partners: state.partners
    };
};




class Home extends Component {

    static navigationOptions = {
        title: 'Home'
    }

    render() {
        return (
            <View>
                <Image
                    style={styles.stretch}
                    source={require('./images/PalmSprings3.png')}
                />
                {/* <Image
                source={{ uri: './images/PalmSprings2.jpg'}}
                /> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    stretch: {
        width: '100%',  
        height: '100%',
        resizeMode: 'stretch'
    },
    title: {
        color: 'red',
        backgroundColor: 'black'
    }
});

export default connect(mapStateToProps)(Home);