import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchName } from '../Reducers/Action';

const Profile = () => {
  const { name, age, city, phone, company } = useSelector((state) => {
    console.log(state);
    return state
  })
  //initialze the dispatch
  const dispatch = useDispatch()

  //update the age value 
  const updateAge = (age) => {
    //action to dispatch use useDispatch hooks and after gose to the reducer
    dispatch({ type: 'UPDATE_AGE', payload: age })
  }

  // Change Name Static
  // const updateName = (name) => {
  //   dispatch({ type: 'UPDATE_NAME', payload: name })
  // }

  //Change Name Dynamic 
  const updateName = async () => {
    dispatch(fetchName()) // Call fetchName() function 
  }

  // Change City Static
  const updatecity = (city) => {
    dispatch({ type: 'UPDATE_CITY', payload: city })
  }

  // Change Phone Static
  const updatephone = (phone) => {
    dispatch({ type: 'UPDATE_PHONE', payload: phone })
  }

  // Change Company Static
  const updatecompany = (company) => {
    dispatch({ type: 'UPDATE_COMPANY', payload: company })
  }


  return (
    <div>
      <h1>My name is {name}</h1>
      <h1>My age is {age}</h1>
      <h1>My city is {city}</h1>
      <h1>My Mobile Number is {phone}</h1>
      <h1>My Company is {company}</h1>


      <button onClick={() => updateAge(40)}>AgeUpdate</button>
      <button onClick={() => updateName('Raju')}>NameUpdate</button>
      <button onClick={() => updatecity('Delhi')}>NameCity</button>
      <button onClick={() => updatephone('1234567898')}>Mobile Update</button>
      <button onClick={() => updatecompany('TCS')}>company Update</button>

    </div>
  )
}

export default Profile
