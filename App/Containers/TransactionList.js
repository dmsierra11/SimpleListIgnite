import React from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

// More info here: https://facebook.github.io/react-native/docs/flatlist.html

//Redux
import RatesActions from '../Redux/RatesRedux'
import TransactionsActions from '../Redux/TransactionsRedux'

// Styles
import styles from './Styles/TransactionListStyle'

class TransactionList extends React.PureComponent {

  constructor(props) {
    super(props)
    this.props.getRates()
    this.props.getTransactions()
  }

  componentWillUpdate() {
    console.log("RATES: " + JSON.stringify(this.props.rates))
  }

  goToDetail = (item) => {
    this.props.navigation.navigate('TransactionDetail', {
      sku: item.sku,
      amount: item.amount,
      currency: item.currency,
      rates: this.props.rates
    })
  }

  /* ***********************************************************
  * STEP 2
  * `renderRow` function. How each cell/row should be rendered
  * It's our best practice to place a single component here:
  *
  * e.g.
    return <MyCustomCell title={item.title} description={item.description} />
  *************************************************************/
  renderRow = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => this.goToDetail(item) }>
        <View style={styles.row}>
          <Text style={styles.boldLabel}>{item.sku}</Text>
          <Text style={styles.boldLabel}>{item.amount}</Text>
          <Text style={styles.label}>{item.currency}</Text>
        </View>
      </TouchableOpacity>

    )
  }

  /* ***********************************************************
  * STEP 3
  * Consider the configurations we've set below.  Customize them
  * to your liking!  Each with some friendly advice.
  *************************************************************/
  // Render a header?
  renderHeader = () =>
    <Text style={[styles.label, styles.sectionHeader]}> - Header - </Text>

  // Render a footer?
  renderFooter = () =>
    <Text style={[styles.label, styles.sectionHeader]}> - Footer - </Text>

  // Show this when data is empty
  renderEmpty = () =>
    <Text style={styles.label}> - Nothing to See Here - </Text>

  renderSeparator = () =>
    <Text style={styles.label}> - ~~~~~ - </Text>

  // The default function if no Key is provided is index
  // an identifiable key is important if you plan on
  // item reordering.  Otherwise index is fine
  keyExtractor = (item, index) => index.toString

  // How many items should be kept im memory as we scroll?
  oneScreensWorth = 20

  // extraData is for anything that is not indicated in data
  // for instance, if you kept "favorites" in `this.state.favs`
  // pass that in, so changes in favorites will cause a re-render
  // and your renderItem will have access to change depending on state
  // e.g. `extraData`={this.state.favs}

  // Optimize your list if the height of each item can be calculated
  // by supplying a constant height, there is no need to measure each
  // item after it renders.  This can save significant time for lists
  // of a size 100+
  // e.g. itemLayout={(data, index) => (
  //   {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
  // )}

  render() {
    return (
      <View style={styles.container}>
        {this.props.fetching ?
          <ActivityIndicator />
          :
          <FlatList
            contentContainerStyle={styles.listContent}
            data={this.props.dataObjects}
            renderItem={this.renderRow}
            keyExtractor={this.keyExtractor}
            initialNumToRender={this.oneScreensWorth}
            ListHeaderComponent={this.renderHeader}
            ListFooterComponent={this.renderFooter}
            ListEmptyComponent={this.renderEmpty}
            ItemSeparatorComponent={this.renderSeparator}
          />
        }
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataObjects: state.transactions.data,
    fetching: state.transactions.fetching,
    rates: state.rates.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getRates: () => dispatch(RatesActions.ratesRequest()),
    getTransactions: () => dispatch(TransactionsActions.transactionsRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionList)
