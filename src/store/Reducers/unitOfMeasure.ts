import UnitOfMeasures from "../../Static/UnitOfMeasures.json";

const unitOfMeasureReducer = (
  state: UnitOfMeasure[] = UnitOfMeasures,
  action: Action
) => {
  switch (action.type) {
    case "ADD_UNIT":
      return [...state, {...action.data}]
    case "UPDATE_UNIT": {
      return state.map(p => {
        if(p.unitOfMeasureName === action.data.name)
          return action.data.newUnit
        return p
      });
    }
    case "REMOVE_UNIT":
      return state.filter((p) => p.unitOfMeasureName !== action.data);
    default:
      return state;
  }
};
export default unitOfMeasureReducer;
