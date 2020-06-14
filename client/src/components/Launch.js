import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

const LAUNCH_QUERY = gql`
  query LaunchQuery($flight_number: Int!) {
    launch(flight_number: $flight_number) {
      flight_number
      mission_name
      launch_year
      launch_date_local
      launch_success
      rocket {
        rocket_id
        rocket_name
        rocket_type
        id
      }
    }
  }
`;
export default function Launch({ match: { params } }) {
  const flight_number = parseInt(params.flight_number);
  console.log(flight_number);

  const { loading, error, data } = useQuery(LAUNCH_QUERY, {
    variables: { flight_number },
  });

  if (loading) return <p>Loading</p>;
  if (error) console.log(error);

  console.log(data);
  const {
    mission_name,
    flight_number: flight,
    launch_year,
    launch_date_local,
    launch_success,
    rocket: { rocket_id, rocket_name, rocket_type, id },
  } = data.launch;

  return (
    <>
      <h1 className='display-4 my-3'>
        Mission: <span className='text-dark'>{mission_name}</span>
      </h1>
      <h4 className='mb-3'>Launch Details</h4>
      <ul className='list-group'>
        <li className='list-group-item'>Flight Number: {flight}</li>
        <li className='list-group-item'>Launch Year: {launch_year}</li>
        <li className='list-group-item'>
          Launch Successful:{' '}
          <span
            className={classNames({
              'text-success': launch_success,
              'text-danger': !launch_success,
            })}
          >
            {launch_success ? 'yes' : 'no'}
          </span>
        </li>
      </ul>
      <h4 className='my-3'>Rocket Details</h4>
      <ul className='list-group'>
        <li className='list-group-item'>Rocket Name: {rocket_name}</li>
        <li className='list-group-item'>Rocket ID: {rocket_id}</li>
        <li className='list-group-item'>Rocekt Name: {rocket_type}</li>
      </ul>
      <hr></hr>
      <Link to='/' className='btn btn-secondary'>
        Home
      </Link>
    </>
  );
}
