import React from 'react';
import { Body, Button, Card, CardItem, Col, Container, Content, Footer, FooterTab, Grid, H1, H3, Header, Icon, Input, Item, Left, List, ListItem, Right, Spinner, Text, Thumbnail, View, Tab, Tabs, TabHeading, Separator, Row, Title } from "native-base";
import ItemImage from '../../Components/ItemImage';
import HeroImage from '../../Components/HeroImage';
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
            <Button transparent onPress={() => {this.props.navigation.goBack()}}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={{width: 175}}>Match {this.state.matchId}</Title>
          </Body>
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

  let radiantOverviewView = radiantPlayers.map(playerOverviewRow);
  let direOverviewView = direPlayers.map(playerOverviewRow);
  let radiantFarmView = radiantPlayers.map(playerFarmRow);
  let direFarmView = direPlayers.map(playerFarmRow);
  let radiantDamageView = radiantPlayers.map(playerDamageRow);
  let direDamageView = direPlayers.map(playerDamageRow);
  let radiantItemsView = radiantPlayers.map(playerItemRow);
  let direItemsView = direPlayers.map(playerItemRow);

  return (
    <Tabs>
      <Tab heading={ <TabHeading><Text>Overview</Text></TabHeading>}>
        <ListItem itemDivider>
          <Text>Radiant</Text>
        </ListItem>
        {radiantOverviewView}

        <ListItem itemDivider>
          <Text>Dire</Text>
        </ListItem>
        {direOverviewView}
      </Tab>
      <Tab heading={ <TabHeading><Text>Farm</Text></TabHeading>}>
        <ListItem itemDivider>
          <Text>Radiant</Text>
        </ListItem>
        {radiantFarmView}

        <ListItem itemDivider>
          <Text>Dire</Text>
        </ListItem>
        {direFarmView}
      </Tab>
      <Tab heading={ <TabHeading><Text>Damage</Text></TabHeading>}>
        <ListItem itemDivider>
          <Text>Radiant</Text>
        </ListItem>
        {radiantDamageView}

        <ListItem itemDivider>
          <Text>Dire</Text>
        </ListItem>
        {direDamageView}
      </Tab>
      <Tab heading={ <TabHeading><Text>Items</Text></TabHeading>}>
        <ListItem itemDivider>
          <Text>Radiant</Text>
        </ListItem>
        {radiantItemsView}

        <ListItem itemDivider>
          <Text>Dire</Text>
        </ListItem>
        {direItemsView}
      </Tab>
    </Tabs>
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
      <HeroImage heroId={player.hero_id}/>
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
                <ItemImage itemId={player.item_0} />
                <ItemImage itemId={player.item_1} />
                <ItemImage itemId={player.item_2} />
              </Row>
              <Row>
                <ItemImage itemId={player.item_3} />
                <ItemImage itemId={player.item_4} />
                <ItemImage itemId={player.item_5} />
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

const playerOverviewRow = (player) => {
  let netWorth = (player.gold_spent / 1000).toFixed(1) + 'k';

  return (
    <ListItem key={player.hero_id} style={{marginLeft: 0}}>
      <Left>
        <HeroImage heroId={player.hero_id}/>
        <Text>{player.personaname || 'Anonymous'}</Text>
      </Left>
      <Body>
      <Grid>
        <Col>
          <Text>{player.kills}/{player.deaths}/{player.assists}</Text>
          <Text note>K/D/A</Text>
        </Col>
        <Col>
          <Text>{netWorth}</Text>
          <Text note>net worth</Text>
        </Col>
      </Grid>
      </Body>
    </ListItem>
  );
};

const playerFarmRow = (player) => {
  return (
    <ListItem key={player.hero_id} style={{marginLeft: 0}}>
      <Left>
        <HeroImage heroId={player.hero_id}/>
        <Text>{player.personaname || 'Anonymous'}</Text>
      </Left>
      <Body>
      <Grid>
        <Col>
          <Text>{player.last_hits}/{player.denies}</Text>
          <Text note>LH/D</Text>
        </Col>
        <Col>
          <Text>{player.gold_per_min}/{player.xp_per_min}</Text>
          <Text note>GPM/XPM</Text>
        </Col>
      </Grid>
      </Body>
    </ListItem>
  );
};

const playerDamageRow = (player) => {
  let heroDamage = (player.hero_damage / 1000).toFixed(1) + 'k';
  let towerDamage = (player.tower_damage / 1000).toFixed(1) + 'k';
  let heroHealing = player.hero_healing ? (player.hero_healing / 1000).toFixed(1) + 'k' : '-';

  return (
    <ListItem key={player.hero_id} style={{marginLeft: 0}}>
      <Left>
        <HeroImage heroId={player.hero_id}/>
        <Text>{player.personaname || 'Anonymous'}</Text>
      </Left>
      <Body>
      <Grid>
        <Col>
          <Text>{heroDamage}</Text>
          <Text note>hero damage</Text>
        </Col>
        <Col>
          <Text>{heroHealing}</Text>
          <Text note>hero healing</Text>
        </Col>
        <Col>
          <Text>{towerDamage}</Text>
          <Text note>tower damage</Text>
        </Col>
      </Grid>
      </Body>
    </ListItem>
  );
};

const playerItemRow = (player) => {
  return (
    <ListItem key={player.hero_id} style={{marginLeft: 0}}>
      <Left>
        <HeroImage heroId={player.hero_id}/>
        <Text>{player.personaname || 'Anonymous'}</Text>
      </Left>
      <Body>
      <Grid>
        <Row>
          <ItemImage itemId={player.item_0} />
          <ItemImage itemId={player.item_1} />
          <ItemImage itemId={player.item_2} />
        </Row>
        <Row>
          <ItemImage itemId={player.item_3} />
          <ItemImage itemId={player.item_4} />
          <ItemImage itemId={player.item_5} />
        </Row>
      </Grid>
      </Body>
    </ListItem>
  );
};
