import React from 'react';
import { Body, Button, Card, CardItem, Col, Container, Content, Footer, FooterTab, Grid, H1, H3, Header, Icon, Input, Item, Left, List, ListItem, Right, Spinner, Text, Thumbnail, View, Tab, Tabs, TabHeading, Separator, Row, Title, Form, Label } from "native-base";
import Layout from '../Layout';

export default class Feedback extends React.Component {
  constructor(props) {
    super(props);
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
              <Input />
            </Item>
            <Item floatingLabel>
              <Label>Name</Label>
              <Input />
            </Item>
            <Item floatingLabel>
              <Label>Message</Label>
              <Input />
            </Item>
          </Form>
          <Button block style={{marginLeft: 25, marginRight: 25, marginTop: 25}}>
            <Text>Send feedback</Text>
          </Button>
        </Content>
      </Layout>
    );
  }
}
