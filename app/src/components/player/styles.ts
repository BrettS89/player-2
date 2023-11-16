import { colors } from '../../shared/colors';

export const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    width: '100%',
    backgroundColor: colors.dark,
  },
  topSection: {
    display: 'flex',
    width: '100%',
  },
  bottomSection: {

  },
  pitchControls: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
  },
  playerControls: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playPause: {
    color: colors.white,
    fontSize: 45,
    marginLeft: 15,
    marginRight: 15,
  },
  skipButton: {
    color: colors.white,
    fontSize: 35,
  }
}