import {moderateScale, scaledSize, scaleHeight} from '../../utils';
import {Theme} from '../../utils/Theme/themeTypes';

export const CreateEventStyles = (theme: Theme) => ({
  container: {
    flex: 1,
    marginHorizontal: moderateScale(20),
    marginBottom: moderateScale(20),
  },
  header: {fontSize: scaledSize(20), fontWeight: 'bold'},
  label: {
    fontSize: scaledSize(16),
    fontWeight: 'bold',
    marginTop: scaledSize(16),
    marginBottom: scaledSize(6),
  },
  input: {
    borderWidth: 1,
    borderColor: theme.inputBorderColor,
    padding: moderateScale(10),
    borderRadius: 5,
    marginTop: moderateScale(5),
  },
  imagePicker: {
    padding: moderateScale(10),
    backgroundColor: theme.pickerBackgroundColor,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: moderateScale(5),
  },
  imageScroll: {
    flexDirection: 'row',
    marginTop: moderateScale(10),
  },
  imageContainer: {
    position: 'relative',
    margin: moderateScale(10),
  },
  image: {
    width: scaleHeight(100),
    height: scaleHeight(100),
    borderRadius: 10,
  },
  removeImageButton: {
    position: 'absolute',
    top: scaleHeight(-8),
    right: scaleHeight(-8),
    backgroundColor: theme.transparentBackground,
    width: scaleHeight(24),
    height: scaleHeight(24),
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
