import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import MissionKey from './MissionKey';

import LaunchItem from './LaunchItem';

const LAUNCHES_QUERY = gql`
  query LaunchesQuery {
    launches {
      flight_number
      mission_name
      launch_date_local
      launch_success
    }
  }
`;

const Launches = () => {
  const { loading, error, data } = useQuery(LAUNCHES_QUERY);

  if (loading) return <p>Loading</p>;
  if (error) console.log(error);

  return (
    <>
      <h1>Launches</h1>
      <MissionKey />
      {data.launches.map((item) => {
        return <LaunchItem key={item.flight_number} launch={item} />;
      })}
    </>
  );
};

export default Launches;
