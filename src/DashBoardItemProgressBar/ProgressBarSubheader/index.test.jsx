import ProgressBarSubheader from './index';
import CircularProgress from 'material-ui/CircularProgress';

describe('<ProgressBarSubheader />', () => {
  const props = {
    status: 'active',
    completed: 10,
    totalPositions: 100,
    remainingPositions: 90
  };

  it('should render correctly when status is active', () => {
    const wrapper = shallow(<ProgressBarSubheader {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render correctly when status is inactive', () => {
    const wrapper = shallow(<ProgressBarSubheader {...props} status={'inactive'} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

});
