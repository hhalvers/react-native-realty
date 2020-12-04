import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
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

// function RenderComments({comments}) {

//     const renderCommentItem = ({item}) => {
//         return (
//             <View style={{margin: 10}}>
//                 <Text style={{fontSize: 14}}>{item.text}</Text>
//                 <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
//                 <Text style={{fontSize: 12}}>{`-- ${item.author}, ${item.date}`}</Text>
//             </View>
//         );
//     };

//     return (
//         <Card title='Comments'>
//             <FlatList
//                 data={comments}
//                 renderItem={renderCommentItem}
//                 keyExtractor={item => item.id.toString()}
//             />
//         </Card>
//     );
// }

function RenderCampsite(props) {


    const { campsite } = props;

    var image_array = [];

    campsite.photos.forEach( element => {
        image_array.push({source: { uri: element}});
    });


    if (campsite) {
        console.log(image_array);
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


                <Icon
                    name={props.favorite ? 'heart' : 'heart-o'}
                    type='font-awesome'
                    color='#f50'
                    raised
                    reverse
                    onPress={() => props.favorite ?
                        console.log('Already set as a favorite') : props.markFavorite()}
                />
            </Card>
        );
    }
    return <View />;
}

class CampsiteInfo extends Component {

    markFavorite(campsiteId) {
        this.props.postFavorite(campsiteId);
    }

    static navigationOptions = {
        title: 'Property Information'
    }

    render() {
        const campsiteId = this.props.navigation.getParam('campsiteId');
        const campsite = this.props.allProperties.allProperties.filter(campsite => campsite.id === campsiteId)[0];
        return (
            <ScrollView>
                <RenderCampsite campsite={campsite}
                    favorite={this.props.favorites.includes(campsiteId)}
                    markFavorite={() => this.markFavorite(campsiteId)}
                />
                {/* <RenderComments comments={comments} /> */}
            </ScrollView>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CampsiteInfo);