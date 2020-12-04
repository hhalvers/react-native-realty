import React, { Component } from 'react';

import { Tile } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import Loading from './LoadingComponent';

const mapStateToProps = state => {
    return {
        // campsites: state.campsites,
        allProperties: state.allProperties
    };
};

class Directory extends Component {

    static navigationOptions = {
        title: 'Properties'
    }


    render() {
        const { navigate } = this.props.navigation;
        const renderDirectoryItem = ({item}) => {
            return (
                <Tile
                    titleStle={styles.title}
                    title={item.address}
                    caption={item.price}
                    featured
                    onPress={() => navigate('CampsiteInfo', { campsiteId: item.id })}
                    imageSrc={{uri: baseUrl + item.img}}
                />
            );
        };

        if (this.props.allProperties.isLoading) {
            return <Loading />;
        }
        if (this.props.allProperties.errMess) {
            return (
                <View>
                    <Text>{this.props.allProperties.errMess}</Text>
                </View>
            );
        }
        console.log(JSON.stringify(this.props));

        return (

            <FlatList
            data={this.props.allProperties.allProperties}
            renderItem={renderDirectoryItem}
            keyExtractor={item => item.id.toString()}
        />
        );
    }
}


const styles = StyleSheet.create({

    title: {
        color: 'red',
        backgroundColor: 'black',
        fontFamily: 'Satisfy_400Regular'
    }
});

export default connect(mapStateToProps)(Directory);