import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Menu from './index';

describe('<Menu />', () => {
  const props = {
    handleClick: jest.fn().mockReturnValue(true),
    primaryText: 'foo',
    disabled: false
  };
  const  wrapper = mount(
      <MuiThemeProvider>
        <Menu {...props} />
      </MuiThemeProvider>
    );

  it('renders without crashing', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
