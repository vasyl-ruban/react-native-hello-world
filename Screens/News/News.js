import React from 'react';
import { WebView, Linking } from 'react-native';
import { Body, Button, Card, CardItem, Col, Container, Content, Footer, FooterTab, Grid, H1, H3, Header, Icon, Input, Item, Left, List, ListItem, Right, Spinner, Text, Thumbnail, View, Tab, Tabs, TabHeading, Separator, Row, Title, Switch } from "native-base";
import Layout from '../Layout';

export default class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      joindotaFeed: [],
      dotabuffFeed: []
    };

    fetch('http://188.226.147.71:3000/news/feed/0')
      .then((res) => res.json())
      .then((res) => this.setState({joindotaFeed: res}));

    fetch('http://188.226.147.71:3000/news/feed/1')
      .then((res) => res.json())
      .then((res) => this.setState({dotabuffFeed: res}));
  }

  render() {
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
            <Title>News</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Tabs>
            <Tab heading={<TabHeading><Text>Article</Text></TabHeading>}>
              <WebView
                source={{uri: "http://188.226.147.71:3000/news/feed/1/2017-11-28-dealing-with-puck"}}
                style={{width: 600, height: 900}}
              />
            </Tab>
            <Tab heading={<TabHeading><Text>joinDOTA</Text></TabHeading>}>
              {this.state.joindotaFeed.map((item) =>
                <ListItem onPress={() => {navigate('Article', {feedId: 0, articleId: item.id})}}>
                  <Body>
                    <Text>{item.title}</Text>
                  </Body>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                </ListItem>
              )}
            </Tab>

            <Tab heading={<TabHeading><Text>dotabuff</Text></TabHeading>}>
              {this.state.dotabuffFeed.map((item) =>
                <ListItem onPress={() => {navigate('Article', {feedId: 1, articleId: item.id})}}>
                  <Body>
                    <Text>{item.title}</Text>
                  </Body>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                </ListItem>
              )}
            </Tab>
          </Tabs>
        </Content>
      </Layout>
    );
  }
}
