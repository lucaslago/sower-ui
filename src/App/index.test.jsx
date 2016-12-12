import App from './index';

describe('<App/>', () => {

  it('renders without crashing', () => {
    const wrapper = mount(<App/>);
    expect(wrapper.length).toEqual(1);
  });

});
