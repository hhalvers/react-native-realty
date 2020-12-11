import React, { Component } from 'react';

import { Tile, Card } from 'react-native-elements';
import { connect, TouchableOpacity } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { View, ScrollView, FlatList, Text, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';
import Loading from './LoadingComponent';

const mapStateToProps = state => {
    return {
        // campsites: state.campsites,
        allProperties: state.allProperties
    };
};

class Directory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rentCheck: true,
            buyCheck: true
        };
    }

    static navigationOptions = {
        title: 'Properties'
    }


    render() {
        const { navigate } = this.props.navigation;
        const renderDirectoryItem = ({ item }) => {
            return (
                <Tile
                    titleStyle={styles.title}
                    title={item.address}
                    caption={item.price}
                    captionStyle={styles.captions}
                    featured
                    onPress={() => navigate('PropertyInfo', { campsiteId: item.id })}
                    imageSrc={{ uri: baseUrl + item.img }}
                    containerStyle={styles.container}
                />
                //  <TouchableOpacity key={item.id} >
                //     <Card
                //         image={{ uri: baseUrl + item.img }}
                //         button onPress={() => navigate('CampsiteInfo', { campsiteId: item.id })}
                //     >
                //         {/* <View>
                //         <Text style={styles.cardRow}>
                //             {item.address}
                //         </Text>
                //     </View> */}
                //         <View style={styles.row}>
                //             <View style={styles.inputWrapLeft}>
                //                 <Text style={styles.label}>{item.address}</Text>
                //             </View>

                //             <View style={styles.inputWrapRight}>
                //                 <Text style={styles.label}>{item.price}</Text>
                //             </View>
                //         </View>
                //     </Card>
                //  </TouchableOpacity>
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

        const rentals = this.props.allProperties.allProperties.filter(property => property.rent == "true");
        const purchases = this.props.allProperties.allProperties.filter(property => property.rent == "false");
        var filteredPropertyList = [];

        if (this.state.rentCheck) filteredPropertyList.push(...rentals);
        if (this.state.buyCheck) filteredPropertyList.push(...purchases);

        return (
            <ScrollView>
                <View style={styles.checkBoxes}>
                    <CheckBox
                        title='Rent'
                        checked={this.state.rentCheck}
                        onPress={() => this.setState({ rentCheck: !this.state.rentCheck })}
                    /><CheckBox
                        title='Buy'
                        checked={this.state.buyCheck}
                        onPress={() => this.setState({ buyCheck: !this.state.buyCheck })}
                    />
                </View>
                <FlatList
                    data={filteredPropertyList}
                    renderItem={renderDirectoryItem}
                    keyExtractor={item => item.id.toString()}
                />
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    container: {

    },
    title: {
        color: "white",
        textDecorationColor: "yellow",
        textShadowColor: "black",
        textShadowRadius: 10,
        margin: 24,
        backgroundColor: 'rgba(0,0,0,.2)',

    },
    captions: {
        color: "white",
        textDecorationColor: "yellow",
        textShadowColor: "black",
        textShadowRadius: 10,
        margin: 24,
        backgroundColor: 'rgba(0,0,0,.2)',
        fontSize: 20

    },
    checkBoxes: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardRow: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        margin: 20
    },
    row: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    inputWrapLeft: {
        flex: 1,
        fontSize: 20,
        textAlign: 'left',
        alignSelf: 'stretch'

    },
    inputWrapRight: {
        flex: 1,
        fontSize: 30,
        flexDirection: 'row-reverse'
    }

});

export default connect(mapStateToProps)(Directory);