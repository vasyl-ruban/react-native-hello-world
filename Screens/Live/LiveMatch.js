import React from 'react';
import { StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Body, Button, Card, CardItem, Col, Container, Content, Footer, FooterTab, Grid, H1, H3, Header, Icon, Input, Item, Left, List, ListItem, Right, Spinner, Text, Thumbnail, View, Tab, Tabs, TabHeading, Separator, Row, Title } from "native-base";
import ItemImage from '../../Components/ItemImage';
import HeroImage from '../../Components/HeroImage';
import Layout from '../Layout';
import Countup from '../../Components/Countup';

export default class LiveMatch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isReloading: false,
      matchId: this.props.navigation.state.params.matchId,
      match: null
    };


    this.loadData = this.loadData.bind(this);

    this.loadData();
  }

  loadData() {
    fetch('http://188.226.147.71:3000/live/' + this.state.matchId)
      .then((res) => res.json())
      .then((res) => this.setState(prev => ({...prev, match: res, isReloading: false})));
  }

  render() {
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
          <Title>Match details</Title>
          </Body>
          <Right />
        </Header>

        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.isReloading}
              onRefresh={this.loadData}
            />}>
          {this.state.match
            ? <MatchDetails match={this.state.match} />
            : <Spinner />
          }
        </ScrollView>
      </Layout>
    );
  }
}

function MatchDetails({match}) {
  let radiantPlayers = match.scoreboard.radiant.players;
  let direPlayers = match.scoreboard.dire.players;

  return (
    <Card>
      <LiveMatchTeam radiant={match.radiant_team} dire={match.dire_team} />
      <GameSummary scoreboard={match.scoreboard} />

      <Tabs>
        <Tab heading={ <TabHeading><Text>Overview</Text></TabHeading> }>
          <ListItem itemDivider>
            <Text>Radiant</Text>
          </ListItem>
          {radiantPlayers.map((player) =>
            <PlayerInfo player={player} key={player.account_id} />
          )}

          <ListItem itemDivider>
            <Text>Dire</Text>
          </ListItem>

          {direPlayers.map((player) =>
            <PlayerInfo player={player} key={player.account_id} />
          )}
        </Tab>
        <Tab heading={ <TabHeading><Text>Overview</Text></TabHeading> }>
          <ListItem itemDivider>
            <Text>Radiant</Text>
          </ListItem>
          {radiantPlayers.map((player) =>
            <PlayerOverviewRow player={player} key={player.account_id} />
          )}

          <ListItem itemDivider>
            <Text>Dire</Text>
          </ListItem>

          {direPlayers.map((player) =>
            <PlayerOverviewRow player={player} key={player.account_id} />
          )}
        </Tab>
        <Tab heading={ <TabHeading><Text>Item</Text></TabHeading> }>
          <ListItem itemDivider>
            <Text>Radiant</Text>
          </ListItem>
          {radiantPlayers.map((player) =>
            <PlayerItemRow player={player} key={player.account_id} />
          )}

          <ListItem itemDivider>
            <Text>Dire</Text>
          </ListItem>

          {direPlayers.map((player) =>
            <PlayerItemRow player={player} key={player.account_id} />
          )}
        </Tab>
      </Tabs>
    </Card>
  );
}

function LiveMatchTeam({radiant, dire}) {
  return (radiant && dire)
    ? (
      <CardItem>
        <Left>
          <Text>{radiant.team_name}</Text>
        </Left>
        <Body />
        <Right>
          <Text>{dire.team_name}</Text>
        </Right>
      </CardItem>
    )
    : null ;
}

function GameSummary({scoreboard}) {
  if (!scoreboard) return null;

  let timeFormatter = (time) => {
    let gameMin = (time / 60).toFixed(0);
    let gameSec = (time % 60).toFixed(0);
    gameSec = ("0" + gameSec).slice(-2);
    return  `${gameMin}:${gameSec}`;
  };
  let radiantScore = scoreboard.radiant.score;
  let direScore = scoreboard.dire.score;
  let score = `${radiantScore} - ${direScore}`;

  return (
    <CardItem>
      <Body>
      <H3 style={styles.gameScore}>{score}</H3>
      <Countup style={styles.gameTime} initialTime={scoreboard.duration} formatter={timeFormatter} />
      </Body>
    </CardItem>
  );
}

function PlayerInfo({player}) {
  return (
    <ListItem style={{marginLeft: 0}}>
      <Grid>
        <Col>
          <Row>
            <HeroImage heroId={player.hero_id} timeToRespawn={player.respawn_timer} />
          </Row>
          <Row>
            <Text>{player.kills}/{player.death}/{player.assists}</Text>
            <Text note>K/D/A</Text>
          </Row>
        </Col>
        <Col>
          <Row>
            <ItemImage itemId={player.item0} small />
            <ItemImage itemId={player.item1} small />
            <ItemImage itemId={player.item2} small />
          </Row>
          <Row>
            <ItemImage itemId={player.item3} small />
            <ItemImage itemId={player.item4} small />
            <ItemImage itemId={player.item5} small />
          </Row>
        </Col>
      </Grid>
      {/*<Left>*/}
        {/*<Grid>*/}
          {/*<Row>*/}
            {/*<HeroImage heroId={player.hero_id} />*/}
          {/*</Row>*/}
          {/*<Row>*/}
            {/*<Col>*/}
              {/*<Text>{player.kills}/{player.death}/{player.assists}</Text>*/}
              {/*<Text note>K/D/A</Text>*/}
            {/*</Col>*/}
          {/*</Row>*/}
        {/*</Grid>*/}
      {/*</Left>*/}
      {/*<Body>*/}
        {/*<Grid>*/}
          {/*<Row>*/}
            {/*<Col>*/}
            {/*<Text>{player.level} lvl</Text>*/}
            {/*<Text note>{player.gold} gold</Text>*/}
            {/*</Col>*/}
            {/*<Col>*/}
            {/*<Row>*/}
            {/*<ItemImage itemId={player.item0} />*/}
            {/*<ItemImage itemId={player.item1} />*/}
            {/*<ItemImage itemId={player.item2} />*/}
            {/*<ItemImage itemId={player.item3} />*/}
            {/*<ItemImage itemId={player.item4} />*/}
            {/*<ItemImage itemId={player.item5} />*/}
            {/*</Row>*/}
            {/*</Col>*/}
            {/*</Row>*/}
        {/*</Grid>*/}
      {/*</Body>*/}
    </ListItem>
  );
}

function PlayerOverviewRow({player}) {
  let netWorth = (player.gold_spent / 1000).toFixed(1) + 'k';
  return (
    <ListItem style={{marginLeft: 0}}>
      <Left>
        <HeroImage heroId={player.hero_id} />
      </Left>
      <Body>
        <Grid>
          <Col>
            <Text>{player.level} lvl</Text>
            <Text note>{player.gold} gold</Text>
          </Col>
          <Col>
            <Text>{player.kills}/{player.death}/{player.assists}</Text>
            <Text note>K/D/A</Text>
          </Col>
        </Grid>
      </Body>
    </ListItem>
  );
}

function PlayerItemRow({player}) {
  return (
    <ListItem style={{marginLeft: 0}}>
      <Left>
        <HeroImage heroId={player.hero_id} />
      </Left>
      <Body>
      <Grid>
        <Row>
          <ItemImage itemId={player.item0} />
          <ItemImage itemId={player.item1} />
          <ItemImage itemId={player.item2} />
        </Row>
        <Row>
          <ItemImage itemId={player.item3} />
          <ItemImage itemId={player.item4} />
          <ItemImage itemId={player.item5} />
        </Row>
      </Grid>
      </Body>
    </ListItem>
  );
}

const styles = StyleSheet.create({
  players: {
    paddingLeft: 0,
    paddingRight: 0
  },
  playerCard: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    marginTop: 0,
    marginBottom: 5,
    marginLeft: 0,
    marginRight: 0,
    borderBottomWidth: 0,
    maxHeight: 40,
    overflow: "hidden"
  },
  playerName: {
    fontSize: 12
  },
  gameTime: {
    alignSelf: "center",
    fontSize: 12,
    color: "#888"
  },
  gameScore: {
    alignSelf: "center",
    marginBottom: 10
  }
});
