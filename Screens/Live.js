import React from 'react';
import {
  Body,
  Button, Card, CardItem, Col, Container, Content, Footer, FooterTab, Grid, H1, H3, Header, Icon, Input, Item, Left,
  List,
  ListItem,
  Right,
  Spinner,
  Text, Thumbnail, View
} from "native-base";

const removeDuplicates = (lives) => {
  let existenIds = [];
  let uniqLives = [];
  lives.forEach((live) => {
    if (existenIds.indexOf(live.lobby_id) === -1) {
      uniqLives.push(live);
      existenIds.push(live.lobby_id);
    }
  });

  return uniqLives;
};

export default class Live extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      live: [],
      heroes: []
    };

    fetch('https://api.opendota.com/api/live')
      .then((response) => response.json())
      .then((response) => {
        this.setState(prevState => {
          response.sort((a, b) => b.spectators - a.spectators);
          response = removeDuplicates(response);
          response = response.filter((live) => {
            return live.spectators > 0;
          });

          prevState.live = response;
          return prevState;
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

  render() {
    const { navigate } = this.props.navigation;
    const liveViews = this.state.live.map(liveView(this.state.heroes));
    return (
      <Container>
        <Header />

        <Content>
          {(liveViews.length && this.state.heroes.length) ? liveViews : <Spinner />}
        </Content>

        <Footer>
          <FooterTab>
            <Button onPress={() => navigate('Home')}>
              <Text>Home</Text>
            </Button>
            <Button onPress={() => navigate('Heroes')}>
              <Text>Heroes</Text>
            </Button>
            <Button active onPress={() => navigate('Live')}>
              <Text>Live</Text>
            </Button>
            <Button>
              <Text>Teams</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const playerView = (heroes) => (isRadiant) =>  (player) => {
  let hero = heroes.filter(hero => hero.id === player.hero_id)[0];


  return hero ? (    <ListItem key={player.account_id} style={{height: 50}}>
      {
        !isRadiant
          ? (
            <Left style={{width: 25}}>
              <Thumbnail square
                         source={{uri: 'http://api.opendota.com' + hero.icon}}
                         style={{width: 25, height: 25}}/>
            </Left>
          )
        : null
      }

      {
        player.is_pro
          ? (
            <Body style={{width: 100, overflow: 'hidden'}}>
              <Text style={{fontSize: 12}}>
                {player.name}
              </Text>
              <Text style={{fontSize: 12}}>
                @{player.team_tag}
              </Text>
            </Body>
          )
          : (
            <Body style={{width: 100, overflow: 'hidden'}}>
              <Text style={{fontSize: 12}}>-</Text>
            </Body>
          )
      }
      {
        isRadiant
          ? (
            <Right style={{width: 25}}>
              <Thumbnail square
                         source={{uri: 'http://api.opendota.com' + hero.icon}}
                         style={{width: 25, height: 25}}/>
            </Right>
          )
          : null
      }
    </ListItem>
  ) : null;
};

const playersView = (heroes) => (players) => {
  let radiantPlayers = players.slice(0, 5);
  let direPlayers = players.slice(5, 10);
  let radiantPlayersView = radiantPlayers.map(playerView(heroes)(true));
  let direPlayersView = direPlayers.map(playerView(heroes)(false));
  return (
    <CardItem>
      <Grid>
        <Col>
          <List>
            {radiantPlayersView}
          </List>
        </Col>
        <Col>
          <List>
            {direPlayersView}
          </List>
        </Col>
      </Grid>
    </CardItem>
  );
};

const liveView = (heroes) => (live) => {
  return (
    <Card key={live.lobby_id}>
          {/*versus (only for pro games)*/}
          {/*{*/}
            {/*live.team_name_radiant && live.team_name_dire*/}
              {/*? (*/}
                  {/*<CardItem>*/}
                    {/*<Grid>*/}
                      {/*<Col style={{textAlign: 'center'}}>*/}
                        {/*{live.team_name_radiant}*/}
                      {/*</Col>*/}
                      {/*<Col style={{textAlign: 'center'}}>*/}
                        {/*{live.team_name_dire}*/}
                      {/*</Col>*/}
                    {/*</Grid>*/}
                  {/*</CardItem>*/}
                {/*)*/}
              {/*: null*/}
          {/*}*/}

      {/*time*/}
      <CardItem>
        <Body>
          <H3 style={{alignSelf: 'center'}}>
            {live.radiant_score}:{live.dire_score}
          </H3>
          <Text style={{alignSelf: 'center', fontSize: 12}}>
            {(live.game_time / 60).toFixed(0)}:{("0" + (live.game_time % 60)).slice(-2)}
          </Text>
          <Text style={{alignSelf: 'center', fontSize: 12}}>
            {live.spectators} spectators / {live.average_mmr} avg mmr
          </Text>
        </Body>
      </CardItem>

     {/*score */}
      <CardItem>
        <Grid>
          <Col>
            <H3 style={{textAlign: 'left', paddingLeft: 20}}>{live.radiant_score}</H3>
            {
              live.radiant_lead > 0
                ? <Text style={{textAlign: 'left', color: 'green', paddingLeft: 20, fontSize: 12}}>+{live.radiant_lead}</Text>
                : null
            }
          </Col>
          <Col>
            <H3 style={{textAlign: 'right', paddingRight: 20}}>{live.dire_score}</H3>
            {
              live.radiant_lead < 0
                ? <Text style={{textAlign: 'right', color: 'green', paddingRight: 20, fontSize: 12}}>+{-live.radiant_lead}</Text>
                : null
            }
          </Col>
        </Grid>
      </CardItem>

      {playersView(heroes)(live.players)}
    </Card>
  );
};
