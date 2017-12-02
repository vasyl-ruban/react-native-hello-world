import React from 'react';
import { Body, Button, Card, CardItem, Col, Container, Content, Footer, FooterTab, Grid, H1, H3, Header, Icon, Input, Item, Left, List, ListItem, Right, Spinner, Text, Thumbnail, View, Tab, Tabs, TabHeading, Separator, Row, Title, Form, Label, Toast } from "native-base";
import Layout from '../Layout';
import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAjk3biiihv-mz7x_QZAUfSTKTSpbCVa0M",
  authDomain: "react-native-hello-world.firebaseapp.com",
  databaseURL: "https://react-native-hello-world.firebaseio.com",
  projectId: "react-native-hello-world",
  storageBucket: "react-native-hello-world.appspot.com",
  messagingSenderId: "533272346721"
};
const app = firebase.initializeApp(config);

const feedbackRef = firebase.database().ref('/feedback');

const feedbackFormFields = {
  email: '',
  name: '',
  message: '',
};

export default class Feedback extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...feedbackFormFields
    };

    this.addFeedback = this.addFeedback.bind(this);
  }

  resetForm() {
    this.setState((prev) => ({...prev, ...feedbackFormFields}));
  }

  addFeedback() {
    let newFeedbackRef = feedbackRef.push();
    newFeedbackRef.set({
      email: this.state.email,
      name: this.state.name,
      message: this.state.message
    });

    Toast.show({
      text: 'Your feedback successfully accepted. Thanks you so much!',
      position: 'bottom',
      buttonText: 'Okay',
      type: 'success',
      duration: 2500
    });

    this.resetForm();
  }

  render () {
    const { navigate } = this.props.navigation;

    return (
      <Layout navigate={navigate}>
        <Header>
          <Left>
            <Button transparent onPress={() => {navigate('DrawerOpen')}}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
          <Title>Feedback</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input
                onChangeText={(email) => this.setState({email})}
                value={this.state.email}
              />
            </Item>
            <Item floatingLabel>
              <Label>Name</Label>
              <Input
                onChangeText={(name) => this.setState({name})}
                value={this.state.name}
              />
            </Item>
            <Item floatingLabel>
              <Label>Message</Label>
              <Input
                onChangeText={(message) => this.setState({message})}
                value={this.state.message}
              />
            </Item>
          </Form>
          <Button block
                  onPress={() => {this.addFeedback()}}
                  style={{marginLeft: 25, marginRight: 25, marginTop: 25}}>
            <Text>Send feedback</Text>
          </Button>
        </Content>
      </Layout>
    );
  }
}
