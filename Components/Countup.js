import React from 'react';
import { StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Body, Button, Card, CardItem, Col, Container, Content, Footer, FooterTab, Grid, H1, H3, Header, Icon, Input, Item, Left, List, ListItem, Right, Spinner, Text, Thumbnail, View, Tab, Tabs, TabHeading, Separator, Row, Title } from "native-base";

export default class Countup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: this.props.initialTime,
      formattedTime: this.props.formatter(this.props.initialTime),
      timer: null
    };
    this.state.timer = setInterval(() => {
      this.setState((prev) => {
        let time = ++prev.time;
        let formattedTime = this.props.formatter(time);

        return {
          ...prev,
          time: time,
          formattedTime: formattedTime
        };
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  render() {
    return (
      <Text style={this.props.style}>{this.state.formattedTime}</Text>
    );
  }
}
