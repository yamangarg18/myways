,{
  defaultNavigationOptions:({ navigation }) => {
    return {
      tabBarIcon: ({tintColor}) => {
        const { routeName } = navigation.state;
        let myicon
        if (routeName=='Dashboard') {
          myicon = 'home'
        }else if (routeName=='CareerInsight') {
          myicon = 'info'
        }else if (routeName=='Internship') {
          myicon = 'th-list'
        }else if (routeName=='Courses') {
          myicon = 'laptop'
        }else if (routeName=='Notification') {
          myicon = 'sticky-note'
        }

        return <FontAwesome name={myicon} size={30} color={tintColor} />
      },
      contentOptions:{
        activeTintColor: 'yellow',
        inactiveTintColor: 'grey',
        activeBackgroundColor: 'darkslategrey',
        inactiveBackgroundColor: 'white'
      },
    }
  }
}

,{
  defaultNavigationOptions:({ navigation }) => {
    return {
      // tabBarIcon: ({tintColor}) => {
      //   const { routeName } = navigation.state;
      //   let myicon
      //   if (routeName=='Dashboard') {
      //     myicon = 'home'
      //   }else if (routeName=='CareerInsight') {
      //     myicon = 'info'
      //   }else if (routeName=='Internship') {
      //     myicon = 'th-list'
      //   }else if (routeName=='Courses') {
      //     myicon = 'laptop'
      //   }else if (routeName=='Notification') {
      //     myicon = 'sticky-note'
      //   }

      //   return <FontAwesome name={myicon} size={30} color={tintColor} />
      // },
      drawerContentOptions:{
        activeTintColor: 'yellow',
        inactiveTintColor: 'grey',
        activeBackgroundColor: 'darkslategrey',
        inactiveBackgroundColor: 'white'
      },
    }
  }
}