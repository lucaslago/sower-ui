import React from 'react';
import { shallow } from 'enzyme';
import Dashboard from './index';

describe('<Dashboard />', () => {

  const devices =  {
    "data": [
    {
      "type": "devices",
      "id": "ffcb5837-d34c-48cc-ac76-58fe52c367d4",
      "relationships": {
        "equipment": {
          "data": {
            "type": "equipment",
            "id": "b5a48553-0d98-4cbd-b362-cc86e52f1b3e"
          }
        }
      }
    }
    ]
  };

  it('renders without crashing', () => {
    const authServiceFake = { getToken: () => {} };
    const devicesServiceFake = { fetch: jest.fn().mockReturnValueOnce(Promise.resolve(devices))};
    const route = {
      authService: authServiceFake,
      devicesService: devicesServiceFake
    };
    const wrapper = shallow(<Dashboard route={route} />);
    expect(wrapper.length).toEqual(1);
  });

});
