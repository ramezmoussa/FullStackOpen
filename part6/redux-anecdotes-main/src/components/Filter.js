import { useDispatch } from 'react-redux'
import { filterReducer } from '../reducers/filterReducer'


const Filter = (props) => {
    const dispatch = useDispatch()

    const handleChange = (event) => {
        dispatch(filterReducer(event.target.value))
    }


    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }
  
  export default Filter