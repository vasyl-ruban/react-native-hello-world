import React from 'react';
import { Body, Button, Card, CardItem, Col, Container, Content, Footer, FooterTab, Grid, H1, H3, Header, Icon, Input, Item, Left, List, ListItem, Right, Spinner, Text, Thumbnail, View } from "native-base";
import Layout from '../Layout';

export default class MatchList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      matchPage: this.props.navigation.state.params.matchPage,
      streams: []
    };


    fetch(`http://192.168.0.105:3000/matches/${this.state.matchPage}/streams`)
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
        {this.state.streams.length ? streamsView(navigate)(this.state.streams) : <Spinner />}
      </Layout>
    );
  }
}

const streamsView = (navigate) => (streams) => {
  let views = streams.map(streamView(navigate));
  return (
    <List>
      <ListItem itemDivider>
        <Text>Streams</Text>
      </ListItem>
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
