import React from 'react';
import { Body, Button, Card, CardItem, Col, Container, Content, Footer, FooterTab, Grid, H1, H3, Header, Icon, Input, Item, Left, List, ListItem, Right, Spinner, Text, Thumbnail, View } from "native-base";

export default class HeroDetails extends React.Component {
  render() {
    let hero = this.props.hero;
    let navigate = this.props.navigate;

    if (!hero) return <Spinner />;

    return (
      <Content style={{flex: 0}}>
        <HeroTitle hero={hero}/>
        <HeroMMRStats hero={hero} />
        <HeroAttributeStats hero={hero} />
      </Content>
    );
  }
}

class HeroTitle extends React.Component {
  render() {
    let hero = this.props.hero;

    return (
        <CardItem>
          <Left>
            <Thumbnail source={{uri: "http://api.opendota.com" + hero.img}}/>
            <Body>
            <Text>{hero.localized_name}</Text>
            <Text note>{hero.roles.join(', ')}</Text>
            </Body>
          </Left>
        </CardItem>
    );
  }
}

class HeroMMRStats extends React.Component {
  render() {
    let hero = this.props.hero;

    let winRates = [
      {
        title: '1k mmr',
        winRate: ((hero['1000_win'] / hero['1000_pick']) * 100).toFixed(0) + ' % '
      },
      {
        title: '2k mmr',
        winRate: ((hero['2000_win'] / hero['2000_pick']) * 100).toFixed(0) + ' % '
      },
      {
        title: '3k mmr',
        winRate: ((hero['3000_win'] / hero['3000_pick']) * 100).toFixed(0) + ' % '
      },
      {
        title: '4k mmr',
        winRate: ((hero['4000_win'] / hero['4000_pick']) * 100).toFixed(0) + ' % '
      },
      {
        title: '5k mmr',
        winRate: ((hero['5000_win'] / hero['5000_pick']) * 100).toFixed(0) + ' % '
      }
    ];

    let mmrViews = winRates.map((winRate) => <HeroMMRRow winRate={winRate} key={winRate.title}/>);

    return (
      <Card>
        <H3 style={{paddingLeft: 15, paddingTop: 10}}>Win rates</H3>
        {mmrViews}
      </Card>
    );
  }
}

class HeroMMRRow extends React.Component {
  render() {
    let winRate = this.props.winRate;

    return (
      <CardItem key={winRate.title}>
        <Body>
        <Text>{winRate.title}</Text>
        </Body>
        <Right>
          <Text>{winRate.winRate}</Text>
        </Right>
      </CardItem>
    );
  }
}

class HeroAttributeStats extends React.Component {
  render() {
    let hero = this.props.hero;

    return (
      <Card>
        <H3 style={{paddingLeft: 15, paddingTop: 10}}>Base stats</H3>
        <Grid>
          <Col>
            <CardItem>
              <Body>
              <Text>Str</Text>
              </Body>
              <Right style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                <Text>{hero.base_str}</Text>
                <Text style={{color: '#0f0', marginLeft: 10}}>+{hero.str_gain.toFixed(2)}</Text>
              </Right>
            </CardItem>

            <CardItem>
              <Body>
              <Text>Agi</Text>
              </Body>
              <Right style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                <Text>{hero.base_agi}</Text>
                <Text style={{color: '#0f0', marginLeft: 10}}>+{hero.agi_gain.toFixed(2)}</Text>
              </Right>
            </CardItem>

            <CardItem>
              <Body>
              <Text>Int</Text>
              </Body>

              <Right style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                <Text>{hero.base_int}</Text>
                <Text style={{color: '#0f0', marginLeft: 10}}>+{hero.int_gain.toFixed(2)}</Text>
              </Right>
            </CardItem>
          </Col>

          <Col>

            <CardItem>
              <Body>
              <Text>MS</Text>
              </Body>
              <Right>
                <Text>{hero.move_speed}</Text>
              </Right>
            </CardItem>

            <CardItem>
              <Body>
              <Text>AS</Text>
              </Body>
              <Right>
                <Text>{hero.attack_rate}</Text>
              </Right>
            </CardItem>


            <CardItem>
              <Body>
              <Text>Range</Text>
              </Body>
              <Right>
                <Text>{hero.attack_range}</Text>
              </Right>
            </CardItem>
          </Col>
        </Grid>
      </Card>
    );
  }
}

