
import * as yup from 'yup'
import catgoires from '../Static/Categories.json'
import unitOfMeasures  from '../Static/UnitOfMeasures.json'

let refs = catgoires.map(p => p.categoryName)
export const schema = yup.object().shape({
    category:yup.string().notOneOf(refs, 'The name is already taken')
})
let ufms = unitOfMeasures.map(p => p.unitOfMeasureName)
export const unitOfMeasureSchema = yup.object().shape({
    unitOfMeasureName:yup.string().required("Name is required field").notOneOf(ufms,"The name is already taken"),
    baseOfUnitOfMeasure:yup.string().required("Base Unit of measure is required field"),
    CFB:yup.number().required("Conversion Factor base is required field"),
})


export const testSchema = yup.object().shape({
    testField:yup.string().required("TEST ERROR")
})