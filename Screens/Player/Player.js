import React from 'react';
import { Body, Button, Card, CardItem, Col, Container, Content, Footer, FooterTab, Grid, H1, H3, Header, Icon, Input, Item, Left, List, ListItem, Right, Spinner, Text, Thumbnail, View, Tab, Tabs, TabHeading, Title } from "native-base";
import { Image } from 'react-native';
import HeroImage from '../../Components/HeroImage';
import Layout from '../Layout';
import moment from 'moment';

export default class Player extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      player: null,
      recentMatches: [],
      recentMatchesLimit: 10,
      heroes: [],
      heroesStats: [],
      heroesStatsLimit: 10,
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

    fetch("https://api.opendota.com/api/players/" + this.state.playerId + "/heroes")
      .then(response => response.json())
      .then(response => {
        this.setState(prev => {
          prev.heroesStats = response;
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
           <Thumbnail source={{uri: player.profile.avatarfull}}  />
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
        <Header>
          <Left>
            <Button transparent onPress={() => {this.props.navigation.goBack()}}>
              <Icon name="arrow-back" onPress={() => {this.props.navigation.goBack()}}/>
            </Button>
          </Left>
          <Body>
            <Title>Player</Title>
          </Body>
          <Right />
        </Header>

        {!this.state.player ? <Spinner /> : null}
        {this.state.player ? this.playerView() : null}

        {
          this.state.player
          ? <Tabs>
              <Tab heading={ <TabHeading><Text>Most played heroes</Text></TabHeading>}>
                {(this.state.heroesStats.length && this.state.heroes.length)
                  ? (
                    <List>
                      {heroesStatsView(this.state.heroes)(this.state.heroesStats.slice(0, this.state.heroesStatsLimit))}

                      <ListItem>
                        <Body>
                        <Button full onPress={() => {this.setState(prev => ({...prev, heroesStatsLimit: prev.heroesStatsLimit + 10}))}}>
                        <Text>Load more</Text>
                        </Button>
                        </Body>
                      </ListItem>
                    </List>
                  )
                  : null}
              </Tab>
              <Tab heading={ <TabHeading><Text>Past matches</Text></TabHeading>}>
                {(this.state.recentMatches.length && this.state.heroes.length)
                  ? (
                    <List>
                      {recentMatchesView(navigate)(this.state.heroes)(this.state.recentMatches.slice(0, this.state.recentMatchesLimit))}

                      <ListItem>
                        <Body>
                        <Button full onPress={() => {this.setState(prev => ({...prev, recentMatchesLimit: prev.recentMatchesLimit + 10}))}}>
                          <Text>Load more</Text>
                        </Button>
                        </Body>
                      </ListItem>
                    </List>
                  )
                  : null}
              </Tab>
            </Tabs>
          : null
        }
      </Layout>
    );
  }
}


const recentMatchesView = (navigate) => (heroes) => (matchList) => {
  let recentMatches = matchList.map(matchView(navigate)(heroes));
  return (
    <List>
      {recentMatches}
    </List>
  );
};

const matchView = (navigate) => (heroes) => (match) => {
  let hero = heroes.find(hero => hero.id === match.hero_id);
  let isWonMatch = (match.radiant_win && (match.player_slot < 100)) || (!match.radiant_win && (match.player_slot > 100));
  let duration = (match.duration / 60).toFixed(0) + ':' + ("0" + (match.duration % 60)).slice(-2);
  console.log(`http://188.226.147.71:3030/heroes/sb/${match.hero_id}.png`);
  return (
    <ListItem key={match.match_id} style={{marginLeft: 0}} onPress={() => {navigate('Match', {matchId: match.match_id})}}>
      <HeroImage heroId={match.hero_id} />
      <Body>
      <Grid>
        <Col>
          {
            isWonMatch
            ? <Text style={{color: 'green'}}>Won match</Text>
            : <Text style={{color: 'red'}}>Lost match</Text>
          }
          <Text note>{moment(match.start_time * 1000).fromNow()}</Text>
        </Col>

        <Col>
          <Text>{match.kills}/{match.deaths}/{match.assists}</Text>
          <Text note>K/D/A</Text>
        </Col>
        <Col>
          <Text>{duration}</Text>
          <Text note>duration</Text>
        </Col>
      </Grid>
      </Body>
      {/*<Right>*/}
        {/*<Icon name="arrow-forward" />*/}
      {/*</Right>*/}
    </ListItem>
  );
};

const heroesStatsView = (heroes) => (stats) => {
  let heroesStats = stats.map(heroStatView(heroes));
  return (
    <List>
      {heroesStats}
    </List>
  );
};

const heroStatView = (heroes) => (stat) => {
  let hero = heroes.find(hero => stat.hero_id == hero.id);
  if (!hero) {
    return null;
  } else {
    // console.log('http://188.226.147.71:3030/heroes/sb/' + stat.hero_id + '.png');
    return (
      <ListItem key={stat.hero_id} style={{marginLeft: 0}}>
        <HeroImage heroId={stat.hero_id} />
        <Body>
        <Grid>
          <Col>
            <Text>{hero.localized_name}</Text>
            <Text note>{moment(stat.last_played * 1000).fromNow()}</Text>
          </Col>
          <Col>
            <Text>{stat.games}</Text>
            <Text note>matches</Text>
          </Col>
          <Col>
            <Text>{(stat.win/stat.games * 100).toFixed(2)}%</Text>
            <Text note>win rate</Text>
          </Col>
        </Grid>
        </Body>
      </ListItem>
    );
  }

};
