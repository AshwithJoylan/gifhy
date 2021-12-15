import { AppSizes, Colors, Font, FontSize, reSize } from '@utils';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  itemContainer: {
    flex: 1,
    borderRadius: AppSizes.RADIUS,
    overflow: 'hidden',
    marginTop: reSize(10),
  },
  logo: {
    flexDirection: 'row',
    marginVertical: reSize(10),
    height: reSize(40),
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
  },
  gifImageStyle: {
    flex: 1,
    borderRadius: AppSizes.RADIUS,
    overflow: 'hidden',
  },
  gifImage: { width: '100%', height: '100%' },
  vrfIcon: {
    backgroundColor: Colors.SECONDARY,
  },
  userImage: {
    width: reSize(20),
    height: reSize(20),
    overflow: 'hidden',
    borderRadius: reSize(10),
  },
  searchBar: {
    marginHorizontal: AppSizes.PADDING,
    marginVertical: reSize(15),
    borderWidth: 0,
  },
  searchBarTop: { marginVertical: reSize(15), borderWidth: 0 },
  indicator: {
    marginVertical: reSize(15),
    alignSelf: 'stretch',
  },
  name: {
    fontSize: FontSize.SMALL,
    marginLeft: reSize(10),
    textTransform: 'capitalize',
  },
  icon: {
    width: FontSize.SMALL,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: reSize(10),
    marginTop: reSize(10),
    paddingBottom: reSize(10),
  },
});
