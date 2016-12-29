import {
  shouldDisableStartBtn,
  shouldDisableStopBtn,
  shouldExpandCard,
  hasDefaultSimulationSet,
  hasCustomSimulation,
} from './index';

describe('DashboardItem utils', () => {
  let device;

  beforeEach(() => {
    device = {
      custom_simulation: false,
      id: '123',
      relationships: {
        equipment: {
          data: {
            default_simulation: false,
          },
        },
      },
      simulationStatus: {
        status: undefined,
      },
    };
  });

  context('shouldDisableStartBtn', () => {
    context('simulationStatus is active', () => {
      it('should always return true', () => {
        device.simulationStatus.status = 'active';
        expect(shouldDisableStartBtn(device)).toEqual(true);
      });
    });

    context('simulationStatus is inactive', () => {
      it('should return true when simulation has neither custom_simulation nor default_simulation', () => {
        expect(shouldDisableStartBtn(device)).toEqual(true);
      });

      it('should return false when simulation has custom_simulation', () => {
        device.simulationStatus.status = 'inactive';
        device.custom_simulation = true;
        expect(shouldDisableStartBtn(device)).toEqual(false);
      });

      it('should return false when simulation has default_simulation', () => {
        device.simulationStatus.status = 'inactive';
        device.relationships.equipment.data.default_simulation = true;
        expect(shouldDisableStartBtn(device)).toEqual(false);
      });

      it('should return false when simulation has custom_simulation and default_simulation', () => {
        device.simulationStatus.status = 'inactive';
        device.custom_simulation = true;
        device.relationships.equipment.data.default_simulation = true;
        expect(shouldDisableStartBtn(device)).toEqual(false);
      });
    });
  });

  context('shouldDisableStopBtn', () => {
    it('should return false when simulation_status is active', () => {
      const simulationStatus = 'active';
      expect(shouldDisableStopBtn(simulationStatus)).toEqual(false);
    });

    it('should return true when simulation_status is inactive', () => {
      const simulationStatus = 'inactive';
      expect(shouldDisableStopBtn(simulationStatus)).toEqual(true);
    });
  });

  context('shouldExpandCard', () => {
    it('should return true when simulation_status is active', () => {
      const simulationStatus = 'active';
      expect(shouldExpandCard(simulationStatus)).toEqual(true);
    });

    it('should return false when simulation_status is inactive', () => {
      const simulationStatus = 'inactive';
      expect(shouldExpandCard(simulationStatus)).toEqual(false);
    });
  });

  context('shouldDisableCardMenu', () => {
    it('should return true when simulation_status is active', () => {
      const simulationStatus = 'active';
      expect(shouldExpandCard(simulationStatus)).toEqual(true);
    });

    it('should return false when simulation_status is inactive', () => {
      const simulationStatus = 'inactive';
      expect(shouldExpandCard(simulationStatus)).toEqual(false);
    });
  });

  context('hasDefaultSimulationSet', () => {
    it('returns true when the device has default simulation', () => {
      device.relationships.equipment.data.default_simulation = true;
      expect(hasDefaultSimulationSet(device)).toBe(true);
    });

    it('returns false when the device has no default simulation', () => {
      device.relationships.equipment.data.default_simulation = false;
      expect(hasDefaultSimulationSet(device)).toBe(false);
    });
  });

  context('hasCustomSimulation', () => {
    it('returns true when the device has custom simulation', () => {
      device.custom_simulation = true;
      expect(hasCustomSimulation(device)).toBe(true);
    });

    it('returns false when the device has no custom simulation', () => {
      device.custom_simulation = false;
      expect(hasCustomSimulation(device)).toBe(false);
    });
  });
});
