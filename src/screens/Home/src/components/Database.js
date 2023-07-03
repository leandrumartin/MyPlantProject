import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Button,
} from 'react-native';

import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('db.testDb'); // returns Database object

export default class Database extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      name: null,
      lowerLimit: null,
      upperLimit: null,
      recLowerLimit: null,
      recUpperLimit: null,
    };

    db.transaction((tx) => {
      tx.executeSql('DELETE FROM dingus)');
      tx.executeSql('DROP TABLE dingus)');
    });

    // Check if the items table exists if not create it
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS dingus (id INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, LowerLimit INT, UpperLimit INT, RecLowerLimit INT, RecUpperLimit INT)'
      );
    });

    this.fetchData();
  }

  fetchData = () => {
    db.transaction((tx) => {
      // sending 4 arguments in executeSql
      tx.executeSql(
        'SELECT * FROM dingus',
        null, // passing sql query and parameters:null
        // success callback which sends two things Transaction object and ResultSet Object
        (txObj, { rows: { _array } }) => {
          this.setState({ data: _array });
          console.log(_array);
        },
        // failure callback which sends two things Transaction object and Error
        (txObj, error) => console.log('Error ', error)
      ); // end executeSQL
    }); // end transaction
  };

  handleChangeName = (newData) => {
    this.setState({ name: newData });
  };
  handleChangeLowerLimit = (newData) => {
    this.setState({ lowerLimit: newData });
  };
  handleChangeUpperLimit = (newData) => {
    this.setState({ upperLimit: newData });
  };
  handleChangeRecLowerLimit = (newData) => {
    this.setState({ recLowerLimit: newData });
  };
  handleChangeRecUpperLimit = (newData) => {
    this.setState({ recUpperLimit: newData });
  };

  isInputValid = ({
    name,
    lowerLimit,
    upperLimit,
    recLowerLimit,
    recUpperLimit,
  }) => {
    let valid = true;

    // Check required fields
    if (name === null) {
      valid = false;
    }
    if (lowerLimit === null) {
      valid = false;
    }
    if (upperLimit === null) {
      valid = false;
    }
    if (recLowerLimit === null) {
      valid = false;
    }
    if (recUpperLimit === null) {
      valid = false;
    }

    // Validate types
    if (parseInt(input) === NaN) {
      valid = false;
    }
    if (parseInt(input) === NaN) {
      valid = false;
    }
    if (parseInt(input) === NaN) {
      valid = false;
    }
    if (parseInt(input) === NaN) {
      valid = false;
    }

    return valid;
  };

  handleSubmit = () => {
    if (this.isInputValid(this.state)) {
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO dingus (Name, LowerLimit, UpperLimit, RecLowerLimit, RecUpperLimit) VALUES (?, ?, ?, ?, ?)',
          [
            this.state.name,
            this.state.lowerLimit,
            this.state.upperLimit,
            this.state.recLowerLimit,
            this.state.recUpperLimit,
          ],
          this.fetchData(),
          (txObj, err) => console.log('Error ', err)
        );
      });
    } else {
      console.log('All fields are required!');
    }
  };

  handleClear = () => {
    db.transaction((tx) => {
      tx.executeSql('DELETE FROM dingus)');
      tx.executeSql('DROP TABLE dingus)');
    });
    this.setState({
      data: null,
      name: null,
      lowerLimit: null,
      upperLimit: null,
      recLowerLimit: null,
      recUpperLimit: null,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          placeholder="Plant Name"
          onChangeText={this.handleChangeName}
          // value={}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Temperature Lower Limit"
          onChangeText={this.handleChangeLowerLimit}
          // value={}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Temperature Upper Limit"
          onChangeText={this.handleChangeUpperLimit}
          // value={}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Temperature Recommended Lower Limit"
          onChangeText={this.handleChangeRecLowerLimit}
          // value={}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Temperature Recommended Upper Limit"
          onChangeText={this.handleChangeRecUpperLimit}
          // value={}
        />

        <Button
          type="solid"
          title="Submit"
          onPress={this.handleSubmit}
        ></Button>

        <Button
          type="solid"
          title="Clear data"
          onPress={this.handleClear}
        ></Button>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
  textInput: {
    height: 40,
    margin: 5,
    padding: 2,
    borderWidth: 2,
    minWidth: 300,
  },
};
