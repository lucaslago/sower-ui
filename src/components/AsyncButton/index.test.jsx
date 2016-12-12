import AsyncButton from './index';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

describe('<AsyncButton />', () => {

  it('renders without crashing', () => {
    const wrapper = shallow(
        <AsyncButton label="login"  />
    );
    expect(wrapper.length).toEqual(1);
  });

  it('renders <RaisedButton /> when makingRequest is false', () => {
    const wrapper = shallow(
        <AsyncButton label="login" makingRequest={ false } />
    );
    expect(wrapper.find(RaisedButton).length).toEqual(1);
    expect(wrapper.find(CircularProgress).length).toEqual(0);
  });

  it('renders <CircularProgress /> when makingRequest is true', () => {
    const wrapper = shallow(
        <AsyncButton label="login" makingRequest={ true } />
    );
    expect(wrapper.find(RaisedButton).length).toEqual(0);
    expect(wrapper.find(CircularProgress).length).toEqual(1);
  });

});
