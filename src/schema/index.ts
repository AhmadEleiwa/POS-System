
import * as yup from 'yup'
import catgoires from '../Static/Categories.json'

let refs = catgoires.map(p => yup.ref(p.categoryName))
export const schema = yup.object().shape({
    category:yup.string().oneOf([...refs])
})
