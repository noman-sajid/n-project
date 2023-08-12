import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTeamUsers } from '../../actions/userAction'; // Import your action creator

const TeamUsers = () => {
  const dispatch = useDispatch();
  const teamUsersState = useSelector((state) => state.teamUsers);

  useEffect(() => {
    dispatch(getTeamUsers());
  }, [dispatch]);

  return (
    <div>
      {teamUsersState.loading ? (
        <p>Loading...</p>
      ) : teamUsersState.error ? (
        <p>Error: {teamUsersState.error}</p>
      ) : (
        <div>
          <h2>Team Users</h2>
          <ul>
            {teamUsersState.users.map((user) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TeamUsers;
