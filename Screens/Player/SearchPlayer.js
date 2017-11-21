import React from 'react';
import { AsyncStorage, ListView } from 'react-native'
import { Body, Button, Card, CardItem, Col, Container, Content, Footer, FooterTab, Grid, H1, H3, Header, Icon, Input, Item, Left, List, ListItem, Right, Spinner, Text, Thumbnail, View, Separator, SwipeRow } from "native-base";
import Layout from '../Layout';

export default class SearchPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      queryString: "",
      foundPlayers: [],
      recentPlayers: [],
      isLoading: false
    };

    this.updateRecentPlayers();

    this.searchPlayer = this.searchPlayer.bind(this);
    this.queryStringUpdate = this.queryStringUpdate.bind(this);
  }

  updateRecentPlayers() {
    getRecentPlayers().then((recentPlayers) => {
      this.setState(prev => {
        prev.recentPlayers = recentPlayers;
        return prev;
      });
    });
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
        <Header>
          <Left>
            <Icon name="menu" style={{color: 'white'}} />
          </Left>
          <Body />
          <Right />
        </Header>
        <Item>
          <Icon name="ios-people" style={{marginLeft: 15}}/>
          <Input placeholder="Search player" onChangeText={this.queryStringUpdate}/>
          <Button transparent onPress={this.searchPlayer}>
            <Text>Search</Text>
          </Button>
        </Item>
        {this.state.isLoading ? <Spinner /> : null}

        {
          this.state.foundPlayers.length
          ?  <List dataArray={this.state.foundPlayers} renderRow={playerView(playerPressHandler)} />
          : null
        }

        {
          this.state.recentPlayers.length
            ? <Text style={{margin: 15}}>Recent</Text>
            : null
        }
        {
          this.state.recentPlayers.length
          ? <List
              dataSource={this.ds.cloneWithRows(this.state.recentPlayers)}
              renderRow={playerView(playerPressHandler)}
              renderLeftHiddenRow={(data, secId, rowId, rowMap) => {
                return (
                  <Button full danger onPress={() => {removeRecentPlayer(data).then(() => {this.updateRecentPlayers()})}}>
                    <Icon active name="trash"/>
                  </Button>
                );
              }
              }
              renderRightHiddenRow={() => {}}
              leftOpenValue={75}
            />
          : null
        }
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

const removeRecentPlayer = (player) => {
  return getRecentPlayers()
    .then((recentPlayers) => {
      recentPlayers = recentPlayers.filter(p => p.account_id !== player.account_id);
      return AsyncStorage.setItem('recentPlayers', JSON.stringify(recentPlayers));
    });
};

const playerView = (playerPressHandler) => (player) => {

  return (
    <ListItem key={player.account_id} style={{marginLeft: 0}} onPress={() => playerPressHandler(player)}>
      <Thumbnail square size={80} source={{ uri: player.avatarfull }} style={{marginLeft: 15}} />
      <Body>
        <Text>{player.personaname}</Text>
        <Text note>{player.account_id}</Text>
      </Body>
      <Right>
        <Icon name="arrow-forward" />
      </Right>
    </ListItem>
  );
};
