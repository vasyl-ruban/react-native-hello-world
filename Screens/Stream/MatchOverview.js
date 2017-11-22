import React from 'react';
import { Body, Button, Card, CardItem, Col, Container, Content, Footer, FooterTab, Grid, H1, H3, Header, Icon, Input, Item, Left, List, ListItem, Right, Spinner, Text, Thumbnail, View, Title } from "native-base";
import Layout from '../Layout';

export default class MatchList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      matchPage: this.props.navigation.state.params.matchPage,
      streams: []
    };


    fetch(`http://188.226.147.71:3000/matches/${this.state.matchPage}/streams`)
      .then((res) => res.json())
      .then((res) => {
        this.setState((prev) => {
          prev.streams = res;
          return prev;
        });
      });
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <Layout navigate={navigate}>
        <Header>
          <Left>
            <Button transparent onPress={() => {this.props.navigation.goBack()}}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Streams</Title>
          </Body>
          <Right />
        </Header>
        {this.state.streams.length ? streamsView(navigate)(this.state.streams) : <Spinner />}
      </Layout>
    );
  }
}

const streamsView = (navigate) => (streams) => {
  let views = streams.map(streamView(navigate));
  return (
    <List>
      {views}
    </List>
  );
};

const streamView = (navigate) => (stream) => {
  return (
    <ListItem style={{marginLeft: 0}} onPress={() => {navigate("Stream", {streamLink: stream.streamLink, chatLink: stream.chatLink})}}>
      <Body>
        <Text>{stream.streamerName}</Text>
      </Body>
    </ListItem>
  );
};
