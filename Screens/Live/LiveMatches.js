import React from 'react';
import { StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Body, Button, Card, CardItem, Col, Container, Content, Footer, FooterTab, Grid, H1, H3, Header, Icon, Input, Item, Left, List, ListItem, Right, Spinner, Text, Thumbnail, View, Tab, Tabs, TabHeading, Separator, Row, Title } from "native-base";
import ItemImage from '../../Components/ItemImage';
import HeroImage from '../../Components/HeroImage';
import Layout from '../Layout';
import moment from 'moment';

export default class LiveMatches extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isReloading: false,
      matches: []
    };


    this.loadData = this.loadData.bind(this);

    this.loadData();
  }

  loadData() {
    fetch('http://188.226.147.71:3000/live')
      .then((res) => res.json())
      .then((res) => this.setState(prev => ({...prev, matches: res, isReloading: false})));
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <Layout navigate={navigate}>
        <Header>
          <Left>
            <Button transparent onPress={() => {this.props.navigation.goBack()}}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
          <Title>Live games</Title>
          </Body>
          <Right />
        </Header>

        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.isReloading}
              onRefresh={this.loadData}
            />}>
          {this.state.matches.length
            ? this.state.matches.map((match) => <LiveMatchItem match={match} navigate={navigate} key={match.match_id} />)
            : <Spinner />
          }
        </ScrollView>
      </Layout>
    );
  }
}

function LiveMatchItem({match, navigate}) {
  let radiantPlayers = match.players.filter((player) => player.team == 0);
  let direPlayers = match.players.filter((player) => player.team == 1);
  if (!match.radiant_team || !match.dire_team || !match.players.length) {
    return null;
  }
  return (
    <Card>
      <LiveMatchTeam radiant={match.radiant_team} dire={match.dire_team} />

      <GameSummary scoreboard={match.scoreboard} />

      <CardItem style={styles.players}>
        <Grid>
          <Col>
            <List>
              {radiantPlayers.map((player) =>
                <PlayerCard player={player} isLeft={false} key={player.account_id} />
              )}
            </List>
          </Col>
          <Col>
            <List>
              {direPlayers.map((player) =>
                <PlayerCard player={player} isLeft={true} key={player.account_id} />
              )}
            </List>
          </Col>
        </Grid>
      </CardItem>

      <CardItem footer>
        <Left />
        <Body />
        <Right>
          <Button transparent onPress={() => {navigate('LiveMatch', {matchId: match.match_id})}}>
            <Text>Details</Text>
            <Icon name="arrow-forward" />
          </Button>
        </Right>
      </CardItem>
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

  let gameMin = (scoreboard.duration / 60).toFixed(0);
  let gameSec = (scoreboard.duration % 60).toFixed(0);
  gameSec = ("0" + gameSec).slice(-2);
  let gameTime = `${gameMin}:${gameSec}`;
  let radiantScore = scoreboard.radiant.score;
  let direScore = scoreboard.dire.score;
  let score = `${radiantScore} - ${direScore}`;

  return (
    <CardItem>
      <Body>
      <H3 style={styles.gameScore}>{score}</H3>
      <Text style={styles.gameTime}>{gameTime}</Text>
      </Body>
    </CardItem>
  );
}

function PlayerCard({player, isLeft}) {
  if (!player) return null;
  return (
    <ListItem style={styles.playerCard}>
      {isLeft ? <Left><HeroImage heroId={player.hero_id} /></Left> : null}
      <Body>
        <Text style={styles.playerName}>{player.name}</Text>
      </Body>
      {!isLeft ? <Right><HeroImage heroId={player.hero_id} /></Right> : null}
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
