import React, { Component } from 'react';
import { connect } from 'react-redux';

import { View, Image, StyleSheet } from 'react-native';





const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        promotions: state.promotions,
        partners: state.partners
    };
};




class Home extends Component {

    static navigationOptions = {
        title: 'Heath Halverson Realty'
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