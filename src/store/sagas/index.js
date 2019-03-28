import WeatherSagas from "./Weather";
import DroneSagas from "./droneData"
import ApiErrors from "./ApiErrors";
import DroneApiErrors from "./DroneApiErrors";

export default [...ApiErrors, ...DroneApiErrors, ...WeatherSagas, ...DroneSagas];
