import React from 'react';
import { Body, Button, Card, CardItem, Col, Container, Content, Footer, FooterTab, Grid, H1, H3, Header, Icon, Input, Item, Left, List, ListItem, Right, Spinner, Text, Thumbnail, View } from "native-base";
import Layout from './Layout';

export default class Player extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      player: null,
      recentMatches: [],
      heroes: [],
      playerId: this.props.navigation.state.params.playerId
    };

    fetch("https://api.opendota.com/api/players/" + this.state.playerId)
      .then(response => response.json())
      .then(response => {
        this.setState(prev => {
          prev.player = response;
          return prev;
        })
      });

    fetch("https://api.opendota.com/api/players/" + this.state.playerId + "/recentMatches")
      .then(response => response.json())
      .then(response => {
        this.setState(prev => {
          prev.recentMatches = response;
          return prev;
        })
      });

    fetch('https://api.opendota.com/api/heroStats')
      .then((response) => response.json())
      .then((response) => {
        this.setState((prevState) => {
          prevState.heroes = response;
          return prevState;
        })
      });

    this.playerView = this.playerView.bind(this);
  }

  playerView() {
    let player = this.state.player;
    return (
     <Card>

       <CardItem>
         <Left>
           <Thumbnail source={{uri: player.profile.avatarfull}} />
           <Body>
             <Text>{player.profile.personaname}</Text>
             <Text note>{player.mmr_estimate.estimate}</Text>
           </Body>
         </Left>
       </CardItem>
     </Card>
    );
  }



  render () {
    const { navigate } = this.props.navigation;
    return (
      <Layout navigate={navigate}>
          {!this.state.player ? <Spinner /> : null}
          {this.state.player ? this.playerView() : null}
          {(this.state.recentMatches.length && this.state.heroes.length) ? recentMatchesView(this.state.heroes)(this.state.recentMatches) : null}
      </Layout>
    );
  }
}


const recentMatchesView = (heroes) => (matchList) => {
  let recentMatches = matchList.map(matchView(heroes));
  return (
    <List>
      {recentMatches}
    </List>
  );
};

const matchView = (heroes) => (match) => {
  let hero = heroes.find(hero => hero.id === match.hero_id);
  return (
    <ListItem key={match.match_id} style={{marginLeft: 0}}>
      <Thumbnail square size={80} source={{ uri: "http://api.opendota.com" + hero.img }} />
      <Body>
      <Text>{match.kills}/{match.deaths}/{match.assists}</Text>
      <Text note>Its time to build a difference . .</Text>
      </Body>
    </ListItem>
  );
};
