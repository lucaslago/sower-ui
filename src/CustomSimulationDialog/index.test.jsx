import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CustomSimulationDialog from './index';

describe('<CustomSimulationDialog />', () => {
  let wrapper;

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
          authToken="Basic 12313ABDKS"
          simulationService={simulationService}
        />
      </MuiThemeProvider>,
    );
  });

  it('renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});