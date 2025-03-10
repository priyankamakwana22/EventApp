import {moderateScale, scaledSize, scaleHeight} from '../../utils';
import {Theme} from '../../utils/Theme/themeTypes';

export const CreateEventStyles = (theme: Theme) => ({
  container: {flex: 1, padding: moderateScale(20)},
  label: {
    fontSize: scaledSize(16),
    fontWeight: 'bold',
    marginTop: scaledSize(10),
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
    backgroundColor: '#00000080',
    padding: moderateScale(5),
    width: scaleHeight(24),
    height: scaleHeight(24),
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeImageText: {
    color: '#fff',
    fontSize: scaledSize(14),
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: scaleHeight(20),
  },
  buttonText: {color: '#FFF', fontWeight: 'bold'},
});
