import React from 'react';
import { Body, Button, Card, CardItem, Col, Container, Content, Footer, FooterTab, Grid, H1, H3, Header, Icon, Input, Item, Left, List, ListItem, Right, Spinner, Text, Thumbnail, View } from "native-base";
import Layout from './Layout';
import HeroList from '../Components/Hero/HeroList';


const isMatchHeroName = (searchText) => (hero) => {
  if (!searchText) return true;
  return hero.localized_name.toLowerCase().indexOf(searchText.toLowerCase()) === 0;
};

export default class Heroes extends React.Component {
  static navigationOptions = {
    title: 'Heroes'
  };

  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
      heroes: []
    };

    fetch('https://api.opendota.com/api/heroStats')
      .then((response) => response.json())
      .then((response) => {
        this.setState((prevState) => {
          prevState.heroes = response;
          return prevState;
        })
      });

    this.updateSearch = this.updateSearch.bind(this);
  }

  updateSearch(text) {
    this.setState(prev => {
      prev.searchText = text;
      return prev;
    });
  }

  render() {
    let { navigate } = this.props.navigation;
    let heroList = this.state.heroes.filter(isMatchHeroName(this.state.searchText));

    return (
      <Layout navigate={navigate}>
        <Item>
          <Icon active name='search' />
          <Input placeholder='Search hero' onChangeText={this.updateSearch}/>
        </Item>

        <HeroList navigate={navigate} heroes={heroList} />
      </Layout>
    );
  }
}

