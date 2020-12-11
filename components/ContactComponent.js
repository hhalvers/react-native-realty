import React, { Component } from 'react';
import { Text, ScrollView, View, TextInput, Button, StyleSheet, TouchableOpacity, Picker, Alert } from 'react-native';
import { Input } from 'react-native-elements';


class Contact extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rent: 'rent',
            name: "",
            email: "",
            phone: ""
        };

        updateRent = (value) => {
            this.setState({rent: value})
        };



    }

    handleSubmit() {
        Alert.alert(
            'Contact Submission',
            'Thank you ' +
            this.state.name + ', someone will be in contact with you shortly!' ,
            [
                {
                    text: 'OK',
                    onPress: () => {
                        this.resetForm();
                    }
                },
            ],
            { cancelable: false }
        )
    }

    static navigationOptions = {
        title: 'Contact Us'
    }


    resetForm = () => {
        this.setState({           
        rent: 'rent',
        name: "",
        email: "",
        phone: ""
    })
    }

    render() {
        return (
            <ScrollView>
               <Text style={styles.headerRow}> Sell your property with the help of our experts. Fill out this form and one of our agents will get back to you! </Text>
               <Input
                    placeholder='Name'
                    leftIcon={{type: 'font-awesome', name: 'user-o'}}
                    onChangeText={name => this.setState({name})}
                    value={this.state.name}
                    containerStyle={styles.formRow}
                    leftIconContainerStyle={styles.formIcon}
                />    
                <Input
                    placeholder='Email'
                    leftIcon={{type: 'font-awesome', name: 'envelope-o'}}
                    onChangeText={email => this.setState({email})}
                    value={this.state.email}
                    containerStyle={styles.formRow}
                    leftIconContainerStyle={styles.formIcon}
                />    
                 <Input
                    placeholder='Phone Number'
                    leftIcon={{type: 'font-awesome', name: 'phone'}}
                    onChangeText={phone => this.setState({phone})}
                    value={this.state.phone}
                    containerStyle={styles.formRow}
                    leftIconContainerStyle={styles.formIcon}
                />            

                <View style={styles.picker}>
                        <Picker
                            style={styles.formRow}
                            selectedValue={this.state.rent}
                            onValueChange = {itemValue => this.setState({ rent: itemValue })}
                            itemStyle={styles.picker}
                            value={this.state.rent}
                            //  onValueChange={itemValue => this.setState({ rent: itemValue })}
                        >
                            <Picker.Item label='rent' value='rent' />
                            <Picker.Item label='buy' value='buy' />
                       
                        </Picker>
                        </View>

                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={() => {
                        this.handleSubmit();
                    }}>
                    <Text style={styles.submitButtonText}> Submit </Text>
                </TouchableOpacity>



            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 23
    },
    input: {
        margin: 15,
        height: 40,
        borderColor: '#7a42f4',
        borderWidth: 1
    },
    submitButton: {
        alignItems: 'center',
        backgroundColor: 'green',
        padding: 10,
        margin: 15,
        height: 40,
        marginLeft: 90,
        marginRight: 90
    },
    submitButtonText: {
        color: 'white'
    },
    headerRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20,
        paddingLeft: 10,
        fontSize: 20      
    },
    formRow: {

        },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    picker: {
        width: 300,
        marginLeft:20,
        marginRight:20,
        borderColor: 'black',
        borderBottomWidth:0,
        alignSelf: 'center'
    },
    formIcon: {
        marginRight: 10
    },
})
export default Contact;