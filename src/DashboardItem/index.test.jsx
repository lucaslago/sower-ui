import DashBoardItem from './index';

describe('<DashBoardItem />', () => {
  const props = {
    title: 'Tractor',
    expanded: false,
    startDisabled: false,
    stopDisabled: true,
    trackerId: '123',
    simulationService: {
      start: jest.fn().mockReturnValueOnce(Promise.resolve({}))
    },
    authService: {
      getToken() {
        return 'a-fake-token';
      }
    }
  };

  const wrapper = shallow(<DashBoardItem {...props} />);

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
