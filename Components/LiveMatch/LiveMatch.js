import React from 'react';
import { Body, Button, Card, CardItem, Col, Container, Content, Footer, FooterTab, Grid, H1, H3, Header, Icon, Input, Item, Left, List, ListItem, Right, Spinner, Text, Thumbnail, View } from "native-base";

export default class LiveMatch extends React.Component {
  render() {
    const match = this.props.match;
    const heroes = this.props.heroes;

    return (
      <Card key={match.lobby_id}>
        <LiveMatchTitle match={match} />
        <LiveMatchScore match={match} />
        <LiveMatchPlayers heroes={heroes}
                          radiantPlayers={match.players.slice(0, 5)}
                          direPlayers={match.players.slice(5, 10)} />
      </Card>
    );
  }
}

class LiveMatchTitle extends React.Component {
  render() {
    const match = this.props.match;

    return (
      <CardItem>
        <Body>
        <H3 style={{alignSelf: 'center'}}>
          {match.radiant_score}:{match.dire_score}
        </H3>
        <Text style={{alignSelf: 'center', fontSize: 12}}>
          {(match.game_time / 60).toFixed(0)}:{("0" + (match.game_time % 60)).slice(-2)}
        </Text>
        <Text style={{alignSelf: 'center', fontSize: 12}}>
          {match.spectators} spectators / {match.average_mmr} avg mmr
        </Text>
        </Body>
      </CardItem>
    );
  }
}

class LiveMatchScore extends React.Component {
  render() {
    const match = this.props.match;

    return (
      <CardItem>
        <Grid>
          <Col>
            <H3 style={{textAlign: 'left', paddingLeft: 20}}>
              {match.radiant_score}
            </H3>
            {
              match.radiant_lead > 0
                ? <Text style={{textAlign: 'left', color: 'green', paddingLeft: 20, fontSize: 12}}>+{match.radiant_lead}</Text>
                : null
            }
          </Col>
          <Col>
            <H3 style={{textAlign: 'right', paddingRight: 20}}>
              {match.dire_score}
            </H3>
            {
              match.radiant_lead < 0
                ? <Text style={{textAlign: 'right', color: 'green', paddingRight: 20, fontSize: 12}}>+{-match.radiant_lead}</Text>
                : null
            }
          </Col>
        </Grid>
      </CardItem>
    );
  }
}

class LiveMatchPlayers extends React.Component {
  render() {
    const radiantPlayers = this.props.radiantPlayers;
    const direPlayers = this.props.direPlayers;
    const heroes = this.props.heroes;

    const radiantPlayersView = radiantPlayers.map((player) => <LiveMatchPlayer player={player} heroes={heroes} isRadiant={true} key={player.account_id} />);
    const direPlayersView = direPlayers.map((player) => <LiveMatchPlayer player={player} heroes={heroes} isRadiant={false} key={player.account_id}/>);

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
  }
}

class LiveMatchPlayer extends React.Component {
  render() {
    const player = this.props.player;
    const heroes = this.props.heroes;
    const isRadiant = this.props.isRadiant;
    const hero = heroes.filter(hero => hero.id === player.hero_id)[0];

    if (!hero) return <Text />;

    return (
      <ListItem key={player.account_id} style={{height: 50}}>
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
    );
  }
}

