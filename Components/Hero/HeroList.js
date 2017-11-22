import React from 'react';
import { Body, Button, Card, CardItem, Col, Container, Content, Footer, FooterTab, Grid, H1, H3, Header, Icon, Input, Item, Left, List, ListItem, Right, Spinner, Text, Thumbnail, View } from "native-base";

export default class HeroList extends React.Component {
  render() {
    let heroes = this.props.heroes;
    let navigate = this.props.navigate;

    if (!heroes.length) return <Spinner />;

    let heroesView = heroes.map((hero) => <HeroListItem navigate={navigate} hero={hero} key={hero.id} />);

    return (
      <List>
        {heroesView}
      </List>
    );
  }
}

class HeroListItem extends React.Component {
  render() {
    let hero = this.props.hero;
    let navigate = this.props.navigate;

    return (
      <ListItem key={hero.id} style={{paddingLeft: 10, marginLeft: 0}} onPress={() => {navigate('Hero', {hero: hero})}}>
        <Thumbnail square size={80} source={{uri: `http://188.226.147.71:3030/heroes/sb/${hero.id}.png`}}/>
        <Body>
          <Text>{hero.localized_name}</Text>
          <Text note>{hero.roles.join(', ')}</Text>
        </Body>
        <Right>
          <Icon name="arrow-forward" />
        </Right>
      </ListItem>
    );
  }
}
