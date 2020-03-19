import React from 'react';
import styled from 'styled-components';

const UCard = styled.div`

`;

function UserCard (props) {

  return (
    <UCard>
      <h3>{props.user.uname}</h3>
      <p>{props.user.email}</p>
    </UCard>
  )
}

export default UserCard;
