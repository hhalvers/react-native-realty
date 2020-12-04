import React, { Component } from 'react';
import { Text, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Card } from 'react-native-elements';
import { FlatList } from 'react-native';
import { PARTNERS } from '../shared/partners';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';


const mapStateToProps = state => {
    return {
        partners: state.partners
    };
};


function RenderMission() {

    return (
        <Card wrapperStyle={{ margin: 20 }}
            title="Our Mission">

            <Text >
                We present a curated database of the best campsites in the vast woods and backcountry of the World Wide Web Wilderness. We increase access to adventure for the public while promoting safe and respectful use of resources. The expert wilderness trekkers on our staff personally verify each campsite to make sure that they are up to our standards. We also present a platform for campers to share reviews on campsites they have visited with each other.
            </Text>
        </Card>


    );
}


class About extends Component {


    static navigationOptions = {
        title: 'About Us'
    }

    render() {
        const renderPartner = ({ item }) => {
            return (
                <ListItem
                    title={item.name}
                    subtitle={item.description}
                    leftAvatar={{ source: {uri: baseUrl + item.image}}}
                />
            );
        };

        return (
            <ScrollView>
                <RenderMission />
                <Card 
                    title="Community Partners">
                    <FlatList 
                        data={this.props.partners.partners}
                        renderItem={renderPartner}
                        keyExtractor={item => item.id.toString()}
                    />

                </Card>
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(About);