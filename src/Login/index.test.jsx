import { Login } from './index';

describe('<Login />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.length).toEqual(1);
    expect(wrapper).toMatchSnapshot();
  });
});

