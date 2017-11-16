import React from 'react';
import { Body, Button, Card, CardItem, Col, Container, Content, Footer, FooterTab, Grid, H1, H3, Header, Icon, Input, Item, Left, List, ListItem, Right, Spinner, Text, Thumbnail, View } from "native-base";
import Layout from './Layout';
import PlayerList from '../Components/Player/PlayerList';

export default class SearchPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      queryString: "",
      foundPlayers: [],
      isLoading: false
    };

    this.searchPlayer = this.searchPlayer.bind(this);
    this.queryStringUpdate = this.queryStringUpdate.bind(this);
  }

  queryStringUpdate(value) {
    this.setState(prev => {
      prev.queryString = value;
      return prev;
    })
  }

  searchPlayer() {
    this.setState(prev => {
      prev.isLoading = true;
      return prev;
    });
    fetch('https://api.opendota.com/api/search?q=' + this.state.queryString)
      .then(response => response.json())
      .then(response => {
        this.setState(prev => {
          prev.foundPlayers = response;
          prev.isLoading = false;
          return prev;
        });
      });
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <Layout navigate={navigate} activeTab="SearchPlayer">
        <Item>
          <Icon name="ios-people"/>
          <Input placeholder="Search player" onChangeText={this.queryStringUpdate}/>
          <Button transparent onPress={this.searchPlayer}>
            <Text>Search</Text>
          </Button>
        </Item>
        {this.state.isLoading ? <Spinner /> : null}
        {this.state.foundPlayers.length ? <PlayerList players={this.state.foundPlayers} navigate={navigate}/> : null}
      </Layout>
    );
  }
}

