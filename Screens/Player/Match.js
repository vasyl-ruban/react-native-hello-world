import React from 'react';
import { Body, Button, Card, CardItem, Col, Container, Content, Footer, FooterTab, Grid, H1, H3, Header, Icon, Input, Item, Left, List, ListItem, Right, Spinner, Text, Thumbnail, View, Tab, Tabs, TabHeading, Separator, Row } from "native-base";
import Layout from '../Layout';
import moment from 'moment';

export default class Match extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      match: null,
      heroes: [],
      matchId: this.props.navigation.state.params.matchId
    };

    fetch('https://api.opendota.com/api/matches/' + this.state.matchId)
      .then((res) => res.json())
      .then((res) => {
        this.setState((prev) => {
          prev.match = res;
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
  }

  render () {
    const { navigate } = this.props.navigation;
    return (
      <Layout navigate={navigate}>
        <Header>
          <Left>
            <Icon name="arrow-back" style={{color: 'white'}} onPress={() => {this.props.navigation.goBack()}}/>
          </Left>
          <Body />
          <Right />
        </Header>
        { this.state.match && this.state.heroes.length ? matchView(this.state.heroes)(this.state.match) : <Spinner /> }
      </Layout>
    );
  }
}

const matchView = (heroes) => (match) => {
  let radiantPlayers = match.players.slice(0, 5);
  let direPlayers = match.players.slice(5, 10);
  let radiantPlayersView = radiantPlayers.map(playerRow(heroes));
  let direPlayersView = direPlayers.map(playerRow(heroes));
  return (
    <List>
      <Separator bordered>
        <Text>Radiant</Text>
      </Separator>
      {radiantPlayersView}

      <Separator bordered>
        <Text>Dire</Text>
      </Separator>
      {direPlayersView}

    </List>
  );
};

const playerRow = (heroes) => (player) => {
  let hero = heroes.find(hero => hero.id === player.hero_id);
  if (!hero) return null;

  let netWorth = (player.gold_spent / 1000).toFixed(1) + 'k';
  let heroDamage = (player.hero_damage / 1000).toFixed(1) + 'k';
  let towerDamage = (player.tower_damage / 1000).toFixed(1) + 'k';
  return (
    <ListItem key={player.hero_id}>
      <Thumbnail square size={80} source={{uri: "http://api.opendota.com" + hero.img}} style={{marginLeft: 15}}/>
      <Body>
        <Grid>
          <Col>
            <Text>{player.personaname || 'Anonymous'}</Text>
          </Col>
          <Col>
            <Text>{player.kills}/{player.deaths}/{player.assists}</Text>
          </Col>
          <Col>
            <Grid>
              <Row>
                <Col><Text>i</Text></Col>
                <Col><Text>i</Text></Col>
                <Col><Text>i</Text></Col>
              </Row>
              <Row>
                <Col><Text>i</Text></Col>
                <Col><Text>i</Text></Col>
                <Col><Text>i</Text></Col>
              </Row>
            </Grid>
          </Col>
          {/*// <Col>*/}
          {/*//   <Text>{netWorth}</Text>*/}
          {/*//   <Text note>net worth</Text>*/}
          {/*</Col>*/}
          {/*<Col>*/}
            {/*<Text>{heroDamage}</Text>*/}
            {/*<Text note>hero dmg</Text>*/}
          {/*</Col>*/}
          {/*<Col>*/}
            {/*<Text>{towerDamage}</Text>*/}
            {/*<Text note>tower dmg</Text>*/}
          {/*</Col>*/}
        </Grid>
      </Body>
    </ListItem>
  );
};