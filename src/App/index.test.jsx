import App from './index';

describe('<App/>', () => {
  it('renders without crashing', () => {
    const wrapper = mount(
      <App> 
        <div>
          <span> mock </span>
          <span> component </span>
        </div>
      </App>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
