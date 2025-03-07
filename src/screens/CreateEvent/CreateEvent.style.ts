import {moderateScale, scaledSize, scaleHeight} from '../../utils';

export const CreateEventStyles = () => ({
  container: {flex: 1, padding: moderateScale(20)},
  label: {
    fontSize: scaledSize(16),
    fontWeight: 'bold',
    marginTop: scaledSize(10),
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  imagePicker: {
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 5,
  },
  imageScroll: {
    flexDirection: 'row',
    marginTop: 10,
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
    top: -8,
    right: -8,
    backgroundColor: 'red',
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
