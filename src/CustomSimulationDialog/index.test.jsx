import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CustomSimulationDialog from './index';

describe('<CustomSimulationDialog />', () => {
  let wrapper;

  const authService = {
    getToken: jest.fn().mockReturnValue('Basic 12314BAb'),
  };

  const simulationService = {
    start: jest.fn().mockReturnValue(Promise.resolve({ message: 'ok' })),
    stop: jest.fn().mockReturnValue(Promise.resolve({ message: 'ok' })),
    create: jest.fn().mockReturnValue(Promise.resolve({ message: 'ok' })),
  };

  const handleClose = jest.fn();

  beforeEach(() => {
    wrapper = mount(
      <MuiThemeProvider>
        <CustomSimulationDialog
          open
          trackerId="123340901BAJD"
          handleClose={handleClose}
          authService={authService}
          simulationService={simulationService}
        />
      </MuiThemeProvider>,
    );
  });

  it('renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
