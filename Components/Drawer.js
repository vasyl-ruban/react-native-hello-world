import React from 'react';
import { Body, Button, Card, CardItem, Col, Container, Content, Footer, FooterTab, Grid, H1, H3, Header, Icon, Input, Item, Left, List, ListItem, Right, Spinner, Text, Thumbnail, View, Title } from "native-base";

export default class Drawer extends React.Component {
  constructor(props) {
    super(props);

    const { navigate } = this.props.navigation;

    this.state = {
      selectedModule: 'PlayerModule',
      navigate: navigate
    };

    this.setModule = this.setModule.bind(this);
  }

  setModule(module) {
    this.state.navigate(module);
    this.setState((prev) => {
      prev.selectedModule = module;
      return prev;
    });
  }

  render() {
    return (
      <View>
        <Header>
          <Left>
            <Button transparent>
              <Icon name="analytics" />
            </Button>
          </Left>
          <Body>
            <Title>AppName</Title>
          </Body>
        </Header>
        <List>
          <ListItem itemDivider={this.state.selectedModule === 'PlayerModule'} button noBorder onPress={() => this.setModule('PlayerModule')}>
            <Left>
              <Icon name="ios-people" />
              <Body>
                <Text>Players</Text>
              </Body>
            </Left>
          </ListItem>

          <ListItem itemDivider={this.state.selectedModule === 'StreamModule'} button noBorder onPress={() => this.setModule('StreamModule')}>
            <Left>
              <Icon name="easel" />
              <Body>
                <Text>Live streams</Text>
              </Body>
            </Left>
          </ListItem>

          <ListItem button noBorder />

          <ListItem itemDivider={this.state.selectedModule === 'SettingsModule'} button noBorder onPress={() => this.setModule('SettingsModule')}>
            <Left>
              <Icon name="settings" />
              <Body>
              <Text>Settings</Text>
              </Body>
            </Left>
          </ListItem>
          <ListItem itemDivider={this.state.selectedModule === 'FeedbackModule'} button noBorder onPress={() => this.setModule('FeedbackModule')}>
            <Left>
              <Icon name="chatboxes" />
              <Body>
              <Text>Feedback</Text>
              </Body>
            </Left>
          </ListItem>
        </List>
      </View>
    );
  }
}
