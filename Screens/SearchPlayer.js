import React from 'react';
import { AsyncStorage } from 'react-native'
import { Body, Button, Card, CardItem, Col, Container, Content, Footer, FooterTab, Grid, H1, H3, Header, Icon, Input, Item, Left, List, ListItem, Right, Spinner, Text, Thumbnail, View, Separator } from "native-base";
import Layout from './Layout';
import PlayerList from '../Components/Player/PlayerList';

export default class SearchPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      queryString: "",
      foundPlayers: [],
      recentPlayers: [],
      isLoading: false
    };

    getRecentPlayers().then((recentPlayers) => {
      this.setState(prev => {
        prev.recentPlayers = recentPlayers;
        return prev;
      });
    });

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
    let {navigate} = this.props.navigation;
    let playerPressHandler = (player) => {
      addRecentPlayers(player)
        .then(() => navigate('Player', {playerId: player.account_id}));
    };

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

        {this.state.foundPlayers.length ? <PlayerList players={this.state.foundPlayers} playerPressHandler={playerPressHandler} navigate={navigate}/> : null}

        <Separator>
          <Text style={{fontSize: 16}}>Recent</Text>
        </Separator>
        {this.state.recentPlayers.length ? <PlayerList players={this.state.recentPlayers} playerPressHandler={playerPressHandler} navigate={navigate}/> : <Text>No recent searches</Text>}
      </Layout>
    );
  }
}


const getRecentPlayers = () => {
  return AsyncStorage.getItem('recentPlayers')
    .then((recentPlayers) => {
      recentPlayers = JSON.parse(recentPlayers);
      if (!Array.isArray(recentPlayers)) return [];
      return recentPlayers;
    });
};

const addRecentPlayers = (player) => {
  return getRecentPlayers()
    .then((recentPlayers) => {
      recentPlayers = recentPlayers.filter(p => p.account_id !== player.account_id);
      return AsyncStorage.setItem('recentPlayers', JSON.stringify([player].concat(recentPlayers)));
    });
};