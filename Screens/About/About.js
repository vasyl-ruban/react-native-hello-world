import React from 'react';
import { Body, Button, Card, CardItem, Col, Container, Content, Footer, FooterTab, Grid, H1, H3, Header, Icon, Input, Item, Left, List, ListItem, Right, Spinner, Text, Thumbnail, View, Tab, Tabs, TabHeading, Separator, Row, Title } from "native-base";
import Layout from '../Layout';

export default class About extends React.Component {
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
          <Title>About</Title>
          </Body>
          <Right />
        </Header>
        <Card>
          <CardItem>
            <Body>
              <Text>EasyGame gather for you all useful Dota 2 information: news, players statistics, live streams and others.</Text>
            </Body>
          </CardItem>
            <CardItem>
            <Body>
              <Text>App version 0.0.1-alpha</Text>
            </Body>
            </CardItem>
              <CardItem>
            <Body>
              <Text>WARNING: project is on alpha stage and it can have huge amount of bugs.</Text>
            </Body>
              </CardItem>
                <CardItem>
            <Body>
              <Text>If you have any questions or proposals, please, feel free to left feedback.</Text>
            </Body>
                </CardItem>
                  <CardItem>
            <Body>
              <Text>We will do our best to add features you are looking for.</Text>
            </Body>
          </CardItem>
        </Card>
      </Layout>
    );
  }
}
