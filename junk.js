// class CP1Screen extends React.Component {
//     static navigationOptions = {
//     };

//     render() {
//       return (
//         <View style={styles.container}>
//             <Image
//                 style={styles.logo}
//                 source={require('../../assets/favicon.png')}
//             />
//             <Text
//                 style={styles.text}
//             > In this section, you will be asked different questions which help us personalize your experience further
//             </Text>
//         </View>
//       );
//     }
// }

// const CareerProfileStack = createStackNavigator({
//     CareerProfile: CareerProfileScreen
// },{
//     defaultNavigationOptions: {
//       title: 'Career Profile',
//       headerStyle: {
//         backgroundColor: 'darkslategrey'
//       },
//       headerTitleStyle: {
//         fontWeight: "bold",
//         color: "yellow",
//       },
//       headerTitleAlign: 'center'
//     },
// });

<div className='careerprofile__wrapper__header'>
  <span
    style={{ fontSize: "17px", fontWeight: "bolder" }}
    className='careerprofile__wrapper__header__header1'
  >
    In this section, you will be asked different questions which help us
    personalize your experience further.{" "}
    <b>
      Please note that we do not share any of the responses you give in this
      section with the employers
    </b>
    . This section is completely to analyse you for better career planning and
    this section directly impacts the Career Insights Section and all your
    recommendations. Please,
    <b> it is recommended to be honest and answer these questions seriously</b>
  </span>
  <br />
  <ul
    className='careerprofile__wrapper__header__header1'
    style={{ fontSize: "18px", marginLeft: "15px" }}
  >
    <li>There are 4 sections</li>
    <li>
      You won't be able to edit your response later, hence start only when you
      are free.{" "}
    </li>
    <li>
      Total time needed: 25-30 minutes. You can attempt different sections at
      different times.
    </li>
  </ul>
</div>;
<div
  style={{
    display: "flex",
    flex: 1,
    width: "60%",
    marginLeft: "20%",
  }}
>
  {renderTestsStatus(testsStatus)}
</div>;
<button
  className='button'
  onClick={() => startTest(testsStatus)}
  style={{
    display: "flex",
    flex: 1,
    marginTop: "5%",
    width: "60%",
    justifyContent: "center",
    marginLeft: "20%",
  }}
>
  <div className='text'>{pageVisit(testsStatus)}</div>
</button>

    "imageUrl": "https://image.flaticon.com/icons/svg/1998/1998982.svg",
    "imageUrl": "https://image.flaticon.com/icons/svg/2072/2072148.svg",
    "imageUrl": "https://image.flaticon.com/icons/svg/1651/1651619.svg",
    "imageUrl": "https://image.flaticon.com/icons/svg/2014/2014526.svg",

    <FlatList
        data={questions}
        keyExtractor={(questions) => questions.paragraph}
        horizontal
        // showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <View style={styles.child1}>
              <FlatList
                data={item.questionSet}
                keyExtractor={(questions) => questions.question}
                // vertical
                // contentContainerStyle={styles.container2}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                  return (
                    <View style={styles.container2}>
                      <Text style={styles.title}>{item.question}</Text>
                    </View>
                  );
                }}
              />
              <View style={styles.child2}>
                <Button
                  title='Previous'
                  style={styles.navigationButton}
                  onPress={() =>
                    navigation.navigate("Instructions", {
                      id: "work_orientation",
                    })
                  }
                />
                <Button
                  title='Next'
                  style={styles.navigationButton}
                  onPress={() =>
                    navigation.navigate("Instructions", {
                      id: "work_orientation",
                    })
                  }
                />
              </View>
            </View>
          );
        }}
      />
