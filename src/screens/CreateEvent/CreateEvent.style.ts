import {moderateScale, scaledSize, scaleHeight} from '../../utils';
import {Theme} from '../../utils/Theme/themeTypes';

export const CreateEventStyles = (theme: Theme) => ({
  container: {
    flex: 1,
    marginHorizontal: moderateScale(20),
    marginBottom: moderateScale(20),
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginTop: moderateScale(4),
  },
  dateView: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
    padding: 10,
    backgroundColor: theme.primaryColor,
    borderRadius: 10,
  },
  header: {fontSize: scaledSize(20), fontWeight: 'bold'},
  uploadText: {
    fontSize: scaledSize(16),
    fontWeight: '500',
    color: theme.textColor,
  },
  dateText: {
    fontSize: scaledSize(16),
    fontWeight: '500',
    color: theme.backgroundColor,
  },
  leftView: {alignSelf: 'flex-start'},
  label: {
    fontSize: scaledSize(16),
    fontWeight: 'bold',
    marginTop: scaledSize(16),
    marginBottom: scaledSize(6),
  },
  input2: {height: 80, marginBottom: 80},
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
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label2: {
    // position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
