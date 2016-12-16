import DashBoardItem from './index';

describe('<DashBoardItem />', () => {
  const props = {
    title: 'Tractor',
    expanded: false,
    startDisabled: false,
    stopDisabled: true,
    trackerId: '123',
    simulationService: {
      start: jest.fn().mockReturnValueOnce(Promise.resolve({})),
      stop: jest.fn().mockReturnValueOnce(Promise.resolve({})),
    },
    authService: {
      getToken() {
        return 'a-fake-token';
      },
    },
  };

  const wrapper = shallow(<DashBoardItem
    title={props.title}
    expanded={props.expanded}
    startDisabled={props.startDisabled}
    stopDisabled={props.stopDisabled}
    trackerId={props.trackerId}
    simulationService={props.simulationService}
    authService={props.authService}
  />);

  it('renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should expand <Card /> when start button is clicked', () => {
    const startButton = wrapper.find('.DashboardItem .start');
    expect(wrapper.prop('expanded')).toEqual(false);
    startButton.simulate('click');
    expect(wrapper.prop('expanded')).toEqual(true);
  });
});
