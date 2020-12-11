import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Image, StyleSheet, Share, TouchableOpacity } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        comments: state.comments,
        favorites: state.favorites,
        allProperties: state.allProperties
    };
};

const mapDispatchToProps = {
    postFavorite: campsiteId => (postFavorite(campsiteId))
};


function RenderCampsite(props) {
   const { campsite } = props;

   var currentImage = "";

    const shareCampsite = (title, message, url) => {
        Share.share({
            title: title,
            message: `${title}: ${message} ${url}`,
            url: url
        }, {
            dialogTitle: 'Share ' + title
        });
    };

    if (campsite) {
        //  props.setImg(campsite.photos[2])
        currentImage = baseUrl + campsite.photos[0];

        return (
            <Card
                featuredTitle={campsite.address}
                image={{ uri: baseUrl + campsite.img }}>
                <Text style={{ margin: 10, fontSize: 24 }}>
                    Beds: {campsite.beds} Baths: {campsite.baths}
                </Text>
                <Text style={{ margin: 10, fontSize: 20 }}>
                    Price: {campsite.price}
                </Text>
                <Text style={{ margin: 10 }}>
                    {campsite.description}
                </Text>

                <View style={styles.imgRow}>
                <Icon
                    name={props.favorite ? 'heart' : 'heart-o'}
                    type='font-awesome'
                    color='#f50'
                    raised
                    reverse
                    onPress={() => props.favorite ?
                        console.log('Already set as a favorite') : props.markFavorite()}
                />
                <Icon
                    name={'share'}
                    type='font-awesome'
                    color='#5637DD'
                    raised
                    reverse
                    onPress={() => shareCampsite(campsite.address, campsite.description, baseUrl + campsite.img)}
                />
                </View>
                <Image
                    source={{ uri: baseUrl + campsite.img }}
                // style={{ width: 200, height: 200 }}
                />

                <View style={styles.imgRow}>
                    <Image
                        style={styles.tinyLogo}
                        source={{
                            uri: baseUrl + campsite.photos[0],
                        }}
                    />
                    <TouchableOpacity onPress={()=> currentImage = baseUrl + campsite.photos[1]}>
                    <Image
                        style={styles.tinyLogo}
                        source={{
                            uri: baseUrl + campsite.photos[1],
                        }}
                    />
                    </TouchableOpacity>
                    <Image
                        style={styles.tinyLogo}
                        source={{
                            uri: baseUrl + campsite.photos[2],
                        }}
                    />
                    <Image
                        style={styles.tinyLogo}
                        source={{
                            uri: baseUrl + campsite.photos[3],
                        }}
                    />
                </View>
                <Image
                    style={styles.bigImg}
                    source={{
                        uri: currentImage,
                    }}
                />


            </Card>
        );
    }
    return <View />;
}


const shareCampsite = (title, message, url) => {
    Share.share({
        title: title,
        message: `${title}: ${message} ${url}`,
        url: url
    }, {
        dialogTitle: 'Share ' + title
    });
};


class PropertyInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentImage: ""       
        };
    }

    updateImage(image) {
            this.setState({currentImage: image})
    }

    markFavorite(campsiteId) {
        this.props.postFavorite(campsiteId);
    }

    static navigationOptions = {
        title: 'Property Information'
    }

    

    render() {
        const campsiteId = this.props.navigation.getParam('campsiteId');
        const campsite = this.props.allProperties.allProperties.filter(campsite => campsite.id === campsiteId)[0];
        const favorite= this.props.favorites.includes(campsiteId);
        const markFavorite=() => this.markFavorite(campsiteId);



        return (
            <ScrollView>
                {/* <RenderCampsite campsite={campsite}
                    favorite={this.props.favorites.includes(campsiteId)}
                    markFavorite={() => this.markFavorite(campsiteId)}
                /> */}
                        <Card
                featuredTitle={campsite.address}
                image={{ uri: baseUrl + campsite.img }}>
                <Text style={{ margin: 10, fontSize: 24 }}>
                    Beds: {campsite.beds} Baths: {campsite.baths}
                </Text>
                <Text style={{ margin: 10, fontSize: 20 }}>
                    Price: {campsite.price}
                </Text>
                <Text style={{ margin: 10 }}>
                    {campsite.description}
                </Text>

                <View style={styles.imgRow}>
                <Icon
                    name={favorite ? 'heart' : 'heart-o'}
                    type='font-awesome'
                    color='#f50'
                    raised
                    reverse
                    onPress={() => favorite ?
                        console.log('Already set as a favorite') : markFavorite()}
                />
                <Icon
                    name={'share'}
                    type='font-awesome'
                    color='#5637DD'
                    raised
                    reverse
                    onPress={() => shareCampsite(campsite.address, campsite.description, baseUrl + campsite.img)}
                />
                </View>
                <Image
                    source={{ uri: baseUrl + campsite.img }}
                // style={{ width: 200, height: 200 }}
                />

                <View style={styles.imgRow}>
                <TouchableOpacity onPress={() => this.updateImage(baseUrl + campsite.photos[0])}>
                    <Image
                        style={styles.tinyLogo}
                        source={{
                            uri: baseUrl + campsite.photos[0],
                        }}
                    />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.updateImage(baseUrl + campsite.photos[1])}>
                    <Image
                        style={styles.tinyLogo}
                        source={{
                            uri: baseUrl + campsite.photos[1],
                        }}
                    />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.updateImage(baseUrl + campsite.photos[2])}>
                    <Image
                        style={styles.tinyLogo}
                        source={{
                            uri: baseUrl + campsite.photos[2],
                        }}
                    />
                    </TouchableOpacity>
                   <TouchableOpacity onPress={() => this.updateImage(baseUrl + campsite.photos[3])}>
                    <Image
                        style={styles.tinyLogo}
                        source={{
                            uri: baseUrl + campsite.photos[3],
                        }}
                    />
                    </TouchableOpacity>
                </View>
                <Image
                    style={styles.bigImg}
                    source={{
                        uri: this.state.currentImage === "" ? baseUrl + campsite.photos[0] : this.state.currentImage,
                    }}
                />


            </Card>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
    },
    bigImg: {
        width: '100%',
        height: undefined,
        aspectRatio: 1
    },
    tinyLogo: {
        width: 80,
        height: undefined,
        aspectRatio: 1
    },
    logo: {
        width: 66,
        height: 58,
    },
    imgRow: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        margin: 20
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(PropertyInfo);