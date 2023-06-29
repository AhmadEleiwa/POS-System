import UnitOfMeasures from "../../Static/UnitOfMeasures.json";

const unitOfMeasureReducer = (
  state: UnitOfMeasure[] = UnitOfMeasures,
  action: Action
) => {
  switch (action.type) {
    case "ADD_UNIT":
      return [...state, {...action.data}]
    case "UPDATE_UNIT": {
      let dd = state.find((p) => p.unitOfMeasureName === action.data.name);
      dd = action.data.newUnit;
      return [...state];
    }
    case "REMOVE_UNIT":
      return state.filter((p) => p.unitOfMeasureName !== action.data);
    default:
      return state;
  }
};
export default unitOfMeasureReducer;
