import React, { Component } from 'react'
import { Animated, ScrollView, View, Text } from 'react-native'
import { Navigation, Card } from 'react-router-navigation'
import HeaderTitle from 'react-navigation/src/views/HeaderTitle'
import StickyHeader from './components/StickyHeader'
import styles from './styles'

class Search extends Component {

  state = {
    scrollY: new Animated.Value(0),
  }

  render() {
    return (
      <Navigation>
        <Card
          path="/app/search"
          navBarStyle={{ backgroundColor: 'transparent' }}
          renderTitle={() => (
            <HeaderTitle>jello</HeaderTitle>
          )}
          render={() => (
            <View style={styles.container}>
              <StickyHeader
                source={{ uri: '' }}
              />
              <ScrollView
                style={styles.wrapper}
                scrollEventThrottle={10}
                // onScroll={Animated.event([{
                //     nativeEvent: { contentOffset: { y: this.state.scrollY } },
                //   }], {
                //     useNativeDriver: true,
                  // })}
              >
                <Text style={styles.content}>
                  Bacon ipsum dolor amet all of the words in Lorem Ipsum have flirted
                  with me - consciously or unconsciously. That's to be expected. This
                  placeholder text is gonna be HUGE. My placeholder text, I think, is
                  going to end up being very good with women. An ‘extremely credible
                  source’ has called my office and told me that Barack Obama’s
                  placeholder text is a fraud. Lorem Ipsum's father was with Lee Harvey
                  Oswald prior to Oswald's being, you know, shot.
                  {`\n`}
                  I'm speaking with myself, number one, because I have a very good brain
                  and I've said a lot of things. I’m the best thing that ever happened
                  to placeholder text. It’s about making placeholder text great again.
                  That’s what people want, they want placeholder text to be great again.
                  I write the best placeholder text, and I'm the biggest developer on
                  the web by far... While that's mock-ups and this is politics, are they
                  really so different? I write the best placeholder text, and I'm the
                  biggest developer on the web by far... While that's mock-ups and this
                  is politics, are they really so different?
                  {`\n`}
                  My text is long and beautiful, as, it has been well documented, are
                  various other parts of my website. He’s not a word hero. He’s a word
                  hero because he was captured. I like text that wasn’t captured.
                  {`\n`}
                  We are going to make placeholder text great again. Greater than ever
                  before.
                  {`\n`}
                  I know words. I have the best words. Be careful, or I will spill the
                  beans on your placeholder text. Trump Ipsum is calling for a total
                  and complete shutdown of Muslim text entering your website.
                </Text>
              </ScrollView>
            </View>
          )}
        />
      </Navigation>
    )
  }

}

export default Search
