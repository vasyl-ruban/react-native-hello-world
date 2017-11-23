import React from 'react';
import { Body, Button, Card, CardItem, Col, Container, Content, Footer, FooterTab, Grid, H1, H3, Header, Icon, Input, Item, Left, List, ListItem, Right, Spinner, Text, Thumbnail, View, Tab, Tabs, TabHeading, Separator, Row, Title } from "native-base";
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
        <Body>
        <Text>Feedback</Text>
        </Body>
      </Layout>
    );
  }
}
