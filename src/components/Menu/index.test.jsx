import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Menu from './index';

describe('<Menu />', () => {
  const handleClick = jest.fn().mockReturnValue(true);
  const  wrapper = mount(
      <MuiThemeProvider>
        <Menu handleClick={handleClick} primaryText="foo"/>
      </MuiThemeProvider>
    );

  it('renders without crashing', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
