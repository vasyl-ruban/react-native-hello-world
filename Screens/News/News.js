import React from 'react';
import { Body, Button, Card, CardItem, Col, Container, Content, Footer, FooterTab, Grid, H1, H3, Header, Icon, Input, Item, Left, List, ListItem, Right, Spinner, Text, Thumbnail, View, Tab, Tabs, TabHeading, Separator, Row, Title, Switch } from "native-base";
import Layout from '../Layout';
import Feedback from "../Feedback/Feedback";

export default class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avaliableFeeds: [],
      enabledFeeds : []
    };

    getAvailableFeeds()
      .then(feeds => this.setState(prev => ({...prev, avaliableFeeds: feeds})));
    getEnabledFeeds()
      .then(feeds => this.setState(prev => ({...prev, enabledFeeds: feeds})));

  }

  render() {
    const { navigate } = this.props.navigation;
    const enabledFeedsView = this.state.enabledFeeds.map(feedTabView);
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

            <FeedConfigView
              {...this.props}
              heading={<TabHeading><Icon name="settings"/></TabHeading>}
              availableFeeds={this.state.avaliableFeeds}
              enabledFeeds={this.state.enabledFeeds}
            />

          </Tabs>
        </Content>
      </Layout>
    );
  }
}

const getAvailableFeeds = () => (Promise.resolve([
  {
    feedId: 0,
    feedTitle: 'joinDOTA'
  },
  {
    feedId: 1,
    feedTitle: 'dotabuff'
  }
]));

const getEnabledFeeds = () => (Promise.resolve([
  {
    feedId: 1,
    feedTitle: 'dotabuff'
  }
]));

const feedTabView = (feed) => (
  <Tab heading={<TabHeading><Text>{feed.feedTitle}</Text></TabHeading>} key={feed.feedId}>
    <Text>{feed.feedTitle}</Text>
  </Tab>
);

function FeedConfigView({availableFeeds, enabledFeeds, heading}) {
  const enabledFeedsIds = enabledFeeds.map(feed => feed.feedId);

  const feedSwitch = (feed) => {
    return (
      <ListItem>
        <Body><Text>{feed.feedTitle}</Text></Body>
        <Right><Switch value={enabledFeedsIds.indexOf(feed.feedId) !== -1} /></Right>
      </ListItem>
    );
  };
  const feedSwitchList = availableFeeds.map(feedSwitch);

  return (
    <Tab heading={heading}>
      <List>
        {feedSwitchList}
      </List>
    </Tab>
  );
}
