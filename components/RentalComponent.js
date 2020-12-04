import React, { Component } from 'react';
import { ListItem } from 'react-native-elements';
import { ALL_PROPERTIES } from '../shared/allProperties';
import { Tile } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { View, FlatList, Text } from 'react-native';
import Loading from './LoadingComponent';

const mapStateToProps = state => {
    return {
        rentalProperties: state.rentalProperties
    };
};

class RentalProperties extends Component {

    static navigationOptions = {
        title: 'Rental Properties'
    }

    render() {
        const { navigate } = this.props.navigation;
        const renderDirectoryItem = ({item}) => {
            return (
                <Tile
                    title={item.address}
                    caption={item.description}
                    featured
                    onPress={() => navigate('CampsiteInfo', { campsiteId: item.id })}
                    imageSrc={{uri: baseUrl + item.image}}
                />
            );
        };


        return (
            <FlatList
            data={this.props.rentalProperties.rentalProperties}
            renderItem={renderDirectoryItem}
            keyExtractor={item => item.id.toString()}
        />
        );
    }
}

export default connect(mapStateToProps)(RentalProperties);