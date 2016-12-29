import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SelectSimulation from './index';

describe('<SelectSimulation />', () => {
  const callback = jest.fn();

  context('when displayElement is true', () => {
    const wrapper = mount(
      <MuiThemeProvider>
        <SelectSimulation
          onChange={callback}
          selectedValue={false}
          displayElement
        />
      </MuiThemeProvider>,
    );

    it('renders the component', () => {
      expect(wrapper.find('.select-simulation').length).toBe(1);
    });
  });

  context('when display element is false', () => {
    const wrapper = mount(
      <MuiThemeProvider>
        <SelectSimulation
          onChange={callback}
          selectedValue={false}
          displayElement={false}
        />
      </MuiThemeProvider>,
    );

    it('should not render the element', () => {
      expect(wrapper.find('.select-simulation').length).toBe(0);
    });
  });
});
