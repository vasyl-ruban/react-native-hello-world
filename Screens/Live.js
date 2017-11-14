import React from 'react';
import {
  Body,
  Button, Card, CardItem, Col, Container, Content, Footer, FooterTab, Grid, H1, H3, Header, Icon, Input, Item, Left,
  List,
  ListItem,
  Right,
  Spinner,
  Text, Thumbnail
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
          response = removeDuplicates(response);
          response = response.filter((live) => {
            return live.spectators > 0;
          });
          response.sort((a, b) => b.spectators - a.spectators);

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

const playersHero = (heroes) => (player) => {
  let hero = heroes.filter(hero => hero.id === player.hero_id)[0];

  return hero ? <Thumbnail square source={{uri: 'http://api.opendota.com' + hero.icon}}/> : null;
};

const liveView = (heroes) => (live, index) => {
  let heroesView = live.players.map(playersHero(heroes));
  return (
    <Card key={index}>
      <CardItem>
          <Text>{live.team_name_radiant}</Text>
          <Text>{live.team_name_dire}</Text>
          <Text>{live.spectators}</Text>
          {heroesView}
      </CardItem>
    </Card>
  );
};
