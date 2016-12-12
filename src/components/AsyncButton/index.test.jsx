import AsyncButton from './index';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

describe('<AsyncButton />', () => {
  const label = 'login';
  const type = 'text';
  let makingRequest = false;

  it('renders correctly', () => {
    const wrapper = shallow(<AsyncButton type={type} label={label} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders <RaisedButton /> when makingRequest is false', () => {
    const wrapper = shallow(<AsyncButton label={label} makingRequest={makingRequest} />);
    expect(wrapper.find(RaisedButton).length).toEqual(1);
    expect(wrapper.find(CircularProgress).length).toEqual(0);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders <CircularProgress /> when makingRequest is true', () => {
    const wrapper = shallow(
      <AsyncButton label="login" makingRequest={ true } />
    );
    expect(wrapper.find(RaisedButton).length).toEqual(0);
    expect(wrapper.find(CircularProgress).length).toEqual(1);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

});
