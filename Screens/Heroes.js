import React from 'react';
import { AsyncStorage } from 'react-native'
import { Body, Button, Card, CardItem, Col, Container, Content, Footer, FooterTab, Grid, H1, H3, Header, Icon, Input, Item, Left, List, ListItem, Right, Spinner, Text, Thumbnail, View } from "native-base";
import Layout from './Layout';
import HeroList from '../Components/Hero/HeroList';


const isMatchHeroName = (searchText) => (hero) => {
  if (searchText.length < 2) return true;
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
      heroes: [],
      limit: 10
    };

    getHeroes()
      .then((response) => {
        this.setState((prevState) => {
          prevState.heroes = response;
          return prevState;
        })
      });

    this.updateSearch = this.updateSearch.bind(this);
    this.showMore = this.showMore.bind(this);
  }

  updateSearch(text) {
    this.setState(prev => {
      prev.searchText = text;
      return prev;
    });
  }

  showMore() {
    this.setState(prev => {
      prev.limit += 10;
      return prev;
    });
  }

  render() {
    let { navigate } = this.props.navigation;
    let heroList = this.state.heroes.filter(isMatchHeroName(this.state.searchText)).slice(0, this.state.limit);

    return (
      <Layout navigate={navigate}>
        <Item>
          <Icon active name='search' />
          <Input placeholder='Search hero' onChangeText={this.updateSearch}/>
        </Item>

        <HeroList navigate={navigate} heroes={heroList} />

        <Button block onPress={() => this.showMore()}><Text>Show more</Text></Button>
      </Layout>
    );
  }
}

const getHeroes = () => {
  return getHeroesFromAsyncStorage()
    .then(heroes => {
      return heroes.length ? heroes : getHeroesFromRest();
    });
};

const getHeroesFromRest = () => {
  return fetch('https://api.opendota.com/api/heroStats')
    .then((response) => response.json())
    .then((response) => {
      return saveHeroesToAsyncStorage(response)
    });
};

const getHeroesFromAsyncStorage = () => {
  return AsyncStorage.getItem('heroes')
    .then((heroes) => {
      heroes = JSON.parse(heroes);
      if (!Array.isArray(heroes)) return [];
      return heroes;
    });
};

const saveHeroesToAsyncStorage = (heroes) => {
  return AsyncStorage.setItem('heroes', JSON.stringify(heroes)).then(() => heroes);
};