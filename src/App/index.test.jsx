import { App } from './index';

describe('<App/>', () => {
  it('renders without crashing', () => {
    const routeMock = {
      authService: {
        logout: jest.fn(),
        loggedIn: jest.fn(),
      },
    };

    const wrapper = shallow(
      <App route={routeMock}>
        <div>
          <span> mock </span>
          <span> component </span>
        </div>
      </App>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
