const DefaultPager = ({ navigationState }) => {
  return navigationState.routes[navigationState.index].component
}

export default DefaultPager
