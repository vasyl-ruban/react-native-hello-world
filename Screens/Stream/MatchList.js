import React from 'react';
import { Body, Button, Card, CardItem, Col, Container, Content, Footer, FooterTab, Grid, H1, H3, Header, Icon, Input, Item, Left, List, ListItem, Right, Spinner, Text, Thumbnail, View } from "native-base";
import Layout from '../Layout';

export default class MatchList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      matchList: []
    };

    fetch('http://188.226.147.71:3000/matches')
      .then((res) => res.json())
      .then((res) => {
        this.setState((prev) => {
          prev.matchList = res;
          return prev;
        })
      });
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <Layout navigate={navigate}>
        {this.state.matchList.length ? matchesView(navigate)(this.state.matchList) : <Spinner />}
      </Layout>
    );
  }
}

const matchesView = (navigate) => (matches) => {
  let liveMatches = matches.filter(match => match.isLive);
  let futureMatches = matches.filter(match => match.isFuture);
  let pastMatches = matches.filter(match => match.isPast);

  let liveMatchesView = liveMatches.map(matchView(navigate));
  let futureMatchesView = futureMatches.map(futureMatchView(navigate));
  let pastMatchesView = pastMatches.map(pastMatchView(navigate));

  return (
    <List>
      <ListItem itemDivider>
        <Text>Live matches</Text>
      </ListItem>
      {liveMatchesView}

      <ListItem itemDivider>
        <Text>Future matches</Text>
      </ListItem>
      {futureMatchesView}

      <ListItem itemDivider>
        <Text>Recent matches</Text>
      </ListItem>
      {pastMatchesView}
    </List>
  );
};

const matchView = (navigate) => (match) => {
  return (
    <ListItem ket={match.matchPage} style={{marginLeft: 0}} onPress={() => {console.log('press');navigate("MatchOverview", {matchPage: match.matchPage})}}>

      <Body>
        <Text>{match.firstTeamTag} vs. {match.secondTeamTag}</Text>
      </Body>
      <Right>
        <Icon name="arrow-forward" />
      </Right>
    </ListItem>
  );
};


const futureMatchView = (navigate) => (match) => {
  return (
    <ListItem ket={match.matchPage} style={{marginLeft: 0}}>

      <Body>
      <Text>{match.firstTeamTag} vs. {match.secondTeamTag}</Text>
      </Body>
      <Right>
        <Text>{match.timeTOStart}</Text>
      </Right>
    </ListItem>
  );
};


const pastMatchView = (navigate) => (match) => {
  return (
    <ListItem ket={match.matchPage} style={{marginLeft: 0}} >

      <Body>
      <Text>{match.firstTeamTag} vs. {match.secondTeamTag}</Text>
      </Body>
      <Right>
        <Text>{match.firstTeamScore} : {match.secondTeamScore}</Text>
      </Right>
    </ListItem>
  );
};
