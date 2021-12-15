import { Font, FontSize } from './config';
import { StyleSheet } from 'react-native';
import { reSize } from './mixins';
import { Colors } from './config';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  containerCentered: {
    alignSelf: 'stretch',
    paddingTop: reSize(40),
    alignItems: 'center',
  },
  headerTitleStyle: {
    ...Font.MEDIUM,
    fontSize: FontSize.MEDIUM,
  },
  verifiedIcon: {
    position: 'absolute',
    right: -reSize(4),
    bottom: 0,
    width: reSize(10),
    overflow: 'hidden',
    height: reSize(10),
    borderRadius: reSize(5),
    backgroundColor: Colors.SECONDARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
