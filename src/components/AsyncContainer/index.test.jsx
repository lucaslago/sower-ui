import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AsyncContainer from './index';

describe('<AsyncContainer />', () => {
  const wait = () => {
    return new Promise((resolve) => {
      setTimeout(() => { resolve(true); }, 0);
    });
  };

  const renderErrorElement = () => {
    return (<div className="error-element">Error!</div>);
  };

  const renderSuccessElement = () => {
    return (<div className="success-element">Success!</div>);
  }

  it('should render the spinner while the promise is resolving', () => {
    const successPromise = jest.fn().mockReturnValue(Promise.resolve(true));

    const wrapper = mount(
      <MuiThemeProvider>
        <AsyncContainer
          promise={successPromise}
          renderOnReject={renderErrorElement}
          renderOnResolve={renderSuccessElement}
          spinnerSize={10}
          spinnerThickness={5}
        />
      </MuiThemeProvider>
    );

    expect(wrapper.find('.loading').length).toBe(1);
  });

  it('should render the success element when the promise is resolved', () => {
    const successPromise = jest.fn().mockReturnValue(Promise.resolve(true));

    const wrapper = mount(
      <MuiThemeProvider>
        <AsyncContainer
          promise={successPromise}
          renderOnReject={renderErrorElement}
          renderOnResolve={renderSuccessElement}
          spinnerSize={10}
          spinnerThickness={5}
        />
      </MuiThemeProvider>
    );

    return wait().then(() => {
      expect(wrapper.find('.success-element').length).toBe(1);
    })
  });

  it('should render the error element when the promise is rejected', () => {
    const successPromise = jest.fn().mockReturnValue(Promise.reject(true));

    const wrapper = mount(
      <MuiThemeProvider>
        <AsyncContainer
          promise={successPromise}
          renderOnReject={renderErrorElement}
          renderOnResolve={renderSuccessElement}
          spinnerSize={10}
          spinnerThickness={5}
        />
      </MuiThemeProvider>
    );

    return wait().then(() => {
      expect(wrapper.find('.error-element').length).toBe(1);
    })
  });
});
