
function forInitial(props): Object {
  const {
    navigationState,
    scene,
  } = props;

  const focused = navigationState.index === scene.index;
  const opacity = focused ? 1 : 0;
  // If not focused, move the scene to the far away.
  const translate = focused ? 0 : 1000000;
  return {
    opacity,
    transform: [
      { translateX: translate },
      { translateY: translate },
    ],
  };
}

function forHorizontal(props): Object {
  const {
    layout,
    position,
    scene,
  } = props;

  if (!layout.isMeasured) {
    return forInitial(props);
  }

  const index = scene.index;
  const inputRange = [index - 1, index, index + 1];
  const width = layout.initWidth;

  const opacity = position.interpolate({
    inputRange,
    outputRange: ([1, 1, 0.3]: Array<number>),
  });

  const scale = position.interpolate({
    inputRange,
    outputRange: ([1, 1, 0.95]: Array<number>),
  });

  const translateY = 0;
  const translateX = position.interpolate({
    inputRange,
    outputRange: ([width, 0, -10]: Array<number>),
  });

  return {
    opacity,
    transform: [
      { scale },
      { translateX },
      { translateY },
    ],
  };
}

function forVertical(props): Object {
  const { layout, position, scene } = props;

  if (!layout.isMeasured) {
    return forInitial(props);
  }

  const index = scene.index;
  const inputRange = [index - 1, index, index + 1];
  const height = layout.initHeight;

  const opacity = position.interpolate({
    inputRange,
    outputRange: ([0, 1, 1]: Array<number>),
  });

  const translateX = 0;
  const translateY = position.interpolate({
    inputRange,
    outputRange: ([height / 2, 0, 0]: Array<number>),
  });

  return {
    opacity,
    transform: [
      { translateX },
      { translateY },
    ],
  };
}

module.exports = {
  forHorizontal,
  forVertical,
};
