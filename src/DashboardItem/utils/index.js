import SIMULATION_STATUS from '../../utils/simulation_status';

const isActiveSimulation = status => status === SIMULATION_STATUS.ACTIVE;
const hasDefaultSimulationSet = device => device.relationships.equipment.data.default_simulation;
const hasCustomSimulation = device => device.custom_simulation;

export const shouldDisableStartBtn = device => (
  isActiveSimulation(device.simulationStatus.status) || !(
    hasDefaultSimulationSet(device) || hasCustomSimulation(device)
  ));
export const shouldDisableStopBtn = simulationStatus => !isActiveSimulation(simulationStatus);
export const shouldExpandCard = simulationStatus => isActiveSimulation(simulationStatus);
export const shouldDisableCardMenu = simulationStatus => isActiveSimulation(simulationStatus);

