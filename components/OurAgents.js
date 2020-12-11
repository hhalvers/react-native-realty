import React, { Component } from 'react';
import { Card, Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';
import { View, Image, StyleSheet, Text, FlatList } from 'react-native';
import * as MailComposer from 'expo-mail-composer';
import call from 'react-native-phone-call';




const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        promotions: state.promotions,
        partners: state.partners,
        ourAgents: state.ourAgents
    };
};




class Search extends Component {

    static navigationOptions = {
        title: 'Our Agents'
    }

    sendMail = (name) => {
        MailComposer.composeAsync({
            recipients: [name],
            subject: 'Inquiry',
            body: ` ${name}, \n\n I would like to get in touch with you about buying a house.` 
        })
    }

    callPhone = (phone_number) => {
        const args = {
            number: phone_number,
            prompt: true,
          };
          // Make a call
          call(args).catch(console.error);
    }

    render() {
        const { navigate } = this.props.navigation;
        const renderDirectoryItem = ({ item }) => {
            return (
                // <Tile
                //     titleStle={styles.title}
                //     title={item.name}
                //     caption={item.description}
                //     featured
                //     imageSrc={{uri: baseUrl + item.img}}
                // />
                <Card
                    // featuredTitle={item.name}
                    image={{ uri: baseUrl + item.img }}
                >
                     <Text style={{ margin: 10, textAlign: 'center', fontSize: 20  }}>
                        {item.name}
                    </Text>                   
                    <Text style={{ margin: 10}}>
                        {item.description}
                    </Text>
                    {/* <Button
                        icon={{
                            name: "mail",
                            size: 15,
                            color: "white"
                        }}
                        title="send email"
                        onPress={() => this.sendMail(item.name)}
                    /> */}
                                        <View style={styles.cardRow}>
                        <Icon
                            name="envelope"
                            type='font-awesome'
                            color='blue'
                            raised
                            reverse
                            onPress={() => this.sendMail(item.name)}
                        />
                        <Icon
                            name="phone"
                            type='font-awesome'
                            color='green'
                            raised
                            reverse
                            onPress={() => this.callPhone("5555555555")}
                        />

                    </View>
                </Card>
            );
        };

        if (this.props.ourAgents.isLoading) {
            return <Loading />;
        }
        if (this.props.ourAgents.errMess) {
            return (
                <View>
                    <Text>{this.props.ourAgents.errMess}</Text>
                </View>
            );
        }
        console.log(JSON.stringify(this.props));

        return (

            <FlatList
                data={this.props.ourAgents.ourAgents}
                renderItem={renderDirectoryItem}
                keyExtractor={item => item.id.toString()}
            />
        );
    }
}

const styles = StyleSheet.create({
    stretch: {

        resizeMode: 'contain'
    },
    cardRow: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        margin: 20
    },
    title: {
        color: 'red',
        backgroundColor: 'black'
    }
});

export default connect(mapStateToProps)(Search);