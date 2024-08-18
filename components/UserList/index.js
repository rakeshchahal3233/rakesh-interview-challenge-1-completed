import React from 'react';
import styled from '@emotion/styled';
import useUserData from '../hooks/useUserData';

const Table = styled.table(() => ({
  width: '100%',
  borderCollapse: 'collapse',

  th: {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
    backgroundColor: '#f2f2f2',
    cursor: 'pointer',
  },

  td: {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
  },

  '.sort-icon': {
    verticalAlign: 'middle',
    marginLeft: '5px',
  },
}));

                             //Convert the Class component to a functional component
    const UserList = () => {

      const {
        users,
        columnFields,
        handleOnSearch,
        handleSort,
        sortColumn,
        sortDirection,
      } = useUserData();

      if (!users) return <div>Loading...</div>;

    return (
      <div>
        <Table>
          <thead>
            <tr>
              {columnFields.map(field => {
                return (
                  <th key={field.value}>
                    <div
                      onClick={() => handleSort(field.value)}
                      style={{ paddingBottom: 8 }}
                    >
                      {field.label}
                      {sortColumn === field.value &&
                        (sortDirection === 'asc' ? (
                          <span className={'sort-icon'}>▲</span>
                        ) : (
                          <span className={'sort-icon'}>▼</span>
                        ))}
                    </div>

                    {field.enableSearch ? (
                      <input
                        type={'text'}
                        placeholder={`Search by ${field.label}`}
                        name={field.value}
                        onChange={handleOnSearch}
                        style={{ padding: 6, width: 200 }}
                      />
                    ) : null}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                {columnFields.map(field => (
                  <td key={field.value}>{user[field.value]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
        <div></div>
      </div>
    );
  };

export default UserList;
